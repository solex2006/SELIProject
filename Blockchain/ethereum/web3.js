const config = require('../config')
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const web3 = new Web3(config.blockcahinAddress)
export default web3;
