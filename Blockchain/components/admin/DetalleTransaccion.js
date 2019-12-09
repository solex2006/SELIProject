import React, { Component } from 'react'
import web3 from '../../ethereum/web3';
import { Link } from '../../routes'
export default class DetalleTransaccion extends Component {

      state={
            address:'',
            from: '',
            to: ''
      }

      async componentDidMount(){
            const address=this.props.transaccion.txnsHash;
            const transaction= await web3.eth.getTransaction(address);
            console.log("transaction")
            console.log(transaction)
            this.setState({ address:address, from:transaction.from, to:transaction.to})


      }

      render() {
            return (
               
                  <div className='barra1'>
                        <div className="media border border-dark ">
                              <img src="/static/tran.png" className="size" alt="..."/>
                              <div className="media-body">
                              <small className="break-word"><Link route={`/admin/transaction/${this.state.address}`}>{this.props.transaccion.txnsHash}</Link></small>
                              <small className="break-word">From: {this.state.from} </small>
                              <small className="break-word">To: {this.state.to}  </small>
                              </div>
                        </div>

                        <style jsx>{`
                        .break-word {
                              hyphens: auto;
                              font-size: 1 px;
                              display: block
                        }
                        .barra { 
                              height:100px; 
                              overflow-x: scroll; 
                          }
                          .size{
                              width: 70px;
                              height: auto;
                          }
                       
                        `}
                        </style> 
                        
                  </div>
                
            )
      }
}
