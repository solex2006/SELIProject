import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import EditorA11Y from '../tools/a11yEditor';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import TextField from '@material-ui/core/TextField';
//////////////////////////////////////////////////////////////////////////////////////////
// props {                                                                   			//
// 	handleOnChange (fn) [optional],                                                     //
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
//////////////////////////////////////////////////////////////////////////////////////////
export default function a11yShortDescription(props){
	return(
		<React.Fragment>
			<Grid  item id={'short-description-input-container'} role='grid'>
				<TextField id={'short-description-input'}
					name={props.name}
					label={props.label}
					aria-describedby='short-description-help-container'
					placeholder={props.placeholder}
					maxLength='100'
					margin='normal'
					multiline
					fullWidth
					required={props.required}
					rows='2'
					wrap='hard'
					variant='outlined'    
					value={props.value} 
					onChange={(event) => {props.handleOnChange(event);}}
					error={props.error}
				/>
				<AccessibilityHelp 
					id={'short-description-help-container'} 
					name={'shortDescriptionHelpContainer'} 
					error={props.error} 
					tip={props.tip} 
					step={props.step}
					stepLabel={props.stepLabel}
					language={props.language}
				/>
			</Grid>
		</React.Fragment>
	);
}