import React, {useState, useEffect, useCallback} from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
// form componenets
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
//a11y components
import A11YLongDescription from './a11yLongDescription';
import A11YShortDescription from './a11yShortDescription';
import EditorA11Y from '../tools/a11yEditor';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import NumericInput from 'react-numeric-input';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TimePickers from '../content/TimePicker'

export function QuizAccessibility(props) {
	const {
        noTimeTip,
        extendedTimeTip,
        alertMomentTip,
		handleRadioButtonOnChange,
		dataField,
		disabled_necAudioDesc,
		disabled_uploadAudioDesc,
		audioDescriptionTip,
		audioDescriptionRequiredTip,
		handleRadioButtonOnChangeValidator,
	} = props.data;
	//console.log("dataField.imagePurpose",dataField)
	return (
		<React.Fragment>
			<section id='image-decoration' className='accessib-form'>

				<FormControl component='fieldset'>
					<FormLabel component='legend' id='image-purpose-label' className="accessibility-form-label">
                    {props.language.noTimeRestrictions}
					</FormLabel>
					
                    <div className="quiz-input-container">
                            <RadioGroup
                                name='noTime'
                                id='image-purpose'
                                aria-labelledby='image-purpose-label'
                                aria-describedby='image-purpose-exp'
                                value={dataField.noTime}
                                onChange={React.useCallback(handleRadioButtonOnChange)}
                                row
                            >
                                <FormControlLabel
                                    name='noTime'
                                    id='image-purpose-info'
                                    label={props.language.yes} 
                                    value='yes'
                                    control={<Radio color='primary' />}
                                    labelPlacement='end'
                                /> 
                                <FormControlLabel
                                    name='noTime'
                                    id='image-purpose-deco'
                                    label={props.language.no} 
                                    value='no'
                                    control={<Radio color='primary' />}
                                    labelPlacement='end'
                                />
                            
                            </RadioGroup>

                            </div>
				</FormControl>\
                <br></br>
                <AccessibilityHelp idName='captions-radiogroup' error={dataField.noTimeError} tip={noTimeTip}/>
			</section>
			
		</React.Fragment>
	);
}

export  function QuizAccessibilityExtendedTime(props) {
	const {
        noTimeTip,
        extendedTimeTip,
        alertMomentTip,
        myFormatminutes,
        handleChange, 
		handleRadioButtonOnChange,
		dataField,
		captionsTip,
		captionValidator,
		handleRadioButtonOnChangeValidator,
	} = props.data;
	//console.log("datos de video--",captionsTip, dataField)
	const [showPreviewSignal, setshowPreviewSignal] = useState(false);
	const [newCaption, setnewCaption] = useState(false);
	
	return(
		<Grid item id='captions-container' role='grid'>
			<FormControl component='fieldset'>
				<FormLabel component='legend' id='captions-radiogroup-label'>{props.language.extraTimeQuiz}</FormLabel>		
                <RadioGroup
					id='captions-radiogroup'
					aria-labelledby='captions-radiogroup-label'
					aria-describedby='captions-exp'
					name='extendedTime'
					row
					value={dataField.extendedTime}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				>
					<FormControlLabel
						id='captions-yes'
						name='extendedTime'
						label={props.language.yes}
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='captions-no'
						name='extendedTime'
						label={props.language.no}
						value='no'
						control={<Radio color='primary' />}
						labelPlacement='end'
						role='radio'
					/>
				</RadioGroup>
                {
                    (dataField.extendedTime === "no"  )?
                    undefined
                    :
                    <div>
                    <TimePickers
                        value={dataField.extendedTimeValue}
                        format={"HH:mm"}
                        handleChange ={handleChange}
                        type={"extendedTime"}
                    />
                    </div>
                    
                }
                <br></br>
                <AccessibilityHelp idName='captions-radiogroup' error={dataField.extendedTimeError} tip={extendedTimeTip}/>
			</FormControl>
		</Grid>
	);
}

export  function QuizAccessibilityWarningTime(props) {
	const {
        timeLimit,
        handleChange,
        noTimeTip,
        extendedTimeTip,
        alertMomentTip,
        myFormatminutes,
		handleRadioButtonOnChange,
		dataField
	} = props.data;
	//console.log("datos de video--",captionsTip, dataField)
	//const [timeLimit, settimeLimit] = useState("00:00:30");
    const [newCaption, setnewCaption] = useState(false);
    
	return(
		<Grid item id='captions-container' role='grid'>
			<FormControl component='fieldset'>
				<FormLabel component='legend' id='captions-radiogroup-label'>{props.language.alertMoment}</FormLabel>
                <RadioGroup
					id='captions-radiogroup'
					aria-labelledby='captions-radiogroup-label'
					aria-describedby='captions-exp'
					name='warningAlert'
					row
					value={dataField.warningAlert}
					onChange={React.useCallback(handleRadioButtonOnChange)}
				>
					<FormControlLabel
						id='captions-yes'
						name='warningAlert'
						label={props.language.yes}
						value='yes'
						control={<Radio color='primary' />}
						labelPlacement='end'
					/>
					<FormControlLabel
						id='captions-no'
						name='warningAlert'
						label={props.language.no}
						value='no'
						control={<Radio color='primary' />}
						labelPlacement='end'
						role='radio'
					/>
				</RadioGroup>
                {
				(dataField.warningAlert === "no"  )?
				undefined
				:
				<TimePickers
                    value={dataField.warningAlertValue}
                    format={"HH:mm:ss"}
                    handleChange ={handleChange}
                    type={"WarningAlert"}
                    handleRadioButtonOnChange={handleRadioButtonOnChange}
                />
                }
                <br></br>
				<AccessibilityHelp idName='captions-radiogroup' error={dataField.warningAlertError} tip={alertMomentTip}/>
			</FormControl>
			
		</Grid>
	);
}

export const useQuizDataField = (props) => {
	console.log("props de ingreso en quiz dtafiled", props)
	const [dataField, setDataField] = React.useState({
        noTime:null,
        extendedTime:null,
        warningAlert:null,
        extendedTimeValue:"00:10",
        warningAlertValue:"00:00:30",

        //error states
		noTimeError : true,
		extendedTimeError : true,
		warningAlertError : true,
	});

	const [noTimeTip, setnoTimeTip] = React.useState(props.language.noTimeTip);
	const [extendedTimeTip, setextendedTimeTip] = React.useState(props.language.extraTimeTip);
	const [alertMomentTip, setalertMomentTip] = React.useState(props.language.alertMomentTip);

	const a11yInitial = [
        {name: 'noTime', is_a11y: null},
		{name: 'extendedTime', is_a11y: null},
		{name: 'warningAlert', is_a11y: null},
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
    myFormatminutes=(num)=> {
        return num + 'min';
      }


      function handleChange(name, event) {
        console.log("boton de agayrda rlso riempos", name, event)
        if (name === 'extendedTime') {
                 setDataField(dataField => ({...dataField,
                    ["extendedTimeValue"]: event,
                })); 
        }else if(name === 'WarningAlert'){
                 setDataField(dataField => ({...dataField,
                    ["warningAlertValue"]: event,
                })); 
        }

    }
	

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

		console.log("dataFieldVideo",dataField)

		let arr = [...isA11Y];
		arr.find(a => a.name == name).is_a11y = !errValue;
		setIsA11Y(arr)
		
	}
	
	function handleRadioButtonOnChange ({ target: { name, value } }){
		let data = {
			[name]: value,
        };
        
        //captionsEmbedded - signLanguage - seizures
        let errField = name + 'Error';
        let errValue = value === 'no' ? true : false;


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

	function handleRadioButtonOnChangeValidator (name, value){
		let data = {
			[name]: value,
		};
		
		
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
        noTimeTip,
        extendedTimeTip,
        alertMomentTip,
        myFormatminutes:myFormatminutes,
		handleChange :handleChange ,
		handleInputOnChange: handleInputOnChange,
		handleRadioButtonOnChangeValidator:handleRadioButtonOnChangeValidator,
		handleRadioButtonOnChange:handleRadioButtonOnChange,
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		isA11Y,
	};
};
