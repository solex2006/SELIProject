import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import userInformation from '../../ui/UserInformation';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import ControlSnackbar from '../tools/ControlSnackbar';

import {noSpecialCharacters} from '../../../lib/textFieldValidations';
import { FaWindows } from 'react-icons/fa';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    } 
  }

  keyController = (event) => {
    if (event.which == 32 || event.keyCode == 32) {
      event.preventDefault();
      return false;
    }
    else {
      noSpecialCharacters(event);
    }
  }

  redirect = (url, type) => {
    this.props.history.push({
      pathname: url,
      type: type,
      state: {
        language: this.props.language,
      }
    });
    this.props.handleClose();
  }

  render() {
    return(
      <div className="sign-buttons-container-default">
        <Tooltip title={this.props.language.hereYouCanOpenStudentForm}>
          <Button
            onClick={() => this.redirect('/UserRegistration','student')}
            className="sign-button-default"
            color="secondary"
            variant="contained"
          >
            {this.props.language.studentAccount}
          </Button>
        </Tooltip>
        <Tooltip title={this.props.language.hereYouCanOpenTeacherForm}>
          <Button
            onClick={() => this.redirect('/UserRegistration','tutor')}
            className="sign-button-default"
            color="secondary"
            variant="contained"
          >
            {this.props.language.tutorAccount}
          </Button>
        </Tooltip>
      </div>
    );
  }
}
