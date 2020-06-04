import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import React,{useEffect} from "react";
import FeedbackHelp from "../feedback";

import tableIcons from '../design/icons'




  const useStyles = makeStyles(theme => ({}));
export default function Presentation(props) {

  useEffect(()=>{
    setState(prev=>{
      //let Resdata=[... prev.data];
      let Restoredata=courseInformation[parentIndex].tools[1].items;
      return {... prev, Restoredata}
    })

  },[])
  const {courseInformation,handleSelectResources, parentIndex, tools}=props
  console.log("propsenGamesTable****",props)

  
  const classes = useStyles();
  const { supplementary } = props;
  const itemsTypes = { 1: "unity", 2: "h5p", 3: "other" };

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
                name="gameType"
                inputProps={{
                  id: "gameType-"
                }}
              >
                {selectOptions(itemsTypes)}
              </NativeSelect>
          
          );
        }
      },
      {
        title: "External Resource",
        field: "external",
        type: "boolean",
         editComponent: props => (
       
            <Checkbox
              {...props}
              disabled={props.rowData.type != 3}
              onChange={e => {
                props.rowData.external=e.target.checked;
                props.onChange(e.target.checked);
              }}
            />
         
        ) 
      },
      {
        title: "External URL",
        field: "url",
        editComponent: props => (
          <React.Fragment>
            <TextField
              type="url"
              inputProps={{
                pattern:
                  "/https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/"
              }}
              required={!props.rowData.external}
              disabled={props.rowData.type==='3'? false:!props.rowData.external?true:false}
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
          </React.Fragment>
        )
      }
    ],
    data: [
      {
        title: "Some unity game",
        type: 1,
        external: false,
        url: "",
        validateInput: true,
        submitted: true,
        error: false,
        label: "",
        helperText: ""
      },
      {
        title: "Some h5p game",
        type: 2,
        external: false,
        url: "",
        validateInput: true,
        submitted: true,
        error: false,
        label: "",
        helperText: ""
      },
      {
        title: "Some external game",
        type: 3,
        external: true,
        url: "https://www.minecraft.net/en-us/",
        validateInput: true,
        submitted: true,
        error: false,
        label: "",
        helperText: ""
      }
    ]
  });

  return (
    <React.Fragment>
      <MaterialTable
       icons={tableIcons}
        title="Games"
        options={{ search: true }}
        columns={state.columns}
        data={state.data}
     
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
              newData.submitted = true;
              if (!newData.title) {
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
                data.push(newData);
                console.log("save",newData)
               // save to databse
                let tool=tools;
                tool[1].items=data;
                handleSelectResources(parentIndex, tool)
                return { ...prevState, data };
              });
              
               }, 600);
            }),



          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                if (!newData.title) {
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
                    let tool=tools;
                    tool[1].items=data;
                    handleSelectResources(parentIndex, tool)
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
                  tool[1].items=data;
                  handleSelectResources(parentIndex, tool)
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
            emptyDataSourceMessage: "No games"
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
