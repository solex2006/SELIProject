import { Meteor } from 'meteor/meteor';
import { SessionLog } from '../lib/SessionLogCollection';

export const checkUserType = (response, type, history) => {
  if (response) {
    // --------------------  SELI - Learning Analytics ------------------------
    //Code used to save the client session
    Meteor.call('getIP', function(error, result){
      if(!error){
        SessionLog.insert({ "UserId": response._id, "Datetime": new Date(), "IPAddress": result });
      }
    });
    //--------------------           End Section        ------------------------
    response.profile.type !== type ? history.push('/') : undefined
  } else {
    history.push('/');
  }
}
