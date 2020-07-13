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
	Paper
} from "@material-ui/core";
import PropTypes from "prop-types";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import GaugeChart from "react-gauge-chart";
import {
	faBrain,
	faLowVision,
	faDeaf,
	faUniversalAccess
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: "100vw"
	},
	paper: {
		marginBottom: theme.spacing(2),

		"& + $paper": {
			//marginLeft: theme.spacing(2)
		}
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
		color: theme.palette.secondary.main
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
		minHeight: "100%"
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
   
   console.log("Propiedades en el Report", props)

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
      }
   

	},[])
	

 
   const  GuidedWithoutUnits=()=>{
      let units=0
      let itemUnit=0
      let accesibilidadUnit=[]
      //for unit en el ebcabezado
         props.courseInformation.program.map((unit, indexUnit)=>{
            unit.items.map((item,indexItem)=>{
               if(item.type==='image' ||item.type==='audio' || item.type==='quiz' || item.type==='video'){
                  //console.log("-----percentage:",item.attributes.accessibility.percentage, "-----isA11Y:",item.attributes.accessibility.isA11Y)
                  itemUnit=itemUnit+item.attributes.accessibility.percentage;
                  units=units+1
               }
            })
            let averageUnit=Math.round(itemUnit/units)
            accesibilidadUnit.push(averageUnit)
            itemUnit=0
            units=0
            setPercentagesWithoutUnit(prev=>{
               return {...prev, guidedWithoutUnit:accesibilidadUnit}
            })
         })
      
      //for lessons into the units
      
      let lessons=0
      let itemLesson=0
      let accesibilidadLesson=[]
      props.courseInformation.program.map((unit, indexUnit)=>{
         unit.lessons.map((lesson,indexLesson)=>{
            lesson.items.map((item, indexItem)=>{
               if(item.type==='image' ||item.type==='audio' || item.type==='quiz' || item.type==='video'){
                 // console.log("-----percentage:",item.attributes.accessibility.percentage, "-----isA11Y:",item.attributes.accessibility.isA11Y)
                  itemLesson=itemLesson+item.attributes.accessibility.percentage;
                  lessons=lessons+1
               }
            })     
         })
         let averageUnit=Math.round(itemLesson/lessons)
         accesibilidadLesson.push(averageUnit)
         itemLesson=0
         lessons=0
         setPercentagesWithoutUnit(prev=>{
            return {...prev, guidedWithoutLessons:accesibilidadLesson}
         })
      })
      ///saca el total
      let totalUnitLesson=[]
      accesibilidadUnit.map((value,index)=>{
         totalUnitLesson.push((value+accesibilidadLesson[index])/2)
      })

      setPercentagesWithoutUnit(prev=>{
         return {...prev, totalGuidedWithoutUL:totalUnitLesson}
      })   
      
      //si es full accesible configura la bandera para mostrar
      let allAchieved=0
      totalUnitLesson.map((value,index)=>{
         allAchieved=allAchieved+value
      })
      if((allAchieved/totalUnitLesson.length)===100){
			console.log(' GuidedWithoutTopics full accesible',)
         setSimulate("allAchieved")
      }
   }
 
   const  GuidedWithoutTopics=()=>{
      let topics=0
      let itemTopic=0
      let accesibilidadTopic=[]
      //for unit en el ebcabezado
         props.courseInformation.program.map((unit, indexUnit)=>{
            unit.items.map((item,indexItem)=>{
               if(item.type==='image' ||item.type==='audio' || item.type==='quiz' || item.type==='video'){
                  //console.log("-----percentage:",item.attributes.accessibility.percentage, "-----isA11Y:",item.attributes.accessibility.isA11Y)
                  itemTopic=itemTopic+item.attributes.accessibility.percentage;
                  topics=topics+1
               }
            })
            let averageUnit=Math.round(itemTopic/topics)
            accesibilidadTopic.push(averageUnit)
            itemTopic=0
            topics=0
            setPercentagesWithoutTopic(prev=>{
               return {...prev, guidedWithoutTopic:accesibilidadTopic}
            })
         })

         console.log("Topicos",accesibilidadTopic)

      let allAchieved=0
      accesibilidadTopic.map((value,index)=>{
         allAchieved=allAchieved+value
      })
      if((allAchieved/accesibilidadTopic.length)===100){
			console.log(' GuidedWithoutTopics full accesible')
         setSimulate("allAchieved")
      }

   }
	const newRandomTopics = (type) => {
		let visual=[]
		let hearing=[]
		let cognitive=[]
		let diversity=[]
		
		if (type==='topic'){
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
			
			console.log("dentro de ssssssssssssssnewRandomTopics :",withoutInclusionGol, props )
			props.courseInformation.support[1].map((audience, index)=>{
				if(audience.value==='Vis' && audience.isChecked===true ) {
					let calculo=categories[0].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[0].topics.length
					if(calculo===100){
						categories[0].selected=true
						setSimulate('inclusionGolAchieved')
					}else{
						categories[0].selected=true
						setSimulate('inclusionGol')
					}
					
				}else if(audience.value==='Hear' && audience.isChecked===true){
					let calculo=categories[1].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[0].topics.length
					if(calculo===100){
						categories[1].selected=true
						setSimulate('inclusionGolAchieved')
					}else{
						categories[1].selected=true
						setSimulate('inclusionGol')
					}
				}else if(audience.value==='cog' && audience.isChecked===true){
					let calculo=categories[2].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[0].topics.length
					if(calculo===100){
						categories[2].selected=true
						setSimulate('inclusionGolAchieved')
					}else{
						categories[2].selected=true
						setSimulate('inclusionGol')
					}
				}else if((audience.value==='Eld' || audience.value==='Spee' || audience.value==='Lan') && audience.isChecked===true){
					let calculo=categories[3].topics.map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur)/categories[0].topics.length
					if(calculo===100){
						categories[3].selected=true
						setSimulate('inclusionGolAchieved')
					}else{
						categories[3].selected=true
						setSimulate('inclusionGol')
					}
				}else{
					setSimulate("noInclusionGol")
				}
			})
			
			setCategories(categories)
			console.log("las categorias************", categories, visual, diversity,withoutInclusionGol)

   };

   const UnitsCourse = () => {
		let variablesUnidad=[]
		let variablesLeccion=[]
		let percentagebyUnit=[]
		let percentagebyLesson=[]
		let  contTotal=0
		//let text=0
		let contText=0; 
		let contTextFalse=0; let contCaptions=0; let contCaptionsFalse=0; let contwarningAlert=0
		let contwarningAlertFalse=0; let contextendedTime=0; let contextendedTimeFalse=0; let contnoTime=0;let contnoTimeFalse=0; 
		let contseizures=0; let contseizuresFalse=0; let contaudioDescription=0; let contaudioDescriptionFalse=0; 
		let contsignLanguage=0; let contsignLanguageFalse=0
		let totalconfig=0
		let totalnoconfig=0
    
      props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.items.map((item,indexItem)=>{
            if(item.type==='image' ){
               item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
                     if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}
					})
				}else if(item.type==='audio'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
                     if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}else if(isa11y.name==='captionsEmbebed'){
							if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
						}
					})
				}else if(item.type==='quiz'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='noTime'){
                     if(isa11y.is_a11y===true){contnoTime+=1}else{contnoTimeFalse+=1}
						}else if(isa11y.name==='extendedTime'){
							if(isa11y.is_a11y===true){contextendedTime+=1}else{contextendedTimeFalse+=1}
						}else if(isa11y.name==='warningAlert'){
							if(isa11y.is_a11y===true){contwarningAlert+=1}else{contwarningAlertFalse+=1}
						}
					})
				}else if(item.type==='video'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='seizures'){
                     if(isa11y.is_a11y===true){contseizures+=1}else{contseizuresFalse+=1}
						}else if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
							if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}else if(isa11y.name==='captionsEmbebed'){
							if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
						}else if(isa11y.name==='audioDescription'){
							if(isa11y.is_a11y===true){contaudioDescription+=1}else{contaudioDescriptionFalse+=1}
						}else if(isa11y.name==='signLanguage'){
							if(isa11y.is_a11y===true){contsignLanguage+=1}else{contsignLanguageFalse+=1}
						}
					})
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
				contsignLanguageFalse:contsignLanguageFalse
			})
			 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
			 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
			 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
			 contsignLanguage=0;  contsignLanguageFalse=0
      })
	  
		props.courseInformation.program.map((unit, indexUnit)=>{
			//cabezera de la unidad
			unit.lessons.map((lesson,indexLesson)=>{
				lesson.items.map((item,indexItem)=>{
					if(item.type==='image' ){
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}
						})
					}else if(item.type==='audio'){
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}else if(isa11y.name==='captionsEmbebed'){
								if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
							}
						})
					}else if(item.type==='quiz'){
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='noTime'){
								if(isa11y.is_a11y===true){contnoTime+=1}else{contnoTimeFalse+=1}
							}else if(isa11y.name==='extendedTime'){
								if(isa11y.is_a11y===true){contextendedTime+=1}else{contextendedTimeFalse+=1}
							}else if(isa11y.name==='warningAlert'){
								if(isa11y.is_a11y===true){contwarningAlert+=1}else{contwarningAlertFalse+=1}
							}
						})
					}else if(item.type==='video'){
						item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
							if(isa11y.name==='seizures'){
								if(isa11y.is_a11y===true){contseizures+=1}else{contseizuresFalse+=1}
							}else if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
								if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
							}else if(isa11y.name==='captionsEmbebed'){
								if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
							}else if(isa11y.name==='audioDescription'){
								if(isa11y.is_a11y===true){contaudioDescription+=1}else{contaudioDescriptionFalse+=1}
							}else if(isa11y.name==='signLanguage'){
								if(isa11y.is_a11y===true){contsignLanguage+=1}else{contsignLanguageFalse+=1}
							}
						})
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
					contsignLanguageFalse:contsignLanguageFalse
				})
				contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
				contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
				contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
				contsignLanguage=0;  contsignLanguageFalse=0
			})
      })
		
		//calcula {title: "Topic 1", a11yValid: 70.52506403352295, a11yMisConfig: 20, a11yNotConfig: 9.474935966477052}
		//{title: "Topic 1", a11yValid: 70.52506403352295, a11yMisConfig: 0, a11yNotConfig: 0}

		variablesUnidad.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse)
			let configvisual=(value.contText+value.contaudioDescription)
			let totalvisual=(noconfigvisual+configvisual)
			let visual=((configvisual*100)/totalvisual)
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contaudioDescriptionFalse+value.contsignLanguageFalse)
			let confighearing=(value.contText+value.contCaptions+value.contaudioDescription+value.contsignLanguage)
			let totalhearing=(noconfighearing+confighearing)
			let hearing=((confighearing*100)/totalhearing)
			//para cognitive
			let noconfigcognitive=(value.contCaptionsFalse+value.contseizuresFalse+value.contaudioDescriptionFalse)
			let configcognitive=(value.contCaptions+value.contseizures+value.contaudioDescription)
			let totalcognitive=(noconfigcognitive+configcognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			//para diversity
			let configdiversity=(value.contsignLanguage+ value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let noconfigdiversity=(value.contsignLanguageFalse+ value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let totaldiversity=(noconfigdiversity+configdiversity)
			let diversity=((configdiversity*100)/totaldiversity)
			
			totalconfig=(totalconfig+configvisual+confighearing+configcognitive+configdiversity)
			totalnoconfig=(totalnoconfig+noconfigvisual+noconfighearing+noconfigcognitive+noconfigdiversity)
			
			
			percentagebyUnit.push([
				{title: value.title, a11yValid:isNaN(visual)?100:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?100:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?100:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?100:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})
		
		
		variablesLeccion.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse)
			let configvisual=(value.contText+value.contaudioDescription)
			let totalvisual=(noconfigvisual+configvisual)
			let visual=((configvisual*100)/totalvisual)
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contaudioDescriptionFalse+value.contsignLanguageFalse)
			let confighearing=(value.contText+value.contCaptions+value.contaudioDescription+value.contsignLanguage)
			let totalhearing=(noconfighearing+confighearing)
			let hearing=((confighearing*100)/totalhearing)
			//para cognitive
			let noconfigcognitive=(value.contCaptionsFalse+value.contseizuresFalse+value.contaudioDescriptionFalse)
			let configcognitive=(value.contCaptions+value.contseizures+value.contaudioDescription)
			let totalcognitive=(noconfigcognitive+configcognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			//para diversity
			let configdiversity=(value.contsignLanguage+ value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let noconfigdiversity=(value.contsignLanguageFalse+ value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let totaldiversity=(noconfigdiversity+configdiversity)
			let diversity=((configdiversity*100)/totaldiversity)

			totalconfig=(totalconfig+configvisual+confighearing+configcognitive+configdiversity)
			totalnoconfig=(totalnoconfig+noconfigvisual+noconfighearing+noconfigcognitive+noconfigdiversity)
			
			percentagebyLesson.push([
				{title: value.title, a11yValid:isNaN(visual)?100:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?100:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?100:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?100:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})

		let byUnit=(percentagebyUnit[0].map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur) / 4)
		let byLesson=(percentagebyLesson[1].map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur) / 4)

		let sum=((byUnit+byLesson)/2)
		if(sum===100){setSimulate("allAchieved")}
		
		//setSimulate("allAchieved")

		//para el ultimo paso
		console.log("SUMA DE TOTALES: UNIT-LESSONS:", totalnoconfig, totalconfig)
		/* contWithInclusionGol.done=totalconfig
			contWithInclusionGol.NotAccessible=totalnoconfig
			setWithInclusionGol(contWithInclusionGol) */
		
		withoutInclusionGol.percentagebyUnit=percentagebyUnit
		withoutInclusionGol.percentagebyLesson=percentagebyLesson
		setwithoutInclusionGol(withoutInclusionGol)
		newRandomTopics('unitslessons')
	};
	

	const TopicsCourse = () => {
		let variablesUnidad=[]
		let percentagebyUnit=[]
		let contText=0; 
		let contTextFalse=0; let contCaptions=0; let contCaptionsFalse=0; let contwarningAlert=0
		let contwarningAlertFalse=0; let contextendedTime=0; let contextendedTimeFalse=0; let contnoTime=0;let contnoTimeFalse=0; 
		let contseizures=0; let contseizuresFalse=0; let contaudioDescription=0; let contaudioDescriptionFalse=0; 
		let contsignLanguage=0; let contsignLanguageFalse=0
		
    
      props.courseInformation.program.map((unit, indexUnit)=>{
         //cabezera de la unidad
         unit.items.map((item,indexItem)=>{
            if(item.type==='image' ){
               item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='longDescription' || isa11y.name==='shortDescription' ){
                     if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}
					})
				}else if(item.type==='audio'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
                     if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}else if(isa11y.name==='captionsEmbebed'){
							if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
						}
					})
				}else if(item.type==='quiz'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='noTime'){
                     if(isa11y.is_a11y===true){contnoTime+=1}else{contnoTimeFalse+=1}
						}else if(isa11y.name==='extendedTime'){
							if(isa11y.is_a11y===true){contextendedTime+=1}else{contextendedTimeFalse+=1}
						}else if(isa11y.name==='warningAlert'){
							if(isa11y.is_a11y===true){contwarningAlert+=1}else{contwarningAlertFalse+=1}
						}
					})
				}else if(item.type==='video'){
					item.attributes.accessibility.isA11Y.map((isa11y,indexIsa11y)=>{//para una iamgen
                  if(isa11y.name==='seizures'){
                     if(isa11y.is_a11y===true){contseizures+=1}else{contseizuresFalse+=1}
						}else if(isa11y.name==='longDescription' || isa11y.name==='shortDescription'){
							if(isa11y.is_a11y===true){contText+=1}else{contTextFalse+=1}
						}else if(isa11y.name==='captionsEmbebed'){
							if(isa11y.is_a11y===true){contCaptions+=1}else{contCaptionsFalse+=1}
						}else if(isa11y.name==='audioDescription'){
							if(isa11y.is_a11y===true){contaudioDescription+=1}else{contaudioDescriptionFalse+=1}
						}else if(isa11y.name==='signLanguage'){
							if(isa11y.is_a11y===true){contsignLanguage+=1}else{contsignLanguageFalse+=1}
						}
					})
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
				contsignLanguageFalse:contsignLanguageFalse
			})
			 contText=0;  contTextFalse=0;  contCaptions=0;  contCaptionsFalse=0;  contwarningAlert=0
			 contwarningAlertFalse=0;  contextendedTime=0;  contextendedTimeFalse=0;  contnoTime=0; contnoTimeFalse=0; 
			 contseizures=0;  contseizuresFalse=0;  contaudioDescription=0;  contaudioDescriptionFalse=0; 
			 contsignLanguage=0;  contsignLanguageFalse=0
      })
	  

		variablesUnidad.map((value,index)=>{
			//para visual
			let noconfigvisual=(value.contTextFalse+value.contaudioDescriptionFalse)
			let configvisual=(value.contText+value.contaudioDescription)
			let totalvisual=(noconfigvisual+configvisual)
			let visual=((configvisual*100)/totalvisual)
			//para hearing
			let noconfighearing=(value.contTextFalse+value.contCaptionsFalse+value.contaudioDescriptionFalse+value.contsignLanguageFalse)
			let confighearing=(value.contText+value.contCaptions+value.contaudioDescription+value.contsignLanguage)
			let totalhearing=(noconfighearing+confighearing)
			let hearing=((confighearing*100)/totalhearing)
			//para cognitive
			let noconfigcognitive=(value.contCaptionsFalse+value.contseizuresFalse+value.contaudioDescriptionFalse)
			let configcognitive=(value.contCaptions+value.contseizures+value.contaudioDescription)
			let totalcognitive=(noconfigcognitive+configcognitive)
			let cognitive=((configcognitive*100)/totalcognitive)
			//para diversity
			let configdiversity=(value.contsignLanguage+ value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert)
			let noconfigdiversity=(value.contsignLanguageFalse+ value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse)
			let totaldiversity=(noconfigdiversity+configdiversity)
			let diversity=((configdiversity*100)/totaldiversity)

			//para with Inclusion Gol
			let totalconfig=(value.contText+value.contaudioDescription+value.contsignLanguage+ 
								  value.contseizures+value.contnoTime+value.contextendedTime+value.contwarningAlert+value.contCaptions)
			let totalnoconfig=(value.contTextFalse+value.contaudioDescriptionFalse+value.contsignLanguageFalse+ 
									value.contseizuresFalse+value.contnoTimeFalse+value.contextendedTimeFalse+value.contwarningAlertFalse+value.contCaptionsFalse)
			contWithInclusionGol.done=contWithInclusionGol.done+totalconfig
			contWithInclusionGol.NotAccessible=contWithInclusionGol.NotAccessible+totalnoconfig
			setWithInclusionGol(contWithInclusionGol)

		//	console.log("En topicos totalconfig", totalconfig, totalnoconfig, contWithInclusionGol )
		
			
			percentagebyUnit.push([
				{title: value.title, a11yValid:isNaN(visual)?100:visual , a11yMisConfig: 0, a11yNotConfig: noconfigvisual},
				{title: value.title, a11yValid:isNaN(hearing)?100:hearing , a11yMisConfig: 0, a11yNotConfig: noconfighearing},
				{title: value.title, a11yValid:isNaN(cognitive)?100:cognitive , a11yMisConfig: 0, a11yNotConfig: noconfigcognitive},
				{title: value.title, a11yValid:isNaN(diversity)?100:diversity , a11yMisConfig: 0, a11yNotConfig: noconfigdiversity}
			])
			visual=0, hearing=0, cognitive=0, diversity=0
		})
		
		let byUnit=(percentagebyUnit[0].map(topic => topic.a11yValid).reduce((acc, cur) => acc + cur) / 4)
		contWithInclusionGol.averageCourse=byUnit
		setWithInclusionGol(contWithInclusionGol)
		
		console.log("variablesbytopic:",byUnit)
		//setSimulate("allAchieved")
		withoutInclusionGol.percentagebyUnit=percentagebyUnit
		withoutInclusionGol.percentagebyLesson=[]
		setwithoutInclusionGol(withoutInclusionGol)

		if(byUnit===100){
			setSimulate("allAchieved")
		}
		
		
		newRandomTopics('topic')
	};


   
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

	

	const [simulate, setSimulate] = React.useState(false);

	
	

	

	return (
		<React.Fragment>
			
			<h1>Accessibility Report</h1>
         {console.log("TopicsCourse----------", withoutInclusionGol, simulate,categories)}


			{simulate === "allAchieved" && (
				<React.Fragment>
					<p>Your course is fully accessible</p>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
						alignItems="stretch"
					>
						{categories.map(category => (
							<Grid
								item
								xl={4}
								lg={6}
								md={6}
								sm={6}
								xs={12}
								component={Paper}
								className={classes.paper}
							>
								<AccessibilityAchieved
									Icon={category.icon}
									caption={category.label}
								/>
							</Grid>
						))}
					</Grid>
				</React.Fragment>
			)}
         
         {simulate === "noInclusionGol" && (   
			 <React.Fragment>
					<p>
						You have not seleced any Inclusion Goals in Audience step, but
						considere review your Course Accessibility
					</p>
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
				<p>
					You have seleced {categories.filter(goals => goals.selected).map(category => category.label).toString()} as
					your Inclusion Goals in Audience step, based on this choose here is
					the accessibility results of your course.
				</p>
			) }
			
			{  simulate === "inclusionGolAchieved" && (
				<React.Fragment>
					<p className={classes.chartLabel}>
					You have achieved your Inclusion Goal!
				</p>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
						alignItems="stretch"
				>
					
							<Grid
								item
								xl={4}
								lg={6}
								md={6}
								sm={6}
								xs={12}
								component={Paper}
								className={classes.paper}
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
						
					</Grid>
					<p className={classes.subtitle}>
						Now you have finished the accessibility set up for your Inclusion
						Gol, considere review accessibility for others impairments groups.
					</p>
					<Grid container spacing={2}>
						{categories
							.filter(c => !c.selected)
							.map(category => (
								<Grid item xs={12} md={6}>
									<AccessibilityCard category={category} />
								</Grid>
							))}
					</Grid>
				</React.Fragment>
			)  }
			{ simulate === "inclusionGol" && (
				<React.Fragment>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
						alignItems="stretch"
					>
						{console.log("Configuracion inclusionGol---",contWithInclusionGol)}
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
						{/* <Grid item xl={2} lg={6} md={6} sm={4} xs={12} component={Paper}>
							<OverallCard
								className={classes.notConfig}
								Icon={<AssignmentLateIcon />}
								value={Math.round((a11yNotConfigValue * 50) / 100)}
								caption="TO-DO"
								tip="Configure them to make the content accessible"
							/>
						</Grid> */}
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
					 <p>
						Here is the result of accesibility grouped by impairments. You can
						also check the accessibility of each topic or unit of your course.
					</p>
					<Container>
						<Grid
							container
							spacing={2}
							direction="row"
							justify="center"
							alignItems="flex-start"
						>
							{console.log("categorias------->", categories)}
							{categories
							.filter(c => c.selected)
							.map(category => (
								<Grid item xs={12} md={6}>
									<AccessibilityCard category={category} />
								</Grid>
							))}
						</Grid>
					</Container> }
				</React.Fragment>
			) }
		</React.Fragment>
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

			<p className={classes.chartCaption}>{Math.round(percent * 100)}%</p>
			{percent === 1 && (
				<p className={classes.chartLabel}>
					You have achieved your Inclusion Goal!
				</p>
			)}
		</Container>
	);
}
function AccessibilityCard({ category }) {
   console.log("newRandomTopics------------>", category)
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [max, setMax] = React.useState(
		category.topics
			.map(topic => topic.a11yValid)
			.reduce((acc, cur) => acc + cur) / category.topics.length
	);
	

   console.log("Max en AccessibilityCard:", max )

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
									{category.topics.map((topic, index) => (
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
									))}
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
		<React.Fragment>
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				className={clsx(classes.overallcard, classes.valid)}
			>
				<Grid item xs={6}>
					<Avatar className={classes.avatar}>{Icon}</Avatar>
				</Grid>
				<Grid item>
					<p className={classes.caption}>{caption}</p>
				</Grid>
			</Grid>
		</React.Fragment>
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
					<p className={classes.caption}>{caption}</p>
				</Grid>
				<Grid item>
					<p className={classes.tip} color="textSecondary">
						{tip}
					</p>
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
		<Box display="flex" alignItems="center">
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