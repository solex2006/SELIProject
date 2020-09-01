import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Link } from '../routes'
import marriageRegistry from '../ethereum/contracts/MarriageRegistry';
import MarriageContract from '../ethereum/contracts/Marriage';
import { Card, Button, Container } from 'semantic-ui-react';
import { epochToDate } from '../helper';
import { Blacklist } from '../blacklist';
import _ from 'lodash';
import axios from 'axios';


///nuevos
class MarriageIndex extends Component {
  static async getInitialProps({ req, query }) {
    //////AQUI RECUPERA LA DIRECCION DE TODOS LOS CERTIFICADOS DE ETHERUM
    const deployedMarriages = await marriageRegistry.methods.getDeployedMarriages().call();
   console.log("console.log(deployedMarriages)");
    console.log(deployedMarriages);
    // Omits blacklisted contract addresses from list, to not be shown
    const displayMarriages = _.difference(deployedMarriages, Blacklist);

    // Now contracts are rendered in LIFO order - perfect
    const allMarriages = displayMarriages.reverse();
    const size = allMarriages.length;

    
    const marriageContracts = await Promise.all(
      Array(size).fill().map((item, index) => {
        return MarriageContract(allMarriages[index]);
      })
    );

  
    // marriageItems are the actual certificates details that will be rendered
    const marriageItems = await Promise.all(
      Array(size).fill().map((item, index) => {
        return marriageContracts[index].methods.getMarriageDetails().call();
      })
    )
 
  //console.log('de llegada en verificar');
  const estado={item:query.itemData };
  //console.log("Variables de estado de verificar.....");
  const state=estado.item;
//Form Validation: check date validity
var cert={certexist: false}
var banderacert=false;
  console.log(state);
 if	(typeof(state) === "undefined"){
    console.log("undefined---No verifica Certificado---");
 }else{
    console.log(" Itera sibre los objetos marriageItems");
    Object.entries(allMarriages).map(values => {
      if(values[1]===state.certificateHash){
          console.log("si esxiste el hash")
          cert={certexist: true}
          console.log( cert);
          axios.post(`https://seli-blockchain-int-test.herokuapp.com/certificate-result`, cert )
   						 .then(res => {
    						  console.log("respuesta del servidor:...", res.data);
							   //console.log(contractAddress);
              }) 
          banderacert=true;
      }
      else{
        console.log("no esxiste el hash")
      } 
      
    })

    if(banderacert===false){
      cert={certexist: false}
      console.log( cert);
      axios.post(`https://seli-blockchain-int-test.herokuapp.com/certificate-result`, cert )
              .then(res => {
                console.log("respuesta del servidor en caso de no registro:...", res.data);
               //console.log(contractAddress);
            })
    }
 }

    return { allMarriages, marriageItems };
  }

  renderItems() {
    const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    const items = this.props.marriageItems.map((marriage, index) => {
      return {
        key: this.props.allMarriages[index],
        color: colors[index % colors.length],
        header: `${marriage[1]} ${marriage[3]}`, //nombres y apellidos de student
        meta: ` Certified ${epochToDate(marriage[5])} `,
        description: (
          <Link route={`/vows/${this.props.allMarriages[index]}`}>
            <a className='vows-link'>{ `${marriage[2]}`}</a>
          </Link>
          ),
        fluid: true
      }
    })

    return <Card.Group items= { items } className='Index-Cards' itemsPerRow={4} stackable={true} doubling={true}/>
  }

  render() {
    return (
      <Layout>
      
        <Container>
            <a name="vows"><h2 className='Vows-Title'>Certificates</h2></a>
          { this.renderItems() }
        </Container>
      </Layout>
    )
  }
}

export default MarriageIndex;
