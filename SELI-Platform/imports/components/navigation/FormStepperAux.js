import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InfoIcon from '@material-ui/icons/Info';
import RetrievePasswd from '../../ui/RetrievePasswd';

export default function FormStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const steps = props.steps;

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
          <p className="form-stepper-active-step">{`${props.language.step}  ${parseInt(activeStep + 1)} ${props.language.of} ${steps.length}: ${steps[activeStep].label}`}</p>
        </div>
        {
          activeStep < 1 ?
            props.hashStepper ?
              handleNext()
            :
              undefined
          :
            undefined
        }

        <div className="form-stepper-actions">
          {
            props.saveLabel !== undefined ?
              <Button onClick={() => props.saveAction()} className="form-stepper-complete-button" color={props.color}>
                {props.saveLabel}
              </Button>
            :
            undefined
          }
          <Button onClick={() => props.finalAction()} id="form-stepper-final-button" className="form-stepper-complete-button" color={props.color}>
            {props.finalLabel}
          </Button>
        </div>
      </div>
      <div>
        {allStepsCompleted() ? (
          <div className="form-stepper-all-completed-container">

          </div>
        ) : (
          <div className="form-stepper-content">
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}