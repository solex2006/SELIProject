import React, { Component } from 'react';
import UnitContentCreator from '../components/UnitContentCreator';
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

export default class UnitsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUnitIndex: undefined,
      selectedUnit: undefined,
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  saveRequirements() {
    this.props.showForm('UnitsEditor');
  }

  createUnit() {
    let unitName = document.getElementById('unit-name-input').value;
    let unit = {
      name: unitName,
      key: this.props.units.length + 1,
    }
    this.props.createUnit(unit);
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Program</div>
          <MuiThemeProvider theme={theme}>
            <div className="input-container">
              <TextField
                id="unit-name-input"
                label="Unit name"
                margin="normal"
                variant="outlined"
                type="text"
                required
                fullWidth
              />
            </div>
            <div className="form-button-container">
              <Button onClick={() => this.createUnit()} className="create-button" id="create-unit-button" variant="contained" color="primary">
                Create unit
              </Button>
            </div>
            {
              this.props.units.length > 0 ?
                <div>
                  <div className="form-subtitle">Created units</div>
                  <UnitContentCreator
                    selectedUnit={this.props.selectedUnit}
                    index={this.props.selectedUnitIndex}
                    showForm={this.props.showForm.bind(this)}
                  />
                  <div className="form-button-container">
                    <Button onClick={() => this.props.showForm("UnitsEditor")} className="form-button" id="upload-button" variant="contained" color="secondary">
                      Save
                    </Button>
                  </div>
                </div>
              :undefined
            }
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
