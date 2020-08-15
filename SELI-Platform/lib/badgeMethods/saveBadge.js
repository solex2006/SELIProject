import { Meteor } from  'meteor/meteor';

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
    console.log('adding')
    Meteor.users.update(
    { _id: _id },
    { $push: {
        'profile.badge': badgeInformation,
    }}
    )
    return true;
}
});