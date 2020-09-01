import {Button, Icon} from 'semantic-ui-react';
import MarriageRegistry from '../../ethereum/contracts/MarriageRegistry';
import Marriage from '../../ethereum/contracts/Marriage';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { fieldsAreValid, dateToEpoch } from '../../helper';
import React, { Component } from 'react';
import axios from 'axios';
const config = require('../../config')


class VowsNew extends Component {
static async getInitialProps ({ req, query }) {

        console.log('dellegada');
		const estado={item:query.itemData };
		console.log("Variaibles de estado.....");
		const state=estado.item;
		//Form Validation: check date validity
		console.log(state);

		 if	(typeof(state) === "undefined"){
				console.log("undefined---No genera Certificado---");
				return {};
			}else{
				//arma el objeto con los datos del alumno
				var statefinal={
						name: state.name,  //nombres y apellidos//
						course: state.course,
						tutor: state.tutor,
						description: state.description,
						date: state.date,
						loading: false,
						errorMessage: '',
						successMessage: '',
						txnHash: 0,
						marriageContractAddress: 0,
						blockWitnessed: 0
				}
				const fieldErrorMsg = fieldsAreValid(statefinal);
				if (!fieldErrorMsg) {
					console.log('Pasa y genera el Certificado...');
					let { name, tutor, course, description } = statefinal;
					const date = dateToEpoch(statefinal.date);

					// Submitting form to the blockchain
					 try {
						const accounts = await web3.eth.getAccounts();
						web3.eth.personal.unlockAccount(accounts[0], config.keyAccount, 1500).then(console.log('Account unlocked!'));
						// (1) Create new marriage contract
						let transaction = await MarriageRegistry.methods.createMarriage(name, tutor, course, description, date).send({ from: accounts[0] });
						const txnHash=await transaction.transactionHash;
						const blockWitnessed=await transaction.blockNumber;
        				const contractAddress =await transaction.events.ContractCreated.returnValues.contractAddress;
						console.log("Direccion del contrato..........");
						console.log(contractAddress);
						console.log("direccion de la transaccion..........");
						console.log(txnHash);
						console.log("El bloque utulizado..........");
						console.log(blockWitnessed);
						const contratos={
							name:name,
							course:course,
							contract:contractAddress,
							transacction:txnHash,
							numberblock:blockWitnessed
						  }
						//array que devuelve al otro Server
						const returnhash={
							idStudent: state.idStudent,
							certificateHash:contractAddress
						  }
						const hashes={
							txnsHash: txnHash,
							contractAddress: contractAddress}

						await axios.post(config.addressJsonServerHash, hashes ).then(res => {
						 	console.log("Certificado_hash: TxnHash");
						}).catch((err) => {
							 console.log("ERROR AL ENVIAR EL JSON  EN HASHES", err);
						})
						// //envia al servidor json
						await axios.post(config.addressJsonServerCert, contratos).then(res => {
    				 		  console.log("Contrato direccion");
						}).catch((err) => {
							   console.log("ERROR AL ENVIAR EL JSON  EN CERTIFICATES", err);
						})

						let axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8',"Access-Control-Allow-Origin": "*",}};
						process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
						await axios.post(config.addresSeliPlatform, returnhash, axiosConfig ).then(res => {
						console.log("Contrato direccion a otro servidor...", res.data);
						}).catch((err) => { console.log("EEROR DE NVIANDO DATOS  A SELI");})
						Router.replaceRoute(`/vows/${contractAddress}`); 

					} catch (err) {
						statefinal.errorMessage= err.message;
					}
				} else {
					console.log('Los campos no estan llenos.......');
				}
				statefinal.loading= false;
				return {};
			}
//////////////////////////////////////////////////////////////////////////////////////
	}
	render () {
		console.log('Metodo de preuba');
		return(
		<Button  id='MarriageBtn' icon labelPosition='left'>
			<Icon name='book' />
			Issue Certificate
		</Button>
		)
	}
}
export default VowsNew;
