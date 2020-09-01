import React, { Component } from 'react'
import web3 from '../../ethereum/web3';
import MasterPage from '../../components/Master';
import axios from 'axios';
const config=require('../../config')
export default class transaction extends Component {

      static async getInitialProps(props) {
            var address= props.query.address;
            console.log("longitud....")
            console.log(address.length)
            if(address.length===42){
                  const URI=`${config.addressJsonServerHash}?q=${address}`
                  console.log(URI)
                  await axios.get(URI)
                        .then((res) => {
                              address = res.data[0].txnsHash;
                              console.log("existe el hash de 42....")
                              console.log(address)}
                              //Router.replaceRoute(`/admin/transaction/0x2c9de24531b1251f27d3578c745c91dbba88374439c0fce7fb82fb2b339fd786`);                      

            )}//pasa la direccion de contrato a direccion de transaccion



            
            const transaction= await web3.eth.getTransaction(address);
            return {address, transaction}
      }
      render() {
            console.log(this.props.transaction.hash)
            return (
                  <MasterPage>
                        <div className="card border-primary mb-3">
                              <div className="card-header">Transaction Hash:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.hash}</h5>
                              </div>
                              <div className="card-header">Block:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title"> {this.props.transaction.blockNumber}</h5>
                              </div>
                              <div className="card-header">From:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.from}</h5>
                              </div>
                              <div className="card-header">To:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.to}</h5>
                              </div>
                              <div className="card-header">Value:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.value}</h5>
                              </div>
                              <div className="card-header">Gas Used by Transaction:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.gas}</h5>
                              </div>
                              <div className="card-header">Gas Price:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.gasPrice}</h5>
                              </div>
                              <div className="card-header">Nonce:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.nonce}</h5>
                              </div>
                              <div className="card-header">Input Data:</div>
                              <div className="card-body text-primary">
                              <h5 className="card-title">{this.props.transaction.input}</h5>
                              </div>
                        </div>
                  </MasterPage>
            )
      }
}
