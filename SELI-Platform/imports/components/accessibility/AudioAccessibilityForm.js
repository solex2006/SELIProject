import React, {useState, useEffect, useCallback} from 'react';
//layout
import Grid from '@material-ui/core/Grid';
//a11y componentes
import EditorA11Y from '../tools/a11yEditor';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import A11YLongDescription from './a11yLongDescription';
import A11YShortDescription from './a11yShortDescription';


export default function AudioA11Y(props) {
	const  {
		handleInputOnChange, 
		handleLongDescriptionPosition, 
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
	} = props.data;

	return (
		<React.Fragment>
			<section id='audio-text-alternatives'>
			<Grid container spacing={1} direction='column' justify='flex-start'>
				<Grid item id='short-description-container' role='grid'>
					<A11YShortDescription 
						handleOnChange={React.useCallback(handleInputOnChange)}
						error={dataField.shortDescriptionError}
						value={dataField.shortDescription}
						name="shortDescription"
						label="Short Description"
						placeholder="Content identification"
						required={true}
						tip={shortDescriptionTip}
					/>
				</Grid>
				<Grid  item id='long-description-container' role='grid'>
					<A11YLongDescription
					handleOnChange={React.useCallback(handleInputOnChange)}
					error={dataField.longDescriptionError}
					value={dataField.longDescription}
					name="longDescription"
					label="Transcription"
					placeholder="Audio transcription"
					required={true}
					tip={longDescriptionTip}
					position={dataField.longDescriptionPosition}
					handlePosition={React.useCallback(handleLongDescriptionPosition)}
					textPositionLabel='Text position relative to audio player'
				/>
				</Grid>
			</Grid>
		</section>
		</React.Fragment>
	);
}

export const useAudioDataField = () =>{
	const [dataField, setDataField] = React.useState({
		shortDescription: '',
		longDescription: '',
		shortDescriptionError: true,
		longDescriptionError: true,
		longDescriptionPosition: 'bottom',
	});

	const a11yInitial = [
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
	];
	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	//feedback
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState('Provide descriptive identification of the content');   
	const [longDescriptionTip, setLongDescriptionTip] = React.useState('Creating a document that tells the same story and presents the same information as the prerecorded audio-only content. Includes all of the important dialogue and as well as descriptions of background sounds etc. that are part of the story.');
	
	function handleInputOnChange ({ target: { name, value } }){
		let errField = name + 'Error';
		let errValue = false;

		if(name === 'longDescription'){
			errValue = (value === '' && !dataField.hasTranscriptionFile);
		}
		
		if(name === 'shortDescription'){
			errValue = value === '';
		}

		setDataField(dataField => ({...dataField,
			[name]: value,
			[errField]: errValue,
		}));

		let arr = [...isA11Y];
		arr.find(a => a.name == name).is_a11y = !errValue;
		setIsA11Y(arr);
	}

	function handleLongDescriptionPosition(value){
		if( value === '')
			value = 'bottom';

		setDataField(dataField => ({...dataField,
			longDescriptionPosition : value,
		}));
	}

	return  {
		handleInputOnChange: handleInputOnChange, 
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		isA11Y,
	};
};