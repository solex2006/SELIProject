import React, {useState, useCallback, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import EditorA11Y from '../tools/a11yEditor';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import ToggleButton from '@material-ui/lab/ToggleButton';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';

//////////////////////////////////////////////////////////////////////////////////////////
// props {                                                                   			//
// 	handleOnChange (fn) [optional],                                                     //
// 	handleerror (fn) [optional],                                                        //
// 	handlePosition (fn)																	//
// 	error (bool) [optional], 															//
// 	value (string)                                                           			//
// 	name (string): name attr 															//
// 	label (string) [optional]: label for component                                      //
// 	ariaLabelledBy (string) [optional]: id of alternative label component               //
// 	ariaDescribedBy (string) [optional]: id of component with description of this field //
// 	editorData (string) [optional]: name to retrieve data from localStorage             //
//  placeholder (string) 	[optional]: placeholder for field                           //
// 	required (boolean) [optional]: if its a mandatory field 							//
// 	tip (string  [optional]or React.Fragment)											//
// 	position ([default] [optional]bottom | top)											//
//////////////////////////////////////////////////////////////////////////////////////////
export default function a11yLongDescription(props){
	return(
		<React.Fragment>
			<Grid  item id={'long-description-input-container'} role='grid'>
				<EditorA11Y id={'long-description-input'}
					name={props.name}
					label={props.label}
					aria-describedby='long-description-help-container'
					placeholder={props.placeholder}
					value={props.value} 
					onChange={props.handleOnChange}
					error={props.error}
					required={props.required}
					handleerror={props.handleerror}
					longDescription_a11y_delopment_purpose={props.language.longDescription_a11y_delopment_purpose}
				/>
				<AccessibilityHelp 
					id={'long-description-help-container'} 
					name={'longDescriptionHelpContainer'} 
					error={props.error} 
					tip={props.tip} 
					step={props.step}
					stepLabel={props.stepLabel}
					language={props.language}
				/>
			</Grid>
			{/* <Grid item id={'long-description-position-container'} role='grid'>
				<span id={'long-description-position-label'}>{props.textPositionLabel} </span>
				<ToggleButtonGroup id={'long-description-position'}
					name={'longDescriptionPosition'+props.name}
					aria-labelledby={'long-description-position-label'}
					value={props.position} 
					exclusive
					size='small' 
				>
					<ToggleButton 
						key={1} 
						value='bottom' 
						onClick={() => props.handlePosition('bottom')}>
						<Tooltip title={props.language.bottom_btn}><HorizontalSplitIcon className='toggle-button-icon'/>
						</Tooltip>
					</ToggleButton>
					<ToggleButton 
						key={2} 
						value='top' 
						onClick={() => props.handlePosition('top')}>
						<Tooltip title={props.language.top_btn}><HorizontalSplitIcon style={{transform: 'rotate(180deg)'}} className='toggle-button-icon'/>
						</Tooltip>
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid> */}
		</React.Fragment>
	);
}