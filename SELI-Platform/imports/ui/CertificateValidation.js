import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import CertificatesValidationForm from '../components/certificates/CertificatesValidationForm';


export default class CertificateValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <CertificatesValidationForm/>
        </MuiThemeProvider>
      </div>
    )
  }
}
