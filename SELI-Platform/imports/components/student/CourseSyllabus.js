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
						<h2 id="toc" tabIndex="-1">
							Table of Contents
						</h2>
					</summary>
					
					<ol>
						<li>
							<a href="#info">Course Information</a>
						</li>
							
						<li>
							<a href="#info-pedag">Pedagogical Considerations</a>
						</li>
						<li>
							<a href="#info-goals">Learning Goals</a>
						</li>
						<li>
							<a href="#info-outcomes">Learning Outcomes</a>
						</li>
						<li>
							<a href="#info-content">Course Content</a>
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
															<li><a href={"#content-topic-"+indexUnit}>Topic: {topic.title}</a></li>
															<ol id="intent">
																<li>
																	<a href={'#topic-'+indexUnit+'-readings'}>Readings</a>
																</li>
																<li>
																	<a href={'#topic-'+indexUnit+'-assess'}>Assessment Methods</a>
																</li>
															</ol>
														</React.Fragment>
														:
													(props.courseInformation.coursePlan.guidedCoursePlan==='guided'  && props.courseInformation.coursePlan.courseTemplate==='without' && props.courseInformation.coursePlan.courseStructure==='unit')?
														<React.Fragment>
															<li>
																<a href={"#content-topic-"+indexUnit}>Unit: {topic.title}</a>
																
																	<ol id="intent" key={indexUnit}>
																		{
																			props.courseInformation.design[indexUnit].lessons.map((lesson, indexLesson)=>(
																				<li>
																					<a href={"#lesson-"+indexLesson}>Lesson: {lesson.title}</a>
																				</li>
																			))
																		}
																		
																		<li>
																			<a href={'#topic-'+indexUnit+'-readings'}>Readings</a>
																		</li>
																		<li>
																			<a href={'#topic-'+indexUnit+'-assess'}>Assessment Methods</a>
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
													<li key={indexUnit}><a href={"#content-topic-"+indexUnit}>Topic: {topic.title}</a></li>
												</React.Fragment>
											:
											(props.courseInformation.coursePlan.guidedCoursePlan==='free'  && props.courseInformation.coursePlan.courseTemplate==='without' && props.courseInformation.coursePlan.courseStructure==='unit')?
														
													<li key={indexUnit}>
														<a href={"#content-topic-"+indexUnit}>Unid: {topic.title}</a>
														<ol id="intent" key={indexUnit}>
															{
																props.courseInformation.design[indexUnit].lessons.map((lesson, indexLesson)=>(
																	<li>
																		<a href={"#lesson-"+indexLesson}>Lesson: {lesson.title}</a>
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
							<a href="#tecnological">Technological Requirements</a>
								<ol id="intent">
									<li>
										<a href="#tecnologicalhard">Hardware Requirements</a>
									</li>
									<li>
										<a href="#tecnologicalsoft">Software Requirements</a>
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
			{/* <h1>Course Syllabus</h1> */}
			<p className='crnheadingtitle'>
				<em>{props.courseInformation.title} : {props.courseInformation.subtitle}</em>
			</p>
			<p className='crnheading' >
				<strong>Instructor</strong>: {props.courseInformation.createdBy}
			</p>
			<img alt="" style={{padding:'15px', display:'block', marginLeft:'auto', marginRight: 'auto'}} src="seli-logo.png" alt="logo" width="120" height="70"></img>
				
			{indexes()}

			<h2 id="info" tabIndex="-1" className='crnheading'>
				Course Information
			</h2>
			<hr/>
			<p className='crnheading'>
				<strong>Course Description</strong>: {props.courseInformation.description}
			</p>
			<p className='crnheading'>
				<strong>Education Language</strong>: 
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
			<p className='crnheading'>
				<strong>Duration</strong>: {props.courseInformation.duration}
			</p>
			<p className='crnheading'>
				<strong>Audience</strong>: 
				<Lista 
				title='Audiences'
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

					<h2 className='crnheading' id="info-pedag" tabIndex="-1">
						Pedagogical Considerations
					</h2>
					<p>{props.courseInformation.analysis[2]}</p>
					<hr/>
					<h3 className='crnheading' id="info-goals" tabIndex="-1">
						Learning Goals
					</h3>
					<p className='descriptiontext'>{props.language.learningObjectivesDefinition}</p>
					<Lista 
							title='LearningGoals'
							data={props.courseInformation.analysis[3]}
					/>
					<p className='crnheading'>
						<strong >Affective Domain Objectives</strong>:{" "}
						{props.courseInformation.analysis[5]}
					</p>
					<p className='crnheading'>
						<strong >Psychomotor Domain Objectives</strong>:{" "}
						{props.courseInformation.analysis[6]}
					</p>
					<hr/>
					<h3 className='crnheading' id="info-outcomes" tabIndex="-1">
						Learning Outcomes
					</h3>
					<div className='descriptiontext'>{props.language.outcomeslegend}</div>
					<Lista 
						title='LearningOutcomes'
						data={props.courseInformation.analysis[4]}
					/>
				</div>
			}	
			<hr/>
			<h3 className='crnheading' id="info-content" tabIndex="-1">
				Course Content
			</h3>
			<CourseContent
				data={props.courseInformation.design}
				coursePlan={props.courseInformation.coursePlan}
				program={props.courseInformation.program}
			/>

		
			<h3 className='crnheading' id="tecnological" >Technological Requirements</h3>
			<p className='descriptiontext'>
				As a online course, it's required that you have access to a computer 'desktop or mobile' with internet connection.
			</p>
			<div className='crnheading'>
				<h5 className='crnheading' id="tecnologicalhard">Hardware requirements</h5>
			</div>
				
				{
					props.courseInformation.requirements.length!=0 ?
					<div>
						
							<ol className='resources'>
								{
									props.courseInformation.requirements.data[1]!=undefined?
									props.courseInformation.requirements.data[1].map((item, index) =>(
										<li key={index}>{item.label}</li>
									))
									:
									<div className='descriptiontext'>
										No hardware requirement.
									</div>
								}
							</ol>
					
					</div>
					:
					<div className='descriptiontext'>
						No hardware requirement.
					</div>
				}
				<div className='crnheading' className='crnheading'>
					<h5  id="tecnologicalsoft">Software requirements</h5 >
				</div>
				
				{
					props.courseInformation.requirements.length!=0 ?
					<ol className='resources'>
						{	
							props.courseInformation.requirements.data[0]!=undefined?
							props.courseInformation.requirements.data[0].map((item, index) =>(
									<li key={index}>{item.label}</li>
								)) 
							:
							<div>
								No software requirement.
							</div>  
						}
					</ol>
					:
					<div>
						No software requirement.
					</div>
				} 
      	
			

		
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
			>
				Open Syllabus
			</Button>

			<DialogFullWidth
				open={open}
				handleClose={handleClose}
				title="Course Syllabus"
				key="syllabus"
			>
				<Syllabus
					 courseInformation={props.courseInformation}
					 language={props.language}
				/>
			</DialogFullWidth>
		</React.Fragment>
	);
}
