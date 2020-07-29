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
	},
	syllabus:{
		flex:1,
		justifyContent:'center',
		alignItems: 'center',
	},
}));

function Syllabus(props) {
	//const classes = useStyles();
	console.log("propiedades en silabus", props)

	return (
		<div className='crnoutcomeinfo'>
			
			<div className='crnheading'>
				<h1 className='title'>Course Syllabus</h1>
			</div>
			
			<div className='info'>
				
				<div className='info'>{props.courseInformation.title}</div>
				<div className='infosub'>{props.courseInformation.subtitle}</div>
				<div className='infocreated'>Instructor: {props.courseInformation.createdBy}</div>
			</div>
			<img style={{padding:'15px', display:'block', marginLeft:'auto', marginRight: 'auto'}} src="seli-logo.png" alt="logo" width="120" height="70"></img>
				
			{/* style={{backgroundImage: "url(seli-logo.png)"}} */}

			<nav aria-labelledby="toc">
				<details>
					<summary> {/* className={classes.summary} */}
					<div className='crnheading'>
						<h2 id="toc" tabIndex="-1">
							Table of Contents
						</h2>
					</div>
					</summary>
					<ul className='resources'>
						<li>
							<a href="#info">Course Information</a>
							<ol>
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
									<a href="#topic-n-readings">SuplemantaryMaterial</a>
								</li>
								<li>
									<a href="#topic-n-assess">Assessment Methods</a>
								</li>
								<li>
									<a href="#info-content">Course Content</a>	
								</li>
							</ol>
						</li>
						  <li>
							<a href="#tech">Technological Requirements</a>
							<ol >
								<li>
									<a href="#tech-hard">Hardware Requirements</a>
								</li>
								<li>
									<a href="#tech-soft">Software Requirements</a>
								</li>
							</ol>
						</li>
					</ul>
				</details>
				<hr />
			</nav>



			<div className='crnheading1'>
				<h2 id="info" tabIndex="-1">
					Course Information
				</h2>
			</div>
			<div className='crnheading'>
				<h2>Course Description</h2>
			</div>
			<div className='description'>
				<span className='descriptiontext'>
				{props.courseInformation.description}
				</span>
			</div>


			<div>
				<div className='crnheading'>
					<h3>Education Language</h3>
				</div>
				
				<div className='descriptiontext'>
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
					'Turkish (TR)'
					:
					"Not Defined"
					}
				</div>
				<div className='crnheading'>
					<h3>Duration</h3>
				</div>
				<div className='descriptiontext'>
					{props.courseInformation.duration}
				</div>
			</div>

			<div>
				<div className='crnheading'>
						<h3>Audience</h3>
				</div>
				<Lista 
				title='Audiences'
				data={props.courseInformation.support}
				/>
			</div>

			{
				(props.courseInformation.coursePlan.guidedCoursePlan==="free" && 
				props.courseInformation.coursePlan.courseTemplate=== "without" && 
				(props.courseInformation.coursePlan.courseStructure=== "unit" || 
				props.courseInformation.coursePlan.courseStructure=== "topic" ))?
				undefined
				:
				<div>
					<div>
					<div className='crnheading'>
						<h3 id="info-pedag" tabIndex="-1">
							Pedagogical Considerations
						</h3>
					</div>
					<div className='descriptiontext'>
						{props.courseInformation.analysis[2]}
					</div>
				</div>

				<div>
					<div className='crnheading'>
						<h3 id="info-goals" tabIndex="-1">Learning Goals</h3>
					</div>
					<div className='descriptiontext'>{props.language.learningObjectivesDefinition}</div>
					<div>
						<Lista 
							title='LearningGoals'
							data={props.courseInformation.analysis[3]}
						/>
					</div>
						<div className='crnheading'>
							<h3>Learning Affective Objectives</h3>
						</div>	
					<div>
						<div className='descriptiontext'>{props.courseInformation.analysis[5]}</div>
					</div>
					<div className='crnheading'>
						<h3>Learning Psychomotor Objectives</h3>
					</div>
					<div>
						<div className='descriptiontext'>{props.courseInformation.analysis[6]}</div>
					</div>
					</div>

					<div>
						<div className='crnheading'>
							<h3 id="info-outcomes" tabIndex="-1">Learning Outcomes</h3>
						</div>
						<div className='descriptiontext'>{props.language.outcomeslegend}</div>
						<div>
							<Lista 
								title='LearningOutcomes'
								data={props.courseInformation.analysis[4]}
							/>
						</div>
					</div>
				</div>
			}	
			
		
			<div>
				<div className='crnheading'>
					<h2 id="info-content" tabIndex="-1">Course Content</h2>
				</div>
			</div>
			{/* <div className='descriptiontext'>Some section introduction...</div> */}
			
			<CourseContent
				data={props.courseInformation.design}
				coursePlan={props.courseInformation.coursePlan}
				program={props.courseInformation.program}
			/>
			
			<HardwareSoftwareReq
				data={props.courseInformation.requirements}
			/>

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
				title="Syllabus"
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
