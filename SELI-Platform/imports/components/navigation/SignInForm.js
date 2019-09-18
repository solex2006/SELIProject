import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        console.log('required');
      });
    }
    else {
      this.SignIn();
    }
  }

  SignIn = () => {
    console.log(this.state.userInformation);
    Meteor.loginWithPassword({username: this.state.userInformation.username}, this.state.userInformation.password, (error) => {
      if (error) {
        console.log(error);
      }
      else {
        this.setState({
          user: Meteor.userId(),
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
      </div>
    );
  }
}
