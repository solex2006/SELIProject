import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import FeedbackHelp from "../feedback";
import Games from "./gamesTable.js";
import Presentation from "./presentationTable";
import SupplementaryTexts from "./supplementaryTable";


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
  intoresources:{
    display: 'flex',
    flexDirection:'column',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center'
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

export default function ActivityResources(props) {
  useEffect(()=>{
    console.log("resources*************",courseInformation,parentIndex, props )
    if(courseInformation.length!=0){
      setToolsOptions(courseInformation[parentIndex].tools)
    }
  },[])
  const classes = useStyles();

  const {type, courseInformation, key, tools, handleSelectResources, parentIndex,lessonIndex ,handleSelectResourcesLessons } = props;
  console.log("resources",type,tools)
  const presentItemsTypes = ["file", "h5p"];
  const gameItemsTypes = ["unity", "h5p", "reference"];

  const initialValue = tools;

  const [toolsOptions, setToolsOptions] = useState(tools);
  
  

  


  function showTable(id) {
    return toolsOptions.some(tool => {
      return tool.key === id && tool.checked;
    });
  }

  return (
    <div className={classes.intoresources}>
      {/* <h4>Resources</h4> */}
      <FormControl
        required
        // error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Resources</FormLabel>
        <FormGroup>
          {toolsOptions.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => {
                    console.log("se dio click al checkbox")
                    let t = toolsOptions;
                    t[index].checked = !t[index].checked;
                    {
                      type==='lesson'?
                      handleSelectResourcesLessons(parentIndex, t, lessonIndex)
                      :
                      handleSelectResources(parentIndex, t)
                    }
                    
                  }}
                  name={option.key}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg="Select the resources tool you are goint to ue in this topic"
          describedBy={key + "-helper-text_mainContent"}
        />
      </FormControl>


      {showTable("games") && 
        <Games  
         courseInformation={courseInformation}
          tools={toolsOptions}
          handleSelectResources={handleSelectResources}
          parentIndex={parentIndex}
        />}
      
      {showTable("presentation") && (
        <Presentation
        courseInformation={courseInformation}
        tools={toolsOptions}
        handleSelectResources={handleSelectResources}
        parentIndex={parentIndex}
          />
      )}
      {showTable("supplemantary") && (
        <SupplementaryTexts
        courseInformation={courseInformation}
        tools={toolsOptions}
        handleSelectResources={handleSelectResources}
        parentIndex={parentIndex}
          />
      )}
    </div>
  );
}
