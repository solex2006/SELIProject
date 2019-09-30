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

Meteor.methods({
  'UsersnameExists'(username){
    let exist = false;
    var users = Meteor.users.find({}).fetch();
    users.map(user => {
      user.username === username ? exist = true : undefined
    })
    return exist;
  }
});

Meteor.methods({
  'GetUserById'(_id){
    let user = Meteor.users.find({_id: _id}).fetch();
    return user;
  }
});

Meteor.methods({
  'CompleteSection'(_id, toComplete, courseId, progress){
    let user = Meteor.users.find({_id: _id}).fetch();
    user = user[0];
    let index = user.profile.courses.findIndex(course => course.courseId === courseId);
    user.profile.courses[index].toComplete = toComplete;
    user.profile.courses[index].progress = progress;
    Meteor.users.update(
      { _id: _id },
      { $set: {
        profile: user.profile,
      }}
    )
  }
});

Meteor.methods({
  'CompleteActivity'(_id, toResolve, courseId, progress){
    let user = Meteor.users.find({_id: _id}).fetch();
    user = user[0];
    let index = user.profile.courses.findIndex(course => course.courseId === courseId);
    user.profile.courses[index].toResolve = toResolve;
    user.profile.courses[index].progress = progress;
    Meteor.users.update(
      { _id: _id },
      { $set: {
        profile: user.profile,
      }}
    )
  }
});
