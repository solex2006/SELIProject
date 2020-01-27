import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepper';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import BadgeInformation from './BadgeInformation';

import InfoIcon from '@material-ui/icons/Info';

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
import turkish from "../../lib/translation/turkish";

export default class BadgeRegistration extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      badgeInformation: {
        fullname: '',
        username: '',
        image: undefined,
      },
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

  

  handleClose = () => {
   
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
          <BadgeInformation
            showErrorFunction={showError => this.showError = showError}
            badgeInformation={this.state.badgeInformation}
            language={this.state.language}
            type={this.props.location.type}
          />,
        ],
      })
    });
    console.log(this.state);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.location.type !== this.props.location.type) {
  //     this.setState({
  //       userForms: [
  //         <BadgeInformation
  //           showErrorFunction={showError => this.showError = showError}
  //           badgeInformation={this.state.badgeInformation}
  //           language={this.state.language}
  //           type={this.props.location.type}
  //         />,
  //       ],
  //     });
  //   }
  // }

  showError = () => {

  }

  validateUser = () => {

      if (
        this.state.badgeInformation.fullname === '' ||
        this.state.badgeInformation.username === '' 
      ) {
        this.showError();
        this.handleControlMessage(true, this.state.language.fieldsMarkedWith);
        return false;
      }
      else if (this.state.badgeInformation.image === undefined && this.props.location.type === "tutor") {
        this.handleControlMessage(true, this.state.language.uploadYourProfilePhoto);
        return false;
      }

    return true;
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
        if (this.state.badgeInformation.image === undefined){
          undefined
        } else {
          CourseFiles.update(
            { _id: information.image._id},
            { $set: {
              'meta.userId': Meteor.userId(),
            }}
          )
        }
      }
    });
  }

  registerStudent = () => {
    console.log(this.state.language.open);
  }


  handleError = (error) => {
    let errorLabel = error;
    
    this.handleControlMessage(true, errorLabel);
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
    else if (option === 'Turkish (TR)') {
      Session.set({language: turkish});
      language = turkish;
    }
    this.setState({
      language: language,
    }, () => {
      this.setState({
        userForms: [
          <BadgeInformation
            showErrorFunction={showError => this.showError = showError}
            userInformation={this.state.badgeInformation}
            language={this.state.language}
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
          this.state.language && Session.get('language') ?
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
      </div>
    )
  }
}
