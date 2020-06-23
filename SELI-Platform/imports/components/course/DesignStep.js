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
  const {courseInformation,language } = props;

  const classes = useStyles();
  const [template, setTemplate] = useState(props.courseInformation.coursePlan.courseTemplate);
  const [organization, setOrganization] =  useState(props.courseInformation.coursePlan.courseStructure);
  const [courseinformation, setcourseInformation] = useState(courseInformation)
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
      }
    ]
  );

  useEffect(() => {
    if (courseInformation.design.length !=0 ) {
      //console.log("CourseInformation-Ddesogn update", props.courseInformation) 
      setData(courseInformation.design)
    } else {
      let courseInfo = courseinformation;
      courseInfo.design = data;
      courseInfo.program.push({name: data[0].title, items: []});
      setcourseInformation(courseInfo);
    }
    console.log(courseInformation)
  }, []); 

  useEffect(() => {
    //console.log("CourseInformation-DesignStep", props.courseInformation) 
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
    console.log("checkboxes", unitIndex, resourceIndex)
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
    console.log("prevlesson-----------------------------------",prev)
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

  const handleSelectResourcesActivities = (unitIndex, resourceIndex, lessonIndex) => {
    //console.log("Las lecciones a guardar en la unidad", unitIndex, resourceIndex,lessonIndex)
    let prev = [ ...data ];
    prev[unitIndex].lessons[lessonIndex].activities = resourceIndex;
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
    let unit = {
      key: "topic" + data.length,
      title: organization === "unit" ? language.unit01 : language.topic01,
      learnGols: "",
      preKnowledge: "",
      mainContent: "",
      evaluation:'',
      tools: [//este nivale cuando sleccionas todos menos without template by unit
        { checked: false, key: "audio", label: language.Audios },
        { checked: false, key: "games", label: language.Games, items: [] },
        { checked: false, key: "images", label: language.Images },
        { checked: false, key: "presentation", label: language.Presentation, items: []},
        { checked: false, key: "supplemantary",label: language.SupplementaryText, items: []},
        { checked: false, key: "videos", label: language.Videos }
      ],
      activities: [],
      lessons: [],
      editing: true
    };
    let prev = [ ...data ];
    prev.push(unit);
    setData(prev);
    let courseInfo=courseinformation;
    courseInfo.design=prev;
    courseInfo.program.push({name: prev[prev.length - 1].title, items: []});
    setcourseInformation(courseInfo);
    console.log(courseInformation)
    setControlEdit({
      tempValue: "",
      adding: true,
      editing: true
    });
  }

  const deleteUnitTopic = (unitIndex) => {
    if (window.confirm("Delete " + unit.title + "?")) {
      let prev = [ ...data ];
      if (unitIndex === 0) {
        newPrev=prev.slice(1)
        setData(newPrev);
        console.log("if",data, newPrev)
      }
      else if (unitIndex === prev.length - 1){
        newPrev=prev.slice(0, unitIndex);
        setData(newPrev);
        console.log("else id",data, newPrev)
      }
      else{
        newPrev = [
          ...prev.slice(0, unitIndex),
          ...prev.slice(unitIndex + 1)
        ];  
        setData(newPrev);
        console.log("else",data, newPrev)
      }
      setData(newPrev);
      //console.log("nueva data",data, newPrev)
      let courseInfo=courseinformation;
      courseInfo.design=newPrev;
      setcourseInformation(courseInfo) 
    }
  }

  const editUnitTopicName = (unitIndex) => {
    setData(prev => {
      prev[unitIndex].editing = true;
      setControlEdit({
        tempValue: prev[unitIndex].title,
        adding: false,
        editing: true
      });
      return [ ...prev ];
    });
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo)  
  }

  const saveEdit = (unitIndex) => {
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
    let courseInfo=courseinformation;
    courseInfo.design=data;
    setcourseInformation(courseInfo)
  }

  const cancelEdit = (unitIndex) => {
    setData(prev => {
      prev[unitIndex].editing = false;
      setControlEdit({
        tempValue: "",
        adding: false,
        editing: false
      });
      return [ ...prev ];
    });
  }

  //Program Step methods ---------------------------------------------------------------

  const addUnit = (type) => {
    let languageTypeAdded = "";
    if (type === 'Unit'){ languageTypeAdded = this.props.language.unitName }
    if (type === 'Topic'){ languageTypeAdded = this.props.language.topicName }
    if (this.props.dialog) {
      this.setState({
        action: "addUnit",
        languageType: languageTypeAdded,
      }, () => {
        this.handleClickOpen();
        document.getElementById('unit-input').value = "";
        document.getElementById('unit-input').focus();
      });
    }
  }

  const addSubunit = (index) => {
    if (this.props.dialog) {
      this.setState({
        action: "addSubunit",
        selectedUnit: index,
      }, () => {
        this.handleClickOpen();
        document.getElementById('subunit-input').value = "";
        document.getElementById('subunit-input').focus();
      });
    }
  }

  const unitController = () => {
    if (this.state.action === "addUnit" ) {
      this.finishAddUnit();
    }
    if (this.state.action === "addSubunit" ) {
      this.finishAddSubunit();
    }
    if (this.state.action === "editUnit" ) {
      this.finishEditUnit();
    }
    if (this.state.action === "editSubunit" ) {
      this.finishEditSubunit();
    }
    this.handleClose();
  }

  const finishAddUnit = () => {
    let name = this.state.nameLabels.nameUnit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      let addedUnit = program.push({name: name, lessons: []});
      program[addedUnit-1].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
      document.getElementById('subunit-input').value = "";
    }
    else if (this.props.organization.unit === "Topic") {
      program.push({name: name, items: []});
    }
    else if (this.props.organization.unit === "Season") {
      program.push({name: name, items: []});
    }
    document.getElementById('unit-input').value = "";
  }

  const finishAddSubunit = () => {
    let name = this.state.nameLabels.nameSubunit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      program[this.state.selectedUnit].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
    }
    document.getElementById('subunit-input').value = "";
  }

  const finishEditUnit = () => {
    let name = this.state.nameLabels.nameUnit;
    let program = this.props.program;
    program[this.state.unitToEdit].name = name;
    this.setState({
      edited: true,
    }, () => {
      this.props.reRender();
    })
  }

  const finishEditSubunit = () => {
    let name = this.state.nameLabels.nameSubunit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      program[this.state.unitToEdit].lessons[this.state.subunitToEdit].name = name;
    }
    this.setState({
      edited: true,
    }, () => {
      this.props.reRender();
    })
  }

  const deletUnit = (index) => {
    let program = this.state.program;
    let selected = this.state.selected;
    if (program.length - 1 >= 1) {
      program.splice(index, 1);
      if (this.props.selected[0] === index && this.props.organization.subunit) {
        this.selectSubunit(program[index].lessons[0]._id);
      }
    }
    else {
      console.log("At least one unit with one lesson");
    }
    this.setState({
      deleted: true,
    }, () => {
      this.props.reRender();
    });
  }

  const deletSubunit = (_id) => {
    let program = this.state.program;
    let selected = this.state.selected;
    let unitIndex;
    let subunitIndex;
    for (var i = 0; i < program.length; i++) {
      for (var j = 0; j < program[i].lessons.length; j++) {
        if (program[i].lessons[j]._id === _id) {
          if (program[i].lessons.length - 1 >= 1) {
            program[i].lessons.splice(j, 1);
            if (this.props.selected[0] === i && this.props.selected[1] === j) {
              this.selectSubunit(program[i].lessons[j]._id);
            }
          }
          else {
            console.log("At least one lesson");
          }
          break;
        }
      }
    }
    this.setState({
      deleted: true,
    });
  }

  const editUnit = (index, type) => {
    let program = this.state.program;
    let languageTypeAdded = "";
    if (type === 'Unit'){ languageTypeAdded = this.props.language.unitName }
    if (type === 'Topic'){ languageTypeAdded = this.props.language.topicName }
    this.setState({
      unitToEdit: index,
      action: "editUnit",
      languageType: languageTypeAdded,
    }, () => {
      this.handleClickOpen();
      document.getElementById('unit-input').value = this.props.program[this.state.unitToEdit].name;
      document.getElementById('unit-input').focus();
    });
  }

  const editSubunit = (_id) => {
    let program = this.state.program;
    for (var i = 0; i < program.length; i++) {
      for (var j = 0; j < program[i].lessons.length; j++) {
        if (program[i].lessons[j]._id === _id) {
          this.setState({
            unitToEdit: i,
            subunitToEdit: j,
            action: "editSubunit",
          }, () => {
            this.handleClickOpen();
            document.getElementById('subunit-input').value = this.props.program[this.state.unitToEdit].lessons[this.state.subunitToEdit].name;
            document.getElementById('subunit-input').focus();
          });
        }
      }
    }
  }

  const checkOrganizationStructure = () => {
    if (this.props.organization.subunit) {
      let program = this.props.program;
      for (var i = 0; i < program.length; i++) {
        if (program[i].lessons.length === 0) {
          program.splice(i, 1);
        }
      }
    }
    this.setState({
      checked: true,
    });
  }

  return(
    <div className="form-input-audiences">
      <p>Some introductory explanation ....</p><br/>
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
              onClick={() => deleteUnitTopic(unitIndex)}
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
            <DesignCourseCommons
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
            />
            
            {(organization === "unit") && (
              <LessonDesign
                language={language}
                handleSelectResourcesActivities={handleSelectResourcesActivities}
                handleSelectResourcesLessons={handleSelectResourcesLessons}
                handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                tools={unit.tools}
                key={unit.key}
                courseInformation={courseinformation.design}
                unit={unit}
                unitIndex={unitIndex}
                lessons={unit.lessons}
                template={template}
                organization={organization}
              />
            )}
            {organization !== "unit" && (
              <ActivityDesign
                language={language}
                courseInformation={courseinformation.design}
                activities={unit.activities}
                handleActivities={handleActivities}
                handleToolActivity={handleToolActivity}
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
    </div>
  );
}
