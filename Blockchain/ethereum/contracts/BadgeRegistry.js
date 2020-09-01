// Tell web3 that a deployed copy of 'MarriageRegistry' exists
import web3 from "../web3"; // This pulls it from our web3 instance, not actual web3
import BadgeRegistry from "../build/BadgeRegistry.json";

const instance = new web3.eth.Contract(
  JSON.parse(BadgeRegistry.interface),

  // This si the address of the contract
  "0x53D4F34CD2722C6E11A716d0CD66854BA8afdaB3"
);

export default instance;
