import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  saveTutor(){
    this.props.showForm('RequirementsForm');
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Tutor information</div>
          <MuiThemeProvider theme={theme}>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Teacher name"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <div className="image-preview"></div>
              <Button className="main-button" id="upload-button" variant="contained" color="primary">
                Upload teacher photo
              </Button>
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Short biography"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                multiline
                rows="3"
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Google link"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Personal website"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Email"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Phone number"
                margin="normal"
                variant="outlined"
                type="number"
                fullWidth
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                }}
                inputProps={{ min: "0", max: "9999999999", step: "1" }}
              />
            </div>
            <div className="form-button-container">
              <Button onClick={() => this.saveTutor()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Save tutor
              </Button>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
