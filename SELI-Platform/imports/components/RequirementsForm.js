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

  saveRequirements() {
    this.props.showForm('UnitsEditor');
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Requirements</div>
          <MuiThemeProvider theme={theme}>
            <div className="multiple-inputs-container">
              <TextField
                className="multiple-input"
                id="outlined-uncontrolled"
                label="Knowledge requirement"
                margin="normal"
                variant="outlined"
                required
              />
              <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
                Add
              </Button>
              <div className="input-list">
                <div className="input-list-title">Knowledge requirements</div>
                <div className="input-list-container"></div>
              </div>
            </div>
            <div className="multiple-inputs-container">
              <TextField
                className="multiple-input"
                id="outlined-uncontrolled"
                label="Technical requirement"
                margin="normal"
                variant="outlined"
                required
              />
              <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
                Add
              </Button>
              <div className="input-list">
                <div className="input-list-title">Technical requirements</div>
                <div className="input-list-container"></div>
              </div>
            </div>
            <div className="multiple-inputs-container">
              <TextField
                className="multiple-input"
                id="outlined-uncontrolled"
                label="To whom is directed"
                margin="normal"
                variant="outlined"
                required
              />
              <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
                Add
              </Button>
              <div className="input-list">
                <div className="input-list-title">People that will course</div>
                <div className="input-list-container"></div>
              </div>
            </div>
            <div className="form-button-container">
              <Button onClick={() => this.saveRequirements()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Save
              </Button>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
