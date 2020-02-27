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
import AccessibilityFileUpload from '../files/AccessibilityFileUpload';
import Link from '@material-ui/core/Link';
//a11y
import AccessibilityHelp from '../tools/AccessibilityHelp';
import A11YProgressFeedback from './a11yProgressFeedback';
import A11YLongDescription from './a11yLongDescription';
import A11YShortDescription from './a11yShortDescription';
import EditorA11Y from '../tools/a11yEditor';
import FileUpload from '../files/FileUpload'
import VideoPreview from '../files/previews/VideoPreview';
import { makeStyles } from  '@material-ui/core/styles';

export function VideoTextAltA11Y(props){
	const {
		handleInputOnChange,
		handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
	} = props.data;

	function getFileInformation() {
		console.log('yes');
	}

	return(
		<section id='video-text-alternatives'>
			<Grid container spacing={1} direction='column' justify='flex-end'>
				<Grid item id='short-description-container' role='grid'>
					<A11YShortDescription
						handleOnChange={React.useCallback(handleInputOnChange)}
						error={dataField.shortDescriptionError}
						value={dataField.shortDescription}
						name="shortDescription"
						label={props.language.shortDescription_a11y_label}
						//ariaLabelledBy
						//ariaDescribedBy
						//editorData
						placeholder={props.language.shortDescription_a11y_placeholder}
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
						placeholder={props.language.longDescription_a11y_label_video}
						required={true}
						tip={
							<React.Fragment>
								{longDescriptionTip}
							</React.Fragment>
						}
						position={dataField.longDescriptionPosition}
						handlePosition={React.useCallback(handleLongDescriptionPosition)}
						textPositionLabel={`${props.language.textPosition_a11y_lbl}: ${props.language.video}`}
						language={props.language}
					/>
					<AccessibilityFileUpload size='small'
						type='pdf'
						user={Meteor.userId()}
						accept={'.pdf'}
						label={props.language.transcriptionUploadPDF_button}
						getFileInformation={getFileInformation.bind(this)}
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
				<FormLabel component='legend' id='captions-radiogroup-label'>{props.language.captions_a11y_form_label}</FormLabel>
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
						label={props.language.yes}
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='captions-no'
						name='captionsEmbebed'
						label={props.language.no}
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
	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newAudioSignal, setnewAudioSignal] = useState(false);


	const handleRadioButtonOnChange1 =handleRadioButtonOnChange

	console.log("dataField",dataField)
	console.log("audioDescriptionRequiredTip",audioDescriptionRequiredTip)
	console.log("disabled_uploadAudioDesc",disabled_uploadAudioDesc)
	console.log("disabled_necAudioDesc",disabled_necAudioDesc)

	

	const getFileInformationAudioDescription=(file)=>{
		dataField.fileAudioDescription[0]=file
		setshowPreviewSignal(true)
		setnewAudioSignal(false)
	}

	const unPickFileSignal=()=>{
		dataField.fileAudioDescription[0]=undefined
		setnewAudioSignal(true)

	  }
	  const  noAudiofile=()=>{
		dataField.fileAudioDescription[0]=undefined
		setshowPreviewSignal(false)
		return undefined
	}

	return(
		<Grid container spacing={1} direction='column' id='audioDescr-container' role='grid' justify='flex-end'>
			<Grid item>
				<FormControl component='fieldset' >
					<FormLabel component='legend' id='audioDescr-radiogroup-label'>{props.language.audioDescription_a11y_has}</FormLabel>
					<RadioGroup
						id='audioDescr-radiogroup'
						aria-describedby='audioDescr-exp'
						aria-labelledby='audioDescr-radiogroup-label'
						name='audioDescription'
						row
						value={dataField.audioDescription}
						onChange={handleRadioButtonOnChange1}
					>
						<FormControlLabel
							id='audioDescr-yes'
							name='audioDescription'
							label={props.language.yes}
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
							role='radio'
						/>
						<FormControlLabel
							id='audioDescr-no'
							name='audioDescription'
							label={props.language.no}
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='audioDescr-radiogroup' error={dataField.audioDescriptionError} tip={audioDescriptionTip} />
				</FormControl>

				{//languages audio part
					dataField.audioDescription === "yes"?
					<div>
						{ (dataField.fileAudioDescription[0]===undefined || newAudioSignal===true )?
						<div className="uploadsignals">
							<FileUpload
                                type="audio"
                                accept={'audio/*'}
                                user={Meteor.userId()}
                                label={"UPLOAD AUDIO DESCRIPTION*"}//label={this.props.language.uploadAudioButtonLabel}
                                getFileInformation={getFileInformationAudioDescription}
                              />
						</div>
						:
						<div>
							{
								showPreviewSignal===true?
								<div>
									<div>
									<VideoPreview
										file={dataField.fileAudioDescription[0]}
										unPickFile={unPickFileSignal}
										language={props.language}
									/>
									</div>
								</div>
								:
								<div>
									<div>
									<VideoPreview
										file={dataField.fileAudioDescription[0]}
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
					noAudiofile
				}
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

	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newVideoSignal, setnewVideoSignal] = useState(false);

	const handleRadioButtonOnChange1 =handleRadioButtonOnChange
	console.log("dataField",dataField)
	console.log("signLanguageTip",signLanguageTip)
	
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
				<AccessibilityHelp idName='signLang-radiogroup' error={dataField.signLanguageError} tip={signLanguageTip} />
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
						label={"traduction*"}
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

export function VideoOthersA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		seizuresTip,
	} = props.data;

	return(
		<FormControl component='fieldset' >
			<FormLabel component='legend' id='seizures-label'>{props.language.seizureRisk_a11y_has}</FormLabel>
			<RadioGroup id='seizures-radiogroup'
				aria-describedby='seizures-exp'
				name='seizures'
				value={dataField.seizures}
				onChange={handleRadioButtonOnChange}
				row>
				<FormControlLabel
					name='seizures'
					id='seizures-yes'
					label={props.language.yes}
					value='yes'
					control={<Radio color='primary' />}
					labelPlacement='end'
				/>
				<FormControlLabel
					name='seizures'
					id='seizures-no'
					label={props.language.no}
					value='no'
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
				<h2 className='accessibility-subtitle'>{props.language.videoSettings_a11y}</h2>
				<A11YProgressFeedback a11yFields={isA11Y}/>
			</header>

			<section id='video-text-alternatives'>
				<header>
					<h3>{props.language.textAlternatives_a11y_video}</h3>
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
					<h3>{props.language.mediaAlternatives_a11y_video}</h3>
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
					<h3>{props.language.other}</h3>
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

export const useDataField = (props) => {
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

	//feedback variables
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(props. shortDescription_a11y_tip);
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(props.video_a11y_aux_text_001);
	const [seizuresTip, setSeizuresTip] = React.useState(
		<React.Fragment>{`${props.video_a11y_aux_text_002} `}<Link href={'https://www.trace.umd.edu/peat'}alt='Test your content in PEAT'>{props.video_a11y_aux_text_003}</Link>{` ${props.video_a11y_aux_text_004}`}
		</React.Fragment>
	);
	const [signLanguageTip, setSignLanguageTip] = React.useState(props.video_a11y_aux_text_005);
	const [captionsTip, setCaptionsTip] = React.useState(props.video_a11y_aux_text_006);
	const [audioDescriptionTip, setAudioDescriptionTip] = React.useState(props.video_a11y_aux_text_007);

	const [audioDescriptionRequiredTip, setAudioDescriptionRequiredTip] = React.useState(props.video_a11y_aux_text_008);

	const a11yInitial = [
		{name: 'seizures', is_a11y: false},
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
		{name: 'captionsEmbebed', is_a11y: false},
		{name: 'audioDescription', is_a11y: false},
		{name: 'signLanguage', is_a11y: false},
	];

	useEffect(() => {
		if (props.item.dataField && props.item.isA11Y) {
			setDataField(props.item.dataField);
			setIsA11Y(props.item.isA11Y);
		}
	}, [])

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
