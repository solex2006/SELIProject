import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxLabels extends Component {
  state={
    checkedA: false,
    checkedB: false,
  }

handleChange = name => event => {
    this.props.checkbox(event.target.checked, this.props.type)
    this.setState({ ...this.state, [name]: event.target.checked });
  };
 

  render(){
   
    return (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />
            }
 
            label={this.props.label}
          />
          {/* <FormControlLabel
            control={
              <Checkbox checked={this.state.checkedB} onChange={this.handleChange('checkedB')} value="checkedB" />
            }
            label="Audio Description*"
          /> */}
        </FormGroup>
      );
  }
 
}

export default CheckboxLabels