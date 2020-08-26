import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessibilityHelp from '../../components/tools/AccessibilityHelp'
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
//import SimulateButtons from "./simulate";
import Checkbox from "@material-ui/core/Checkbox";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

import FeedbackHelp from "./feedback";
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
    maxWidth: 360,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#e0e0e0!important"
  }
}));

export default function RequirementStep(props) {
  const { language, courseInformation } = props;
  const classes = useStyles();

  useEffect(() => {
    console.log("comppnentDidMountRequirments", courseInformation)
    if(courseInformation.requirements.length!=0){
       if(courseInformation.requirements[0]===undefined){
        setOtherSoftwares([])
      }else{
        setOtherSoftwares(courseInformation.requirements[0])
      }
      if(courseInformation.requirements[1]===undefined){
        setOtherHardware([])
      }else{
        setOtherHardware(courseInformation.requirements[1])
      }
    }
  }, []);

  useEffect(()=>{
    //ve si al menos uno esta en true
    console.log("REQUIREMENTS STEP",otherHardware, otherSoftwares )
      if(otherHardware){
         
          props.validate('passRequirements')
        
       
      }else if(otherSoftwares){
        
          props.validate('passRequirements')
        

      }
  })

  const [courseinformation, setcourseInformation]= useState(courseInformation)
  const [tooltipmessages, settooltipmessages] = useState({
    SaveAddHardware:language.SaveAddHardware,
    CancelAddHardware:language.CancelAddHardware,
    EditHardware:language.EditHardware,
    DeleteHardware:language.DeleteHardware,
    SaveAddSoftware:language.SaveAddSoftware,
    CancelAddSoftware:language.CancelAddSoftware,
    EditSoftware:language.EditSoftware,
    DeleteSoftware:language.DeleteSoftware

  })
  const [labelindexdelete, setlabelindexdelete]=useState("")
  const [indexdelete,  setindexdelete]=useState(0)
  const [requirementTooltip, setrequirementTooltip]= useState({
    newsoftware:language.newSoftware,
    newhardware:language.newhardware,
    AddHardware:language.AddHardware,
    AddSoftware:language.AddSoftware,
    errorMsg:language.errorMsg,
    openHardware:language.openHardware,
    openSoftware:language.openSoftware,

  })///messages

  const [open, setopen]= useState(false)
  const [message, setmessage]=useState(requirementTooltip.errorMsg)

  const [tooltipalert, settootipalert]=useState({
    hardware:false,
    software:false
  })
  const [feedbackError, setfeedbackError]=useState(false)
  const [feedbackErrorH, setfeedbackErrorH]=useState(false)
  const [controlEdit,setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });
  const [softwares,setSoftwares] = useState([
    {
      key: "OS",
      label: "Operational System",
      options: [
        { id: 0, value: "WindowsOS", label: "Widowns", isChecked: false },
        { id: 1, value: "LinuxOS", label: "Linux", isChecked: false },
        { id: 2, value: "MacOS", label: "MacOS", isChecked: false },
        { id: 3, value: "AndroidOS", label: "Android", isChecked: false },
        { id: 4, value: "iOS", label: "iOS", isChecked: false },
      ]
    },
    {
      key: "Utility",
      label: "Utility programs",
      options: [
        {
          id: 0,
          value: "LibreOffice",
          label: "Libre Office",
          isChecked: false
        },
        { id: 1, value: "MSOffice", label: "MS Office", isChecked: false }
      ]
    },
    {
        key: "DE",
        label: "Development Environment",
        options: [
          { id: 0, value: "TextEditor", label: "TextEditor (Atom, SublimeText, Notepad++, TextMate)", isChecked: false },
          { id: 1, value: "OnlineEditor", label: "OnlineEditor (CodePen, JSFiddle, Koding, PhythonFiddle)", isChecked: false },
          { id: 2, value: "VisualStudio", label: "VisualStudio", isChecked: false },
          { id: 3, value: "Eclipse", label: "Eclipse", isChecked: false },
          { id: 4, value: "NetBeans", label: "NetBeans", isChecked: false },
          { id: 5, value: "MacRabbitEspresso", label: "MacRabbitEspresso", isChecked: false },
          { id: 6, value: "BootstrapFramewor", label: "BootstrapFramewor", isChecked: false },
          { id: 7, value: "ExpressionStudioFramework", label: "ExpressionStudioFramework", isChecked: false },
          { id: 8, value: "AzureFramework", label: "AzureFramework", isChecked: false },
          { id: 9, value: "Github", label: "Github", isChecked: false },
          { id: 10, value: "BitBucket", label: "BitBucket", isChecked: false },
          { id: 11, value: "Axure", label: "Axure", isChecked: false },

        ]
      },
      {
        key: "DS",
        label: "Data Science",
        options: [
          { id: 0, value: "DataStudio", label: "DataStudio", isChecked: false },
          { id: 1, value: "R", label: "R", isChecked: false },
          { id: 2, value: "MATLAB", label: "MATLAB", isChecked: false },
          { id: 3, value: "Spreadsheet", label: "Spreadsheet", isChecked: false },
          { id: 4, value: "Tableau", label: "Tableau", isChecked: false },
          { id: 5, value: "Jupyter", label: "Jupyter", isChecked: false },
        ]
      },
      {
        key: "GD",
        label: "Graphic Design",
        options: [
          { id: 0, value: "GIMP", label: "GIMP", isChecked: false },
          { id: 1, value: "Inkscape", label: "Inkscape", isChecked: false },
          { id: 2, value: "Photoshop", label: "Photoshop", isChecked: false },
        ]
      },
      
  ]);

  const [hardware,setHardware] = useState([
    {
        key: "DS",
        label: "options",
        options: [
          { id: 0,  value: "Smartphone", label: "Smartphone", isChecked: false },
          { id: 1,  value: "Tablet", label: "Tablet", isChecked: false },
          { id: 2,  value: "SmartWatch", label: "SmartWatch", isChecked: false },
          { id: 3,  value: "PenTable", label: "PenTable", isChecked: false },
          { id: 4,  value: "ScientificCalculator", label: "ScientificCalculator", isChecked: false },
          { id: 5,  value: "FinancialCalculator", label: "FinancialCalculator", isChecked: false },
          { id: 6,  value: "GraphingCalculator", label: "GraphingCalculator", isChecked: false },
          { id: 7,  value: "DigitalCamera", label: "DigitalCamera", isChecked: false },
          { id: 8,  value: "DSLRCamera", label: "DSLRCamera", isChecked: false },
          { id: 9,  value: "3DPrint", label: "3DPrint", isChecked: false },
          { id: 10, value: "DSLRCamera", label: "DSLRCamera", isChecked: false },
          { id: 11, value: "VRHeadset", label: "VRHeadset", isChecked: false },
          { id: 12, value: "MRHeadset", label: "MRHeadset", isChecked: false },
          { id: 13, value: "SonyPSVR", label: "SonyPSVR", isChecked: false },
          { id: 14, value: "OculusRift", label: "OculusRift", isChecked: false },
          { id: 15, value: "360Camera", label: "360Camera", isChecked: false },
          { id: 16, value: "WebCam", label: "WebCam", isChecked: false }
        ]
      },
  ]);

  const [otherSoftwares,setOtherSoftwares] = useState([]);

  const [otherHardware,setOtherHardware] = useState([]);
  const [saveButton, setsaveButton]=useState(false)
  const [flagdeleteSoftware,setflagdeleteSoftware]=useState(false)
  const [flagdeleteHardware,setflagdeleteHardware]=useState(false)
  
  function softwaresCategReq(category, indexCategory) {
    return (
      <React.Fragment>
        {category.options.map((option, index) => (
          <ListItem key={category.key + "_" + index} dense>
            <Checkbox
              color="primary"
              edge="start"
              checked={option.isChecked}
              value={option.value}
              onClick={() => {
                let newSoftwares = [...softwares];
                newSoftwares[indexCategory].options[
                  index
                ].isChecked = !newSoftwares[indexCategory].options[index]
                  .isChecked;
                setSoftwares(newSoftwares);
                let addSoftwares=courseinformation;
                addSoftwares.requirements[0]=newSoftwares
                setcourseInformation(addSoftwares) 
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": `checkbox-list-label-${option.id}`
              }}
            />
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.label}
            />
          </ListItem>
        ))}
      </React.Fragment>
    );
  }

  function hardwareCategReq(category, indexCategory) {
    return (
      <React.Fragment>
        {category.options.map((option, index) => (
          <ListItem key={category.key + "_" + index} dense>
            <Checkbox
              color="primary"
              edge="start"
              checked={option.isChecked}
              value={option.value}
              onClick={() => {
                let newHardwares = [...hardware];
                newHardwares[indexCategory].options[
                  index
                ].isChecked = !newHardwares[indexCategory].options[index]
                  .isChecked;
                setHardware(newHardwares);
                let addHardwares=courseinformation;
                addHardwares.requirements[1]=newHardwares
                setcourseInformation(addHardwares)
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": `checkbox-list-label-${option.id}`
              }}
            />
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.label}
            />
          </ListItem>
        ))}
      </React.Fragment>
    );
  }

  function updateTempValue(value, type, index) {
    if(type==="software"){ ///he Unique Validation should not validate against the value of the current field.
      otherSoftwares[index].label='';
      setOtherSoftwares(otherSoftwares);
    }
    if(type==="hardware") {
      otherHardware[index].label='';
      setOtherHardware(otherHardware);
    }
    
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });

    if(value.replace(/\s/g,"") == ""){
      setsaveButton(true)
    }else{
      setsaveButton(false)
    }

    if(value!="") {
      if(type==="software"){ setfeedbackError(false)}
      else{setfeedbackErrorH(false)}
    }else{
      if(type==="software"){  setfeedbackError(true) 
        setmessage(requirementTooltip.errorMsg) }
      else{ setfeedbackErrorH(true) 
        setmessage(requirementTooltip.errorMsg)}
    }
  }

  function deleteSoftware(index) {
    let newSoftware = [...otherSoftwares];
    console.log(' newSoftware antes', newSoftware )
    if (index === 0) newSoftware = [...newSoftware.slice(1)];
    else if (index === softwares.length - 1)
      newSoftware = [...newSoftware.slice(0, index)];
    else
      newSoftware = [
        ...newSoftware.slice(0, index),
        ...newSoftware.slice(index + 1)
      ];
    setOtherSoftwares(newSoftware);
    let addNewSoftwares=courseinformation;
    addNewSoftwares.requirements[0]=newSoftware
    setcourseInformation(addNewSoftwares)
    setflagdeleteSoftware(false)
  }

  function deleteHardware(index) {
    let newHardwares = [...otherHardware];
    console.log(' newHD antes', newHardwares )
    if (index === 0) newHardwares = [...newHardwares.slice(1)];
    else if (index === hardware.length - 1)
      newHardwares = [...newHardwares.slice(0, index)];
    else
      newHardwares = [
        ...newHardwares.slice(0, index),
        ...newHardwares.slice(index + 1)
      ];
    setOtherHardware(newHardwares);
    let addNewHardwares=courseinformation;
    addNewHardwares.requirements[1]= newHardwares
    setcourseInformation(addNewHardwares)
    setflagdeleteHardware(false)
  }
  const validateSoftwares=()=>{
    let othersoftwareArray=[]
    otherSoftwares.map((audience, index)=>{
    othersoftwareArray.push(audience.label.toLowerCase())
    })
    
    let valueinOtherArray=othersoftwareArray.find((audience)=>{return audience===controlEdit.tempValue.toLowerCase() })
    if(valueinOtherArray!=undefined){
      console.log("coincide")
       setfeedbackError(true)
       setmessage(requirementTooltip.openSoftware)
       return "equal"
    }else{
        return "noequal"
    }   
  }

  const validateHardwares=()=>{
    let othershardwareArray=[]
    otherHardware.map((audience, index)=>{
    othershardwareArray.push(audience.label.toLowerCase())
    })
    
    let valueinOtherArray=othershardwareArray.find((audience)=>{return audience===controlEdit.tempValue.toLowerCase() })
    if(valueinOtherArray!=undefined){
      console.log("coincideH")
       setfeedbackErrorH(true)
       setmessage(requirementTooltip.openHardware)
       return "equal"
    }else{
        console.log("no coincide")
        return "noequal"
    }   
  }

  const handleClose = () => {  
    setopen(false)
  };
///delete dialog
const handleDeleteSoftwares = (index) => () => {
    setopen(true)
    setflagdeleteSoftware(true)
    setindexdelete(index)
    setlabelindexdelete(otherSoftwares[index].label)
 };

 const handleDeleteHardwares = (index) => () => {
  setopen(true)
  setflagdeleteHardware(true)
  setindexdelete(index)
  setlabelindexdelete(otherHardware[index].label)
};

  return (
    <div className="form-input-audiences">
      <h2>{language.CourseRequirements}</h2>
      <h3 id="soft_title">{language.Softwarerequirements}</h3>
      <div role="group" aria-labelledby="soft_title">
        <List component="ul" key={"li04"}>
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: requirementTooltip.errorMsg,
              errorType: "required",
              a11y: null
            }}
            tipMsg={requirementTooltip.AddSoftware}
            describedBy={"i02-helper-text"}
          />
          {otherSoftwares.map((software, index) => (
          <ListItem
            component="li"
            key={"li_sft" + index}
          >
          <div className="feedbackRequirement">
              <ListItemText
                  key={"li_sft" + index + "listeItemTxt"}
                  primary={software.label}
                  className={software.editing ? classes.hidden : ""}
              />
              <div className={!software.editing ? classes.hidden : ""}>
                <TextField
                  key={"li_sft" + index + "txtField"}
                  className={!software.editing ? classes.hidden : ""}
                  value={controlEdit.tempValue}
                  onChange={event => updateTempValue(event.target.value,"software",index)}
                />
                {
                  feedbackError===true?
                   <FeedbackHelp
                    validation={{
                      error: true,//feedbackError,
                      errorMsg: message,
                      errorType: "required",
                      a11y: null
                    }}
                    tipMsg={null}//{requirementTooltip.newsoftware}
                    describedBy={"i02-helper-text"}
                  />
                  :
                  undefined 
                }
                
              </div>    
          </div>
 
              <ListItemSecondaryAction key={"li_sft" + index + "secAc"}>
                {software.editing ? (
                  <React.Fragment>
                    <Tooltip title={tooltipmessages.SaveAddSoftware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditSaveSoft"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={() => {
                        let validateSoftware= validateSoftwares()
                        if(validateSoftware==="noequal"){
                          let newSoftwares = [...otherSoftwares];
                          newSoftwares[index].editing = false;
                          newSoftwares[index].label = controlEdit.tempValue;
                          setOtherSoftwares(newSoftwares);
                          let addNewSoftwares=courseinformation;
                          addNewSoftwares.requirements[0]=newSoftwares
                          setcourseInformation(addNewSoftwares)
                          setControlEdit({tempValue: "", adding: false, editing: false});
                          setfeedbackError(false)
                          console.log("save Softeare",addNewSoftwares )
                        }
                        
                      }}
                      className={classes.saveButton}
                      disabled={(controlEdit.tempValue === "" || saveButton===true)}//disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipmessages.CancelAddSoftware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditCancelSoft"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={() => {
                        if (controlEdit.adding) deleteSoftware(index);
                        else {
                          let newSoftware = [...otherSoftwares];
                          newSoftware[index].editing = false;
                          setOtherSoftwares(newSoftware);
                        }
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                    </Tooltip>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title={tooltipmessages.EditSoftware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditSoft"}
                      edge="end"
                      aria-label={"Edit software"}
                      onClick={() => {
                        let newSoftwares = [...otherSoftwares];
                        newSoftwares[index].editing = true;
                        console.log(newSoftwares);
                        setOtherSoftwares(newSoftwares);
                        setControlEdit({
                          tempValue: otherSoftwares[index].label,
                          adding: false,
                          editing: true
                        });
                      }}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipmessages.DeleteSoftware}>
                    <IconButton
                      key={"li_sft" + index + "btnDeleteSoft"}
                      edge="end"
                      onClick={ handleDeleteSoftwares(index)}
                      className={classes.deleteButton}
                    >
                      <RemoveIcon />
                    </IconButton>
                    </Tooltip>
                  </React.Fragment>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem
            key="addsoft"
            button
            onClick={() => {
                setOtherSoftwares(prev => [
                  ...prev,
                  { label: "New Software", editing: true }
                ]);

                setControlEdit({
                  tempValue: "",
                  adding: true,
                  editing: true
                });
                //setfeedbackError(true)
            }}
            id="addsoft"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other software" />
          </ListItem>
        </List>
      </div>


      <h3 id="soft_title">Hardware requirements</h3>
      <div role="group" aria-labelledby="soft_title" className="hardware">
        <List component="ul" key={"li04"}>
          <FeedbackHelp
              validation={{
                error: false,
                errorMsg: requirementTooltip.errorMsg,
                errorType: "required",
                a11y: null
              }}
              tipMsg={requirementTooltip.AddHardware}
              describedBy={"i02-helper-text"}
          />
          {otherHardware.map((hardware, index) => (
            <ListItem
              component="li"
              key={"li_sft" + index}
            >
              <div className="feedbackRequirement">
                  <ListItemText
                    key={"li_sft" + index + "listeItemTxt"}
                    primary={hardware.label}
                    className={hardware.editing ? classes.hidden : ""}
                  />   
                  <div className={!hardware.editing ? classes.hidden : ""}>
                      <TextField
                        key={"li_sft" + index + "txtField"}
                        className={!hardware.editing ? classes.hidden : ""}
                        value={controlEdit.tempValue}
                        onChange={event => updateTempValue(event.target.value, "hardware",index)}
                      />
                      {
                        feedbackErrorH===true?
                        <FeedbackHelp
                          validation={{
                            error: true,
                            errorMsg: message,
                            errorType: "required",
                            a11y: null
                          }}
                          tipMsg={null} //{requirementTooltip.newhardware}
                          describedBy={"i02-helper-text"}
                        />
                        :
                        undefined 
                      }
                      
                  </div>    
              </div>
              <ListItemSecondaryAction key={"li_sft" + index + "secAc"}>
                {hardware.editing ? (
                  <React.Fragment>
                    <Tooltip title={tooltipmessages.SaveAddHardware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditSaveSoft"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={() => {
                        let validateHardware= validateHardwares()
                        if(validateHardware==="noequal"){
                          let newHardwares = [...otherHardware];
                          newHardwares[index].editing = false;
                          newHardwares[index].label = controlEdit.tempValue;
                          setOtherHardware(newHardwares);
                          let addNewHardwares=courseinformation;
                          addNewHardwares.requirements[1]=newHardwares
                          setcourseInformation(addNewHardwares)
                          setControlEdit({ tempValue: "", adding: false, editing: false});
                          setfeedbackErrorH(false)
                          console.log("save Hardwares",addNewHardwares )
                        }
                        
                      }}
                      className={classes.saveButton}
                      disabled={(controlEdit.tempValue === "" || saveButton===true)}//disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipmessages.CancelAddHardware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditCancelSoft"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={() => {
                        if (controlEdit.adding) deleteHardware(index);
                        else {
                          let newHardwares = [...otherHardware];
                          newHardwares[index].editing = false;
                          setOtherHardware(newHardwares);
                        }
                        setControlEdit({
                          tempValue: "",
                          adding: false,
                          editing: false
                        });
                      }}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                    </Tooltip>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title={tooltipmessages.EditHardware}>
                    <IconButton
                      key={"li_sft" + index + "btnEditSoft"}
                      edge="end"
                      aria-label={"Edit hardware"}
                      onClick={() => {
                        let newHardwares = [...otherHardware];
                        newHardwares[index].editing = true;
                        console.log(newHardwares);
                        setOtherHardware(newHardwares);
                        setControlEdit({
                          tempValue: otherSoftwares[index].label,
                          adding: false,
                          editing: true
                        });
                      }}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={tooltipmessages.DeleteHardware}>
                    <IconButton
                      key={"li_sft" + index + "btnDeleteSoft"}
                      edge="end"
                      onClick={handleDeleteHardwares(index)}
                      className={classes.deleteButton}
                    >
                      <RemoveIcon />
                    </IconButton>
                    </Tooltip>
                  </React.Fragment>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem
            key="addsoft"
            button
            onClick={() => {
              setOtherHardware(prev => [
                ...prev,
                { label: "New Hardware", editing: true }
              ]);

              setControlEdit({
                tempValue: "",
                adding: true,
                editing: true
              });
             // setfeedbackErrorH(true)
            }}
            id="addsoft"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other Hardware" />
          </ListItem>
        </List>
      </div>
   

      <Dialog  disableBackdropClick={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle className="success-dialog-title" id="simple-dialog-title">Deleting Requirement</DialogTitle>
            <DialogContent className="success-dialog-content">
              <DialogContentText style={{padding: "0 1vw"}}>  You requested to delete {labelindexdelete}. Do you want to proceed?</DialogContentText>
              <WarningIcon className="warning-dialog-icon"/> 
            </DialogContent>
              <DialogActions>
                <Button onClick={() => setopen(false)} color="primary">No</Button>
                <Button variant="outlined" onClick={() => {
                  flagdeleteHardware===true? deleteHardware(indexdelete) : flagdeleteSoftware===true?  deleteSoftware(indexdelete):undefined
                  setopen(false)
                }} 
                color="primary"><em>Yes</em></Button> 
              </DialogActions>
      </Dialog>
    </div>
    
  
  );
}
