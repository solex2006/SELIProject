import AccessibilityFilesCollection from '../../lib/AccessibilityFilesCollection';
import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.all', function () {
    return CourseFilesCollection.find().cursor;
  });
}

Meteor.methods({

  'RemoveAccessibilityCourseFile'(id) {

    AccessibilityFilesCollection.remove({_id: id}, function (error) {
      if (error) {
        console.error("File wasn't removed, error: " + error.reason)
      } else {
        console.info("File successfully removed");
      }
    });

  },

});
