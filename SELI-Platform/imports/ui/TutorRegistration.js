import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepper';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import TutorInformation from '../components/tutor/TutorInformation';

import InfoIcon from '@material-ui/icons/Info';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {Tutors} from '../../lib/TutorCollection';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorSteps: [
        {label: 'Information', icon: <InfoIcon className="step-icon"/>},
      ],
      tutorInformation: {
        fullname: '',
        username: '',
        password: '',
        biography: '',
        googleLink: '',
        website: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        image: undefined,
      },
      emailValidated: false,
    }
  }

  showControlMessage(){

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    location.replace("/");
  };

  componentDidMount() {
    this.setState({
      tutorForms: [
        <TutorInformation
          showErrorFunction={showError => this.showError = showError}
          tutorInformation={this.state.tutorInformation}
          showControlMessage={this.showControlMessage.bind(this)}
          handleEmail={this.handleEmail.bind(this)}
          handlePassword={this.handlePassword.bind(this)}
        />,
      ],
    })
  }

  showError = () => {

  }

  validateTutor = () => {
    if (
      this.state.tutorInformation.fullname === '' ||
      this.state.tutorInformation.username === '' ||
      this.state.tutorInformation.biography === '' ||
      this.state.tutorInformation.email === '' ||
      this.state.tutorInformation.password === ''
    ) {
      this.showError();
      console.log("required *");
      return false;
    }
    else if (this.state.tutorInformation.image === undefined) {
      console.log("upload your image");
      return false;
    }
    else if (!this.state.emailValidated) {
      console.log("validate your mail");
      return false;
    }
    else if (!this.state.equalPasswords) {
      console.log("Same password");
      return false;
    }
    else if (this.state.tutorInformation.phoneNumber !== "") {
      if (this.state.tutorInformation.countryCode === "") {
        console.log("Phone");
        return false;
      }
    }
    else if (this.state.tutorInformation.countryCode !== "") {
      if (this.state.tutorInformation.phoneNumber === "") {
        console.log("Phone");
        return false;
      }
    }
    return true;
  }

  createTutor = (information) => {
    Accounts.createUser({
      username: information.username,
      password: information.password,
      email: information.email,
      profile: {
        fullname: information.fullname,
        biography: information.biography,
        website: information.website,
        googleLink: information.googleLink,
        countryCode: information.countryCode,
        phoneNumber: information.phoneNumber,
        profileImage: information.image,
        verified: false,
        courses: [],
        type: 'tutor',
      }
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        Meteor.logout();
        this.requestSent();
      }
    });
  }

  registerTutor = () => {
    if (this.validateTutor()) {
      this.createTutor(this.state.tutorInformation)
    }
  }

  requestSent = () => {
    this.handleClickOpen();
  }

  handleError = (error) => {
    console.log(error);
  }

  handleEmail = (value) => {
    this.setState({
      emailValidated: value,
    });
  }

  handlePassword = (value) => {
    this.setState({
      equalPasswords: value,
    });
  }

  render() {
    return(
      <div>
        {
          <MuiThemeProvider theme={theme}>
            <AppBar/>
            {
              this.state.tutorForms !== undefined ?
                <FormStepper
                  title="Tutor registration"
                  color="secondary"
                  steps={this.state.tutorSteps}
                  forms={this.state.tutorForms}
                  finalLabel="Send request"
                  saveLabel={undefined}
                  finalAction={this.registerTutor.bind(this)}
                />
              :
              undefined
            }
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-success"
              aria-describedby="alert-dialog-success"
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
            >
              <DialogTitle className="success-dialog-title" id="alert-dialog-title">{"Your request has been successfully sent!"}</DialogTitle>
              <DialogContent className="success-dialog-content">
                <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                  We have just received your information successfully, we will review the request information as soon as possible and you will receive an email the moment your account is fully active.
                </DialogContentText>
                <CheckCircleIcon className="success-dialog-icon"/>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                  Got it
                </Button>
              </DialogActions>
            </Dialog>
          </MuiThemeProvider>
        }
      </div>
    )
  }
}
