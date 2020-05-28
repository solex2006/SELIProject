import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FeedbackHelp from "./feedback";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
      // width: "100ch"
    }
  },
  hidden: {
    display: "none"
  },
  formGroup: {
    marginTop: theme.spacing(2)
  },
  listBullet: {
    listStyleType: "disc",
    display: "list-item"
  },
  listItem: {
    flex: "0.2",
    minWidth: "100px"
  },
  addButton: {
    color: theme.palette.secondary.main
  },
  deleteButton: {
    "&:hover": {
      backgroundColor: "#d91e1822"
      //color: "#d91e18"
    }
  },
  saveButton: {
    "& $saveButton:hover": {
      backgroundColor: "#00897b22"
      //color: "#d91e18"
    }
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  }
}));

export default function AnalysisStep(props) {
  const {courseInformation } = props;

  useEffect(()=>{
    console.log("courseInformationAnalysisStep", courseInformation )
  },[])

  const [courseinformation, setcourseinformation]=useState(courseInformation)
  const classes = useStyles();
  const [data, setData] = useState({
    courseTitle: "Computer Science 101",
    courseSubTitle: "Programming with a Purpose",
    learningGoals: [],
    audience: ["Graduatade students", "Teachers and Professors"],
    inclusion: ["elderly"],
    constraints: ["Calcule I", "Math"]
  });
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    tempAuxValue: "",
    adding: false,
    editing: false
  });

  const [constraints, setConstraints] = useState([
    {
      label: "Math 101",
      editing: false
    }
  ]);

  const [goals, setGoals] = useState({
    knowledges: [],
    skills: [],
    attitudes: []
  });

  const [goalsTaxonomy, setGoalsTaxonomy] = useState({
    knowledges: [
      { key: "calculate", label: "to calculate" },
      { key: "analyse", label: "to analyse" }
    ],
    skills: [],
    attitudes: []
  });

  const [outcomes, setOutcomes] = useState({
    contents: [],
    skills: [],
    values: []
  });

  const [labels, setlables]=useState({
    completeObjective:'Complete the objective',
    analysisphase:'The analysis phase consists of understanding the educational problem,covering the survey of educational needs, the characterization of students and the verification of constraints.',
    knowledgeObjectives: "KnowledgeObjectives are the intended learning aims or goals of the Learning Element identified and grouped in terms of the primary focus of each aim or goal – so the teacher is prompted to identify Experiential, Conceptual, Analytical and Applied objectives",
    skillsobjectives: 'Refers to a wide range of cognitive (mental), physical and emotional skills including science processes, critical thinking, problem solving, decision making, communication, research, mathematical, psychomotor and interpersonal relations.',
    attitudesobjectives:'Refers to feelings, beliefs, dispositions, opinions, and values.',
  })

  const handleNewConstraint = () => {
    setConstraints([
      ...constraints,
      { label: "New constraint", editing: true }
    ]);
    setControlEdit({
      tempValue: "To create",
      adding: true,
      editing: true
    });
  };
  const handleNewLearning = category => {
    console.log(category);
    if (category === "knowledges") {
      setGoals({
        knowledges: [
          ...goals.knowledges,
          { label: "New Learning", aux: "analyse", editing: true }
        ],
        skills: [...goals.skills],
        attitudes: [...goals.attitudes]
      });
    }
    if (category === "skills") {
      // console.log({
      //   knowledges: [...goals.knowledges],
      //   skills: [
      //     ...goals.skills,
      //     { label: "New Learning", aux: "analyse", editing: true }
      //   ],
      //   attitudes: [...goals.attitudes]
      // });
      setGoals({
        knowledges: [...goals.knowledges],
        skills: [
          ...goals.skills,
          { label: "New Learning", aux: "analyse", editing: true }
        ],
        attitudes: [...goals.attitudes]
      });
    }
    if (category === "attitudes") {
      setGoals({
        knowledges: [...goals.knowledges],
        skills: [...goals.skills],
        attitudes: [
          ...goals.attitudes,
          { label: "New Learning", aux: "analyse", editing: true }
        ]
      });
    }
    setControlEdit({
      tempValue: "",
      tempAuxValue: "analyse",
      adding: true,
      editing: true
    });
  };

  const handleCancelEditLearning = (index, category) => {
    if (controlEdit.adding) deleteLearning(index, category);
    else {
      if (category === "knowledges") {
        let atts = goals.knowledges;
        atts[index].editing = false;
        let newGoals = goals;
        newGoals.knowledges = atts;
        setGoals(newGoals);
      }
      if (category === "skills") {
        let atts = goals.skills;
        atts[index].editing = false;
        let newGoals = goals;
        newGoals.skills = atts;
        setGoals(newGoals);
      }
      if (category === "attitudes") {
        let atts = goals.attitudes;
        atts[index].editing = false;
        let newGoals = goals;
        newGoals.attitudes = atts;
        setGoals(newGoals);
      }
    }
    setControlEdit({
      tempValue: "",
      tempAuxValue: "",
      adding: false,
      editing: false
    });
  };

  function deleteLearning(index, category) {
    console.log(goals);

    if (category === "knowledges") {
      let atts = goals.knowledges;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.knowledges.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.knowledges = atts;
      setGoals(newGoals);
    }
    if (category === "skills") {
      let atts = goals.skills;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.skills.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.skills = atts;
      setGoals(newGoals);
    }
    if (category === "attitudes") {
      let atts = goals.attitudes;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.attitudes.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.attitudes = atts;
      setGoals(newGoals);
    }

    // setData(prev => {
    //   prev.constraints = newRequisites.map(req => req.label);
    //   return prev;
    // });
  }

  const handleEditedLearning = (index, category) => {
    if (category === "knowledges") {
      let atts = goals.knowledges;
      atts[index].editing = false;
      atts[index].label = controlEdit.tempValue;
      atts[index].aux =
        goalsTaxonomy.knowledges.find(
          item => item.key === controlEdit.tempAuxValue
        ).label + " ";
      let newGoals = goals;
      newGoals.knowledges = atts;
      setGoals(newGoals);
    }
    if (category === "skills") {
      let atts = goals.skills;
      atts[index].editing = false;
      let newGoals = goals;
      atts[index].label = controlEdit.tempValue;
      atts[index].aux =
        goalsTaxonomy.skills.find(item => item.key === controlEdit.tempAuxValue)
          .label + " ";
      newGoals.skills = atts;
      setGoals(newGoals);
    }
    if (category === "attitudes") {
      let atts = goals.attitudes;
      atts[index].editing = false;
      let newGoals = goals;
      atts[index].label = controlEdit.tempValue;
      atts[index].aux =
        goalsTaxonomy.attitudes.find(
          item => item.key === controlEdit.tempAuxValue
        ).label + " ";
      newGoals.attitudes = atts;
      setGoals(newGoals);
    }

    // setData(prev => {
    //   prev.constraints = newRequisites.map(req => req.label);
    //   return prev;
    // });
    setControlEdit({
      tempValue: "",
      tempAuxValue: "",
      adding: false,
      editing: false
    });
  };

  const handleEditLearning = (index, category) => {
    if (category === "knowledges") {
      let atts = goals.knowledges;
      atts[index].editing = true;
      let newGoals = goals;
      newGoals.knowledges = atts;
      setGoals(newGoals);
      setControlEdit({
        tempValue: atts[index].label,
        tempAuxValue: atts[index].aux,
        adding: false,
        editing: true
      });
    }
    if (category === "skills") {
      let atts = goals.skills;
      atts[index].editing = true;
      let newGoals = goals;
      newGoals.skills = atts;
      setGoals(newGoals);
      setControlEdit({
        tempValue: atts[index].label,
        tempAuxValue: atts[index].aux,
        adding: false,
        editing: true
      });
    }
    if (category === "attitudes") {
      let atts = goals.attitudes;
      atts[index].editing = true;
      let newGoals = goals;
      newGoals.attitudes = atts;
      setGoals(newGoals);
      setControlEdit({
        tempValue: atts[index].label,
        tempAuxValue: atts[index].aux,
        adding: false,
        editing: true
      });
    }
  };

  const handleDeleteLearning = (index, category) => {
    if (window.confirm("delete objective ?")) {
      deleteLearning(index, category);
    }
  };

  const handleNewOutcomes = category => {
    if (category === "contents")
      setOutcomes({
        contents: [
          ...outcomes.contents,
          { label: "New outcomes", editing: true }
        ],
        skills: [...outcomes.skills],
        attitudes: [...outcomes.values]
      });
    if (category === "skills")
      setOutcomes({
        contents: [...outcomes.contents],
        skills: [...outcomes.skills, { label: "New outcomes", editing: true }],
        attitudes: [...outcomes.values]
      });
    if (category === "values")
      setOutcomes({
        contents: [...outcomes.contents],
        skills: [...outcomes.skills],
        values: [...outcomes.values, { label: "New outcomes", editing: true }]
      });
    setControlEdit({
      tempValue: "The student will be able to ",
      adding: true,
      editing: true
    });
  };

  const handleDeleteRequisite = index => () => {
    if (
      window.confirm("delete constraints " + constraints[index].label + "?")
    ) {
      deleteRequisite(index);
    }
  };

  const handleEditRequisite = unit => () => {
    let newUnits = [...constraints];
    newUnits[unit].editing = true;
    setConstraints(newUnits);
    setControlEdit({
      tempValue: newUnits[unit].label,
      adding: false,
      editing: true
    });
  };

  const handleEditedRequisite = index => () => {
    let newRequisites = [...constraints];
    newRequisites[index].editing = false;
    newRequisites[index].label = controlEdit.tempValue;
    setConstraints(newRequisites);
    setData(prev => {
      prev.constraints = newRequisites.map(req => req.label);
      return prev;
    });
    setControlEdit({ tempValue: "", adding: false, editing: false });
  };

  const handleCancelEditRequisite = index => () => {
    if (controlEdit.adding) deleteRequisite(index);
    else {
      let newUnits = [...constraints];
      newUnits[index].editing = false;
      setConstraints(newUnits);
    }
    setControlEdit({ tempValue: "", adding: false, editing: false });
  };

  function deleteRequisite(index) {
    let newRequisites = [...constraints];
    if (index === 0) newRequisites = [...newRequisites.slice(1)];
    else if (index === constraints.length - 1)
      newRequisites = [...newRequisites.slice(0, index)];
    else
      newRequisites = [
        ...newRequisites.slice(0, index),
        ...newRequisites.slice(index + 1)
      ];
    setConstraints(newRequisites);
    setData(prev => {
      prev.constraints = newRequisites.map(req => req.label);
      return prev;
    });
  }

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }

  function updateTempAuxValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempAuxValue: value };
    });
  }


  return (
    <div className="form-input-audiences">
      {/* <SimulateButtons
        handleComplete={handleComplete}
        handleSkip={handleSkip}
        completed={completed}
        skiped={skiped}
      /> */}
     <h2>Analysis Phase</h2>
      {/* <Typography variant="h6" className={classes.title}>Analysis Phase</Typography> */}
      <p>
        {labels.analysisphase}
      </p>
      <details>
        <summary>Course summary</summary>
        <Grid container className={classes.formGroup}>
          <Grid item xs={12}>
            <Grid item className="MuiFormLabel-root">
              Course Title
            </Grid>
            <Grid item>{courseinformation.title}</Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item className="MuiFormLabel-root">
              Course Subtitle
            </Grid>
            <Grid item>{courseinformation.subtitle}</Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item className="MuiFormLabel-root">
              Intended Audience
            </Grid>
            <Grid item xs={12}>
              <ul key={"liAud"} className={classes.listBullet}>
                {courseinformation.support[0].map((audience, index) => (
                  audience.isChecked==true?
                    <li id={`listAud-label-${index}`}> {audience.label} </li>
                    :
                    undefined
                ))}
                {courseinformation.support[2].map((audience, index) => (
                    <li id={`listAud-label-${index}`}> {audience.label} </li>
                ))}

              </ul>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item className="MuiFormLabel-root">
              Intended Inclusion
            </Grid>
            <Grid item xs={12}>
              <ul key={"liIncl"} className={classes.listBullet}>
                {courseinformation.support[1].map((audience, index) => (
                  audience.isChecked==true?
                    <li id={`listAud-label-${index}`}> {audience.label} </li>
                    :
                    undefined
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </details>



      <Grid container className={classes.formGroup}>
        <Grid item xs={12}>
          <Grid item className="MuiFormLabel-root">
            <Typography variant="h6" className={classes.title}>Learning Objectives</Typography>
          </Grid>
          <Grid item>
            <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Add a Learning Objectives that show what the students will know and why they are doing it on three areas of learning: knowledge, skills and attitudes."
              describedBy={"i05-helper-text"}
            />
            <br/>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Grid item className="MuiFormLabel-root">
            <label>Knowledge objectives</label>
          </Grid>
          <Grid item>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {goals.knowledges.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />
                      <Paper className={!goal.editing ? classes.hidden : ""}>
                        <TextField
                          id="standard-select-currency"
                          select
                          SelectProps={{
                            native: true
                          }}
                          // variant="outlined"
                          value={controlEdit.tempAuxValue}
                          onChange={event =>
                            updateTempAuxValue(event.target.value)
                          }
                          className={classes.input}
                        >
                          {goalsTaxonomy.knowledges.map(option => (
                            <option key={option.key} value={option.key}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                        <TextField
                          key={"u2" + index + "txtField"}
                          value={controlEdit.tempValue}
                          onChange={event => updateTempValue(event.target.value)}
                        />
                        <FeedbackHelp
                          validation={{
                            error: true,
                            errorMsg: "message",
                            errorType: "required",
                            a11y: null
                          }}
                          tipMsg={labels.completeObjective}
                          describedBy={"i02-helper-text"}
                        />
                      </Paper>


                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            onClick={() =>
                              handleEditedLearning(index, "knowledges")
                            }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            onClick={() =>
                              handleCancelEditLearning(index, "knowledges")
                            }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            onClick={() =>
                              handleEditLearning(index, "knowledges")
                            }
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            onClick={() =>
                              handleDeleteLearning(index, "knowledges")
                            }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  onClick={() => handleNewLearning("knowledges")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg={labels.knowledgeObjectives}
              describedBy={"i05-helper-text"}
            />
            <br/>
            </form>
          </Grid>
        </Grid>









        <Grid item xs={12}>
          <Grid item xs={12} className="MuiFormLabel-root">
            <label>Skills objectives</label>
          </Grid>
          <Grid item xs={12}>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {goals.skills.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />

                    <Paper className={!goal.editing ? classes.hidden : ""}>
                      <TextField
                        id="standard-select-currency"
                        select
                        SelectProps={{
                          native: true
                        }}
                        // variant="outlined"
                        value={controlEdit.tempAuxValue}
                        onChange={event =>
                          updateTempAuxValue(event.target.value)
                        }
                        className={classes.input}
                      >
                        {goalsTaxonomy.knowledges.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        key={"u2" + index + "txtField"}
                        value={controlEdit.tempValue}
                        onChange={event => updateTempValue(event.target.value)}
                      />
                    </Paper>
                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            onClick={() =>
                              handleEditedLearning(index, "skills")
                            }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            onClick={() =>
                              handleCancelEditLearning(index, "skills")
                            }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            onClick={() => handleEditLearning(index, "skills")}
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            onClick={() =>
                              handleDeleteLearning(index, "skills")
                            }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  onClick={() => handleNewLearning("skills")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Skills objectives are ...."
              describedBy={"i05-helper-text"}
            />
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className="MuiFormLabel-root">
            <label>Attitudes objectives</label>
          </Grid>
          <Grid item xs={12}>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {goals.attitudes.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />

                    <Paper className={!goal.editing ? classes.hidden : ""}>
                      <TextField
                        id="standard-select-currency"
                        select
                        SelectProps={{
                          native: true
                        }}
                        // variant="outlined"
                        value={controlEdit.tempAuxValue}
                        onChange={event =>
                          updateTempAuxValue(event.target.value)
                        }
                        className={classes.input}
                      >
                        {goalsTaxonomy.knowledges.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        key={"u2" + index + "txtField"}
                        value={controlEdit.tempValue}
                        onChange={event => updateTempValue(event.target.value)}
                      />
                    </Paper>
                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            onClick={() =>
                              handleEditedLearning(index, "attitudes")
                            }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            onClick={() =>
                              handleCancelEditLearning(index, "attitudes")
                            }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            onClick={() =>
                              handleEditLearning(index, "attitudes")
                            }
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            onClick={() =>
                              handleDeleteLearning(index, "attitudes")
                            }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  onClick={() => handleNewLearning("attitudes")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Attitudes objectives are ...."
              describedBy={"i05-helper-text"}
            />
            </form>
          </Grid>
        </Grid>
      </Grid>
     
     
     
     
     
     
     
     
      <Grid container className={classes.formGroup}>
        <Grid item xs={12}>
          <Grid item className="MuiFormLabel-root">
           {/*  <label>Behavioral Outcomes</label> */}
            <Typography variant="h6" className={classes.title}>Behavioral Outcomes</Typography>
          </Grid>
          <Grid item>
            <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Add behavioral outcomes that shows what the student needs to know or be able to do like abilities that combine content, skills and values."
              describedBy={"i05-helper-text"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item className="MuiFormLabel-root">
            <label>Contents outcomes</label>
          </Grid>
          <Grid item>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {outcomes.contents.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />

                    <Paper className={!goal.editing ? classes.hidden : ""}>
                      <TextField
                        id="standard-select-currency"
                        select
                        SelectProps={{
                          native: true
                        }}
                        // variant="outlined"
                        // value={controlEdit.tempAuxValue}
                        // onChange={event =>
                        //   updateTempAuxValue(event.target.value)
                        // }
                        className={classes.input}
                      >
                        {goalsTaxonomy.knowledges.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        key={"u2" + index + "txtField"}
                        // value={controlEdit.tempValue}
                        // onChange={event => updateTempValue(event.target.value)}
                      />
                    </Paper>
                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            // onClick={() =>
                            //   handleEditedLearning(index, "knowledges")
                            // }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            // onClick={() =>
                            //   handleCancelEditLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            // onClick={() =>
                            //   handleEditLearning(index, "knowledges")
                            // }
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            // onClick={() =>
                            //   handleDeleteLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  // onClick={() => handleNewLearning("knowledges")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Contents outcomes are ...."
              describedBy={"i05-helper-text"}
            />
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className="MuiFormLabel-root">
            <label>Skills outcomes</label>
          </Grid>
          <Grid item xs={12}>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {outcomes.skills.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />

                    <Paper className={!goal.editing ? classes.hidden : ""}>
                      <TextField
                        id="standard-select-currency"
                        select
                        SelectProps={{
                          native: true
                        }}
                        // variant="outlined"
                        // value={controlEdit.tempAuxValue}
                        // onChange={event =>
                        //   updateTempAuxValue(event.target.value)
                        // }
                        className={classes.input}
                      >
                        {goalsTaxonomy.knowledges.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        key={"u2" + index + "txtField"}
                        // value={controlEdit.tempValue}
                        // onChange={event => updateTempValue(event.target.value)}
                      />
                    </Paper>
                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            // onClick={() =>
                            //   handleEditedLearning(index, "knowledges")
                            // }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            // onClick={() =>
                            //   handleCancelEditLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            // onClick={() =>
                            //   handleEditLearning(index, "knowledges")
                            // }
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            // onClick={() =>
                            //   handleDeleteLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  // onClick={() => handleNewLearning("knowledges")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Skills outcomes are ...."
              describedBy={"i05-helper-text"}
            />
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className="MuiFormLabel-root">
            <label>Values outcomes</label>
          </Grid>
          <Grid item xs={12}>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {outcomes.values.map((goal, index) => (
                  <ListItem
                    button={!goal.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={goal.aux + goal.label}
                      className={goal.editing ? classes.hidden : ""}
                    />

                    <Paper className={!goal.editing ? classes.hidden : ""}>
                      <TextField
                        id="standard-select-currency"
                        select
                        SelectProps={{
                          native: true
                        }}
                        // variant="outlined"
                        // value={controlEdit.tempAuxValue}
                        // onChange={event =>
                        //   updateTempAuxValue(event.target.value)
                        // }
                        className={classes.input}
                      >
                        {goalsTaxonomy.knowledges.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        key={"u2" + index + "txtField"}
                        // value={controlEdit.tempValue}
                        // onChange={event => updateTempValue(event.target.value)}
                      />
                    </Paper>
                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {goal.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            // onClick={() =>
                            //   handleEditedLearning(index, "knowledges")
                            // }
                            className={classes.saveButton}
                            disabled={controlEdit.tempValue === ""}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            // onClick={() =>
                            //   handleCancelEditLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            // onClick={() =>
                            //   handleEditLearning(index, "knowledges")
                            // }
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            // onClick={() =>
                            //   handleDeleteLearning(index, "knowledges")
                            // }
                            className={classes.deleteButton}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem
                  key="addrequisite"
                  button
                  // onClick={() => handleNewLearning("knowledges")}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary="Add" />
                </ListItem>
              </List>
              <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Values outcomes are ...."
              describedBy={"i05-helper-text"}
            />
            </form>
          </Grid>
        </Grid>
      </Grid>
     
     
     
     
     
     

     
      <Grid container className={classes.formGroup}>
        <Grid item xs={12} className="MuiFormLabel-root">
          {/* <label>Learning constraint</label> */}
          <Typography variant="h6" className={classes.title}>Learning constraint</Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <List component="ul" key={"li0"} id="li0">
              {constraints.map((constraint, index) => (
                <ListItem
                  button={!constraint.editing}
                  component="li"
                  key={"li" + index}
                  className={classes.listItem}
                >
                  <ListItemText
                    key={"u2" + index + "listeItemTxt"}
                    primary={constraint.label}
                    className={constraint.editing ? classes.hidden : ""}
                  />
                  <TextField
                    key={"u2" + index + "txtField"}
                    className={!constraint.editing ? classes.hidden : ""}
                    value={controlEdit.tempValue}
                    onChange={event => updateTempValue(event.target.value)}
                  />
                  <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                    {constraint.editing ? (
                      <React.Fragment>
                        <IconButton
                          key={"u2" + index + "btnEditSaveUnit"}
                          edge="end"
                          aria-label={"Save changes"}
                          onClick={handleEditedRequisite(index)}
                          className={classes.saveButton}
                          disabled={controlEdit.tempValue === ""}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          key={"u2" + index + "btnEditCancelUnit"}
                          edge="end"
                          aria-label={"Cancel changes"}
                          onClick={handleCancelEditRequisite(index)}
                          className={classes.deleteButton}
                        >
                          <ClearIcon />
                        </IconButton>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <IconButton
                          key={"u2" + index + "btnEditUnit"}
                          edge="end"
                          aria-label={"Edit unit name"}
                          onClick={handleEditRequisite(index)}
                          disabled={controlEdit.editing}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          key={"u2" + index + "btnDeleteUnit"}
                          edge="end"
                          // aria-label={"Delete constraint " + constraint.label}
                          onClick={handleDeleteRequisite(index)}
                          className={classes.deleteButton}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </React.Fragment>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <ListItem
                key="addrequisite"
                button
                onClick={handleNewConstraint}
                id="addrequisite"
                disabled={controlEdit.editing}
                className={classes.addButton}
              >
                <AddIcon /> <ListItemText primary="Add constraint" />
              </ListItem>
            </List>
          </form>
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "",
              a11y: null
            }}
            tipMsg="Instructions"
            describedBy={"learnConstraint-helper-text"}
          />
        </Grid>
      </Grid>
     
     
     
     
     
     
     
     
      <Grid container className={classes.formGroup}>
        <Grid item xs={12}  className="MuiFormLabel-root">
        <Typography variant="h6" className={classes.title}>Modality</Typography>
          <form className={classes.root}>
            <FormLabel component="legend">
              How the content will be delivered
            </FormLabel>
            <RadioGroup
              aria-label="Course delivery"
              name="coursePlan"
              // value={coursePlan}
              // onChange={event => {
              //   setCoursePlan(event.target.value);
              //   handleAddie(event.target.value !== "free");
              // }}
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online"
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label="Hybrid"
              />
            </RadioGroup>
            <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Select beteween online course or blend online and face-to-face course."
              describedBy={"modality-helper-text"}
            />
          </form>
        </Grid>
      </Grid>



      <Grid container className={classes.formGroup}>
        <Grid item xs={12}  className="MuiFormLabel-root">
        <Typography variant="h6" className={classes.title }>Pedagogical considerations</Typography>
        <form className={classes.root}>
          <TextField
            required
            label="Pedagogical Considerations"
            multiline
            rowsMax={5}
            variant="outlined"
            fullWidth
          />
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "",
              a11y: null
            }}
            tipMsg="Select beteween online course or blend online and face-to-face course."
            describedBy={"modality-helper-text"}
          />
        </form>
      </Grid>
      </Grid>
    </div>
  );
}

