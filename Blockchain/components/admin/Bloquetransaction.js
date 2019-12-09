import React, { Component } from 'react'
import DetalleTransaccion from './DetalleTransaccion'
import { Link } from '../../routes'
export default class Bloquetransaction extends Component {



      render() {
            return (
                  <div><h1 className='text-dark'>Latest Transactions</h1>
                  <div className='barra1'>
                        
                        {this.props.transacciones.map(item =>(
                              <DetalleTransaccion key={item.id} transaccion={item}/>

                        ))}

                  <style jsx>{`
                          .barra1 { 
                              height:700px; 
                              overflow-y: scroll; 
                          }
                 
                        `}
                        </style> 
                  </div>
                  </div>
                 
            )
      }
}
