import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import ControlSnackbar from '../tools/ControlSnackbar';

import {noSpecialCharacters} from '../../../lib/textFieldValidations';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {
        fullname: '',
        username: '',
        email: '',
        password: '',
      },
      passwordToConfirm: '',
      emailResult: false,
      validEmail: false,
      passwordResult: false,
      equalPasswords: false,
    }
  }

  handleChange = name => event => {
    let userInformation = this.state.userInformation;
    if (name === "fullname") {
      userInformation.fullname = event.target.value;
    }
    if (name === "username") {
      userInformation.username = event.target.value;
    }
    if (name === "email") {
      userInformation.email = event.target.value;
    }
    if (name === "password") {
      userInformation.password = event.target.value;
      this.setState({
        userInformation: userInformation,
      }, () => {
        this.state.passwordToConfirm !== '' ? this.confirmPassword() : undefined
      })
    }
    if (name === "confirmPassword") {
      this.setState({
        passwordToConfirm: event.target.value,
      }, () => {
        this.confirmPassword();
      })
    }
    this.setState({
      userInformation: userInformation,
    });
  }

  validateSignUp = () => {
    if (
      this.state.userInformation.fullname === '' || this.state.userInformation.email === '' ||
      this.state.userInformation.username === '' || this.state.userInformation.password === '' ||
      this.state.passwordToConfirm === ''
    ) {
      this.setState({
        showError: true,
      }, () => {
        this.handleControlMessage(true, "All fields marked with * are required");
      });
      return false;
    }
    if (!this.state.validEmail) {
      this.handleControlMessage(true, "Validate your email");
      return false;
    }
    if (!this.state.equalPasswords) {
      this.handleControlMessage(true, "Passwords doesn't match");
      return false;
    }
    return true;
  }

  signUp = () => {
    if (this.validateSignUp()) {
      this.createStudent(this.state.userInformation)
    }
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
      }
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
      else {
        Meteor.logout();
        this.handleControlMessage(true, "User created, now you can sign in");
        this.props.handleClickOpen('in');
      }
    });
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

  handleError = (error) => {
    this.handleControlMessage(true, error.reason);
  }

  validateEmail = ()  => {
    this.state.userInformation.email !== '' ?
      this.setState({
        validatingEmail: true,
        emailHelperMessage: 'Validating email, please wait'
      }, () => {
        Meteor.call("ValidateEmail", this.state.userInformation.email, (error, response) =>  {
          let message;
          response ? message = "Valid email" : message = "Invalid email";
          this.setState({
            emailResult: true,
            validEmail: response,
            emailHelperMessage: message,
          }, () => {
            this.setState({
              validatingEmail: false,
            });
          })
        });
      })
    :
    this.setState({
      emailResult: false,
      validatingEmail: false,
    })
  }

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.userInformation.password,
        passwordResult: false,
      }, () => {
        let message;
        this.state.equalPasswords ? message = "Passwords match" : message = "Passwords doesn't match";
        this.setState({
          passwordHelperMessage: message,
          passwordResult: true,
        });
      })
    :
    this.setState({
      passwordResult: false,
    })
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

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
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

  render() {
    return(
      <div className="sign-form-container">
        <TextField
          id="fullname-input"
          className="signin-input"
          label="Full name"
          margin="normal"
          variant="outlined"
          fullWidth
          autoFocus={true}
          autoComplete={"off"}
          required
          value={this.state.userInformation.fullname}
          error={this.state.showError && this.state.userInformation.fullname === ''}
          onChange={this.handleChange('fullname')}
        />
        <TextField
          id="username-input"
          className="signin-input"
          label="Username"
          margin="normal"
          variant="outlined"
          fullWidth
          autoComplete={"off"}
          required
          value={this.state.userInformation.username}
          error={this.state.showError && this.state.userInformation.username === ''}
          onChange={this.handleChange('username')}
          onKeyPress={() => this.keyController(event)}
        />
        <TextField
          id="email-input"
          className="helper-signin-input"
          label="Email"
          margin="normal"
          variant="outlined"
          fullWidth
          type="email"
          required
          disabled={this.state.validatingEmail}
          onBlur={() => this.validateEmail()}
          value={this.state.userInformation.email}
          error={this.state.showError && this.state.userInformation.email === ''}
          onChange={this.handleChange('email')}
          helperText={
            <div>
              {
                this.state.emailResult && !this.state.validatingEmail ?
                  <div className="form-helper-container">
                    {
                      this.state.validEmail ?
                        <div className="success-helper-text">
                          <p>{this.state.emailHelperMessage}</p>
                        </div>
                      :
                      <div className="error-helper-text">
                        <p>{this.state.emailHelperMessage}</p>
                      </div>
                    }
                  </div>
                :
                undefined
              }
              {
                this.state.validatingEmail ?
                  <div className="form-helper-container">
                    <p>{this.state.emailHelperMessage}</p>
                    <LinearProgress className="helper-progress"/>
                  </div>
                :
                undefined
              }
            </div>
          }
        />
        <TextField
          id="password-input"
          className="signin-input"
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          required
          error={this.state.showError && this.state.userInformation.password === ''}
          onChange={this.handleChange('password')}
        />
        <TextField
          id="-confirm-password-input"
          className="helper-signin-input"
          label="Confirm password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          disabled={this.state.userInformation.password === ''}
          error={this.state.showError && this.state.passwordToConfirm === ''}
          required
          onChange={this.handleChange('confirmPassword')}
          helperText={
            this.state.passwordResult ?
              <div className="form-helper-container">
                {
                  this.state.equalPasswords ?
                    <div className="success-helper-text">
                      <p>{this.state.passwordHelperMessage}</p>
                    </div>
                  :
                  <div className="error-helper-text">
                    <p>{this.state.passwordHelperMessage}</p>
                  </div>
                }
              </div>
            :
            undefined
          }
        />
        <div className="sign-buttons-container">
          <Button
            onClick={() => this.redirect('/tutorRegistration')}
            className="sign-button"
          >
            Teach on SELI
          </Button>
          <Button
            onClick={() => this.signUp()}
            className="sign-button"
            color="secondary"
            variant="contained"
          >
            Sign up
          </Button>
        </div>
        <ControlSnackbar
          showControlMessage={this.state.showControlMessage}
          showControlAction={this.state.showControlAction}
          controlMessage={this.state.controlMessage}
          controlAction={this.state.controlAction}
          controlActionMessage={this.state.controlActionMessage}
          handleControlMessage={this.handleControlMessage.bind(this)}
        />
      </div>
    );
  }
}
