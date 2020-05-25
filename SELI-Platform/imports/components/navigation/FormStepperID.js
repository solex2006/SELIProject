import React, { useLayoutEffect, useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function FormStepperID(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const steps = props.steps;

  const [width, height] = useWindowSize();

  function getStepContent(step) {
    return(props.forms[step]);
  }

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    activeStep === 0 ? setActiveStep(prevActiveStep => steps.length - 1) : setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
    handleClose();
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if(allStepsCompleted()) {

    }
    else {
      handleNext();
    }
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="form-stepper-container">
      <div className="form-stepper-navigation">
        <div className="form-stepper-information">
          <h1 style={{color: getComputedStyle(document.documentElement).getPropertyValue('--' + props.color)}} className="form-stepper-title">{props.title}</h1>
          {width >= 1200 && <p className="form-stepper-active-step">{`${props.language.step}  ${parseInt(activeStep + 1)} ${props.language.of} ${steps.length}: ${steps[activeStep].label}`}</p>}
        </div>
        {
          props.steps.length > 1 ?
            width < 1200 ?
              <div>      
                <Button className="form-stepper-selector-button" color={props.color} aria-describedby={id} onClick={handleClick}>
                  {`${props.language.step}  ${parseInt(activeStep + 1)} ${props.language.of} ${steps.length}: ${steps[activeStep].label}`}
                  <KeyboardArrowDownIcon className="form-stepper-selector-button-icon"/>
                </Button>              
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Stepper className="form-stepper" orientation="vertical" nonLinear activeStep={activeStep}>
                    {steps.map((step, index) => (
                      <Step completed={true} className="form-step" key={step.label}>
                        <StepButton icon={step.icon} className="form-step-button" onClick={handleStep(index)} completed={completed[index]}>
                          {step.label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Popover>
              </div>
            :
              <Stepper className="form-stepper-id" nonLinear activeStep={activeStep}>
                {steps.map((step, index) => (
                  <Step completed={true} className="form-step" key={step.label}>
                    <StepButton icon={step.icon} className="form-step-button-id" onClick={handleStep(index)} completed={completed[index]}>
                      {step.label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
          :
            undefined
        }
      </div>
      <div className="form-stepper-content">
        {getStepContent(activeStep)}
      </div>
      <div className="form-stepper-navigation-bottom">
        {
          props.steps.length > 1 ?
            <Grid item>
              <ButtonGroup
                variant="text"
                size="large"
                aria-label="Course creation step navigation"
              >
                <Button
                  color="secondary"
                  onClick={handleBack}
                >
                  {props.language.previousStep}
                </Button>
                <Button
                  color="secondary"
                  onClick={handleNext}
                >
                  {props.language.nextStep}
                </Button>
              </ButtonGroup>
            </Grid>
          :
          undefined
        }
        <Grid className="form-stepper-actions-id" item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="outlined" >
                {props.language.cancel}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => props.saveAction()} variant="outlined" color="primary">
                {props.saveLabel}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => props.finalAction()} variant="contained" color="primary">
                {props.finalLabel}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
