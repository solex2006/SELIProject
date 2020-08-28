import { Badges } from "../../../lib/BadgesCollection";

function createBadge(badgeClass) {
  Badges.insert( badgeClass );
}

export default createBadge;
