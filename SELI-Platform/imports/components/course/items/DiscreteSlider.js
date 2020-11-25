import React from 'react';
import Slider from '@material-ui/core/Slider';
import PhotoSizeSelectLargeSharpIcon from '@material-ui/icons/PhotoSizeSelectLargeSharp';

export default DiscreteSlider=(props)=> {
  const [value, setValue] = React.useState(props.size);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.adjust(value, value)
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.adjust(value, value)
  };

  const handleBlur = () => {
    
    if (value < 80) {
      setValue(80);
    } else if (value >360 ) {
      setValue(360);
    }
  };
  return (
    <div className="discrete-slider-container">
      <PhotoSizeSelectLargeSharpIcon/>
      <Slider
        className="discrete-slider-import"
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        max={360}
        min={80}
      />
      {/* <Input
          className={classes.input}
          value={value}
          margin="dense"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 5,
            min: 80,
            max: 360,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
      /> */}
    </div>
  );
}