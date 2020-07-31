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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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
import { Rating, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import SimpleDialog from './shared/dialog';
import FullDialog from './shared/dialog_fullwidth';
import DurationSlider from './shared/duration-slider';

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

export default function SearchToolBar() {
	const [query, setQuery] = React.useState('');
	const [openFilter, setOpenFilter] = React.useState(false);
	const [openSorter, setOpenSorter] = React.useState(false);
	const [area, setArea] = React.useState([]);
	const [duration, setDuration] = React.useState([5, 200]);
	const [audience, setAudience] = React.useState([]);
	const [skills, setSkills] = React.useState([]);
	const [instructors, setInstructors] = React.useState([]);
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

	const NAMES = [
		'Oliver Hansen',
		'Van Henry',
		'April Tucker',
		'Ralph Hubbard',
		'Omar Alexander',
		'Carlos Abbott',
		'Miriam Wagner',
		'Bradley Wilkerson',
		'Virginia Andrews',
		'Kelly Snyder'
	];
	const SKILLS = ['Version Control', 'Full Stack', 'Data Base'];
	const AUDIENCE = ['Graduated Students', 'Professors', 'Kids'];
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
	return (
		<React.Fragment>
			<Paper component="form" className={classes.searchbar} elevation={0}>
				<div className={classes.searchcontainer}>
					<InputBase
						className={classes.input}
						placeholder="Search SELI Courses"
						inputProps={{ 'aria-label': 'search seli courses' }}
						// onFocus={() => setFocus(true)}
						// onBlur={() => setFocus(false)}
						value={query}
						onChange={({ target }) => {
							setQuery(target.value);
						}}
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
					>
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
							<StyledToggleButtonGroup
								size="small"
								id="filtertb"
								className={classes.tbgroup}
								//value={formats}
								//onChange={handleFormat}
								aria-label="Filtering"
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
									aria-pressed={true}
									selected={true}
									size="small"
									color="secondary"
									aria-label="Only fully accessible courses"
								>
									<AccessibilityNewIcon />
									Fully accessible
								</ToggleButton>
								<ToggleButton
									aria-pressed={false}
									selected={false}
									size="small"
									color="secondary"
									aria-label="Only 100% online courses"
								>
									<CastForEducationIcon />
									100% online
								</ToggleButton>
							</StyledToggleButtonGroup>
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
								setSkills([]);
								setInstructors([]);
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
								setOpenFilter(false);
							}}
						>
							Appply filters
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
							//checked={state.checkedB}
							//onChange={handleChange}
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