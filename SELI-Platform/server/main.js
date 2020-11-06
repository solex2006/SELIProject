import { Meteor } from 'meteor/meteor';
import '../imports/api/courseFiles';
import {Courses} from '../lib/CourseCollection';
import {Activities} from '../lib/ActivitiesCollection';
import '../lib/ActivitiesCollection';
import '../lib/RequirementsCollection';
import '../lib/DisabilitiesCollection';
import '../lib/CommentsCollection';
import '../lib/FeedbackCollection';
import '../lib/SessionLogCollection';
import '../lib/extract';
import '../lib/validateSignUp';
import '../lib/usersUtil';
import '../lib/sendVerificationEmail';
import '../lib/changeAccountInformation';
import '../lib/StudentLogCollection';
import '../lib/storyTellingVideo';
import '../lib/badgeMethods/saveBadge';
import '../lib/BadgesCollection';
import '../lib/StudentEventCollection';
import Files from '../lib/FilesCourses';

import { WebApp } from 'meteor/webapp';
import multer  from 'multer';
const AdmZip = require('adm-zip');
const mv = require('mv');
var backup = require('mongodb-backup');
var restore = require('mongodb-restore');
const queryJson = require("query-json");
const path = require("path");
var fs = require('fs');

var uploadDir = '/opt/Seli/UploadFiles/'; 
var saveDir = '/opt/Seli/tmp/';

/* if (!fs.existsSync(saveDir)){
    fs.mkdirSync(saveDir, 0777);
}  */

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, saveDir);
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
})

var callback = multer({ storage: storage });

// Mount the middleware first so it's run first
WebApp.connectHandlers.use('/upload', callback.single('json'));
// Then mount the user handler

WebApp.connectHandlers.use('/upload', function (req, res) {
  //create folder in server to save the json file
   if (!fs.existsSync(saveDir)){
    fs.mkdirSync(saveDir);
  }  
  const file = req.file
  const newtutorID=req.headers.authorization
  //searc name of the new tutor

  let newTutor=Meteor.users.findOne({_id:newtutorID});
  //console.log("el archivo***********",req.headers.authorization,  newTutor.username)
  res.end(JSON.stringify(file))
  var zip = new AdmZip(file.path);
  var zipEntries = zip.getEntries();
  zip.extractAllTo(saveDir, true);
  //delete the zip file
    try {
    fs.unlinkSync(file.path)
    //file removed
    } catch(err) {
      console.error("Error deleting the zip file", err)
    }  

  // RESTORE DE DATBASE FROM DTHE JSON FILE
  zipEntries.forEach(function(zipEntry) {
    if(zipEntry.entryName.substr(zipEntry.entryName.length - 5) === '.json'){
      //console.log("*****",zipEntry.entryName)
      let ori=saveDir+'/'+zipEntry.entryName
      let dataCollection = JSON.parse(fs.readFileSync(ori, 'utf-8'))
      dataCollection._id=Math.random().toString(17);//change id of the course
      if (req.headers.file === "course") {
        dataCollection.createdBy=newTutor.username;
        Courses.insert(dataCollection);
      } else {
        dataCollection.activity.user=newtutorID;
        dataCollection.activity.date = new Date(dataCollection.activity.date);
        if (dataCollection.lastModified) dataCollection.lastModified = new Date (dataCollection.lastModified);
        Activities.insert(dataCollection);
      }
      //delete json file
      fs.unlinkSync(ori)
      
    }
  });
  //move the media files to UPLOADfILES
   zipEntries.forEach(function(zipEntry) {
        //cutting and moving media and videos to upload Folder
        if(zipEntry.entryName.substr(zipEntry.entryName.length - 5) != '.json'){
          let ori=saveDir+'/'+zipEntry.entryName
          let dest=uploadDir+zipEntry.entryName
          //console.log("name----->",zipEntry.entryName, ori, dest); // outputs zip entries information
          mv(ori, dest, function(err) {
              if (err) {
                  throw err
              } else {
                  console.log("Successfully moved the file!");
              }
          });
        }
    }); 
});


WebApp.connectHandlers.use('/file', function (req, res) {
  let items = {}
  var regex;
  if (req.query.type === "course") {
    items = Courses.find({_id: req.query.id}).fetch()[0];
  } else {
    items = Activities.find({_id: req.query.id}).fetch()[0];
  }
  if (!items._id) return res.end();
  //console.log(courses)
  if (req.query.type === "course") regex = new RegExp('path', 'i')
  else regex = new RegExp('link', 'i')
  const result = queryJson.search(items, regex);
  const deep_value = (obj, path) => 
    path
      .replace(/\[|\]\.?/g, '.')
      .split('.')
      .filter(s => s)
      .reduce((acc, val) => acc && acc[val], obj);

  //save json file
  let database = JSON.stringify(items);
  //const databson = BSON.serialize(items);
  let name=`${items._id}`+".json"
  //let namebson=`${file._id}`+".bson"
  fs.writeFileSync('/opt/Seli/UploadFiles/'+name, database);
  //fs.writeFileSync('/opt/Seli/UploadFiles/'+namebson, databson);

  //create the routes
  let address=[];
  console.log(result)
  result.map((route, indexRoute)=>{
    let ruta='';
    route.map((singleRoute, indexSingleRoute)=>{
      if (req.query.type === "course") {
        if(singleRoute==='0' || singleRoute==='1' || singleRoute==='2' || singleRoute==='3' ){
          ruta=ruta +'['+ singleRoute + ']'+'.'
        }
        else{
          if(singleRoute==='program' || singleRoute==='items' || singleRoute==='activities' || singleRoute==='attributes'){
            ruta=ruta+singleRoute
          }
          else{
            ruta=ruta+'.'+singleRoute
          }
        }
      } else {
        ruta=ruta +'['+ singleRoute + ']'+'.';
      }
    })
    if(ruta.charAt(0) === '.'){
      ruta = ruta.substring(1);
    }
    ruta=deep_value(items, ruta)
    if (ruta!='/opt/Seli/UploadFiles'){
      if (req.query.type === "course") address.push(ruta)
      else {
        if (ruta.search(Meteor.settings.public.URL_SITE) > -1) {
          var fileName = ruta.split("/");
          fileName = fileName[fileName.length - 1];
          fileName = uploadDir + fileName;
          address.push(fileName);
        }
      }
    } 
    //delete repeated
    address = [...new Set(address)];
  })

  console.log("las rutas:--> ", address)

  const zip = new AdmZip();
  for(var i = 0; i < address.length;i++){
    try{
      zip.addLocalFile(address[i]);
    }catch (error) {
      console.error("**************",error);
    }
  }
  //add database into the folder
  zip.addLocalFile('/opt/Seli/UploadFiles/'+name);
  //zip.addLocalFile('/opt/Seli/UploadFiles/'+namebson);
  const downloadName = `SELI-${req.query.type}.${items._id}.zip`;
  const data = zip.toBuffer();
  // save file zip in root directory
  // zip.writeZip('/opt/Seli/zip'+"/"+downloadName);

  //download the file
  let headers = {
    'Content-Type':'application/octet-stream',
    'Content-Disposition':`attachment; filename=${downloadName}`,
    'Content-Length':data.length
  };
  
  res.writeHead(200, headers);
  return res.end(data);  
})

Meteor.methods({
  getIP: function(){
      var ip = this.connection.clientAddress;
      return ip;
  }
});

Meteor.methods({
  getFiles: function(file, type){ 
    let items = file 
    console.log("los items------>", items, type)
   /*  WebApp.connectHandlers.use('/file', function (req, res) {
      const regex = new RegExp('path', 'i');
      const result = queryJson.search(items, regex);
      const deep_value = (obj, path) => 
        path
          .replace(/\[|\]\.?/g, '.')
          .split('.')
          .filter(s => s)
          .reduce((acc, val) => acc && acc[val], obj);

      //save json file
      let database = JSON.stringify(items);
      //const databson = BSON.serialize(items);
      let name=`${file._id}`+".json"
      //let namebson=`${file._id}`+".bson"
      fs.writeFileSync('/opt/Seli/UploadFiles/'+name, database);
      //fs.writeFileSync('/opt/Seli/UploadFiles/'+namebson, databson);

      //create the routes
      let address=[];
    //  console.log("resultado**********----->",result)
      result.map((route, indexRoute)=>{
        let ruta='';
        route.map((singleRoute, indexSingleRoute)=>{
          if(singleRoute==='0' || singleRoute==='1' || singleRoute==='2' || singleRoute==='3' ){
            ruta=ruta +'['+ singleRoute + ']'+'.'
          }
          else{
            if(singleRoute==='program' || singleRoute==='items' || singleRoute==='activities' || singleRoute==='attributes'){
              ruta=ruta+singleRoute
            }
            else{
              ruta=ruta+'.'+singleRoute
            }
            
          }
        })
        if(ruta.charAt(0) === '.'){
          ruta = ruta.substring(1);
        }
       // console.log("la ruta:--> ", items.eval(ruta))
        ruta=deep_value(items, ruta)
        if (ruta!='/opt/Seli/UploadFiles'){
          address.push(ruta)
        } 
        //delete repeated
        address = [...new Set(address)];
        console.log("la ruta:--> ", address)
      })

      const zip = new AdmZip();
      for(var i = 0; i < address.length;i++){
        try{
          zip.addLocalFile(address[i]);
        }catch (error) {
          console.error("**************",error);
        }
      }
      //add database into the folder
      zip.addLocalFile('/opt/Seli/UploadFiles/'+name);
      //zip.addLocalFile('/opt/Seli/UploadFiles/'+namebson);
      const downloadName = `SELI-${type}.${file._id}.zip`;
      const data = zip.toBuffer();
      // save file zip in root directory
     // zip.writeZip('/opt/Seli/zip'+"/"+downloadName);

      //download the file
      let headers = {
        'Content-Type':'application/octet-stream',
        'Content-Disposition':`attachment; filename=${downloadName}`,
        'Content-Length':data.length
      };
      
      
      res.writeHead(200, headers);
      return res.end(data);
    });*/
  } 
});

Meteor.methods({
  'saveFile': function(buffer){
    console.log("el buffer", buffer)
      Files.insert({data:buffer})         
  }   
});

Meteor.methods({
  'savejson': function(json){
    Files.insert({andres:"sdfsd"})         
  }   
});

Meteor.methods({
  UploadCourses: function(id){
    console.log("se va subir el curso--->", )
    restore({
      uri: "mongodb://127.0.0.1:27017/Seli", // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: '/opt/Seli/tmp/Seli',
    });
      return "subiendo..."; 
  }
});

if (Meteor.isServer) {
  Meteor.users.allow({  
    update: function(userId, doc, fields, modifier) {
          return true;
    }
  });
}
if (Meteor.isClient) {
  Meteor.users.allow({  
    update: function(userId, doc, fields, modifier) {
          return true;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    let smtp_domain = Meteor.settings.private.SMTP_DOMAIN;
    let smtp_port = Meteor.settings.private.SMTP_PORT;
    let smtp_user = Meteor.settings.private.SMTP_USER;
    let smtp_user_password = Meteor.settings.private.SMTP_USER_PASSWORD;;
    
    Accounts.emailTemplates.from=smtp_user;
    Accounts.urls.resetPassword = (token) => {
      return Meteor.absoluteUrl(`RetrievePasswd/#/reset-password/${token}`);
    }; 

    smtp_user = smtp_user.replace("@","%40");
    if (smtp_user_password === ""){
      process.env.MAIL_URL=`smtp://@${smtp_domain}:${smtp_port}`;
    } else {
      process.env.MAIL_URL=`smtp://${smtp_user}:${smtp_user_password}@${smtp_domain}:${smtp_port}`;
    }

    options={
      url: "certificate-result",
      getArgsFromRequest: function (request) {
        var content = request.body;
        return [content.idStudent, content.certificateHash, content];
      } 
    }
    
    SimpleRest.setMethodOptions('certificate-result', options);

    Meteor.methods({
      'certificate-result': function (idStudent,certificateHash,content) {
        console.log("id",idStudent);
        console.log("cert",certificateHash);
        console.log("contenido",content, content.name, content.course, content.tutor, content.description, content.date);
        let updateResult= Meteor.users.update(
          {_id : idStudent },
          { $push : 
            { "profile.certificates" : certificateHash,  "profile.check": false }}
        );
        if(updateResult){
          return "Certificado registrado--------------------";
        } else{
          return "Error de registro--------------------------";
        }
    },
    });

  });
}



// meteor --settings settings.json