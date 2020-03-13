
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import InfoIcon from '@material-ui/icons/Info';
import Help from './Help';
import Decision from './DecisionHelpStepper';


const useStyles = makeStyles(theme => ({
	iconButton:{
		verticalAlign:'baseline',
		padding: 0,
	},
	acessibValid:{
		color: '#00897b'
	},
	accessibError:{
		color: '#e53935'
	},

}));

/*
	error: boolan --> if there's error on accessibility validation
	id: string --> id of form component
	tip: string --> small help presented inline
	step: [hp5Helper || textHelper|| imagePurposeHelper_info|| imagePurposeHelper_deco|| imagePurposeHelper_txt|| imagePurposeHelper_cplx|| imageAltHelper_info|| imageAltHelper_txt|| imageAltHelper ] --> help with i,age examples presented as popover
	guide: [imgPurposeCond]
 */
export default function AccessibilityHelp(props) {
	const classes = useStyles();
	console.log("Accesibility HELP ERROR",props.error)

	return(
		<React.Fragment>
			<FormHelperText role='note' id={props.id+'-helper-text'} error={props.error} component='span'>
				<div className="accessibility-form-helper-text">
					{
						!props.error ?
							<AccessibilityIcon
								aria-label={props.error ? 'Accessibility fault' : 'Passed accessibility validation'}
								className={props.error ? 'accessibError' : 'accessibValid'}
							/>
						:
						undefined
					}
					<InfoIcon aria-label='Accessibilit tip'/>
					
					<span className={props.error? 'accessibError' : 'accessibValid'}>
						{props.tip}
					</span>
				</div>
				<br/>
				<div className="accessibility-form-helper-row">
					{
						props.step !== undefined ?
							<Help helper={props.step}
								aria-label='Accessibilit tip'
								text={props.stepLabel}
								color='primary'
								buttonLabel={props.language.feedback_a11y_helpStep_button}
								language={props.language}
							/>
						:
						undefined
					}
					{
						props.guide !== undefined ?
							<Decision
								caller={props.name}
								buttonLabel={props.language.feedback_a11y_helpGuide_button}
								useStyle={classes.iconButton}
								ariaLabel='Accessibilit help'
								color='secondary'
								language={props.language}
							/>
						:
						undefined
					}
				</div>
			</FormHelperText>
		</React.Fragment>
	);
}
