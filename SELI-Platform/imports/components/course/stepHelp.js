import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import ImageHelpStepper from "./imageHelp";
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
  },
  iconButton: {
    verticalAlign: "baseline",
    padding: ".2em"
  },
  margen:{
    border: '1px solid #4CAF50'
  }
}));

export default function Help(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
   
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        className={props.useStyle? props.useStyle: classes.iconButton}
        startIcon={<HelpIcon />}
      >
        <span>{props.buttonLabel}</span>
      </Button>

      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 580, left: 0 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
       
      >
        <div className="help-container">
          <p className="help-text">{props.text}</p>
          <ImageHelpStepper
          helpsTips={props.helpsTips}
           helper={props.helper} language={props.language}
            />
        </div>
      </Popover> */}

      <Popper 
        id={id} 
        open={open}
        onClose={handleClose} 
        anchorEl={anchorEl}
        placement="top"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
        }}
        style={{left:'30px', right:'30px'}}
        transition>
        <div >
            
            <ImageHelpStepper
            text={props.text}
            helpsTips={props.helpsTips}
            helper={props.helper} language={props.language}
              />
          </div>
             
      </Popper>
    </div>
  );
}
