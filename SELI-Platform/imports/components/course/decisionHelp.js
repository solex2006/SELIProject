import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "block"
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  iconButton: {
    verticalAlign: "baseline",
    padding: ".2em",
    margin: theme.spacing(1),
  }
}));

export default function DecisionHelpStepper(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [type, setType] = React.useState("");

  const steps = [
    {
      key: 0,
      question: " props.language.feedback_a11y_helpStep_imageHasText",
      yes: 1,
      no: 4
    },
    {
      key: 1,
      question: "props.language.feedback_a11y_helpStep_imageHasText_01",
      yes: "deco",
      no: 2
    },
    {
      key: 2,
      question: "props.language.feedback_a11y_helpStep_imageHasText_03",
      yes: "deco",
      no: 3
    },
    {
      key: 3,
      question: "props.language.feedback_a11y_helpStep_imageHasText_03",
      yes: "txt",
      no: "fail"
    },
    {
      key: 4,
      question: "props.language.feedback_a11y_helpStep_imageHasMeaning",
      yes: 5,
      no: 8
    },
    {
      key: 5,
      question: "props.language.feedback_a11y_helpStep_imageHasMeaning_01",
      yes: "info",
      no: 6
    },
    {
      key: 6,
      question: "props.language.feedback_a11y_helpStep_imageHasMeaning_02",
      yes: "cplx",
      no: 7
    },
    {
      key: 7,
      question: " props.language.feedback_a11y_helpStep_imageHasMeaning_03",
      yes: "deco",
      no: "fail"
    },
    {
      key: 8,
      question: "props.language.feedback_a11y_helpStep_imageIsDecorative",
      yes: "deco",
      no: "fail"
    },
    //insert herer other options
    {
      //Keep this at last location
      key: "fail",
      question: "props.language.feedback_a11y_helpStep_imageFail",
      yes: "",
      no: ""
    },
    {
      //Keep this at last location
      key: "complete",
      question: "",
      yes: "",
      no: ""
    }
  ];

  function updateStates(opt) {
    if (opt === "fail") {
      setFailed(true);
      setCompleted(true);
      setType("fail");
      setActiveStep(steps.length - 2);
    } else if (
      opt === "info" ||
      opt === "deco" ||
      opt === "cplx" ||
      opt === "txt"
    ) {
      setType(opt);
      setActiveStep(steps.length - 1);
      setCompleted(true);
    } else {
      setActiveStep(opt);
    }
  }

  function handleNext() {
    updateStates(steps[activeStep].yes);
  }

  function handleBack() {
    updateStates(steps[activeStep].no);
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted(false);
    setFailed(false);
  }

  function getStepContent() {
    switch (type) {
      case "deco":
        return (
          <React.Fragment>
            <Paper>
              {/* {`${props.language.feedback_a11y_helpStep_shouldSelect}: `}
              <b>{props.language.image_a11y_purpose_decorative_label}</b> */}
            </Paper>
          </React.Fragment>
        );
      case "info":
        return (
          <React.Fragment>
            <Paper>
              {/* {`${props.language.feedback_a11y_helpStep_shouldSelect}: `}
              <b>{props.language.image_a11y_purpose_informative_label}</b> */}
            </Paper>
          </React.Fragment>
        );
      case "txt":
        return (
          <React.Fragment>
            <Paper>
              {/* {`${props.language.feedback_a11y_helpStep_shouldSelect}: `}
              <b>{props.language.image_a11y_purpose_text}</b> */}
            </Paper>
          </React.Fragment>
        );
      case "cplx":
        return (
          <React.Fragment>
            <Paper>
              {/* {`${props.language.feedback_a11y_helpStep_shouldSelect}: `}
              <b>{props.language.image_a11y_purpose_complex_label}</b> */}
            </Paper>
          </React.Fragment>
        );
      case "fail":
      default:
        return (
          <Paper>
            {/* {props.language.feedback_a11y_helpStep_imageFailMessage} */}
          </Paper>
        );
    }
  }

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const id = "decision-help-steper" + props.caller;

  return (
    <React.Fragment>
      <Button
        color={props.color? props.color : ""}
        className={props.useStyle ? props.useStyle : classes.iconButton}
        aria-label={props.ariaLabel}
        onClick={handleClick}
        variant="outlined"
        startIcon={<LiveHelpIcon />}
      >
        <span>Help Me decide</span>
      </Button>

      <Dialog
        id={id + "-dlg"}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby={id + "-dlg-title"}
      >
        <DialogTitle id={id + "-dlg-title"}>Title</DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText>
            <Stepper
              activeStep={activeStep}
              orientation="horizontal"
              //alternativeLabel
              //nonLinear
              //variant="progress"
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (failed) {
                  labelProps.optional = (
                    <Typography variant="caption" color="error">
                      Alert message
                    </Typography>
                  );
                  labelProps.error = true;
                }
                if (completed) {
                  stepProps.completed = true;
                }

                return (
                  <Step key={label.key} hidden={activeStep !== label.key}>
                    <StepLabel>{label.question}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </DialogContentText>
          <DialogContentText>
            {!completed ? (
              <div className={classes.actionsContainer}>
                <Button
                  disabled={steps[activeStep].no === ""}
                  variant="contained"
                  color="secondary"
                  onClick={handleBack}
                  className={classes.button}
                >
                  No
                </Button>
                <Button
                  disabled={steps[activeStep].yes === ""}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Yes
                </Button>
              </div>
            ) : (
              getStepContent()
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
