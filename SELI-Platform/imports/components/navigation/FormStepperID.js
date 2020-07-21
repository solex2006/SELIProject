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
  console.log("Active-STEP:------------>",props)
  const [validateInformation,setvalidateInformation]=useState({
    informationStep:props.forms[0].props.courseInformation,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const steps = props.steps;
  const [width, height] = useWindowSize();

  //nuevos parametros
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
    if(step){
      let newStatus=stepStatus;
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(step);
      newStatus.failed=newFailed;
      setStepStatus(newStatus)
    }
   
    
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
      5: <SchoolIcon />,
      6: <MenuBookIcon />,
      7: <AccessibilityIcon />,
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
    return new Set([3, 4, 5, 6]);
  }


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
    //console.log("paso actual*****************", newActiveStep)
   
   if(props.coursePlan==='free'){
      if(newActiveStep!=3){
        setActiveStep(newActiveStep+3);
      }
   }else{
      if(newActiveStep!=3 && newActiveStep!=5){
        setActiveStep(newActiveStep);
      }else {
        if(newActiveStep==3 && stepStatus.completed.has(0) && stepStatus.completed.has(1)){
          setActiveStep(newActiveStep);
        }else if(newActiveStep==5 && stepStatus.completed.has(4)){
          setActiveStep(newActiveStep);
        }
      }
   }
  }

  function handleSkip(){

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

const save=()=>{
    let stepstatus1=validateInformation
    stepstatus1.stepscompleted.push(stepStatus)
    setvalidateInformation(stepstatus1)
}

/*  const [action, setAction]=useState(props.action)
useEffect(()=>{
  console.log("acccion////////////////////////",action)
  if(action==='publish' || action==='publicar' || action==='' ){
    setActiveStep(7)
  }
  setAction('')
  
},[action]) */

useEffect(()=>{
  if(props.updateSteps==='passInformation'){
    setStepStatus(prev=>{
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(0);
      let newDisabled = new Set(stepStatus.disabled.values());
      if(stepStatus.completed.has(1)){    
        newDisabled.delete(3);
      }
      return {
        ...prev, 
        completed:prev.completed.add(0),
        failed: newFailed,
        disabled:newDisabled
      }
    })
    let stepstatus1=props.forms[0].props.courseInformation
    //console.log("stepstaus",stepstatus1,props)
    stepstatus1.stepscompleted.push(0)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }else if(props.updateSteps==='NopassInformation'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(0);
      newCompleted.delete(3);
      newCompleted.delete(6);
      newCompleted.delete(4);
      newCompleted.delete(5);
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.add(3);
      newDisabled.add(6);
      newDisabled.add(4);
      newDisabled.add(5);
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.add(0)
      return {
        ...prev, 
        failed:newFailed,
        completed: newCompleted,
        disabled:newDisabled
       }
    })
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(0);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }

  //////
  if(props.updateSteps==='passAudience'){
      console.log("completado", stepStatus)   
      let newDisabled = new Set(stepStatus.disabled.values());
      if(stepStatus.completed.has(0)){
        newDisabled.delete(3);
      }
      
      setStepStatus(prev=>{
        let newFailed = new Set(stepStatus.failed.values());
        newFailed.delete(1);
        return {... prev, completed:prev.completed.add(1), failed:newFailed, disabled:newDisabled}
      })
      let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(1)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
      
  }else if(props.updateSteps==='NopassAudience'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(1);
      newCompleted.delete(3);
      newCompleted.delete(6);
      newCompleted.delete(4);
      newCompleted.delete(5);
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.add(3);
      newDisabled.add(6);
      newDisabled.add(4);
      newDisabled.add(5);
      return {
        ...prev, 
        failed:prev.failed.add(1),
        completed: newCompleted,
        disabled:newDisabled
       }
    })
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(1);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }


  if(props.updateSteps==='passRequirements'){
    setStepStatus(prev=>{
      return {... prev, completed:prev.completed.add(2)}
    })

    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(2)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }


  if(props.updateSteps==='passCoursePlan' || props.updateSteps==='passCoursePlanFree'){
    let newStatus=stepStatus;
    newStatus.completed.add(3)
    let newFailed = new Set(stepStatus.failed.values());
    newFailed.delete(3);
    let newDisabled = new Set(stepStatus.disabled.values());
    newDisabled.delete(4);
    let newCompleted = new Set(stepStatus.completed.values());
    newCompleted.add(3);
    setStepStatus(newStatus);
    setStepStatus(prev=>{
      return {... prev, completed:prev.completed.add(3), failed:newFailed, disabled:newDisabled, completed:newCompleted}
    })
    //handleCompletenew(stepStatus.active)
    if(props.updateSteps==='passCoursePlanFree'){
      
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.add(5);
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.delete(5);
      newStatus = { ...newStatus, disabled: newDisabled, failed:newFailed, completed:newCompleted };
      setStepStatus(newStatus);
     
    }
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(3)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)

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
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(3);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }
  
   
  if(props.updateSteps==='passCourseAnalysis'){
    setStepStatus(prev=>{
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.delete(5);
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(4);
      return {... prev, completed:prev.completed.add(4), failed:newFailed, disabled:newDisabled}
    })
    //handleCompletenew(stepStatus.active)
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(4)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }else if(props.updateSteps==='NopassCourseAnalysis'){
    setStepStatus(prev=>{
      let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(4);
      //newCompleted.delete(5);
      let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.add(5);
      return {
        ...prev, 
        failed:prev.failed.add(4),
        completed: newCompleted,
        disabled:newDisabled
       }
    })
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(4);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }
  
  if(props.updateSteps==='passCourseDesign'){
    stepStatus.disabled.delete(5)
    stepStatus.disabled.delete(6)
    stepStatus.disabled.delete(7)
    stepStatus.completed.add(5)
    setStepStatus(stepStatus)
    setStepStatus(prev=>{
      let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(5);
      let newDisabled = new Set(stepStatus.disabled.values());
      
      newDisabled.delete(5);
      newDisabled.delete(6);
      newDisabled.delete(7);
      return {... prev, completed:prev.completed.add(5), failed:newFailed, disabled:newDisabled}
    })
    //handleCompletenew(stepStatus.active)
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(5)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
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
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(5);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }
},[props.updateSteps])


useEffect(()=>{
  //console.log("ESTE ES EL STEPSTATUS:1",stepStatus,validateInformation)
  //steps aprobados
    if(props.forms[0].props.courseInformation.stepsflag==='saved'){
      let estado= stepStatus
      props.forms[0].props.courseInformation.stepscompleted.map((aprobed,index)=>{
        //console.log("paso",aprobed)
        estado.completed.add(aprobed)
        estado.failed.delete(aprobed)
        estado.disabled.delete(aprobed)
        //3, 4, 5, 6, 7
        setStepStatus(estado)
      }) 
      if(props.forms[0].props.courseInformation.stepscompleted.includes(0)===false || props.forms[0].props.courseInformation.stepscompleted.includes(1)===false){
        estado.disabled=new Set([4,5,6])
        //estado.completed.delete(3)
        estado.completed.delete(4)
        estado.completed.delete(5)
        estado.completed.delete(6)
       // estado.completed.delete(7)
        if(props.forms[0].props.courseInformation.stepscompleted.includes(0)===false){
          estado.failed.add(0)
        }else if(props.forms[0].props.courseInformation.stepscompleted.includes(1)===false){
          estado.failed.add(1)
        }
      }

      if(props.forms[0].props.courseInformation.stepscompleted.includes(3)===false){
        //console.log("---------------------")
        estado.disabled=new Set([4,5,6])
        estado.completed.delete(4)
        estado.completed.delete(5)
        estado.completed.delete(6)
        //estado.completed.delete(7)
        estado.failed.add(3)
      }
      if(props.forms[0].props.courseInformation.stepscompleted.includes(4)===false){

        //console.log("ene l step 4: ",props.forms[0].props.courseInformation)
        if(props.forms[0].props.courseInformation.coursePlan.guidedCoursePlan==="free" &&
           props.forms[0].props.courseInformation.coursePlan.courseTemplate=== "without" && 
          (props.forms[0].props.courseInformation.coursePlan.courseStructure=== "topic"
          || props.forms[0].props.courseInformation.coursePlan.courseStructure=== "unit")){
            estado.completed.add(5)
            estado.completed.add(6)
            estado.disabled.delete(6)
            estado.disabled.delete(5)
           }else{
            estado.disabled=new Set([5,6])
            estado.completed.delete(5)
            estado.completed.delete(6)
           // estado.completed.delete(7)
            estado.failed.add(4)

           }
        
      }
      if(props.forms[0].props.courseInformation.stepscompleted.includes(5)===false){
        estado.disabled=new Set([6])
        estado.completed.delete(6)
        //estado.completed.delete(7)
        estado.failed.add(5)
      }
  }
  // handleCompletenew()
  //console.log("ESTE ES EL STEPSTATUS:2",stepStatus,validateInformation)
},[stepStatus.active])

  return (
    <div className="form-stepper-container">
      <div className="form-stepper-navigation">
        <div className="form-stepper-information">
          <h1 style={{color: getComputedStyle(document.documentElement).getPropertyValue('--' + props.color)}} className="form-stepper-title">{props.title}</h1>
          {width >= 1200 && <p className="form-stepper-active-step">{`${props.language.step}  
          ${parseInt(activeStep + 1)} ${props.language.of} ${props.coursePlan.guidedCoursePlan==="free"?steps.length-1:steps.length}: ${steps[activeStep].label}`}</p>}
        </div>
        {
          props.steps.length > 1 ?
            width < 1200 ?
              <div>      
                <Button className="form-stepper-selector-button" color={props.color} aria-describedby={id} onClick={handleClick}>
                  {`${props.language.step}  ${parseInt(activeStep + 1)} ${props.language.of} ${props.coursePlan.guidedCoursePlan==="free"?steps.length-1:steps.length}: ${steps[activeStep].label}`}
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
                      (props.coursePlan.guidedCoursePlan === "guided" || index < 4 || index > 4) && (
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
                  (props.coursePlan.guidedCoursePlan === "guided" || index < 4 || index > 4) && (
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
      <div className='form-stepper-navigation-bottom' >
      <Grid container className='parentNavBar' spacing={6} >
        {
          props.steps.length > 1 ?
            <Grid item xs={12} sm={6}>
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
                {/* <Button
                  color="secondary"
                  onClick={handleSkip}
                >
                  {props.language.skipStep}
                </Button> */}
              </ButtonGroup>
              
            </Grid>
          :
          undefined
        }

          <Grid className='navBar' item xs={12} sm={6}>
          <ButtonGroup
                variant="text"
                size="large"
                aria-label="Course creation step navigation"
              >
              <Button variant="outlined" >
                {props.language.cancel}
              </Button>
            
            
              <Button onClick={() => props.saveAction()} variant="outlined" color="primary">
                {props.saveLabel}
              </Button>
            
           
              <Button onClick={() => props.finalAction()} variant="contained" color="primary">
                {props.finalLabel}
              </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
      </div>
    </div>
  );
}
