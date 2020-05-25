import React, { useState, useEffect } from "react";
import AccessibilityHelp from '../../components/tools/AccessibilityHelp'
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import Paper from "@material-ui/core/Paper";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import FeedbackHelp from "./feedback";
//import AccessibilityDialog from '../../components/accessibility/AccessibilityDialog'

//import SimulateButtons from "./simulate";
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

export default function AudienceApp(props) {
  const { handleComplete, handleSkip, completed, skiped, courseInformation } = props;
  const classes = useStyles();
  //update state of checkboxes
  useEffect(() => {
    console.log("comppnentDidMount", courseInformation, audiences)
    if(courseInformation.support.length!=0){
      setAudiences(courseInformation.support[0])
      setAudiencesGol(courseInformation.support[1])

      if(courseInformation.support[2]===undefined){
        setOtherAudiences([])
      }else{
        setOtherAudiences(courseInformation.support[2])
      }
    }

   //update accessibilty
   if(courseInformation.accessibility.length!=0){
    setaudienceTooltip(courseInformation.accessibility[0])
  }
 
  }, []); 
  //course information
  const [open, setopen]= useState(false)
  const [opensnack, setopensnack]= useState(true)
  const [feedbackError, setfeedbackError]=useState(true)
  const [labelindexdelete, setlabelindexdelete]=useState("")
  const [indexdelete,  setindexdelete]=useState(0)
  const [tooltip, settooltip]=useState(false)
  const [courseinformation, setcourseInformation]= useState(courseInformation)
  const [audiences, setAudiences] = useState([
    {
      id: 0,
      value: "StudentsGrad",
      label: "Graduate students",
      isChecked: false
    },
    {
      id: 1,
      value: "StudentsInfor",
      label: "Informal students",
      isChecked: false
    },
    {
      id: 2,
      value: "Teachers",
      label: "Teachers and Professors",
      isChecked: false
    },
    { id: 3, value: "Kids", label: "Preschool kids", isChecked: false }
  ]);
  const [audiencesGol,setAudiencesGol]=useState([
    
    {
      id: 0,
      value: "cog",
      label: "Cognitive",
      isChecked: false
    },
    {
      id: 1,
      value: "Eld",
      label: "Elderly",
      isChecked: false
    },
    {
      id: 2,
      value: "Hear",
      label: "Hearing",
      isChecked: false
    },
    {
      id: 3,
      value: "Lan",
      label: "Language",
      isChecked: false
    },
    {
      id: 4,
      value: "Spee",
      label: "Speech",
      isChecked: false
    },
    {
      id: 5,
      value: "Vis",
      label: "Visual",
      isChecked: false
    }
  ]);
  const [otherAudiences, setOtherAudiences] = useState([
  ]);
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    adding: false,
    editing: false
  });
  //tooltips
  const [audienceTooltip, setaudienceTooltip]= useState({
    audienceError: true,
    audienceallError:true,
    audiencegolError: true,
    audienceallgolError:true,
  })

  const [requirementTooltip, setrequirementTooltip]= useState({
    newaudience:"Add new audience",
    AddHardware:"Add hardwares that are mandatory to take this course.",
    AddSoftware:"Add softwares that are mandatory to take this course.",
    errorMsg:"This field is required. Please complete it",
    openHardware:"You already add this item before.",
    openSoftware:"You already add this item before.",

  })///messages
  const [message, setmessage]=useState(requirementTooltip.errorMsg)
  const handleCancelEditAudience = index => () => {
    if (controlEdit.adding) deleteAudience(index);
    else {
      let newAudiences = [...otherAudiences];
      newAudiences[index].editing = false;
      setOtherAudiences(newAudiences);
    }
    setControlEdit({ tempValue: "", adding: false, editing: false });
  };

  const handleEditedAudience = index => () => {

    let validAudiences= validateAudiences()
    if(validAudiences==="noequal"){
      let newAudiences = [...otherAudiences];
      newAudiences[index].editing = false;
      newAudiences[index].label = controlEdit.tempValue;
      setOtherAudiences(newAudiences);
      setControlEdit({ tempValue: "", adding: false, editing: false });
      let addNewAudiences=courseinformation;
      addNewAudiences.support.splice(2,3,otherAudiences)
      setcourseInformation(addNewAudiences)
      console.log('courseinformation---',courseinformation)
    }
    
  };

  function deleteAudience(index) {
    let newAudiences = [...otherAudiences];
    if (index === 0) newAudiences = [...newAudiences.slice(1)];
    else if (index === audiences.length - 1)
      newAudiences = [...newAudiences.slice(0, index)];
    else
      newAudiences = [
        ...newAudiences.slice(0, index),
        ...newAudiences.slice(index + 1)
      ];
    setOtherAudiences(newAudiences);
    let addNewAudiences=courseinformation;
    addNewAudiences.support.splice(2,3,newAudiences)
    setcourseInformation(addNewAudiences)
    console.log('courseinformation---',courseinformation)
  }

  const handleDeleteAudience = (index) => () => {
     setopen(true)
     setindexdelete(index)
     setlabelindexdelete(otherAudiences[index].label)
   
  };

  const handleNewAudience = () => {
    let pass= numberAudiences()
    console.log("pass****",pass)
    if(pass==="valid"){
      setOtherAudiences(prev => [
        ...prev,
        { label: "New Audience", editing: true }
      ]);
  
      setControlEdit({
        tempValue: "",
        adding: true,
        editing: true
      }); 
    }else{
      console.log("aqui va toolTip")
      settooltip(true)
      setmessage("No more than 5 options.")
      setControlEdit({
        tempValue: "",
        adding: false,
        editing: false
      });
    }
     
  };

  const handleEditAudience = index => () => {
    let newAudiences = [...otherAudiences];
    newAudiences[index].editing = true;

    setOtherAudiences(newAudiences);
    setControlEdit({
      tempValue: otherAudiences[index].label,
      adding: false,
      editing: true
    });
  };

  const handleCheck = (index) => {
      let newAudiences = [...audiences];
      newAudiences[index].isChecked = !newAudiences[index].isChecked;
      setAudiences(newAudiences);
      let addAudicences=courseinformation;
      addAudicences.support.splice(0, 1, newAudiences)
      setcourseInformation(addAudicences) 

      let tooltip=audienceTooltip;
      if(newAudiences[index].isChecked===true){
        tooltip.audienceError=false;
        setaudienceTooltip(tooltip)
        let checks=courseinformation;
        checks.accessibility.splice(0, 1, tooltip)
        setcourseInformation(checks)
      }else if (newAudiences[index].isChecked===false){
        tooltip.audienceError=true;
        setaudienceTooltip(tooltip)
        let checks=courseinformation;
        checks.accessibility.splice(0, 1, tooltip)
        setcourseInformation(checks)
      }
      let count=0;
      audiences.map((audience, index)=>{
        if(audience.isChecked===true){
          count++;
          tooltip.audienceError=false;
          setaudienceTooltip(tooltip)
          console.log("count", count,audiences.length)
          if(count===audiences.length){ 
            tooltip.audienceallError=false;
            setaudienceTooltip(tooltip)
            let checks=courseinformation;
            checks.accessibility.splice(0, 1, tooltip)
            setcourseInformation(checks)
          }
        }else{
          tooltip.audienceallError=true;
          setaudienceTooltip(tooltip)
          let checks=courseinformation;
          checks.accessibility.splice(0, 1, tooltip)
          setcourseInformation(checks)
        }
      })
     
  };


  const handleCheckGol = (index) => {
    let newAudiences = [...audiencesGol];
    newAudiences[index].isChecked = !newAudiences[index].isChecked;
    setAudiencesGol(newAudiences);
    let addAudicencesGol=courseinformation;
    addAudicencesGol.support.splice(1, 2, newAudiences)
    setcourseInformation(addAudicencesGol) 
    
    console.log("pone ne verde tooltip")
    let tooltip=audienceTooltip;
    if(newAudiences[index].isChecked===true){
      tooltip.audiencegolError=false;
      setaudienceTooltip(tooltip)
      let checksgol=courseinformation;
      console.log("checksgol",checksgol)
      checksgol.accessibility.splice(2, 3, tooltip)
      setcourseInformation(checksgol)
    }else if (newAudiences[index].isChecked===false){
      tooltip.audiencegolError=true;
      setaudienceTooltip(tooltip)
      let checksgol=courseinformation;
      console.log("checksgol",checksgol)
     checksgol.accessibility.splice(0, 1, tooltip)
     setcourseInformation(checksgol)
    }
    //save to database 
    
    ///
    let count=0;
    audiencesGol.map((audience, index)=>{
      if(audience.isChecked===true){
        count++;
        tooltip.audiencegolError=false;
        setaudienceTooltip(tooltip)
        console.log("count", count,audiences.length)
        if(count===audiencesGol.length){
          
          tooltip.audienceallgolError=false;
          setaudienceTooltip(tooltip)
        }
      }else{
        tooltip.audienceallgolError=true;
        setaudienceTooltip(tooltip)
      }
    })
    
  };

  function updateTempValue(value) {
    setControlEdit(prev => {
      return { ...prev, tempValue: value };
    });
    if(value!="") {
       setfeedbackError(false)
    }
    else{ setfeedbackError(true)}

    setmessage(requirementTooltip.errorMsg)
  }
  //methods for validations no repeated values
  const validateAudiences=()=>{
    let audiencesArray=[]
    let otheraudiencesArray=[]
    audiences.map((audience, index)=>{
      audiencesArray.push(audience.label.toLowerCase())
    })
    otherAudiences.map((audience, index)=>{
      otheraudiencesArray.push(audience.label.toLowerCase())
    })
    let valueinArray=audiencesArray.find((audience)=>{return audience===controlEdit.tempValue.toLowerCase() })
    let valueinOtherArray=otheraudiencesArray.find((audience)=>{return audience===controlEdit.tempValue.toLowerCase() })
    if((valueinArray!=undefined) || (valueinOtherArray!=undefined)){
      if(valueinArray===undefined){
        console.log("coincide",valueinOtherArray )
        //setmessage(`You already add ${valueinOtherArray} before.`)
        //setopensnack(true)
        //settooltip(true)
        setfeedbackError(true)
        setmessage(requirementTooltip.openSoftware)
        return "equal"
      }else{
        //setmessage(`${valueinArray} already exist in the list of audiences. Please, select it from the list.`)
        //setopensnack(true)
        //settooltip(true)
        return "equal"
        
      }
    }else{
      console.log("no coincide")
      return "noequal"
    }   
  }
  //methods for validate only five Audiences
  const numberAudiences=()=>{
    let numberAudiences=otherAudiences.length;
    if (numberAudiences>=5){
      return "invalid"
    }else return "valid"
  }

  const handleClose = () => {  
      setopen(false)
  };

  function handleClosesnack(){
      settooltip(false)
  }

  function SnackbarAudiences(){
    return(
      <Snackbar
          key={Math.random()}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}
          open={opensnack}
          autoHideDuration={19000}
          //onClose={handleClose("snack")}
          message={message}
          action={
          <React.Fragment>
              <IconButton
              aria-label="close"
              color="inherit"
             // className={classes.close}
              onClick={handleClosesnack}
              >
              <CloseIcon />
              </IconButton>
          </React.Fragment>
          }
      />
    )

  }


  return (
    <div className="form-input-audiences">

      {/*  <SimulateButtons
        handleComplete={handleComplete}
        handleSkip={handleSkip}
        completed={completed}
        skiped={skiped}
      />  */}
      <h2 id="aud_title">Audience</h2>
      <h3 id="aud_title">Intended Audience</h3>
      <div role="group" aria-labelledby="aud_title">

        <List component="ul" key={"li03"}>
       {/*  <AccessibilityHelp id='audiences-radiogroup' error={audienceTooltip.audienceallError} tip={"Select all options"}/> */}
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "a11y",
              a11y: { valid: !audienceTooltip.audienceallError }
            }}
            tipMsg="Select all options."
            describedBy={"i04-helper-text"}     
          />
          <ListItem key="aud_SelectAll" dense>
            <Checkbox
              color="secondary"
              edge="start"
              checked={
                !audiences.some(audience => audience.isChecked === false) 
              }
              // value={audience.value}
              onClick={event => {
                let newAudiences = [...audiences];
                newAudiences.forEach(
                  audience => (audience.isChecked = event.target.checked)
                );
                setAudiences(newAudiences);
                let tooltip=audienceTooltip;
                 if(event.target.checked===true){
                  tooltip.audienceallError=false;
                  tooltip.audienceError=false;
                  setaudienceTooltip(tooltip)
                  let checks=courseinformation;
                  checks.accessibility.splice(0, 1, tooltip)
                  setcourseInformation(checks)
                }else{
                  tooltip.audienceallError=true;
                  tooltip.audienceError=true;
                  setaudienceTooltip(tooltip)
                  let checks=courseinformation;
                  checks.accessibility.splice(0, 1, tooltip)
                  setcourseInformation(checks)
                } 
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": "checkbox-list-label-selectAll"
              }}
            />
            {/* </ListItemIcon> */}
            <ListItemText
              id="checkbox-list-label-selectAll"
              primary="Select All"
            />
          </ListItem>
{/*           <AccessibilityHelp id='audiences-radiogroup' error={audienceTooltip.audienceError} tip={"	Select your target audience. You can select as many as you want. You can also add others target audience not listed above, by selecting 'Add Audience' button."}/>
 */}      
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "a11y",
              a11y: { valid: !audienceTooltip.audienceError }
            }}
            tipMsg="Select your target audience. You can select as many as you want. You can also add others target audience not listed, by selecting 'Add Audience' button."
            describedBy={"i04-helper-text"}     
          /> 
          {audiences.map((audience, index) => (
            <ListItem key={audience.id} dense>
              {/* <ListItemIcon> */}
              <Checkbox
                color="primary"
                edge="start"
                checked={audience.isChecked}
                value={audience.value}
                onClick={() => handleCheck(audience.id)}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${audience.id}`
                }}
              />
              {/* </ListItemIcon> */}
              <ListItemText
                id={`checkbox-list-label-${audience.id}`}
                primary={audience.label}
              />
            </ListItem>
          ))}
          
          {otherAudiences.map((audience, index) => (
            <ListItem
              // button={!audience.editing}
              component="li"
              key={"li_aud" + index}
            >
              <ListItemText
                key={"li_aud" + index + "listeItemTxt"}
                primary={audience.label}
                className={audience.editing ? classes.hidden : ""}
              />
              
              <div className={!audience.editing ? classes.hidden : ""}>
                <TextField
                  key={"li_aud" + index + "txtField"}
                  className={!audience.editing ? classes.hidden : ""}
                  value={controlEdit.tempValue}
                  onChange={event => updateTempValue(event.target.value)}
                />
                <FeedbackHelp
                    validation={{
                      error: feedbackError,
                      errorMsg: message,
                      errorType: "required",
                      a11y: null
                    }}
                    tipMsg={requirementTooltip.newaudience}
                    describedBy={"i02-helper-text"}
                    /* stepHelp={{
                      step: "textHelper",
                      stepLabel: "a title"
                    }} */
                  />
              </div>

              <ListItemSecondaryAction key={"li_aud" + index + "secAc"}>
                {audience.editing ? (
                  <React.Fragment>
                    <IconButton
                      key={"li_aud" + index + "btnEditSaveUnit"}
                      edge="end"
                      aria-label={"Save changes"}
                      onClick={handleEditedAudience(index)}
                      className={classes.saveButton}
                      disabled={controlEdit.tempValue === ""}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      key={"li_aud" + index + "btnEditCancelUnit"}
                      edge="end"
                      aria-label={"Cancel changes"}
                      onClick={handleCancelEditAudience(index)}
                      className={classes.deleteButton}
                    >
                      <ClearIcon />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <IconButton
                      key={"li_aud" + index + "btnEditUnit"}
                      edge="end"
                      aria-label={"Edit unit name"}
                      onClick={handleEditAudience(index)}
                      disabled={controlEdit.editing}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      key={"li_aud" + index + "btnDeleteUnit"}
                      edge="end"
                      onClick={handleDeleteAudience(index, 'nodelete')}
                      className={classes.deleteButton}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </React.Fragment>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          
          <ListItem
            key="addaudience"
            button
            onClick={handleNewAudience}
            id="addaudience"
            disabled={controlEdit.editing}
            className={classes.addButton}
          >
            <AddIcon /> <ListItemText primary="Add other audience" />
          </ListItem>

        </List>
      </div>
     
      <h3 id="aud_title"><h3 id="aud_title">Inclusion Goals</h3></h3>
      <div role="group" aria-labelledby="aud_title2">
        <List component="ul" key={"li03"}>
          <FeedbackHelp
            validation={{
              error: false,
              errorMsg: "",
              errorType: "a11y",
              a11y: { valid: !audienceTooltip.audienceallgolError }
            }}
            tipMsg="Select all options."
            describedBy={"i04-helper-text"}     
          />
          <ListItem key="aud_SelectAll2" dense>
            <Checkbox
              color="secondary"
              edge="start"
              checked={
                !audiencesGol.some(audience => audience.isChecked === false)
              }
              onClick={event => {
                let newAudiences = [...audiencesGol];
                newAudiences.forEach(
                  audience => (audience.isChecked = event.target.checked)
                );
                setAudiencesGol(newAudiences);
                console.log(event.target.checked)
                let tooltip=audienceTooltip;
                 if(event.target.checked===true){
                  tooltip.audienceallgolError=false;
                  tooltip.audiencegolError=false;
                  setaudienceTooltip(tooltip)
                }else{
                  tooltip.audienceallgolError=true;
                  tooltip.audiencegolError=true;
                  setaudienceTooltip(tooltip)
                } 
              }}
              disableRipple
              inputProps={{
                "aria-labelledby": "checkbox-list-labelGol-selectAll"
              }}
            />
            {/* </ListItemIcon> */}
            <ListItemText
              id="checkbox-list-labelGol-selectAll"
              primary="Select All"
            />
          </ListItem>
{/*           <AccessibilityHelp id='audiences-radiogroup' error={audienceTooltip.audiencegolError} tip={"If you desire to validate the inclusion of your course for some specific diversity group, select them from the list above. You can select as many as you want."}/>
 */}       <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "a11y",
                a11y: { valid: !audienceTooltip.audiencegolError}
              }}
              tipMsg="If you desire to validate the inclusion of your course for some specific diversity group, select them from the list below . You can select as many as you want."
              describedBy={"i04-helper-text"}     
            />
          {audiencesGol.map((audienceGol, index) => (
            <ListItem key={audiences.id} dense>
              <Checkbox
                color="primary"
                edge="start"
                checked={audienceGol.isChecked}
                value={audienceGol.value}
                onClick={() => handleCheckGol(audienceGol.id)}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkboxgol-list-label-${audienceGol.id}`
                }}
              />
              {/* </ListItemIcon> */}
              <ListItemText
                id={`checkboxgol-list-label-${audienceGol.id}`}
                primary={audienceGol.label}
              />
            </ListItem>
          ))}
        </List>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle className="success-dialog-title" id="simple-dialog-title">Deleting audience</DialogTitle>
            <DialogContent className="success-dialog-content">
              <DialogContentText style={{padding: "0 1vw"}}>  You requested to delete {labelindexdelete}. Do you want to proceed?</DialogContentText>
              <WarningIcon className="warning-dialog-icon"/> 
            </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setopen(false)} color="primary">No</Button>
                    <Button onClick={() => {
                      //setdeleteDialog(true)
                      deleteAudience(indexdelete);
                      setopen(false)
                    }} 
                    color="primary"><em>Yes</em></Button> 
                  </DialogActions>
      </Dialog>

        {
          /* tooltip===true?
          <SnackbarAudiences/>
          :
          undefined */
        }
        

    </div>
    
  );
}
