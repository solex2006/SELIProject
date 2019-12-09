import React, { Component } from 'react';
import { Container, Grid, Button, Icon } from 'semantic-ui-react';
import Marriage from '../../ethereum/contracts/Marriage';
import Layout from '../../components/CertificateLayout';
import WitnessedByFooter from '../../components/WitnessedByFooter';
import Withdraw from '../../components/Withdraw';
import web3 from '../../ethereum/web3';
import Head from 'next/head'


class VowsShow extends Component {
  state = {
    WithdrawVisible: false
  }
	// Retrieve the marriage contract instance to show the details
	static async getInitialProps(props) {
    console.log("quiery address............."); 
    console.log(props.query.address); //solo trae ladireccion delurl
		const address = props.query.address;
    const marriage = Marriage(address);
    const marriageDetails = await marriage.methods.getMarriageDetails().call();
     
    const owner = marriageDetails[0];
    console.log("marriagedetails............."); 
    console.log(marriageDetails);
    const leftName = marriageDetails[1];//nombre
    const leftVows = marriageDetails[2];  //Revisor
    const rightName = marriageDetails[3]; //apellido aqui seria eltitulo
    const rightVows = marriageDetails[4]; //la otra revisora seria descropcion
    const date = marriageDetails[5];
    const bellCounter = marriageDetails[6];

    const weiBalance = await marriage.methods.getBalance().call();
    const balance = await web3.utils.fromWei(weiBalance, 'ether');

    return {
      address, owner, leftName, leftVows, rightName, rightVows, date, bellCounter, balance
    };
	}

  async componentDidMount() {
    const viewerAddress = await web3.eth.getAccounts();  //ceunta demetamask
    console.log("web3.eth.getAccounts()");
    console.log(viewerAddress);
    if (this.props.owner == viewerAddress[0]) {
      this.setState({WithdrawVisible: true});
    }
  }

  epochToDate(numString) {
    const date = new Date(parseInt(numString));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[month]} ${day}, ${year}`;
    return dateString;
  }

  trunc(text){
    return (text.length > 300) ? `${text.substr(0, 300)} ...` : text;
  }

  

	render() {
/////////////////////////////////////////////////////

  ///////////////////////////////////////////////
		return (
     
		  <Layout >
        <Head>
          <meta property="og:title" content={this.props.leftName + ' & ' + this.props.rightName}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content={'http://forevermore.io' + this.props.url.asPath}/>
          <meta property="og:image" content=" "/>
          <meta property="og:site_name" content="Forevermore.io"/>
          <meta property="og:description"
                content={'See ' + this.props.leftName + "'s and " + this.props.rightName + "'s wedding vows on the blockchain"}/>
        </Head>
        {(this.state.WithdrawVisible) && <Withdraw address={this.props.address} balance={this.props.balance}/> }
        <Container className='Cert-Container'>
         <div className="acknow">This acknowledges that:</div>
          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Large-Serif'>{ this.props.leftName }</Grid.Column>
           
          </Grid>

        <div className='titulo'>{this.props.rightName}</div>
        <div className='descripcion'>{this.props.rightVows }</div>
        <div className='Form-Input-Label score2'>This certificate validates that the student 
        has approved at least 80% of the credits required in the course.
        </div>
        
        <div className='Form-Input-Label '> <div className='nota'>Certificate By</div></div>
          <Grid id='Vows-Grid' stackable={true} columns='equal' className='bloque'>
            <Grid.Column className='revisor'>{ this.trunc(this.props.leftVows) }</Grid.Column>
          </Grid>
          <div className='Large-Cursive'>{this.epochToDate(this.props.date)}</div>
         <WitnessedByFooter className='revisores' address={this.props.address}/>
        </Container>
		  </Layout>
   
		)
	}
}

export default VowsShow;
