import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
});

class RadioButtonsGroup extends Component {


 
  state={
      value:'Weeks'
  }

  handleChange = (event) => {
      
      this.props.courseDuration(event.target.value)
      this.setState({
        value:event.target.value,
      })
  };

  render(){
    const { classes } = this.props;
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{this.props.language.estimatedCourseDuration}</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
          <FormControlLabel value="weeks" control={<Radio />} label="Weeks" />
          <FormControlLabel value="hours" control={<Radio />} label="Hours" />
        </RadioGroup>
      </FormControl>
      
    </div>
  );
}
}
export default withStyles(useStyles)(RadioButtonsGroup)