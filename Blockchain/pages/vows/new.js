import { Container, Form, Button, Icon, Input, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import MarriageRegistry from '../../ethereum/contracts/MarriageRegistry';
import Marriage from '../../ethereum/contracts/Marriage';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { fieldsAreValid, dateToEpoch } from '../../helper';
//////////////////////////////////////////////////////7
import React, { Component } from 'react';
import Layout from '../../components/CertificateLayout'
//import MarriageForm from '../../components/MarriageForm'
import { Link } from '../../routes'
import axios from 'axios';


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
						web3.eth.personal.unlockAccount(accounts[0], "seli", 1500).then(console.log('Account unlocked!'));
						// (1) Create new marriage contract
						let transaction = await MarriageRegistry.methods
							.createMarriage(name, tutor, course, description, date)
							.send({ from: accounts[0] });

						//Update Web app.
						//statefinal.txnHash= transaction.transactionHash, blockWitnessed: transaction.blockNumber;
						//statefinal.successMessage= `Your certificate has been notarized in the block: ${transaction.blockNumber} and transaction hash: ${transaction.transactionHash} REDIRECTING NOW ...`;
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

						await axios.post(`http://localhost:4000/hashes`, hashes )
							.then(res => {
							console.log("certificado_hash: txnHash");
								//console.log(contractAddress);
								}) ;
						

				

						//envia al servidor json
						await axios.post(`http://localhost:4000/certificates`, contratos )
   						 .then(res => {
    						  console.log("Contrato direccion");
							   //console.log(contractAddress);
							}) ;



						console.log("has a serverespe")
						console.log(returnhash);

						//envia hacia hash hacia otro servidor(Mauro
						await axios.post(`https://seli-blockchain-int-test.herokuapp.com/certificate-result`, returnhash )
                                                 .then(res => {
                                                  console.log("Contrato direccion a otro servidor...", res.data);
                                                           //console.log(contractAddress);
                                                        }) ;

						//const contractAddress = transaction.events.ContractCreated.returnValues.contractAddress;
						Router.replaceRoute(`/vows/${contractAddress}`);   
			
					 } catch (err) {
					 	statefinal.errorMessage= err.message;
					 }  
				} else {
					// If input fields have input errors:
					//this.setState({ errorMessage: fieldErrorMsg });
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




