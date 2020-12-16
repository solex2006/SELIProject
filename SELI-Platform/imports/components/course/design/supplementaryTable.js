import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import NativeSelect from "@material-ui/core/NativeSelect";
import FeedbackHelp from "../feedback";
import tableIcons from '../design/icons'
import {onlySpaces} from '../../../../lib/textFieldValidations';
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({}));

export default function SupplementaryTexts(props) {
  const {language,handleSelectResourcesIntoLessons,lessonIndex,type, handleSelectResourcesLessons,courseInformation,handleSelectResources, parentIndex, tools}=props

  useEffect(()=>{
    if(type==='lessonInto'){
      setState(prevState=>{
        return {
          ...prevState,
          data: courseInformation[parentIndex].lessons[lessonIndex].tools[4].items,
        }
      })
    } else {
      setState(prevState=>{
        return {
          ...prevState,
          data: courseInformation[parentIndex].tools[4].items,
        }
      })
    }
  }, [])

  const classes = useStyles();


  const suplementaryItemsTypes = [language.paper, language.book, language.other];
  const copyTypes = [language.digital, language.printed];

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
        title: language.title,
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
                ? language.required
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
        title: language.audiencetype,
        field: "type",
        lookup: suplementaryItemsTypes,
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
              name="suppType"
              inputProps={{
                id: "suppType-"
              }}
            >
              {selectOptions(suplementaryItemsTypes)}
            </NativeSelect>
          );
        }
      },
      {
        title: language.CopyVersion,
        field: "copy",
        lookup: copyTypes,
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
              name="copyType"
              inputProps={{
                id: "copyType-"
              }}
            >
              {selectOptions(copyTypes)}
            </NativeSelect>
          );
        }
      },
      
      { 
        title: language.ExternalResource,
        field: "external", 
        type: "boolean" ,
        editComponent: props => (
          <Checkbox
            {...props}
            checked={(props.rowData.type ==='2' || props.rowData.copy ==='1')?  true :props.rowData.external ===true}
            disabled={(props.rowData.type ==='2' || props.rowData.copy ==='1')?  true: false}//  
            onChange={e => {
              console.log("xxxxxxxxxxxxxsup",props, e.target.checked)
              props.rowData.external=e.target.checked;
              props.onChange(e.target.checked);
              if(props.rowData.external===false){
                props.rowData.reference="";
              }
            }}
          />
       
      ) 
        
      },
      
      {
        title: language.ExternalURL,
        field: "url",
        editComponent: props => (
          <TextField
            type="url"
            inputProps={{
              pattern:
                "/https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/"
            }}
            //required={!props.rowData.external}
            disabled={((props.rowData.copy==='1') || (props.rowData.external===true))?false: !props.rowData.external}
            error={
             // console.log("dssdfdsfsdf",props)
              
                 ((props.rowData.copy==='1') || (props.rowData.external===true)) ?
                true:
                false 
            }
            helperText={
              ((props.rowData.copy==='1') || (props.rowData.external===true)) ?
              "External URL cannot be empty":
              ""
            }
            value={props.rowData.external===false? ''  :props.value ? props.value : "" }
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
        title: "External Reference",
        field: "reference",
        //validate: (props.rowData) => rowData.reference === '' ? 'External refere cannot be empty' : '',
        editComponent: props => (
          <TextField
            type="text"
            required={!props.rowData.external}
            disabled={ (props.rowData.type ==='2' || props.rowData.copy ==='1')?  false : !props.rowData.external}
            error={
             //console.log("propssssss",props, props.rowData)
             (props.rowData.copy==='1' || props.rowData.type==='2') ?
             true:
             false
             
            }
            helperText={
              (props.rowData.copy==='1' || props.rowData.type==='2') ?
             "External reference cannot be empty":
             ""
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
      
    ],
    data: [
     
    ],
    options:[
     { sorting: true}
    ]
  });

  return (
    <React.Fragment>
      <MaterialTable
        title={language.SupplementaryText}
        options={{ search: true, actionsColumnIndex: 6 }}
        columns={state.columns}
        data={state.data}
        icons={tableIcons(language.Additem)}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              console.log("save---",newData)
              if((newData.copy!=undefined && newData.copy==='1') && (newData.external!=undefined && newData.external===true) && (newData.url===undefined || newData.url===''  || newData.reference===undefined || newData.reference==='' )){reject(); return;}
              if((newData.type!=undefined && newData.type==='2') && (newData.external!=undefined && newData.external===true) && (newData.url===undefined || newData.url===''  || newData.reference===undefined || newData.reference==='' )){reject(); return;}
              if((newData.copy!=undefined && newData.copy==='1') && (newData.url!=undefined  || newData.reference!=undefined )){newData.external=true}
              if((newData.type!=undefined && newData.type==='2') ){newData.external=true}
              if((newData.copy!=undefined && newData.copy==='1') && (newData.url===undefined || newData.url===''  || newData.reference===undefined || newData.reference==='' )){reject(); return;}
              
              
              if(((newData.type!=undefined && newData.type==='2' ) || (newData.copy!=undefined && newData.copy==='1')) && (newData.reference!=undefined && newData.reference!='')){console.log("pasa")}
              else if( (newData.copy!=undefined && newData.copy==='1') && (newData.external!=undefined && newData.external===true) && (newData.url!=undefined && newData.url!='' )){console.log("pasa")}
              else if( (newData.external!=undefined && newData.external===true) && (newData.url!=undefined && newData.url!='' ) && 
              ((newData.type===undefined ) && (newData.type===undefined)) ){console.log("pasa")}
              else if((newData.copy!=undefined && newData.copy==='1') && (newData.external!=undefined && newData.external===true) && (newData.url!=undefined && newData.url!='' ) && (newData.reference!=undefined && newData.reference!='' )){console.log("pasa")}
              else if( 
                (newData.type===undefined && newData.copy===undefined && newData.external===undefined) ||
                ((newData.type!=undefined && newData.type!='2') && newData.copy===undefined && newData.external===undefined) ||
                ((newData.copy!=undefined && newData.copy!='1') && newData.type===undefined && newData.external===undefined) ||
                (newData.type===undefined && newData.copy===undefined && (newData.external!=undefined && newData.external===false)) ||
                (((newData.type!=undefined && newData.type!='2') && newData.copy!=undefined && newData.copy!='1')) && (newData.external!=undefined && newData.external===false)){console.log("pasa")}
             else if((newData.type!=undefined && (newData.type!='2')) && (newData.external!=undefined && newData.external===false)){console.log("pasa")}
             else if((newData.type!=undefined && (newData.type==='1')) && (newData.external!=undefined && newData.external===true) && (newData.url!=undefined && newData.url!='')){console.log("pasa")}
             else if((newData.type!=undefined && (newData.type==='0')) && (newData.external!=undefined && newData.external===true) && (newData.url!=undefined && newData.url!='')){console.log("pasa")}
                else{reject(); return;}


              (newData.type!=undefined && newData.type!='2' ) || (newData.copy!=undefined && newData.copy!='1') || (newData.reference!=undefined && newData.reference!='')
             

              if(newData.external===false){newData.url='' ; newData.reference=""}
              newData.submitted = true;
              if(newData.type===undefined){newData.type="1"}
              if(newData.copy===undefined){newData.copy="0"}
              setTimeout(() => {
              if (!newData.title || onlySpaces(newData.title)) {
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
                  //tool[lessonIndex][4].items=data;
                  handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 4)
                }else{
                  tool[4].items=data;
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
                if(newData.external===false){newData.url=''}
                if (!newData.title || onlySpaces(newData.title)) {
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
                      //tool[lessonIndex][4].items=data;
                      handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 4)
                    }else{
                      tool[4].items=data;
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
                   // tool[lessonIndex][4].items=data;
                   handleSelectResourcesIntoLessons(parentIndex,data, lessonIndex, 4)
                  }else{
                    tool[4].items=data;
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
            labelRowsSelect: language.rows,
            firstAriaLabel: language.firstPage,
            firstTooltip: language.firstPage,
            previousAriaLabel: language.previousPage,
            previousTooltip: language.previousPage,
            nextAriaLabel: language.nextPage,
            nextTooltip: language.nextPage,
            lastAriaLabel: language.lastPage,
            lastTooltip: language.lastPage
          },
          toolbar: {
            // nRowsSelected: '{0} row(s) selected'
          },
          header: {
            actions: "" //removed title of action column
          },
          body: {
            emptyDataSourceMessage: language.noSupplementary,
            addTooltip: language.add,
            deleteTooltip: language.delete,
            editTooltip: language.edit,
            editRow: {
              deleteText: `${language.deleteItemBelow}, ${language.wantProceed}`,
              cancelTooltip: language.cancel,
              saveTooltip: language.save
            }
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
        tipMsg={language.SuplemantaryMaterial}
        describedBy={"i05-helper-text"}
      />
    </React.Fragment>
  );
}
