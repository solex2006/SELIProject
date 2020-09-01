import { Button, Icon } from "semantic-ui-react";
import BadgeRegistry from "../../ethereum/contracts/BadgeRegistry";

import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import { fieldsAreValid, dateToEpoch } from "../../helper";
import React, { Component } from "react";
import axios from "axios";
const config = require("../../config");

class BadgeNew extends Component {
  static async getInitialProps({ req, query }) {
    console.log("issueBadge New");
    const estado = { item: query.itemData };
    console.log("Variaibles de estado.....");
    const state = estado.item;
    //Form Validation: check date validity
    console.log(state);

    if (typeof state === "undefined") {
      console.log("undefined---No genera badge---");
      return {};
    } else {

      console.log("armando la badge");
      console.log(state);
      //arma el objeto con los datos del alumno
      var statefinal = {
        _id: state.id,
        _ownerIdentity: state.recipient.identity, //salted email//
        _badgeClassId: state.badge.id,
        _date: state.issuedOn,
        loading: false,
        errorMessage: "",
        successMessage: "",
        txnHash: 0,
        badgeContractAddress: 0,
        blockWitnessed: 0,
      };
      //   const fieldErrorMsg = fieldsAreValid(statefinal); para verificar la correctitud de datois
      //   if (!fieldErrorMsg) {
      console.log("Pasa y genera la badge...",statefinal);
      let { _id, _ownerIdentity, _badgeClassId } = statefinal;
      const date = dateToEpoch(JSON.stringify(statefinal._date).substr(1,10));
      console.log(JSON.stringify(statefinal._date).substr(1,10));
      console.log(_id)
      console.log(date)
      // Submitting form to the blockchain
      try {
        const accounts = await web3.eth.getAccounts();
        web3.eth.personal
          .unlockAccount(accounts[0], config.keyAccount, 1500)
          .then(console.log("Account unlocked!"));
        // (1) Create new Badge contract
        let transaction = await BadgeRegistry.methods
          .createBadge(_id, _ownerIdentity, _badgeClassId, date)
          .send({ from: accounts[0] });
        console.log("after transaction line 58")
        console.log(transaction)
        const txnHash = await transaction.transactionHash;
        const blockWitnessed = await transaction.blockNumber;
        const contractAddress = await transaction.events.ContractCreated
          .returnValues.contractAddress;
        console.log("Direccion del contrato..........");
        console.log(contractAddress);
        console.log("direccion de la transaccion..........");
        console.log(txnHash);
        console.log("El bloque utulizado..........");
        console.log(blockWitnessed);
        const contratos = {
          name: name,
          course: course,
          contract: contractAddress,
          transacction: txnHash,
          numberblock: blockWitnessed,
        };
        //array que devuelve al otro Server
        const returnhash = {
          idStudent: state._id,
          certificateHash: contractAddress,
        };
        const hashes = {
          txnsHash: txnHash,
          contractAddress: contractAddress,
        };

        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        await axios
          .post(config.addresSeliPlatform, returnhash, axiosConfig)
          .then((res) => {
            console.log("Contrato direccion a otro servidor...", res.data);
          })
          .catch((err) => {
            console.log("EEROR DE NVIANDO DATOS  A SELI");
          });
        Router.replaceRoute(`/badges/${contractAddress}`);
      } catch (err) {
        statefinal.errorMessage = err.message;
      }
      //   } else {
      //     console.log("Los campos no estan llenos.......");
      //   }
      statefinal.loading = false;
      return {};
    }
    //////////////////////////////////////////////////////////////////////////////////////
  }
  render() {
    console.log("Metodo de preuba");
    return (
      <Button id="MarriageBtn" icon labelPosition="left">
        <Icon name="book" />
        Issue Badge
      </Button>
    );
  }
}
export default BadgeNew;
