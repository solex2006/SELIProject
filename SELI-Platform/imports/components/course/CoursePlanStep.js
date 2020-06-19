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
import CourseOrganization from './CourseOrganization';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    //console.log("CoursePlanStep:", props)
    setCoursePlan(courseInformation.coursePlan.guidedCoursePlan);
    setCourseTemplate(courseInformation.coursePlan.courseTemplate);
    setCourseStructure(courseInformation.coursePlan.courseStructure);
  },[])

  useEffect(()=>{// guided spiral unit
    //console.log("INFO cOURSE pLAN", coursePlan, courseTemplate, courseStructure)
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
          props.validate('passCoursePlanFree')
       }
        else{
          props.validate('NopassCoursePlan')
        }
  })

  const [courseInformation, setCourseInformation]=React.useState(props.courseInformation);
  const [coursePlan, setCoursePlan] = React.useState('');
  const [courseTemplate, setCourseTemplate] = React.useState('');
  const [courseStructure, setCourseStructure] = React.useState('');
  const [changeStructure, setChangeStructure] = React.useState(false);
  
  // will hold a reference for our real input file
  let inputFile = "";
  const handleChange = type => event => {
    let cinformation=courseInformation;
    if (type === 'coursePlan') {
      cinformation.coursePlan.guidedCoursePlan=event.target.value;
      setCoursePlan(event.target.value);
      props.updateCourseInformation(cinformation);
    } else if (type === 'courseTemplate') {
      cinformation.coursePlan.courseTemplate=event.target.value;
      setCourseTemplate(event.target.value);
    }
    setCourseInformation(cinformation);
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
    cInformation.coursePlan.courseStructure = cStructure;
    cInformation.program = [];
    cInformation.design = [];
    setCourseInformation(cInformation);
    setCourseStructure(cStructure);
    handleClose();
  }

  const handleOpen = () => {
    setChangeStructure(true);
  }

  const handleClose = () => {
    setChangeStructure(false);
  }

  const handleUploadButton = event => {
    if (event.which === 32 || event.which === 13) {
      // alert("button click redirects to input click")
      event.preventDefault();
      inputFile.click();
      return false;
    }
  };

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
            errorType: "",
            a11y: null
          }}
          tipMsg={language.documentupload}
          describedBy={"i05-helper-text"}
        />
        {courseInformation.coursePlan.guidedCoursePlan === "free" && (
            courseInformation.sylabus !== undefined ?
              <FormPreview
                file={courseInformation.sylabus}
                type="pdf"
                unPickFile={props.unPickFile.bind(this)}
                changeFile={props.changeFile.bind(this)}
                courseSyllabus={props.language.courseSyllabus}
              />
            :
              <Button onClick={() => props.openFileSelector("pdf", ".pdf")} className="form-file-button" fullWidth color="secondary"><PictureAsPdfSharpIcon className="form-image-icon"/>
                {props.language.selectCourseSyllabus} <br/>
                {props.language.required}
              </Button>
        )} 
        <br/>
        <FormLabel component="legend">
          {language.PlanTemplate}
        </FormLabel>
        <RadioGroup
          aria-label="Course Template"
          name="courseTemplate"
          value={courseTemplate}
          onChange={handleChange("courseTemplate")}
        >
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
          <FormControlLabel value="toyBox" control={<Radio />} label={language.ToyBox} />
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
        />
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
                label="by Topic"
              />
              <FormControlLabel
                onClick={() => warningOrganization("unit")}
                value="unit"
                control={<Radio />}
                label="by Unit"
              />
            </RadioGroup>
            <FeedbackHelp
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
            <Button onClick={() => deleteOrganization()} color="primary" autoFocus>
              {language.continue}
            </Button>
          </DialogActions>
        </div>
        {/* <CourseOrganization 
          ref="CourseOrganization"
          courseInformation={this.props.courseInformation}
          validateOrganization={this.validateOrganization.bind(this)}
          reRender={this.reRender.bind(this)}
          selected={this.props.selected}
          language={this.props.language}
        />
        <div className="dialog-actions-container">
          <Tooltip title={this.props.language.done}>
            <Fab disabled={this.state.correctOrganization} onClick={() => setOrganization()} aria-label={this.props.language.startCreatingCourse} className="dialog-fab" color="primary">
              <AssignmentTurnedInIcon/>
            </Fab>
          </Tooltip>
        </div> */}
      </Dialog>
    </div>
  );
}
