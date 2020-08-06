import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import React, {useEffect,  useState}from "react";
import FeedbackHelp from "../feedback";
import tableIcons from '../design/icons'

const useStyles = makeStyles(theme => ({}));

export default function ActivityDesign(props) {
  const {language, type, courseInformation, programInformation, activities, handleActivities, parentIndex, template,lessonIndex, handleSelectResourcesActivities } = props;

  useEffect(()=>{
    if(courseInformation.length!=0){
      if(type=='lesson'){
        setState(prevState=>{
          return {
            ...prevState,
            data: courseInformation[parentIndex].lessons[lessonIndex].activities,
            programActivities: programInformation[parentIndex].lessons[lessonIndex].activities
          }
        })
      }else{
        setState(prevState=>{
          return {
            ...prevState, 
            data: courseInformation[parentIndex].activities,
            programActivities: programInformation[parentIndex].activities,
          }
        })
      }   
    } 
  },[])

  const classes = useStyles();

  const spiralTasks = { 1: "Activity", 3: "Quiz" };
  const ConsistentTasks = { 1: "Activity", 2: "Problem", 3: "Quiz" };
  const ToyBoxTasks = { 1: "Activity", 2: "Problem", 3: "Quiz", 4: "Forum" };
  const noTemplateTasks = { 1: "Activity", 3: "Quiz", 4: "Forum" };
  const typeActivies =
    template === "spiral"
      ? spiralTasks
      : template === "consistent"
      ? ConsistentTasks
      : template === "toyBox"
      ? ToyBoxTasks
      : noTemplateTasks;

  function selectOptions() {
    let rows = [];
    for (let [key, value] of Object.entries(typeActivies)) {
      // console.log(`${key}: ${value}`);
      rows.push(
        <React.Fragment>
          <option value={key}>{value}</option>
        </React.Fragment>
      );
    }

    return rows;
  }
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Task Title",
        field: "activity",
        editComponent: props => (
          <TextField
            type="text"
            error={
              !props.value &&
              props.rowData.validateInput &&
              props.rowData.submitted
                ? props.rowData.error
                : false
            }
            helperText={
              !props.value &&
              props.rowData.validateInput &&
              props.rowData.submitted
                ? "This Field is Required"
                : ""
            }
            value={props.value ? props.value : ""}
            onChange={e => {
              if (props.rowData.validateInput) {
                props.rowData.validateInput = false;
              }

              props.onChange(e.target.value);
            }}
          />
        )
      },
      {
        title: "Type",
        field: "type",
        lookup: typeActivies,

        editComponent: props => {
          return (
            <NativeSelect
              value={props.value ? props.value : ""}
              onChange={e => {
                if (props.rowData.validateInput) {
                  props.rowData.validateInput = false;
                }

                props.onChange(e.target.value);
              }}
              name="name"
              inputProps={{
                id: "name-native-error"
              }}
            >
              {selectOptions()}
            </NativeSelect>
          );
        }
      },
      { title: "Graded", field: "graded", type: "boolean" },
      { title: "Peer Reviewed", field: "preeReview", type: "boolean" },
      { title: "in group", field: "group", type: "number" },
      { title: "Part of course's project", field: "project", type: "boolean", hidden: false },
    ],
    data: activities
  });

  const handleSelectResources = (activityIndex, resources) => {  
    let prev = [...state.data];
    prev[activityIndex].tools = resources;
    handleActivities(parentIndex, prev);
  };

  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        title={language.Taskslist}
        options={{ search: false, actionsColumnIndex: 6}}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log("en la tabla con newData.activity anf newdata",newData.activity, newData )
                newData.submitted = true;
                if(newData.type===undefined){newData.type="1"}
               
                if (!newData.activity) {
                  newData.error = true;
                  newData.label = language.required;
                  newData.helperText = language.Namerequired;
                  newData.validateInput = true;
                  reject();
                  return;
                }
                resolve();
                setState(prevState => {
                  
                  const data = [...prevState.data];
                  const programActivities = [...prevState.programActivities];
                  const programActivity = {_id: Math.random(), name: newData.activity, items: []};
                  programActivities.push(programActivity);
                  data.push(newData);
                  
                  if(type==='lesson'){
                    handleSelectResourcesActivities(parentIndex, data, lessonIndex, programActivities);
                  }else{
                    handleActivities(parentIndex, data, programActivities);
                  }
                  console.log("guarda", data, programActivities )
                  return { ...prevState, data, programActivities};
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                if (!newData.activity) {
                  newData.error = true;
                  newData.label = language.required;
                  newData.helperText = language.Namerequired;
                  newData.validateInput = true;
                  reject();
                  return;
                }
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    const programActivities = [...prevState.programActivities];
                    const taskIndex = data.indexOf(oldData);
                    data[taskIndex] = newData;
                    programActivities[taskIndex].name = newData.activity;
                    if(type=='lesson'){
                      handleSelectResourcesActivities(parentIndex, data, lessonIndex, programActivities)
                    }else{
                      handleActivities(parentIndex, data, programActivities);
                    }
                    return { ...prevState, data, programActivities};
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  const programActivities = [...prevState.programActivities];
                  const taskIndex = data.indexOf(oldData);
                  data.splice(taskIndex, 1);
                  programActivities.splice(taskIndex, 1);
                  if(type=='lesson'){
                    handleSelectResourcesActivities(parentIndex, data, lessonIndex, programActivities)
                  }else{
                    handleActivities(parentIndex, data, programActivities);
                  }
                  return { ...prevState, data, programActivities};
                });
              }, 600);
            })
        }}
        /* detailPanel={
          template !== "without"
            ? [
                {
                  tooltip: "Show task resources",
                  render: rowData => {
                    return (
                      <Resources
                        handleToolActivity={handleToolActivity}
                        type="subActivity"
                        courseInformation={courseInformation}
                        tools={state.data}
                        key={"act"}
                        handleSelectResources={handleSelectResources}
                        parentIndex={parentIndex}
                        activityIndex={rowData}
                      />
                    );
                  }
                }
              ]
            : null
        } */
        localization={{
          pagination: {
            // labelDisplayedRows: '{from}-{to} of {count}'
          },
          toolbar: {
            // nRowsSelected: '{0} row(s) selected'
          },
          header: {
            actions: "" //removed title of action column
          },
          body: {
            emptyDataSourceMessage: "No tasks"
          }
        }}
      />


      <FeedbackHelp
        validation={{
          error: false,
          errorMsg: "",
          errorType: "",
          a11y: null
        }}
        tipMsg={language.TableTaskslist}
        describedBy={"i05-helper-text"}
      />
    </React.Fragment>
  );
}
