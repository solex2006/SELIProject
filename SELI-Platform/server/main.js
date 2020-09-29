import { Meteor } from 'meteor/meteor';
import '../imports/api/courseFiles';
import '../lib/CourseCollection';
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

const BSON = require('bson');

var   uploadDir = '/opt/Seli/UploadFiles/'; 
let mainDirectory='/opt/Seli/tmp'
let seliDirectory='/opt/Seli/tmp/Seli'
let coursesDirectory='/opt/Seli/tmp/Seli/courses'
var saveDir = '/opt/Seli/tmp/courses';


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
  const file = req.file
  //console.log("el archivo",file)
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

  //restore json file to the database  substr(texto.length - 4)
  if (!fs.existsSync(seliDirectory)){
    fs.mkdirSync(seliDirectory, 0777);
  }
  if (!fs.existsSync(coursesDirectory)){
    fs.mkdirSync(coursesDirectory, 0777);
  }
  zipEntries.forEach(function(zipEntry) {
    if(zipEntry.entryName.substr(zipEntry.entryName.length - 5) === '.json'){
      console.log("*****",zipEntry.entryName)
      let ori=saveDir+'/'+zipEntry.entryName
      let dest=coursesDirectory+'/'+zipEntry.entryName
      mv(ori, dest, function(err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully moved the json file!");
        }
      });
      

      restore({
        uri: "mongodb://127.0.0.1:27017/Seli", // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: '/opt/Seli/tmp/Seli',
        callback: function(err) {
      
          if (err) {
            console.error("errorrrrrrrrrrrrr",err);
          } else {
            console.log('finish------');
          }
        }
      });
      
    }
  });




  //move the media files
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





Meteor.methods({
  getIP: function(){
      var ip = this.connection.clientAddress;
      return ip;
  }
});


Meteor.methods({
  getCourses: function(course){ 
    let items = course 
   // console.log("course------",course)

    //bson course
     backup({
      uri: 'mongodb://127.0.0.1:27017/Seli', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: mainDirectory, // write files into this dir
      collections: [ 'courses' ], // save this collection only
      query: {_id: course._id}
    });


    //


    WebApp.connectHandlers.use('/file', function (req, res) {
      const regex = new RegExp('path', 'i');
      const result = queryJson.search(items, regex);
       
      console.log("RESULTADO DE BUSQUEDA****",result)
      const deep_value = (obj, path) => 
        path
          .replace(/\[|\]\.?/g, '.')
          .split('.')
          .filter(s => s)
          .reduce((acc, val) => acc && acc[val], obj);

      //save json file

      let database = JSON.stringify(items);
      //const databson = BSON.serialize(items);
      let name=`${course._id}`+".json"
      //let namebson=`${course._id}`+".bson"
      fs.writeFileSync('/opt/Seli/UploadFiles/'+name, database);
      //fs.writeFileSync('/opt/Seli/UploadFiles/'+namebson, databson);

      //create the routes
      let address=[];
      console.log("resultado**********----->",result)
      result.map((route, indexRoute)=>{
        let ruta='';
        route.map((singleRoute, indexSingleRoute)=>{
          if(singleRoute==='0' || singleRoute==='1' || singleRoute==='2' || singleRoute==='3' || singleRoute==='4' ||
            singleRoute==='5' || singleRoute==='6'  || singleRoute==='7' || singleRoute==='8' || singleRoute==='9' ){
             // ruta=ruta.slice(0, -1)
             //console.log('rutaaa::', singleRoute) 
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
          
          console.log(address[i])
      }
      //add database into the folder
      zip.addLocalFile('/opt/Seli/UploadFiles/'+name);
      //zip.addLocalFile('/opt/Seli/UploadFiles/'+namebson);
      const downloadName = `SELI-Course.${course._id}.zip`;
 
      const data = zip.toBuffer();
  
      // save file zip in root directory
     // zip.writeZip('/opt/Seli/zip'+"/"+downloadName);

      //download the file
      let headers = {
        'Content-Type':'application/octet-stream',
        'Content-Disposition':`attachment; filename=${downloadName}`,
        'Content-Length':data.length
      };
       
      /* let headers = {
        'Content-Type': 'text/json',
        'Content-Disposition': 'attachment;'+ 'filename='+name
      }; */
      res.writeHead(200, headers);
      return res.end(data);
    });


  }
});




Meteor.methods({
 
    'saveFile': function(buffer){
      console.log("el buffer", buffer)
        Files.insert({data:buffer})         
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
        return [content.idStudent, content.certificateHash];
      } 
    }
    
    SimpleRest.setMethodOptions('certificate-result', options);

    Meteor.methods({
      'certificate-result': function (idStudent,certificateHash) {
        console.log("id",idStudent);
        console.log("cert",certificateHash);
        let updateResult= Meteor.users.update(
          {_id : idStudent },
          { $push : 
            { "profile.certificates" : certificateHash }}
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