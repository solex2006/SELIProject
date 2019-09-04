import React, {useState} from 'react';
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

	const [position, setPosition] = React.useState(props.position);
	return(
		<React.Fragment>
			<Grid  item id={'long-description-input-container-'+props.name} role='grid'>
				<EditorA11Y id={'long-description-input'+props.name}
					name={'longDescription'+props.name}
					label={props.label}
					aria-describedby={props.ariaDescribedBy}
					placeholder={props.placeholder}
					value={props.value} 
					onChange={props.handleOnChange}
					error={props.error}
					required={props.required}
					handleerror={props.handleerror}
				/>
				<AccessibilityHelp 
					id={'long-description-help-container-'+props.name} 
					name={'longDescriptionHelpContainer'+props.name} 
					error={props.error} 
					tip={props.tip} 
					step={props.step}
					stepLabel={props.stepLabel}
				/>
			</Grid>
			<Grid item id={'long-description-position-container-'+props.name} role='grid'>
				<span id={'long-description-position-label-'+props.name}>
				Text position relative to audio player </span>
				<ToggleButtonGroup id={'long-description-position-'+props.name}
					name={'longDescriptionPosition'+props.name}
					aria-labelledby={'long-description-position-label-'+props.name}
					value={props.position} 
					exclusive
					size='small' 
				>
					<ToggleButton 
						key={1} 
						value='bottom' 
						onClick={() => props.handlePosition('bottom')}>
						<Tooltip title='Bottom'><HorizontalSplitIcon className='toggle-button-icon'/>
						</Tooltip>
					</ToggleButton>
					<ToggleButton 
						key={2} 
						value='top' 
						onClick={() => props.handlePosition('top')}>
						<Tooltip title='Top'><HorizontalSplitIcon style={{transform: 'rotate(180deg)'}} className='toggle-button-icon'/>
						</Tooltip>
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
		</React.Fragment>
	);
}