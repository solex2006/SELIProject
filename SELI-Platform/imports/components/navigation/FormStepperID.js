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
  optional: {},
  caption: {
    color: "rgb(2, 136, 209)!important"
  },
  iconContainer: {
    padding: "0px", 
    color: "rgb(2, 136, 209)" 
  },
  labelContainer: {
    margin: "0px",
    padding: "0px", 
    color: "rgb(2, 136, 209)" 
  },
  label: {
    marginLeft: "0px !important",
    paddingLeft: "5px !important",
    color: "rgb(2, 136, 209)!important",
    // color: "#1460aa",
    fontWeight: 400
  },
  selected: {
    paddingTop: "10px",
    paddingBottom: "10px",
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
    paddingTop: "0px",
    paddingBottom: "0px",
    fontWeight: "800!important",
    color: "rgb(2, 136, 209)!important"
    // underline  step na
    // borderBottom: "rgb(2, 136, 209) inset medium",
  },
  disabled: {
    paddingTop: "0px",
    paddingBottom: "0px",
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
  alternativeLabel: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  error: {
    paddingTop: "0px",
    paddingBottom: "0px",
    color: "#d91e18!important",
    "& $iconContainer": { color: "#d91e18!important" },
    "& $labelContainer": { color: "#d91e18!important" }
    // "& $active": {
    // }
  },
  completed: {
    paddingTop: "0px",
    paddingBottom: "0px",
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
  const [validateInformation,setvalidateInformation]=useState({
    informationStep:props.forms[0].props.courseInformation,
  });
  const [activeStep, setActiveStep] = useState(props.reportflag);
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
    return new Set([3, 4, 5, 6,7]);
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
  
        console.log("newActiveStep,activeStep****************", newActiveStep,activeStep)
   if(props.coursePlan.guidedCoursePlan==='free'){
      if(newActiveStep!=3){
        if(newActiveStep==1){
          setActiveStep(newActiveStep);
        }else if(newActiveStep===2  && stepStatus.completed.has(0) && stepStatus.completed.has(1) ){
          setActiveStep(newActiveStep);
        }

        if((newActiveStep==4) && stepStatus.completed.has(0) && stepStatus.completed.has(1)  && stepStatus.completed.has(3) ){
          setActiveStep(newActiveStep+1);
        }else if((newActiveStep==6) && stepStatus.completed.has(0) && stepStatus.completed.has(1) && stepStatus.completed.has(3) && stepStatus.completed.has(5) ){
          setActiveStep(newActiveStep);
        }else if((newActiveStep==7) && stepStatus.completed.has(0) && stepStatus.completed.has(1) && stepStatus.completed.has(3) 
        && stepStatus.completed.has(5)){
           setStepStatus(prev=>{
            return {... prev, completed:prev.completed.add(6)}
          }) 
          setActiveStep(newActiveStep);
        }
      }
      else{
        console.log("step 3333333333333333333",stepStatus.completed)
        if(newActiveStep==3 && stepStatus.completed.has(0) && stepStatus.completed.has(1) ){
          setActiveStep(newActiveStep);
        }else if(newActiveStep==5 && stepStatus.completed.has(4)){
          setActiveStep(newActiveStep);
        }
        
     }
   }else{
    console.log("****************", newActiveStep,stepStatus.completed)
    if(newActiveStep==1){
      setActiveStep(newActiveStep);
    }else if(newActiveStep===2  && stepStatus.completed.has(0) && stepStatus.completed.has(1) ){
      setActiveStep(newActiveStep);
    }
    else if((newActiveStep==3 || newActiveStep==4) && stepStatus.completed.has(0) && stepStatus.completed.has(1) ){
      setActiveStep(newActiveStep);
    }else if((newActiveStep==5) && stepStatus.completed.has(0) && stepStatus.completed.has(1) && stepStatus.completed.has(3) && stepStatus.completed.has(4) ){
      setActiveStep(newActiveStep);
    }else if((newActiveStep==6) && stepStatus.completed.has(0) && stepStatus.completed.has(1) && stepStatus.completed.has(3) && stepStatus.completed.has(4) && stepStatus.completed.has(5)){
      setActiveStep(newActiveStep);
      setStepStatus(prev=>{
        return {... prev, completed:prev.completed.add(7)}
      })
      let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(7)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
    }else if((newActiveStep==7) && stepStatus.completed.has(0) && stepStatus.completed.has(1) && stepStatus.completed.has(3) 
    && stepStatus.completed.has(4) && stepStatus.completed.has(5)){
       setStepStatus(prev=>{
        return {... prev, completed:prev.completed.add(6)}
      }) 
      let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(6)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
      setActiveStep(newActiveStep);
    }else if (newActiveStep===0 && activeStep===7){
       setActiveStep(newActiveStep);
      setStepStatus(prev=>{
        return {... prev, completed:prev.completed.add(7)}
      })
      let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(7)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
    }

    
   }
  }

  

  function handleBack() {
    console.log("handleback in stepper ID")
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep - 1;
    activeStep === 0 ? setActiveStep(prevActiveStep => steps.length - 1) : setActiveStep(prevActiveStep => prevActiveStep - 1);

    if(props.coursePlan.guidedCoursePlan==='free'){
      
        if((newActiveStep==4) && stepStatus.completed.has(0) && stepStatus.completed.has(1)  ){
          setActiveStep(newActiveStep-1);
        }
      
      
   }
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

// let reportflag=props.reportflag
 useEffect(()=>{
  console.log("active step en KIDD",props.activeStep)
  if(props.activeStep!=''){
    handleBack()
  }
  
  
},[props.activeStep])   

useEffect(()=>{
  console.log("props.updateSteps",props.updateSteps)

  let newDisabled = new Set(stepStatus.disabled.values());
  let newFailed = new Set(stepStatus.failed.values());
  let newCompleted = new Set(stepStatus.completed.values());

  if(props.updateSteps==='passInformation'){
    setStepStatus(prev=>{
      //let newFailed = new Set(stepStatus.failed.values());
      newFailed.delete(0);
      newCompleted.add(0);
      //let newDisabled = new Set(stepStatus.disabled.values());
      if(stepStatus.completed.has(1)){    
        newDisabled.delete(3);
      }
      return {
        ...prev, 
        completed:newCompleted,
        failed: newFailed,
        disabled:newDisabled
      }
    })
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(0)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }else if(props.updateSteps==='NopassInformation'){
    setStepStatus(prev=>{
     // let newCompleted = new Set(stepStatus.completed.values());
      newCompleted.delete(0);
      newCompleted.delete(3);
      newCompleted.delete(6);
      newCompleted.delete(4);
      newCompleted.delete(5);
      newCompleted.delete(7);
     // let newDisabled = new Set(stepStatus.disabled.values());
      newDisabled.add(3);
      newDisabled.add(6);
      newDisabled.add(4);
      newDisabled.add(5);
      newDisabled.add(7);
      //let newFailed = new Set(stepStatus.failed.values());
      newFailed.add(0)
      newFailed.delete(3)
      newFailed.delete(4)
      newFailed.delete(5)
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
    console.log("dentro del no pass audience", newCompleted, newDisabled, newFailed)
      if(stepStatus.completed.has(0)){
        newDisabled.delete(3);
      }   
      newFailed.delete(1);
      newCompleted.add(1)
      setStepStatus(prev=>{
        return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
      })
      let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(1)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
      
  }else if(props.updateSteps==='NopassAudience'){
    //let newCompleted = new Set(stepStatus.completed.values());
    newCompleted.delete(1);
    newCompleted.delete(3);
    newCompleted.delete(6);
    newCompleted.delete(4);
    newCompleted.delete(5);
    newCompleted.delete(7);
    //let newDisabled = new Set(stepStatus.disabled.values());
    newDisabled.add(3);
    newDisabled.add(6);
    newDisabled.add(4);
    newDisabled.add(5);
    newDisabled.add(7);

    newFailed.delete(3)
    newFailed.delete(4)
    newFailed.delete(5)
    newFailed.add(1)
    setStepStatus(prev=>{
      return {
        ...prev, 
        failed:newFailed,
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
    newFailed.delete(2)
    newCompleted.add(2)
    setStepStatus(prev=>{
      
      return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
    })

    let stepstatus1=props.forms[0].props.courseInformation
      stepstatus1.stepscompleted.push(2)
      stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
      setvalidateInformation(stepstatus1)
  }


  if(props.updateSteps==='passCoursePlan' || props.updateSteps==='passCoursePlanFree'){
    
    if(props.updateSteps==='passCoursePlan'){
        let newDisabled = new Set(stepStatus.disabled.values());
        let newCompleted= new Set(stepStatus.completed.values());
        let newFailed = new Set(stepStatus.failed.values());
      
        newFailed.delete(3);
        newDisabled.delete(4);
        newDisabled.add(5)
        newCompleted.add(3);
        newCompleted.delete(5);
        setStepStatus(prev=>{
          return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
        })
    }
    
    //handleCompletenew(stepStatus.active)
    if(props.updateSteps==='passCoursePlanFree'){
      newDisabled.delete(5);
      newFailed.delete(3);
      newCompleted.add(3);
      setStepStatus(prev=>{
        return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
      }) 
    }
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(3)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)

  }else if(props.updateSteps==='NopassCoursePlan'){
    newFailed.add(3);
    newCompleted.delete(3);
    newDisabled.add(4);
    newDisabled.add(5);
    newDisabled.add(6);
    newDisabled.add(7);
    newCompleted.delete(4);
    newCompleted.delete(5);
    newCompleted.delete(6);
    newCompleted.delete(7);
    setStepStatus(prev=>{
      return {
        ...prev, 
        failed:newFailed,
        completed: newCompleted,
        disabled:newDisabled
       }
    })

    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(3);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
    
  }
  
   
  if(props.updateSteps==='passCourseAnalysis'){
    newDisabled.delete(5);
    newFailed.delete(4);
    newCompleted.add(4);
    newDisabled.delete(4);
    setStepStatus(prev=>{ 
      return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
    })
    //handleCompletenew(stepStatus.active)
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(4)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }else if(props.updateSteps==='NopassCourseAnalysis'){
    console.log("dentro del no pass analisis", newCompleted, newDisabled, newFailed)
   
        newCompleted.delete(4);
        newCompleted.delete(7);
        newCompleted.delete(5);
        newCompleted.delete(6);
        //newCompleted.delete(5);
        newDisabled.add(5);
        newDisabled.add(6);
        newDisabled.add(7);
        setStepStatus(prev=>{
          return {
            ...prev, 
            failed:prev.failed.add(4),
            completed: newCompleted,
            disabled:newDisabled,
            
          }
        })   
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(4);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }
  
  if(props.updateSteps==='passCourseDesign'){
    newDisabled.delete(5)
    newDisabled.delete(6)
    newCompleted.add(5)
    newFailed.delete(5);  
    newDisabled.delete(5);
    
    setStepStatus(prev=>{
      return {... prev, completed:newCompleted, failed:newFailed, disabled:newDisabled}
    })
    
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(5)
    //stepstatus1.stepscompleted.push(6)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }else if(props.updateSteps==='NopassCourseDesign'){
    newCompleted.delete(5);
    newCompleted.delete(6);
    newCompleted.delete(7);
    newDisabled.add(6);
    newDisabled.add(7);
    newFailed.add(5)
    setStepStatus(prev=>{
      return {
        ...prev, 
        failed:newFailed,
        completed: newCompleted,
        disabled:newDisabled
       }
    })
    let stepstatus1=props.forms[0].props.courseInformation.stepscompleted
    var index = stepstatus1.indexOf(5);
    if (index > -1) {stepstatus1.splice(index, 1);}
    setvalidateInformation(stepstatus1)
  }
  

  if(props.updateSteps==='PassProgram'){
    console.log("dentro del complete program",props.forms[0].props.courseInformation )
    newCompleted.add(6)
    newCompleted.add(7)
    newDisabled.delete(7)
    newDisabled.delete(6)
    setStepStatus(prev=>{
      return {
        ...prev, 
        failed:newFailed,
        completed: newCompleted,
        disabled:newDisabled
       }
    })
    
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(6)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }
  if(props.updateSteps==='PassReport' ){
    stepStatus.completed.add(7)
    stepStatus.disabled.delete(7)
    stepStatus.completed.add(6)
    setStepStatus(stepStatus)
    
    let stepstatus1=props.forms[0].props.courseInformation
    stepstatus1.stepscompleted.push(6)
    stepstatus1.stepscompleted.push(7)
    stepstatus1.stepscompleted=[...new Set(stepstatus1.stepscompleted)]
    setvalidateInformation(stepstatus1)
  }


  
},[props.updateSteps])


useEffect(()=>{
  console.log("RESATURA LOS PASOS  YA GUARDADOS",stepStatus,validateInformation)
  //steps aprobados
    if(props.forms[0].props.courseInformation.stepsflag==='saved'){
      let estado= stepStatus
      props.forms[0].props.courseInformation.stepscompleted.map((aprobed,index)=>{
        //console.log("paso",aprobed)
        estado.completed.add(aprobed)
        estado.failed.delete(aprobed)
        estado.disabled.delete(aprobed)
        setStepStatus(estado)
      }) 
    }
},[])

  return (
    <div className="form-stepper-container">
      <div className="form-stepper-navigation-id">
        <div className="form-stepper-information-id">
          <h1 style={{color: getComputedStyle(document.documentElement).getPropertyValue('--' + props.color)}} className="form-stepper-title">{props.title}</h1>
          {width >= 1600 && <p className="form-stepper-active-step-id">{`${props.language.step}  
          ${(props.coursePlan.guidedCoursePlan==="free" && activeStep>3)?parseInt(activeStep ):parseInt(activeStep + 1)} ${props.language.of} ${props.coursePlan.guidedCoursePlan==="free"?steps.length-1:steps.length}: ${steps[activeStep].label}`}</p>}
        </div>
        {
          props.steps.length > 1 ?
            width < 1600 ?
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
                </Popover>
              </div>
            :
              <Stepper  className="form-stepper-large-steps"  nonLinear activeStep={activeStep}>      
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
                        style={{paddding: "0px"}}
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
      <div valor={"valor"} className="form-stepper-content-id">
        { getStepContent(activeStep) }
      </div>
      <div className='form-stepper-navigation-bottom' >
        <Grid container className='parentNavBar' spacing={4} >
          {
            props.steps.length > 1 ?
              <Grid className='navBarBackNext' item xs={4} >
                <ButtonGroup
                  variant="text"
                  size={width >= 640 ? "large" : "small"}
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
          <Grid className='navBar' item xs={8} >
            <ButtonGroup
              variant="text"
              size={width >= 640 ? "large" : "small"}
              aria-label="Course creation step navigation"
            >
              {
                props.saved &&
                <Button onClick={() => props.cancelChanges()} variant="outlined" >
                  {props.language.cancel}
                </Button>
              }
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
