import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import React ,{useEffect} from "react";
import FeedbackHelp from "../feedback";
import tableIcons from '../design/icons'


const useStyles = makeStyles(theme => ({}));

export default function Presentation(props) {
  const {handleSelectResourcesIntoLessons,lessonIndex,type, language,courseInformation,handleSelectResources, parentIndex, tools}=props

  useEffect(()=>{
    if(type==='lessonInto'){
      let update=state;
      update.data=courseInformation[parentIndex].lessons[lessonIndex].tools[3].items;
      setState(update) 
    }else{
      let update=state;
      update.data=courseInformation[parentIndex].tools[3].items;
     setState(update) 
    }
  },[])
  const classes = useStyles();

  const itemsTypes = { 1: "file (ex: ppt, pdf)", 2: "h5p", 3: "other" };

  function selectOptions(options) {
    let rows = [];
    for (let [key, value] of Object.entries(options)) {
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
        title: "Title",
        field: "title",
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
        lookup: itemsTypes,
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
              name="presType"
              inputProps={{
                id: "presType-"
              }}
            >
              {selectOptions(itemsTypes)}
            </NativeSelect>
          );
        }
      },
      { title: "External Resource", field: "external", type: "boolean" },
      {
        title: "External URL",
        field: "url",
        editComponent: props => (
          <TextField
            type="url"
            inputProps={{
              pattern:
                "/https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/"
            }}
            required={!props.rowData.external}
            disabled={!props.rowData.external}
            error={
              props.rowData.external &&
              !props.value &&
              props.rowData.validateInput &&
              props.rowData.submitted
                ? props.rowData.error
                : false
            }
            helperText={
              props.rowData.external &&
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
      }
    ],
    data: [
      
    ]
  });

  return (
    <React.Fragment>
      <MaterialTable
        title={language.Presentations}
        options={{ search: true }}
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
              newData.submitted = true;
              if (!newData.title) {
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
                data.push(newData);
                let tool=tools;
                if(type==='lessonInto'){
                 // tool[lessonIndex][3].items=data;
                 handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 3)
                }else{
                  tool[3].items=data;
                  handleSelectResources(parentIndex, tool)
                }
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
                    data[data.indexOf(oldData)] = newData;
                    let tool=tools;
                    if(type==='lessonInto'){
                     // tool[lessonIndex][3].items=data;
                     handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 1)
                    }else{
                      tool[3].items=data;
                      handleSelectResources(parentIndex, tool)
                    }
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
                  let tool=tools;
                  if(type==='lessonInto'){
                    //tool[lessonIndex][3].items=data;
                    handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 3)
                  }else{
                    tool[3].items=data;
                    handleSelectResources(parentIndex, tool)
                  }
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
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
            emptyDataSourceMessage: language.Nopresentation
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
        tipMsg={language.PresentationMaterial}
        describedBy={"i05-helper-text"}
      />
    </React.Fragment>
  );
}
