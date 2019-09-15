import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'GetUsers'(){
    var users = Meteor.users.find({}).fetch();
    return users;
  }
});

Meteor.methods({
  'GetTutorRequests'(){
    var users = Meteor.users.find({'profile.verified': false}).fetch();
    return users;
  }
});

Meteor.methods({
  'ActivateAccount'(_id){
    var updated = Meteor.users.update(
      {_id: _id},
      {
        $set: {
          'profile.verified': true
        }
      }
    )
    return updated;
  }
});
