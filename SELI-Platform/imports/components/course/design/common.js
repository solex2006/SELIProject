import React, { useState, useEffect } from "react";
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
  const classes = useStyles();
  const {
    courseInformation,
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
    organization,
    validate,
    language
  } = props;

  useEffect(() => {
    console.log("actaliza el estado",learnGols)
    setLearning(learnGols)
    setpreKnow(preKnowledge)
    setMain(mainContent)
    setEvaluation(evaluation)
  }, [])

  useEffect(() => {
    //for validate the step
    //console.log("Validate desig STEP", learning,preKnow,main,eval )
    if(learning!='' && main!='' && eval!=''){
      props.validate('passCourseDesign')
    } else {
      props.validate('NopassCourseDesign')
    }
  });

  const [learning, setLearning]=useState(learnGols);
  const [preKnow, setpreKnow]=useState(preKnowledge);
  const [main, setMain]=useState(mainContent);
  const [eval, setEvaluation]=useState(evaluation);
  
  return (
    <React.Fragment>
      <TextField
        id={key + "_Obj"}
        label={language.Learningobjectives}
        aria-describedBy={key + "-helper-text_Obj"}
        required
        fullWidth
        multiline
        value={ learning!='' ?learning : learnGols}
        onChange={event => {
          setLearning(event.target.value)
          //console.log('Unit en el common', unit, unitIndex)
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
        tipMsg={language.instructionslearning}
        describedBy={key + "-helper-text_Obj"}
      />
      <TextField
        id={key + "_Obj"}
        label={language.Preexistingknowlegde}
        aria-describedBy={key + "-helper-text_preKnowledge"}
        value={preKnow!=''? preKnow :preKnowledge}
        fullWidth
        multiline
        onChange={event => {
          setpreKnow(event.target.value)
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
        tipMsg={language.instructionsPreExisting}
        describedBy={key + "-helper-text_preKnowledge"}
      />
      <TextField
        id={key + "_Obj"}
        label={language.Maincontent}
        aria-describedBy={key + "-helper-text_mainContent"}
        value={main!='' ? main : mainContent }
        fullWidth
        required
        onChange={event => {
          setMain(event.target.value)
          unit.mainContent = event.target.value;
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
        tipMsg={language.instructionsMainContent}
        describedBy={key + "-helper-text_mainContent"}
      />
      <TextField
        id={key + "_Obj"}
        label={language.Evaluation}
        aria-describedBy={key + "-helper-text_mainContent"}
        value={eval!= ''? eval : evaluation}
        fullWidth
        required
        onChange={event => {
          setEvaluation(event.target.value)
          unit.evaluation = event.target.value;
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
        tipMsg={language.instructionsEvaluation}
        describedBy={key + "-helper-text_mainContent"}
      />
      {
        organization!='unit' && (
          <Resources
            language={language}
            type='topic'
            courseInformation={courseInformation}
            tools={tools}
            key={key}
            handleSelectResources={handleSelectResources}
            parentIndex={unitIndex}
          />
        )
      }
    </React.Fragment>
  );
}
