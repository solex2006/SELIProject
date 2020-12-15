import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Lista from './shared/ListComponent';
import CourseContent from './shared/TopicUnitDescription';
import HardwareSoftwareReq from './shared/HardwareSoftwareReq';
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Button,
	Link,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Grid,
	IconButton
} from "@material-ui/core";
import DialogFullWidth from './shared/dialog_fullwidth';
import CloseIcon from "@material-ui/icons/Close";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import './shared/style.css'
const useStyles = makeStyles(theme => ({
	root: {
		"& h5": {
			fontSize: "1em"
		},
		"& h1,h2,h3, h4, h5": {
			borderBottom: "1px solid gray"
		},
		overflowY: "auto",
		width: "100%",
		maxWidth: "100%",
		height: "100%"
	},
	courseTitle: {
		fontSize: "x-large"
	},
	skip: {
		clip: "rect(1px, 1px, 1px, 1px)",
		height: "1px",
		overflow: "hidden",
		position: "absolute",
		whiteSpace: "nowrap",
		width: "1px",
		margin: "-1px",
		background: "#ffffcc",
		padding: "0.2em",
		//zIndex: "10",
		"&:focus": {
			clip: " auto",
			height: " auto",
			overflow: " visible",
			position: " static",
			whiteSpace: " normal",
			width: " auto",
			margin: " auto"
		}
	},
	summary: {
		"& >*": { display: "inline", border: "none" }
	},
	appBar: {
		background: theme.palette.secondary.dark,
		color: theme.palette.grey[50]
	},
	dialogTitle: {
		...theme.typography.h6,
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

function Syllabus(props) {
	const classes = useStyles();
	console.log("propiedades en silabus", props)

	const indexes=()=>{
		return(
			<nav aria-labelledby="toc">
				<hr/>
				<details>
					<summary className={classes.summary}>
						<h2 id="toc" tabIndex="0">
							{props.language.TableofContents}
						</h2>
					</summary>
					
					<ol>
						<li>
							<a tabIndex='0' href="#info">{props.language.CourseInformation}</a>
						</li>
						<li>
							<a tabIndex='0' href="#info-pedag">{props.language.pedagogicalconsiderations}</a>
						</li>
						<li>
							<a tabIndex='0' href="#info-goals">{props.language.LearningGoals}</a>
						</li>
						<li>
							<a tabIndex='0' href="#info-outcomes">{props.language.learningOutcomes}</a>
						</li>
						<li>
							<a tabIndex='0' href="#info-content">{props.language.CourseContent}</a>
							<ol id="intent">
									{
										props.courseInformation.design.map((topic, indexUnit)=>(
											props.courseInformation.coursePlan.guidedCoursePlan!='free'?
											<React.Fragment>
												{
													 (props.courseInformation.coursePlan.guidedCoursePlan==='guided'  &&
													 (props.courseInformation.coursePlan.courseTemplate==='without' || props.courseInformation.coursePlan.courseTemplate==='spiral' 
													 || props.courseInformation.coursePlan.courseTemplate==='consistent' || props.courseInformation.coursePlan.courseTemplate==='toyBox' ) && 
													 props.courseInformation.coursePlan.courseStructure==='topic')?
														<React.Fragment>
															<li><a href={"#content-topic-"+indexUnit}>{props.language.topic}: {topic.title}</a></li>
															<ol id="intent">
																<li>
																	<a tabIndex='0' href={'#topic-'+indexUnit+'-readings'}>{props.language.Readings}</a>
																</li>
																<li>
																	<a tabIndex='0' href={'#topic-'+indexUnit+'-assess'}>{props.language.AssessmentMethods}</a>
																</li>
															</ol>
														</React.Fragment>
														:
													(props.courseInformation.coursePlan.guidedCoursePlan==='guided'  && props.courseInformation.coursePlan.courseTemplate==='without' && props.courseInformation.coursePlan.courseStructure==='unit')?
														<React.Fragment>
															<li>
																<a tabIndex='0' href={"#content-topic-"+indexUnit}>{props.language.unit}: {topic.title}</a>
																
																	<ol id="intent" key={indexUnit}>
																		{
																			props.courseInformation.design[indexUnit].lessons.map((lesson, indexLesson)=>(
																				<li>
																					<a href={"#lesson-"+indexLesson}>{props.language.lesson}: {lesson.title}</a>
																				</li>
																			))
																		}
																		
																		<li>
																			<a tabIndex='0' href={'#topic-'+indexUnit+'-readings'}>{props.language.Readings}</a>
																		</li>
																		<li>
																			<a tabIndex='0' href={'#topic-'+indexUnit+'-assess'}>{props.language.AssessmentMethods}</a>
																		</li>
																	
																	</ol>
															</li>
															
														</React.Fragment>
														:
														undefined
												}
												
											</React.Fragment>
											:
											(props.courseInformation.coursePlan.guidedCoursePlan==='free'  && props.courseInformation.coursePlan.courseTemplate==='without' && props.courseInformation.coursePlan.courseStructure==='topic')? //par diferente de free
												<React.Fragment>	
													<li key={indexUnit}><a tabIndex='0' href={"#content-topic-"+indexUnit}>{props.language.topic}: {topic.title}</a></li>
												</React.Fragment>
											:
											(props.courseInformation.coursePlan.guidedCoursePlan==='free'  && props.courseInformation.coursePlan.courseTemplate==='without' && props.courseInformation.coursePlan.courseStructure==='unit')?
														
													<li key={indexUnit}>
														<a href={"#content-topic-"+indexUnit}>{props.language.unit}: {topic.title}</a>
														<ol id="intent" key={indexUnit}>
															{
																props.courseInformation.design[indexUnit].lessons.map((lesson, indexLesson)=>(
																	<li>
																		<a  href={"#lesson-"+indexLesson}>{props.language.lesson}: {lesson.title}</a>
																	</li>
																))
															}
														</ol>
													</li>			
												
											:
												undefined
											))
										
									}
							</ol>		
						</li>
						
						<li>
								<a href="#tecnological">{props.language.TechnologicalRequirements}</a>
								<ol id="intent">
									<li tabIndex='0'>
										<a  href="#tecnologicalhard">{props.language.hardwareRequirements}</a>
									</li>
									<li tabIndex='0'>
										<a href="#tecnologicalsoft">{props.language.Softwarerequirements}</a>
									</li>
								</ol> 
						</li>
						{/* <li>
							<a href="#acc">Accomodations</a>
						</li> */}
					</ol>
				</details>
				<hr />
			</nav>

		)
	}

	return (
		<div className='crnoutcomeinfo'>	
			<p tabIndex='0' className='crnheadingtitle'>
				<em>{props.courseInformation.title} : {props.courseInformation.subtitle}</em>
			</p>
			<p tabIndex='0' className='crnheading' >
				<strong>Instructor</strong>: {props.courseInformation.createdBy}
			</p>
			<img alt="" style={{padding:'15px', display:'block', marginLeft:'auto', marginRight: 'auto'}} src="seli-logo.png" alt="logo" width="120" height="70"></img>
				
			{indexes()}

			<h2 id="info" tabIndex="0" className='crnheading'>
				{props.language.CourseInformation}
			</h2>
			<hr/>
			<p tabIndex='0' className='crnheading'>
				<strong>{props.language.courseDescription}</strong>: {props.courseInformation.description}
			</p>
			<p tabIndex='0' className='crnheading'>
				<strong>{props.language.EducationLanguage}</strong>: 
				{
					props.courseInformation.language===0 ?
					"English (US)"
					:
					props.courseInformation.language===1?
					"Spanish (ES)"
					:
					props.courseInformation.language===2?
					"Portuguese (PT)"
					:
					props.courseInformation.language===3?
					'Polish (PL)'
					:
					props.courseInformation.language===4?
					'Turkish (TR)'
					:
					"Not Defined"
					}
			</p>
			<p tabIndex='0' className='crnheading'>
				<strong>{props.language.duration}</strong>: {<time>{parseInt(props.courseInformation.duration.split(":"))+":"+props.courseInformation.duration.split(":")[1]+":"+props.courseInformation.duration.split(":")[2]}</time>}

			</p>
			<p className='crnheading'>
				<strong tabIndex='0'>{props.language.audiences}</strong>: 
				<Lista 
				title={'Audiences'}
				data={props.courseInformation.support}
				/>
			</p>
			<hr/>

			{
				(props.courseInformation.coursePlan.guidedCoursePlan==="free" && 
				props.courseInformation.coursePlan.courseTemplate=== "without" && 
				(props.courseInformation.coursePlan.courseStructure=== "unit" || 
				props.courseInformation.coursePlan.courseStructure=== "topic" ))?
				undefined
				:
				<div>

					<h3 className='crnheading' id="info-pedag" tabIndex="0">
						{props.language.pedagogicalconsiderations}
					</h3>
					<p tabIndex="0">{props.courseInformation.analysis[2]}</p>
					<hr/>
					<h3 className='crnheading' id="info-goals" tabIndex="0">
						{props.language.LearningGoals}
					</h3>
					<p tabIndex='0' className='descriptiontext'>{props.language.learningObjectivesDefinition}</p>
					<Lista 
							title={'LearningGoals'}
							data={props.courseInformation.analysis[3]}
					/>
					<p  className='crnheading'>
						<strong tabIndex="0">{props.language.AffectiveDomainObjectives}</strong>:{" "}
						{props.courseInformation.analysis[5]}
					</p>
					<p className='crnheading'>
						<strong tabIndex="0">{props.language.PsychomotorDomainObjectives}</strong>:{" "}
						{props.courseInformation.analysis[6]}
					</p>
					<hr/>
					<h3 className='crnheading' id="info-outcomes" tabIndex="0">
						{props.language.learningOutcomes}
					</h3>
					

					<div tabIndex='0' className='descriptiontext'>{props.language.outcomeslegend}</div>
					<Lista 
						title={'learningOutcomes'}
						data={props.courseInformation.analysis[4]}
					/> 
					<h3 className='crnheading' id="info-outcomes" tabIndex="0">
						{props.language.learningconstraint}
						
					</h3>
					<Lista 
						title={'learningconstraint'}
						data={props.courseInformation.analysis[0]}
					/>

				</div>
			}	
			<hr/>
			<h3 className='crnheading' id="info-content" tabIndex="0">
				{props.language.CourseContent}
			</h3>
			<CourseContent
			   language={props.language}
				data={props.courseInformation.design}
				coursePlan={props.courseInformation.coursePlan}
				program={props.courseInformation.program}
			/>

		
			<h2 tabIndex='0' className='crnheading' id="tecnological" >{props.language.TechnologicalRequirements}</h2>
			<p tabIndex='0' className='descriptiontext'>
				{props.language.onlinecourseMessage}
			</p>
			<ol className='crnheading' style={{listStyleType: 'none', fontWeight: 'bold',}}>
				<li tabIndex='0' className='crnheading' id="tecnologicalhard">{props.language.hardwareRequirements}</li>
			
				
				{
					props.courseInformation.requirements.length!=0 ?
					<ol style={{listStyleType: 'none', fontWeight: 'normal',}}>

								{
									props.courseInformation.requirements!=undefined?
									props.courseInformation.requirements[1].map((item, index) =>(
										<li key={index}>{item.label}</li>
									))
									:
									undefined
								}
						
					
					</ol>
					:
					<li tabIndex='0' style={{listStyleType: 'none', fontWeight: 'normal'}} className='descriptiontext'>
						{props.language.NohardwareRequirement}
					</li>
				}
			</ol>
				
			

			<ol className='crnheading' style={{listStyleType: 'none', fontWeight: 'bold',}}>
				<li tabIndex='0' className='crnheading' id="tecnologicalhard">{props.language.Softwarerequirements}</li>
				
				{
					props.courseInformation.requirements.length!=0 ?
					<ol style={{listStyleType: 'none', fontWeight: 'normal',}}>
						{	
							props.courseInformation.requirements!=undefined?
							props.courseInformation.requirements[0].map((item, index) =>(
									<li tabIndex='0' key={index}>{item.label}</li>
								)) 
							:
							undefined
						}
					</ol>
					:
					<li tabIndex='0' style={{listStyleType: 'none', fontWeight: 'normal'}}>
						{props.language.NosoftwareRequirement}
					</li>
				} 
			</ol>
			<hr/>

		</div>
	);
}



export default function SyllabusButton(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleClose = value => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button
				startIcon={<MenuBookIcon />}
				onClick={() => setOpen(true)}
				style={props.style}
				size="large"
				variant="contained" 
				color="secondary"
				aria-describedby='courseSylabus'
			>
				{props.language.OpenSyllabus}
			</Button>

		{
			props.courseInformation.coursePlan.guidedCoursePlan!= "free"?
			<DialogFullWidth
				open={open}
				handleClose={handleClose}
				title={props.language.courseSyllabus}
				key="syllabus"
			>
				<Syllabus
					 courseInformation={props.courseInformation}
					 language={props.language}
				/>
			</DialogFullWidth>
			:
			<DialogFullWidth
				open={open}
				handleClose={handleClose}
				title={props.language.courseSyllabus}
				key="syllabus"
			>
				<iframe src={props.courseInformation.sylabus.pdf.link} style={{width:'100%', height:'100%'}} frameborder="0"></iframe>
			</DialogFullWidth>

		}
			
		</React.Fragment>
	);
}
