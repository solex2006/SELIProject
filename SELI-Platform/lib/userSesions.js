import { Meteor } from 'meteor/meteor';

export const checkUserType = (userId, type, history) => {
  if (userId === null) {
    history.push('/');
  }
  else {
    let user;
    Meteor.call("GetUserById", userId, (error, response) =>  {
      if (error) {
        history.push('/');
      }
      else {
        user = response;
        if (user.length) {
          user[0].profile.type !== type ? history.push('/') : undefined
        }
        else {
          history.push('/');
        }
      }
    });
  }
}
