import web3 from '../web3';
import Badge from '../build/Marriage.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Badge.interface),
    address
  )
}
