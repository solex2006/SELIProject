

import { Badges } from '../../../lib/BadgesCollection';


function createBadge(badgeClass){
  console.log(badgeClass);
  Badges.insert({badgeClass:badgeClass});
}

export default createBadge;