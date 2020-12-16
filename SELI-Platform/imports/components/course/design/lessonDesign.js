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
import ActivityDesign from "./activityDesign";
import FeedbackHelp from "../feedback";
import Resources from './resources'
import { wrap } from "module";
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
    display: 'flex',
    flexDirection: "column",
    flexWrap: 'wrap',
    justifyContent:'space-between',
    alignItems:'center'
  },
  resources:{
    alignSelf:'flex-start'
  },
  activitydesign:{
  
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

export default function DesignCourseApp(props) {
  const {language, guidedCoursePlan, handleSelectResourcesIntoLessons, designInformation, programInformation, unitIndex, handleUnitChange, template, tools,key, handleSelectResourcesLessons,handleSelectResourcesActivities } = props;
  const classes = useStyles();

  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [data, setData] = useState([]);
  const [programActivities, setProgramActivities] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [indexStateLesson, setIndexStateLesson] = useState(-1);
  const [validateTitleLesson, setvalidateTitleLesson]=useState(false)

  useEffect(() => {
    if(designInformation.length !== 0){
      setData(designInformation[unitIndex].lessons);
      setProgramActivities(programInformation[unitIndex].lessons);
    }
  }, [])
  useEffect(()=>{
    console.log("se valida leccion:",validateTitleLesson)
  },[validateTitleLesson])

  const handleActivities = (lessonIndex, activities, pActivities) => {
    let prev = [...data];
    let courseInfo = [...programActivities];
    prev[lessonIndex].activities = activities;
    courseInfo[lessonIndex].activities = pActivities;
    setData(prev);
    setProgramActivities(courseInfo);
    //handleUnitChange(unit, unitIndex)
  };

  function updateTempValue(value) {
    console.log("valueee",value, data)
    data.map((title, indextitle)=>{
      if(title.title!=''){
        if(title.title==value){
          console.log("sssss")
          setvalidateTitleLesson(true)
        }else{
          setvalidateTitleLesson(false)
        }
      }
      
    })
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }

  const lesson = {
    key: "lesson01",
    title: "",
    learnGols: "",
    preKnowledge: "",
    mainContent: "",
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
        activity: language.task,
        type: "1",
        graded: true,
        group: 0,
        project: false,
        preeReview: false,
        submitted: true,
        error: true,
        label: language.required,
        helperText: language.Namerequired,
        validateInput: true
      }
    ],
    editing: true
  }

  const addLesson = () => {
    setvalidateTitleLesson(false)
    let prev = data;
    let programInfo = programActivities;
    let newLesson = lesson;
    newLesson.key = "lesson" + data.length + unitIndex;
    let activity = {_id: Math.random(), name: "", items: [], activities: [{
      _id: Math.random(), name: language.task, items: []
    }]};
    prev.push(newLesson);
    programInfo.push(activity);
    setData(prev);
    setProgramActivities(programInfo);
    setControlEdit({
      tempValue: "",
      adding: true,
      editing: true
    });
    //update units array
    //unit.lessons=data;
    // handleUnitChange(unit, unitIndex)
  }

  const editLesson = (lessonIndex) => {
    
    let prev = data;
    let programInfo = programActivities;
    prev[lessonIndex].editing = false;
    prev[lessonIndex].title = controlEdit.tempValue;
    programInfo[lessonIndex].name = controlEdit.tempValue;
    setData(prev);
    setProgramActivities(programInfo);
    setControlEdit({
      tempValue: "",
      adding: false,
      editing: false
    });
  }

  const warningLesson = (lessonIndex) => {
    handleOpen();
    setIndexStateLesson(lessonIndex);
  }

  const deleteLesson = () => {
    let prev = data;
    let programInfo = programActivities;
    prev.splice(indexStateLesson, 1);
    programInfo.splice(indexStateLesson, 1);
    setProgramActivities(programInfo);
    setData(prev);
    handleClose();
  }

  const handleOpen = () => {
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  return (
    <React.Fragment>
      {data.map((lesson, lessonIndex) => (
        <ExpansionPanel
          expanded={expanded === lesson.key}
          onChange={handleChange(lesson.key)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel1bh-content-" + lesson.key}
            id={"panel1bh-header-" + lesson.key}
          >
            <h3 className={lesson.editing ? classes.hidden : ""}>
              {lesson.title}
            </h3>
            <div className={!lesson.editing ? classes.hidden : ""}>
              <TextField
                id={"lesson_" + lessonIndex + "txtField"}
                value={controlEdit.tempValue}
                onChange={event => updateTempValue(event.target.value)}
              />
              <IconButton
                id={"lesson_" + lessonIndex + "btnSaveEdit"}
                edge="end"
                aria-label={"Save changes"}
                onClick={event => editLesson(lessonIndex)}
                className={classes.saveButton}
                disabled={controlEdit.tempValue.trim() === ""? true : validateTitleLesson===true? true: false}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                id={"lesson_" + lessonIndex + "btnCancelEdit"}
                edge="end"
                aria-label={"Cancel changes"}
                onClick={event => {
                  setData(prev => {
                    prev[lessonIndex].editing = false;
                    console.log("leccio**********",prev)
                     if(prev.slice(-1)[0].title==""){
                      prev.pop()
                      setControlEdit({
                        tempValue: "",
                        adding: false,
                        editing: false
                      });
                      return [...prev];
                      
                    }
                    else{ 
                      setControlEdit({
                        tempValue: "",
                        adding: false,
                        editing: false
                      });
                      return [...prev];
                    }    
                  });
                }}
                className={classes.deleteButton}
              >
                <ClearIcon />
              </IconButton>
              
              <FeedbackHelp
                validation={{
                  error: validateTitleLesson,
                  errorMsg: props.language.YouTitlebefore,
                  errorType: "",
                  a11y: null
                }}
                tipMsg={language.lessonName}
                describedBy={"i05-helper-text"}
              />
            </div>     
          </ExpansionPanelSummary>
          <ExpansionPanelActions>
            <Button
              id={"lesson_" + lessonIndex + "btnEdit"}
              onClick={() => {
                setData(prev => {
                  prev[lessonIndex].editing = true;
                  setControlEdit({
                    tempValue: prev[lessonIndex].title,
                    adding: false,
                    editing: true
                  });
                  return [...prev];
                });
              }}
              disabled={controlEdit.editing}
              variant="outlined"
              color="secondary"
              startIcon={<EditIcon />}
            >
              {language.Editlessonname}
            </Button>
            <Button
              id={"lesson_" + lessonIndex + "btnDelete"}
              onClick={() => warningLesson(lessonIndex)}
              disabled={controlEdit.deleteButton}
              variant="outlined"
              color="secondary"
              startIcon={<RemoveIcon />}
            >
              {language.Deletelesson}
            </Button>
            {lessonIndex !== 0 && (
              <IconButton
                id={"lesson_" + lessonIndex + "btnMoveUp"}
                edge="end"
                aria-label={"Move lesson up"}
                // onClick={handleMovelesson(lessonIndex)}
              >
                <ArrowDropUpIcon />
              </IconButton>
            )}
          </ExpansionPanelActions>
          {guidedCoursePlan === "guided" && (
            <ExpansionPanelDetails className={classes.panelDtls}>
              <div className={classes.resources}>
                <Resources
                  language={language}
                  handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                  type='lessonInto'
                  courseInformation={designInformation}
                  tools={tools}
                  key={key}
                  handleSelectResourcesLessons={handleSelectResourcesLessons}
                  parentIndex={unitIndex}
                  lessonIndex={lessonIndex}
                />
              </div>
              <div className={classes.activitydesign}>
                <ActivityDesign
                  language={language}
                  type='lesson'
                  handleSelectResourcesActivities={handleSelectResourcesActivities}
                  courseInformation={designInformation}
                  programInformation={programInformation}
                  activities={lesson.activities}
                  handleActivities={handleActivities}
                  parentIndex={unitIndex}
                  lessonIndex={lessonIndex}
                  template={template}
                />
              </div>
            </ExpansionPanelDetails>
          )}
        </ExpansionPanel>
      ))}
      <Button
        variant="outlined"
        color="secondary"
        //fullWidth
        onClick={() => addLesson()}
      >
        {language.Addlesson}
      </Button>
      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg={language.Addlesson}
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
                {`${language.deleteItemBelow}, ${language.wantProceed}`}
              </DialogContentText>
            </div>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary" autoFocus>
              {language.cancel}
            </Button>
            <Button variant="outlined" onClick={() => deleteLesson()} color="primary" autoFocus>
              {language.continue}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
