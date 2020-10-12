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
  const {language, handleSelectResourcesIntoLessons,handleToolActivity,type, courseInformation, key, tools, handleSelectResources, parentIndex,lessonIndex ,handleSelectResourcesLessons } = props;

  useEffect(()=>{
    if(type==='lesson'){//for tool into lessons unit type
      //console.log("resources*************",courseInformation,parentIndex, tools, props.activityIndex ,type)
      /* let arrayTools=[];
      courseInformation[parentIndex].lessons.map((lesson, index)=>{
          console.log("Las tools en lessons***************", lesson.tools)
          arrayTools.push(lesson.tools);
          setToolsOptions(arrayTools);
      }) */

    }else{//for topics
      if(courseInformation.length!=0){
     // setToolsOptionsIntoLesson(courseInformation[parentIndex].tools)
     setToolsOptionsIntoLesson(courseInformation[parentIndex].tools)
    }  
    }

    if(props.activityIndex!=undefined && type==='subActivity'){
      let arrayActivities=[];
      courseInformation[parentIndex].activities.map((tools, index)=>{
          //console.log("LAs tools***************", tools.tools)
          arrayActivities.push(tools.tools);
          setToolsOptionsSub(arrayActivities);
      })
    }
  },[])

  const classes = useStyles();

  const [toolsOptions, setToolsOptions] = useState(
    type==='lessonInto'?((courseInformation[parentIndex]===undefined || courseInformation[parentIndex].lessons[lessonIndex]===undefined)? tools 
    :courseInformation[parentIndex].lessons[lessonIndex].tools):tools
    );
  const [toolsOptionsSub, setToolsOptionsSub] = useState([]);
  const [toolsOptionsIntoLesson, setToolsOptionsIntoLesson] = useState(tools);
  
  


  function showTable(id) {
    return ((courseInformation[parentIndex]===undefined || courseInformation[parentIndex].lessons[lessonIndex]===undefined)? tools :courseInformation[parentIndex].lessons[lessonIndex].tools).some(tool => {
      //console.log("toooooooooooool",tool)
      return tool.key === id && tool.checked;
    });
  }
  function showTableIntoLesson(id) {
    return toolsOptionsIntoLesson.some(tool => {
      //console.log("toooooooooooool",tool)
      return tool.key === id && tool.checked;
    });
  }

  const subActivityTool=(indexActivitie)=>{
    return(
      <div className="design-into-resources">
      {
      toolsOptionsSub.length!=0?
      <FormControl
        required
        //error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">{language.Resources}</FormLabel>
        <FormGroup>
          {toolsOptionsSub[indexActivitie].map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => {
                    let t = toolsOptionsSub[indexActivitie];
                    t[index].checked = !t[index].checked;
                      handleToolActivity(parentIndex, t, props.activityIndex.tableData.id)
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
          tipMsg={language.instructionsResources}
          describedBy={key + "-helper-text_mainContent"}
        />
      </FormControl>
        :
        undefined     
    }
      </div>
    )
  }

  const toolsIntoLessons=(lessonIndex)=>{
    return(
        <div className="design-into-resources"> 
            <FormControl
              //required
              // error={error}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend">{language.Resources}</FormLabel>
              {/* console.log("toolsOption",toolsOptions, lessonIndex,courseInformation[parentIndex]) */}
              <FormGroup>
                {toolsOptionsIntoLesson.map((option, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.checked}
                        onChange={() => {
                          let t = toolsOptionsIntoLesson;
                          t[index].checked = !t[index].checked;
                          {
                            type==='lessonInto'?
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
                tipMsg={language.instructionsResources}
                describedBy={key + "-helper-text_mainContent"}
              />
            </FormControl>
            <br/>
            {showTableIntoLesson("games") && 
              <Games  
                language={language}
                handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                type={type}
                handleSelectResourcesLessons={handleSelectResourcesLessons}
                courseInformation={courseInformation}
                tools={toolsOptionsIntoLesson}
                handleSelectResources={handleSelectResources}
                parentIndex={parentIndex}
                lessonIndex={lessonIndex}
              />}
            
            {showTableIntoLesson("presentation") && (
              <Presentation
                language={language}
                handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                lessonIndex={lessonIndex}
                type={type}
                handleSelectResourcesLessons={handleSelectResourcesLessons}
                courseInformation={courseInformation}
                tools={toolsOptionsIntoLesson}
                handleSelectResources={handleSelectResources}
                parentIndex={parentIndex}
              />
            )}
            {showTableIntoLesson("supplemantary") && (
              <SupplementaryTexts
                language={language}
                handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
                lessonIndex={lessonIndex}
                type={type}
                handleSelectResourcesLessons={handleSelectResourcesLessons}
                courseInformation={courseInformation}
                tools={toolsOptionsIntoLesson}
                handleSelectResources={handleSelectResources}
                parentIndex={parentIndex}
              />
            )}
    </div>
    )
  }

  return (
    <div>
      {
      type==='subActivity'?
      subActivityTool(props.activityIndex.tableData.id)
      :
      type==='topic'?
      toolsIntoLessons()
      :
      type==='lessonInto'?  
      <div className="design-into-resources"> 
      <FormControl
        //required
        // error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Resources</FormLabel>
        {/* console.log("toolsOption",toolsOptions, lessonIndex,courseInformation[parentIndex]) */}
        <FormGroup>
          {((courseInformation[parentIndex]===undefined || courseInformation[parentIndex].lessons[lessonIndex]===undefined)? tools :courseInformation[parentIndex].lessons[lessonIndex].tools).map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => {
                    console.log("se dio click al checkbox")
                    let t = (courseInformation[parentIndex]===undefined? tools :courseInformation[parentIndex].lessons[lessonIndex].tools);
                    t[index].checked = !t[index].checked;
                    {
                      type==='lessonInto'?
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
      <br/>
      {showTable("games") && 
        <Games 
        language={language} 
        handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
          type={type}
          handleSelectResourcesLessons={handleSelectResourcesLessons}
          courseInformation={courseInformation}
          tools={toolsOptions}
          handleSelectResources={handleSelectResources}
          parentIndex={parentIndex}
          lessonIndex={lessonIndex}
        />}
      
      {showTable("presentation") && (
        <Presentation
        language={language}
        handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
        lessonIndex={lessonIndex}
        type={type}
        handleSelectResourcesLessons={handleSelectResourcesLessons}
        courseInformation={courseInformation}
        tools={toolsOptions}
        handleSelectResources={handleSelectResources}
        parentIndex={parentIndex}
          />
      )}
      {showTable("supplemantary") && (
        <SupplementaryTexts
        language={language}
        handleSelectResourcesIntoLessons={handleSelectResourcesIntoLessons}
        lessonIndex={lessonIndex}
        type={type}
        handleSelectResourcesLessons={handleSelectResourcesLessons}
        courseInformation={courseInformation}
        tools={toolsOptions}
        handleSelectResources={handleSelectResources}
        parentIndex={parentIndex}
          />
      )}
    </div>
      :
      undefined
      }
    </div>
    
    
  );
}
