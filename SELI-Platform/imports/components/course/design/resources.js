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
    console.log("resources*************",courseInformation,parentIndex, tools, props.activityIndex ,type)
      if(courseInformation.length!=0){
      setToolsOptions(courseInformation[parentIndex].tools)
    }  
  },[])

  useEffect(()=>{
     if(props.activityIndex!=undefined && type==='subActivity'){
      console.log("resources--->",props.activityIndex.tableData.id)
      let arrayActivities=[];
      courseInformation[parentIndex].activities.map((tools, index)=>{
          console.log("LAs tools***************", tools.tools)
          arrayActivities.push(tools.tools);
          setToolsOptionsSub(arrayActivities);
      })
      //setToolsOptionsSub(courseInformation[parentIndex].activities[props.activityIndex.tableData.id].tools)
    } 
    
  },[])

  const classes = useStyles();
  const {handleToolActivity,type, courseInformation, key, tools, handleSelectResources, parentIndex,lessonIndex ,handleSelectResourcesLessons } = props;
  
  const presentItemsTypes = ["file", "h5p"];
  const gameItemsTypes = ["unity", "h5p", "reference"];

  const initialValue = tools;

  const [toolsOptions, setToolsOptions] = useState(tools);
  const [toolsOptionsSub, setToolsOptionsSub] = useState([]);
  
  
  


  function showTable(id) {
    return toolsOptions.some(tool => {
      return tool.key === id && tool.checked;
    });
  }

  const subActivityTool=(indexActivitie)=>{
    return(
      <div className={classes.intoresources}>
      {
      toolsOptionsSub.length!=0?
        <FormControl
        required
        //error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Resources</FormLabel>
        {console.log("toolsOptionsSub",toolsOptionsSub,indexActivitie)}
        <FormGroup>
          {toolsOptionsSub[indexActivitie].map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => {
                    console.log("se dio click al checkbox dela subactivity",index)
                    let t = toolsOptionsSub[indexActivitie];
                    t[index].checked = !t[index].checked;
                    
                      
                      handleToolActivity(parentIndex, t, props.activityIndex.tableData.id)
                      console.log("se dio click al checkbox dela subactivity",index)
                    
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
        :
        undefined     
    }
      </div>
    )
  }

  return (
    <div>
      {
      type==='subActivity'?
      subActivityTool(props.activityIndex.tableData.id)
      :
      <div className={classes.intoresources}> 
      <FormControl
        required
        // error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Resources</FormLabel>
        {console.log("toolsOption",toolsOptions)}
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
                      :type==='subActivity'?
                      handleToolActivity(parentIndex, t, props.activityIndex.tableData.id)
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

      }
    </div>
    
    
  );
}
