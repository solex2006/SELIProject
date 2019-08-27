import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImageHelpStepper from './ImageHelpStepper';

const useStyles = makeStyles(theme => ({
   iconButton:{
    verticalAlign:'baseline',
    padding: 0,
  }
}));

export default function Help(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
   { 
     // <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
     //       <HelpIcon/>
     //     </IconButton>
       }

       <Button color={props.color !== undefined || "" ? props.color : "primary"} aria-describedby={id} onClick={handleClick} className={classes.iconButton}>
        <HelpIcon/>
        {props.buttonLabel}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div className="help-container">
          <p className="help-text">{props.text}</p>
          <ImageHelpStepper helper={props.helper}/>
        </div>
      </Popover>
    </React.Fragment>
  );
}
