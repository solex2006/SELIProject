import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";

//import SimulateButtons from "./simulate";

import Checkbox from "@material-ui/core/Checkbox";

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

export default function RequirementStep(props) {
  const { handleComplete, handleSkip, completed, skiped } = props;
  const classes = useStyles();
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });

  const [softwares, setSoftwares] = useState([
    {
      key: "OS",
      label: "Operational System",
      options: [
        { id: 0, value: "WindowsOS", label: "Widowns", isChecked: false },
        { id: 1, value: "LinuxOS", label: "Linux", isChecked: false },
        { id: 3, value: "MacOS", label: "MacOS", isChecked: false },
        { id: 4, value: "AndroidOS", label: "Android", isChecked: false },
        { id: 5, value: "iOS", label: "iOS", isChecked: false },
      ]
    },
    {
      key: "Utility",
      label: "Utility programs",
      options: [
        {
          id: 0,
          value: "LibreOffice",
          label: "Libre Office",
          isChecked: false
        },
        { id: 1, value: "MSOffice", label: "MS Office", isChecked: false }
      ]
    },
    {
        key: "DE",
        label: "Development Environment",
        options: [
          { id: 0, value: "TextEditor", label: "TextEditor (Atom, SublimeText, Notepad++, TextMate)", isChecked: false },
          { id: 1, value: "OnlineEditor", label: "OnlineEditor (CodePen, JSFiddle, Koding, PhythonFiddle)", isChecked: false },
          { id: 3, value: "VisualStudio", label: "VisualStudio", isChecked: false },
          { id: 4, value: "Eclipse", label: "Eclipse", isChecked: false },
          { id: 5, value: "NetBeans", label: "NetBeans", isChecked: false },
          { id: 6, value: "MacRabbitEspresso", label: "MacRabbitEspresso", isChecked: false },
          { id: 7, value: "BootstrapFramewor", label: "BootstrapFramewor", isChecked: false },
          { id: 8, value: "ExpressionStudioFramework", label: "ExpressionStudioFramework", isChecked: false },
          { id: 9, value: "AzureFramework", label: "AzureFramework", isChecked: false },
          { id: 10, value: "Github", label: "Github", isChecked: false },
          { id: 11, value: "BitBucket", label: "BitBucket", isChecked: false },
          { id: 12, value: "Axure", label: "Axure", isChecked: false },

        ]
      },
      {
        key: "DS",
        label: "Data Science",
        options: [
          { id: 0, value: "DataStudio", label: "DataStudio", isChecked: false },
          { id: 1, value: "R", label: "R", isChecked: false },
          { id: 3, value: "MATLAB", label: "MATLAB", isChecked: false },
          { id: 4, value: "Spreadsheet", label: "Spreadsheet", isChecked: false },
          { id: 5, value: "Tableau", label: "Tableau", isChecked: false },
          { id: 6, value: "Jupyter", label: "Jupyter", isChecked: false },
        ]
      },
      {
        key: "GD",
        label: "Graphic Design",
        options: [
          { id: 0, value: "GIMP", label: "GIMP", isChecked: false },
          { id: 1, value: "Inkscape", label: "Inkscape", isChecked: false },
          { id: 3, value: "Photoshop", label: "Photoshop", isChecked: false },
        ]
      },
      
  ]);
  
  const [hardware, setHardware] = useState([
    {
        key: "DS",
        label: "options",
        options: [
          { id: 0, value: "Smartphone", label: "Smartphone", isChecked: false },
          { id: 1, value: "Tablet", label: "Tablet", isChecked: false },
          { id: 3, value: "SmartWatch", label: "SmartWatch", isChecked: false },
          { id: 4, value: "PenTable", label: "PenTable", isChecked: false },
          { id: 5, value: "ScientificCalculator", label: "ScientificCalculator", isChecked: false },
          { id: 6, value: "FinancialCalculator", label: "FinancialCalculator", isChecked: false },
          { id: 6, value: "GraphingCalculator", label: "GraphingCalculator", isChecked: false },
          { id: 6, value: "DigitalCamera", label: "DigitalCamera", isChecked: false },
          { id: 6, value: "DSLRCamera", label: "DSLRCamera", isChecked: false },
          { id: 6, value: "3DPrint", label: "3DPrint", isChecked: false },
          { id: 6, value: "DSLRCamera", label: "DSLRCamera", isChecked: false },
          { id: 6, value: "VRHeadset", label: "VRHeadset", isChecked: false },
          { id: 6, value: "MRHeadset", label: "MRHeadset", isChecked: false },
          { id: 6, value: "SonyPSVR", label: "SonyPSVR", isChecked: false },
          { id: 6, value: "OculusRift", label: "OculusRift", isChecked: false },
          { id: 6, value: "360Camera", label: "360Camera", isChecked: false },
          { id: 6, value: "WebCam", label: "WebCam", isChecked: false }
        ]
      },

  ]);


  const [otherSoftwares, setOtherSoftwares] = useState([
    {
      label: "MATLAB",
      editing: false
    }
  ]);

  const [otherHardware, setOtherHardware] = useState([
    {
      label: "Raspberry Pi",
      editing: false
    }
  ]);
  
  function softwaresCategReq(category, indexCategory) {
    return (
      <React.Fragment>
        {category.options.map((option, index) => (
          <ListItem key={category.key + "_" + index} dense>
            <Checkbox
              color="primary"
              edge="start"
              checked={option.isChecked}
              value={option.value}
              onClick={() => {
                let newSoftwares = [...softwares];
                newSoftwares[indexCategory].options[
                  index
                ].isChecked = !newSoftwares[indexCategory].options[index]
                  .isChecked;
                setSoftwares(newSoftwares);
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": `checkbox-list-label-${option.id}`
              }}
            />
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.label}
            />
          </ListItem>
        ))}
      </React.Fragment>
    );
  }

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
  }

  function deleteSoftware(index) {
    let newSoftware = [...otherSoftwares];

    if (index === 0) newSoftware = [...newSoftware.slice(1)];
    else if (index === softwares.length - 1)
      newSoftware = [...newSoftware.slice(0, index)];
    else
      newSoftware = [
        ...newSoftware.slice(0, index),
        ...newSoftware.slice(index + 1)
      ];

    setOtherSoftwares(newSoftware);
  }

  return (
    <React.Fragment>
      {/* <SimulateButtons
        handleComplete={handleComplete}
        handleSkip={handleSkip}
        completed={completed}
        skiped={skiped}
      /> */}
      <h2>Course Requirements</h2>
      <h3 id="soft_title">Software requirements</h3>
      <div role="group" aria-labelledby="soft_title">
        <List component="ul" key={"li04"}>
          {softwares.map((category, index) => (
            <React.Fragment>
              <ListSubheader>{category.label}</ListSubheader>
              {softwaresCategReq(category, index)}
            </React.Fragment>
          ))}
          <ListSubheader>Others</ListSubheader>
          {otherSoftwares.map((software, index) => (
            <ListItem
              // button={!audience.editing}
              component="li"
              key={"li_sft" + index}
            >
              <ListItemText
                key={"li_sft" + index + "listeItemTxt"}
                primary={software.label}
                className={software.editing ? classes.hidden : ""}
              />
              <TextField
                key={"li_sft" + index + "txtField"}
                className={!software.editing ? classes.hidden : ""}
                value={controlEdit.tempValue}
                onChange={event => updateTempValue(event.target.value)}
              />
              <ListItemSecondaryAction key={"li_sft" + index + "secAc"}>
                {software.editing ? (
                  <React.Fragment>
                    <IconButton
                      key={"li_sft" + index + "btnEditSaveSoft"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={() => {
                        let newSoftwares = [...otherSoftwares];
                        newSoftwares[index].editing = false;
                        newSoftwares[index].label = controlEdit.tempValue;
                        setOtherSoftwares(newSoftwares);
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.saveButton}
                      disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      key={"li_sft" + index + "btnEditCancelSoft"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={() => {
                        if (controlEdit.adding) deleteSoftware(index);
                        else {
                          let newSoftware = [...otherSoftwares];
                          newSoftware[index].editing = false;
                          setOtherSoftwares(newSoftware);
                        }
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton
                      key={"li_sft" + index + "btnEditSoft"}
                      edge="end"
                      aria-label={"Edit software"}
                      onClick={() => {
                        let newSoftwares = [...otherSoftwares];
                        newSoftwares[index].editing = true;
                        console.log(newSoftwares);
                        setOtherSoftwares(newSoftwares);
                        setControlEdit({
                          tempValue: otherSoftwares[index].label,
                          adding: false,
                          editing: true
                        });
                      }}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      key={"li_sft" + index + "btnDeleteSoft"}
                      edge="end"
                      onClick={
                        () => {
                          if (
                            window.confirm(
                              "delete audience " +
                                otherSoftwares[index].label +
                                "?"
                            )
                          ) {
                            deleteSoftware(index);
                          }
                        }

                        // handleDeleteAudience(index)
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
            key="addsoft"
            button
            onClick={() => {
              setOtherSoftwares(prev => [
                ...prev,
                { label: "New Software", editing: true }
              ]);

              setControlEdit({
                tempValue: "",
                adding: true,
                editing: true
              });
            }}
            id="addsoft"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other software" />
          </ListItem>
        </List>
      </div>


      <h3 id="soft_title">Hardware requirements</h3>
      <div role="group" aria-labelledby="soft_title">
        <List component="ul" key={"li04"}>
          {hardware.map((category, index) => (
            <React.Fragment>
              <ListSubheader>{category.label}</ListSubheader>
              {softwaresCategReq(category, index)}
            </React.Fragment>
          ))}
          <ListSubheader>Others</ListSubheader>
          {otherHardware.map((software, index) => (
            <ListItem
              // button={!audience.editing}
              component="li"
              key={"li_sft" + index}
            >
              <ListItemText
                key={"li_sft" + index + "listeItemTxt"}
                primary={software.label}
                className={software.editing ? classes.hidden : ""}
              />
              <TextField
                key={"li_sft" + index + "txtField"}
                className={!software.editing ? classes.hidden : ""}
                value={controlEdit.tempValue}
                onChange={event => updateTempValue(event.target.value)}
              />
              <ListItemSecondaryAction key={"li_sft" + index + "secAc"}>
                {software.editing ? (
                  <React.Fragment>
                    <IconButton
                      key={"li_sft" + index + "btnEditSaveSoft"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={() => {
                        let newSoftwares = [...otherSoftwares];
                        newSoftwares[index].editing = false;
                        newSoftwares[index].label = controlEdit.tempValue;
                        setOtherSoftwares(newSoftwares);
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.saveButton}
                      disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      key={"li_sft" + index + "btnEditCancelSoft"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={() => {
                        if (controlEdit.adding) deleteSoftware(index);
                        else {
                          let newSoftware = [...otherSoftwares];
                          newSoftware[index].editing = false;
                          setOtherSoftwares(newSoftware);
                        }
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton
                      key={"li_sft" + index + "btnEditSoft"}
                      edge="end"
                      aria-label={"Edit software"}
                      onClick={() => {
                        let newSoftwares = [...otherSoftwares];
                        newSoftwares[index].editing = true;
                        console.log(newSoftwares);
                        setOtherSoftwares(newSoftwares);
                        setControlEdit({
                          tempValue: otherSoftwares[index].label,
                          adding: false,
                          editing: true
                        });
                      }}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      key={"li_sft" + index + "btnDeleteSoft"}
                      edge="end"
                      onClick={
                        () => {
                          if (
                            window.confirm(
                              "delete audience " +
                                otherSoftwares[index].label +
                                "?"
                            )
                          ) {
                            deleteSoftware(index);
                          }
                        }

                        // handleDeleteAudience(index)
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
            key="addsoft"
            button
            onClick={() => {
              setOtherSoftwares(prev => [
                ...prev,
                { label: "New Software", editing: true }
              ]);

              setControlEdit({
                tempValue: "",
                adding: true,
                editing: true
              });
            }}
            id="addsoft"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other software" />
          </ListItem>
        </List>
      </div>
     {/*  <SimulateButtons
        handleComplete={handleComplete}
        handleSkip={handleSkip}
        completed={completed}
        skiped={skiped}
      /> */}
    </React.Fragment>
  );
}
