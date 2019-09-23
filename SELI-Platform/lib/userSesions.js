import { Meteor } from 'meteor/meteor';

export const checkUserType = (userId, type) => {
  if (userId === null) {
    location.replace('/');
  }
  else {
    let user;
    Meteor.call("GetUserById", userId, (error, response) =>  {
      if (error) {
        location.replace('/');
      }
      else {
        user = response;
        if (user.length) {
          user[0].profile.type !== type ? location.replace('/') : undefined
        }
        else {
          location.replace('/');
        }
      }
    });
  }
}

signIn = (user) => {

}
