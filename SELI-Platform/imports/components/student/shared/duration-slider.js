import {
	Grid,
	Tooltip,
	Input,
	Slider,
	FormControl,
	InputLabel,
	FormHelperText,
	TextField
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
	input: {
		minWidth: 50,
		width: 50,
		maxWidth: 50
	}
}));

const AirbnbSlider = withStyles({
	root: {
		color: '#3a8589',
		height: 3,
		padding: '13px 0'
	},
	thumb: {
		height: 27,
		width: 27,
		backgroundColor: '#fff',
		border: '1px solid currentColor',
		marginTop: -12,
		marginLeft: -13,
		boxShadow: '#ebebeb 0 2px 2px',
		'&:focus, &:hover, &$active': {
			boxShadow: '#ccc 0 2px 3px 1px'
		},
		'& .bar': {
			// display: inline-block !important;
			height: 9,
			width: 1,
			backgroundColor: 'currentColor',
			marginLeft: 1,
			marginRight: 1
		}
	},
	active: {},
	track: {
		height: 3
	},
	rail: {
		color: '#d8d8d8',
		opacity: 1,
		height: 3
	}
})(Slider);

function AirbnbThumbComponent(props) {
	return (
		<span {...props}>
			<span className="bar" />
			<span className="bar" />
			<span className="bar" />
		</span>
	);
}

ValueLabelComponent.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.number.isRequired
};
function ValueLabelComponent(props) {
	const { children, open, value } = props;

	return (
		<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	);
}

DurationSlider.propTypes = {
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired
};
export default function DurationSlider({ min, max }) {
	const classes = useStyles();

	const [duration, setDuration] = React.useState([min, max]);

	const handleBlur = () => {
		if (duration < 0) {
			setDuration(prev => {
				return [0, prev[1]];
			});
		} else if (duration > 100) {
			setDuration(prev => {
				return [prev[0], 100];
			});
		}
	};

	function valueLabelFormat(value) {
		return `${value}:00:00`;
	}

	function limit(val, max) {
		if (val.length === 1 && val[0] > max[0]) {
			val = '0' + val;
		}

		if (val.length === 2) {
			if (Number(val) === 0) {
				val = '00';

				//this can happen when user paste number
			} else if (val > max) {
				val = max;
			}
		}

		return val;
	}

	function time(val) {
		let size = val.length;
		let hours = '';
		let minutes = '';
		let seconds = '';

		if (size <= 2) {
			hours = val;
		} else if (size <= 4) {
			hours = val.substring(0, 2);
			minutes = limit(val.substring(2, 4), '59');
			// } else if (size <= 6) {
			// 	hours = val.substring(0, 2);
			// 	minutes = limit(val.substring(2, 4), "59");
			// 	seconds = limit(val.substring(4, 6), "59");
		} else {
			hours = val.substring(0, size - 4);
			minutes = limit(val.substring(size - 4, size - 2), '59');
			seconds = limit(val.substring(size - 2, size), '59');
		}
		return (
			hours +
			(minutes.length ? ':' + minutes : '') +
			(seconds.length ? ':' + seconds : '')
		);
	}

	const isAllowed = ({ formattedValue }) => {
		console.log(formattedValue);
		if (formattedValue === '') return true;
		let time = formattedValue.split(':');
		console.log(time);
		// if (time.length === 0) return true;
		//if (time.length === 1) return Number(time[0]) >= min;
		if (time.length > 1) {
			if (Number(time[0]) < min) return false;

			if (time.length === 3) if (Number(time[0]) > max) return false;
		}
		return true;
	};

	return (
		<React.Fragment>
			<Grid container direction="column">
				<Grid item>
					<AirbnbSlider
						ThumbComponent={AirbnbThumbComponent}
						aria-labelledby="duration-label"
						// getAriaLabel={index =>
						// 	index === 5
						// 		? "Minimum duration"
						// 		: index === 100
						// 		? "Maximum duration"
						// 		: index
						// }
						getAriaValueText={valueLabelFormat}
						valueLabelFormat={valueLabelFormat}
						ValueLabelComponent={ValueLabelComponent}
						defaultValue={duration}
						valueLabelDisplay="on"
						color="primary"
						step={1}
						min={min}
						max={max}
						marks
						onChange={(event, newValue) => {
							setDuration(newValue);
						}}
					/>
				</Grid>
				<Grid item>
					<NumberFormat
						id="duration-input-min"
						format={time}
						value={duration[0] + '0000'}
						//onValueChange={() => {}}
						isAllowed={isAllowed}
						customInput={TextField}
						label={'Minimum duration'}
						helperText={
							'Minimum duration must be greater then ' +
							time(min + '5959') +
							' and smaller then ' +
							time(duration[1] + '0000')
						}
						//	size="small"
					/>
				</Grid>
				<Grid item>
					<NumberFormat
						id="duration-input-max"
						format={time}
						value={duration[1] + '0000'}
						//onValueChange={() => {}}
						isAllowed={isAllowed}
						customInput={TextField}
						label={'Maximum duration'}
						helperText={
							'Maximum duration must be greater then ' +
							time(duration[0] + '5959') +
							' and smaller then ' +
							time(max + '0000')
						}
						//	size="small"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
