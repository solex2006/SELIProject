import React, { Component } from 'react'
import { Link } from '../../routes'

export default class Bloque extends Component {
      render() {
            const {number, miner, txns}=this.props.bloque;
            return (
                  <div className="card mb-3 border border-dark">
                        <div className="row no-gutters">
                              <div className="col-md-2">
                                    <img src="/static/Ethereum-Icon.png" className="card-img imgsize rounded" alt="..."/>
                              </div>
                              <div className="col-md-10">
                                    <div className="card-body">
                                    <h5 className="card-title "><Link route={`/admin/${number}`}><p className='btn btn-dark stretched-link'>{number}</p></Link></h5>
                                    <p className="card-text">{`Miner: ${miner}`}</p>
                                    <p className="card-text"><small className="text-muted">{`${txns} txns..`}</small></p>
                                    </div>
                              </div>
                        </div>
                        <style jsx>{`
                        
                        .imgsize {
                              width: 88px;
                              height: auto;
                              text-align: center;
                              }
                        `}
                        </style>
                  </div>
                  
                  
            )
      }
}
