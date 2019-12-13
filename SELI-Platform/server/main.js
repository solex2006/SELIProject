import { Meteor } from 'meteor/meteor';
import '../imports/api/courseFiles';
import '../lib/CourseCollection';
import '../lib/ActivitiesCollection';
import '../lib/RequirementsCollection';
import '../lib/AudiencesCollection';
import '../lib/CommentsCollection';
import '../lib/FeedbackCollection';
import '../lib/extract';
import '../lib/validateSignUp';
import '../lib/usersUtil';
import '../lib/sendVerificationEmail';
import '../lib/changeAccountInformation';

if (Meteor.isServer) {
  
  Meteor.startup(() => {
    let smtp_domain = process.env.SMTP_DOMAIN;
    let smtp_port = process.env.SMTP_PORT;
    let smtp_user = process.env.SMTP_USER;
    let smtp_user_password = process.env.SMTP_USER_PASSWORD;
    smtp_user = smtp_user.replace("@", "%40");

    process.env.MAIL_URL=`smtp://${smtp_user}:${smtp_user_password}@${smtp_domain}:${smtp_port}`;
    
    Accounts.emailTemplates.from=smtp_user;
    Accounts.urls.resetPassword = (token) => {
      return Meteor.absoluteUrl(`RetrievePasswd/#/reset-password/${token}`);
    }; 

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