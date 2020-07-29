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
import TimePickers from '../content/TimePicker'
import Button from '@material-ui/core/Button';


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

export const AudioA11YCaptions= (props)=> {
	const  {
		captionsTip,
		audioTranscriptionTip,
		changeText,
		addTranscription,
		handleSubmit,
		remove,
		time,
		handleRadioButtonOnChange,
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

			<FormControl component='fieldset'>
				<FormLabel component='legend' id='captions-radiogroup-label'>{props.language.captions_a11y_form_label}</FormLabel>
				<RadioGroup
					id='captions-radiogroup'
					aria-labelledby='captions-radiogroup-label'
					aria-describedby='captions-exp'
					name='captionsEmbedded'
					value={dataField.captionsEmbedded}
					row	
					onChange={React.useCallback(handleRadioButtonOnChange)}
				>
					<FormControlLabel
						id='captions-yes'
						name='captionsEmbedded'
						label={props.language.yes}
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
						role='radio'
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
			{//Trnascription signal part
				(dataField.captionsEmbedded === "yes")?
				<Grid item id='short-description-container' role='grid'>
					{
						dataField.text.map((value,index)=>{
							return(
							<div className="timepickerHelp">
								<div key={index} className="timepicker">
									<textarea  value={value} onChange={(event)=>changeText(event, index)} placeholder={props.language.addTranscription} className="textareaPicker"></textarea>		
									<TimePickers
										value={dataField.time[index]}
										format={"HH:mm:ss"}
										index={index}
										type={"captions"}
										time={time}
									/> 
									
									<Button onClick={()=>remove(index)} 
										variant="outlined" size="medium" 
										color="primary" 
										className="butttomPicker"
										className="ButtomPickerstyle">
										{props.language.removeTranscription}
									</Button>
									
								</div>
								<AccessibilityHelp idName='captions-radiogroup' error={false} tip={props.language.tipTranscription}/>
							</div>
							
							)
						})
					}
					<Button onClick={()=>addTranscription()} 
						variant="outlined" 
						size="medium" 
						color="primary"
						className="ButtomPickerstyle">
						{props.language.addTranscription}
                     </Button>
				</Grid>
				:
				undefined
			}
			</Grid>
			</section>
		</React.Fragment>
	);
}


export const useAudioDataField = (props) =>{
	const [dataField, setDataField] = React.useState({
		shortDescription: '',
		longDescription: '',
		longDescriptionPosition: 'bottom',
		signLanguage: 'no',
		seizures: 'no',
		captionsEmbedded: 'no',
		audioDescription: 'no',
		audioDescriptionRequired:'yes',
		hasAudioDescriptionFile: false,
		hasTranscriptionFile: false,
		longDescription:'',
		shortDescription:'',
		fileTranscription: [],
		text: [],
		time:[],
		hasVideoSignalFile: false,
		//error states
		shortDescriptionError : true,
		longDescriptionError : true,
		seizuresError : true,
		captionsEmbeddedError : true,
		audioDescriptionError : true,
		signLanguageError : true,
	});

	const a11yInitial = [
		{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
		//{name: 'captionsEmbedded', is_a11y: false}
	];
	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	useEffect(() => {
		//console.log("Audio",props.item.dataField, props.item.isA11Y)
		if (props.item.dataField && props.item.isA11Y) {
			setDataField(props.item.dataField);
			setIsA11Y(props.item.isA11Y);
		}
	}, [])

	//feedback
	const [captionsTip, setCaptionsTip] = React.useState(props.language.audioTranscriptionTip);   
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(props.language.shortDescription_a11y_tip);   
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(props.language.longDescription_a11y_tip);
	const [seizuresTip, setSeizuresTip] = React.useState(
		<React.Fragment>{`${props.video_a11y_aux_text_002} `}<Link href={'https://www.trace.umd.edu/peat'}alt='Test your content in PEAT'>{props.video_a11y_aux_text_003}</Link>{` ${props.video_a11y_aux_text_004}`}
		</React.Fragment>
	);
	
	
	function handleInputOnChange ({ target: { name, value } }){
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

		console.log("dataFieldAudio",dataField)
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

		let errField = name + 'Error';
			let errValue = value === 'no' ? true : false;

			data = {...data,
				[errField]: errValue,
			};

			let arr = [...isA11Y];
			arr.find(a => a.name == name).is_a11y = !errValue;
			setIsA11Y(arr);
			console.log(arr) 
			console.log("despues de dar click",data, name, value)
		
		setDataField( dataField => ({ ...dataField,
			...data
		}));
	}

	function addTranscription () {
		console.log("en addtranscription")
		data={
			text : [...dataField.text , ""],
			time : [...dataField.time, "00:00:00"]}
			
	

		setDataField( dataField => ({ ...dataField,
			...data
		}));

	
		//dataField.time.push("00:00:00")
		console.log("en addtranscription el estado", dataField)
	};
  
	function changeText(event,index){
		dataField.text[index]=event.target.value;
		dataField.time[index]="00:00:00"
		data={
			text:dataField.text,
			time : dataField.time
		}

		setDataField( dataField => ({ ...dataField,
			...data
		}));
		console.log("en addtranscription el estado***", dataField)
	}
     
	function handleSubmit(event){
	  event.preventDefault()
	  console.log(this.state)
   
	}
   
	function remove(index){
	  dataField.text.splice(index,1)
	  dataField.time.splice(index,1)
	  setDataField(dataField =>({...dataField, text: dataField.text, time: dataField.time}))
	}
  
	function time(time,index){
	  console.log("el tiempo de regresoe ne al funcion",time,index,dataField)
	  dataField.time[index]=time
	
	}

	return  {
		changeText:changeText,
		addTranscription:addTranscription,
		handleSubmit:handleSubmit,
		remove:remove,
		time:time,
		handleRadioButtonOnChange:handleRadioButtonOnChange,
		handleInputOnChange: handleInputOnChange, 
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		//captionsTip,
		isA11Y,
	};
};