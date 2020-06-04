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
  const {courseInformation } = props;
  useEffect(() => {

    if(courseInformation.design.length!=0){
      setData(courseInformation.design)
    }
    
 
  }, []); 

  
  console.log("CourseInformation-DesignStep", props.courseInformation) 
  const classes = useStyles();
  const template = props.courseInformation.coursePlan.courseTemplate;
  const organization = props.courseInformation.coursePlan.courseStructure;

  console.log("tempalte and organization", template, organization);
  const [courseinformation, setcourseInformation]= useState(courseInformation)
  
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [data, setData] = useState([
      {
        key: "topic1",
        title: organization === "unit" ? "Unit 01" : "Topic 01",
        learnGols: '',
        preKnowledge: '',
        mainContent: '',
        evaluation:'',
        tools: [//este nivale cuando sleccionas todos menos without template by unit
          { checked: false, key: "audio", label: "Audios" },
          { checked: false, key: "games", label: "Games", items: [] },
          { checked: false, key: "images", label: "Images" },
          { checked: false, key: "presentation", label: "Presentation", items: []},
          { checked: false, key: "supplemantary",label: "Supplementary Text", items: []},
          { checked: false, key: "videos", label: "Videos" }
        ],
        activities: [////este nivale cuando sleccionas todos menos without template by units
          {
            activity: "Mehmet",
            type: 1,
            graded: true,
            group: 0,
            project: false,
            preeReview: false,
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
            submitted: true,
            error: true,
            label: "required",
            helperText: "Name is required.",
            validateInput: true
          }
        ],
        lessons: [
          {
            key: "lesson1",
            title: "Lesson 01",
            tools: [
              { checked: false, key: "audio", label: "Audios" },
              { checked: false, key: "games", label: "Games", items: [] },
              { checked: false, key: "images", label: "Images" },
              { checked: false,key: "presentation",label: "Presentation",items: []},
              { checked: false,key: "supplemantary",label: "Supplementary Text",items: []},
              { checked: false, key: "videos", label: "Videos" }
            ],
            activities: [
              {
                activity: "Mehmet",
                type: 1,
                graded: true,
                group: 0,
                project: false,
                preeReview: false,
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
      }
    ]
  );

  const handleUnitChange = (unit, unitIndex) => {
    console.log("unidad and unitIndex",unit, unitIndex )
    let prev = data;
    prev[unitIndex] = unit;
    setData(prev);
    //guardar en el courseInformation
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo);
  };

  const handleSelectResources = (unitIndex, resourceIndex) => {
    console.log("checkboxes", unitIndex, resourceIndex)
    let prev = [ ...data ];
    prev[unitIndex].tools = resourceIndex;
    console.log("prev-----------------------------------",prev)
    setData(prev); 
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo)
  };
  const handleActivities = (unitIndex, activities) => {
    let prev = [ ...data ];
    prev[unitIndex].activities = activities;
    setData(prev);
  };

  


  return(
    <div className="form-input-audiences">
      <p>Some introductory explanation ....</p>
      {console.log("dataMAP---------------",data)}
      {data.map((unit, unitIndex) => (
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
                onClick={event => {
                  setData(prev => {
                    prev[unitIndex].editing = false;
                    prev[unitIndex].title = controlEdit.tempValue;
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
                id={"unit_" + unitIndex + "btnCancelEdit"}
                edge="end"
                aria-label={"Cancel changes"}
                onClick={event => {
                  setData(prev => {
                    prev[unitIndex].editing = false;

                    setControlEdit({
                      tempValue: "",
                      adding: false,
                      editing: false
                    });
                    return { ...prev };
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
              id={"unit_" + unitIndex + "btnEdit"}
              onClick={() => {
                setData(prev => {
                  prev.unit[unitIndex].editing = true;
                  setControlEdit({
                    tempValue: prev.unit[unitIndex].title,
                    adding: false,
                    editing: true
                  });
                  return { ...prev };
                });
              }}
              disabled={controlEdit.editing}
              variant="outlined"
              color="secondary"
              startIcon={<EditIcon />}
            >
              Edit unit name
            </Button>

            <Button
              id={"unit_" + unitIndex + "btnDelete"}
              onClick={() => {
                if (window.confirm("delete " + unit.title + "?")) {
                  let prev = [ ...data ];

                  if (unitIndex === 0) prev.unit = [...prev.unit.slice(1)];
                  else if (unitIndex === prev.unit.length - 1)
                    prev.unit = [...prev.unit.slice(0, unitIndex)];
                  else
                    prev.unit = [
                      ...prev.unit.slice(0, unitIndex),
                      ...prev.unit.slice(unitIndex + 1)
                    ];

                  setData({ ...prev });
                }
              }}
              disabled={controlEdit.deleteButton}
              variant="outlined"
              color="secondary"
              startIcon={<RemoveIcon />}
            >
              Delete unit
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
            <DesignCourseCommons
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
            />
            {console.log("organization",organization)}
            {organization === "unit" && (
              <LessonDesign
                unit={unit}
                unitIndex={unitIndex}
                lessons={unit.lessons}
                template={template}
                organization={organization}
              />
            )}
            {console.log("organizationdos",organization)}
            {organization !== "unit" && (
              <ActivityDesign
                courseInformation={courseinformation.design}
                activities={unit.activities}
                handleActivities={handleActivities}
                parentIndex={unitIndex}
                template={template}
              />
            )}
           
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => {
          let unit = {
            key: "topic" + data.length,
            title: organization === "unit" ? "Unit 01" : "Topic 01",
            learnGols: "",
            preKnowledge: "",
            mainContent: "",
            evaluation:'',
            tools: [//este nivale cuando sleccionas todos menos without template by unit
              { checked: false, key: "audio", label: "Audios" },
              { checked: false, key: "games", label: "Games", items: [] },
              { checked: false, key: "images", label: "Images" },
              { checked: false, key: "presentation", label: "Presentation", items: []},
              { checked: false, key: "supplemantary",label: "Supplementary Text", items: []},
              { checked: false, key: "videos", label: "Videos" }
            ],
            activities: [],
            lessons: [],
            editing: true
          };

          let prev = [ ...data ];
          prev.push(unit);
          console.log("prevState111111111111111111111111", prev)
          setData(prev);
          let courseInfo=courseinformation;
          courseInfo.design=prev;
          setcourseInformation(courseInfo);
          setControlEdit({
            tempValue: "",
            adding: true,
            editing: true
          });
          
        }}
      >
        Add {organization === "unit" ? "unit" : "topic"}
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
    </div>
  );
}
