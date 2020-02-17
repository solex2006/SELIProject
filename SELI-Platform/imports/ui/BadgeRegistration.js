import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import FormStepper from '../components/navigation/FormStepper';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import BadgeInformation from './BadgeInformation';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
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
import CourseFilesCollection from '../../lib/CourseFilesCollection';
import TitleButton from './TitleButton';

var bakery=require('openbadges-bakery-v2');
export default class BadgeRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badgeInformation: {
        badgeName: '',
        badgeDescription: '',
        badgeStudent: '',
        badgeTeacher: '',
        badgeCourse: '',
        badgeDate:'',
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

  showError = () => {

  }

  debake(img) {	
    return new Promise((resolve,reject) => {
      bakery.extract(img, function(err, data){
        if(err)
          return reject(err)
        else
          resolve(data);
      });
    })	
  }	

  verifyBadge = () => {
    let uploadedImage = CourseFilesCollection.findOne({_id: this.state.badgeInformation.image._id});
    let image=uploadedImage.meta.buffer;
	  var ima = this.debake(image)
    .then(data => {this.setDataForm(data,image)})
    .catch(err => {console.log(err)} );
  }

  setDataForm(data,image){
    data = JSON.parse(data);
    this.setState({
      badgeInformation:{
        badgeName: data.recipient.badgeName,
        badgeDescription: data.recipient.badgeDescription,
        badgeStudent:data.recipient.badgeStudent,
        badgeTeacher: data.recipient.badgeTeacher,
        badgeCourse: data.recipient.badgeCourse,
        badgeDate: data.issuedOn,
        image: this.state.badgeInformation.image,
      }
    });
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
            badgeInformation={this.state.badgeInformation}
            language={this.state.language}
          />,
        ],
        userSteps: [
          {label: this.state.language.verifyBadge, icon: <InfoIcon className="step-icon"/>},
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
            <TitleButton
              showErrorFunction={showError => this.showError = showError}
              language={this.state.language}
              color="secondary"
              onClick={()=>this.verifyBadge()}
            />
            <BadgeInformation
               showErrorFunction={showError => this.showError = showError}
               badgeInformation={this.state.badgeInformation}
               language={this.state.language}

            />
             
          
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
  </MuiThemeProvider>
        }
      </div>
    )
  }
}
