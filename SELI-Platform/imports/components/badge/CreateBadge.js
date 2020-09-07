import { Badges } from "../../../lib/BadgesCollection";
import createUUID from "./utils";

function createBadge(badgeClass) {
  badgeClass._id=Meteor.settings.public.URL_SITE+"badges/"+createUUID();
  badgeClass.type = "BadgeClass";
  badgeClass.issuer = {
    id: Meteor.settings.public.URL_SITE,
    name: "SELI",
    url: Meteor.settings.public.URL_SITE,
  };
  Badges.insert(badgeClass);
}

export default createBadge;
