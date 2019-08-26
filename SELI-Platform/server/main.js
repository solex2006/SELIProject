import { Meteor } from 'meteor/meteor';
import '../imports/api/tutorFiles';
import '../imports/api/courseFiles';
import '../lib/TutorCollection';
import '../lib/CourseCollection';
import '../lib/ModalitiesCollection';
import '../lib/MethodologiesCollection';
import '../lib/CategoriesCollection';
import '../lib/RequirementsCollection';
import '../lib/PeopleCollection';
import '../lib/extract';

Meteor.startup(() => {
  // code to run on server at startup
});
