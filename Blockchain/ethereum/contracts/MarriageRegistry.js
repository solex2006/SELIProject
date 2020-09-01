// Tell web3 that a deployed copy of 'MarriageRegistry' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import MarriageRegistry from '../build/MarriageRegistry.json';

const instance = new web3.eth.Contract(
  JSON.parse(MarriageRegistry.interface),
  //'spoil differ color fashion tumble trick clown stumble clap apple project front'
    
  // This si the address of the contract factory
  // '0x7117f833A11ecFAddD3cBFbe521219b67Fe64FEb'

  // Mainnet
  //'0xf600c8faf89504850e26bcb8c03d04fa5b00ac8f'
  //'0xf0bc3B6f9dEA14b9095a3f9A9432A11ec5E9b3AB'
  //'0xce074c264A40Ab5E8e1667D7c60d50C159BF6920'
  '0x94D29bd77cc5F4CA8CB7C5a2daBaeA53b4A23019'
);

export default instance;
