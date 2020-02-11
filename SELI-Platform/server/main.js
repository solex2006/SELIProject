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

/**
 * SELI - Learning Analytics
 * This method is used to obtain the client's IP address.
 * @author Bernardo Caussin
 * @returns {string} public internet IP address
 */
Meteor.methods({
  getIP: function(){
      var ip = this.connection.clientAddress;
      return ip;
  }
});

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
        // Since form enconding doesn't distinguish numbers and strings, we need
        // to parse it manually
        //console.log(parseInt(content.certificateNumber,10));
        //console.log(content.certificateHash);
        return [ content.idStudent, content.certificateHash ];
      } 
    }
    
    SimpleRest.setMethodOptions('certificate-result', options);

    Meteor.methods({
      'certificate-result': function (idStudent,certificateHash) {

        console.log(idStudent);
        console.log(certificateHash);

        let updateResult= Meteor.users.update(
          {_id : idStudent },
          { $push : 
            { "profile.certificates" : certificateHash }}
        );

        if(updateResult){
          return "Certificado registrado";
        } else{
          return "Error de registro";
        }
    },
    });

  });
}

// meteor --settings settings.json