import React, {useState, useEffect, useCallback} from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// form componenets
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import FileUpload from '../files/FileUpload';
import Link from '@material-ui/core/Link';
//a11y
import AccessibilityHelp from '../tools/AccessibilityHelp';
import A11YProgressFeedback from './a11yProgressFeedback';
import A11YLongDescription from './a11yLongDescription';
import A11YShortDescription from './a11yShortDescription';
import EditorA11Y from '../tools/a11yEditor';

import { makeStyles } from  '@material-ui/core/styles';

export function VideoTextAltA11Y(props){
	const {
		handleInputOnChange,
		handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
	} = props.data;

	return(
		<section id='video-text-alternatives'>
			<Grid container spacing={1} direction='column' justify='flex-end'>
				<Grid item id='short-description-container' role='grid'>
					<A11YShortDescription
						handleOnChange={React.useCallback(handleInputOnChange)}
						error={dataField.shortDescriptionError}
						value={dataField.shortDescription}
						name="shortDescription"
						label="Short Description"
						//ariaLabelledBy
						//ariaDescribedBy
						//editorData
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
						placeholder="Video transcription"
						required={true}
						tip={
							<React.Fragment>
								{longDescriptionTip}
							</React.Fragment>
						}
						position={dataField.longDescriptionPosition}
						handlePosition={React.useCallback(handleLongDescriptionPosition)}
						textPositionLabel='Text position relative to video'
					/>
					<FileUpload size='small'
						parentId={props.parentId + 'transciption-accessibility-pdf-file'}
						accept=".pdf"
						label="Alternativaly, you can upload transcription as pdf file."
						uploadedTitle="Transciption (pdf)"
						icon="pdf-g.svg"
						collection={CourseFilesCollection}
						removeFunction='RemoveCourseFile'
						type='accessibility-pdf-trasncription'
						preview={false}
						dowload={false}
						open={true}
						delete={true}
						showIcon={true}
						accessibilitySettings={false}
						//showControlMessage={props.showControlMessage.bind(this)}
						// resetFile={resetTranscriptionFile.bind(this)}
						// getFileInformation={getTranscriptionFileInfo.bind(this)}
						// removeFileInformation={removeTranscriptionFile.bind(this)}
						// showAccesibilityForm={undefined}
					/>
				</Grid>
			</Grid>
		</section>
	);
}

export function VideoMediaAltA11Y(props){
	return(
		<Grid container spacing={1} direction='column' justify='flex-end'>
			<VideoMediaCaptionsAltA11Y data={props.data}/>
			<VideoMediaSignLanguageA11Y data={props.data}/>
			<VideoMediaAudioDescriptioA11Y data={props.data}/>
		</Grid>
	);
}

export function VideoMediaCaptionsAltA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		captionsTip,
	} = props.data;

	return(
		<Grid item id='captions-container' role='grid'>
			<FormControl component='fieldset'>
				<FormLabel component='legend' id='captions-radiogroup-label'>Did this content has captions embebed?</FormLabel>
				<RadioGroup
					id='captions-radiogroup'
					aria-labelledby='captions-radiogroup-label'
					aria-describedby='captions-exp'
					name='captionsEmbebed'
					row
					value={dataField.captionsEmbebed}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				>
					<FormControlLabel
						id='captions-yes'
						name='captionsEmbebed'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='captions-no'
						name='captionsEmbebed'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
						role='radio'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='captions-radiogroup' error={dataField.captionsEmbebedError} tip={captionsTip}/>
			</FormControl>
		</Grid>
	);
}

export function VideoMediaAudioDescriptioA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		disabled_necAudioDesc,
		disabled_uploadAudioDesc,
		audioDescriptionTip,
		audioDescriptionRequiredTip,
	} = props.data;

	return(
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-radiogroup-label'>Did this content has audiodescription embebed?</FormLabel>
					<RadioGroup
						id='audioDescr-radiogroup'
						aria-describedby='audioDescr-exp'
						aria-labelledby='audioDescr-radiogroup-label'
						name='audioDescription'
						row
						value={dataField.audioDescription}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					>
						<FormControlLabel
							id='audioDescr-yes'
							name='audioDescription'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
							role='radio'
						/>
						<FormControlLabel
							id='audioDescr-no'
							name='audioDescription'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.audioDescriptionError} tip={audioDescriptionTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl component='fieldset' disabled={disabled_necAudioDesc}>
					<FormLabel component='legend' id='audioDescr-necessary-label'>This content requires audiodescription?</FormLabel>
					<RadioGroup
						id='audioDescr-necessary-radiogroup'
						aria-describedby='audioDescr-necessary-exp'
						aria-labelledby='audioDescr-necessary-radiogroup-label'
						name='audioDescriptionRequired'
						value={dataField.audioDescriptionRequired}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					row>
						<FormControlLabel
							id='audioDescr-necessary-yes'
							name='audioDescriptionRequired'
							label='Yes'
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='audioDescr-necessary-no'
							name='audioDescriptionRequired'
							label='No'
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.audioDescriptionError} tip={audioDescriptionRequiredTip} />
				</FormControl>
			</Grid>
			<Grid item>
				<FileUpload
					disabled={disabled_uploadAudioDesc}
					size='small'
					parentId={props.parentId + 'audioDescription-accessibility-file'}
					accept="audio/*"
					label="Upload an audiodescription"
					uploadedTitle="Audio Description"
					icon="audio-g.svg"
					collection={CourseFilesCollection}
					removeFunction='RemoveCourseFile'
					type='accessibility-audio'
					preview={false}
					dowload={false}
					open={true}
					delete={true}
					showIcon={true}
					accessibilitySettings={false}
					//showControlMessage={props.showControlMessage.bind(this)}
					// resetFile={resetAudioDescriptionFile.bind(this)}
					// getFileInformation={getAudioDescriptionFileInfo.bind(this)}
					// removeFileInformation={removeAudioDescriptionFile.bind(this)}
					// showAccesibilityForm={undefined}
				/>
			</Grid>
		</Grid>
	);
}

export function VideoMediaSignLanguageA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		signLanguageTip,
	} = props.data;

	return(
		<Grid item id='signLang-container' role='grid'>
			<FormControl component='fieldset' >
				<FormLabel component='legend' id='signLang-label'>Did this content has sign language embebed?</FormLabel>
				<RadioGroup
					id='signLang-radiogroup'
					aria-describedby='signLang-exp'
					aria-labelledby='signLang-radiogroup-label'
					name='signLanguage'
					row
					value={dataField.signLanguage}
					onChange={handleRadioButtonOnChange}
					aria-describedby='signLang-exp'
					row>
					<FormControlLabel
						name='signLanguage'
						id='signLang-yes'
						label='Yes'
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						name='signLanguage'
						id='signLang-no'
						label='No'
						value='no'
						control={<Radio color='secondary' />}
						labelPlacement='end'
					/>
				</RadioGroup>
				<AccessibilityHelp idName='signLang-radiogroup' error={dataField.signLanguageError} tip={signLanguageTip} />
			</FormControl>
		</Grid>
	);
}

export function VideoOthersA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		seizuresTip,
	} = props.data;

	return(
		<FormControl component='fieldset' >
			<FormLabel component='legend' id='seizures-label'>Did this content could provoke photosensitive seizures?</FormLabel>
			<RadioGroup id='seizures-radiogroup'
				aria-describedby='seizures-exp'
				name='seizures'
				value={dataField.seizures}
				onChange={handleRadioButtonOnChange}
				row>
				<FormControlLabel
					name='seizures'
					id='seizures-yes'
					label='Yes'
					value='no'
					control={<Radio color='primary' />}
					labelPlacement='end'
				/>
				<FormControlLabel
					name='seizures'
					id='seizures-no'
					label='No'
					value='yes'
					control={<Radio color='secondary' />}
					labelPlacement='end'
				/>
			</RadioGroup>
			<AccessibilityHelp idName='seizures-radiogroup' error={dataField.seizuresError} tip={
				<React.Fragment>
					{seizuresTip}
				</React.Fragment>
			}
			/>
		</FormControl>
	);
}

export default function VideoA11Y(props){

	const {
		handleInputOnChange,
		handleRadioButtonOnChange,
		handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		seizuresTip,
		audioDescriptionTip,
		audioDescriptionRequiredTip,
		captionsTip,
		signLanguageTip,
		disabled_necAudioDesc,
		disabled_uploadAudioDesc,
		isA11Y,
	} = useDataField();
	/*
		function getTranscriptionFileInfo(fileInformation){
			// setState({
			//   transcriptionFile: fileInformation,
			//   showPreview: true,
			//   showGallery: false,
			//   hasTranscrionFile: true,
			// });
		}

		function resetTranscriptionFile(){
			// setState({
			// parentId: props.parentId + '-file',
			// });
		}

		function removeTranscriptionFile(){
			// setState({
			//   transcriptionFile: [],
			//   hasTranscrionFile: false,
			// });
		}

		function getAudioDescriptionFileInfo(fileInformation){
			// setState({
			//   audioDescriptionFile: fileInformation,
			//   showPreview: true,
			//   showGallery: false,
			//   hasAudioDescriptionFile: true,
			// });
		}

		function resetAudioDescriptionFile(){
			// setState({
			// parentId: props.parentId + '-file',
			// });
		}

		function removeAudioDescriptionFile(){
			// setState({
			//   audioDescriptionFile: [],
			//   hasAudioDescriptionFile: false,
			// });
		}
	*/
	return(
		<aside role='dialog'> {/* NOTE: this role indicates a modal. Change it if necessary*/}
			<header className='accessibility-header-row'>
				<h2 className='accessibility-subtitle'>Accessibility settings for video content</h2>
				<A11YProgressFeedback a11yFields={isA11Y}/>
			</header>

			<section id='video-text-alternatives'>
				<header>
					<h3>Text alternatives to video content</h3>
				</header>
				<VideoTextAltA11Y data={{
					handleInputOnChange,
					handleLongDescriptionPosition,
					dataField,
					shortDescriptionTip,
					longDescriptionTip,
				}}/>
			</section>
			<Divider component='li' />
			<section id='video-media-alternatives'>
				<header>
					<h3>Media alternatives to video content</h3>
				</header>
				<VideoMediaAltA11Y data={{
					handleRadioButtonOnChange,
					dataField,
					disabled_necAudioDesc,
					disabled_uploadAudioDesc,
					captionsTip,
					audioDescriptionTip,
					audioDescriptionRequiredTip,
					signLanguageTip
				}}/>
			</section>
			<Divider component='li' />
			<section id='video-other-settings'>
				<header>
					<h3>Other</h3>
				</header>
				<VideoOthersA11Y data={{
					handleRadioButtonOnChange,
					dataField,
					seizuresTip
				}}/>
			</section>
		</aside>
	);
}

export const useDataField = () => {
	const [dataField, setDataField] = React.useState({
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
		//error states
		shortDescriptionError : true,
		longDescriptionError : true,
		seizuresError : true,
		captionsEmbebedError : true,
		audioDescriptionError : true,
		signLanguageError : true,
	});

	//feedback variables
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState('Provide descriptive identification of the content');
	const [longDescriptionTip, setLongDescriptionTip] = React.useState('Create a document that provide a textual version of the audio and video content that can be accessed by anyone. They should include spoken dialogue, and should also describe important sound effects and visual details.');
	const [seizuresTip, setSeizuresTip] = React.useState(
		<React.Fragment>No content should flash more than 3 times per second, unless the flashes are in low contrast or have little red, otherwise they may cause epileptic seizures. <Link href={'https://www.trace.umd.edu/peat'}alt='Test your content in PEAT'>Test your content in PEAT</Link> to evaluate for epilepsy risk.
		</React.Fragment>
	);
	const [signLanguageTip, setSignLanguageTip] = React.useState('Embed a video of the sign language interpreter in the video stream.');
	const [captionsTip, setCaptionsTip] = React.useState('Captions include dialogue, and, unlike subtitles, also identify who is speaking and provide information about significant sound effects. Captions can be either open (that is always visible) or closed (can be turned on and off).');
	const [audioDescriptionTip, setAudioDescriptionTip] = React.useState('Audio description provides information about significant visual details that cannot be understood from the main soundtrack alone. During natural pauses in dialogue or critical sound elements, important actions, characters, scene changes, and on-screen text are described.');

	const [audioDescriptionRequiredTip, setAudioDescriptionRequiredTip] = React.useState('Audio description is not necessary when there is one person speaking against an unchanging background because there is no time-based visual information in the video that is important to the understanding of the content.');

	const a11yInitial = [
		{name: 'seizures', is_a11y: false},
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
		{name: 'captionsEmbebed', is_a11y: false},
		{name: 'audioDescription', is_a11y: false},
		{name: 'signLanguage', is_a11y: false},
	];

	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	//layout
	const [disabled_necAudioDesc,setDisabled_necAudioDesc ] = React.useState(true);
	const [disabled_uploadAudioDesc,setDisabled_uploadAudioDesc ] = React.useState(true);

	useEffect(() => {
		setDisabled_necAudioDesc(!(dataField.audioDescription === 'no'));
		setDisabled_uploadAudioDesc((disabled_necAudioDesc? disabled_necAudioDesc : (dataField.audioDescriptionRequired === undefined || dataField.audioDescriptionRequired ==='no')));

		//setIsA11Y(a11yInitial);
		//getAccessibilityProgress();
	}, [dataField]);

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

	function handleRadioButtonOnChange ({ target: { name, value } }){
		let data = {
			[name]: value,
		};

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
			arr.find(a => a.name == name).is_a11y = !errValue;
			setIsA11Y(arr);
		}

		setDataField( dataField => ({ ...dataField,
			...data
		}));
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
		handleRadioButtonOnChange:handleRadioButtonOnChange,
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		seizuresTip,
		captionsTip,
		audioDescriptionTip,
		audioDescriptionRequiredTip,
		signLanguageTip,
		disabled_necAudioDesc,
		disabled_uploadAudioDesc,
		isA11Y,
	};
};
