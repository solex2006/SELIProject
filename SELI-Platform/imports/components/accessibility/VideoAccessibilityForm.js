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
import FileUpload from '../files/FileUpload';
import AudioPreview from '../files/previews/AudioPreview';
import VideoPreview from '../files/previews/VideoPreview';
import AttachmentPreview from '../files/previews/AttachmentPreview';
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
				<header>
					<h3 className="accessibility-form-title">{props.language.textAlternatives_a11y_video}</h3>
				</header>
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

					{/* <AccessibilityFileUpload size='small'
						type='pdf'
						user={Meteor.userId()}
						accept={'.pdf'}
						label={props.language.transcriptionUploadPDF_button}
						getFileInformation={getFileInformation.bind(this)}
					/> */}
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
		captionValidator,
		handleRadioButtonOnChangeValidator,
	} = props.data;
	//console.log("datos de video--",captionsTip, dataField)
	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newCaption, setnewCaption] = useState(false);
	
	const getFileInformationCaption=(file)=>{		
	    handleRadioButtonOnChangeValidator('captionsEmbedded','no')
		dataField.fileTranscription[0]=file
		setshowPreviewSignal(true)
		setnewCaption(false)
	}
	
	const  noCaption=()=>{
		dataField.fileTranscription[0]=undefined
		setshowPreviewSignal(false)
		return undefined
	}
	
	const unPickFileSignal=()=>{
		dataField.fileTranscription[0]=undefined
		setnewCaption(true)
	}

	return(
		<section id='video-captions'>
			<Grid container spacing={1} direction='column' justify='flex-end'>
				<FormControl component='fieldset'>
					<FormLabel component='legend' id='captions-radiogroup-label'>{props.language.captions_a11y_form_label}</FormLabel>
					<RadioGroup
						id='captions-radiogroup'
						aria-labelledby='captions-radiogroup-label'
						aria-describedby='captions-exp'
						name='captionsEmbedded'
						row
						value={dataField.captionsEmbedded}
						onChange={React.useCallback(handleRadioButtonOnChange)}
					>
						<FormControlLabel
							id='captions-yes'
							name='captionsEmbedded'
							label={props.language.yes}
							value='yes'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							id='captions-no'
							name='captionsEmbedded'
							label={props.language.no}
							value='no'
							control={<Radio color='secondary' />}
							labelPlacement='end'
							role='radio'
						/>
					</RadioGroup>
					<AccessibilityHelp idName='captions-radiogroup' error={dataField.captionsEmbeddedError} tip={captionsTip}/>
				</FormControl>
				{//languages signal part
					(dataField.captionsEmbedded === "no" || newCaption===true )?
					<div>
						{dataField.fileTranscription[0]===undefined?
						<div className="uploadsignals">
							<FileUpload
								type="caption"
								user={Meteor.userId()}
								accept={'.vtt'}
								label={props.language.Captions}
								getFileInformation={getFileInformationCaption}
								handleControlMessage={props.handleControlMessage.bind(this)}
								language={props.language}
							/>
						</div>
						:
						<div>
							<AttachmentPreview
								preview={false}
								file={dataField.fileTranscription[0]}
								unPickFile={unPickFileSignal}
								language={props.language}
							/>
						</div>
						}
					</div>	
					:
					noCaption
				}
			</Grid>
		</section>
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
		handleRadioButtonOnChangeValidator,
	} = props.data;
	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newAudioSignal, setnewAudioSignal] = useState(false);


	const handleRadioButtonOnChange1 =handleRadioButtonOnChange

	//console.log("dataField",dataField)
	//console.log("audioDescriptionRequiredTip",audioDescriptionRequiredTip)
	//console.log("disabled_uploadAudioDesc",disabled_uploadAudioDesc)
	//console.log("disabled_necAudioDesc",disabled_necAudioDesc)

	const getFileInformationAudioDescription=(file)=>{
		handleRadioButtonOnChangeValidator('audioDescription','no')
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
		<section id='video-audio-description'>
			<Grid container spacing={1} direction='column' justify='flex-end'>
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
				{ 
					(dataField.audioDescription === "no" && dataField.audioDescriptionRequired === "yes")?
					<div>
						{ (dataField.fileAudioDescription[0]===undefined || newAudioSignal===true )?
						<div className="uploadsignals">
							<FileUpload
								type="audio"
								accept={'audio/*'}
								user={Meteor.userId()}
								label={props.language.uploadAudioButtonLabel}//label={this.props.language.uploadAudioButtonLabel}
								getFileInformation={getFileInformationAudioDescription}
								handleControlMessage={props.handleControlMessage.bind(this)}
								language={props.language}
								/>
						</div>
						:
						<div>	
							<AudioPreview
								file={dataField.fileAudioDescription[0]}
								unPickFile={unPickFileSignal}
								language={props.language}
							/>
						</div>
						}
					</div>	
					:
					noAudiofile  
				}
			</Grid>
		</section>
	);
}
export function VideoMediaSignLanguageA11Y(props){
	const {
		handleRadioButtonOnChange,
		dataField,
		signLanguageTip,
		handleRadioButtonOnChangeValidator,
	} = props.data;

	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newVideoSignal, setnewVideoSignal] = useState(false);

	const handleRadioButtonOnChange1 =handleRadioButtonOnChange
	//console.log("dataField",dataField)
	//console.log("signLanguageTip",signLanguageTip)
	
	const  getFileInformationsignal=(file)=>{
		handleRadioButtonOnChangeValidator('signLanguage','no')
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
		<section id='video-sign-language'>
			<Grid container spacing={1} direction='column' justify='flex-end'>
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
					(dataField.signLanguage=== "no" || newVideoSignal===true )?
					<div>
						{dataField.fileVideoSignal[0]===undefined?
						<div className="uploadsignals">
							<FileUpload
								type="video"
								user={Meteor.userId()}
								accept={'video/*'}
								label={props.language.byUploadVideo}
								getFileInformation={getFileInformationsignal}
								handleControlMessage={props.handleControlMessage.bind(this)}
								language={props.language}
							/>
						</div>
						:
						<div>
							{
								showPreviewSignal===true?
									<VideoPreview
										file={dataField.fileVideoSignal[0]}
										unPickFile={unPickFileSignal}
										language={props.language}
									/>
								:
									<VideoPreview
										file={dataField.fileVideoSignal[0]}
										unPickFile={unPickFileSignal}
										language={props.language}
									/>
							}
						</div>
						}
					</div>	
					:
					noVideofile
				}		
			</Grid>
		</section>
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
					value='no'
					control={<Radio color='primary' />}
					labelPlacement='end'
				/>
				<FormControlLabel
					name='seizures'
					id='seizures-no'
					label={props.language.no}
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
	console.log("props de ingreso en video", props)
	const [dataField, setDataField] = React.useState({
		signLanguage: null,
		seizures: null,
		captionsEmbedded: null,
		audioDescription: null,
		audioDescriptionRequired: null,
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
		captionsEmbeddedError : true,
		audioDescriptionError : true,
		signLanguageError : true,
	});

	//feedback variables
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(props.language.shortDescription_a11y_tip);
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(props.language.video_a11y_aux_text_001);
	const [seizuresTip, setSeizuresTip] = React.useState(
		<React.Fragment>{`${props.language.video_a11y_aux_text_002} `}<Link href={'https://www.trace.umd.edu/peat'}alt='Test your content in PEAT'>{props.video_a11y_aux_text_003}</Link>{` ${props.video_a11y_aux_text_004}`}
		</React.Fragment>
	);
	const [signLanguageTip, setSignLanguageTip] = React.useState(props.language.video_a11y_aux_text_005);
	const [captionsTip, setCaptionsTip] = React.useState(props.language.video_a11y_aux_text_006);
	const [audioDescriptionTip, setAudioDescriptionTip] = React.useState(props.language.video_a11y_aux_text_007);

	const [audioDescriptionRequiredTip, setAudioDescriptionRequiredTip] = React.useState(props.language.video_a11y_aux_text_008);

	const a11yInitial = [
		{name: 'seizures', is_a11y: null},
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
		{name: 'captionsEmbedded', is_a11y: null},
		{name: 'audioDescription', is_a11y: null},
		{name: 'signLanguage', is_a11y: null},
	];

	useEffect(() => {
		console.log("Video",props.item.dataField, props.item.isA11Y)
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

	}, [dataField]);

	function captionValidator(validator){
		console.log("----------->",validator, )
		

		console.log(props)

		//setCaptionValidator(validator)
	}

	function handleInputOnChange ({ target: { name, value } }){
		console.log(" handleInputOnChange", name, value )
		let errField = name + 'Error';
		let errValue = false;

		if(name === 'longDescription'){
			if(value.blocks[0].text===''){
				errValue = true;

			}else{
				errValue = false
			}
		}
		if(name === 'shortDescription'){
			errValue = value === '';
		}

		setDataField(dataField => ({...dataField,
			[name]: value,
			[errField]: errValue,
		}));

		console.log("dataFieldVideo",dataField)
		let arr = [...isA11Y];
		arr.find(a => a.name == name).is_a11y = !errValue;
		setIsA11Y(arr)
		
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
			//captionsEmbedded - signLanguage - seizures
			let errField = name + 'Error';
			let errValue = value === 'no' ? true : false;
			console.log("////////", errValue)

			data = {...data,
				[errField]: errValue,
			};

			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
			setIsA11Y(arr);
			console.log(arr) 
		}

		setDataField( dataField => ({ ...dataField,
			...data
		}));
	}

	function handleRadioButtonOnChangeValidator (name, value){
		let data = {
			[name]: value,
		};
		console.log("en la funcion handleRadioButtonOnChangeVALIDATOR", "name" ,name, "value",value)
		
		let errField = name + 'Error';
		let errValue = false;
		data = {...data,
			[errField]: errValue,
		};
		let arr = [...isA11Y];
		arr.find(a => a.name == name).is_a11y = !errValue;
		setIsA11Y(arr);
		console.log(arr) 
		
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
		captionValidator:captionValidator,
		handleInputOnChange: handleInputOnChange,
		handleRadioButtonOnChangeValidator:handleRadioButtonOnChangeValidator,
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
