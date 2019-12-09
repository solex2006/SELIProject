// This file creates a web3 instance for our app
// We refer to this web3 instance in other files


// import Web3 from 'web3';

// let web3;

// // Logic to see which environment we are in (either server or client-side)
// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // We are in the browser and metamask is running
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   // We are on the server OR the user is not running metamask
//   const provider = new Web3.providers.HttpProvider(
//     // 'https://rinkeby.infura.io/pBXAeKwWE9Y2B3y2sRnw'
//     //'https://mainnet.infura.io/ukTTF6TIcLu8rqO10w98'
//     'https://rinkeby.infura.io/RIJW9wglrNIdFrdbQXJY'
//   );
//   web3 = new Web3(provider);  // Reassign web3 to provider
// }
// export default web3;
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');


const web3 = new Web3('http://201.159.223.92:9091')
export default web3;
