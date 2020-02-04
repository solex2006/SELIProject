import { Meteor } from 'meteor/meteor';
import { SessionLog } from '../lib/SessionLogCollection';

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
          // --------------------  SELI - Learning Analytics ------------------------
          //Code used to save the client session
          Meteor.call('getIP', function(error, result){
            if(!error){
              console.log(SessionLog.insert({ "UserId": userId, "Datetime": new Date(), "IPAddress": result }));
            }
          });
          //--------------------           End Section        ------------------------
          user[0].profile.type !== type ? history.push('/') : undefined
        }
        else {
          history.push('/');
        }
      }
    });
  }
}
