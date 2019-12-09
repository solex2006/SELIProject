import React, { Component } from 'react'
import web3 from '../../ethereum/web3';
import DetalleBloque from '../../components/admin/DetalleBloque'
import MasterPage from '../../components/Master';

export default class blockdtl extends Component {

      static async getInitialProps(props) {  //para sobrecargar los props
            console.log("Este es el numero del Bloque............."); 
            console.log(props.query.address); //solo trae ladireccion delurl
            const address= props.query.address ;
            //Encuentra la Informacion del Bloque//
            var bloque= await web3.eth.getBlock(address)
            
            var datadetailblock= {
                  "BlockHeight": bloque.number,
                  "timestamp:":bloque.timestamp,
                  "transactions":bloque.transactions.length,
                  "Minedby:": bloque.miner,
                  "UnclesReward":bloque.uncles,
                  "Difficulty":bloque.difficulty,
                  "totalDifficulty":bloque.totalDifficulty,
                  "Size":bloque.size,
                  "gasUsed":bloque.gasUsed,
                  "gasLimit":bloque.gasLimit,
                  "extraData":bloque.extraData,
                  "hash":bloque.hash,
                  "parentHash":bloque.parentHash,
                  "sha3Uncles":bloque.sha3Uncles,
                  "nonce":bloque.nonce     
            }
            var transactions=bloque.transactions;
            return {address, datadetailblock, transactions};
              }   
      render() {
            return (
                  <MasterPage>      
                        <DetalleBloque
                              datadetailblock={this.props.datadetailblock}
                              transactions={this.props.transactions}
                        />
                  </MasterPage>
            )
      }
}
