import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(3),
    width: "210px"
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
        <RadioGroup row aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange} color= "#616161">
          <FormControlLabel value="weeks" control={<Radio color="primary" />} label={this.props.language.week} color= "#616161"/>
          <FormControlLabel value="hours" control={<Radio color="primary" />} label={this.props.language.hours} color= "#616161"/>
        </RadioGroup>
      </FormControl>
      
    </div>
  );
}
}
export default withStyles(useStyles)(RadioButtonsGroup)