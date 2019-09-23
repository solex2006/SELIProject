import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'SendVerificationEmail'(userId){
    console.log(userId);
    return Accounts.sendVerificationEmail( userId );
  }
});
