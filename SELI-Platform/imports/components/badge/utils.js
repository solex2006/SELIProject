import { v4 as uuidv4 } from "uuid";

import bakery from "openbadges-bakery-v2";

const createUUID = () => {
  return uuidv4();
};

export default { createUUID };
