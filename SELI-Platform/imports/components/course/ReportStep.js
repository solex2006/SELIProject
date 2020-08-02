import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Avatar,
	Card,
	CardHeader,
	Grid,
	CardContent,
	LinearProgress,
	CircularProgress,
	Container,
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	FormLabel,
	ListSubheader,
	List,
	ListItem,
	ListItemText,
	Collapse,
	Box,
	Typography,
	Paper,
	Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import GaugeChart from "react-gauge-chart";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {
	faBrain,
	faLowVision,
	faDeaf,
	faUniversalAccess
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { he } from "date-fns/locale";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: "100vw"
	},
	paper: {
		marginBottom: theme.spacing(2),
	},
	pdf:{
		display:'flex',
	},
	allachieved:{
		justifyContent:'center',
		padding:'20px 20px'
	},
	content: {},
	card: {
		width: "100%",
		"& $container": {
			// maxHeight: "100%",
			// maxWidth: "100%",
			// minWidth: "auto"
		},
		"& $chart": {
			//	maxHeight: "90%",
			//	width: "auto"
		},
		"& .MuiCardHeader-root": {
			color: theme.palette.secondary.dark
		},
		"& .MuiAvatar-root": {
			backgroundColor: theme.palette.secondary.main
		},
		"& .MuiListSubheader-root": {
			color: theme.palette.primary.main,
			fontWeigth: "600"
		}
	},
	details: {
		display: "flex",
		flexDirection: "column"
	},
	list: {
		width: "100%",
		//maxWidth: ,
		backgroundColor: theme.palette.background.paper
	},
	chartCaption: {
		...theme.typography.h4,
		textAlign: "center"
	},
	chartLabel: {
		...theme.typography.h5,
		textAlign: "center",
		color: theme.palette.secondary.main,
		padding: '10px 10px',
	},
	container: {
		// maxHeight: "60vh",
		// maxWidth: "60vw",
		// minWidth: "auto"
	},
	chart: {
		// maxHeight: "60vh",
		// maxWidth: "60vw",
		// minWidth: "50em",
		// width: "auto!important"
	},
	subtitle: {
		...theme.typography.subtitle1
	},
	caption: {
		...theme.typography.h4
	},
	tip: {
		color: theme.palette.text.secondary
	},
	overallcard: {
		textAlign: "center",
		display: "flex",
		flexDirection: "row",
		//flexWrap:'wrap'
	},
	avatar: {
		width: "8em",
		height: "8em",
		backgroundColor: "#66bb6a",
		color: "#fffff",
		"& .MuiSvgIcon-root": {
			fontSize: "8.5rem"
		},
		"& .svg-inline--fa": {
			fontSize: "6.5rem"
		}
	},
	value: {
		fontSize: "7.5rem"
		//	textAlign: "center"
	},
	valid: {
		"& $value": {
			color: theme.palette.success.dark
		},
		"& $caption": {
			color: theme.palette.success.dark
		}
	},
	misConfig: {
		"& $value": {
			color: theme.palette.error.main
		},
		"& $caption": {
			color: theme.palette.error.main
		}
	},
	notConfig: {
		"& $value": {
			color: theme.palette.warning.main
		},
		"& $caption": {
			color: theme.palette.warning.main
		}
	}
}));

const a11yCOLOR = [
	"#ff9800", //fail:
	"#ffc107", //poor:
	"#fbc02d", //average:
	"#9ccc65", //good:
	"#66bb6a" //valid:
];

export default function ReportStep(props) {
   //console.clear()
	const classes = useStyles();
	const { courseInformation,language } = props;
   
	console.log("Propiedades en el Report", props)
	const [courseinformation, setcourseInformation]= useState(courseInformation)
	const [sylabus, setSylabus]= useState(props.courseInformation.sylabus)
	const [reportSylabus, setreportSylabus]= useState([])
	const [sylabusTotal, setsylabusTotal]= useState(0)


   const [percentagesWithoutUnit, setPercentagesWithoutUnit]=useState({
      guidedWithoutUnit:[],
      guidedWithoutLessons:[],
      totalGuidedWithoutUL:[],
   })

   const [percentagesWithoutTopic, setPercentagesWithoutTopic]=useState({
      guidedWithoutTopic:[],
	})
	
	const [withoutInclusionGol, setwithoutInclusionGol]=useState({
		percentagebyUnit:[], 
		percentagebyLesson:[],
	})
	
	const [contWithInclusionGol, setWithInclusionGol]=useState({
		done:0,
		todo:0,
		NotAccessible:0,
		averageCourse:0
	})

	
	const [tasknoconfig, settasknoconfig]=useState({
		unit:0,
		lesson:0
	})

	const [categories, setCategories] = React.useState([
		{
			key: "visual",
			icon: <FontAwesomeIcon icon={faLowVision} />,
			label: "Visual Disability",
			topics: [],
			selected: false
		},
		{
			key: "hearing",
			icon: <FontAwesomeIcon icon={faDeaf} />,
			label: "Hearing Disability",
			topics: [],
			selected: false
		},
		{
			key: "cognitive",
			icon: <FontAwesomeIcon icon={faBrain} />,
			label: "Cognitive Disability",
			topics: [],
			selected: false
		},
		{
			key: "diversity",
			icon: <FontAwesomeIcon icon={faUniversalAccess} />,
			label: "Diversity of Abilities",
			topics: [],
			selected: false
		}
	]);
 
   useEffect(()=>{
      if((props.courseInformation.coursePlan.guidedCoursePlan=== "guided" || props.courseInformation.coursePlan.guidedCoursePlan=== "free")&& 
      props.courseInformation.coursePlan.courseTemplate ==="without" && 
      props.courseInformation.coursePlan.courseStructure=== "topic"){
        TopicsCourse()
         //GuidedWithoutTopics()
      }else if((props.courseInformation.coursePlan.guidedCoursePlan=== "guided" || props.courseInformation.coursePlan.guidedCoursePlan=== "free")&& 
      props.courseInformation.coursePlan.courseTemplate ==="without" && 
      props.courseInformation.coursePlan.courseStructure=== "unit"){
			//GuidedWithoutUnits() //for full acesibility
			UnitsCourse() // for without Inclusion Gol
      }else if(props.courseInformation.coursePlan.courseTemplate ==="spiral" || 
			props.courseInformation.coursePlan.courseTemplate=== "toyBox"  ||
			props.courseInformation.coursePlan.courseTemplate=== "consistent"){
			TemplateCourse()
		}

		if(props.courseInformation.sylabus!=undefined){
      	SylabusCourse()
         //GuidedWithoutTopics()
      }
		
		//validateReport()
		
	},[])

	const SylabusCourse=()=>{
		console.log("Dentro de Sylabus course", props.courseInformation.sylabus)
		let cognitive=0
		let hearing=0
		let visual=0
		let elderly=0
		let percentagebySylabus=[]
		let misscognitive=0
		let misshearing=0
		let missvisual=0
		let misselderly=0

		 if(sylabus.accessibility.dataField!=undefined){
			//sylabus.isA11Y.map((isa11y, indexIsa11y)=>{
			let isa11y=sylabus.accessibility.dataField;
			if((isa11y.hasImage==='yes' && isa11y.hasAlt==='yes') || (isa11y.hasImage==='no' && isa11y.hasAlt==='no') || 
			(isa11y.hasImage==='no' && isa11y.hasAlt===null)){
				cognitive+=1
				hearing+=1
				visual+=1
			}if(isa11y.hasImage==='yes' && isa11y.hasAlt==='no'){
				misscognitive+=1
				misshearing+=1
				missvisual+=1
			}
			if(isa11y.hasImage===null || isa11y.hasAlt===null){
				misscognitive+=1
				misshearing+=1
				missvisual+=1
			}

			// tab 2
			if((isa11y.hasBookmarks==='yes' && isa11y.isBookmarksCorrect==='yes') || (isa11y.hasBookmarks==='no' && isa11y.isBookmarksCorrect==='no') || 
				(isa11y.hasBookmarks==='no'  && isa11y.isBookmarksCorrect===null) ){
					cognitive+=1
					visual+=1
			}
			if(isa11y.hasBookmarks===null || isa11y.isBookmarksCorrect===null){
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.screenReader === 'yes')){
				cognitive+=1
				visual+=1
			}else if(isa11y.screenReader === 'no'){
				misscognitive+=1
				missvisual+=1
			}
			if(isa11y.screenReader===null ){
				misscognitive+=1
				missvisual+=1
			}

			if(isa11y.focusOrder === 'yes'){
				cognitive+=1
				visual+=1
			}else if(isa11y.focusOrder === 'no'){
				misscognitive+=1
				missvisual+=1
			}
			if(isa11y.focusOrder===null ){
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.hasBookmarks==='yes' && isa11y.isBookmarksCorrect==='no')){
				misscognitive+=1
				missvisual+=1
			}
			if(isa11y.isBookmarksCorrect===null ){
				misscognitive+=1
				missvisual+=1
			}


			//tab 3
			if((isa11y.hasTitle === 'yes')) {
					visual+=1
			}else if (isa11y.hasTitle === 'no'){
					missvisual+=1
			}
			if(isa11y.hasTitle===null ){
				missvisual+=1
			}

			if((isa11y.hasNumbering === 'yes')) {
				cognitive+=1
			}else if (isa11y.hasNumbering === 'no'){
				misscognitive+=1
			}
			if(isa11y.hasNumbering===null ){
				missvisual+=1
			}

			if((isa11y.hasLanguage === 'yes')) {
				cognitive+=1
			}else if (isa11y.hasLanguage === 'no'){
				misscognitive+=1
			}
			if(isa11y.hasLanguage===null ){
				misscognitive+=1
			}
			
			if((isa11y.hasLanguagePart === 'yes')) {
				cognitive+=1
			}else if (isa11y.hasLanguagePart === 'no'){
				misscognitive+=1
			}
			if(isa11y.hasLanguagePart===null ){
				misscognitive+=1
			}

			//tab4  hasRequiredFields
			if((isa11y.hasForm === 'no')) {
				cognitive+=1
				visual+=1
			}
			if((isa11y.hasForm === null)) {
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.hasForm === 'yes') && (isa11y.hasRequiredFields==='no')) {
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.hasRequiredFields===null)) {
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.hasForm === 'yes') && (isa11y.hasRequiredFields==='yes') && (isa11y.isRequiredFields==='yes') ) {
				cognitive+=1
				visual+=1
			}
			if((isa11y.isRequiredFields===null)) {
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.hasForm === 'yes') && (isa11y.hasRequiredFields==='yes') && (isa11y.isRequiredFields==='no') ) {
				misscognitive+=1
				missvisual+=1
			}

			if((isa11y.hasForm === 'yes') && (isa11y.hasLabels==='yes') ) {
				cognitive+=1
				visual+=1
				hearing+=1
				elderly+=1
			}
			if((isa11y.hasForm === 'yes') && (isa11y.hasLabels==='no') ) {
				misscognitive+=1
				missvisual+=1
				misshearing+=1
				misselderly+=1
			}
			if((isa11y.hasLabels===null)) {
				misscognitive+=1
				missvisual+=1
				misshearing+=1
				misselderly+=1
			}

///tab5
			if((isa11y.isTable === 'yes')) {
				cognitive+=1
				hearing+=1	
			}else if (isa11y.isTable === 'no'){
				misscognitive+=1
				misshearing+=1
			}
			if((isa11y.isTable===null)) {
				misscognitive+=1
				misshearing+=1
			}

			if((isa11y.isList === 'yes')) {
				cognitive+=1
				hearing+=1
				visual+=1
				
			}else if (isa11y.isList === 'no'){
				misscognitive+=1
				misshearing+=1
				missvisual+=1
			}
			if((isa11y.isList === null)) {
				misscognitive+=1
				misshearing+=1
				missvisual+=1
			}

			if((isa11y.isAbbreviation === 'yes')) {
				cognitive+=1
				visual+=1
				
			}else if (isa11y.isAbbreviation === 'no'){
				misscognitive+=1
				missvisual+=1
			}
			if((isa11y.isAbbreviation === null)) {
				misscognitive+=1
				missvisual+=1
			}
			

			if((isa11y.isHeadings === 'yes')) {
				cognitive+=1
				visual+=1
				hearing+=1
				
			}else if (isa11y.isHeadings === 'no'){
				misscognitive+=1
				missvisual+=1
				misshearing+=1
			}
			if((isa11y.isHeadings === null)) {
				misscognitive+=1
				missvisual+=1
				misshearing+=1
			}

			if((isa11y.isLink === 'yes')) {
				cognitive+=1
				visual+=1
				hearing+=1
				
			}else if (isa11y.isLink === 'no'){
				misscognitive+=1
				missvisual+=1
				misshearing+=1
			}
			if((isa11y.isLink === null)) {
				misscognitive+=1
				missvisual+=1
				misshearing+=1
			}
		} 
		//calculate percentages by disabilitie
		let visualPercentage=(visual*100)/(visual+missvisual)
		let cognitivePercentage=(cognitive*100)/(cognitive+misscognitive)
		let hearingPercentage=(hearing*100)/(hearing+misshearing)
		let elderlyPercentage=(elderly*100)/(elderly+misselderly)
		let total=(visualPercentage+cognitivePercentage+hearingPercentage+elderlyPercentage)/4
	
		percentagebySylabus.push([
			{title: 'Visual', a11yValid:isNaN(visualPercentage)?0:visualPercentage , a11yMisConfig: 0, a11yNotConfig: 0},
			{title: 'Hearing', a11yValid:isNaN(hearingPercentage)?0:hearingPercentage , a11yMisConfig: 0, a11yNotConfig: 0},
			{title: 'Cognitive', a11yValid:isNaN(cognitivePercentage)?0:cognitivePercentage , a11yMisConfig: 0, a11yNotConfig: 0},
			{title: 'Elderly', a11yValid:isNaN(elderlyPercentage)?0:elderlyPercentage , a11yMisConfig: 0, a11yNotConfig: 0}
		])

		setreportSylabus(percentagebySylabus)
		setsylabusTotal(isNaN(total)?0:total)

		console.log("Conteos en el silabo", cognitive, visual, elderly, hearing, misshearing, missvisual, misscognitive, misselderly )
		console.log("percentagebySylabus", percentagebySylabus )

	}
	
	const validateReport=()=>{
		let hearing=0
		let cognitive=0
		let elderly=0
		let visual=0
		if(categories[0].selected){
		  visual=categories[0].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / categories[0].topics.length
		  console.log("visual", visual)
		}
		if(categories[1].selected){
		  hearing=categories[1].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / categories[1].topics.length
		  console.log("hearing", hearing)
		}
		if(categories[2].selected){
		  cognitive=categories[2].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / categories[2].topics.length
		  console.log("cognitive", cognitive)
		}
		if(categories[3].selected){
		  elderly=categories[3].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / courseInformation.report[3].topics.length
		  console.log("diversity", elderly)
		}
		courseinformation.report=[visual, hearing, cognitive, elderly]
		setcourseInformation(courseinformation)
	}
	const newRandomTopics = (type) => {
		let visual=[]
		let hearing=[]
		let cognitive=[]
		let diversity=[]
		
		if (type==='topic'){
			console.log("en el topico---------------------", withoutInclusionGol.percentagebyUnit)
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				visual.push(unit[0])
			})
			
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				hearing.push(unit[1])
			})
			
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				cognitive.push(unit[2])
			})
			
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				diversity.push(unit[3])
			})
		}else if(type==='unitslessons'){
			//console.log("en el Unidad-Lesson---------------------", withoutInclusionGol.percentagebyUnit,withoutInclusionGol.percentagebyLesson)
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				visual.push(unit[0])
			})
			withoutInclusionGol.percentagebyLesson.map((lesson,indexLesson)=>{
				visual.push(lesson[0])
			})
		
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				hearing.push(unit[1])
			})
			withoutInclusionGol.percentagebyLesson.map((lesson,indexLesson)=>{
				hearing.push(lesson[1])
			})

			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				cognitive.push(unit[2])
			})
			withoutInclusionGol.percentagebyLesson.map((lesson,indexLesson)=>{
				cognitive.push(lesson[2])
			})
			
			withoutInclusionGol.percentagebyUnit.map((unit,indexunit)=>{
				diversity.push(unit[3])
			})
			withoutInclusionGol.percentagebyLesson.map((lesson,indexLesson)=>{
				diversity.push(lesson[3])
			})

		}
	
			categories[0].topics=visual
			categories[1].topics=hearing
			categories[2].topics=cognitive
			categories[3].topics=diversity
			setCategories(categories)			
			//console.log("dentro de ssssssssssssssnewRandomTopics :",withoutInclusionGol, categories )
			let checkaudience=props.courseInformation.support[1];
			let check=0
			if(checkaudience!=undefined){
				checkaudience.map((audience, index)=>{

					if((checkaudience[1].value==='Eld' && checkaudience[1].isChecked===false) && (checkaudience[0].value==='cog' && checkaudience[0].isChecked===false) &&
					(checkaudience[2].value==='Hear' && checkaudience[2].isChecked===false) && (checkaudience[3].value==='Vis' && checkaudience[3].isChecked===false)){
						setSimulate('noInclusionGol')
					}else{
						if(audience.value==='Vis' && audience.isChecked===true) {
							let calculo=categories[0].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[0].topics.length
							console.log("audience",audience, calculo)
							if(calculo===100){
								categories[0].selected=true
								setSimulate('inclusionGolAchieved')
							}else if(calculo!=100){
								categories[0].selected=false
								setSimulate('inclusionGol')
							}else{
								categories[0].selected=false
								setSimulate('noInclusionGol')
							}
							
						} 
						if(audience.value==='Hear' && audience.isChecked===true){
							let calculo=categories[1].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[1].topics.length
							if(calculo===100){
								categories[1].selected=true
								setSimulate('inclusionGolAchieved')
							}
							else if(calculo!=100){
								categories[1].selected=false
								setSimulate('inclusionGol')
							}else {
								categories[1].selected=false
								setSimulate('noInclusionGol')
							}
						}
						if(audience.value==='cog' && audience.isChecked===true){
							let calculo=categories[2].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[2].topics.length
							
							console.log("calculo", calculo)
							if(calculo===100){
								console.log("calculo----true", calculo, categories)
								categories[2].selected=true
								setSimulate('inclusionGolAchieved')
							}else if(calculo!=100){
								
								categories[2].selected=false
								console.log("calculo----", calculo, categories)
								setSimulate('inclusionGol')
							}else{
								categories[2].selected=false
								setSimulate('noInclusionGol')
							}
						}
						if((audience.value==='Eld' && audience.isChecked===true)){
							let calculo=categories[3].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[3].topics.length
							console.log("audience",audience, calculo)
							if(calculo===100){
								categories[3].selected=true
								setSimulate('inclusionGolAchieved')
							}else if(calculo!=100){
								categories[3].selected=false
								setSimulate('inclusionGol')
							}else{
								categories[3].selected=false
								setSimulate('noInclusionGol')
							}
						}	
					}
				})
			}else{
				setSimulate('noInclusionGol')
			}
			//console.log("categorias antes----", categories)

			if(checkaudience!=undefined){
				if(categories[0].selected===false && categories[1].selected===false && categories[2].selected===false && categories[3].selected===false){
					
					if((checkaudience[1].value==='Eld' && checkaudience[1].isChecked===true)){
						categories[3].selected=true
					}
					if((checkaudience[0].value==='cog' && checkaudience[0].isChecked===true)){
						console.log("paso 2")
						categories[2].selected=true
					}
					if((checkaudience[2].value==='Hear' && checkaudience[2].isChecked===true)){
						categories[1].selected=true
					}
					if((checkaudience[3].value==='Vis' && checkaudience[3].isChecked===true)){
						categories[0].selected=true
					}
				}

			}
		//	console.log("par ele caso no inclusion gol",checkaudience[1].value, checkaudience[1].isChecked)
			setCategories(categories)
			console.log("las categorias************", categories, visual, diversity,withoutInclusionGol)

   };
   const UnitsCourse=() => {
		let variablesUnidad=[]
		let variablesLeccion=[]
		let percentagebyUnit=[]
		let percentagebyLesson=[]
		let contText=0; 
		let contTextFalse=0; let contCaptions=0; let contCaptionsFalse=0; let contwarningAlert=0
		let contwarningAlertFalse=0; let contextendedTime=0; let contextendedTimeFalse=0; let contnoTime=0;let contnoTimeFalse=0; 
		let contseizures=0; let contseizuresFalse=0; let contaudioDescription=0; let contaudioDescriptionFalse=0; 
		let contsignLanguage=0; let contsignLanguageFalse=0
		let NotAccessiblenoTime=0
		let NotAccessibleextendTime=0
		let NotAccessibleAlert=0
		let NotAccessibleSeizures=0
		let NotAccessibleCaptions=0
		let NotAccessibleDescription=0
		let NotAccessibleSign=0
	
      props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.items.map((item,indexItem)=>{
            if(item.type==='image' ){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+1
				}else if(item.type==='audio'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='quiz'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='noTime'){
								if(isa11y.is_a11y===true){contnoTime+=1} else if(isa11y.is_a11y===null){NotAccessiblenoTime+=1} else {contnoTimeFalse+=1}
							} if(isa11y.name==='extendedTime'){
								if(isa11y.is_a11y===true){contextendedTime+=1}else if(isa11y.is_a11y===null){NotAccessibleextendTime+=1}else{contextendedTimeFalse+=1}
							} if(isa11y.name==='warningAlert'){
								if(isa11y.is_a11y===true){contwarningAlert+=1}else if(isa11y.is_a11y===null){NotAccessibleAlert+=1}else{contwarningAlertFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='video'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='seizures'){
								if(isa11y.is_a11y===true){contseizures+=1}else if(isa11y.is_a11y===null){NotAccessibleSeizures+=1}else{contseizuresFalse+=1}
							}if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}if(isa11y.name==='captionsEmbedded'){
								if(isa11y.is_a11y===true){contCaptions+=1}else if(isa11y.is_a11y===null){NotAccessibleCaptions+=1}else{contCaptionsFalse+=1}
							}if(isa11y.name==='audioDescription'){
								if(isa11y.is_a11y===true){contaudioDescription+=1}else if(isa11y.is_a11y===null){NotAccessibleDescription+=1}else{contaudioDescriptionFalse+=1}
							}if(isa11y.name==='signLanguage'){
								if(isa11y.is_a11y===true){contsignLanguage+=1}else if(isa11y.is_a11y===null){NotAccessibleSign+=1}else{contsignLanguageFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+6
				}
         })
			variablesUnidad.push({
				title: unit.name, 
				contText:contText,
				contTextFalse:contTextFalse,
				contCaptions:contCaptions,
				contCaptionsFalse:contCaptionsFalse,
				contwarningAlert:contwarningAlert,
				contwarningAlertFalse:contwarningAlertFalse,
				contextendedTime:contextendedTime,
				contextendedTimeFalse:contextendedTimeFalse,
				contnoTime:contnoTime,
				contnoTimeFalse:contnoTimeFalse,
				contseizures:contseizures,
				contseizuresFalse:contseizuresFalse,
				contaudioDescription:contaudioDescription,
				contaudioDescriptionFalse:contaudioDescriptionFalse,
				contsignLanguage:contsignLanguage,
				contsignLanguageFalse:contsignLanguageFalse,
				NotAccessiblenoTime,
				NotAccessibleextendTime,
				NotAccessibleAlert,
				NotAccessibleSeizures,
				NotAccessibleCaptions,
				NotAccessibleDescription,
				NotAccessibleSign,
			})

			 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
			 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
			 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
			 contsignLanguage=0;  contsignLanguageFalse=0; 
			 NotAccessiblenoTime=0
			 NotAccessibleextendTime=0
			 NotAccessibleAlert=0
			 NotAccessibleSeizures=0
			 NotAccessibleCaptions=0
			 NotAccessibleDescription=0
			 NotAccessibleSign=0
      })
	  
		props.courseInformation.program.map((unit, indexUnit)=>{
			//cabezera de la unidad
			unit.lessons.map((lesson,indexLesson)=>{
				lesson.items.map((item,indexItem)=>{
					if(item.type==='image' ){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}
							})
							:
							tasknoconfig.lesson=tasknoconfig.lesson+1

					}else if(item.type==='audio'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}
							})
							:
							tasknoconfig.lesson=tasknoconfig.lesson+3
					}else if(item.type==='quiz'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una quiz
								if(isa11y.name==='noTime'){
									if(isa11y.is_a11y===true){contnoTime+=1} else if(isa11y.is_a11y===null){NotAccessiblenoTime+=1} else {contnoTimeFalse+=1}
								} if(isa11y.name==='extendedTime'){
									if(isa11y.is_a11y===true){contextendedTime+=1}else if(isa11y.is_a11y===null){NotAccessibleextendTime+=1}else{contextendedTimeFalse+=1}
								} if(isa11y.name==='warningAlert'){
									if(isa11y.is_a11y===true){contwarningAlert+=1}else if(isa11y.is_a11y===null){NotAccessibleAlert+=1}else{contwarningAlertFalse+=1}
								}
							})
							:
							tasknoconfig.lesson=tasknoconfig.lesson+3
					}else if(item.type==='video'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una video
								if(isa11y.name==='seizures'){
									if(isa11y.is_a11y===true){contseizures+=1}else if(isa11y.is_a11y===null){NotAccessibleSeizures+=1}else{contseizuresFalse+=1}
								}if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}if(isa11y.name==='captionsEmbedded'){
									if(isa11y.is_a11y===true){contCaptions+=1}else if(isa11y.is_a11y===null){NotAccessibleCaptions+=1}else{contCaptionsFalse+=1}
								}if(isa11y.name==='audioDescription'){
									if(isa11y.is_a11y===true){contaudioDescription+=1}else if(isa11y.is_a11y===null){NotAccessibleDescription+=1}else{contaudioDescriptionFalse+=1}
								}if(isa11y.name==='signLanguage'){
									if(isa11y.is_a11y===true){contsignLanguage+=1}else if(isa11y.is_a11y===null){NotAccessibleSign+=1}else{contsignLanguageFalse+=1}
								}
							})
							:
						tasknoconfig.lesson=tasknoconfig.lesson+6
					}
				})
				
				variablesLeccion.push({
					title: lesson.name, 
					contText:contText,
					contTextFalse:contTextFalse,
					contCaptions:contCaptions,
					contCaptionsFalse:contCaptionsFalse,
					contwarningAlert:contwarningAlert,
					contwarningAlertFalse:contwarningAlertFalse,
					contextendedTime:contextendedTime,
					contextendedTimeFalse:contextendedTimeFalse,
					contnoTime:contnoTime,
					contnoTimeFalse:contnoTimeFalse,
					contseizures:contseizures,
					contseizuresFalse:contseizuresFalse,
					contaudioDescription:contaudioDescription,
					contaudioDescriptionFalse:contaudioDescriptionFalse,
					contsignLanguage:contsignLanguage,
					contsignLanguageFalse:contsignLanguageFalse,
					NotAccessiblenoTime,
					NotAccessibleextendTime,
					NotAccessibleAlert,
					NotAccessibleSeizures,
					NotAccessibleCaptions,
					NotAccessibleDescription,
					NotAccessibleSign,
				})
				contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
				contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
				contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
				contsignLanguage=0;  contsignLanguageFalse=0
				NotAccessiblenoTime=0
				NotAccessibleextendTime=0
				NotAccessibleAlert=0
				NotAccessibleSeizures=0
				NotAccessibleCaptions=0
				NotAccessibleDescription=0
				NotAccessibleSign=0
			})
      })
		
		//calcula {title: "Topic 1", a11yValid: 70.52506403352295, a11yMisConfig: 20, a11yNotConfig: 9.474935966477052}
		//{title: "Topic 1", a11yValid: 70.52506403352295, a11yMisConfig: 0, a11yNotConfig: 0}
		variablesUnidad.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse+value.contnoTimeFalse+value.contextendedTimeFalse+
			value.contwarningAlertFalse)
			let configvisual=(value.contText+value.contaudioDescription+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleVisual=(value.NotAccessibleDescription+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalvisual=(noconfigvisual+configvisual+notAccessibleVisual)
			let visual=((configvisual*100)/totalvisual)
			console.log("configvisual y noconfigvisual,",configvisual,noconfigvisual,notAccessibleVisual )
			
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contsignLanguageFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let confighearing=(value.contText+value.contCaptions+value.contsignLanguage+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleHearing=(value.NotAccessibleCaptions+value.NotAccessibleSign+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalhearing=(noconfighearing+confighearing+notAccessibleHearing)
			let hearing=((confighearing*100)/totalhearing)
			console.log("confighearing y noconfighearing,",confighearing,noconfighearing,notAccessibleHearing)

			//para cognitive
			let noconfigcognitive=(value.contTextFalse+value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configcognitive=(value.contText+value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleCognitive=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalcognitive=(noconfigcognitive+configcognitive+notAccessibleCognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			
			//para diversity
			let noconfigdiversity=(value.contCaptionsFalse+value.contTextFalse+value.contsignLanguageFalse+ value.contaudioDescriptionFalse+
			value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configdiversity=(value.contCaptions+value.contText+value.contsignLanguage+ value.contseizures+
			value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contaudioDescription)
			let notAccessibleDiversity=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+
				value.NotAccessibleAlert+value.NotAccessibleCaptions+value.NotAccessibleDescription+value.NotAccessibleSign)
			let totaldiversity=(noconfigdiversity+configdiversity+notAccessibleDiversity)
			let diversity=((configdiversity*100)/totaldiversity)
			
			console.log("configdiversity y noconfigdiversity,",configdiversity,noconfigdiversity,notAccessibleDiversity)
			let totalconfig=0
			let totalnoconfig=0
			let totalnoaccessible=0

			let audiences=props.courseInformation.support[1];
			if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false 
			&& audiences[3].isChecked===false ){//cognitive
				totalconfig=  (totalconfig+configcognitive)    
				totalnoconfig=(totalnoconfig+noconfigcognitive)  
				totalnoaccessible=(totalnoaccessible+notAccessibleCognitive)
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true 
				&& audiences[3].isChecked===false ){//hearing
					totalconfig=  (totalconfig+confighearing)    
					totalnoconfig=(totalnoconfig+noconfighearing) 
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing)  
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===false
				&& audiences[3].isChecked===true ){//visual
					totalconfig=  (totalconfig+configvisual)    
					totalnoconfig=(totalnoconfig+noconfigvisual) 
					totalnoaccessible=(totalnoaccessible+notAccessibleVisual)
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===true && audiences[2].isChecked===false
				&& audiences[3].isChecked===false ){//eldery
					totalconfig=  (totalconfig+configdiversity)    
					totalnoconfig=(totalnoconfig+noconfigdiversity)  
					totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true
				&& audiences[3].isChecked===true ){//visual and hearing
					totalconfig=  (totalconfig+confighearing+value.contaudioDescription)    
					totalnoconfig=(totalnoconfig+noconfighearing+value.contaudioDescriptionFalse)   
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleVisual)
			}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false
				   && audiences[3].isChecked===true ){//visual and cognitive-
					totalconfig=  (totalconfig+configcognitive+value.contaudioDescription)    
					totalnoconfig=(totalnoconfig+noconfigcognitive+value.contaudioDescriptionFalse)  
					totalnoaccessible=(totalnoaccessible+notAccessibleVisual+notAccessibleCognitive) 
			}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===true
					&& audiences[3].isChecked===false ){//hearing and cognitive
					totalconfig=  (totalconfig+confighearing+value.contseizures) 
					totalnoconfig=(totalnoconfig+noconfighearing+value.contseizuresFalse)  
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleCognitive) 
			}else{//eldery
					totalconfig=  (totalconfig+configdiversity)    
					totalnoconfig=(totalnoconfig+noconfigdiversity)   
					totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}
		
			contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
			contWithInclusionGol.todo=contWithInclusionGol.todo+totalnoaccessible+totalnoconfig
			contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
			setWithInclusionGol(contWithInclusionGol)
			totalconfig=0
			totalnoconfig=0
			totalnoaccessible=0
			
			percentagebyUnit.push([
				{title: value.title, a11yValid:isNaN(visual)?0:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?0:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?0:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?0:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})
		
		
		variablesLeccion.map((value,index)=>{
				//para visual
				let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse+value.contnoTimeFalse+value.contextendedTimeFalse+
				value.contwarningAlertFalse)
				let configvisual=(value.contText+value.contaudioDescription+value.contnoTime+value.contextendedTime+value.contwarningAlert)
				let notAccessibleVisual=(value.NotAccessibleDescription+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
				let totalvisual=(noconfigvisual+configvisual+notAccessibleVisual)
				let visual=((configvisual*100)/totalvisual)
				//para hearing
				let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contsignLanguageFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
				let confighearing=(value.contText+value.contCaptions+value.contsignLanguage+value.contnoTime+value.contextendedTime+value.contwarningAlert)
				let notAccessibleHearing=(value.NotAccessibleCaptions+value.NotAccessibleSign+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
				let totalhearing=(noconfighearing+confighearing+notAccessibleHearing)
				let hearing=((confighearing*100)/totalhearing)
				//para cognitive
				let noconfigcognitive=(value.contTextFalse+value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
				let configcognitive=(value.contText+value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
				let notAccessibleCognitive=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
				let totalcognitive=(noconfigcognitive+configcognitive+notAccessibleCognitive)
				let cognitive=((configcognitive*100)/totalcognitive)	
				//para diversity
				let noconfigdiversity=(value.contCaptionsFalse+value.contTextFalse+value.contsignLanguageFalse+ value.contaudioDescriptionFalse+
				value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
				let configdiversity=(value.contCaptions+value.contText+value.contsignLanguage+ value.contseizures+
				value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contaudioDescription)
				let notAccessibleDiversity=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+
					value.NotAccessibleAlert+value.NotAccessibleCaptions+value.NotAccessibleDescription+value.NotAccessibleSign)
				let totaldiversity=(noconfigdiversity+configdiversity+notAccessibleDiversity)
				let diversity=((configdiversity*100)/totaldiversity)
				
				let totalnoconfig=0
				let totalnoaccessible=0
				let audiences=props.courseInformation.support[1];
				if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false 
				&& audiences[3].isChecked===false ){//cognitive
					totalconfig=  (totalconfig+configcognitive)    
					totalnoconfig=(totalnoconfig+noconfigcognitive)  
					totalnoaccessible=(totalnoaccessible+notAccessibleCognitive)
				}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true 
					&& audiences[3].isChecked===false ){//hearing
						totalconfig=  (totalconfig+confighearing)    
						totalnoconfig=(totalnoconfig+noconfighearing) 
						totalnoaccessible=(totalnoaccessible+notAccessibleHearing)  
				}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===false
					&& audiences[3].isChecked===true ){//visual
						totalconfig=  (totalconfig+configvisual)    
						totalnoconfig=(totalnoconfig+noconfigvisual) 
						totalnoaccessible=(totalnoaccessible+notAccessibleVisual)
				}else if(audiences[0].isChecked===false && audiences[1].isChecked===true && audiences[2].isChecked===false
					&& audiences[3].isChecked===false ){//eldery
						totalconfig=  (totalconfig+configdiversity)    
						totalnoconfig=(totalnoconfig+noconfigdiversity)  
						totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
				}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true
					&& audiences[3].isChecked===true ){//visual and hearing
						totalconfig=  (totalconfig+confighearing+value.contaudioDescription)    
						totalnoconfig=(totalnoconfig+noconfighearing+value.contaudioDescriptionFalse)   
						totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleVisual)
				}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false
						&& audiences[3].isChecked===true ){//visual and cognitive-
						totalconfig=  (totalconfig+configcognitive+value.contaudioDescription)    
						totalnoconfig=(totalnoconfig+noconfigcognitive+value.contaudioDescriptionFalse)  
						totalnoaccessible=(totalnoaccessible+notAccessibleVisual+notAccessibleCognitive) 
				}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===true
						&& audiences[3].isChecked===false ){//hearing and cognitive
						totalconfig=  (totalconfig+confighearing+value.contseizures) 
						totalnoconfig=(totalnoconfig+noconfighearing+value.contseizuresFalse)  
						totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleCognitive) 
				}else{//eldery
						totalconfig=  (totalconfig+configdiversity)    
						totalnoconfig=(totalnoconfig+noconfigdiversity)   
						totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
				}
			
				contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
				contWithInclusionGol.todo=contWithInclusionGol.todo+totalnoaccessible+totalnoconfig
				contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
				setWithInclusionGol(contWithInclusionGol)
				totalconfig=0
				totalnoconfig=0
				totalnoaccessible=0
				
				percentagebyLesson.push([
					{title: value.title, a11yValid:isNaN(visual)?0:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
					{title: value.title, a11yValid:isNaN(hearing)?0:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
					{title: value.title, a11yValid:isNaN(cognitive)?0:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
					{title: value.title, a11yValid:isNaN(diversity)?0:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
				])
				visual=0, hearing=0, cognitive=0, diversity=0
		})

		//console.log("percentagebyUnit y percentagebyLesson-------->",percentagebyUnit, percentagebyLesson )
		let byUnit=0
		let byLesson=0
		percentagebyUnit.map((unit, indexUnit)=>{
			unit.map((percentage, index)=>{
				byUnit=byUnit+percentage.a11yValid
			})
		})
		byUnit=((byUnit/4)/percentagebyUnit.length)
		percentagebyLesson.map((unit, indexUnit)=>{
			unit.map((percentage, index)=>{
				byLesson=byLesson+percentage.a11yValid
			})
		})
		byLesson=((byLesson/4)/percentagebyUnit.length)
		console.log("percentagebyUnit y percentagebyLesson-------->",percentagebyUnit, percentagebyLesson, byUnit, byLesson )
		let sum=((byUnit+byLesson)/2)
		if(sum===100){setSimulate("allAchieved")}


		//contWithInclusionGol.todo=(tasknoconfig.unit+tasknoconfig.lesson)
		contWithInclusionGol.averageCourse=sum
		setWithInclusionGol(contWithInclusionGol)
		withoutInclusionGol.percentagebyUnit=percentagebyUnit
		withoutInclusionGol.percentagebyLesson=percentagebyLesson
		setwithoutInclusionGol(withoutInclusionGol)
		newRandomTopics('unitslessons')

		
	

	};
	const TopicsCourse=() => {
		let variablesUnidad=[]
		let percentagebyUnit=[]
		let contText=0; 
		let contTextFalse=0; let contCaptions=0; let contCaptionsFalse=0; let contwarningAlert=0
		let contwarningAlertFalse=0; let contextendedTime=0; let contextendedTimeFalse=0; let contnoTime=0;let contnoTimeFalse=0; 
		let contseizures=0; let contseizuresFalse=0; let contaudioDescription=0; let contaudioDescriptionFalse=0; 
		let contsignLanguage=0; let contsignLanguageFalse=0
		let NotAccessiblenoTime=0
		let NotAccessibleextendTime=0
		let NotAccessibleAlert=0
		let NotAccessibleSeizures=0
		let NotAccessibleCaptions=0
		let NotAccessibleDescription=0
		let NotAccessibleSign=0


      props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.items.map((item,indexItem)=>{
            if(item.type==='image' ){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+1
				}else if(item.type==='audio'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='quiz'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='noTime'){
								if(isa11y.is_a11y===true){contnoTime+=1} else if(isa11y.is_a11y===null){NotAccessiblenoTime+=1} else {contnoTimeFalse+=1}
							} if(isa11y.name==='extendedTime'){
								if(isa11y.is_a11y===true){contextendedTime+=1}else if(isa11y.is_a11y===null){NotAccessibleextendTime+=1}else{contextendedTimeFalse+=1}
							} if(isa11y.name==='warningAlert'){
								if(isa11y.is_a11y===true){contwarningAlert+=1}else if(isa11y.is_a11y===null){NotAccessibleAlert+=1}else{contwarningAlertFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='video'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='seizures'){
								if(isa11y.is_a11y===true){contseizures+=1}else if(isa11y.is_a11y===null){NotAccessibleSeizures+=1}else{contseizuresFalse+=1}
							}if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}if(isa11y.name==='captionsEmbedded'){
								if(isa11y.is_a11y===true){contCaptions+=1}else if(isa11y.is_a11y===null){NotAccessibleCaptions+=1}else{contCaptionsFalse+=1}
							}if(isa11y.name==='audioDescription'){
								if(isa11y.is_a11y===true){contaudioDescription+=1}else if(isa11y.is_a11y===null){NotAccessibleDescription+=1}else{contaudioDescriptionFalse+=1}
							}if(isa11y.name==='signLanguage'){
								if(isa11y.is_a11y===true){contsignLanguage+=1}else if(isa11y.is_a11y===null){NotAccessibleSign+=1}else{contsignLanguageFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+6
				}
         })
			variablesUnidad.push({
				title: unit.name, 
				contText:contText,
				contTextFalse:contTextFalse,
				contCaptions:contCaptions,
				contCaptionsFalse:contCaptionsFalse,
				contwarningAlert:contwarningAlert,
				contwarningAlertFalse:contwarningAlertFalse,
				contextendedTime:contextendedTime,
				contextendedTimeFalse:contextendedTimeFalse,
				contnoTime:contnoTime,
				contnoTimeFalse:contnoTimeFalse,
				contseizures:contseizures,
				contseizuresFalse:contseizuresFalse,
				contaudioDescription:contaudioDescription,
				contaudioDescriptionFalse:contaudioDescriptionFalse,
				contsignLanguage:contsignLanguage,
				contsignLanguageFalse:contsignLanguageFalse,
				NotAccessiblenoTime,
				NotAccessibleextendTime,
				NotAccessibleAlert,
				NotAccessibleSeizures,
				NotAccessibleCaptions,
				NotAccessibleDescription,
				NotAccessibleSign,
			})

			 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
			 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
			 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
			 contsignLanguage=0;  contsignLanguageFalse=0; 
			 NotAccessiblenoTime=0
			 NotAccessibleextendTime=0
			 NotAccessibleAlert=0
			 NotAccessibleSeizures=0
			 NotAccessibleCaptions=0
			 NotAccessibleDescription=0
			 NotAccessibleSign=0
      })
	  //let seizuresFix=0 // to count seizures
		console.log("VARIABLES UNIDAD", variablesUnidad	)
		variablesUnidad.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse+value.contnoTimeFalse+value.contextendedTimeFalse+
			value.contwarningAlertFalse)
			let configvisual=(value.contText+value.contaudioDescription+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleVisual=(value.NotAccessibleDescription+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalvisual=(noconfigvisual+configvisual+notAccessibleVisual)
			let visual=((configvisual*100)/totalvisual)
			
			
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contsignLanguageFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let confighearing=(value.contText+value.contCaptions+value.contsignLanguage+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleHearing=(value.NotAccessibleCaptions+value.NotAccessibleSign+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalhearing=(noconfighearing+confighearing+notAccessibleHearing)
			let hearing=((confighearing*100)/totalhearing)
			

			//para cognitive
			let noconfigcognitive=(value.contTextFalse+value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configcognitive=(value.contText+value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleCognitive=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalcognitive=(noconfigcognitive+configcognitive+notAccessibleCognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			
			//para diversity
			let noconfigdiversity=(value.contCaptionsFalse+value.contTextFalse+value.contsignLanguageFalse+ value.contaudioDescriptionFalse+
			value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configdiversity=(value.contCaptions+value.contText+value.contsignLanguage+ value.contseizures+
			value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contaudioDescription)
			let notAccessibleDiversity=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+
				value.NotAccessibleAlert+value.NotAccessibleCaptions+value.NotAccessibleDescription+value.NotAccessibleSign)
			let totaldiversity=(noconfigdiversity+configdiversity+notAccessibleDiversity)
			let diversity=((configdiversity*100)/totaldiversity)
			
			
			let totalconfig=0
			let totalnoconfig=0
			let totalnoaccessible=0

			let audiences=props.courseInformation.support[1];
			if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false 
			&& audiences[3].isChecked===false ){//cognitive
				totalconfig=  (totalconfig+configcognitive)    
				totalnoconfig=(totalnoconfig+noconfigcognitive)  
				totalnoaccessible=(totalnoaccessible+notAccessibleCognitive)
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true 
				&& audiences[3].isChecked===false ){//hearing
					totalconfig=  (totalconfig+confighearing)    
					totalnoconfig=(totalnoconfig+noconfighearing) 
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing)  
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===false
				&& audiences[3].isChecked===true ){//visual
					totalconfig=  (totalconfig+configvisual)    
					totalnoconfig=(totalnoconfig+noconfigvisual) 
					totalnoaccessible=(totalnoaccessible+notAccessibleVisual)
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===true && audiences[2].isChecked===false
				&& audiences[3].isChecked===false ){//eldery
					totalconfig=  (totalconfig+configdiversity)    
					totalnoconfig=(totalnoconfig+noconfigdiversity)  
					totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true
				&& audiences[3].isChecked===true ){//visual and hearing
					totalconfig=  (totalconfig+confighearing+value.contaudioDescription)    
					totalnoconfig=(totalnoconfig+noconfighearing+value.contaudioDescriptionFalse)   
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleVisual)
			}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false
				   && audiences[3].isChecked===true ){//visual and cognitive-
					totalconfig=  (totalconfig+configcognitive+value.contaudioDescription)    
					totalnoconfig=(totalnoconfig+noconfigcognitive+value.contaudioDescriptionFalse)  
					totalnoaccessible=(totalnoaccessible+notAccessibleVisual+notAccessibleCognitive) 
			}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===true
					&& audiences[3].isChecked===false ){//hearing and cognitive
					totalconfig=  (totalconfig+confighearing+value.contseizures) 
					totalnoconfig=(totalnoconfig+noconfighearing+value.contseizuresFalse)  
					totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleCognitive) 
			}else{//eldery
					totalconfig=  (totalconfig+configdiversity)    
					totalnoconfig=(totalnoconfig+noconfigdiversity)   
					totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}
		
			contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
			contWithInclusionGol.todo=contWithInclusionGol.todo+totalnoaccessible+totalnoconfig
			contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
			setWithInclusionGol(contWithInclusionGol)
			totalconfig=0
			totalnoconfig=0
			totalnoaccessible=0
			
			percentagebyUnit.push([
				{title: value.title, a11yValid:isNaN(visual)?0:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?0:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?0:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?0:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})
		
		let byUnit=0
		percentagebyUnit.map((unit, indexUnit)=>{
			unit.map((percentage, index)=>{
				byUnit=byUnit+percentage.a11yValid
			})
		})
		byUnit=((byUnit/4)/percentagebyUnit.length)
		contWithInclusionGol.averageCourse=byUnit
		//contWithInclusionGol.todo=(tasknoconfig.unit)
		
		setWithInclusionGol(contWithInclusionGol)
		if(byUnit===100){
			setSimulate("allAchieved")
		}
		withoutInclusionGol.percentagebyUnit=percentagebyUnit
		withoutInclusionGol.percentagebyLesson=[]
		setwithoutInclusionGol(withoutInclusionGol)
		//console.log("En topicos totalconfig", contWithInclusionGol,percentagebyUnit )
		newRandomTopics('topic')
	};
	const TemplateCourse=() =>{
		let variablesUnidad=[]
		let variablesTemplate=[]
		let percentagebyUnit=[]
		let percentagebyTemplate=[]
		let percentagebyLesson=[]
		let contText=0; 
		let contTextFalse=0; let contCaptions=0; let contCaptionsFalse=0; let contwarningAlert=0
		let contwarningAlertFalse=0; let contextendedTime=0; let contextendedTimeFalse=0; let contnoTime=0;let contnoTimeFalse=0; 
		let contseizures=0; let contseizuresFalse=0; let contaudioDescription=0; let contaudioDescriptionFalse=0; 
		let contsignLanguage=0; let contsignLanguageFalse=0
		let NotAccessiblenoTime=0
		let NotAccessibleextendTime=0
		let NotAccessibleAlert=0
		let NotAccessibleSeizures=0
		let NotAccessibleCaptions=0
		let NotAccessibleDescription=0
		let NotAccessibleSign=0

		props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.items.map((item,indexItem)=>{
				console.log("item.type",item.type)
            if(item.type==='image' ){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+1
				}else if(item.type==='audio'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='quiz'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='noTime'){
								if(isa11y.is_a11y===true){contnoTime+=1} else if(isa11y.is_a11y===null){NotAccessiblenoTime+=1} else {contnoTimeFalse+=1}
							} if(isa11y.name==='extendedTime'){
								if(isa11y.is_a11y===true){contextendedTime+=1}else if(isa11y.is_a11y===null){NotAccessibleextendTime+=1}else{contextendedTimeFalse+=1}
							} if(isa11y.name==='warningAlert'){
								if(isa11y.is_a11y===true){contwarningAlert+=1}else if(isa11y.is_a11y===null){NotAccessibleAlert+=1}else{contwarningAlertFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+3
				}else if(item.type==='video'){
					item.attributes.accessibility.isA11Y!=undefined?
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='seizures'){
								if(isa11y.is_a11y===true){contseizures+=1}else if(isa11y.is_a11y===null){NotAccessibleSeizures+=1}else{contseizuresFalse+=1}
							}if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}if(isa11y.name==='captionsEmbedded'){
								if(isa11y.is_a11y===true){contCaptions+=1}else if(isa11y.is_a11y===null){NotAccessibleCaptions+=1}else{contCaptionsFalse+=1}
							}if(isa11y.name==='audioDescription'){
								if(isa11y.is_a11y===true){contaudioDescription+=1}else if(isa11y.is_a11y===null){NotAccessibleDescription+=1}else{contaudioDescriptionFalse+=1}
							}if(isa11y.name==='signLanguage'){
								if(isa11y.is_a11y===true){contsignLanguage+=1}else if(isa11y.is_a11y===null){NotAccessibleSign+=1}else{contsignLanguageFalse+=1}
							}
						})
						:
						tasknoconfig.unit=tasknoconfig.unit+6
				}
         })
			variablesUnidad.push({
				title: unit.name, 
				contText:contText,
				contTextFalse:contTextFalse,
				contCaptions:contCaptions,
				contCaptionsFalse:contCaptionsFalse,
				contwarningAlert:contwarningAlert,
				contwarningAlertFalse:contwarningAlertFalse,
				contextendedTime:contextendedTime,
				contextendedTimeFalse:contextendedTimeFalse,
				contnoTime:contnoTime,
				contnoTimeFalse:contnoTimeFalse,
				contseizures:contseizures,
				contseizuresFalse:contseizuresFalse,
				contaudioDescription:contaudioDescription,
				contaudioDescriptionFalse:contaudioDescriptionFalse,
				contsignLanguage:contsignLanguage,
				contsignLanguageFalse:contsignLanguageFalse,
				NotAccessiblenoTime,
				NotAccessibleextendTime,
				NotAccessibleAlert,
				NotAccessibleSeizures,
				NotAccessibleCaptions,
				NotAccessibleDescription,
				NotAccessibleSign,
			})

			 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
			 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
			 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
			 contsignLanguage=0;  contsignLanguageFalse=0; 
			 NotAccessiblenoTime=0
			 NotAccessibleextendTime=0
			 NotAccessibleAlert=0
			 NotAccessibleSeizures=0
			 NotAccessibleCaptions=0
			 NotAccessibleDescription=0
			 NotAccessibleSign=0
		})

		props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.activities.map((items,indexItems)=>{
				items.items.map((item, indexItem)=>{
					if(item.type==='image' ){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}
							})
							:
							tasknoconfig.unit=tasknoconfig.unit+1
					}else if(item.type==='audio'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}
							})
							:
							tasknoconfig.unit=tasknoconfig.unit+3
					}else if(item.type==='quiz'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='noTime'){
									if(isa11y.is_a11y===true){contnoTime+=1} else if(isa11y.is_a11y===null){NotAccessiblenoTime+=1} else {contnoTimeFalse+=1}
								} if(isa11y.name==='extendedTime'){
									if(isa11y.is_a11y===true){contextendedTime+=1}else if(isa11y.is_a11y===null){NotAccessibleextendTime+=1}else{contextendedTimeFalse+=1}
								} if(isa11y.name==='warningAlert'){
									if(isa11y.is_a11y===true){contwarningAlert+=1}else if(isa11y.is_a11y===null){NotAccessibleAlert+=1}else{contwarningAlertFalse+=1}
								}
							})
							:
							tasknoconfig.unit=tasknoconfig.unit+3
					}else if(item.type==='video'){
						item.attributes.accessibility.isA11Y!=undefined?
							item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
								if(isa11y.name==='seizures'){
									if(isa11y.is_a11y===true){contseizures+=1}else if(isa11y.is_a11y===null){NotAccessibleSeizures+=1}else{contseizuresFalse+=1}
								}if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
									if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
								}if(isa11y.name==='captionsEmbedded'){
									if(isa11y.is_a11y===true){contCaptions+=1}else if(isa11y.is_a11y===null){NotAccessibleCaptions+=1}else{contCaptionsFalse+=1}
								}if(isa11y.name==='audioDescription'){
									if(isa11y.is_a11y===true){contaudioDescription+=1}else if(isa11y.is_a11y===null){NotAccessibleDescription+=1}else{contaudioDescriptionFalse+=1}
								}if(isa11y.name==='signLanguage'){
									if(isa11y.is_a11y===true){contsignLanguage+=1}else if(isa11y.is_a11y===null){NotAccessibleSign+=1}else{contsignLanguageFalse+=1}
								}
							})
							:
							tasknoconfig.unit=tasknoconfig.unit+6
					}
				}) 
				variablesTemplate.push({
					title: items.name, 
					contText:contText,
					contTextFalse:contTextFalse,
					contCaptions:contCaptions,
					contCaptionsFalse:contCaptionsFalse,
					contwarningAlert:contwarningAlert,
					contwarningAlertFalse:contwarningAlertFalse,
					contextendedTime:contextendedTime,
					contextendedTimeFalse:contextendedTimeFalse,
					contnoTime:contnoTime,
					contnoTimeFalse:contnoTimeFalse,
					contseizures:contseizures,
					contseizuresFalse:contseizuresFalse,
					contaudioDescription:contaudioDescription,
					contaudioDescriptionFalse:contaudioDescriptionFalse,
					contsignLanguage:contsignLanguage,
					contsignLanguageFalse:contsignLanguageFalse,
					NotAccessiblenoTime,
					NotAccessibleextendTime,
					NotAccessibleAlert,
					NotAccessibleSeizures,
					NotAccessibleCaptions,
					NotAccessibleDescription,
					NotAccessibleSign,
				})
	
				 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
				 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
				 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
				 contsignLanguage=0;  contsignLanguageFalse=0; 
				 NotAccessiblenoTime=0
				 NotAccessibleextendTime=0
				 NotAccessibleAlert=0
				 NotAccessibleSeizures=0
				 NotAccessibleCaptions=0
				 NotAccessibleDescription=0
				 NotAccessibleSign=0
         })	
		})

		
		variablesUnidad.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse+value.contnoTimeFalse+value.contextendedTimeFalse+
			value.contwarningAlertFalse)
			let configvisual=(value.contText+value.contaudioDescription+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleVisual=(value.NotAccessibleDescription+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalvisual=(noconfigvisual+configvisual+notAccessibleVisual)
			let visual=((configvisual*100)/totalvisual)
		
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contsignLanguageFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let confighearing=(value.contText+value.contCaptions+value.contsignLanguage+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleHearing=(value.NotAccessibleCaptions+value.NotAccessibleSign+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalhearing=(noconfighearing+confighearing+notAccessibleHearing)
			let hearing=((confighearing*100)/totalhearing)
		
			//para cognitive
			let noconfigcognitive=(value.contTextFalse+value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configcognitive=(value.contText+value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleCognitive=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalcognitive=(noconfigcognitive+configcognitive+notAccessibleCognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			//para diversity
			let noconfigdiversity=(value.contCaptionsFalse+value.contTextFalse+value.contsignLanguageFalse+ value.contaudioDescriptionFalse+
			value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configdiversity=(value.contCaptions+value.contText+value.contsignLanguage+ value.contseizures+
			value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contaudioDescription)
			let notAccessibleDiversity=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+
				value.NotAccessibleAlert+value.NotAccessibleCaptions+value.NotAccessibleDescription+value.NotAccessibleSign)
			let totaldiversity=(noconfigdiversity+configdiversity+notAccessibleDiversity)
			let diversity=((configdiversity*100)/totaldiversity)
			
			let totalconfig=0
			let totalnoconfig=0
			let totalnoaccessible=0
			let audiences=props.courseInformation.support[1];
			if(audiences!=undefined){
				if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false 
					&& audiences[3].isChecked===false ){//cognitive
						totalconfig=  (totalconfig+configcognitive)    
						totalnoconfig=(totalnoconfig+noconfigcognitive)  
						totalnoaccessible=(totalnoaccessible+notAccessibleCognitive)
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true 
						&& audiences[3].isChecked===false ){//hearing
							totalconfig=  (totalconfig+confighearing)    
							totalnoconfig=(totalnoconfig+noconfighearing) 
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing)  
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===false
						&& audiences[3].isChecked===true ){//visual
							totalconfig=  (totalconfig+configvisual)    
							totalnoconfig=(totalnoconfig+noconfigvisual) 
							totalnoaccessible=(totalnoaccessible+notAccessibleVisual)
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===true && audiences[2].isChecked===false
						&& audiences[3].isChecked===false ){//eldery
							totalconfig=  (totalconfig+configdiversity)    
							totalnoconfig=(totalnoconfig+noconfigdiversity)  
							totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true
						&& audiences[3].isChecked===true ){//visual and hearing
							totalconfig=  (totalconfig+confighearing+value.contaudioDescription)    
							totalnoconfig=(totalnoconfig+noconfighearing+value.contaudioDescriptionFalse)   
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleVisual)
					}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false
							&& audiences[3].isChecked===true ){//visual and cognitive-
							totalconfig=  (totalconfig+configcognitive+value.contaudioDescription)    
							totalnoconfig=(totalnoconfig+noconfigcognitive+value.contaudioDescriptionFalse)  
							totalnoaccessible=(totalnoaccessible+notAccessibleVisual+notAccessibleCognitive) 
					}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===true
							&& audiences[3].isChecked===false ){//hearing and cognitive
							totalconfig=  (totalconfig+confighearing+value.contseizures) 
							totalnoconfig=(totalnoconfig+noconfighearing+value.contseizuresFalse)  
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleCognitive) 
					}else{//eldery
							totalconfig=  (totalconfig+configdiversity)    
							totalnoconfig=(totalnoconfig+noconfigdiversity)   
							totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
					}
			}else{
				totalconfig=  (totalconfig+configdiversity)    
				totalnoconfig=(totalnoconfig+noconfigdiversity)   
				totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}
		
			contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
			contWithInclusionGol.todo=contWithInclusionGol.todo+totalnoaccessible+totalnoconfig
			contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
			setWithInclusionGol(contWithInclusionGol)
			totalconfig=0
			totalnoconfig=0
			totalnoaccessible=0
			
			percentagebyUnit.push([
				{title: value.title, a11yValid:isNaN(visual)?0:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?0:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?0:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?0:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})

		variablesTemplate.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse+value.contnoTimeFalse+value.contextendedTimeFalse+
			value.contwarningAlertFalse)
			let configvisual=(value.contText+value.contaudioDescription+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleVisual=(value.NotAccessibleDescription+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalvisual=(noconfigvisual+configvisual+notAccessibleVisual)
			let visual=((configvisual*100)/totalvisual)
			
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contsignLanguageFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let confighearing=(value.contText+value.contCaptions+value.contsignLanguage+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleHearing=(value.NotAccessibleCaptions+value.NotAccessibleSign+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalhearing=(noconfighearing+confighearing+notAccessibleHearing)
			let hearing=((confighearing*100)/totalhearing)
		

			//para cognitive
			let noconfigcognitive=(value.contTextFalse+value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configcognitive=(value.contText+value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let notAccessibleCognitive=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+value.NotAccessibleAlert)
			let totalcognitive=(noconfigcognitive+configcognitive+notAccessibleCognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			
			//para diversity
			let noconfigdiversity=(value.contCaptionsFalse+value.contTextFalse+value.contsignLanguageFalse+ value.contaudioDescriptionFalse+
			value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let configdiversity=(value.contCaptions+value.contText+value.contsignLanguage+ value.contseizures+
			value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contaudioDescription)
			let notAccessibleDiversity=(value.NotAccessibleSeizures+value.NotAccessiblenoTime+value.NotAccessibleextendTime+
				value.NotAccessibleAlert+value.NotAccessibleCaptions+value.NotAccessibleDescription+value.NotAccessibleSign)
			let totaldiversity=(noconfigdiversity+configdiversity+notAccessibleDiversity)
			let diversity=((configdiversity*100)/totaldiversity)
			
			
			let totalconfig=0
			let totalnoconfig=0
			let totalnoaccessible=0

			let audiences=props.courseInformation.support[1];
			if(audiences!=undefined){
				if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false 
					&& audiences[3].isChecked===false ){//cognitive
						totalconfig=  (totalconfig+configcognitive)    
						totalnoconfig=(totalnoconfig+noconfigcognitive)  
						totalnoaccessible=(totalnoaccessible+notAccessibleCognitive)
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true 
						&& audiences[3].isChecked===false ){//hearing
							totalconfig=  (totalconfig+confighearing)    
							totalnoconfig=(totalnoconfig+noconfighearing) 
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing)  
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===false
						&& audiences[3].isChecked===true ){//visual
							totalconfig=  (totalconfig+configvisual)    
							totalnoconfig=(totalnoconfig+noconfigvisual) 
							totalnoaccessible=(totalnoaccessible+notAccessibleVisual)
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===true && audiences[2].isChecked===false
						&& audiences[3].isChecked===false ){//eldery
							totalconfig=  (totalconfig+configdiversity)    
							totalnoconfig=(totalnoconfig+noconfigdiversity)  
							totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
					}else if(audiences[0].isChecked===false && audiences[1].isChecked===false && audiences[2].isChecked===true
						&& audiences[3].isChecked===true ){//visual and hearing
							totalconfig=  (totalconfig+confighearing+value.contaudioDescription)    
							totalnoconfig=(totalnoconfig+noconfighearing+value.contaudioDescriptionFalse)   
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleVisual)
					}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===false
							&& audiences[3].isChecked===true ){//visual and cognitive-
							totalconfig=  (totalconfig+configcognitive+value.contaudioDescription)    
							totalnoconfig=(totalnoconfig+noconfigcognitive+value.contaudioDescriptionFalse)  
							totalnoaccessible=(totalnoaccessible+notAccessibleVisual+notAccessibleCognitive) 
					}else if(audiences[0].isChecked===true && audiences[1].isChecked===false && audiences[2].isChecked===true
							&& audiences[3].isChecked===false ){//hearing and cognitive
							totalconfig=  (totalconfig+confighearing+value.contseizures) 
							totalnoconfig=(totalnoconfig+noconfighearing+value.contseizuresFalse)  
							totalnoaccessible=(totalnoaccessible+notAccessibleHearing+notAccessibleCognitive) 
					}else{//eldery
							totalconfig=  (totalconfig+configdiversity)    
							totalnoconfig=(totalnoconfig+noconfigdiversity)   
							totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
					}
			}else{
				totalconfig=  (totalconfig+configdiversity)    
				totalnoconfig=(totalnoconfig+noconfigdiversity)   
				totalnoaccessible=(totalnoaccessible+notAccessibleDiversity) 
			}
		
			contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
			contWithInclusionGol.todo=contWithInclusionGol.todo+totalnoaccessible+totalnoconfig
			contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
			setWithInclusionGol(contWithInclusionGol)
			totalconfig=0
			totalnoconfig=0
			totalnoaccessible=0
			
			percentagebyTemplate.push([
				{title: value.title, a11yValid:isNaN(visual)?0:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?0:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?0:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?0:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
	})
		
		let byUnit=0
		let byTemplate=0
		percentagebyUnit.map((unit, indexUnit)=>{
			unit.map((percentage, index)=>{
				byUnit=byUnit+percentage.a11yValid
			})
		})
		byUnit=((byUnit/4)/percentagebyUnit.length)	
		percentagebyTemplate.map((unit, indexUnit)=>{
			unit.map((percentage, index)=>{
				byTemplate=byTemplate+percentage.a11yValid
			})
		})
		byTemplate=((byTemplate/4)/percentagebyTemplate.length)
		let sum=((byUnit+byTemplate)/2)
		if(sum===100){setSimulate("allAchieved")}

		
		contWithInclusionGol.averageCourse=sum
		setWithInclusionGol(contWithInclusionGol)
		withoutInclusionGol.percentagebyUnit=percentagebyUnit
		withoutInclusionGol.percentagebyLesson=percentagebyTemplate
		setwithoutInclusionGol(withoutInclusionGol)
		console.log("Datos:",byTemplate,byUnit,percentagebyTemplate , percentagebyUnit, withoutInclusionGol)
		newRandomTopics('unitslessons')

	}
	const [simulate, setSimulate] = React.useState(false);
	const [redirect, setredirect]=React.useState(null)
	if (redirect) {
		return <Redirect to={redirect} />
	 }

	 const changeRoute=()=>{
		setredirect("/someRoute")
		console.log("se va a cambiar de ruta ")
	 }
	
	return (
		<div className="course-information-container">
			<div className="form-input-column">		
			<h1 className='headAccessibility'>Accessibility Report</h1>
         {console.log("TopicsCourse----------", withoutInclusionGol, simulate,categories)}
			{simulate === "allAchieved" && (
				<React.Fragment>
					<div>Your course is fully accessible</div>
					<Grid
						container
						spacing={2}
						direction="row"
						justify="space-between"
						alignItems="flex-start"
					>
						{categories.map(category => (
							
								<AccessibilityAchieved
									Icon={category.icon}
									caption={category.label}
								/>
							
						))}
					</Grid>
				</React.Fragment>
			)}
         
         {simulate === "noInclusionGol" && (   
			 <React.Fragment>
					<div>
						You have not seleced any Inclusion Goals in Audience step, but
						considere review your Course Accessibility
					</div>
					<Grid container spacing={2}>
						{
						 categories.map(category => {
							 return(
								category.topics.length!=0?
								<Grid item xs={12} md={6}>
								<AccessibilityCard category={category} />
							</Grid>
							:undefined
							 )
							 
						 }) 	
						}
					</Grid>
			</React.Fragment> 
			)}

			{ simulate==='inclusionGolAchieved' && (
				<div>
					You have seleced {categories.filter(goals => goals.selected).map(category => category.label).toString()} as
					your Inclusion Goals in Audience step, based on this choose here is
					the accessibility results of your course.
				</div>
			)}

			{simulate === "inclusionGolAchieved" && (
				<div className={classes.allachieved}>
					<div className={classes.chartLabel}>
						You have achieved your Inclusion Goal!
					</div>		 
					<Grid 
						container 
						spacing={2}
						className={classes.allachieved}
					>
						{
							categories.filter(goals=>goals.selected).map((category)=>(
									<AccessibilityAchieved
										Icon={category.icon}
										caption={category.label}
									/>
							))
						}
					</Grid>
					<div className={classes.subtitle}>
						Now you have finished the accessibility set up for your Inclusion
						Gol, considere review accessibility for others impairments groups.
					</div>
					<Grid container spacing={2}>
						{categories
							.filter(c => !c.selected)
							.map(category => (
								<Grid item xs={12} md={6}>
									<AccessibilityCard category={category} />
								</Grid>
							))}
					</Grid>
				</div>
			)  }

			{ simulate === "inclusionGol" && (
				<div>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
						alignItems="stretch"
					>
						<Grid item xl={6} lg={8} md={6} sm={12} component={Paper}>
							<Chart percent={(contWithInclusionGol.averageCourse)/100} id="gauge-overall" />
						</Grid>
						<Grid item xl={2} lg={4} md={6} sm={4} xs={12} component={Paper}>
							<OverallCard
								className={classes.valid}
								Icon={<AccessibilityNewIcon />}
								value={Math.round(contWithInclusionGol.done)}
								caption="Done!"
								tip="Accessiblity Resources configured"
							/>
						</Grid>
						 <Grid item xl={2} lg={6} md={6} sm={4} xs={12} component={Paper}>
							<OverallCard
								className={classes.notConfig}
								Icon={<AssignmentLateIcon />}
								value={contWithInclusionGol.todo}
								caption="TO-DO"
								tip="Configure them to make the content accessible"
							/>
						</Grid> 
						<Grid item xl={2} lg={6} md={6} sm={4} xs={12} component={Paper}>
							<OverallCard
								className={classes.misConfig}
								Icon={<AssignmentLateIcon />}
								value={Math.round(contWithInclusionGol.NotAccessible)}
								caption="Not Accessible!"
								tip="Fix them to make your content accessible"
							/>
						</Grid>
					</Grid>
					<h2>Accessibility by inclusion goals</h2>
					 <div>
						Here is the result of accesibility grouped by impairments. You can also check the accessibility of each topic or unit of your course.
					</div>
					<Container>
						<Grid
							container
							spacing={2}
							direction="row"
							justify="center"
							alignItems="flex-start"
						>
							
							{categories.filter(goals => goals.selected).map((category, index) => (
								<Grid item xs={12} md={6} key={index}>
									<AccessibilityCard category={category} />
								</Grid>
							))}
						</Grid>
					</Container> 
				</div>
			) }


				<div >
				<h2>Sylabus accessibility report</h2>
					<div className={classes.paper}>			
						This part details the accessibility percentages of the course Sylabus.	
					</div>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
						alignItems="stretch"
					>	
						<Grid item xl={6} lg={8} md={6} sm={12} component={Paper}>
							<Chart percent={sylabusTotal/100} id="gauge-overall" />
						</Grid>
					</Grid>
					<Container>
						<Grid
							container
							spacing={1}
							direction="row"
							justify="center"
							alignItems="flex-start"
						>
							<Grid item xs={12} md={6}>
								<AccessibilitySylabusCard category={reportSylabus} />
							</Grid>
						</Grid>
					</Container> 
				</div>


			</div>
		</div>
	);
}

function Chart({ percent, id }) {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<GaugeChart
				className={classes.chart}
				id={id === "" ? "gauge-teste" : id}
				nrOfLevels={6}
				colors={a11yCOLOR}
				percent={percent}
				animDelay={500}
				arcPadding={0}
				cornerRadius={0}
				hideText={true}
			/>

			<div className={classes.chartCaption}>{Math.round(percent * 100)}%</div>
			{percent === 1 && (
				<div className={classes.chartLabel}>
					You have achieved your Inclusion Goal!
				</div>
			)}
		</Container>
	);
}
function AccessibilityCard({ category }) {
   //console.log("newRandomTopics------------>", category)
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [max, setMax] = React.useState(
		category.topics
			.map(topic => topic.a11yValid)
			.reduce((acc, cur) => acc + cur) / category.topics.length
	);
   //console.log("Max en AccessibilityCard:", max )
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={<Avatar>{category.icon}</Avatar>}
				title={category.label}
				subheader={category.status}
			/>
			<div className={classes.content}>
				<CardContent>
					<Grid
						container
						spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
					>
						<Grid item xs={12} sm={6} md={8}>
							<Chart id={"gauge-" + category.key} percent={max / 100} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<List
								key={"listtopic-" + category.key}
								component="ol"
								aria-labelledby={category.key + "-topics-accessibility"}
								button
								onClick={handleClick}
								subheader={
									<ListSubheader
										component="span"
										key={"listtopic-subhead-" + category.key}
										id={category.key + "-topics-accessibility"}
									>
										Topics
										{open ? (
											<ExpandLess key={"listtopic-expandless" + category.key} />
										) : (
											<ExpandMore key={"listtopic-expandmore" + category.key} />
										)}
									</ListSubheader>
								}
								//className={classes.root}
							>
								<Collapse
									key={"listtopic-subhead-Collapse" + category.key}
									in={open}
									timeout="auto"
									unmountOnExit
								>
									
									{
									category.topics.length!=0?
									<React.Fragment>
										{
											category.topics.map((topic, index) => (
												<ListItem
													key={"listtopic-item-" + category.key + "-" + index}
													button
													className={classes.nested}
												>
													<ListItemText
														key={"listtopic-itemtxt" + category.key + "-" + index}
														primary={topic.title}
														secondary={
															<AccessibilityLinearProgress max={topic.a11yValid} />
														}
													/>
												</ListItem>
											))
										}
									
									</React.Fragment>
									:
									undefined
									}
								</Collapse>
							</List>
						</Grid>
					</Grid>
				</CardContent>
			</div>
		</Card>
	);
}

function AccessibilitySylabusCard({ category }) {
   console.log("AccessibilitySylabusCard---------------------------------------------------------------------------", category)
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	
   //console.log("Max en AccessibilityCard:", max )
	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={<Avatar><MenuBookIcon/></Avatar>}
				title={"Sylabus accessibility report"}
				//subheader={"Subheader"}
			/>
			<div className={classes.content}>
				<CardContent>
					<Grid
						container
						spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
					>
						<Grid item xs={12} sm={6} md={4}>
							<List
								key={"listtopic-sylabus" }
								component="ol"
								aria-labelledby={"sylabus" + "-topics-accessibility"}
								button
								onClick={handleClick}
								subheader={
									<ListSubheader
										component="span"
										key={"listtopic-subhead-sylabus"}
										id={'sylabus'+"-topics-accessibility"}
									>
										Sylabus
									</ListSubheader>
								}
								//className={classes.root}
							>
								<Collapse
									key={"listtopic-subhead-Collapse-sylabus"}
									in={open}
									timeout="auto"
									unmountOnExit
								>
									{console.log("category.topics**********************", category)}
									{
									
									category.length!=0?
										<React.Fragment>
											{
												category[0].map((topic, index) => (
													<ListItem
														key={"listtopic-" + index}
														//button
														//ContainerComponent={'div'}
														className={classes.nested}
													>
														<ListItemText
															key={"sylabus" +  "-" + index}
															primary={topic.title}
															secondary={
																<AccessibilityLinearProgress max={topic.a11yValid} />
															}
														/>
													</ListItem>
												))
												
											}
											
										</React.Fragment>
										:
										undefined
									
									}
								</Collapse>
							</List>
						</Grid>
					</Grid>
				</CardContent>
			</div>
		</Card>
	);
}

function AccessibilityAchieved({ Icon, caption, className }) {
	const classes = useStyles();

	return (
	
		<div className={classes.content}>
			<CardContent>
			<Grid
				container
				spacing={2}
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12} sm={6} md={8}>
					<Avatar className={classes.avatar}>{Icon}</Avatar>
				</Grid>
				<Grid item  xs={12} sm={6} md={8}>
					<div className={classes.caption}>{caption}</div>
				</Grid>
			
			</Grid>
			</CardContent>
		</div>
		
	);
}

function OverallCard({ Icon, value, caption, tip, className }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Grid
				container
				//spacing={4}
				direction="column"
				alignItems="center"
				justify="center"
				//	component={Paper}
				className={clsx(classes.overallcard, className)}
			>
				<Grid item className={classes.value}>
					{value}
				</Grid>
				{/* <Grid item xs={6}>
					<Avatar className={classes.avatar}>{Icon}</Avatar>
				</Grid> */}

				<Grid item>
					<div className={classes.caption}>{caption}</div>
				</Grid>
				<Grid item>
					<div className={classes.tip} color="textSecondary">
						{tip}
					</div>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
function CircularProgressWithLabel(props) {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="static" {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography
					variant="caption"
					component="div"
					color="textSecondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired
};

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired
};

function AccessibilityProgress({ max, size }) {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress(prevProgress =>
				prevProgress < max ? prevProgress + max / 10 : max
			);
		}, max);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return <CircularProgressWithLabel value={progress} size={size} />;
}
function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center" onClick={()=>changeRoute()}>
	
				<Box width="100%" mr={1}>
					<LinearProgress variant="determinate" {...props} />
				</Box>
				<Box minWidth={35}>
					<Typography variant="body2" color="textSecondary">{`${Math.round(
						props.value
					)}%`}</Typography>
				</Box>
		
		</Box>
	);
}

function AccessibilityLinearProgress({ max, size }) {
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress(prevProgress =>
				prevProgress < max ? prevProgress + max / 10 : max
			);
		}, max);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={classes.root}>
			<LinearProgressWithLabel value={progress} />
		</div>
	);
}