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

var backup = require('mongodb-backup');
var restore = require('mongodb-restore');



var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '/opt/Seli/tmp/courses');
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
  console.log("el archivo",file)
  res.end(JSON.stringify(file))
  //do something with the file
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
    console.log("course------",course)
    WebApp.connectHandlers.use('/file', function (req, res) {
      let name=`${course._id}`+".json"
      let headers = {
        'Content-Type': 'text/json',
        'Content-Disposition': 'attachment;'+ 'filename='+name
      };
      console.log('items--->', items)
      res.writeHead(200, headers);
      return res.end(JSON.stringify(items));
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