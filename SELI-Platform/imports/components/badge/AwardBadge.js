import CourseFilesCollection from "../../../lib/CourseFilesCollection";
import { v4 as uuidv4 } from "uuid";

import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import { Assertions } from "../../../lib/AssertionsCollection";
//const message, nonce, path, privateKey; // ...

const bakery = require("openbadges-bakery-v2");
var key = Meteor.settings.public.BLOCKCHAIN_USERKEY;
var encryptor = require("simple-encryptor")(key);

function hashEmailAddress(email, salt) {
  const hashDigest = sha256(email + salt);
  return "sha256$" + hashDigest.toString(CryptoJS.enc.Hex);
}
//for hashing recipient
function getIdentity(email) {
  var salt = CryptoJS.lib.WordArray.random(16);
  const id = {
    identity: hashEmailAddress(email, salt),
    type: "email",
    hashed: true,
    salt: salt + "",
  };
  return id;
}
//badgeClass,user
const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};
const clone = (obj) => Object.assign({}, obj);

async function bakeBadge(badgeClass, user) {
  var assertion = {};
  var idAssertion =uuidv4();
  assertion.type = "Assertion";
  assertion.id = Meteor.settings.public.URL_SITE + "assertions/" + idAssertion;
  assertion["@context"] = "https://w3id.org/openbadges/v2";
  // for hashing reciipient
  // assertion.recipient = getIdentity(user.emails[0].address);
  assertion.recipient = {
    identity: user.emails[0].address,
    type: "email",
    hashed: false,
  };
  assertion.issuedOn = new Date().toISOString();
  assertion.verification = { type: "HostedBadge" };
  assertion.revoked=false;
  assertion.revocationReason ="";
  var a = JSON.stringify(badgeClass.image.link) + "";
  //replace 2 times the word 
  a = a.replace(badgeClass.image._id, idAssertion);
  console.log(a.replace(badgeClass.image._id, assertion.id));
  assertion.image = {
    id: JSON.parse(a.replace(badgeClass.image._id, idAssertion)),
  };

  badgeClass = renameKey(badgeClass, "_id", "id");
  assertion.badge = badgeClass;
  let buffer = CourseFilesCollection.findOne({
    _id: badgeClass.image._id,
  });
  buffer = buffer.meta.buffer;
  console.log(user);
  console.log(assertion);
  var options = {
    image: buffer,
    assertion: assertion,
  };
  let registerDataSinCode = {
    //useful for regsiter users in blockchain network
    email: user.emails[0].address,
    displayName: user.profile.fullname,
    password: user._id,
  };
  await bake(options)
    .then((data) => {
      saveBadge(data, assertion,idAssertion,user);
      //   this.setState({ badgeWin: true });
      var registerData = { data: encryptor.encrypt(registerDataSinCode) };
      persistBadge(assertion, registerData,user);
      console.log(assertion);
    })
    .catch((err) => {
      console.log(err);
    });
  return assertion;
}
async function bake(options) {
  return new Promise((resolve, reject) => {
    bakery.bake(options, function (err, data) {
      if (err) return reject(err);
      else resolve(data);
    });
  });
}
function saveBadge(data, badgeInformation,idAssertion,user) {
  console.log(badgeInformation);
  var file = new File([data], badgeInformation.badge.name + ".png", {
    type: "image/png",
    ext: "png",
    extension: "png",
    extensionWithDot: ".png",
  });
  let uploadInstance = CourseFilesCollection.insert(
    {
      fileId: idAssertion,
      file: file,
      meta: {
        locator: "",
        dateAdded: new Date(),
        isFavorite: false,
        usedInCourse: false,
        userId: "",
        buffer: "",
        type: "badge"
        //userId: Meteor.userId() // Optional, used to check on server for file tampering
      },
      streams: "dynamic",
      chunkSize: "dynamic",
      allowWebWorkers: true, // If you see issues with uploads, change this to false
    },
    false
  );

  uploadInstance.start();
  console.log(file);
  console.log(uploadInstance);
  let currentId = uploadInstance.config.fileId + "";
  let newName = uploadInstance.config.fileId + ".jpg";
  console.log(currentId);
  console.log(newName);
  // if (this._isMounted) {
  //   this.setState({ badgeWin: true });
  // }
  saveUserBadge(user._id, badgeInformation);
}
function persistBadge(badgeInfo, registerData,user) {
  console.log("sending badge to blockchain");
  console.log(JSON.stringify(badgeInfo));
  let tokenUser = user.profile.token;

  if (tokenUser === undefined) {
    //register the token
    fetch("http://localhost:80/login/user", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Respuesta del registro o token: ", res);
        Meteor.users.update(
          { _id: res.idStudent },
          {
            $push: { "profile.token": res.token },
          }
        );

        fetch("http://localhost:80/badges/issue", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify(badgeInfo),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          });
      });
  } else {
    fetch("http://localhost:80/badges/issue", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
      body: JSON.stringify(badgeInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
}
//badgeInformation is assertion here
saveUserBadge = (id, badgeInformation) => {
  console.log(badgeInformation);
  console.log("saving user badge in collection");
  badgeInformation = renameKey(badgeInformation, "id", "_id");
  badgeInformation.userId = id;
  Assertions.insert(badgeInformation);
  Meteor.call("addBadgeStudent", id, badgeInformation, (error, response) => {});
};
export { bakeBadge };
