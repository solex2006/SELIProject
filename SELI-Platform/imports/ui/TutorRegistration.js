import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepper';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import TutorInformation from '../components/tutor/TutorInformation';

import InfoIcon from '@material-ui/icons/Info';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CourseFiles from '../../lib/CourseFilesCollection';

import english from '../../lib/translation/english';
import portuguese from '../../lib/translation/portuguese';

export default class TutorRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'subscribed') {
        action = () => this.showComponent('subscribed');
      }
      this.setState({
        showControlMessage: show,
        controlMessage: message,
        controlAction: action,
        controlActionMessage: actionMessage,
        showControlAction: showAction,
        course: action === 'preview' ? course : undefined
      });
    }
    else {
      this.setState({
        showControlMessage: show,
      });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push({
      pathname: "/",
      state: {
        language: this.state.language,
      }
    });
  };

  componentDidMount() {
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    }, () => {
      this.setState({
        tutorSteps: [
          {label: this.state.language.information , icon: <InfoIcon className="step-icon"/>},
        ],
        tutorForms: [
          <TutorInformation
            showErrorFunction={showError => this.showError = showError}
            tutorInformation={this.state.tutorInformation}
            handleEmail={this.handleEmail.bind(this)}
            handlePassword={this.handlePassword.bind(this)}
            language={this.state.language}
          />,
        ],
      })
    });
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
      this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
      return false;
    }
    else if (this.state.tutorInformation.image === undefined) {
      this.handleControlMessage(true, this.state.language.uploadYourProfilePhoto);
      return false;
    }
    else if (!this.state.emailValidated) {
      this.handleControlMessage(true, this.state.language.validateYourMail);
      return false;
    }
    else if (!this.state.equalPasswords) {
      this.handleControlMessage(true, this.state.language.passwordsNotMatch);
      return false;
    }
    else if (this.state.tutorInformation.phoneNumber !== "") {
      if (this.state.tutorInformation.countryCode === "") {
        this.handleControlMessage(true, this.state.language.addCountryCode);
        return false;
      }
    }
    else if (this.state.tutorInformation.countryCode !== "") {
      if (this.state.tutorInformation.phoneNumber === "") {
        this.handleControlMessage(true, this.state.language.addPhoneNumber);
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
        configuration: {
          language: 'English (US)',
        },
      },
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        CourseFiles.update(
          { _id: information.image._id},
          { $set: {
            'meta.userId': Meteor.userId(),
          }}
        )
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
    let errorLabel = '';
    if (error.reason === 'Username already exists.') {
      errorLabel = this.state.language.userAlreadyExists;
    }
    else if (error.reason === 'Email already exists.') {
      errorLabel = this.state.language.emailAlreadyExists;
    }
    else {
      errorLabel = this.state.language.unknownError;
    }
    this.handleControlMessage(true, errorLabel);
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

  setLanguage = (option) => {
    let language = this.state.language;
    if (option === 'Portuguese (PT)') {
      Session.set({language: portuguese});
      language = portuguese;
    }
    else if (option === 'English (US)') {
      Session.set({language: english});
      language = english;
    }
    this.setState({
      language: language,
    }, () => {
      this.setState({
        tutorForms: [
          <TutorInformation
            showErrorFunction={showError => this.showError = showError}
            tutorInformation={this.state.tutorInformation}
            handleEmail={this.handleEmail.bind(this)}
            handlePassword={this.handlePassword.bind(this)}
            language={this.state.language}
          />,
        ],
        tutorSteps: [
          {label: this.state.language.information, icon: <InfoIcon className="step-icon"/>},
        ],
      })
    });
  }

  render() {
    return(
      <div>
        {
          <MuiThemeProvider theme={theme}>
            {
              this.state.language && Session.get('language') ?
                <React.Fragment>
                  <AppBar
                    history={this.props.history}
                    language={this.state.language}
                    setLanguage={this.setLanguage.bind(this)}
                  />
                  {
                    this.state.tutorForms !== undefined && this.state.tutorSteps !== undefined ?
                      <FormStepper
                        title={this.state.language.tutorRegistration}
                        color="secondary"
                        steps={this.state.tutorSteps}
                        forms={this.state.tutorForms}
                        finalLabel={this.state.language.sendRequest}
                        saveLabel={undefined}
                        language={this.state.language}
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
                    <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.language.resquestSuccessfullySent}</DialogTitle>
                    <DialogContent className="success-dialog-content">
                      <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                        {/*We have just received your information successfully, we will review the request information as soon as possible and you will receive an email the moment your account is fully active.*/}
                        {this.state.language.accountSuccessfully}
                      </DialogContentText>
                      <CheckCircleIcon className="success-dialog-icon"/>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                        {this.state.language.gotIt}
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <ControlSnackbar
                    showControlMessage={this.state.showControlMessage}
                    showControlAction={this.state.showControlAction}
                    controlMessage={this.state.controlMessage}
                    controlAction={this.state.controlAction}
                    controlActionMessage={this.state.controlActionMessage}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                  />
                </React.Fragment>
              :
              undefined
            }
          </MuiThemeProvider>
        }
      </div>
    )
  }
}
