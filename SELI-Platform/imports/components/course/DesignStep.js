import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState, useEffect } from "react";
import ActivityDesign from "./design/activityDesign";
import DesignCourseCommons from "./design/common";
import LessonDesign from "./design/lessonDesign";
import FeedbackHelp from "./feedback";
//Dialog
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    "& $deleteButton:hover": {
      backgroundColor: "#d91e1822"
      //color: "#d91e18"
    },
    "& $saveButton:hover": {
      backgroundColor: "#00897b22"
      //color: "#d91e18"
    }
  },
  panelDtls: {
    display: "block"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  hidden: {
    display: "none"
  },
  addButton: {
    color: theme.palette.secondary.main
  },
  deleteButton: {},
  saveButton: {},
  nav: {
    width: "100%",
    maxWidth: "100%"
    // backgroundColor: "#f5f5f5"
  },
  header: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#e0e0e0!important"
  }
}));

export default function DesignStep(props) {
  const {courseInformation,language } = props;

  const classes = useStyles();
  const [template, setTemplate] = useState(props.courseInformation.coursePlan.courseTemplate);
  const [organization, setOrganization] =  useState(props.courseInformation.coursePlan.courseStructure);
  const [courseinformation, setcourseInformation] = useState(courseInformation);
  const [guidedCoursePlan, setGuidedCoursePlan] = useState(props.courseInformation.coursePlan.guidedCoursePlan);
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [indexUnitTopic, setIndexUnitTopic] = useState(-1);

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [data, setData] = useState([]);
  const firstData = {
    key: organization === "unit" ? "unit1" : "topic1",
    title: organization === "unit" ? language.unit01 : language.topic01,
    learnGols: '',
    preKnowledge: '',
    mainContent: '',
    evaluation:'',
    tools: [
      { checked: false, key: "audio", label: language.Audios },
      { checked: false, key: "games", label: language.Games, items: [] },
      { checked: false, key: "images", label: language.Images },
      { checked: false, key: "presentation", label: language.Presentation, items: []},
      { checked: false, key: "supplemantary",label: language.SupplementaryText, items: []},
      { checked: false, key: "videos", label: language.Videos }
    ],
    activities: [////este nivale cuando sleccionas todos menos without template by units
      
    ],
    lessons: [
      {
        key: "lesson1",
        title: "Lesson 01",
        tools: [
          { checked: false, key: "audio", label: language.Audios },
          { checked: false, key: "games", label: language.Games, items: [] },
          { checked: false, key: "images", label: language.Images },
          { checked: false, key: "presentation", label: language.Presentation, items: []},
          { checked: false, key: "supplemantary",label: language.SupplementaryText, items: []},
          { checked: false, key: "videos", label: language.Videos }
        ],
        activities: [
          {
            activity: "Example",
            type: 1,
            graded: true,
            group: 0,
            project: false,
            preeReview: false,
            tools: [
              { checked: false, key: "audio", label: language.Audios },
              { checked: false, key: "games", label: language.Games, items: [] },
              { checked: false, key: "images", label: language.Images },
              { checked: false, key: "presentation", label: language.Presentation, items: []},
              { checked: false, key: "supplemantary",label: language.SupplementaryText, items: []},
              { checked: false, key: "videos", label: language.Videos }
            ],
            submitted: true,
            error: true,
            label: "required",
            helperText: "Name is required.",
            validateInput: true
          }
        ]
      }
    ],
    editing: false
  };

  const firstProgramData = {
    name: firstData.title, 
    items: [], activities: [], 
    lessons: [
      {
        _id: Math.random(), 
        name: firstData.lessons[0].title, 
        items: [], 
        activities: [
          {_id: Math.random(), name: firstData.lessons[0].activities[0].activity, items: []}
        ]
      }
    ]
  };

  useEffect(() => {
    if (courseInformation.design.length !== 0 ) {
      setData(courseInformation.design)
    } else {
      let courseInfo = courseinformation;
      var newFirstData = firstData;
      var newFirstProgramData = firstData;
      courseInfo.design.push(newFirstData);
      courseInfo.program.push(newFirstProgramData);
      setData(courseInfo.design);
      setcourseInformation(courseInfo);
    }
  }, []); 

  useEffect(() => {
    //console.log(courseInformation)
    if(organization==='unit' && template!='without') {
      setOrganization('topic')
    }
    props.courseInformation.design.map((unit, index)=>{
      if (unit.learnGols!='' && unit.mainContent!='' && unit.evaluation!='') {
        props.validate('passCourseDesign')
      } else {
        props.validate('NopassCourseDesign')
      }
    })
  }); 

  const handleUnitChange = (unit, unitIndex) => {
    //console.log("unidad and unitIndex",unit, unitIndex )
    let prev = data;
    prev[unitIndex] = unit;
    setData(prev);
    //guardar en el courseInformation
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo);
  };

  const handleSelectResources = (unitIndex, resourceIndex) => {
    //console.log("checkboxes", unitIndex, resourceIndex)
    let prev = [ ...data ];
    prev[unitIndex].tools = resourceIndex;
    setData(prev); 
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo)
  };

  const handleSelectResourcesLessons = (unitIndex, resourceIndex, lessonIndex) => {
    //console.log("Las lecciones a guardar en la unidad************************************", unitIndex, resourceIndex,lessonIndex)
    let prev = [ ...data ];
    prev[unitIndex].lessons[lessonIndex].tools = resourceIndex;
    //console.log("prevlesson-----------------------------------",prev)
    setData(prev); 
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo)  
  };

  const handleSelectResourcesIntoLessons = (unitIndex, resourceIndex, lessonIndex, subindex) => {
   // console.log("lo que va dentro de tools************************************", unitIndex, resourceIndex,lessonIndex)
    let prev = [ ...data ];
    prev[unitIndex].lessons[lessonIndex].tools[subindex].items = resourceIndex;
    //console.log("prevlesson-----------------------------------",prev)
    setData(prev); 
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo) 
  };

  const handleSelectResourcesActivities = (unitIndex, resourceIndex, lessonIndex, programActivities) => {
    //console.log("Las lecciones a guardar en la unidad", unitIndex, resourceIndex,lessonIndex)
    let prev = [ ...data ];
    let courseInfo=courseinformation;
    prev[unitIndex].lessons[lessonIndex].activities = resourceIndex;
    setData(prev); 
    courseInfo.design=data;
    courseInfo.program[unitIndex].lessons[lessonIndex].activities = programActivities;
    setcourseInformation(courseInfo);
  };

  const handleActivities = (unitIndex, activities, programActivities) => {
    let prev = [ ...data ];
    let courseInfo=courseinformation;
    prev[unitIndex].activities = activities;
    setData(prev);
    courseInfo.design=data;
    courseInfo.program[unitIndex].activities = programActivities;
    setcourseInformation(courseInfo);
  };

  const handleToolActivity=(unitIndex, resourceIndex, lessonIndex)=>{
    //console.log("Las tools dentro de una activity", unitIndex, resourceIndex,lessonIndex)
    let prev = [ ...data ];
    prev[unitIndex].activities[lessonIndex].tools = resourceIndex;
    setData(prev); 
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo) 
  }

  const addUnitTopic = () => {
    var newFirstData = firstData;
    newFirstData.key = `${organization === "unit" ? "unit1" : "topic1"}${data.length ? data.length : "0"}`;
    newFirstData.editing = true;
    let prev = data;
    prev.push(newFirstData);
    setData(prev);
    //Course Program Information
    let courseInfo=courseinformation;
    courseInfo.design=prev;
    var newFirstProgramData = firstProgramData;
    newFirstProgramData.lessons[0]._id = Math.random();
    newFirstProgramData.lessons[0].activities[0]._id = Math.random();
    courseInfo.program.push(newFirstProgramData);
    setcourseInformation(courseInfo);
    setControlEdit({
      tempValue: "",
      adding: true,
      editing: true
    });
  }

  const handleDeleteUnitTopic = (unitIndex) => {
    handleOpen();
    setIndexUnitTopic(unitIndex);
  }

  const deleteUnitTopic = () => {
    let prev = data;
    let courseInfo=courseinformation;
    prev.splice(indexUnitTopic, 1);
    setData(prev);
    courseInfo.design=prev;
    courseInfo.program.splice(indexUnitTopic, 1);
    setcourseInformation(courseInfo);
    handleClose();
  }

  const editUnitTopicName = (unitIndex) => {
    let prev = data;
    prev[unitIndex].editing = true;
    setData(prev);
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo);
    setControlEdit({
      tempValue: prev[unitIndex].title,
      adding: false,
      editing: true
    });
  }

  const saveEdit = (unitIndex) => {
    let prev = data;
    prev[unitIndex].editing = false;
    prev[unitIndex].title = controlEdit.tempValue;
    setData(prev);
    let courseInfo = courseinformation;
    courseInfo.design = data;
    courseInfo.program[unitIndex].name = controlEdit.tempValue;
    setcourseInformation(courseInfo);
    setControlEdit({
      tempValue: "",
      adding: false,
      editing: false
    });
  }

  const cancelEdit = (unitIndex) => {
    let prev = data;
    prev[unitIndex].editing = false;
    setData(prev);
    setControlEdit({
      tempValue: "",
      adding: false,
      editing: false
    });
  }

  const handleOpen = () => {
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  return(
    <div className="form-input-audiences">
      <p>Some introductory explanation ....</p>
      {data.map((unit, unitIndex) => (
        <React.Fragment>
          <br/>
          <ExpansionPanel
            expanded={expanded === unit.key}
            onChange={handleChange(unit.key)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={"panel1bh-header-" + unit.key}
            >
              <h3 className={unit.editing ? classes.hidden : ""}>{unit.title}</h3>        
              <div className={!unit.editing ? classes.hidden : ""}>
                <TextField
                  id={"unit_" + unitIndex + "txtField"}
                  label={"Title"}
                  value={controlEdit.tempValue}
                  onChange={event => updateTempValue(event.target.value)}
                />
                <IconButton
                  id={"unit_" + unitIndex + "btnSaveEdit"}
                  edge="end"
                  aria-label={"Save changes"}
                  onClick={event => saveEdit(unitIndex)}
                  className={classes.saveButton}
                  disabled={controlEdit.tempValue === ""}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  id={"unit_" + unitIndex + "btnCancelEdit"}
                  edge="end"
                  aria-label={"Cancel changes"}
                  onClick={event => cancelEdit(unitIndex)}
                  className={classes.deleteButton}
                >
                  <ClearIcon />
                </IconButton>
                <FeedbackHelp
                  validation={{
                    error: false,
                    errorMsg: "",
                    errorType: "",
                    a11y: null
                  }}
                  tipMsg="instructions"
                  describedBy={"i05-helper-text"}
                />
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelActions>
              <Button
                id={"unit_" + unitIndex + "btnEdit"}
                onClick={() => editUnitTopicName(unitIndex)}
                disabled={controlEdit.editing}
                variant="outlined"
                color="secondary"
                startIcon={<EditIcon />}
              >
                {language.Editunitname}
              </Button>
              <Button
                id={"unit_" + unitIndex + "btnDelete"}
                onClick={() => handleDeleteUnitTopic(unitIndex)}
                disabled={controlEdit.deleteButton}
                variant="outlined"
                color="secondary"
                startIcon={<RemoveIcon />}
              >
                {language.Deleteunit}
              </Button>
              {unitIndex !== 0 && (
                <IconButton
                  id={"unit_" + unitIndex + "btnMoveUp"}
                  edge="end"
                  aria-label={"Move unit up"}
                  // onClick={handleMoveUnit(unitIndex)}
                >
                  <ArrowDropUpIcon />
                </IconButton>
              )}
            </ExpansionPanelActions>
            <ExpansionPanelDetails className={classes.panelDtls}>
              {guidedCoursePlan === "guided" && (<DesignCourseCommons
                language={language}
                validate={props.validate}
                courseInformation={courseinformation.design}
                key={unit.key}
                learnGols={unit.learnGols}
                preKnowledge={unit.preKnowledge}
                mainContent={unit.mainContent}
                tools={unit.tools}
                otherTools={unit.otherTools}
                unit={unit}
                unitIndex={unitIndex}
                handleUnitChange={handleUnitChange}
                handleSelectResources={handleSelectResources}
                template={template}
                organization={organization}
                evaluation={unit.evaluation}
              />)}
              <br/>
              {organization === "unit" ?
                <LessonDesign
                  language={language}
                  guidedCoursePlan={guidedCoursePlan}
                  handleSelectResourcesActivities={handleSelectResourcesActivities}
                  handleSelectResourcesLessons={handleSelectResourcesLessons}
                  handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                  tools={unit.tools}
                  key={unit.key}
                  designInformation={courseinformation.design}
                  programInformation={courseinformation.program}
                  unitIndex={unitIndex}
                  template={template}
                  organization={organization}
                />
              :
                guidedCoursePlan === "guided" && <ActivityDesign
                  language={language}
                  courseInformation={courseinformation.design}
                  programInformation={courseinformation.program}
                  activities={unit.activities}
                  handleActivities={handleActivities}
                  handleToolActivity={handleToolActivity}
                  parentIndex={unitIndex}
                  template={template}
                />
              }       
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </React.Fragment>
      ))}
      <br/>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => addUnitTopic()}
      >
        {organization === "unit" ? language.addUnit : language.addTopic}
      </Button>
      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg={organization === "unit" ? language.addUnit : language.addTopic}
        describedBy={"i05-helper-text"}
      />
      <Dialog
        open={openDialog}
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
              <h4 className="dialog-label-title">{language.Deleteunit}</h4>
              <IconButton
                id="close-icon"
                edge="end"
                className="dialog-toolbar-icon"
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
                Are you sure you want to delete this unit/topic ?
              </DialogContentText>
            </div>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary" autoFocus>
              {language.cancel}
            </Button>
            <Button onClick={() => deleteUnitTopic()} color="primary" autoFocus>
              {language.continue}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
