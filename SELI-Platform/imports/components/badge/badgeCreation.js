import CourseFilesCollection from "../../../lib/CourseFilesCollection";

const bakery = require("openbadges-bakery-v2");
var key = Meteor.settings.public.BLOCKCHAIN_USERKEY;
var encryptor = require("simple-encryptor")(key);

async function bakeBadge(assertion, badgeInformation, user) {
  let buffer = CourseFilesCollection.findOne({
    _id: badgeInformation.image._id,
  });
  buffer = buffer.meta.buffer;
  console.log(user);

  var options = {
    image: buffer,
    assertion: assertion,
  };
  let registerDataSinCode = {
    //useful for regsiter users in blockchain network
    email: user.emails[0].address,
    displayName: user.profile.fullname,
    password: Meteor.userId(),
  };
  await bake(options)
    .then((data) => {
      saveBadge(data, badgeInformation);
      //   this.setState({ badgeWin: true });
      var registerData = { data: encryptor.encrypt(registerDataSinCode) };
      persistBadge(assertion, registerData);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function bake(options) {
  return new Promise((resolve, reject) => {
    bakery.bake(options, function (err, data) {
      if (err) return reject(err);
      else resolve(data);
    });
  });
}
function saveBadge(data, badgeInformation) {
  let user = Meteor.users.find({ _id: Meteor.userId() }).fetch();
  user = user[0];
  console.log(badgeInformation);
  var file = new File([data], badgeInformation.image._id + ".png", {
    type: "image/png",
    ext: "png",
    extension: "png",
    extensionWithDot: ".png",
  });
  let uploadInstance = CourseFilesCollection.insert(
    {
      file: file,
      meta: {
        locator: "",
        dateAdded: new Date(),
        isFavorite: false,
        usedInCourse: false,
        userId: "",
        buffer: "",
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
  saveUserBadge(Meteor.userId(), badgeInformation);
}
function persistBadge(badgeInfo, registerData) {
  console.log("sending badge to blockchain");
  console.log(JSON.stringify(badgeInfo));
  let tokenUser = Meteor.users.find({ _id: Meteor.userId() }).fetch()[0].profile
    .token;

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
saveUserBadge = (id, badgeInformation) => {
  console.log("saving user badge in collection");
  Meteor.call("addBadgeStudent", id, badgeInformation, (error, response) => {});
};
export { bakeBadge };
