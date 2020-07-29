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
	paper:{
		paddingLeft: '60px',
		paddingTop: '35px'
	},
	paper1:{
		paddingLeft: '60px',
		paddingTop: '10px'
	}
}));


const CourseSummary = ({coursedata}) => {
	const classes = useStyles();
	return (
		<Paper elevation={1} className={classes.summary}>
			<List dense={true} className={classes.list}>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<SchoolIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						secondary={"Complete this course with a passing grade."}
						primary={"Course completition certificate"}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<TimerIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						secondary={"Estimated course duration"}
						primary={coursedata.duration}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Avatar>
							<LanguageIcon />
						</Avatar>
					</ListItemIcon>
					<ListItemText
						secondary={"Course language"}
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
								'Turkish (TR)'
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
						secondary={"Course modality"}
						primary={coursedata.analysis[1]}  
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

const CourseHeader = ({classes, coursedata, tutordata}) => {
	//console.log("coursedata and props", coursedata,tutordata)
	return (
		<React.Fragment>
			<h1>
				{coursedata.title}
				<span className={classes.subtitle1}>
					<br />
					{coursedata.subtitle}
				</span>
			</h1>
			<InstructorProfileAvatar
				name={"Created by " + coursedata.createdBy}
				className={classes.caption}
				coursedata={coursedata}
				tutordata={tutordata}
			/> 
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
						coursedata={coursedata}
						classes={classes}
						tutordata={tutordata}
						/>
					</React.Fragment>
				)}
			</Paper>
			<Paper component="article" elevation={0} className={classes.paper}>
				<header>
					<h2 className={classes.header2}>Course Information</h2>
				</header>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={4}
				>
					<Grid item lg={7}>
						<p className={classes.body2}>
							{coursedata.description}
						</p>
						
						{
							(props.course.coursePlan.guidedCoursePlan==="free" && 
							props.course.coursePlan.courseTemplate=== "without" && 
							(props.course.coursePlan.courseStructure=== "unit" || 
							props.course.coursePlan.courseStructure=== "topic" ))?
							undefined
							:
							<div>
								<p className={classes.body1}>
									By the end of this course, you will be able to:
								</p>
								<Lista 
									title='LearningOutcomes'
									data={coursedata.analysis[4]}
								/>
							</div>
							
						}
					</Grid>
					<Grid item lg={4}>
						<CourseSummary
							coursedata={coursedata}
						/>
					</Grid>
				</Grid>
				{
					(props.course.coursePlan.guidedCoursePlan==="free" && 
					props.course.coursePlan.courseTemplate=== "without" && 
					(props.course.coursePlan.courseStructure=== "unit" || 
					props.course.coursePlan.courseStructure=== "topic" ))?
					undefined
					:
					<section aria-label="Course design">
					<h3 className={classes.header2}>Course Design</h3>			
					<List dense={true}>
						<Lista 
							title='Audiences'
							data={coursedata.support}
						/>
					</List>
				</section> 
				}
			</Paper>
			<Paper component="article" elevation={0} className={classes.paper1}>
				<header>
				<div className='crnheading1'>
					<h2 className={classes.header2}>Course Content</h2>
				</div>
				</header>
				<CourseContent
					data={props.course.design}
					coursePlan={props.course.coursePlan}
					program={props.course.program}
				/>
				<p>
					Read the course syllabus for a complete view of the course program
				</p>
				<div className='crnheading'>
					<SyllabusButton
						courseInformation={props.course}
						language={props.language}
					/>
				</div>
			</Paper>
			<Paper component="article" elevation={0} className={classes.paper1}> 
				<div className='crnheading'>
					<h2 className={classes.header2}>Requirements</h2>
				</div>
				<HardwareSoftwareReq
					data={coursedata.requirements}
				/> 
			</Paper>
			<div className="course-presentation-actions-container">
				{
					props.goToUser ?
						props.progress === "noProgress" ?
							<Button
								tabIndex="1" 
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
									tabIndex="1" 
									onClick={() => props.goToUser("unsubscribe")}
									className="subscription-card-button"
									variant="contained"
									color="primary"
								>
									{props.language.unsubscribe}
								</Button>
								<Button
									tabIndex="1" 
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
							<Button
								tabIndex="1" 
								onClick={() => props.unsubscribe(props.course._id)}
								className="subscription-card-button"
								variant="contained"
								color="primary"
							>
								{props.language.unsubscribe}
							</Button>
							<Button
								tabIndex="1" 
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
				}
			</div>
		</div>
	);
}
