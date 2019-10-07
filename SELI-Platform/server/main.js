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

    options={
      url: "certificate-result",
      getArgsFromRequest: function (request) {
        var content = request.body;
        // Since form enconding doesn't distinguish numbers and strings, we need
        // to parse it manually
        //console.log(parseInt(content.certificateNumber,10));
        //console.log(content.certificateHash);
        return [ content.certificateNumber, content.certificateHash ];
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