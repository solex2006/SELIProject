import React, {useState, useEffect} from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// form componenets
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';  
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Link from '@material-ui/core/Link';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import FileUpload from '../files/FileUpload';
import EditorA11Y from '../tools/a11yEditor';
//feedback
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccessibilityHelp from '../tools/AccessibilityHelp';

import { makeStyles } from  '@material-ui/core/styles';

export default function VideoA11Y(props){
	
	//data variable
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
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState('');   
	const [longDescriptionTip, setLongDescriptionTip] = React.useState('');
	const [imagePurposeTip, setImagePurposeTip] = React.useState('');
	const [imagePurposeLabel, setImagePurposeLabel] = React.useState('');
	const [longDescriptionError, setLongDescriptionError] = React.useState(true);
	const [accessibilityPercentage, setAccessibilityPercentage] = React.useState(0);
	
	//layout
	const progressColor = ['#ff9800', '#ffc107', '#ffeb3b', '#d4e157', '#9ccc65', '#66bb6a'];
	const [disabled_necAudioDesc,setDisabled_necAudioDesc ] = React.useState(true);
	const [disabled_uploadAudioDesc,setDisabled_uploadAudioDesc ] = React.useState(true);

	useEffect(() => {
		setDisabled_necAudioDesc(!(dataField.audioDescription === 'no'));
		setDisabled_uploadAudioDesc((disabled_necAudioDesc? disabled_necAudioDesc : (dataField.audioDescriptionRequired === undefined || dataField.audioDescriptionRequired ==='no')));

		getAccessibilityProgress();
	}, [dataField]);
	
	function handleInputChange ({ target: { name, value } })
	{
		let errField = name + 'Error';
		let errValue = false;

		if(name === 'longDescription'){
			errValue = (value === '' && !dataField.hasTranscriptionFile);
		}
		
		if(name === 'shortDescription'){
			errValue = value === '';
		}

		setDataField({
			[name]: value,
			[errField]: errValue,
		});
	}

	function handleRadioButtonOnChange ({ target: { name, value } })
	{
		let data = [{
			[name]: value,
		}];
				
		if(name === 'audioDescription')
		{
			data = [...data, {
				audioDescriptionRequired: value === 'yes' ? value : dataField.audioDescriptionRequired,
				audioDescriptionError: value === 'yes' ? false : ((dataField.audioDescriptionRequired === 'yes') && !dataField.hasAudioDescriptionFile),
			}];
		}
		else if (name === 'audioDescriptionRequired')
		{
			data = [...data, {
				audioDescriptionError: dataField.audioDescription === 'yes' ? false : ((value === 'yes') && !dataField.hasAudioDescriptionFile),
			}];
		}
		else
		{
			//captionsEmbebed - signLanguage - seizures
			const errField = name + 'Error'
			data = [...data, {
				[errField]: value === 'no' ? true : false,
			}];
		}

		setDataField(data);
	}

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

	function getAccessibilityProgress(){
		let accessibilityPercentage = accessibilityPercentage;
		let progressIndex = 0;

		let seizuresError = dataField.seizuresError? 0 : 1;
		let longDescriptionError = dataField.longDescriptionError? 0 : 1; 
		let shortDescriptionError = dataField.shortDescriptionError? 0 : 1;
		let captionsEmbebedError = dataField.captionsEmbebedError? 0 : 1;
		let audioDescriptionError = dataField.audioDescriptionError? 0 : 1;
		let signLanguageError = dataField.signLanguageError? 0 : 1;
		
		let accessibilityFields = seizuresError + longDescriptionError + shortDescriptionError + captionsEmbebedError + audioDescriptionError + signLanguageError; 

		accessibilityPercentage = accessibilityFields * 100 / 6;

		if (accessibilityPercentage < 10){
			progressIndex = 0;
		}
		else if (accessibilityPercentage < 20 ){
			progressIndex = 1;
		}
		else if (accessibilityPercentage < 30 ){
			progressIndex = 2;
		}
		else if (accessibilityPercentage < 40 ){
			progressIndex = 3;
		}
		else if (accessibilityPercentage < 50 ){
			progressIndex = 4;
		}
		else if (accessibilityPercentage < 60 ){
			progressIndex = 5;
		}

		setAccessibilityPercentage(accessibilityPercentage);
		document.getElementsByClassName('accessibility-progress')[0].children[0].style.color = progressColor[progressIndex];
		document.getElementsByClassName('accessibility-percentage-value')[0].textContent =accessibilityFields + "/6";
	}

	return(
		<aside role='dialog'> {/* NOTE: this role indicates a modal. Change it if necessary*/}
			<header className='accessibility-header-row'>  
					{/*Subtitiles and Sections use h2..h3..etc*/}
					<h2 className='accessibility-subtitle'>Accessibility settings for video content</h2>
					<div className='accessibility-percentage-container'>
						<p className='accessibility-percentage-label'>Accesibility Progress</p>
						<CircularProgress
							color={progressColor[0]}
							variant='static'
							value={accessibilityPercentage}
							thickness={7.5}
							size={80}
							className='accessibility-progress'
						/>
						<p className='accessibility-percentage-value'>{accessibilityPercentage + "%"}</p>
					</div>
			</header>
			<section id='video-text-alternatives'>
				<header>
					<h3>Text alternatives to video content</h3>
				</header>
				<Grid container spacing={1} direction='column' justify='flex-start'>
					<Grid item id='short-description-container' role='grid'>
						<TextField id='short-description-input'
							name='shortDescription'
							label="Short description"
							aria-describedby='short-description-input-helper-text'
							placeholder="Content identification"
							maxLength='100'
							margin='normal'
							multiline
							fullWidth
							required
							rows='2'
							wrap='hard'
							variant='outlined'     
							onChange={handleInputChange}
							value={dataField.shortDescription}
							error={dataField.shortDescriptionError}
						/>
						 <AccessibilityHelp idName='short-description-input' error={dataField.shortDescriptionError} tip="Provide descriptive identification of the content"/>
						
					</Grid>
					<Grid  item id='long-description-container' role='grid'>
						<EditorA11Y id='long-description-input'
							name='longDescription'
							label='Transcription'
							aria-describedby='long-description-exp'
							placeholder="Video transcription"
							value={dataField.longDescriptionError}
							onChange={handleInputChange}
							error={dataField.longDescriptionError}
							required={true}
							//handleError={LongDescriptionHasError}
						/>
						<AccessibilityHelp idName='long-description-input' error={dataField.longDescriptionError} tip={
							<React.Fragment>
								Create a document that provide a textual version of the audio and video content that can be accessed by anyone. They should include spoken dialogue, and should also describe important sound effects and visual details.
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
							</React.Fragment>
							} 
						/>
					</Grid>
				</Grid>
			</section>
			<Divider component='li' />
			<section id='video-media-alternatives'>
				<header>
					<h3>Media alternatives to video content</h3>
				</header>
				<Grid container spacing={1} direction='column' justify='flex-start'>
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
								onChange={handleRadioButtonOnChange} 
								>
								<FormControlLabel
									id='captions-yes'
									name='captionsEmbebed'
									label='Yes'
									value='yes'
									control={<Radio color='primary' />}
									labelPlacement='start'
								/>
								<FormControlLabel
									id='captions-no'
									name='captionsEmbebed'
									label='No'
									value='no'
									control={<Radio color='secondary' />}
									labelPlacement='start'
									role='radio'
								/>
							</RadioGroup>
						<AccessibilityHelp idName='captions-radiogroup' error={dataField.captionsEmbebedError} tip="Captions include dialogue, and, unlike subtitles, also identify who is speaking and provide information about significant sound effects. Captions can be either open (that is always visible) or closed (can be turned on and off)." />
						</FormControl>
					</Grid>
					<Grid container spacing={1} direction='row' id='audioDescr-container' role='grid' justify='flex-start'>
						<Grid item sm={3}>
							<FormControl component='fieldset' >
								<FormLabel component='legend' id='audioDescr-radiogroup-label'>Did this content has audiodescription embebed?</FormLabel>
								<RadioGroup 
									id='audioDescr-radiogroup'
									aria-describedby='audioDescr-exp'
									aria-labelledby='audioDescr-radiogroup-label' 
									name='audioDescription' 
									row
									value={dataField.audioDescription} 
									onChange={handleRadioButtonOnChange} 
									>
									<FormControlLabel
										id='audioDescr-yes'
										name='audioDescription'
										label='Yes'
										value='yes'
										control={<Radio color='primary' />}
										labelPlacement='start'
										role='radio'
									/>
									<FormControlLabel
										id='audioDescr-no'
										name='audioDescription'
										label='No'
										value='no'
										control={<Radio color='secondary' />}
										labelPlacement='start'
										role='radio'
									/>
								</RadioGroup>
								<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.audioDescriptionError} tip="Audio description provides information about significant visual details that cannot be understood from the main soundtrack alone. During natural pauses in dialogue or critical sound elements, important actions, characters, scene changes, and on-screen text are described. " />
							</FormControl>
						</Grid>
						<Grid item sm={3}>
							<FormControl component='fieldset' disabled={disabled_necAudioDesc}>
								<FormLabel component='legend' id='audioDescr-necessary-label'>This content requires audiodescription?</FormLabel>
								<RadioGroup 
									id='audioDescr-necessary-radiogroup'
									aria-describedby='audioDescr-necessary-exp'
									aria-labelledby='audioDescr-necessary-radiogroup-label' 
									name='audioDescriptionRequired' 
									value={dataField.audioDescriptionRequired} 
									onChange={handleRadioButtonOnChange} 
									row>
										<FormControlLabel
											id='audioDescr-necessary-yes'
											name='audioDescriptionRequired'
											label='Yes'
											value='yes'
											control={<Radio color='primary' />}
											labelPlacement='start'
										/>
										<FormControlLabel
											id='audioDescr-necessary-no'
											name='audioDescriptionRequired'
											label='No'
											value='no'
											control={<Radio color='secondary' />}
											labelPlacement='start'
										/>
								</RadioGroup>
								<AccessibilityHelp idName='audioDescr-necessary-radiogroup' error={dataField.audioDescriptionError} tip="Audio description is not necessary when there is one person speaking against an unchanging background because there is no time-based visual information in the video that is 'important' to the understanding of the content." />
							</FormControl>
						</Grid>
						<Grid item sm={3}>
							 <FileUpload size='small'
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
									labelPlacement='start'
								/>
								<FormControlLabel
									name='signLanguage'
									id='signLang-no'
									label='No'
									value='no'
									control={<Radio color='secondary' />}
									labelPlacement='start'
								/>
							</RadioGroup>
								<AccessibilityHelp idName='signLang-radiogroup' error={dataField.signLanguageError} tip="Embed a video of the sign language interpreter in the video stream." />
						</FormControl>
					</Grid>
				</Grid>
			</section>
			<Divider component='li' />
			<section id='video-other-settings'>
				<header>
					<h3>Other</h3>
				</header>
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
							labelPlacement='start'
						/>
						<FormControlLabel
							name='seizures'
							id='seizures-no'
							label='No'
							value='yes'
							control={<Radio color='secondary' />}
							labelPlacement='start'
						/>
					</RadioGroup>
								<AccessibilityHelp idName='seizures-radiogroup' error={dataField.seizuresError} tip={
									<React.Fragment>
									No content should flash more than 3 times per second, unless the flashes are in low contrast or have little red, otherwise they may cause epileptic seizures. <Link href={"https://www.trace.umd.edu/peat"}>Test your content in PEAT</Link> to evaluate for epilepsy risk.
									</React.Fragment>
									} 
								/>
				</FormControl>
			</section>
		</aside>
	);
}