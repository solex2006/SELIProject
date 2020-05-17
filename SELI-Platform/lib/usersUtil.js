import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'GetUsers'(){
    var users = Meteor.users.find({}).fetch();
    return users;
  }
});

Meteor.methods({
  'GetTutorRequests'(){
    var users = Meteor.users.find({'profile.verified': false, 'profile.type': 'tutor'}).fetch();
    return users;
  }
});

Meteor.methods({
  'GetTutors'(){
    var users = Meteor.users.find({'profile.type': 'tutor'}).fetch();
    return users;
  }
});

Meteor.methods({
  'GetStudents'(){
    var users = Meteor.users.find({'profile.type': 'student'}).fetch();
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
  'ChangeLanguague'(_id, language){
    var updated = Meteor.users.update(
      {_id: _id},
      {
        $set: {
          'profile.configuration.language': language
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
    return Meteor.users.findOne({_id: _id});
  }
});

Meteor.methods({
  'DeleteUser'(_id){
    Meteor.users.remove({_id: _id});
  }
});

Meteor.methods({
  'UpdateCourses'(_id, courses){
    Meteor.users.update(
      { _id: _id },
      { $set: {
        'profile.courses': courses,
      }}
    )
    return true;
  }
});

Meteor.methods({
  'UpdateProgress'(_id, courseId, progress){
    let user = Meteor.users.find({_id: _id}).fetch();
    user = user[0];
    let index = user.profile.courses.findIndex(course => course.courseId === courseId);
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

Meteor.methods({
  'CheckForAdmin'(){
    let usernameVar="seliadmin";
    let user = Meteor.users.find({username: usernameVar}).fetch();
    user = user[0];

    if (!user){
      try{
        let result = Accounts.createUser({
          username: usernameVar,
          password: "seli2019",
          email: "seliadmin@mail.com",
          profile: {
            fullname: "seli administrator",
            courses: [],
            type: "administrator",
            certificates: [],
          }
        });
        if(result){
          return result;
          }
      }
      catch(err){
          return err;
      }

    }
  }
});

Meteor.methods({
  'sendVEmail'(userId, email){
    this.unblock();
    Accounts.sendVerificationEmail(
      userId,
      email
    )
  }
});


Meteor.methods({
  'updateBadges'(_id, badge){
    Meteor.users.update(
      { _id: _id },
      { $set: {
        'profile.badge': badge,
      }}
    )
    return true;
  }
});

Meteor.methods({
  'addBadgeStudent'(_id, badgeInformation){
    Meteor.users.update(
      { _id: _id },
      { $push: {
        'profile.badge': badgeInformation,
      }}
    )
    return true;
  }
});