import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import FeedbackHelp from "../feedback";
import Resources from "./resources";

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
    maxWidth: "100%"
    // backgroundColor: "#f5f5f5"
  },
  header: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#e0e0e0!important"
  }
}));

export default function DesignCourseCommons(props) {
  const {
    key,
    learnGols,
    preKnowledge,
    mainContent,
    tools,
    evaluation,
    unit,
    unitIndex,
    handleUnitChange,
    handleSelectResources,
    organization
  } = props;
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

  const classes = useStyles();

  return (
    <React.Fragment>
      <TextField
        id={key + "_Obj"}
        label="Learning objectives"
        aria-describedBy={key + "-helper-text_Obj"}
        required
        fullWidth
        multiline
        value={learnGols}
        onChange={event => {
          unit.learnGols = event.target.value;
          handleUnitChange(unit, unitIndex);
        }}
      />

      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg="instructions here"
        describedBy={key + "-helper-text_Obj"}
      />
      <TextField
        id={key + "_Obj"}
        label="Pre-existing knowlegde"
        aria-describedBy={key + "-helper-text_preKnowledge"}
        value={preKnowledge}
        fullWidth
        multiline
        onChange={event => {
          unit.preKnowledge = event.target.value;
          handleUnitChange(unit, unitIndex);
        }}
      />
      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg="previous knowledge to understand the unit"
        describedBy={key + "-helper-text_preKnowledge"}
      />

      <TextField
        id={key + "_Obj"}
        label="Main content"
        aria-describedBy={key + "-helper-text_mainContent"}
        value={mainContent}
        fullWidth
        required
        onChange={event => {
          // console.log(event.target.value);
          // handleUnitChange(
          //   { ... preKnowledge: event.target.value },
          //   unitIndex
          // );
        }}
      />
      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg="themes to be addressed, fundamental or complementary materials, learning objects"
        describedBy={key + "-helper-text_mainContent"}
      />

      <TextField
        id={key + "_Obj"}
        label="Evaluation"
        aria-describedBy={key + "-helper-text_mainContent"}
        value={evaluation}
        fullWidth
        required
        onChange={event => {
          // console.log(event.target.value);
          // handleUnitChange(
          //   { ... preKnowledge: event.target.value },
          //   unitIndex
          // );
        }}
      />
      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg="instructions..."
        describedBy={key + "-helper-text_mainContent"}
      />
      <Resources
        tools={tools}
        key={key}
        handleSelectResources={handleSelectResources}
        parentIndex={unitIndex}
      />
    </React.Fragment>
  );
}
