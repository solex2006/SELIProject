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
import React, { useState } from "react";
import ActivityDesign from "./activityDesign";
import FeedbackHelp from "../feedback";


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

export default function DesignCourseApp(props) {
  const {unit,unitIndex,handleUnitChange, template, organization, lessons } = props;
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

  const [data, setData] = useState(lessons);

  const handleActivities = (lessonIndex, activities) => {
    console.log("En el activities----",activities )
    let prev = [...data];
    prev[lessonIndex].activities = activities;
    setData(prev);
   // unit.lessons=data;
    //handleUnitChange(unit, unitIndex)
  };

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
                onChange={event =>
                  setControlEdit(prev => {
                    return { ...prev, tempValue: event.target.value };
                  })
                }
              />
              <IconButton
                id={"lesson_" + lessonIndex + "btnSaveEdit"}
                edge="end"
                aria-label={"Save changes"}
                onClick={event => {
                  console.log("click en save")
                  setData(prev => {
                    prev[lessonIndex].editing = false;
                    prev[lessonIndex].title = controlEdit.tempValue;
                    setControlEdit({
                      tempValue: "",
                      adding: false,
                      editing: false
                    });
                    return [...prev];
                  });
                }}
                className={classes.saveButton}
                disabled={controlEdit.tempValue === ""}
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

                    setControlEdit({
                      tempValue: "",
                      adding: false,
                      editing: false
                    });
                    return [...prev];
                  });
                }}
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
              Edit lesson name
            </Button>

            <Button
              id={"lesson_" + lessonIndex + "btnDelete"}
              onClick={() => {
                if (window.confirm("delete lesson " + lesson.title + "?")) {
                  let prev = [...data];

                  if (lessonIndex === 0) prev = [...prev.slice(1)];
                  else if (lessonIndex === prev.length - 1)
                    prev = [...prev.slice(0, lessonIndex)];
                  else
                    prev = [
                      ...prev.slice(0, lessonIndex),
                      ...prev.slice(lessonIndex + 1)
                    ];

                  setData([...prev]);
                }
              }}
              disabled={controlEdit.deleteButton}
              variant="outlined"
              color="secondary"
              startIcon={<RemoveIcon />}
            >
              Delete lesson
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


          <ExpansionPanelDetails className={classes.panelDtls}>
           <ActivityDesign
              activities={lesson.activities}
              handleActivities={handleActivities}
              parentIndex={lessonIndex}
              template={template}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}


      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => {
          setData(prev => {
            let lesson = {
              key: "lesson" + prev.length + 1,
              title: "",
              learnGols: "",
              preKnowledge: "",
              mainContent: "",
              tools: [
                { checked: false, key: "audio", label: "Audios" },
                { checked: false, key: "games", label: "Games", items: [] },
                { checked: false, key: "images", label: "Images" },
                {
                  checked: false,
                  key: "presentation",
                  label: "Presentation",
                  items: []
                },
                {
                  checked: false,
                  key: "supplemantary",
                  label: "Supplementary Text",
                  items: []
                },
                { checked: false, key: "videos", label: "Videos" }
              ],
              activities: [],
              editing: true
            };
            prev.push(lesson);
            setControlEdit({
              tempValue: "",
              adding: true,
              editing: true
            });
            return [...prev];
          });
          //update units array
          unit.lessons=data;
          handleUnitChange(unit, unitIndex)
        }}
      >
        Add lesson
      </Button>

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
    </React.Fragment>
  );
}
