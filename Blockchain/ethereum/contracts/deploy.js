// Never commit this file!

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../build/BadgeRegistry.json');
const fs = require('fs-extra')
const config = require('../../config');

const provider = new HDWalletProvider(
  // NEVER SHARE your keys!
  'YOUR OWN KEY FOR DEPLOYING FACTORY CONTRACT',
  'https://mainnet.infura.io/[YOUR ACCOUNT]'
);

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.blockcahinAddress));


const deploy = async () => {
  console.log("Starting to deploy...");
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000' });

  console.log(compiledFactory.interface);
  console.log('Contract deployed to', result.options.address);

}
deploy();


