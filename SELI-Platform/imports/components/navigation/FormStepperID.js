import React from 'react';
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

export default function FormStepperID(props) {
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
          props.steps.length > 1 ?
            <div className="form-stepper-navigation-actions">
              <Tooltip title={props.language.previousStep}>
                <IconButton className="form-stepper-navigation-button" onClick={handleBack} edge="end" aria-label="back">
                  <NavigateBeforeIcon className="form-stepper-navigation-icon"/>
                </IconButton>
              </Tooltip>
              <Tooltip title={props.language.nextStep}>
                <IconButton className="form-stepper-navigation-button" onClick={handleNext} edge="end" aria-label="next">
                  <NavigateNextIcon className="form-stepper-navigation-icon"/>
                </IconButton>
              </Tooltip>
            </div>
          :
          undefined
        }
        {
          props.steps.length > 1 ?
            <div>
              <Button className="form-stepper-selector-button" color={props.color} aria-describedby={id} onClick={handleClick}>
              {props.language.selectStep}
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
