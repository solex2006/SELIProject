import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FeedbackHelp from "./feedback";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  
  textInput: {
			display: 'flex'
	},
  nested: {
    paddingLeft: theme.spacing(4),
  },
  Behavioral:{
    marginBottom:'15px'
  },
  inputText:{
    display: 'block',
    width:'100%'
  },
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
      // width: "100ch"
    }
  },
  psychomotorDomain:{
    marginBottom: '15px',
    width:'100%'
  },
  affectiveDomain:{
    marginBottom: '15px',
    marginTop:'15px'
  },
  hidden: {
    display: "none"
  },
  formGroup: {
      marginTop: theme.spacing(2)
	},
  listBullet: {
    listStyleType: "disc",
    display: "list-item"
  },
  listItem: {
    flex: "0.2",
   // minWidth: "100px"
   width:'100%'
  },
  addButton: {
    color: theme.palette.secondary.main
  },
  deleteButton: {
    "&:hover": {
      backgroundColor: "#d91e1822"
      //color: "#d91e18"
    }
  },
  saveButton: {
    "& $saveButton:hover": {
      backgroundColor: "#00897b22"
      //color: "#d91e18"
    }
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  }
}));

export default function AnalysisStep(props) {
  const {courseInformation,language } = props;
  useEffect(()=>{
    console.log("courseInformationAnalysisStep y Accesibility", courseInformation,courseInformation.accessibility )
    //updatemodalityradiobutton
    setmodality(courseInformation.analysis[1]);
    //updatetextEditor
    setpedagogical(courseInformation.analysis[2]);
    //update the tooltips
    if(courseInformation.accessibility[2]!=undefined){
      setanalysisTooltip(courseInformation.accessibility[2])
      if(courseInformation.accessibility[2]!=''){
        let newAnalysis=analysisTooltip;
        newAnalysis.pedagogical=false;
        setanalysisTooltip(newAnalysis)
      }
    }
    if(courseInformation.analysis[3]!=undefined){
      setGoals(courseInformation.analysis[3])
      Object.entries(courseInformation.analysis[3]).forEach(([key, value]) => {      
          if(value.length!=0){
            let newAnalysis=analysisTooltip;
            newAnalysis.learningobjectives=false;
            setanalysisTooltip(newAnalysis)
          } 
      });
    }
    if(courseInformation.analysis[4]!=undefined){
      setOutcomes(courseInformation.analysis[4])
      if(courseInformation.analysis[4].contents.length!=0 && courseInformation.analysis[4].skills.length!=0 && courseInformation.analysis[4].values.length!=0){
        let newAnalysis=analysisTooltip;
        newAnalysis.outcomes=false;
        setanalysisTooltip(newAnalysis)
     } 
    }
    if(courseInformation.analysis[5]!=undefined){
      setaffectiveDomain(courseInformation.analysis[5])
    }
    if(courseInformation.analysis[6]!=undefined){
      setpsychomotorDomain(courseInformation.analysis[6])
    }
  },[])

  

  useEffect(()=>{// 
    console.log("INFO cOURSE Analysis:modality, pedagogical,constraints",modality, pedagogical,analysisTooltip)
        if(pedagogical!=undefined  &&
           analysisTooltip.learningobjectives===false  && analysisTooltip.outcomes===false &&  analysisTooltip.pedagogical===false ){
            props.validate('passCourseAnalysis')
        } else{
          props.validate('NopassCourseAnalysis')
        }
        /* if(modality===undefined || pedagogical==='' || 
           analysisTooltip.learningobjectives===true  || analysisTooltip.outcomes===true){
           props.validate('NopassCourseAnalysis')    
        } */
  })
  const [saveButton, setsaveButton]=useState(false)
  const [openT, setOpenT] = React.useState(false);
  const [openA, setOpenA] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [openI, setOpenI] = React.useState(false);
  const [analysisTooltip, setanalysisTooltip]= useState({
    pedagogical: true,
    modality: true,
    learningobjectives: true,
    outcomes:true,
    learningobjectivesCount: true,
    outcomesCount:true,
  })
  const [courseinformation, setcourseInformation]=useState(courseInformation)
  const [modality, setmodality]=useState('');
  const [pedagogical, setpedagogical]=useState('');
  const [affectiveDomain, setaffectiveDomain]=useState('');
  const [psychomotorDomain, setpsychomotorDomain]=useState('');
  //for save he accesibility status

  const [typetodelete ,settypetodelete]=useState('');
  const classes = useStyles();
  const [data, setData] = useState({
    courseTitle: "Computer Science 101",
    courseSubTitle: "Programming with a Purpose",
    learningGoals: [],
    audience: ["Graduatade students", "Teachers and Professors"],
    inclusion: ["elderly"],
    constraints: ["Calcule I", "Math"]
  });
  const [controlEdit, setControlEdit] = useState({
    tempValue: "",
    tempAuxValue: "",
    adding: false,
    editing: false
  });
  const [feedbackError, setfeedbackError]=useState(true)
  const [feedbackErrorLearningO, setfeedbackErrorLearningO]=useState(true)
  const [constraints, setConstraints] = useState([
  ]);

  
  const [goals, setGoals] = useState({
    remembering: [],
    understanding: [],
    applying: [],
    analyzing: [],
    evaluating: [],
		creating: []
	});


  const [goalsTaxonomy, setGoalsTaxonomy] = useState({
    remembering: [
			{ key: "duplicate", label: language.toDuplicate },
			{ key: "match", label: language.toMatch },
			{ key: "describe", label: language.toDescribe },
			{ key: "show", label: language.toShow },
      { key: "choose", label: language.toChoose },
      { key: "other", label: language.other }
    ],
    understanding: [
			{ key: "explain", label: language.toExplain },
			{ key: "summarize", label: language.toSumarize },
			{ key: "paraphrase", label: language.toParaphrase },
			{ key: "illustrate", label: language.toIllustrate },
      { key: "extend", label: language.toExtend },
      { key: "other", label: language.other }
    ],
    applying: [
			{ key: "duplicate", label: language.toUse },
			{ key: "identify", label: language.toIdentify },
			{ key: "organize", label: language.toOrganize },
			{ key: "construct", label: language.toConstruct },
      { key: "solve", label: language.toSolve },
      { key: "other", label: language.other }
    ],
    analyzing: [
			{ key: "constrast", label: language.toContrast },
			{ key: "categorize", label: language.toCategorize },
			{ key: "classify", label: language.toClassify },
			{ key: "list", label: language.toList },
      { key: "compare", label: language.toCompare },
      { key: "other", label: language.other }
		],
		evaluating: [
			{ key: "conclude", label: language.toConclude },
			{ key: "critique", label: language.toCritique },
			{ key: "justify", label: language.toJustify },
			{ key: "prove", label: language.toProve },
      { key: "judge", label: language.toJudge },
      { key: "other", label: language.other }
    ],
    creating: [
			{ key: "build", label: language.toBuild },
			{ key: "develop", label: language.toDevelop },
			{ key: "combine", label: language.toCombine },
			{ key: "design", label: language.toDesign },
      { key: "elaborate", label: language.toElaborate },
      { key: "other", label: language.other }
		]
	});

  const [outcomes, setOutcomes] = useState({
    contents: [],
    skills: [],
    values: []
  });

  const [outcomesTaxonomy, setOutcomesTaxonomy] = useState({
		contents: [
			{ key: "understand", label: language.toUnderstand },
			{ key: "categorize", label: language.toCategorize },
			{ key: "describe", label: language.toDescribe },
			{ key: "reproduce", label: language.toReproduce },
      { key: "compare", label: language.toCompare },
      { key: "other", label: language.other }
		],
		skills: [
			{ key: "design", label: language.toDesign },
			{ key: "conduct", label: language.toConduct },
			{ key: "evaluate", label: language.toEvaluate },
			{ key: "analyse", label: language.toAnalyse },
      { key: "measure", label: language.toMeasure },
      { key: "other", label: language.other }
		],
		values: [
			{ key: "appreciate", label: language.toAppreciate },
			{ key: "act", label: language.toAct },
			{ key: "work", label: language.toWork },
			{ key: "aware", label: language.toBeAware },
      { key: "value", label: language.toValue },
      { key: "other", label: language.other }
		]
	});

  const [labels, setlables]=useState({
    IntendedAudience:language.IntendedAudience,
    IntendedInclusion:language.IntendedInclusion,
    CourseTitle:language.CourseTitle,
    CourseSubtitle:language.CourseSubtitle,
    errorMsg:language.errorMsg,
    errorMsgleast:language.errorMsgleast,
    completeObjective:language.completeObjective,
    analysisphase:language.analysisphase,
    titleLO:language.titleLO,
    learningconstraint:language.learningconstraint,
    repeated:language.repeated,
    modality:language.modality,
    delivercontent:language.delivercontent,
    pedagogical:language.pedagogical,
    pedagogicalconsiderations:language.pedagogicalconsiderations,
    learningCon:language.learningCon,
    errorMsgall:language.errorMsgall,
    affectiveDomain:language.affectiveDomain,
    psychomotorDomain:language.psychomotorDomain,
    Coursesummary:language.Coursesummary,
    CognitiveDomain:language.CognitiveDomain,
    AnalysisPhaseTitle:language.AnalysisPhaseTitle,
    Deletingaudience:language.Deletingaudience
  })
  const [message, setmessage]=useState(labels.errorMsg)
  const [open, setopen]= useState(false)
  const [labelindexdelete, setlabelindexdelete]=useState("")
  const [indexdelete,  setindexdelete]=useState(0)
  const [categori, setcategory]=useState('');
  const [maxLearningobj, setmaxLearningobj]=useState(false);
  const [maxLearningout, setmaxLearningout]=useState(false);
  const [maxLearningcon, setmaxLearningcon]=useState(false);

  const [disabledVerb, setdisabledVerb]=useState(false);

  const handleNewConstraint = () => {
    setConstraints([
      ...constraints,
      { label: "New constraint", editing: true }
    ]);
    setControlEdit({
      tempValue: "",
      adding: true,
      editing: true
    });
  };
 
  const handleCancelEditLearning = (index, category) => {
    if (controlEdit.adding) deleteLearning(index, category);
		else {
			let atts = goals[category];
			atts[index].editing = false;
			let newGoals = goals;
			newGoals[category] = atts;
			setGoals(newGoals);
		}
		setControlEdit({
			tempValue: "",
			tempAuxValue: "",
			adding: false,
			editing: false
    });
    setmaxLearningout(false)
    setmaxLearningobj(false)
  };

  function deleteLearning(index, category) {
    let atts = goals[category];
		if (index === 0) atts = [...atts.slice(1)];
		else if (index === goals[category].length - 1)
			atts = [...atts.slice(0, index)];
		else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];
    
		let newGoals = goals;
		newGoals[category] = atts;
    setGoals(newGoals);
    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[3]=newGoals;
    setcourseInformation(addNewknowledges) 

    let countError=0
    Object.keys(goals).map((category, index) => {
      if(goals[category].length===0){
        countError+=1;
      }
      if(countError===5){
        let newAnalysis=analysisTooltip;
        newAnalysis.learningobjectives=true;
        setanalysisTooltip(newAnalysis)
        let learningobj=courseinformation;
        learningobj.accessibility[2]=analysisTooltip;
        setcourseInformation(learningobj);
      }
    })

    Object.entries(goals).forEach(([key, value]) => {
      if(value.length!=0){
        let newAnalysis=analysisTooltip;
        newAnalysis.learningobjectives=false;
        setanalysisTooltip(newAnalysis)
      } 
  });
  }

  const handleEditedLearning = ( index, category) => {
    let atts = goals[category];
		atts[index].editing = false;
		atts[index].label = controlEdit.tempValue;
		atts[index].aux = controlEdit.tempAuxValue;
		let newGoals = goals;
		newGoals[category] = atts;
		console.log(newGoals);
    setGoals(newGoals);
    
      Object.entries(goals).forEach(([key, value]) => {      
        if(value.length!=0){
          //console.log(key + ' --' + value); // "a 5", "b 7", "c 9"
          let newAnalysis=analysisTooltip;
          newAnalysis.learningobjectives=false;
          setanalysisTooltip(newAnalysis)
        } 
    });

    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[3]=newGoals;
    addNewknowledges.accessibility[2]=analysisTooltip;
    setcourseInformation(addNewknowledges)
		setControlEdit({
			tempValue: "",
			tempAuxValue: "",
			adding: false,
			editing: false
		});
  };

  const handleEditLearning = (index, category) => {
    let atts = goals[category];
		atts[index].editing = true;
		let newGoals = goals;
		newGoals[category] = atts;
    setGoals(newGoals);
    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[3]=goals;
    setcourseInformation(addNewknowledges)

		setControlEdit({
			tempValue: atts[index].label,
			tempAuxValue: atts[index].aux,
			adding: false,
			editing: true
		});
  };

  const handleDeleteLearning = (index, category) => {
		setopen(true)
    setindexdelete(index)
    setlabelindexdelete(goals[category][index].label)
    setcategory(category)
    settypetodelete('LearningObjectives')
	};

  const handleNewOutcomes = category => {
		console.log(category);
		setOutcomes({
			...outcomes,
			[category]: [
				...outcomes[category],
				{
					label: "New outcomes",
					aux: outcomesTaxonomy[category][0].key,
					editing: true
				}
			]
		});
		setControlEdit({
			tempValue: "",
			tempAuxValue: outcomesTaxonomy[category][0].key,
			adding: true,
			editing: true
		});
  };
  
  const handleCancelEditOutcome = (index, category) => {
		if (controlEdit.adding) deleteOutcome(index, category);
		else {
			let atts = outcomes[category];
			atts[index].editing = false;
			let newOutcomes = outcomes;
			newOutcomes[category] = atts;
			setOutcomes(newOutcomes);
		}
		setControlEdit({
			tempValue: "",
			tempAuxValue: "",
			adding: false,
			editing: false
    });
    
    setmaxLearningout(false)
	};

	function deleteOutcome(index, category) {
		let atts = outcomes[category];
		if (index === 0) atts = [...atts.slice(1)];
		else if (index === outcomes[category].length - 1)
			atts = [...atts.slice(0, index)];
		else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

		let newGoals = outcomes;
		newGoals[category] = atts;
    setOutcomes(newGoals);
    let countError=0
    Object.keys(outcomes).map((category, index) => {
      if(outcomes[category].length===0){
        countError+=1;
      }
      if(countError>=1){
        
        let newAnalysis=analysisTooltip;
        newAnalysis.outcomes=true;
        setanalysisTooltip(newAnalysis)
        let learningobj=courseinformation;
        learningobj.accessibility[2]=analysisTooltip;
        setcourseInformation(learningobj);
      }
    }) 
      let learningobj=courseinformation;
      learningobj.accessibility[2]=analysisTooltip;
      learningobj.analysis[4]=newGoals;
      setcourseInformation(learningobj);
	}

	const handleEditedOutcome = (index, category) => {
		let atts = outcomes[category];
		atts[index].editing = false;
		atts[index].label = controlEdit.tempValue;
		atts[index].aux = controlEdit.tempAuxValue;
		let newGoals = outcomes;
		newGoals[category] = atts;
    setOutcomes(newGoals);
    
    let countError=0
    Object.keys(outcomes).map((category, index) => {
      if(outcomes[category].length!=0){
        countError+=1;
      }
      if(countError===3){
        let newoutcome=analysisTooltip
        newoutcome.outcomes=false;
        setanalysisTooltip(newoutcome)
       
      }
    })

    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[4]=newGoals;
    addNewknowledges.accessibility[2]=analysisTooltip;
    setcourseInformation(addNewknowledges)
    
		setControlEdit({
			tempValue: "",
			tempAuxValue: "",
			adding: false,
			editing: false
		});
	};

	const handleEditOutcome = (index, category) => {
		let atts = outcomes[category];
		atts[index].editing = true;
		let newGoals = outcomes;
		newGoals[category] = atts;
    setOutcomes(newGoals);
    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[4]=goals;
    setcourseInformation(addNewknowledges)

		setControlEdit({
			tempValue: atts[index].label,
			tempAuxValue: atts[index].aux,
			adding: false,
			editing: true
		});
	};

	const handleDeleteOutcome = (index, category) => {
    setopen(true)
     setindexdelete(index)
     setlabelindexdelete(outcomes[category][index].label)
     setcategory(category)
     settypetodelete('outcomes')
	};

  const handleNewLearning = category => {
		console.log("la categoria.....",category);
		setGoals({
			...goals,
			[category]: [
				...goals[category],
				{
					label: "New Learning",
					aux: goalsTaxonomy[category][0].key,
					editing: true
				}
			]
    });
    
    let addNewknowledges=courseinformation;
    addNewknowledges.analysis[3]=goals;
    setcourseInformation(addNewknowledges) 

		setControlEdit({
			tempValue: "",
			tempAuxValue: goalsTaxonomy[category][0].key,
			adding: true,
			editing: true
		});
	};

  const handleDeleteRequisite = index => () => {   
     setopen(true)
     setindexdelete(index)
     setlabelindexdelete(constraints[index].label)
      //deleteRequisite(index);
  };

  const handleEditRequisite = unit => () => {
    let newUnits = [...constraints];
    newUnits[unit].editing = true;
    setConstraints(newUnits);
    setControlEdit({
      tempValue: newUnits[unit].label,
      adding: false,
      editing: true
    });
  };

  const handleEditedRequisite = index => () => {
    let validRequisites= validateRequisites()
    if(validRequisites==="noequal"){
      let newRequisites = [...constraints];
      newRequisites[index].editing = false;
      newRequisites[index].label = controlEdit.tempValue;
      setConstraints(newRequisites);
      setControlEdit({ tempValue: "", adding: false, editing: false });
      let addNewRequisites=courseinformation;
      addNewRequisites.analysis[0]=newRequisites
      setcourseInformation(addNewRequisites)
      
    }
  };

  const validateRequisites=()=>{
    let requisitesArray=[]
    constraints.map((audience, index)=>{
    requisitesArray.push(audience.label.toLowerCase())
    })
    
    let valueinOtherArray=requisitesArray.find((audience)=>{return audience===controlEdit.tempValue.toLowerCase() })
    if(valueinOtherArray!=undefined){
      console.log("coincide")
       setfeedbackError(true)
       setmessage(labels.repeated)
       return "equal"
    }else{
        console.log("no coincide")
        return "noequal"
    }   
  }
  const handleCancelEditRequisite = index => () => {
    if (controlEdit.adding) deleteRequisite(index,'requisite');
    else {
      let newUnits = [...constraints];
      newUnits[index].editing = false;
      setConstraints(newUnits);
    }
    setControlEdit({ tempValue: "", adding: false, editing: false });
    setmaxLearningcon(false)
  };

  function deleteRequisite(index ,category) {
    if (category === "knowledges") {
      let atts = goals.knowledges;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.knowledges.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.knowledges = atts;
      setGoals(newGoals);
    }
    if (category === "skills") {
      let atts = goals.skills;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.skills.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.skills = atts;
      setGoals(newGoals);
    }
    if (category === "attitudes") {
      let atts = goals.attitudes;

      if (index === 0) atts = [...atts.slice(1)];
      else if (index === goals.attitudes.length - 1)
        atts = [...atts.slice(0, index)];
      else atts = [...atts.slice(0, index), ...atts.slice(index + 1)];

      let newGoals = goals;
      newGoals.attitudes = atts;
      setGoals(newGoals);
    }else{
      let newRequisites = [...constraints];
      if (index === 0) newRequisites = [...newRequisites.slice(1)];
      else if (index === constraints.length - 1)
        newRequisites = [...newRequisites.slice(0, index)];
      else
        newRequisites = [
          ...newRequisites.slice(0, index),
          ...newRequisites.slice(index + 1)
        ];
      setConstraints(newRequisites);
      setData(prev => {
        prev.constraints = newRequisites.map(req => req.label);
        return prev;
      });
      let addNewRequisites=courseinformation;
      addNewRequisites.analysis[0]=newRequisites
      setcourseInformation(addNewRequisites)
      }
  }

  function updateTempValue(value,type) {

      console.log("updateTempValue",value, type)
      setControlEdit(prev => {
        return { ...prev, tempValue: value };
      });

      if(value.replace(/\s/g,"") == ""){ //To avoid input spaces
        setsaveButton(true)
      }else{
        setsaveButton(false)
      }
      if(value!="") {
        console.log("valor difeente de vacio--->",value)
        setfeedbackError(false)
      }
      else{ setfeedbackError(true)}
      setmessage(labels.errorMsg)

      if(type==='CDomain'){
        Object.entries(goals).forEach(([key, value]) => {      
          if(value.length>10){
              console.log("se estan colocando massss de 10 learnong objectives"); // "a 5", "b 7", "c 9"
              setsaveButton(true)
             // setfeedbackError(true)
              setmaxLearningobj(true)
             /*  let newAnalysis=analysisTooltip;
              newAnalysis.learningobjectivesCount=true;
              setanalysisTooltip(newAnalysis) */
          } 
         });
      }
      if(type==='LOutcomes'){
        Object.entries(outcomes).forEach(([key, value]) => {      
          if(value.length>10){
              console.log("se estan colocando massss de 10 outcomes"); // "a 5", "b 7", "c 9"
              setsaveButton(true)
              //setfeedbackError(true)
              setmaxLearningout(true)
              /* let newAnalysis=analysisTooltip;
              newAnalysis.outcomesCount=true;
              setanalysisTooltip(newAnalysis) */
          } 
         });
      }
      if(type==='LConstraint'){
          if(constraints.length>10){
              setsaveButton(true)
              //setfeedbackError(true)
              setmaxLearningcon(true)
          } 
        
      }

      //
      
  }

  function updateTempAuxValue(value) {
      console.log("updateTempAuxValue----------------------",value)

      if(value==='without'){
        setControlEdit(prev => {
          return { ...prev, tempAuxValue: value};
        });
      }else{
        setControlEdit(prev => {
          return { ...prev, tempAuxValue: value };
        });
      }
  }

  const handleClose = () => {  
    setopen(false)
  };
  const handleClickT = () => {
    setOpenT(!openT);
  };
  const handleClickS = () => {
    setOpenS(!openS);
  };
  const handleClickA = () => {
    setOpenA(!openA);
  };
  const handleClickI = () => {
    setOpenI(!openI);
  };

  const keyController = (event, name) => {
    if (event.which == 13 || event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  }

  const InputText=(label, value)=>{
    return(
      <div className={classes.psychomotorDomain}>
        <TextField
          value={value}
          //required
          label={label==="affectiveDomain" ? labels.pffectiveDomain: labels.psychomotorDomain}
          variant="outlined"
          multiline
          rowsMax={5}
          id="i02"
          aria-describedby="i02-helper-text"
          type="text"
          //error={analysisTooltip.pedagogical}
          fullWidth
          onChange={(event)=>{   
            let text=courseinformation;
            if(label==="affectiveDomain"){
              setaffectiveDomain(event.target.value)
              text.analysis[5]= event.target.value;
              setcourseInformation(text);
            }else{
              setpsychomotorDomain(event.target.value) 
              text.analysis[6]= event.target.value;
              setcourseInformation(text);
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
          tipMsg={label==="affectiveDomain" ? language.affectiveDomainHelp : language.psychomotorDomainHelp}
          describedBy={"i05-helper-text"}
        />
      </div>
    )
  }
  
  return (
    <div className="form-input-container">
      <div className="form-input-steps">
        <h2 className={classes.psychomotorDomain}>{labels.AnalysisPhaseTitle}</h2>
          {/* <Typography variant="h6" className={classes.title}>Analysis Phase</Typography> */}
          <p className={classes.psychomotorDomain}>
            {labels.analysisphase}
          </p>
        <h3 className={classes.psychomotorDomain}>{labels.Coursesummary}</h3>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={handleClickT}>
                <ListAltIcon>
                  <InboxIcon />
                </ListAltIcon>
                <ListItemText primary={labels.CourseTitle} />
                {openT ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openT} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <DescriptionSharpIcon>
                    <StarBorder />
                  </DescriptionSharpIcon>
                  <ListItemText primary={courseinformation.title} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={handleClickS}>
                <ListAltIcon>
                  <InboxIcon />
                </ListAltIcon>
                <ListItemText primary={labels.CourseSubtitle} />
                {openS ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openS} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <DescriptionSharpIcon>
                    <StarBorder />
                  </DescriptionSharpIcon>
                  <ListItemText primary={courseinformation.subtitle} />
                </ListItem>
              </List>
            </Collapse>


            <ListItem button onClick={handleClickA}>
                <ListAltIcon>
                  <InboxIcon />
                </ListAltIcon>
                <ListItemText primary={labels.IntendedAudience} />
                {openA ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openA} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              {courseinformation.support[0].map((audience, index) => (
                    audience.isChecked==true?
                    <ListItem button className={classes.nested}>
                        <LocalLibraryIcon>
                            <StarBorder />
                          </LocalLibraryIcon>
                      <ListItemText primary={audience.label} />
                    </ListItem>
                      :
                      undefined
                  ))}
              {courseinformation.support[2]!=undefined?
                    courseinformation.support[2].map((audience, index) => (
                      <ListItem button className={classes.nested}>
                          <LocalLibraryIcon>
                            <StarBorder />
                          </LocalLibraryIcon>
                        <ListItemText primary={audience.label} />
                    </ListItem>
                    ))
                  :
                  undefined
              }
              </List>
            </Collapse>

            <ListItem button onClick={handleClickI}>
                <ListAltIcon>
                  <InboxIcon />
                </ListAltIcon>
                <ListItemText primary={props.language.InclusionGoals} />
                {openI ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openI} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  courseinformation.support[1]!=undefined?
                courseinformation.support[1].map((audience, index) => (
                      audience.isChecked==true?
                      <ListItem button className={classes.nested}>
                        <AccessibilityIcon>
                          <StarBorder />
                        </AccessibilityIcon>
                        <ListItemText primary={audience.label} />
                      </ListItem>
                        :
                        undefined
                ))
                :
                undefined
                }     
              </List>
            </Collapse>
          </List>
        
        <Grid container className={classes.formGroup}>
            <Grid item xs={12} >
              <h2>{props.language.titleLO}</h2>
              < br/>
              <FeedbackHelp
                validation={{
                  error: maxLearningobj===true? true: analysisTooltip.learningobjectives,
                  errorMsg: maxLearningobj===true? props.language.maxlearningobjectives :labels.errorMsgleast,
                  errorType: "",
                  a11y: null
                }}
                tipMsg={language.learningObjectivesDefinition}
                describedBy={"i05-helper-text"}
              />
              {/* <p>
                {labels.learningObjectivesDefinition}
              </p> */}
              < br/>
                <h3>{labels.CognitiveDomain}</h3>
            < br/>
            </Grid>     
          {Object.keys(goals).map((category, index) => (
            <Grid item xs={12}>
              <Grid item className="MuiFormLabel-root">
                <label>
                  {language[`${Object.getOwnPropertyNames(goals)[index]}Objectives`]}
                </label>
              </Grid>
              <Grid item>
                <form>
                  <List component="ul" key={"li0"} id="li0">
                    {
                    goals[category].map((goal, index) => (
                      <ListItem
                        button={!goal.editing}
                        component="li"
                        key={"li" + index}
                        className={classes.listItem}
                      >
                        <ListItemText
                          key={"u2" + index + "listeItemTxt"}
                          primary={
                            (goalsTaxonomy[category].find(
                              item => item.key === goal.aux
                            ).label==='other') ? goal.label : (goalsTaxonomy[category].find(
                              item => item.key === goal.aux
                            ).label) +" " +
                            goal.label
                          }
                          className={goal.editing ? classes.hidden : ""}
                        />
                        <div className='allText' >
                        <Paper className={!goal.editing ? classes.hidden : ""}>	
                          <div className='alignText'>
                            <div>
                              <TextField
                                  id="standard-select-currency"
                                  select
                                  SelectProps={{
                                    native: true
                                  }}
                                  // variant="outlined"
                                  value={controlEdit.tempAuxValue}
                                  onChange={event =>
                                    updateTempAuxValue(event.target.value)
                                  }
                                  onKeyPress={keyController}
                                  className={classes.textInput}
                              >
                                    {goalsTaxonomy[category].map(option => (
                                      <option key={option.key} value={option.key}>
                                        {option.label}
                                      </option>
                                    ))}
                                </TextField>
                            </div>
                              <div>
                                <TextField
                                  key={"u2" + index + "txtField"}
                                  value={controlEdit.tempValue}
                                  label={language.completeObjective}
                                  onChange={event =>
                                    updateTempValue(event.target.value, "CDomain")
                                  }
                                  onKeyPress={keyController}
                                />
                              </div>
                          </div>	
                        </Paper>
                              
                              <ListItemSecondaryAction  key={"u2" + index + "secAc"}>
                                
                                {
                                  goal.editing ? (
                                    <React.Fragment>
                                      <IconButton
                                        key={"u2" + index + "btnEditSaveUnit"}
                                        edge="end"
                                        aria-label={"Save changes"}
                                        onClick={() =>
                                          handleEditedLearning(index, category)
                                        }
                                        className={classes.saveButton}
                                        disabled={(controlEdit.tempValue === "" || saveButton===true)}
                                      >
                                        <DoneIcon />
                                      </IconButton>
                                      <IconButton
                                        key={"u2" + index + "btnEditCancelUnit"}
                                        edge="end"
                                        aria-label={"Cancel changes"}
                                        onClick={() =>
                                          handleCancelEditLearning(index, category)
                                        }
                                        className={classes.deleteButton}
                                      >
                                        <ClearIcon />
                                      </IconButton>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <IconButton
                                        key={"u2" + index + "btnEditUnit"}
                                        edge="end"
                                        aria-label={"Edit unit name"}
                                        onClick={() =>
                                          handleEditLearning(index, category)
                                        }
                                        disabled={controlEdit.editing}
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        key={"u2" + index + "btnDeleteUnit"}
                                        edge="end"
                                        // aria-label={"Delete constraint " + constraint.label}
                                        onClick={() =>
                                          handleDeleteLearning(index, category)
                                        }
                                        className={classes.deleteButton}
                                      >
                                        <RemoveIcon />
                                      </IconButton>
                                    </React.Fragment>
                                  )
                                }
                              </ListItemSecondaryAction>

                            </div>
                        
                      </ListItem>
                    ))}
                    <ListItem
                      key="addrequisite"
                      button
                      onClick={() => handleNewLearning(category)}
                      id="addrequisite"
                      disabled={controlEdit.editing}
                      className={classes.addButton}
                    >
                      <AddIcon /> <ListItemText primary={language.add} />
                    </ListItem>
                  
                  </List>
                  <FeedbackHelp
                    validation={{
                      error: false,
                      errorMsg: "",
                      errorType: "",
                      a11y: null
                    }}
                    tipMsg={language[`${Object.getOwnPropertyNames(goals)[index]}ObjectivesAre`]}
                    describedBy={"i05-helper-text"}
                  />
                  <Divider light/>
                {/* <AccessibilityHelp 
                  id={'long-description-help-container'} 
                  name={'longDescriptionHelpContainer'} 
                  error={true} 
                  tip={"sadasdasdasd"} 
                  step={1}
                  stepLabel={"ASDasd"}
                  language={props.language}
                /> */}
                </form>
                <br/>
              </Grid>
            </Grid>
          ))}
          <Grid item>
        </Grid>
        <div className={classes.inputText}>
          <h3 className={classes.affectiveDomain}>{labels.affectiveDomain}</h3>
            {InputText('affectiveDomain',affectiveDomain)}
          
          <h3 className={classes.psychomotorDomain}>{labels.psychomotorDomain}</h3>
            {InputText('psychomotorDomain',psychomotorDomain)}
          
        </div>   
        </Grid>

        <Grid container className={classes.formGroup}>
            <Grid item xs={12} className={classes.Behavioral}>
              <h2 className={classes.Behavioral}>{language.learningOutcomes}</h2>
              {/* <p className={classes.Behavioral}>{language.outcomeslegend}</p> */}
              <FeedbackHelp
                validation={{
                  error: maxLearningout===true? true: analysisTooltip.outcomes,
                  errorMsg: maxLearningout===true? props.language.maxlearningOutcomes :labels.errorMsgall,
                  errorType: "",
                  a11y: null
                }}
                tipMsg={language.behavioralOutcomeHelp}
                describedBy={"i05-helper-text"}
              />
            </Grid>
          {Object.keys(outcomes).map((category, index) => (
            <Grid item xs={12}>
              <Grid item className="MuiFormLabel-root">
                <label>
                  {language[`${Object.getOwnPropertyNames(outcomes)[index]}Objectives`]}
                </label>
              </Grid>
              <Grid item>
                <form>
                  <List component="ul" key={"li0"} id="li0">
                    {outcomes[category].map((outcome, index) => (
                      <ListItem
                        button={!outcome.editing}
                        component="li"
                        key={"li" + index}
                        className={classes.listItem}
                      >
                        <ListItemText
                          key={"u2" + index + "listeItemTxt"}
                          primary={
                            (outcomesTaxonomy[category].find(
                              item => item.key === outcome.aux
                            ).label==='other') ? outcome.label : (outcomesTaxonomy[category].find(
                              item => item.key === outcome.aux
                            ).label)   + " " +
                            outcome.label
                          }
                          className={outcome.editing ? classes.hidden : ""}
                        />
                        <div className='allText' >
                          <Paper className={!outcome.editing ? classes.hidden : ""}>
                          <div className='alignText'>
                            <div>
                              <TextField
                                id="standard-select-currency"
                                select
                                SelectProps={{
                                  native: true
                                }}
                                // variant="outlined"
                                value={controlEdit.tempAuxValue}
                                onChange={event =>
                                  updateTempAuxValue(event.target.value)
                                }
                                onKeyPress={keyController}
                                className={classes.textInput}
                              >
                                {outcomesTaxonomy[category].map(option => (
                                  <option key={option.key} value={option.key}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </div>
                            <div>
                              <TextField
                                label={language.completeObjective}
                                key={"u2" + index + "txtField"}
                                value={controlEdit.tempValue}
                                onChange={event =>
                                  updateTempValue(event.target.value, "LOutcomes")
                                }
                                onKeyPress={keyController}
                              />
                            </div>
                          </div>
                          </Paper>
                          <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                          {outcome.editing ? (
                            <React.Fragment>
                              <IconButton
                                key={"u2" + index + "btnEditSaveUnit"}
                                edge="end"
                                aria-label={"Save changes"}
                                onClick={() =>
                                  handleEditedOutcome(index, category)
                                }
                                className={classes.saveButton}
                                disabled={(controlEdit.tempValue === "" || saveButton===true)}
                              >
                                <DoneIcon />
                              </IconButton>
                              <IconButton
                                key={"u2" + index + "btnEditCancelUnit"}
                                edge="end"
                                aria-label={"Cancel changes"}
                                onClick={() =>
                                  handleCancelEditOutcome(index, category)
                                }
                                className={classes.deleteButton}
                              >
                                <ClearIcon />
                              </IconButton>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <IconButton
                                key={"u2" + index + "btnEditUnit"}
                                edge="end"
                                aria-label={"Edit outcome name"}
                                onClick={() => handleEditOutcome(index, category)}
                                disabled={controlEdit.editing}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                key={"u2" + index + "btnDeleteUnit"}
                                edge="end"
                                aria-label={"Delete outcome "}
                                onClick={() =>
                                  handleDeleteOutcome(index, category)
                                }
                                className={classes.deleteButton}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </React.Fragment>
                          )}
                        </ListItemSecondaryAction>
                        </div>
                        
                        
                      </ListItem>
                    ))}
                    <ListItem
                      key="addrequisite"
                      button
                      onClick={() => handleNewOutcomes(category)}
                      id="addrequisite"
                      disabled={controlEdit.editing}
                      className={classes.addButton}
                    >
                      <AddIcon /> <ListItemText primary={language.add} />
                    </ListItem>
                  </List>
                  <FeedbackHelp
                    validation={{
                      error: false,
                      errorMsg: "",
                      errorType: "",
                      a11y: null
                    }}
                    tipMsg={language[`${Object.getOwnPropertyNames(outcomes)[index]}ObjectivesAre`]}
                    describedBy={"i05-helper-text"}
                  />
                  <Divider light/>
                </form>
                <br/>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container className={classes.formGroup}>
            <Grid item xs={12} className={classes.Behavioral}>
              <h2 className={classes.Behavioral}>{labels.learningconstraint}</h2>
              <FeedbackHelp
                validation={{
                  error: maxLearningcon===true? true: false,
                  errorMsg:props.language.maxlearningContrain ,
                  errorType: "",
                  a11y: null
                }}
                tipMsg={language.learningConstraintHelp}
                describedBy={"i05-helper-text"}
              />
            </Grid>
          <Grid item xs={12}>
            <form>
              <List component="ul" key={"li0"} id="li0">
                {constraints.map((constraint, index) => (
                  <ListItem
                    button={!constraint.editing}
                    component="li"
                    key={"li" + index}
                    className={classes.listItem}
                  >
                    <ListItemText
                      key={"u2" + index + "listeItemTxt"}
                      primary={constraint.label}
                      className={constraint.editing ? classes.hidden : ""}
                    />
                    <div className={!constraint.editing ? classes.hidden : ""}>
                        <TextField
                          key={"u2" + index + "txtField"}
                          className={!constraint.editing ? classes.hidden : ""}
                          value={controlEdit.tempValue}
                          onChange={event => updateTempValue(event.target.value, "LConstraint")}
                          onKeyPress={keyController}
                        />
                        <FeedbackHelp
                          validation={{
                            error: feedbackError,
                            errorMsg: message,
                            errorType: "required",
                            a11y: null
                          }}
                          tipMsg={labels.completeObjective}
                          describedBy={"i02-helper-text"}
                        />
                    </div>

                    <ListItemSecondaryAction key={"u2" + index + "secAc"}>
                      {constraint.editing ? (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditSaveUnit"}
                            edge="end"
                            aria-label={"Save changes"}
                            onClick={handleEditedRequisite(index)}
                            className={classes.saveButton}
                            disabled={(controlEdit.tempValue === "" || saveButton===true)}
                          
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnEditCancelUnit"}
                            edge="end"
                            aria-label={"Cancel changes"}
                            onClick={handleCancelEditRequisite(index)}
                            className={classes.deleteButton}
                          >
                            <ClearIcon />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            key={"u2" + index + "btnEditUnit"}
                            edge="end"
                            aria-label={"Edit unit name"}
                            onClick={handleEditRequisite(index)}
                            disabled={controlEdit.editing}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            key={"u2" + index + "btnDeleteUnit"}
                            edge="end"
                            // aria-label={"Delete constraint " + constraint.label}
                            onClick={handleDeleteRequisite(index)}
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
                  key="addrequisite"
                  button
                  onClick={handleNewConstraint}
                  id="addrequisite"
                  disabled={controlEdit.editing}
                  className={classes.addButton}
                >
                  <AddIcon /> <ListItemText primary={language.addConstraint} />
                </ListItem>
              </List>
            </form>
          </Grid>
        </Grid>
        <Grid container className={classes.formGroup}>
          <Grid item xs={12} className={classes.Behavioral}>
              <h2 className={classes.Behavioral}>{labels.pedagogicalconsiderations}</h2>
          </Grid>
          <Grid item xs={12} >
          <form className={classes.root}>
            <TextField
              value={pedagogical}
              //required
              label={`${labels.pedagogicalconsiderations} ${props.language.required}`}
              variant="outlined"
              multiline
              rowsMax={5}
              id="i02"
              aria-describedby="i02-helper-text"
              type="text"
              error={analysisTooltip.pedagogical}
              fullWidth
              onChange={(event)=>{
                setpedagogical(event.target.value) 
                if(event.target.value!=''){
                  let analisis=analysisTooltip;
                  analisis.pedagogical=false;
                  setanalysisTooltip(analisis)
                }else{
                  let analisis=analysisTooltip;
                  analisis.pedagogical=true;
                  setanalysisTooltip(analisis)
                }
                //save feedback
                let text=courseinformation;
                text.analysis[2]= event.target.value;
                text.accessibility[2]=analysisTooltip;
                setcourseInformation(text);
              }}
            />
            <FeedbackHelp
              validation={{
                error: analysisTooltip.pedagogical,
                errorMsg: labels.errorMsg,
                errorType: "",
                a11y: null
              }}
              tipMsg={labels.pedagogical}
              describedBy={"modality-helper-text"}
            />
          </form>
        </Grid>
        </Grid>
    
        <Dialog  disableBackdropClick={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle className="success-dialog-title" id="simple-dialog-title">{language.warning}</DialogTitle>
              <DialogContent className="success-dialog-content">
            <DialogContentText style={{padding: "0 1vw"}}>{`${language.deleteItemBelow} "${labelindexdelete}" ${language.wantProceed}`}</DialogContentText>
                <WarningIcon className="warning-dialog-icon"/> 
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setopen(false)} color="primary">{language.no}</Button>
                <Button variant="outlined" onClick={() => {
                  console.log("tipo a borrar", typetodelete)
                  if(typetodelete==='LearningObjectives'){
                    deleteLearning(indexdelete,categori)
                  }else if(typetodelete==='outcomes'){
                    deleteOutcome(indexdelete,categori)
                  }else{
                    deleteRequisite(indexdelete,'requisite')
                  }       
                  setopen(false)
                }} 
                color="primary"><em>{language.yes}</em></Button> 
              </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

