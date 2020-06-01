import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import React from "react";
import Resources from "./resources";
import FeedbackHelp from "../feedback";

const useStyles = makeStyles(theme => ({}));

export default function ActivityDesign(props) {
  const classes = useStyles();
  const { activities, handleActivities, parentIndex, template } = props;

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
                ? "Required"
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
    console.log("handleSelectResources");
    let prev = [...state.data];
    console.log(prev);
    prev[activityIndex].tools = resources;
    console.log(prev);

    // setData(prev);

    // setState(prevState => {
    //   return { ...prevState, prev };
    // });

    handleActivities(parentIndex, prev);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title="Tasks list"
        options={{ search: false }}
        columns={state.columns}
        data={state.data}
        icons={{
          Add: () => (
            <Button
              id="addRow"
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Add task
            </Button>
          )
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                if (!newData.activity) {
                  newData.error = true;
                  newData.label = "required";
                  newData.helperText = "Name is required.";
                  newData.validateInput = true;
                  reject();
                  return;
                }
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  console.log("aqui");
                  data.push(newData);
                  handleActivities(parentIndex, data);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                if (!newData.activity) {
                  newData.error = true;
                  newData.label = "required";
                  newData.helperText = "Name is required.";
                  newData.validateInput = true;
                  reject();
                  return;
                }
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
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
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
        detailPanel={
          template !== "without"
            ? [
                {
                  tooltip: "Show task resources",
                  render: rowData => {
                    return (
                      <Resources
                        tools={rowData.tools}
                        key={"act"}
                        handleSelectResources={handleSelectResources}
                        parentIndex={parentIndex}
                      />
                    );
                  }
                }
              ]
            : null
        }
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
        tipMsg="instructions"
        describedBy={"i05-helper-text"}
      />
    </React.Fragment>
  );
}
