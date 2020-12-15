import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'ChangeAccountInformation'(userInformation, username){
    Accounts.setUsername(userInformation._id, username);
    Meteor.users.update(
      { _id: userInformation._id },
      { $set: {
        'emails.0.address': userInformation.emails[0].address,
        profile: userInformation.profile,
      }}
    );
  }
});
