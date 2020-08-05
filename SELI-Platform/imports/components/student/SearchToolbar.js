import React, {useEffect, useState} from 'react';
import {
	Button,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Checkbox,
	Divider,
	FormControl,
	InputBase,
	MenuItem
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
// import ClearIcon from '@material-ui/icons/Clear';
import ClearIcon from '@material-ui/icons/ClearAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { Rating, ToggleButton } from '@material-ui/lab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SimpleDialog from './shared/dialog';
import FullDialog from './shared/dialog_fullwidth';
import DurationSlider from './shared/duration-slider';

import { Courses } from '../../../lib/CourseCollection';
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

const StyledToggleButtonGroup = withStyles(theme => ({
	grouped: {
		margin: theme.spacing(0.5),
		border: 'none',
		'&:not(:first-child)': {
			borderRadius: theme.shape.borderRadius
		},
		'&:first-child': {
			borderRadius: theme.shape.borderRadius
		}
	}
}))(ToggleButtonGroup);

export default function SearchToolBar(props) {
	const [query, setQuery] = React.useState('');
	const [openFilter, setOpenFilter] = React.useState(false);
	const [openSorter, setOpenSorter] = React.useState(false);
	const [area, setArea] = React.useState([]);
	const [duration, setDuration] = React.useState([5, 200]);
	const [audiences, setAudiences] = React.useState({
			Graduatestudents:false, 
			Informalstudents:false, 
			TeachersandProfessors:false,
			Preschoolkids:false, 
			Postgraduatestudent:false,  
			Pregradestudent:false,  
			HighSchoolStudents:false,  
			MiddleSchoolStudents:false,  
			ElementarySchoolStudents:false,
	});
	const [skills, setSkills] = React.useState([]);
	const [languages, setLanguages] = React.useState({
		english:false,
		spanish:false,
		portugues:false,
		turkish:false,
		polish:false,
	});
	const [instructors, setInstructors] = React.useState({});
	const [instructorsLabels, setInstructorsLabels] = React.useState([]);
	const [courses, setCourses] = React.useState(props.publishedCourses);
	const INITIAL_ACCESSIBILITY = {
		full: false,
		partial: false,
		a11yCog: 'no-filter',
		a11yVis: 'no-filter',
		a11yHear: 'no-filter'
	};
	const [accessibility, setAccessibility] = React.useState(
		INITIAL_ACCESSIBILITY
	);
	const [ranting, setRanting] = React.useState(3);
	const [selectedonline, setselectedonline] = React.useState(false);
	const [selectedaccessible, setselectedaccessible] = React.useState(false);
	
	const showDetailedFilter = useMediaQuery(theme => theme.breakpoints.up('md'));
	const showMinFilter = useMediaQuery(theme => theme.breakpoints.down('xs'));

	const classes = useStyles({
		filterwidth: showMinFilter
			? 'fit-content'
			: showDetailedFilter
			? '715px'
			: '240px',
		searchwidth: showMinFilter
			? '100%'
			: showDetailedFilter
			? 'calc(100vw - 732px)'
			: 'calc(100vw - 243px)'
	});
	const theme = useTheme();

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250
			}
		}
	};

	const [switchOnline, setswitchOnline] = React.useState(false);

	const handleChangeOnline=()=>{
		console.log("switch",!switchOnline)
		if(!switchOnline===true){
			props.getOnlineFlag(!switchOnline)
		}else{
			props.getOnlineFlag(!switchOnline)
		}
	}

	useEffect(() => {
		//console.log("ussefeffect", props )
		getTutors()
	}, [])
	

	const getTutors=()=>{
		let createdBy={}
		let createdByArray=[]
		courses.map((course, courseIndex)=>{
			createdBy[`${course.createdBy}`]=false
			createdByArray.push(course.createdBy)
		})
		createdByArray=[... new Set(createdByArray)]
		setInstructors(createdBy)
		setInstructorsLabels(createdByArray)
		console.log("createdBy && createdByArray", createdBy, createdByArray)
	}

	
	const SKILLS = ['Version Control', 'Full Stack', 'Data Base'];
	const AUDIENCE =  [
			"Graduate students", 
			"Informal students", 
			"Teachers and Professors",
			"Preschool kids", 
			"Post graduate student",  
			"Pregrade student",  
			"High School Students",  
			"Middle School Students",  
			"Elementary School Students",  
	];
	const AREAS = ['Arts', 'Computer Science', 'Math and Logic', 'Music'];

	const handleAccessibilityChange = ({ target }) => {
		setAccessibility(prev => {
			let tmp = {
				...prev,
				[target.name]: target.value
			};
			let noFilter =
				tmp.a11yCog === 'no-filter' ||
				tmp.a11yVis === 'no-filter' ||
				tmp.a11yHear === 'no-filter';

			let partial = false;
			let full = false;

			if (!noFilter) {
				full =
					tmp.a11yCog === 'full' &&
					tmp.a11yVis === 'full' &&
					tmp.a11yHear === 'full';

				partial = !full;
			}

			return { ...tmp, full: full, partial: partial };
		});
	};

	function RantingCourse({ feedback, label }) {
		const classes = useStyles();
		//	sizeRanting: feedback ? "100%" : "200px"
		const [hover, setHover] = React.useState(-1);
		const labels = {
			0.5: '0.5 star',
			1: '1 Star',
			1.5: '1.5 Stars',
			2: '2 Stars',
			2.5: '2.5 Stars',
			3: '3 Stars',
			3.5: '3.5 Stars',
			4: '4 Stars',
			4.5: '4.5 Stars',
			5: '5 Stars'
		};
		return (
			<FormControl className={classes.ranting}>
				<Grid container spacing={1}>
					<Grid item>
						<Rating
							aria-label="Course ranting"
							aria-describedby="ranting-description"
							role="radiogroup"
							name="ranting-course"
							value={ranting}
							precision={1}
							onChange={(event, newValue) => {
								setRanting(newValue);
							}}
							onChangeActive={(event, newHover) => {
								setHover(newHover);
							}}
						/>
					</Grid>
					<Grid item>
						<FormLabel component="legend" id="ranting-description">
							{label}{' '}
							{feedback &&
								ranting !== null &&
								labels[hover !== -1 ? hover : ranting]}
						</FormLabel>
					</Grid>
				</Grid>
			</FormControl>
		);
	}

	

	const handleSelected = (event) => {
		setselectedonline(!selectedonline);
		props.getOnlineFlag(!selectedonline)
		
	};

	const handleSelectedAccessibilitie= (event) => {
		setselectedaccessible(!selectedaccessible);
		props.getAccessibleFlag(!selectedaccessible)
	}
	
 
	const search=(event)=>{
		setQuery(event.target.value)
		console.log(event.target.value)
	 }

	 
	 const GeneralSearch=()=>{
		props.getGeneralSearch(query)
	 }



	return (
		<React.Fragment>
			<Paper component="form" className={classes.searchbar} elevation={0}>
				<div className={classes.searchcontainer}>
			
					<InputBase
						value={query}
						className={classes.input}
						placeholder="Search SELI Courses"
						inputProps={{ 'aria-label': 'search seli courses' }}
						onChange={search}
					/>
					<IconButton onClick={()=>GeneralSearch()} className={classes.iconButton} aria-label="search">
					<SearchIcon />
					</IconButton>
			
				</div>
				<div className={classes.filtercontainer}>
					<Divider className={classes.divider} orientation="vertical" />

					{showMinFilter ? (
						<IconButton
							//variant="contained"
							color="secondary"
							className={classes.button}
							onClick={() => {
								setOpenSorter(true);
							}}
						>
							<SortIcon />
						</IconButton>
					) : (
						<SortCourse />
					)}
					{showDetailedFilter && (
						<React.Fragment>
							<Divider className={classes.divider} orientation="vertical" />
							<ToggleButtonGroup 
								orientation="horizontal" 
								exclusive 
								onChange={handleSelectedAccessibilitie}
								id="filtertb"
								className={classes.tbgroup}
							>
								<label
									className={classes.filterlabel}
									data-shrink="true"
									for="filtertb"
									id="filtertb-label"
								>
									Filter by
								</label>
								<ToggleButton
									value="selectedaccessible"
									aria-pressed={true}
									size="small"
									color="secondary"
									aria-label="Only fully accessible courses"
									selected={selectedaccessible}
								>
									<AccessibilityNewIcon />
									Fully accessible
								</ToggleButton>
								</ToggleButtonGroup>

								<ToggleButtonGroup 
									orientation="horizontal" 
									exclusive 
									onChange={handleSelected}
									id="filtertb"
									className={classes.tbgroup}
								>
								<ToggleButton
									value="online"
									aria-pressed={false}
									selected={selectedonline}
									size="small"
									color="secondary"
									aria-label="Only 100% online courses"
								
								>
									<CastForEducationIcon />
									100% online
								</ToggleButton>
							</ToggleButtonGroup >
							<RantingCourse />
						</React.Fragment>
					)}
					{showMinFilter ? (
						<IconButton
							//variant="contained"
							color="secondary"
							className={classes.button}
							onClick={() => {
								setOpenFilter(true);
							}}
						>
							<FilterListIcon />
						</IconButton>
					) : (
						<Button
							//variant="contained"
							color="secondary"
							className={classes.button}
							startIcon={<FilterListIcon />}
							onClick={() => {
								setOpenFilter(true);
							}}
						>
							{showDetailedFilter ? 'More filters' : 'Filter'}
						</Button>
					)}
				</div>
			</Paper>

			<SimpleDialog
				key={'sorter'}
				title={'Sorting'}
				open={openSorter}
				handleClose={() => {
					setOpenSorter(false);
				}}
				popup={true}
				enabledark={false}
				controls={
					<React.Fragment>
						<Button color="primary" onClick={() => setOpenSorter(false)}>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="outlined"
							onClick={() => setOpenSorter(false)}
						>
							Confirm
						</Button>
					</React.Fragment>
				}
			>
				<SortCourse />
			</SimpleDialog>


            

         
			
         <FullDialog
				key={'filter'}
				title={'Filters'}
				open={openFilter}
				handleClose={() => {
					setOpenFilter(false);
				}}
				enabledark={false}
				controls={
					<React.Fragment>
						<Button
							color="primary"
							onClick={() => {
								setArea([]);
								setDuration([5, 200]);
								setAudience([]);
								//setSkills([]);
								setInstructors([]);
								setLanguages(prev=>({
									prev,
									english:false,
									spanish:false,
									portugues:false,
									turkish:false,
									polish:false,
								}))
								setAccessibility(INITIAL_ACCESSIBILITY);
								setRanting(3);
							}}
						>
							Clear all filters
						</Button>
						<Button
							color="primary"
							variant="outlined"
							onClick={() => {
								props.getParamsofSearch(accessibility)
								props.getParamsLanguage(languages)
								props.getParamsAudiences(audiences)
								props.getParamsTutors(instructors)
								setOpenFilter(false);
							}}
						>
							Apply filters
						</Button>
					</React.Fragment>
				}
			>
            <RantingCourse
               feedback={true}
               label={'Show only courses equal or greater than '}
				/>
				<FormControlLabel
					className={classes.formControl}
					control={
						<Switch
							checked={switchOnline}
							onChange={()=>{
						
								setswitchOnline(!switchOnline)
								handleChangeOnline()
							}}
							name="checkedOnline"
							color="primary"
							inputProps={{ 'aria-label': 'Show only 100% online courses' }}
						/>
					}
					label="Show only 100% online courses"
				/>
				<FormControlLabel
					className={classes.formControl}
					control={
						<Switch
							checked={accessibility.full}
							onChange={() => {
								setAccessibility(prev => {
									return {
										...prev,
										partial: !prev.full ? false : prev.partial,
										a11yCog: !prev.full ? 'full' : prev.a11yCog,
										a11yHear: !prev.full ? 'full' : prev.a11yHear,
										a11yVis: !prev.full ? 'full' : prev.a11yVis,
										full: !prev.full
									};
								});
							}}
							name="checkedA11yFull"
							color="primary"
							inputProps={{
								'aria-label': 'Show only fully accessible courses'
							}}
						/>
					}
					label="Show only fully accessible courses"
				/>
				<FormControlLabel
					className={classes.formControl}
					control={
						<Switch
							checked={accessibility.partial}
							onChange={() =>
								setAccessibility(prev => {
									console.log({
										...prev,
										full: !prev.partial ? false : prev.full,
										a11yCog: !prev.partial ? 'partial' : prev.a11yCog,
										a11yHear: !prev.partial ? 'partial' : prev.a11yHear,
										a11yVis: !prev.partial ? 'partial' : prev.a11yVis,
										partial: !prev.partial
									});
									return {
										...prev,
										full: !prev.partial ? false : prev.full,
										a11yCog: !prev.partial ? 'partial' : prev.a11yCog,
										a11yHear: !prev.partial ? 'partial' : prev.a11yHear,
										a11yVis: !prev.partial ? 'partial' : prev.a11yVis,
										partial: !prev.partial
									};
								})
							}
							name="checkedA11yFull"
							color="primary"
							inputProps={{
								'aria-label': 'Show only partially and fully accessible courses'
							}}
						/>
					}
					label="Show only partially and fully accessible courses"
				/>
				
            <Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="accessibility-content"
						id="accessibility-header"
					>
						<Typography
							component={'h3'}
							id="accessibility-label"
							className={classes.heading}
						>
							Accessibility
						</Typography>
					</AccordionSummary>
					
					<AccordionDetails
						className={classes.accordiondetails}
						id="accessibility-content"
					>
						<Button
							color="secondary"
							size="small"
							startIcon={<ClearIcon />}
							className={classes.accordionbtn}
							onClick={() => setAccessibility(INITIAL_ACCESSIBILITY)}
						>
							Clear filter
						</Button>
						<FormControl className={classes.formControl}>
							<FormLabel component="legend">Cognitive Accessibility</FormLabel>
							<RadioGroup
								aria-label="Cognitive Accessibility"
								name="a11yCog"
								value={accessibility.a11yCog}
								onChange={handleAccessibilityChange}
							>
								<FormControlLabel
									value="full"
									control={<Radio />}
									label="Show only fully Cognitive accessible courses"
								/>
								<FormControlLabel
									value="partial"
									control={<Radio />}
									label="Show partially and fully Cognitive accessible courses"
								/>
								<FormControlLabel
									value="no-filter"
									control={<Radio />}
									label="Show all courses, even Cognitive inaccessible courses"
								/>
							</RadioGroup>
						</FormControl>
						<FormControl className={classes.formControl}>
							<FormLabel component="legend">Hearing Accessibility</FormLabel>
							<RadioGroup
								aria-label="Hearing Accessibility"
								name="a11yHear"
								value={accessibility.a11yHear}
								onChange={handleAccessibilityChange}
							>
								<FormControlLabel
									value="full"
									control={<Radio />}
									label="Show onlly fully Hearing accessible courses"
								/>
								<FormControlLabel
									value="partial"
									control={<Radio />}
									label="Show partially and fully Hearing accessible courses"
								/>
								<FormControlLabel
									value="no-filter"
									control={<Radio />}
									label="Show all courses, even Hearing inaccessible courses"
								/>
							</RadioGroup>
						</FormControl>
						<FormControl className={classes.formControl}>
							<FormLabel component="legend">Visually Accessibility</FormLabel>
							<RadioGroup
								aria-label="Visually Accessibility"
								name="a11yVis"
								value={accessibility.a11yVis}
								onChange={handleAccessibilityChange}
							>
								<FormControlLabel
									value="full"
									control={<Radio />}
									label="Show only fully Visually accessible courses"
								/>
								<FormControlLabel
									value="partial"
									control={<Radio />}
									label="Show partially and fully Visually accessible courses"
								/>
								<FormControlLabel
									value="no-filter"
									control={<Radio />}
									label="Show all courses, even Visual inaccessible courses"
								/>
							</RadioGroup>
						</FormControl>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="lang-content"
						id="lang-header"
					>
						<Typography component={'h3'} className={classes.heading}>
							Course Language
						</Typography>
					</AccordionSummary>
					<AccordionDetails
						className={classes.accordiondetails}
						id="lang-content"
					>
						<Button
							color="secondary"
							size="small"
							startIcon={<ClearIcon />}
							className={classes.accordionbtn}
							onClick={() => setLanguages(prev=>({
								prev,
								english:false,
								spanish:false,
								portugues:false,
								turkish:false,
								polish:false,
							}))}
						>
							Clear filter
						</Button>
						<FormControl component="fieldset" className={classes.formControl}>
							<FormHelperText>Select one or more languages</FormHelperText>
							<FormGroup aria-labelledby="lang-header">
								<FormControlLabel
									control={
										<Checkbox
											checked={languages.portugues}
											onChange={event => setLanguages(prev=>({...prev, portugues: event.target.checked}))}
											name="pt"
										/>
									}
									label="Portugues"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={languages.english}
											onChange={event => setLanguages(prev=>({...prev, english: event.target.checked}))}
											name="en"
										/>
									}
									label="English"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={languages.spanish}
											onChange={event => setLanguages(prev=>({...prev, spanish: event.target.checked}))}
											name="es"
										/>
									}
									label="Spanish"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={languages.turkish}
											onChange={event => setLanguages(prev=>({...prev, turkish: event.target.checked}))}
											name="es"
										/>
									}
									label="Turkish"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={languages.polish}
											onChange={event => setLanguages(prev=>({...prev, polish: event.target.checked}))}
											name="es"
										/>
									}
									label="Polish"
								/>
							</FormGroup>
						</FormControl>
					</AccordionDetails>
				</Accordion>
 
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="duration-content"
						id="duration-header"
					>
						<Typography
							component={'h3'}
							id="duration-label"
							className={classes.heading}
						>
							Course Duration
						</Typography>
					</AccordionSummary>
					<AccordionDetails
						className={classes.accordiondetails}
						id="duration-content"
					>
						<Button
							color="secondary"
							size="small"
							startIcon={<ClearIcon />}
							className={classes.accordionbtn}
							onClick={() => setDuration([5,200])}
						>
							Reset Duration
						</Button>
						<DurationSlider
							min={duration[0]}
							max={duration[1]}
							getParamsDuration={props.getParamsDuration}
						/>
					</AccordionDetails>
				</Accordion>
     
				{/* <Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="audience-content"
						id="audience-header"
					>
						<Typography
							component={'h3'}
							id="audience-label"
							className={classes.heading}
						>
							Course's Target Audience
						</Typography>
					</AccordionSummary>
					<AccordionDetails
						className={classes.accordiondetails}
						id="audience-content"
					>
						<FormControl className={classes.formControl}>
							<Button
								color="secondary"
								size="small"
								startIcon={<ClearIcon />}
								className={classes.accordionbtn}
								onClick={() => setAudiences({
									Graduatestudents:false, 
									Informalstudents:false, 
									TeachersandProfessors:false,
									Preschoolkids:false, 
									Postgraduatestudent:false,  
									Pregradestudent:false,  
									HighSchoolStudents:false,  
									MiddleSchoolStudents:false,  
									ElementarySchoolStudents:false,
							})}
							>
								Clear filter
							</Button>
							<FormHelperText>Select one or more audience</FormHelperText>
							<FormGroup aria-labelledby="audience-label">
								{AUDIENCE.map((audience,indexAudience) => (
									<FormControlLabel
										control={
											<Checkbox
												checked={Object.values(audiences)[indexAudience]}
												onChange={event => setAudiences(prev=>({
													...prev, [Object.keys(audiences)[indexAudience]]:event.target.checked
												}))}
												audience={audience}
											/>
										}
										label={audience}
									/>
								))}
							</FormGroup>
						</FormControl>
					</AccordionDetails>
				</Accordion>	 */}

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="name-content"
						id="name-header"
					>
						<Typography
							component={'h3'}
							id="name-label"
							className={classes.heading}
						>
							Course's Instructor
						</Typography>
					</AccordionSummary>
					<AccordionDetails
						className={classes.accordiondetails}
						id="name-content"
					>
						<FormControl className={classes.formControl}>
							<Button
								color="secondary"
								size="small"
								startIcon={<ClearIcon />}
								className={classes.accordionbtn}
								onClick={() => getTutors()}
							>
								Clear filter
							</Button>
							<FormHelperText>Select one or more names</FormHelperText>
							<FormGroup aria-labelledby="audience-label">
							{instructorsLabels.map((audience,indexAudience) => (
									<FormControlLabel
										control={
											<Checkbox
												 checked={Object.values(instructors)[indexAudience]}
												 onChange={event => setInstructors(prev=>({
													...prev, [Object.keys(instructors)[indexAudience]]:event.target.checked
												}))} 
												audience={audience}
											/>
										}
										label={audience}
									/>
								))}
							</FormGroup>
						</FormControl>
					</AccordionDetails>
				</Accordion>				

			</FullDialog>
		</React.Fragment>
	);

	function SortCourse() {
		return (
			<FormControl className={classes.select}>
				<TextField id="modality" label="Sort by" select value={1}>
					<MenuItem value="1">Alphabetic</MenuItem>
					<MenuItem value="2">Most Recent</MenuItem>
					<MenuItem value="3">Most Relevant</MenuItem>
				</TextField>
			</FormControl>
		);
	}
}