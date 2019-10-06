import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ControlSnackbar from '../tools/ControlSnackbar';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {
        username: '',
        password: '',
      }
    }
  }

  handleChange = name => event => {
    let userInformation = this.state.userInformation;
    if (name === "username") {
      userInformation.username = event.target.value;
    }
    if (name === "password") {
      userInformation.password = event.target.value;
    }
    this.setState({
      userInformation: userInformation,
    });
  }

  validateSignIn = () => {
    if (this.state.userInformation.username === '' || this.state.userInformation.password === '') {
      this.setState({
        showError: true,
      }, () => {
        this.handleControlMessage(true, "The fields marked with * are required", false, "", "");
      });
    }
    else {
      this.SignIn();
    }
  }

  SignIn = () => {
    Meteor.loginWithPassword({username: this.state.userInformation.username}, this.state.userInformation.password, (error) => {
      if (error) {
        this.handleControlMessage(true, error.reason, false, "", "");
      }
      else {
        this.setState({
          user: Meteor.user(),
        }, () => {
          if (this.state.user.profile.type === 'tutor') {
            location.replace("/tutor");
          }
          else if (this.state.user.profile.type === 'student') {
            location.replace("/student");
          }
          else if (this.state.user.profile.type === 'administrator') {
            location.replace("/administrator");
          }
        })
      }
    })
  }

  keyController = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      this.validateSignIn();
    }
    else {
      return false;
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

  render() {
    return(
      <div className="sign-form-container">
        <TextField
          id="username-input"
          className="signin-input"
          label="Username or email"
          margin="normal"
          variant="outlined"
          fullWidth
          autoComplete={"off"}
          autoFocus={true}
          onChange={this.handleChange('username')}
          required
          error={this.state.showError && this.state.userInformation.username === ''}
        />
        <TextField
          id="password-input"
          className="signin-input"
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          onChange={this.handleChange('password')}
          required
          onKeyPress={() => this.keyController(event)}
          error={this.state.showError && this.state.userInformation.password === ''}
        />
        <div className="sign-buttons-container">
          <Button onClick={() => this.validateSignIn()} className="sign-button" color="primary" variant="contained">Sign in</Button>
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
