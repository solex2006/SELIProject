import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Button,
	Link,
	Dialog,
	DialogActions,
	DialogContent,
	Grid
} from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import PropTypes from "prop-types";
import clsx from "clsx";
import DialogFullWidth from './shared/dialog_fullwidth'
//import CoursesDashboard from '../../../imports/ui/CoursesDashboard'
import MediaCard from './shared/PublishedCourses'
const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 275,
		margin: "auto",
		padding: "auto"
	},
	name: {
		...theme.typography.h4
	},
	prof: {
		marginBottom: 12,
		color: theme.palette.text.secondary
	},
	avatar: {
		width: "8em",
		height: "8em"
	},
	LinkedIn: {
		color: "#2867B2"
	},
	info: {
		"& $name": {
			margin: "0"
		},
		"& $prof": {
			margin: "0"
		}
	},
	Twitter: {
		color: "#1DA1F2"
	},
	YouTube: {
		color: "#FF0000"
	},
	avatarButton: {
		backgroundColor: "transparent"
	}
}));

function InstructorProfileCard(user) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<InstructorProfile />
			</CardContent>
			<CardActions>
				<Button variant="contained" >Published courses</Button>
			</CardActions>
		</Card>
	);
}

function InstructorProfileDialog({ handleClose, open, user }) {
	const classes = useStyles();
	
	const [opendialog, setOpendialog] = useState(false);
	
 	const handleClosedialog = value => {
		setOpen(false);
	}; 

	


	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="instructor profile"
			open={open}
			disableBackdropClick={true}
		>
			<DialogContent>
				<InstructorProfile 
				user={user}
				/>
			</DialogContent>

			<DialogActions>
				<Button color="primary" onClick={handleClose}>Close</Button>
				<Button variant="outlined" color="primary" onClick={() => setOpendialog(true)}>Published courses</Button>
			</DialogActions>
			<DialogFullWidth
					open={opendialog}
					handleClose={()=>setOpendialog(false)}
					title="Courses"
					key="courses"
			>
				<MediaCard
				user={user}
				/>
			</DialogFullWidth>
		</Dialog>
	);
}

function InstructorProfileAvatar({
	name,
	nameClass,
	className,
	disabledDialog,
	coursedata,
	tutordata
}) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(tutordata);
	const handleClose = value => {
		setOpen(false);
	};

	//console.log("InstructorProfileAvatarcoursedata---------------------",tutordata)
	return (
		<React.Fragment>
			{disabledDialog ? (
				<Grid
					container
					spacing={1}
					direction="row"
					justify="flex-start"
					alignItems="center"
					className={clsx(className)}
				>
					<Grid item>
						<Avatar />
					</Grid>
					<Grid item className={nameClass}>
						{name}
					</Grid>
				</Grid>
			) : (
				<Button
					startIcon={<Avatar />}
					className={className}
					onClick={() => setOpen(true)}
				>
					{name}
				</Button>
			)}
			<InstructorProfileDialog open={open} handleClose={handleClose} user={tutordata} />
		</React.Fragment>
	);
}

export default function InstructorProfile({ user }) {
	console.log('user-------------------->',user)
	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid
				container
				spacing={4}
				direction="row"
				justify="flex-start"
				alignItems="center"
			>
				<Grid item>
					<Avatar 
					src={user[0].profile.profileImage.link}
					className={classes.avatar} />
				</Grid>
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="flex-start"
						className={classes.info}
					>
						<Grid item>
							<p className={classes.name}>{user[0].profile.fullname}</p>
						</Grid>
						<Grid item>
							<p className={classes.prof} color="textSecondary">
								Professional title
							</p>
						</Grid>
						<Grid item>
							<Link
								href="http://LinkedIn.com"
								size="small"
								aria-label="LinkedIn profile"
							>
								<LinkedInIcon className={classes.LinkedIn} />
							</Link>
							<Link
								href="http://Twitter.com"
								size="small"
								aria-label="Twitter profile"
							>
								<TwitterIcon className={classes.Twitter} />
							</Link>
							<Link
								href="http://YouTube.com"
								size="small"
								aria-label="YouTube profile"
							>
								<YouTubeIcon className={classes.YouTube} />
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<p className={classes.bio}>
			{user[0].profile.biography}
			</p>
		</React.Fragment>
	);
}

InstructorProfileDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

InstructorProfileAvatar.propTypes = {
	name: PropTypes.string.isRequired,
	disabledDialog: PropTypes.bool
};

InstructorProfileAvatar.defaultProps = {
	disabledDialog: false
};
export {
	InstructorProfileDialog,
	InstructorProfileCard,
	InstructorProfileAvatar
};
