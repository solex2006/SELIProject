import React, { useState,useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Paper,
	Button
} from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LanguageIcon from "@material-ui/icons/Language";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import SchoolIcon from "@material-ui/icons/School";
import {
	InstructorProfileDialog,
	InstructorProfileCard,
	InstructorProfileAvatar
} from "./userCard";
import Lista from './shared/ListComponent';
import CourseContent from './shared/ContentPreview'
import SyllabusButton from './CourseSyllabus'
import HardwareSoftwareReq from './shared/HardwareSoftwareReq'

const useStyles = makeStyles(theme => ({
	banner: {
		...theme.typography.h1,
		fontSize: "2em",
		padding: "0.5em",
		backgroundColor: "#2A2A22",
		color: "#e4f1fe",
		"& *": {
			color: "#e4f1fe"
		},
		"& $list": {
			"& .MuiListItemText-primary": {
				color: theme.palette.secondary.light
			},
			"& .MuiListItemText-secondary": {
				color: "#e4f1fe"
			},
			"& .MuiAvatar-root": {
				backgroundColor: theme.palette.secondary.light
			}
		}
	},
	instructor: {
		marginBottom: ".2em"
	},
	summary: {
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "transparent"
	},
	header2: {
		...theme.typography.h2,
		fontSize: "1.5em"
	},
	subtitle1: {
		...theme.typography.subtitle1,
		fontSize: "1em"
	},
	subtitle2: {
		...theme.typography.subtitle2
		//	fontSize: ".8em"
	},
	caption: {
		...theme.typography.caption
		//	fontSize: ".8em"
	},
	body2: {
		...theme.typography.body2
		//	fontSize: ".8em"
	},
	body1: {
		...theme.typography.body1
		//	fontSize: ".8em"
	},
	courseImg: {
		width: "100%",
		minWidth: "100%",
		height: "100%",
		maxHeight: "100%"
	},
	sublist: {
		paddingLeft: theme.spacing(8)
	},
	list: {
		"& .MuiListItemText-primary": {
			color: theme.palette.secondary.dark
		},
		"& .MuiListItemText-secondary": {
			//color: "#e4f1fe"
		},
		"& .MuiAvatar-root": {
			backgroundColor: theme.palette.secondary.main
		}
	},
}));


const CourseSummary = ({coursedata, language}) => {
	const classes = useStyles();
	return (
		<Paper  elevation={1} className={classes.summary}>
			<List dense={true} className={classes.list}>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<SchoolIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						tabIndex='0'
						secondary={language.passingGrade}
						primary={language.completitionCertificate}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<TimerIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						tabIndex='0'
						secondary={language.estimatedCourseDuration}
						primary={<time>{parseInt(coursedata.duration.split(":"))+":"+coursedata.duration.split(":")[1]+":"+coursedata.duration.split(":")[2]}</time>}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<LanguageIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						tabIndex='0'
						secondary={language.CourseLanguage}
						primary={
								coursedata.language===0 ?
								"English (US)"
								:
								coursedata.language===1?
								"Spanish (ES)"
								:
								coursedata.language===2?
								"Portuguese (PT)"
								:
								coursedata.language===3?
								'Polish (PL)'
								:
								coursedata.language===4?
								'Turkish (TK)'
								:
								"Not Defined"
								
							}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<CastForEducationIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						tabIndex='0'
						secondary={language.CourseModality}
						primary={coursedata.modality}  
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

const CourseHeader = ({classes, coursedata, tutordata, language, goToUser}) => {
	//console.log("paso 4***********", language)
	const [tutordata1,setTutor]=useState(tutordata)
	return (
		<React.Fragment>
			<div className="course-presentation-title-container">
				<div tabIndex='0' className="course-presentation-title">
				{coursedata.title}
				</div>
				<span tabIndex='0' className="course-presentation-subtitle">
					{coursedata.subtitle}
				</span>
			</div>
			<InstructorProfileAvatar
				goToUser={goToUser}
				language={language}
				name={"Created by " + (typeof(tutordata) ==='object' ? tutordata[0].profile.fullname:"")}
				className={classes.caption}
				coursedata={coursedata}
				tutordata={tutordata}
			/> 
			<p id='teacherProfile' style={{display: "none"}}>Open teacher profile</p>
		</React.Fragment>
	);
};

export default function MainPage(props) {
  //console.log("Propiedades en MainContenet", props)
  const [coursedata, setCoursedata] = useState(props.course)
  let [tutordata, setTutordata] = useState('')
	const theme = useTheme();
	const classes = useStyles();

	useEffect(() => {
		getTutors()
	}, [])

	getTutors = () => {
		Tracker.autorun(() => {
			Meteor.call("GetTutorsCourse",coursedata.createdBy ,(error, response) =>  {
				setTutordata(response)
			});
		});
	}
	//tutordata=Meteor.users.find({username: coursedata.createdBy, 'profile.type': 'tutor'}).fetch()
	//setTutordata(user)
	return (
		<div className={props.goToUser ? "course-presentation-container" : ""}>
			<Paper component="header" elevation={3} className={classes.banner}>
				{useMediaQuery(theme.breakpoints.up("lg")) ? (
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="center"
						spacing={4}
					>
						<Grid item lg={7}>
							<CourseHeader 
							   goToUser={props.goToUser}
							   language={props.language}
								classes={classes}
								coursedata={coursedata}
								tutordata={tutordata} />
						</Grid>
						<Grid item lg={5}>
							<img
								src={coursedata.image.link}
								alt=""
								className={classes.courseImg}
							/>
						</Grid>
					</Grid>
				) : (
					<React.Fragment>
						<img src={coursedata.image.link} alt="" className={classes.courseImg} />
						<CourseHeader 
						language={props.language}
						coursedata={coursedata}
						classes={classes}
						tutordata={tutordata}
						/>
					</React.Fragment>
				)}
			</Paper>
			<Paper component="article" elevation={0} className="course-presentation-paper">
			<section aria-labelledby="courseInformation">
				<header className='crnheading'>
				<h2 tabIndex='0' >{props.language.CourseInformation}</h2>
				</header>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="strech"
					spacing={4}
				>
					<Grid item xs={12} md={6}>
						<p tabIndex='0'>
							{coursedata.description}
						</p>
						
						{
							(props.course.coursePlan.guidedCoursePlan==="free" && 
							props.course.coursePlan.courseTemplate=== "without" && 
							(props.course.coursePlan.courseStructure=== "unit" || 
							props.course.coursePlan.courseStructure=== "topic" ))?
							undefined
							:
							<div className='crnheading'>
								<h3 tabIndex='0' className={classes.body1}>
									{props.language.outcomeslegend}
								</h3>
								<Lista 
									title='LearningOutcomesMainContent'
									data={coursedata.analysis[4]}
								/>
							</div>
							
						}
					</Grid>
					<Grid item xs={12} md={6}>
						<CourseSummary
							coursedata={coursedata}
							language={props.language}
						/>
					</Grid>
				</Grid>
			</section>
			
				{
					(props.course.coursePlan.guidedCoursePlan==="free" && 
					props.course.coursePlan.courseTemplate=== "without" && 
					(props.course.coursePlan.courseStructure=== "unit" || 
					props.course.coursePlan.courseStructure=== "topic" ))?
					undefined
					:
				<section aria-label="Course design">
					<h2 tabIndex='0'>{props.language.CourseDesign}</h2>			
					<div >
						<Lista 
							title='AudiencesMainContent'
							data={coursedata.support}
						/>
					</div>
				</section> 
				}
			</Paper>
			<Paper component="article" elevation={0} className="course-presentation-paper1">
		
			<div className='crnheading1'>
			<h2 tabIndex='0'>{props.language.CourseContent}</h2>
			</div>
		
				<CourseContent
					language={props.language}
					data={props.course.design}
					coursePlan={props.course.coursePlan}
					program={props.course.program}
				/>
				<p id='courseSylabus' tabIndex='0'>
					{props.language.readCourseSylabus}
				</p>
				<div className='crnheading'>
					<SyllabusButton
					   tabIndex='0'
						courseInformation={props.course}
						language={props.language}
					/>
				</div>
			</Paper>
			<Paper component="article" elevation={0} className="course-presentation-paper1"> 
				<div className='crnheading'>
			<h2 tabIndex="0">{props.language.requirements}</h2>
				</div>
				<HardwareSoftwareReq
					data={coursedata.requirements}
				/> 
			</Paper>
			
			<div className="course-presentation-actions-container">
				{
					props.course.published ?
						props.goToUser ?
							props.progress ?
								props.progress === "noProgress" ?
									<Button
										//tabIndex="1" 
										onClick={() => props.goToUser("subscribe")}
										className="subscription-card-button"
										variant="contained"
										color="primary"
									>
										{props.language.subscribeJoin}
									</Button>
								:
									<React.Fragment>
										<Button
											//tabIndex="1" 
											id="botonfocus3"
											onClick={() => props.goToUser("unsubscribe")}
											className="subscription-card-button"
											variant="outlined"
											color="primary"
										>
											{props.language.unsubscribe}
										</Button>
										<Button
											//tabIndex="1" 
											id="botonfocus2"
											onClick={() => props.goToUser("enter")}
											className="subscription-card-button"
											variant="contained"
											color="primary"
										>
											{
												
												props.progress <= 0 ? props.language.startCourse :
												props.progress > 0 && props.progress < 100 ? props.language.resumeCourse :
												props.progress >= 100 ? props.language.reviewCourse : undefined
											}
										</Button>
									</React.Fragment>
							:
								<React.Fragment>
									<Button tabIndex="0" variant="contained" onClick={() => props.goToLogIn("in")} color="primary" className="bar-button">
										{props.language.signIn}
									</Button>
									<Button tabIndex="0" variant="contained" onClick={() => props.goToLogIn("up")} color="secondary" className="bar-button">
										{props.language.signUp}
									</Button>
								</React.Fragment>
						:
							<React.Fragment>
								<Button
									//tabIndex="1"
									id="botonfocus1" 
									onClick={() => props.unsubscribe(props.course._id)}
									className="subscription-card-button"
									variant="outlined"
									color="primary"
								>
									{props.language.unsubscribe}
								</Button>
								<Button
									//tabIndex="1"
									id="botonfocus" 
									onClick={() => props.navigateTo([0, 0, 0, 0])}
									className="subscription-card-button"
									variant="contained"
									color="primary"
								>
									{
										props.progress <= 0 ? props.language.startCourse :
										props.progress > 0 && props.progress < 100 ? props.language.resumeCourse :
										props.progress >= 100 ? props.language.reviewCourse : undefined
									}
								</Button>
							</React.Fragment>
					:
						<React.Fragment>
							<div className="course-not-published">{props.language.courseNotPublished}</div>		
							<InstructorProfileAvatar
								goToUser={props.goToUser}
								language={props.language}
								name={props.language.createdBy + (typeof(tutordata) ==='object' ? tutordata[0].profile.fullname:"")}
								className={classes.caption}
								coursedata={coursedata}
								tutordata={tutordata}
							/> 
						</React.Fragment>
				}
			</div>
		</div>
	);
}
