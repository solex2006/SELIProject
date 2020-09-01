import React, { Component } from 'react'
import web3 from '../ethereum/web3';
import Header from '../components/admin/Header';
import Bloques from '../components/admin/Bloques';
import marriageRegistry from '../ethereum/contracts/MarriageRegistry';
import MasterPage from '../components/Master';
import Formcert from '../components/admin/FormCert'
import Bloquetransaction from '../components/admin/Bloquetransaction'
import Busqueda from '../components/admin/Busqueda'
import axios from 'axios';
const config = require('../config')
export default class admin extends Component {
      state={
            datamainblock: [],
            transacciones: []
      }
      componentDidMount() {
            this.obtenerBloques();
            this.obtenerTransacciones();
      }     
      obtenerBloques= ()=>{
            //saca el numero de bloque, el miner y las transacciones en ese bloque.
            web3.eth.getBlockNumber().then((latest) => {    
                  for (let i = 0; i < 10; i++) {
                        var arraya=[]
                        web3.eth.getBlock(latest - i)
                        .then((bloque)=>{   
                              var datamainblock= {
                                    "number": bloque.number,
                                    "miner": bloque.miner,
                                    "txns": bloque.transactions.length
                              }
                              arraya.push(datamainblock)
                              this.setState({datamainblock:arraya})     
                         })                
                  }
            })
      }


      obtenerTransacciones= ()=>{
            const URI=config.addressJsonServerHash
            axios.get(URI)
                  .then(res => {
                        console.log("res.DATA")
                        console.log(res.data)        
                        const txns = res.data;  
                        this.setState({transacciones: txns})
                  })
      }

      render() {
            return (
                  <MasterPage>
                        <div className='container'> 
                              <Header titulo='SELI ETHERSCAN' />
                      
                              <Busqueda/>
                              <div className='row'>
                                    <div className='col-md-5'>
                                          <Bloques datamainblock={this.state.datamainblock} />
                                    </div>
                                    <div className='col-md-7'>
                                          <Bloquetransaction transacciones={this.state.transacciones}/>
                                          
                                        {/*   <h1>Crear certificados manualmente</h1>
                                          <Formcert/> */}
                                    </div>      
                              </div> 
                        </div>
                  </MasterPage>
            )
      }
}
