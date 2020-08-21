import React , {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormPreview from '../files/previews/FormPreview';
import FormLabel from "@material-ui/core/FormLabel";
//import SimulateButtons from "./simulate";
import Button from "@material-ui/core/Button";
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import FeedbackHelp from "./feedback";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PdfFormulario from './pdfForm';


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30em"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30em"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  upload: {
    "& svg": {
      width: "5em",
      height: "5em",
      marginRight: "0.5em"
    },
    "& $uploadCaption": {
      marginLeft: ".5em"
    },
    "& $textField": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "21.5em"
    }
  },
  uploadCaption: {},
  img: {
    // "& svg": {
    width: "5em",
    height: "5em",
    marginRight: "0.5em"
    // },
  }
}));

export default function CoursePlanStep(props) {
  const classes = useStyles();
  const {language}=props;
  
  useEffect(()=>{
    setCoursePlan(courseInformation.coursePlan.guidedCoursePlan);
    setCourseTemplate(courseInformation.coursePlan.courseTemplate);
    setCourseStructure(courseInformation.coursePlan.courseStructure);
  },[])

 

  
  const [courseInformation, setCourseInformation]=React.useState(props.courseInformation);
  const [coursePlan, setCoursePlan] = React.useState('');
  const [courseTemplate, setCourseTemplate] = React.useState('');
  const [newTemplate, setNewTemplate] = React.useState('');
  const [courseStructure, setCourseStructure] = React.useState('');
  const [changeStructure, setChangeStructure] = React.useState(false);
  const [changeSylabus, setchangeSylabus] = React.useState('');
  const [flagSylabus, setflagSylabus] = React.useState(undefined);
  // will hold a reference for our real input file
  let inputFile = "";


  useEffect(()=>{// guided spiral unit
    console.log("courseInformation al actualizar ael silabo******************", props.courseInformation)
    if(coursePlan==='guided' && courseTemplate==='without' && (courseStructure==='unit' || courseStructure==='topic' )){
        props.validate('passCoursePlan')
    }
    else if(coursePlan==='guided' && (courseTemplate==='spiral' || courseTemplate==='consistent' || courseTemplate==='toyBox')){
      props.validate('passCoursePlan')
    }
    else if(coursePlan==='free' && (courseTemplate==='spiral' || courseTemplate==='consistent' || courseTemplate==='toyBox')){
      props.validate('passCoursePlanFree')
    }
    else if(coursePlan==='free' && courseTemplate==='without' && (courseStructure==='unit' || courseStructure==='topic' )){
      
      console.log("decide sie l cours eplan pasa", courseInformation.sylabus)
      if(courseInformation.sylabus!=undefined){
        props.validate('passCoursePlanFree')
      }else{
        props.validate('NopassCoursePlan')
      }   
    }
    else{
      props.validate('NopassCoursePlan')
    }
  })
  const handleChange = type => event => {
    let cinformation=courseInformation;
    
    if (type === 'coursePlan') {
      cinformation.coursePlan.guidedCoursePlan = event.target.value;
      setCoursePlan(event.target.value);
      if (event.target.value === "free") {
        
        cinformation.coursePlan.courseTemplate = "without";
        setCourseTemplate("without");
      }
      props.updateCourseInformation(cinformation);
    } else if (type === 'courseTemplate') {
      if (event.target.value !== "without" && courseTemplate === "without" && courseStructure === "unit") {
        handleOpen();
        setNewTemplate(event.target.value);
      } else {
        cinformation.coursePlan.courseTemplate = event.target.value;
        setCourseTemplate(event.target.value);
      }
    }
    setCourseInformation(cinformation);
    props.handleCahngetick()
  }

  const warningOrganization = (structure) => {
    if (courseStructure !== structure) {
      handleOpen();
    }
  }

  const deleteOrganization = () => {
    let cInformation = courseInformation;
    let cStructure;
    if (courseStructure === "unit") {cStructure = "topic"} else {cStructure = "unit"}
    if (newTemplate !== '') {
      cInformation.coursePlan.courseTemplate = newTemplate;
      setCourseTemplate(newTemplate);
    }
    cInformation.coursePlan.courseStructure = cStructure;
    cInformation.program = [];
    cInformation.design = [];
    setCourseInformation(cInformation);
    setCourseStructure(cStructure);
    setNewTemplate('');
    handleClose();
  }

  const handleOpen = () => {
    setChangeStructure(true);
  }

  const handleClose = () => {
    setChangeStructure(false);
    setNewTemplate('');
  }

  const handleUploadButton = event => {
    if (event.which === 32 || event.which === 13) {
      // alert("button click redirects to input click")
      event.preventDefault();
      inputFile.click();
      return false;
    }
  };

  const resetSylabus=()=>{
    courseInformation.sylabus = undefined
    setCourseInformation(courseInformation)
    setchangeSylabus(Math.random())
  }
  const loadSylabus=(file)=>{
    console.log("loadSylabus-------->",file)
   
      setflagSylabus(!flagSylabus)
    
  }


  useEffect(()=>{
    console.log("cambio silabo")
    setflagSylabus(undefined)
  },[changeSylabus])

  return (
    <div className="course-information-container">
      <div className="form-input-column">
        <h3>{language.GuidedCoursePlan}</h3>
        <br/>
        <FormLabel component="legend">
          {language.PlanCreate}
        </FormLabel>
        <RadioGroup
          aria-label="Course Plan"
          name="coursePlan"
          value={coursePlan}
          onChange={handleChange("coursePlan")}      
        >
          <FormControlLabel value="guided" control={<Radio />} label="Guided" />
          <FormControlLabel value="free" control={<Radio />} label="Free" />
        </RadioGroup>
        <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "required",
              a11y: null
            }}
            tipMsg={language.instructionGuidedCoursePlan}
            describedBy={"i02-helper-text"}
        />
        {/* <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg={language.documentupload}
          describedBy={"i05-helper-text"}
        /> */}
        
        {courseInformation.coursePlan.guidedCoursePlan === "free" && (
          <React.Fragment>
            <br/>
             <FormLabel component="legend">
               {language.chooseCourseSyllabus}
             </FormLabel>
             <PdfFormulario
              loadSylabus={loadSylabus}
              courseInformation={props.courseInformation}
              handleControlMessage={props.handleControlMessage.bind(this)}
              language={props.language}
              language={props.language}
              selected={props.selected}
              expandedNodes={props.expandedNodes}
              resetSylabus={resetSylabus}
            />
          </React.Fragment>
        )} 
        <br/>
        {
          courseInformation.coursePlan.guidedCoursePlan !="free"? 
           <FormLabel component="legend">
            {language.PlanTemplate}
           </FormLabel>
          :
          undefined
        }
       
        <RadioGroup
          aria-label="Course Template"
          name="courseTemplate"
          value={courseTemplate}
          onChange={handleChange("courseTemplate")}
        >
          {courseInformation.coursePlan.guidedCoursePlan === "guided" && (
            <React.Fragment>
              <FormControlLabel
                value="spiral"
                control={<Radio />}
                label={language.SpiralModel}
              />
              <FormControlLabel
                value="consistent"
                control={<Radio />}
                label={language.Consistent}
              />
              <FormControlLabel 
                value="toyBox" 
                control={<Radio />} 
                label={language.ToyBox} 
              />
            </React.Fragment>
          )}
          <FormControlLabel
            value="without"
            control={<Radio />}
            label={language.Withouttemplate}
          />
        </RadioGroup>
        <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "required",
              a11y: null
            }}
            tipMsg={language.instructionTemplateCourse}
            describedBy={"i02-helper-text"}
        />
        {/* <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg={language.appropriateOption}
          describedBy={"i05-helper-text"}
          stepHelp={{
            step: "textHelper",
            stepLabel: "a title"
          }}
          decisionHelp={{
            name: "cplx"
          }}
        /> */}
        <br/>
        {courseInformation.coursePlan.courseTemplate === "without" && (
          <React.Fragment>
            <FormLabel component="legend">
              {language.PlanStructure}
            </FormLabel>
            <RadioGroup
              aria-label="Course Structure"
              name="courseStructure"
              value={courseStructure}
            >
              <FormControlLabel
                onClick={() => warningOrganization("topic")}
                value="topic"
                control={<Radio />}
                label={language.byTopics}
              />
              <FormControlLabel
                onClick={() => warningOrganization("unit")}
                value="unit"
                control={<Radio />}
                label={language.byUnitsAndLessons}
              />
            </RadioGroup>
            {/* <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg={language.appropriateOption}
              describedBy={"i05-helper-text"}
              stepHelp={{
                step: "textHelper",
                stepLabel: "a title"
              }}
            /> */}
            <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "required",
              a11y: null
            }}
            tipMsg={language.instructionStructureCourse}
            describedBy={"i02-helper-text"}
        />
          </React.Fragment>
        )}
        <br/><br/><br/><br/>
      </div>
      <Dialog
        open={changeStructure}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        keepMounted
        maxWidth={false}
      >
        <DialogTitle className="dialog-title">
          <AppBar className="dialog-app-bar" color="primary" position="static">
            <Toolbar className="dialog-tool-bar" variant="dense" disableGutters={true}>
              <AppsIcon/>
              <h4 className="dialog-label-title">{language.courseOrganization}</h4>
              <IconButton
                id="close-icon"
                edge="end"
                className="dialog-toolbar-icon"
                //disabled={this.state.showCourseOrganization || this.state.showAccessibilityOptions || this.state.showAccessibilityForm}
                onClick={() => {handleClose()}}
              >
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </DialogTitle>
        <div>
          <DialogContent className="success-dialog-content">
            <div className="organization-form">
              <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                {language.courseOrganizationChangeWarning}
              </DialogContentText>
            </div>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary" autoFocus>
              {language.cancel}
            </Button>
            <Button variant="outlined" onClick={() => deleteOrganization()} color="primary" autoFocus>
              {language.continue}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
