import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepper';
import AppBar from '../components/navigation/AppBar';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import UserInformation from './UserInformation';

import InfoIcon from '@material-ui/icons/Info';
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

export default class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {
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
      typeState: '',
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
        userSteps: [
          {label: this.state.language.information , icon: <InfoIcon className="step-icon"/>},
        ],
        userForms: [
          <UserInformation
            showErrorFunction={showError => this.showError = showError}
            userInformation={this.state.userInformation}
            handleEmail={this.handleEmail.bind(this)}
            handlePassword={this.handlePassword.bind(this)}
            handleControlMessage={this.handleControlMessage.bind(this)}
            language={this.state.language}
            type={this.props.location.type}
          />,
        ],
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.type !== this.props.location.type) {
      this.setState({
        userForms: [
          <UserInformation
            showErrorFunction={showError => this.showError = showError}
            userInformation={this.state.userInformation}
            handleEmail={this.handleEmail.bind(this)}
            handlePassword={this.handlePassword.bind(this)}
            handleControlMessage={this.handleControlMessage.bind(this)}
            language={this.state.language}
            type={this.props.location.type}
          />,
        ],
      });
    }
  }

  showError = () => {

  }

  validateUser = () => {
    if (this.state.userInformation.biography === '' && this.props.location.type === "tutor") {
      this.showError();
      this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
      return false;
    } else {
      if (
        this.state.userInformation.fullname === '' ||
        this.state.userInformation.username === '' ||
        this.state.userInformation.email === '' ||
        this.state.userInformation.password === '' 
      ) {
        this.showError();
        this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
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
      else if (this.state.userInformation.image === undefined && this.props.location.type === "tutor") {
        this.handleControlMessage(true, this.state.language.uploadYourProfilePhoto);
        return false;
      }
      else if (this.state.userInformation.phoneNumber !== "" && this.props.location.type === "tutor") {
        if (this.state.userInformation.countryCode === "") {
          this.handleControlMessage(true, this.state.language.addCountryCode);
          return false;
        }
      }
      else if (this.state.userInformation.countryCode !== "" && this.props.location.type === "tutor") {
        if (this.state.userInformation.phoneNumber === "") {
          this.handleControlMessage(true, this.state.language.addPhoneNumber);
          return false;
        }
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

  createStudent = (information) => {
    Accounts.createUser({
      username: information.username,
      password: information.password,
      email: information.email,
      profile: {
        fullname: information.fullname,
        courses: [],
        type: 'student',
        certificates: [],
        configuration: {
          language: 'English (US)',
        },
      },
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        if (this.state.userInformation.image === undefined){
          undefined
        } else {
          CourseFiles.update(
            { _id: information.image._id},
            { $set: {
              'meta.userId': Meteor.userId(),
            }}
          )
        }
        Meteor.call('sendVEmail',
          Meteor.userId(),
          this.state.userInformation.email,
          (error) => {
            if (error) {
              this.handleError(error);
            }
            else {
              this.requestSent();
            }
          }
        );
        Meteor.logout();
      }
    });
  }

  registerTutor = () => {
    if (this.validateUser()) {
      this.createTutor(this.state.userInformation)
    }
  }

  registerStudent = () => {
    if (this.validateUser()) {
      this.createStudent(this.state.userInformation)
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
        userForms: [
          <UserInformation
            showErrorFunction={showError => this.showError = showError}
            userInformation={this.state.userInformation}
            handleEmail={this.handleEmail.bind(this)}
            handlePassword={this.handlePassword.bind(this)}
            language={this.state.language}
            type={this.props.location.type}
          />,
        ],
        userSteps: [
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
                this.props.location.type === "tutor" ?
                  <React.Fragment>
                    <AppBar
                      history={this.props.history}
                      language={this.state.language}
                      setLanguage={this.setLanguage.bind(this)}
                    />
                    {
                      this.state.userForms !== undefined && this.state.userSteps !== undefined ?
                        <FormStepper
                          title={this.state.language.tutorRegistration}
                          color="secondary"
                          steps={this.state.userSteps}
                          forms={this.state.userForms}
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
                          {this.state.language.dataBeingValidated}
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
                      this.state.userForms !== undefined && this.state.userSteps !== undefined ?
                        <FormStepper
                          title={this.state.language.studentRegistration}
                          color="secondary"
                          steps={this.state.userSteps}
                          forms={this.state.userForms}
                          finalLabel={this.state.language.signUp}
                          saveLabel={undefined}
                          language={this.state.language}
                          finalAction={this.registerStudent.bind(this)}
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
