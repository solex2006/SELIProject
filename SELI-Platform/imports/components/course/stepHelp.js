import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import ImageHelpStepper from "./imageHelp";

const useStyles = makeStyles(theme => ({
  iconButton: {
    verticalAlign: "baseline",
    padding: ".2em"
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
  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      {
        // <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        //       <HelpIcon/>
        //     </IconButton>
      }

      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        className={props.useStyle? props.useStyle: classes.iconButton}
        startIcon={<HelpIcon />}
      >
        <span>{props.buttonLabel}</span>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
      >
        <div className="help-container">
          <p className="help-text">{props.text}</p>
          <ImageHelpStepper helper={props.helper} language={props.language} />
        </div>
      </Popover>
    </React.Fragment>
  );
}
