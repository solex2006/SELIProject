import React, {useState, useEffect, useCallback} from 'react';
//layout
import Grid from '@material-ui/core/Grid';
//a11y componentes

import AccessibilityHelp from '../tools/AccessibilityHelp';
import A11YLongDescription from './a11yLongDescription';
import A11YShortDescription from './a11yShortDescription';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import AccessibilityFileUpload from '../files/AccessibilityFileUpload';
import Link from '@material-ui/core/Link';
//a11y


import FileUpload from '../files/FileUpload'
import VideoPreview from '../files/previews/VideoPreview';


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
						label={props.language.shortDescription_a11y_label}
						placeholder="Content identification"
						required={true}
						tip={shortDescriptionTip}
						language={props.language}
					/>
				</Grid>
				<Grid  item id='long-description-container' role='grid'>
					<A11YLongDescription
					handleOnChange={React.useCallback(handleInputOnChange)}
					error={dataField.longDescriptionError}
					value={dataField.longDescription}
					name="longDescription"
					label={props.language.longDescription_a11y_label_audio}
					placeholder={props.language.longDescription_a11y_placeholder_audio}
					required={true}
					tip={longDescriptionTip}
					position={dataField.longDescriptionPosition}
					handlePosition={React.useCallback(handleLongDescriptionPosition)}
					textPositionLabel={props.language.longDescription_a11y_audio_label}
					language={props.language}
				/>
				</Grid>
			</Grid>
		</section>
		</React.Fragment>
	);
}


export const  VideoSignalA11Y=(props)=> {
	const {
		handleRadioButtonOnChange,
		dataField,
	} = props.data;
	console.log("Propsdata----",props.data)
	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newVideoSignal, setnewVideoSignal] = useState(false);

	const handleRadioButtonOnChange1 =handleRadioButtonOnChange
	
	
	const  getFileInformationsignal=(file)=>{
		//console.log("File to upload", file)
		dataField.fileVideoSignal[0]=file
		setshowPreviewSignal(true)
		setnewVideoSignal(false)
	  }
	const  noVideofile=()=>{
		dataField.fileVideoSignal[0]=undefined
		setshowPreviewSignal(false)
		return undefined
	}

	const unPickFileSignal=()=>{
		dataField.fileVideoSignal[0]=undefined
		setnewVideoSignal(true)
	
		
	  }

	return(
		<Grid item id='signLang-container' role='grid'>
			<FormControl component='fieldset' >
				<FormLabel component='legend' id='signLang-label'>{props.language.signLanguage_a11y_has}</FormLabel>
				<RadioGroup
					id='signLang-radiogroup'
					aria-describedby='signLang-exp'
					aria-labelledby='signLang-radiogroup-label'
					name='signLanguage'
					row
					value={dataField.signLanguage}
					onChange={handleRadioButtonOnChange1}
					aria-describedby='signLang-exp'
					row>
					<FormControlLabel
						name='signLanguage'
						id='signLang-yes'
						label={props.language.yes}
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						name='signLanguage'
						id='signLang-no'
						label={props.language.no}
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='signLang-radiogroup' error={dataField.signLanguageError}  />
			</FormControl>
			
			
			
			 {//languages signal part

				(dataField.signLanguage=== "yes" || newVideoSignal===true )?
				<div>
					{dataField.fileVideoSignal[0]===undefined?
					<div className="uploadsignals">
						<FileUpload
						type="video"
						user={Meteor.userId()}
						accept={'video/*'}
						label={props.language.byUploadVideo}
						getFileInformation={getFileInformationsignal}
						/>
					</div>
					:
					<div>
						{
							showPreviewSignal===true?
							<div>
								<div>
								<VideoPreview
									file={dataField.fileVideoSignal[0]}
									unPickFile={unPickFileSignal}
									language={props.language}
								/>
								</div>
							</div>
							:
							<div>
								<div>
								<VideoPreview
									file={dataField.fileVideoSignal[0]}
									unPickFile={unPickFileSignal}
									language={props.language}
								/>
								</div>
							</div>
						}
					</div>
					}
				</div>	
				:
				noVideofile
			}		
					
			
		</Grid>
	);
}

export const useAudioDataField = (props) =>{
	const [dataField, setDataField] = React.useState({
		shortDescription: '',
		longDescription: '',
		longDescriptionPosition: 'bottom',
		signLanguage: 'no',
		seizures: 'no',
		captionsEmbebed: 'no',
		audioDescription: 'no',
		audioDescriptionRequired:'yes',
		hasAudioDescriptionFile: false,
		hasTranscriptionFile: false,
		longDescription:'',
		shortDescription:'',
		fileTranscription: [],
		fileAudioDescription: [],
		fileVideoSignal:[],
		hasVideoSignalFile: false,
		//error states
		shortDescriptionError : true,
		longDescriptionError : true,
		seizuresError : true,
		captionsEmbebedError : true,
		audioDescriptionError : true,
		signLanguageError : true,
	});

	const a11yInitial = [
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
	];
	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	useEffect(() => {
		if (props.item.dataField && props.item.isA11Y) {
			setDataField(props.item.dataField);
			setIsA11Y(props.item.isA11Y);
		}
	}, [])

	//feedback
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(props.shortDescription_a11y_tip);   
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(props.longDescription_a11y_tip);
	

	const [seizuresTip, setSeizuresTip] = React.useState(
		<React.Fragment>{`${props.video_a11y_aux_text_002} `}<Link href={'https://www.trace.umd.edu/peat'}alt='Test your content in PEAT'>{props.video_a11y_aux_text_003}</Link>{` ${props.video_a11y_aux_text_004}`}
		</React.Fragment>
	);
	
	
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


	function handleRadioButtonOnChange ({ target: { name, value } }){
		let data = {
			[name]: value,
		};

		console.log("en la funcion handleRadioButtonOnChange", "name" ,name, "value",value)

		if(name === 'audioDescription')
		{
			let errValue = value === 'yes' ? false : ((dataField.audioDescriptionRequired === 'yes') && !dataField.hasAudioDescriptionFile);

			data = {...data,
				audioDescriptionRequired: value === 'yes' ? value : dataField.audioDescriptionRequired,
				audioDescriptionError:errValue,
			};

			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
			setIsA11Y(arr);
		}
		else if (name === 'audioDescriptionRequired')
		{
			let errValue = dataField.audioDescription === 'yes' ? false : ((value === 'yes') && !dataField.hasAudioDescriptionFile);
			data = {...data,
				audioDescriptionError: errValue,
			};

			let arr = [...isA11Y];
			arr.find(a => a.name == 'audioDescription').is_a11y = !errValue;
			setIsA11Y(arr);
		}
		else
		{
			//captionsEmbebed - signLanguage - seizures
			let errField = name + 'Error';
			let errValue = value === 'no' ? true : false;

			data = {...data,
				[errField]: errValue,
			};

			let arr = [...isA11Y];
		//	arr.find(a => a.name == name).is_a11y = !errValue;
		//	setIsA11Y(arr);
		}

		setDataField( dataField => ({ ...dataField,
			...data
		}));
	}

	return  {
		handleRadioButtonOnChange:handleRadioButtonOnChange,
		handleInputOnChange: handleInputOnChange, 
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		isA11Y,
	};
};