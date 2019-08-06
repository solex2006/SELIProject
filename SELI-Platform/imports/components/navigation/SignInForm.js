import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
        <div className="sign-buttons-container">
          <Button className="sign-button" color="primary" variant="contained">Sign in</Button>
        </div>
      </div>
    );
  }
}
