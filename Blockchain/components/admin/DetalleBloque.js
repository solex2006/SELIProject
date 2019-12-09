import React, { Component } from 'react'
import Transaction from './Transaction'

export default class DetalleBloque extends Component {
      render() {
            console.log("propiedades")
            const {BlockHeight,timestamp,transactions, Minedby, UnclesReward, Difficulty, totalDifficulty,
                  Size, gasUsed, gasLimit, extraData, hash, parentHash, sha3Uncles, nonce}=
                  this.props.datadetailblock;
            console.log("Extra-DATA......")
            console.log(hash)
            return (

            <div className='container'>
                  <div className='row'>
                        <div className='col-md-6'>
                              <table className="table table-responsive">
                                    <thead>
                                    <tr>
                                          <th scope="col">Parameter</th>
                                          <th scope="col">Description</th>
                                          
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                          <th scope="row">BlockHeight:</th>
                                          <td>{BlockHeight}</td>
                                    
                                    </tr>
                                    <tr>
                                          <th scope="row">Difficulty</th>
                                          <td>{Difficulty}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">TotalDifficulty</th>
                                          <td>{totalDifficulty}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">Size</th>
                                          <td>{Size}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">gasLimit</th>
                                          <td>{gasLimit}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">extraData</th>
                                          <td>{extraData}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">hash</th>
                                          <td>{hash}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">parentHash:</th>
                                          <td>{parentHash}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">sha3Uncles:</th>
                                          <td>{sha3Uncles}</td>
                                          
                                    </tr>
                                    <tr>
                                          <th scope="row">nonce:</th>
                                          <td>{nonce}</td>
                                          
                                    </tr>
                                    </tbody>
                                    </table>
                        </div>
                        <div className='col-md-6'>
                              <div className="card-body">
                              <h5 className="card-title font-weight-bold">Transactions in Block # {BlockHeight}</h5>
                              </div>
                              {this.props.transactions.map(transaccion=>(
                                    <Transaction key={transaccion} transaccion={transaccion}/>
                              ))}
                        </div>
                  </div>
            </div>




            )
      }
}
