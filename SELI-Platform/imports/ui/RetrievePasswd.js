import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepperAux';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import RetrieveInformation from '../components/tools/RetrieveInformation';
import ResetInformation from '../components/tools/ResetInformation';

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
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from "../../lib/translation/polish";
import turkish from "../../lib/translation/turkish";

Session.set("resetPass",false);

export default class RetrievePasswd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: "",
      RetrieveInformation: {
        email: '',
      },
      ResetInformation: {
        password: '',
      },
      emailValidated: false,
    }
  }

  componentDidMount() { 
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    }, () => {
      this.setState({
        retrieveSteps: [
          {label: this.state.language.sendingEmail , icon: <InfoIcon className="step-icon"/>},
          {label: this.state.language.newPasswd , icon: <InfoIcon className="step-icon"/>},
        ],
        retrieveForms: [
          <RetrieveInformation
            showErrorFunction={showError => this.showError = showError}
            RetrieveInformation={this.state.RetrieveInformation}
            handleEmail={this.handleEmail.bind(this)}
            language={this.state.language}
          />,
          <ResetInformation
            showErrorFunction={showError => this.showError = showError}
            ResetInformation={this.state.ResetInformation}
            handlePassword={this.handlePassword.bind(this)}
            language={this.state.language}
          />,
        ],
        hash: Session.get("resetToken")
      })
    });
    if(Accounts._resetPasswordToken){
      Session.set("resetToken",Accounts._resetPasswordToken)
      Session.set("resetPass",true);
    }
    return Session.get("resetPass");
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

  showError = () => {

  }

  validateRetrieve = () => {
    if (
      this.state.RetrieveInformation.email === ''
    ) {
      this.showError();
      this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
      return false;
    }
    else if (!this.state.emailValidated) {
      this.handleControlMessage(true, this.state.language.validateYourMail);
      return false;
    }
    return true;
  }

  validateReset = () => {
    if (
      this.state.ResetInformation.password === ''
    ) {
      this.showError();
      this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
      return false;
    }
    else if (!this.state.equalPasswords) {
      this.handleControlMessage(true, this.state.language.passwordsNotMatch);
      return false;
    }
    return true;
  } 

  resetingPasswd = (newPassword) => {
    Accounts.resetPassword(
      Session.get("resetToken"), 
      newPassword, 
      (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        this.requestSent();
      }
    })
  }

  sendEmailRequest = (email) => {
    Accounts.forgotPassword({email: email}, (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        this.requestSent();
      }
    }) 
  }

  changePasswd = () => {
    if (this.validateReset()) {
      this.resetingPasswd(this.state.ResetInformation.password)
    }
  }

  registerRetrieve = () => {
    if (this.validateRetrieve()) {
      this.sendEmailRequest(this.state.RetrieveInformation.email)
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
    else if (option === 'Spanish (ES)') {
      Session.set({language: spanish});
      language = spanish;
    }
    else if (option === 'Polish (PL)') {
      Session.set({language: polish});
      language = polish;
    }
    else if (option === 'Turkish (TR)') {
      Session.set({language: turkish});
      language = turkish;
    }
    this.setState({
      language: language,
    }, () => {
      this.setState({
        retrieveSteps: [
          {label: this.state.language.sendingEmail, icon: <InfoIcon className="step-icon"/>},
          {label: this.state.language.newPasswd, icon: <InfoIcon className="step-icon"/>},
        ],
        retrieveForms: [
          <RetrieveInformation
            showErrorFunction={showError => this.showError = showError}
            RetrieveInformation={this.state.RetrieveInformation}
            handleEmail={this.handleEmail.bind(this)}
            language={this.state.language}
          />,
          <ResetInformation
            showErrorFunction={showError => this.showError = showError}
            ResetInformation={this.state.ResetInformation}
            handlePassword={this.handlePassword.bind(this)}
            language={this.state.language}
          />,
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

                Session.get("resetToken") ? 
                
                  <React.Fragment>
                    <AppBar
                      history={this.props.history}
                      language={this.state.language}
                      setLanguage={this.setLanguage.bind(this)}
                    />
                    {
                      this.state.retrieveForms !== undefined && this.state.retrieveSteps !== undefined ?
                        <FormStepper
                          title={this.state.language.retrievingPasswd}
                          color="secondary"
                          steps={this.state.retrieveSteps}
                          forms={this.state.retrieveForms}
                          finalLabel={this.state.language.rPasswd}
                          saveLabel={undefined}
                          language={this.state.language}
                          finalAction={this.changePasswd.bind(this)}
                          hashStepper={Session.get("resetToken")}
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
                      <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.language.passwdChanged}</DialogTitle>
                      <DialogContent className="success-dialog-content">
                        <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                          {this.state.language.dbUpdated}
                        </DialogContentText>
                        <CheckCircleIcon className="success-dialog-icon"/>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => this.handleClose()} color="secondary" variant="contained" autoFocus>
                          {this.state.language.ok}
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
                  <React.Fragment>
                    <AppBar
                      history={this.props.history}
                      language={this.state.language}
                      setLanguage={this.setLanguage.bind(this)}
                    />
                    {
                      this.state.retrieveForms !== undefined && this.state.retrieveSteps !== undefined ?
                        <FormStepper
                          title={this.state.language.retrievingPasswd}
                          color="secondary"
                          steps={this.state.retrieveSteps}
                          forms={this.state.retrieveForms}
                          finalLabel={this.state.language.sendEmail}
                          saveLabel={undefined}
                          language={this.state.language}
                          finalAction={this.registerRetrieve.bind(this)}
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
                          {this.state.language.verifyingEmail}
                        </DialogContentText>
                        <CheckCircleIcon className="success-dialog-icon"/>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => this.handleClose()} color="secondary" variant="contained" autoFocus>
                          {this.state.language.ok}
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
