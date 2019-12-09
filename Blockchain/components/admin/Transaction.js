import React, { Component } from 'react'
import { Link } from '../../routes'

export default class Transaction extends Component {
      render() {
            var number=this.props.transaccion;
            return (  
                  <div className="card">
                        <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                    <Link route={`/admin/transaction/${number}`}><a>{this.props.transaccion}</a></Link>      
                              </li>
                        </ul>
                  </div>
     
            )
      }
}
