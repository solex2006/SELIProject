import React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	Divider,
	FormControl,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import { Rating, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import StorySearchToolbar from './StorySearchToolbar'

const useStyles = makeStyles(theme => ({
   searchDetailed:{
      marginTop: '30px'
   },
	formControl: {
		margin: theme.spacing(1),
		display: 'block'
	},
	accordiondetails: {
		display: 'block'
	},
	select: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	ranting: {
		width: 'fit-content',
		display: 'flex',
		alignItems: 'center',
		top: 0
	},
	banner: {
		background: "url('https://seli.uazuay.edu.ec/courses.jpg')",
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '100%',
		backgroundSize: '35%',
		height: '200px'
	},
	card: {
		maxWidth: 345,
		//  maxHeight: 450,
		display: 'tabel-cell',
		paddingRight: '1em'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	searchbar: {
		//padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '98vw',
		minWidth: '98vw',
		'& label': {
			top: '-16px'
		},
		'& label+.MuiInput-formControl': {
			marginTop: '0px'
		},
		'& .MuiRating-label': {
			top: 0
		},
		'& $ranting': {
			flexDirection: 'initial'
		}
	},
	searchcontainer: props => ({
		display: 'flex',
		width: props.searchwidth
		//float: "right"
	}),
	filtercontainer: props => ({
		display: 'flex',
		width: props.filterwidth
		//position: "relative",
		//right: 0
	}),
	fixedList: {
		width: '100%',
		height: 400,
		maxWidth: 300,
		overflow: 'auto',
		backgroundColor: theme.palette.background.paper
	},
	filterlabel: {
		transition:
			'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
		position: 'absolute',
		left: 0,
		transform: 'translate(0, 1.5px) scale(0.75)',
		transformOrigin: 'top left',
		color: 'rgba(0, 0, 0, 0.54)',
		padding: 0,
		fontSize: '1rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontWeight: 400,
		lineHeight: 1,
		letterSpacing: '0.00938em'
	},
	tbgroup: {
		position: 'relative'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
		//maxWidth: props => props.size
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

function getCourses(total, myCourses) {
	const items = [];

	for (let i = 0; i < total; i++) {
		items.push(
			<Grid item>
				<StoryCard resume={myCourses} />
			</Grid>
		);
	}

	return items;
}

function CheckboxList({ items, subheader }) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List className={classes.fixedList}>
			{items.map(item => (
                
				<ListItem
					key={item}
					role={undefined}
					dense
					button
					onClick={handleToggle(item)}
				>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={checked.indexOf(item) !== -1}
							tabIndex={-1}
							disableRipple
							inputProps={{
								'aria-labelledby': `checkbox-list-label-${item}`
							}}
						/>
					</ListItemIcon>
					<ListItemText id={`checkbox-list-label-${item}`} primary={item} />
				</ListItem>
			))}
		</List>
	);
}

export default function StorySearch(props) {
   console.log("propiedades CourseSearch: ", props)
   const classes = useStyles();

   return (
       
		<React.Fragment>
			<Paper className={classes.searchDetailed} component="article" elevation={0}>
				<StorySearchToolbar
					OrSearch={props.OrSearch}
					getParamsofSearch= {props.getParamsofSearch}
					getParamsLanguage= {props.getParamsLanguage}
					getParamsDuration= {props.getParamsDuration}
					getParamsAudiences={props.getParamsAudiences}
					publishedCourses=	 {props.publishedCourses}
					getParamsTutors=	 {props.getParamsTutors}
					getOnlineFlag=     {props.getOnlineFlag}
					getAccessibleFlag= {props.getAccessibleFlag}
					getGeneralSearch={props.getGeneralSearch}
					sortByMostRecent={props.sortByMostRecent}
				/>
			</Paper>
		</React.Fragment>
	);
}

function StoryCard({ resume }) {
	const classes = useStyles();

	return (
		<Card className={classes.card} variant="outlined">
			<CardHeader title="Story Title" subheader="Story Subtitle" />
			<CardMedia
				className={classes.media}
				image={'plant.jpg'}
                title="Paella dish"
                
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris
					se pirulitá. Suco de cevadiss deixa as pessoas mais interessantis.
					Interessantiss quisso pudia ce receita de bolis, mais bolis eu num
					gostis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis
					que eu levo!
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Button>{resume ? 'Resume' : 'Go to'} course</Button>
			</CardActions>
		</Card>
	);
}
