import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import Paper from "@material-ui/core/Paper";

//import SimulateButtons from "./simulate";
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
    maxWidth: 360,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#e0e0e0!important"
  }
}));

export default function AudienceApp(props) {
  const { handleComplete, handleSkip, completed, skiped, courseInformation } = props;
  const classes = useStyles();
  //update state of checkboxes
  useEffect(() => {
    console.log("comppnentDidMount", courseInformation, audiences)
    if(courseInformation.support.length!=0){
      setAudiences(courseInformation.support[0])
      setAudiencesGol(courseInformation.support[1])

      if(courseInformation.support[2]===undefined){
        setOtherAudiences([])
      }else{
        setOtherAudiences(courseInformation.support[2])
      }
    }
 
  }, []); 

  //course information
  const [courseinformation, setcourseInformation]= useState(courseInformation)
  const [audiences, setAudiences] = useState([
    {
      id: 0,
      value: "StudentsGrad",
      label: "Graduate students",
      isChecked: false
    },
    {
      id: 1,
      value: "StudentsInfor",
      label: "Informal students",
      isChecked: false
    },
    {
      id: 2,
      value: "Teachers",
      label: "Teachers and Professors",
      isChecked: false
    },
    { id: 3, value: "Kids", label: "Preschool kids", isChecked: false }
  ]);
  const [audiencesGol,setAudiencesGol]=useState([
    
    {
      id: 0,
      value: "cog",
      label: "Cognitive",
      isChecked: false
    },
    {
      id: 1,
      value: "Eld",
      label: "Elderly",
      isChecked: false
    },
    {
      id: 2,
      value: "Hear",
      label: "Hearing",
      isChecked: false
    },
    {
      id: 3,
      value: "Lan",
      label: "Language",
      isChecked: false
    },
    {
      id: 4,
      value: "Spee",
      label: "Speech",
      isChecked: false
    },
    {
      id: 5,
      value: "Vis",
      label: "Visual",
      isChecked: false
    }
  ]);
  const [otherAudiences, setOtherAudiences] = useState([
  ]);
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });

  const handleCancelEditAudience = index => () => {
    if (controlEdit.adding) deleteAudience(index);
    else {
      let newAudiences = [...otherAudiences];
      newAudiences[index].editing = false;
      setOtherAudiences(newAudiences);
    }
    setControlEdit({ tempValue: "", adding: false, editing: false });
  };

  const handleEditedAudience = index => () => {

    validateAudiences()

    let newAudiences = [...otherAudiences];
    newAudiences[index].editing = false;
    newAudiences[index].label = controlEdit.tempValue;
    setOtherAudiences(newAudiences);
    setControlEdit({ tempValue: "", adding: false, editing: false });
    let addNewAudiences=courseinformation;
    addNewAudiences.support.splice(2,3,otherAudiences)
    setcourseInformation(addNewAudiences)
    console.log('courseinformation---',courseinformation)
  };

  function deleteAudience(index) {
    let newAudiences = [...otherAudiences];

    if (index === 0) newAudiences = [...newAudiences.slice(1)];
    else if (index === audiences.length - 1)
      newAudiences = [...newAudiences.slice(0, index)];
    else
      newAudiences = [
        ...newAudiences.slice(0, index),
        ...newAudiences.slice(index + 1)
      ];
    setOtherAudiences(newAudiences);
    let addNewAudiences=courseinformation;
    addNewAudiences.support.splice(2,3,newAudiences)
    setcourseInformation(addNewAudiences)
    console.log('courseinformation---',courseinformation)
    
  }
  const handleDeleteAudience = index => () => {
    if (
      window.confirm("delete audience " + otherAudiences[index].label + "?")
    ) {
      deleteAudience(index);
    }
  };

  const handleNewAudience = () => {
    setOtherAudiences(prev => [
      ...prev,
      { label: "New Audience", editing: true }
    ]);

    setControlEdit({
      tempValue: "",
      adding: true,
      editing: true
    });
  };

  const handleEditAudience = index => () => {
    let newAudiences = [...otherAudiences];
    newAudiences[index].editing = true;

    setOtherAudiences(newAudiences);
    setControlEdit({
      tempValue: otherAudiences[index].label,
      adding: false,
      editing: true
    });
  };

  const handleCheck = (index) => {
      let newAudiences = [...audiences];
      newAudiences[index].isChecked = !newAudiences[index].isChecked;
      setAudiences(newAudiences);
      let addAudicences=courseinformation;
      addAudicences.support.splice(0, 1, newAudiences)
      setcourseInformation(addAudicences) 
      

      
     
      //setcourseInformation(prevState => ({courseInformation: {...prevState.courseInformation, support: audiences}}))

  };

  const handleCheckGol = (index) => {
    let newAudiences = [...audiencesGol];
    newAudiences[index].isChecked = !newAudiences[index].isChecked;
    setAudiencesGol(newAudiences);
    let addAudicencesGol=courseinformation;
    addAudicencesGol.support.splice(1, 2, newAudiences)
    setcourseInformation(addAudicencesGol) 
    
  };

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }

  //methods for validations no repeated values

  const validateAudiences=()=>{
    console.log("Se valida el campo de las Audiencias:")
    audiences.map((audience, index)=>{
      console.log(audience, )
    })
  }


  return (
    <div className="form-input-audiences">
      {/*  <SimulateButtons
        handleComplete={handleComplete}
        handleSkip={handleSkip}
        completed={completed}
        skiped={skiped}
      />  */}
      <h2 id="aud_title">Audience</h2>
      <h3 id="aud_title">Intended Audience</h3>
      <div role="group" aria-labelledby="aud_title">
        <List component="ul" key={"li03"}>
          <ListItem key="aud_SelectAll" dense>
            {/* <ListItemIcon> */}
            <Checkbox
              color="secondary"
              edge="start"
              checked={
                !audiences.some(audience => audience.isChecked === false)
              }
              // value={audience.value}
              onClick={event => {
                let newAudiences = [...audiences];
                newAudiences.forEach(
                  audience => (audience.isChecked = event.target.checked)
                );
                setAudiences(newAudiences);
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": "checkbox-list-label-selectAll"
              }}
            />
            {/* </ListItemIcon> */}
            <ListItemText
              id="checkbox-list-label-selectAll"
              primary="Select All"
            />
          </ListItem>
          {audiences.map((audience, index) => (
            <ListItem key={audience.id} dense>
              {/* <ListItemIcon> */}
              <Checkbox
                color="primary"
                edge="start"
                checked={audience.isChecked}
                value={audience.value}
                onClick={() => handleCheck(audience.id)}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${audience.id}`
                }}
              />
              {/* </ListItemIcon> */}
              <ListItemText
                id={`checkbox-list-label-${audience.id}`}
                primary={audience.label}
              />
            </ListItem>
          ))}
          {otherAudiences.map((audience, index) => (
            <ListItem
              // button={!audience.editing}
              component="li"
              key={"li_aud" + index}
            >
              <ListItemText
                key={"li_aud" + index + "listeItemTxt"}
                primary={audience.label}
                className={audience.editing ? classes.hidden : ""}
              />
              <TextField
                key={"li_aud" + index + "txtField"}
                className={!audience.editing ? classes.hidden : ""}
                value={controlEdit.tempValue}
                onChange={event => updateTempValue(event.target.value)}
              />
              <ListItemSecondaryAction key={"li_aud" + index + "secAc"}>
                {audience.editing ? (
                  <React.Fragment>
                    <IconButton
                      key={"li_aud" + index + "btnEditSaveUnit"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={handleEditedAudience(index)}
                      className={classes.saveButton}
                      disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      key={"li_aud" + index + "btnEditCancelUnit"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={handleCancelEditAudience(index)}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton
                      key={"li_aud" + index + "btnEditUnit"}
                      edge="end"
                      aria-label={"Edit unit name"}
                      onClick={handleEditAudience(index)}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      key={"li_aud" + index + "btnDeleteUnit"}
                      edge="end"
                      onClick={handleDeleteAudience(index)}
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
            key="addaudience"
            button
            onClick={handleNewAudience}
            id="addaudience"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other audience" />
          </ListItem>
        </List>
      </div>
     
      <h3 id="aud_title"><h3 id="aud_title">Inclusion Goals</h3></h3>
      <div role="group" aria-labelledby="aud_title2">
        <List component="ul" key={"li03"}>
          <ListItem key="aud_SelectAll2" dense>
            {/* <ListItemIcon> */}
            <Checkbox
              color="secondary"
              edge="start"
              checked={
                !audiencesGol.some(audience => audience.isChecked === false)
              }
              onClick={event => {
                let newAudiences = [...audiencesGol];
                newAudiences.forEach(
                  audience => (audience.isChecked = event.target.checked)
                );
                setAudiencesGol(newAudiences);
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": "checkbox-list-labelGol-selectAll"
              }}
            />
            {/* </ListItemIcon> */}
            <ListItemText
              id="checkbox-list-labelGol-selectAll"
              primary="Select All"
            />
          </ListItem>
          
          {audiencesGol.map((audienceGol, index) => (
            <ListItem key={audiences.id} dense>
              {/* <ListItemIcon> */}
              <Checkbox
                color="primary"
                edge="start"
                checked={audienceGol.isChecked}
                value={audienceGol.value}
                onClick={() => handleCheckGol(audienceGol.id)}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkboxgol-list-label-${audienceGol.id}`
                }}
              />
              {/* </ListItemIcon> */}
              <ListItemText
                id={`checkboxgol-list-label-${audienceGol.id}`}
                primary={audienceGol.label}
              />
            </ListItem>
          ))}
        </List>
      </div>

    </div>
    
  );
}
