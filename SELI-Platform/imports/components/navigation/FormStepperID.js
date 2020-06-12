import React, { useLayoutEffect, useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import StepLabel from "@material-ui/core/StepLabel";
import SchoolIcon from "@material-ui/icons/School";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import AccessibilityIcon from "@material-ui/icons/AccessibilityNew";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import AssistantIcon from "@material-ui/icons/Assistant";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from "@material-ui/icons/Group";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BallotIcon from "@material-ui/icons/Ballot";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  stepper: {
    width:'100%',
    backgroundColor: "#e8e8e8",
    "& button:hover .MuiStepLabel-root": {
      // backgroundColor: "#ffff",
      borderBottom: "double thick black"
    }
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  optional: {},
  caption: {
    color: "rgb(2, 136, 209)!important"
  },
  iconContainer: { color: "rgb(2, 136, 209)" },
  labelContainer: { color: "rgb(2, 136, 209)" },
  label: {
    color: "rgb(2, 136, 209)!important",
    // color: "#1460aa",
    fontWeight: 400
  },
  selected: {
    borderBottom: "rgb(2, 136, 209) inset medium",
    "&$error": {
      borderBottomColor: "#d91e18"
    },
    "&$completed": {
      borderBottomColor: "#00897b"
    },
    "&$disabled": {
      borderBottomColor: "#696969"
    }
  },
  active: {
    fontWeight: "800!important",
    color: "rgb(2, 136, 209)!important"
    // underline  step na
    // borderBottom: "rgb(2, 136, 209) inset medium",
  },
  disabled: {
    color: "#696969!important",
    "& $label": {
      color: "#696969!important"
    },
    "& $iconContainer": { color: "#696969!important" },
    "& $labelContainer": { color: "#696969!important" }
    // "& $active": {
    //   borderBottomColor: "#696969"
    // }
  },
  alternativeLabel: {},
  error: {
    color: "#d91e18!important",
    "& $iconContainer": { color: "#d91e18!important" },
    "& $labelContainer": { color: "#d91e18!important" }
    // "& $active": {
    // }
  },
  completed: {
    color: "#00897b!important",
    "& $label": {
      fontWeight: 400
    },
    "& $iconContainer": { color: "#00897b!important" },
    "& $labelContainer": { color: "#00897b!important" }
    // "& $active": {
    //   borderBottomColor: "#00897b"
    // }
  },
  warningFeedback: {
    color: "#D35400"
    //margin:'16px 16px 16px 16px'
  },
  paper: {
    // display: "flex",
    // flexWrap: "wrap",
    maxHeight: "700px",
    height: "700px",
    overflowY: "auto",
    overflowX: "hidden",
    margin: "1em"
  },
  output: {
    // display: "flex",
    // flexWrap: "wrap",
    margin: "0 0 1em",
    border: "solid thin",
    backgroundColor: "Gainsboro"
    // color:"GoldenRod"
  }
}));

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

 /*  useEffect(()=>(
    console.log('Actualiza Step-informacion',)
  ),[]) */
  console.log("Form stpper", props)

  const [validateInformation,setvalidateInformation]=useState({
    informationStep:props.forms[0].props.courseInformation,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const steps = props.steps;
  const [width, height] = useWindowSize();


  //nuvos parametros
  const [addie, setAddie] = React.useState(false);
  const [stepStatus, setStepStatus] = React.useState({
    active: activeStep,
    skipped: new Set(),
    completed: new Set(),
    disabled: getDisabled(),//getDisabled(addie)
    failed: new Set(),
    finished: false
  });

  ////////////////////////////////////////////////////////nuevas funciones
  const handleCompletenew = (step) => {
    
   /*  let newCompleted = new Set(stepStatus.completed.values());
    newCompleted.add(stepStatus.active);
    newStatus = { ...newStatus, completed: newCompleted };

    if (isStepSkipped(stepStatus.active)) {
      let newSkipped = new Set(stepStatus.skipped.values());
      newSkipped.delete(stepStatus.active);
      newStatus = { ...newStatus, skipped: newSkipped };
    }

    if (isStepFailed(stepStatus.active)) {
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(stepStatus.active);
      newStatus = { ...newStatus, failed: newFailed };
    } */

    // if (stepStatus.active > 1 && stepStatus.active < getSteps(addie).length) {
      let newStatus = stepStatus;
      console.log("dentro del newfailed",stepStatus)

    if(step){
      let newStatus=stepStatus;
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(step);
      newStatus.failed=newFailed;
      setStepStatus(newStatus)
    }
    if (
      newStatus.active < 3 &&
      newStatus.completed.has(0) &&
      newStatus.completed.has(1) &&
      (newStatus.skipped.has(2) || newStatus.completed.has(2))
    ) {
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.delete(3);
      newStatus = { ...newStatus, disabled: newDisabled };
      setStepStatus(newStatus);
    }  else if ((stepStatus.active > 2 && stepStatus.completed.has(stepStatus.active))) {
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.delete(stepStatus.active + 1);
      newStatus = { ...newStatus, disabled: newDisabled };
      setStepStatus(newStatus);
    }
    // } */

   // newStatus = { ...newStatus, active: stepStatus.active + 1 };
    
  };
  function icons() {
    if (addie)
      return {
        0: <InfoIcon />,
        1: <GroupIcon />,
        2: <PlaylistAddCheckIcon />,
        3: <AssistantIcon />,
        4: <SchoolIcon />,
        5: <AssignmentIcon />,
        6: <BallotIcon />,
        7: <MenuBookIcon />,
        8: <AccessibilityIcon />,
        completed: <CheckCircleIcon />,
        error: <ReportProblemIcon />
      };
    return {
      0: <InfoIcon />,
      1: <GroupIcon />,
      2: <PlaylistAddCheckIcon />,
      3: <AssistantIcon />,
      4: <BallotIcon />,
      5: <MenuBookIcon />,
      6: <AccessibilityIcon />,
      completed: <CheckCircleIcon />,
      error: <ReportProblemIcon />
    };
  }

  const isStepActive = step => {
    let activeUpdate=stepStatus;
    activeUpdate.active=activeStep;
    //setStepStatus(activeUpdate)
    return stepStatus.active === step;
  };
  const isStepCompleted = step => {
    return stepStatus.completed.has(step);
  };

  const isStepOptional = step => {
    return step === 2; 
  };

  const isStepDisabled = step => {
    return stepStatus.disabled.has(step);
  };

  const isStepSkipped = step => {
    return stepStatus.skipped.has(step);
  };

  const isStepFailed = step => {
    return stepStatus.failed.has(step);
   
  };

  function getDisabled() {
    //if (addie) return new Set([3, 4, 5, 6, 7, 8]);
    return new Set([3, 4, 5, 6, 7]);
  }

/*   const isLastStep = () => {
    return stepStatus.active === totalSteps() - 1;
  }; */

  
////////////////////////////////////////////////////////
  //console.log("FormStepperID-------------",steps)

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
  const classes = useStyles();




useEffect(()=>{
  console.log("PROPS EN id", props.updateSteps, props)
  if(props.updateSteps==='passInformation'){
    setStepStatus(prev=>{
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(0);
      //newStatus = { ...newStatus, disabled: newDisabled };
      return {
        ...prev, 
        completed:prev.completed.add(0),
        failed: newFailed
      }
    })
  }else if(props.updateSteps==='NopassInformation'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(0);
      return {
        ...prev, 
        failed:prev.failed.add(0),
        completed: newCompleted
       }
    })
  }

  //////
  
  if(props.updateSteps==='passAudience'){
      console.log("completado", stepStatus.failed)
      setStepStatus(prev=>{
        let newFailed = new Set(stepStatus.failed.values());
        newFailed.delete(1);
        return {... prev, completed:prev.completed.add(1), failed:newFailed}
      })
  }else if(props.updateSteps==='NopassAudience'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(1);
      return {
        ...prev, 
        failed:prev.failed.add(1),
        completed: newCompleted
       }
    })
  }
  if(props.updateSteps==='passRequirements'){
    setStepStatus(prev=>{
      return {... prev, completed:prev.completed.add(2)}
    })
  }


  if(props.updateSteps==='passCoursePlan' || props.updateSteps==='passCoursePlanFree'){
    let newStatus=stepStatus;
    let newFailed = new Set(stepStatus.failed.values());
    newFailed.delete(3);
    setStepStatus(prev=>{
      return {... prev, completed:prev.completed.add(3), failed:newFailed}
    })
    handleCompletenew(stepStatus.active)
    if(props.updateSteps==='passCoursePlanFree'){
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.delete(stepStatus.active + 3);
      newStatus = { ...newStatus, disabled: newDisabled };
      setStepStatus(newStatus);
     
    }
    
  }else if(props.updateSteps==='NopassCoursePlan'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(3);
      return {
        ...prev, 
        failed:prev.failed.add(3),
        completed: newCompleted
       }
    })
  }
  
   
  if(props.updateSteps==='passCourseAnalysis'){
    setStepStatus(prev=>{
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(4);
      return {... prev, completed:prev.completed.add(4), failed:newFailed}
    })
    handleCompletenew(stepStatus.active)
  }else if(props.updateSteps==='NopassCourseAnalysis'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(4);
      return {
        ...prev, 
        failed:prev.failed.add(4),
        completed: newCompleted
       }
    })
  }
  
  if(props.updateSteps==='passCourseDesign'){
    setStepStatus(prev=>{
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(5);
      return {... prev, completed:prev.completed.add(5), failed:newFailed}
    })
    handleCompletenew(stepStatus.active)
  }else if(props.updateSteps==='NopassCourseDesign'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(5);
      return {
        ...prev, 
        failed:prev.failed.add(5),
        completed: newCompleted
       }
    })
  }
},[props.updateSteps])


useEffect(()=>{
  console.log("ACTUALIZA UN PASO  para VER el nuevo stpeaqui v",stepStatus)
  handleCompletenew()
},[stepStatus.active])


  

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
                    {steps.map((step, index) => {
                        const stepProps = {
                          active: false,
                          completed: false,
                          disabled: false,
                          classes: {
                            completed: classes.completed,
                            alternativeLabel: classes.alternativeLabel
                          }
                        };
                        const iconProps = {
                          active: false,
                          completed: false,
                          error: false,
                          classes: {
                            completed: classes.completed,
                            active: classes.active,
                            error: classes.error
                          }
                        };
                        let labelProps = {
                          disabled: false,
                          error: false,
                          icon: icons()[index],
                          classes: {
                            completed: classes.completed,
                            active: classes.active,
                            disabled: classes.disabled,
                            error: classes.error,
                            iconContainer: classes.iconContainer,
                            alternativeLabel: classes.alternativeLabel,
                            labelContainer: classes.labelContainer,
                            label: classes.label
                          }
                        };
                        const buttonProps = {
                          icon: icons()[index]
                          // optional
                        };  
                        if (isStepActive(index)) {
                          iconProps.active = stepProps.active = true;
                        }
                        if (isStepOptional(index)) {
                          buttonProps.optional = labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                          );
                        }
                        if (isStepCompleted(index)) {
                          iconProps.completed = labelProps.completed = stepProps.completed = true;
                          buttonProps.icon = labelProps.icon = icons()["completed"];
                          buttonProps.optional = labelProps.optional = (
                            <Typography variant="caption">Completed</Typography>
                          );
                        }
                        if (isStepFailed(index)) {
                          iconProps.error = true;
                          labelProps.error = true;
                          buttonProps.icon = labelProps.icon = icons()["error"];
                          buttonProps.optional = labelProps.optional = (
                            <Typography variant="caption">Required steped</Typography>
                          );
                        } 
                        if (isStepDisabled(index)) {
                          stepProps.disabled = labelProps.disabled = true;
                        }
                        labelProps.StepIconProps = iconProps;
                        buttonProps.children = (
                          <StepLabel {...labelProps}>{step.label}</StepLabel>
                        );
                      return(
                      (props.coursePlan.guidedCoursePlan === "guided" || index < 4 || index > 5) && (
                        <Step completed={true} className="form-step" key={step.label}>
                          <StepButton
                            completed={completed[index]}
                            focusRipple={true}
                            onClick={handleStep(index)}
                            {...buttonProps}
                            // hidden={isStepDisabled(index)}
                            focusVisibleClassName="stepperFocused"
                            className={`${
                              isStepActive(index)
                                ? isStepCompleted(index)
                                  ? classes.completed
                                  : isStepFailed(index)
                                  ? classes.error
                                  : isStepDisabled(index)
                                  ? classes.disabled
                                  : classes.selected
                                : ""
                            } ${isStepActive(index) ? classes.selected : ""}`}
                       />
                        </Step>
                       ))
                    })}
                  </Stepper>
                </Popover>
              </div>
            :
              <Stepper  className={classes.stepper}  nonLinear activeStep={activeStep}>      
                {steps.map((step, index) => {
                    const stepProps = {
                      active: false,
                      completed: false,
                      disabled: false,
                      classes: {
                        completed: classes.completed,
                        alternativeLabel: classes.alternativeLabel
                      }
                    };
                    const iconProps = {
                      active: false,
                      completed: false,
                      error: false,
                      classes: {
                        completed: classes.completed,
                        active: classes.active,
                        error: classes.error
                      }
                    };
                    let labelProps = {
                      disabled: false,
                      error: false,
                      icon: icons()[index],
                      classes: {
                        completed: classes.completed,
                        active: classes.active,
                        disabled: classes.disabled,
                        error: classes.error,
                        iconContainer: classes.iconContainer,
                        alternativeLabel: classes.alternativeLabel,
                        labelContainer: classes.labelContainer,
                        label: classes.label
                      }
                    };
                    const buttonProps = {
                      icon: icons()[index]
                      // optional
                    };  
                    if (isStepActive(index)) {
                      iconProps.active = stepProps.active = true;
                    }
                    if (isStepOptional(index)) {
                      buttonProps.optional = labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                      );
                    }
                    if (isStepCompleted(index)) {
                      iconProps.completed = labelProps.completed = stepProps.completed = true;
                      buttonProps.icon = labelProps.icon = icons()["completed"];
                      buttonProps.optional = labelProps.optional = (
                        <Typography variant="caption">Completed</Typography>
                      );
                    }
                     if (isStepFailed(index)) {
                      iconProps.error = true;
                      labelProps.error = true;
                      buttonProps.icon = labelProps.icon = icons()["error"];
                      buttonProps.optional = labelProps.optional = (
                        <Typography variant="caption">Required steped</Typography>
                      );
                    } 
                    if (isStepDisabled(index)) {
                      stepProps.disabled = labelProps.disabled = true;
                    }
                    labelProps.StepIconProps = iconProps;
                    buttonProps.children = (
                      <StepLabel {...labelProps}>{step.label}</StepLabel>
                    );

                return(
                  (props.coursePlan.guidedCoursePlan === "guided" || index < 4 || index > 5) && (
                    <Step completed={true} className="form-step" key={step.label} {...stepProps}>
                      <StepButton
                       completed={completed[index]}
                       focusRipple={true}
                       onClick={handleStep(index)}
                       {...buttonProps}
                      // hidden={isStepDisabled(index)}
                       focusVisibleClassName="stepperFocused"
                       className={`${
                        isStepActive(index)
                          ? isStepCompleted(index)
                            ? classes.completed
                            : isStepFailed(index)
                            ? classes.error
                            : isStepDisabled(index)
                            ? classes.disabled
                            : classes.selected
                          : ""
                      } ${isStepActive(index) ? classes.selected : ""}`}
                       />
                        
                    </Step>
                  ))
                  })}
              </Stepper>
          :
            undefined
        }
      </div>

      
      <div valor={"valor"} className="form-stepper-content">
        { getStepContent(activeStep) }
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
