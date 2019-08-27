import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'block'

    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
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
          question: 'Does the image contain text?',
          yes: 1,
          no: 4,
      },
      {
          key: 1,
          question: 'and the text is also present as real text nearby.',
          yes: "deco",
          no: 2,
      },
      {
          key: 2,
          question: 'and the text is only shown for visual effects.',
          yes: "deco",
          no: 3,
      },
      {
          key: 3,
          question: ' and the text in the image is not present otherwise.',
          yes: "txt",
          no: "fail",
      },
      {
          key: 4,
          question: 'Does the image contribute meaning to the current page or context?',
          yes: 5,
          no: 8,
      },
      {
          key: 5,
          question: 'and it’s a simple graphic or photograph.',
          yes: "info",
          no: 6,
      },
      {
          key: 6,
          question: 'and it’s a graph or complex piece of information.',
          yes: 'cplx',
          no: 7,
      },
      {
          key: 7,
          question: 'and it shows content that is redundant to real text nearby.',
          yes: 'deco',
          no: "fail",
      },
      {
          key: 8,
          question: 'Is the image purely decorative or not intended for the user?',
          yes: 'deco',
          no: "fail",
      },
      //insert herer other options
      { 
          //Keep this at last location
          key: "fail",
          question: 'Is the image’s use not listed above or it’s unclear what alt text to provide?',
          yes: '',
          no: '',
      },
      {
          //Keep this at last location
          key: "complete",
          question: '',
          yes: '',
          no: '',
      },
    ]

    function updateStates(opt)
    {
       if(opt=== "fail")
        {
          setFailed(true);
          setCompleted(true);
          setType("fail")
          setActiveStep(steps.length-2);
        }
        else if(opt == "info" ||
                opt == "deco" ||
                opt == "cplx" ||
                opt == "txt")
        {
            setType(opt);
            setActiveStep(steps.length-1);
            setCompleted(true);
        }
        else
        {
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
            case 'deco':
              return( 
                <React.Fragment> 
                <Paper>Based at your's answers, you should select <b>Decorative Image</b></Paper>
                </React.Fragment>);
            case 'info':
              return ( 
                <React.Fragment> 
                <Paper>Based at your's answers, you should select <b>Informative Image</b></Paper>
                </React.Fragment>);
            case 'txt':
              return ( 
                <React.Fragment> 
                <Paper>Based at your's answers, you should select <b>Image of Text</b></Paper>
                </React.Fragment>);
            case 'cplx':
              return ( 
                <React.Fragment> 
                <Paper>Based at your's answers, you should select <b>Complex Image</b></Paper>
                </React.Fragment>);
            case 'fail':
            default:
              return (<Paper>This decision tree does not cover all cases. For detailed information on the provision of text alternatives refer to the Image Concepts Page.</Paper>);
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
        <Button color={props.color !== undefined || "" ? props.color : "primary"} className={props.useStyle} aria-label={props.ariaLabel} onClick={handleClick}>
          <LiveHelpIcon/>
          {props.buttonLabel}
        </Button>
          
        <Dialog
          id={id+"-dlg"}
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby={id+"-dlg-title"}>

          <DialogTitle id={id+"-dlg-title"}>Guide</DialogTitle>

          <DialogContent dividers={true}>
            <DialogContentText>
              <Stepper activeStep={activeStep} 
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
                    <Step key={label.key} 
                    hidden={activeStep!==label.key}
                    >
                      <StepLabel>{label.question}</StepLabel>

                    </Step>
                  );
                })}
              </Stepper>
            </DialogContentText>
            <DialogContentText>
            {
              !completed?
                <div className={classes.actionsContainer}>
                     <Button
                       disabled={steps[activeStep].no===""}
                       variant="contained"
                       color="secondary"
                       onClick={handleBack}
                       className={classes.button}
                     >
                       No
                     </Button>
                     <Button
                       disabled={steps[activeStep].yes===""}
                       variant="contained"
                       color="primary"
                       onClick={handleNext}
                       className={classes.button}
                     >
                       Yes
                     </Button>
                 </div>
              : 
              getStepContent()
            }
            </DialogContentText>
          </DialogContent>

          <DialogActions>
              <Button onClick={handleReset}>
                Reset guide
              </Button>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
          </DialogActions>
        </Dialog>
                

        
      </React.Fragment>
    );
}