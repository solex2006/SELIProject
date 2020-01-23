import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import PhotoSizeSelectLargeSharpIcon from '@material-ui/icons/PhotoSizeSelectLargeSharp';

const useStyles = makeStyles({
  root: {
    width: 190,
  },
  input: {
    width: 42,
  },
});

export default DiscreteSlider=(props)=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    console.log("EL valor", value)
    props.adjust(value, value)
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    console.log("EL valor", value)
    props.adjust(value, value)
  };

  const handleBlur = () => {
    
    if (value < 80) {
      setValue(80);
    } else if (value >310 ) {
      setValue(310);
    }
  };
//sconsole.log("PROPS", props)
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <PhotoSizeSelectLargeSharpIcon/>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={310}
            min={80}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 5,
              min: 80,
              max: 310,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}