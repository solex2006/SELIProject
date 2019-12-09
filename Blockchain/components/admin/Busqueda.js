import React, { Component } from 'react'
import { Router } from '../../routes';
import axios from 'axios';
export default class Busqueda extends Component {
      state={
            txnsflag: true
      }

      hash=React.createRef()
      search= async (e)=>{
            e.preventDefault()
            //validar si e suna direccion correcta
            const hashx=this.hash.current.value;
            const longitud=hashx.length
            console.log(longitud)
            console.log(hashx)
            if(longitud===42){
                  console.log("HASH de contrato")
                  //Busca la transcacion de este contrato en la API
                  //http://localhost:3002/hashes?q=0x33918c7E85b178DFE70B8ff9da5ad1227B94CA3
                  const URI=`http://localhost:4000/hashes?q=${hashx}`
                  console.log(URI)
                  axios.get(URI)
                        .then(res => {
                              console.log(res)
                              if(res.data.length>0){
                                    const txns = res.data[0].txnsHash;
                                    const txnsflag=true;  //existe el hash
                                    console.log("existe el hash")
                                    console.log(txns)
                                    this.setState({txnsflag: true})
                                    Router.replaceRoute(`/admin/transaction/${txns}`);
                                   
                              }else{
                                    const txnsflag=false; //no esxiste el hash
                                    console.log(" NoC existe el hash")
                                    this.setState({txnsflag: false})
                              }
                        
                        //this.setState({ persons });
                        })
            }else if(longitud===66){
                  console.log("HASH de transacccion")
                  const URI=`http://localhost:4000/hashes?q=${hashx}`
                  console.log(URI)
                  axios.get(URI)
                        .then(res => {
                              console.log(res)
                              if(res.data.length>0){
                                    console.log("Esta registrado ese HASH")
                                    this.setState({txnsflag: true})
                                    Router.replaceRoute(`/admin/transaction/${hashx}`);   
                              }else{
                                    const txnsflag=false; //no esxiste el hash
                                    console.log("No esta Registrado ese hash")
                                    this.setState({txnsflag: false})
                              }})

            }else{
                  console.log("HASH incorrecto")
                  this.setState({txnsflag: false})
            }
      }
      mostrarResultados = () => {
            if(this.state.txnsflag===true) return null;
            return (
                  <div className="card w-75">
                        <div className="card-body">
                              <h5 className="card-title btn btn-secondary">Sorry, We are unable to locate this TxnHash</h5>
                        </div>
                  </div>
            )
       }

      render() {
            return (
                  <div>
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Ethereum Blockchain Explorer</strong>
                              <form className="form-block" onSubmit={this.search}>
                              <input ref={this.hash} className="form-control mr-sm-2" type="search" placeholder="Search by Trx Hash, Block or contract" aria-label="Search"/>
                              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {this.mostrarResultados()}
                        </div>
                  </div>
            )
      }
}
