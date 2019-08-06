import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
          autoComplete={"off"}
          required
          error={this.state.titleError}
          color="secondary"
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
          error={this.state.titleError}
          color="secondary"
        />
        <TextField
          id="email-input"
          className="signin-input"
          label="Email"
          margin="normal"
          variant="outlined"
          fullWidth
          type="email"
          required
          error={this.state.titleError}
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
          error={this.state.titleError}
        />
        <TextField
          id="password-input"
          className="signin-input"
          label="Confirm password"
          margin="normal"
          variant="outlined"
          type="password"
          fullWidth
          required
          error={this.state.titleError}
        />
        <div className="sign-buttons-container">
          <Button className="sign-button">Teach on SELI</Button>
          <Button className="sign-button" color="secondary" variant="contained">Sign up</Button>
        </div>
      </div>
    );
  }
}
