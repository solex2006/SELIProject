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

Meteor.startup(() => {
  // code to run on server at startup
});
