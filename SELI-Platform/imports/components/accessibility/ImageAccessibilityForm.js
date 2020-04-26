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

export default function ImageAccessibility(props) {
	const  {
		editorReuse,
		handleInputOnChange,
		handleImagePurposeOnChange,
		handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		imagePurposeTip,
		imagePurposeLabel,
		displayAltGroup,
		displayAltLong,
		isA11Y,
	} = props.data;


	return (
		<React.Fragment>
			<section id='image-decoration' className='accessib-form'>
				{/* <header>
					<h3 className="accessibility-form-title">{props.language.image_a11y_form}</h3>
				</header> */}
				<FormControl component='fieldset'>
					<FormLabel component='legend' id='image-purpose-label' className="accessibility-form-label">
						{props.language.image_a11y_form_lbl}
					</FormLabel>
					<RadioGroup
						name='imagePurpose'
						id='image-purpose'
						aria-labelledby='image-purpose-label'
						aria-describedby='image-purpose-exp'
						value={dataField.imagePurpose}
						onChange={React.useCallback(handleImagePurposeOnChange)}
						row
					>
						 <FormControlLabel
							name='imagePurpose'
							id='image-purpose-info'
							label={props.language.image_a11y_purpose_informative}
							value='info'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/> 
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-deco'
							label={props.language.image_a11y_purpose_decorative}
							value='deco'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
					  <FormControlLabel
							name='imagePurpose'
							id='image-purpose-txt'
							label={props.language.image_a11y_purpose_text}
							value='txt'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/> 
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-cplx'
							label={props.language.image_a11y_purpose_complex_label}
							value='cplx'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
					</RadioGroup>
					
					<AccessibilityHelp
						id='image-purpose'
						name='imagePurpose'
						error={false}
						tip={imagePurposeTip}
						step={'imagePurposeHelper_' + dataField.imagePurpose}
						stepLabel={imagePurposeLabel}
						guide=''
						language={props.language}
					/>
				</FormControl>
			</section>
			<section id='image-text-alternatives'  className="form accessib-form"
				style={{'display':displayAltGroup}}
			>
				<header>
					<h3 className="accessibility-form-title">{props.language.textAlternatives_a11y_image}</h3>
				</header>
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
							placeholder="Content identification"
							required={true}
							tip={shortDescriptionTip}
							step={'shortAltHelper_'+ dataField.imagePurpose}
							language={props.language}
						/>
					</Grid>
					
					<Grid  item style={{'display' : displayAltLong}}>
						<A11YLongDescription
							handleOnChange={React.useCallback(handleInputOnChange)}
							error={dataField.longDescriptionError}
							value={dataField.longDescription}
							name="longDescription"
							label={props.language.longDescription_a11y_label}
							//ariaLabelledBy
							//ariaDescribedBy
							//editorData
							placeholder={props.language.longDescription_a11y_placeholder_image}
							required={true}
							tip={longDescriptionTip}
							step={'longAltHelper_'+dataField.imagePurpose}
							stepLabel=''
							position={dataField.longDescriptionPosition}
							handlePosition={React.useCallback(handleLongDescriptionPosition)}
							textPositionLabel={`${props.language.textPosition_a11y_lbl}: ${props.language.image}`}
							language={props.language}
						/>

                        {/* <Editor editorState={editorReuse()} readOnly={false} /> */}
						{/* <EditorA11Y 
							editorState={editorReuse()}
							id={'long-description-input'}
							name="longDescription"
							label={props.language.longDescription_a11y_label}
							aria-describedby='long-description-help-container'
							placeholder={props.language.longDescription_a11y_placeholder_image}
							onChange={React.useCallback(handleInputOnChange)}
							error={dataField.longDescriptionError}
							longDescription_a11y_delopment_purpose={props.language.longDescription_a11y_delopment_purpose}
						/> */}
					</Grid>
				</Grid>
			</section>
		</React.Fragment>
	);
}

export const useImageDataField = (props) => {
	console.log("Propiedades en useImageDataField",props)
	//feedback
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(getShortDescriptionTip('info'));
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(getLongDescriptionTip('info'));
	const [imagePurposeTip, setImagePurposeTip] = React.useState(getImagePurposeTip('info'));
	const [imagePurposeLabel, setImagePurposeLabel] = React.useState(getImagePurposeLabel('info'));
	//layout states
	const [displayAltGroup, setDisplayAltGroup] = React.useState('none');
	const [displayAltLong, setDisplayAltLong] = React.useState('none');
	const [toogleShort, setToogleShort] = React.useState(false);
	const [toogleLong, setToogleLong] = React.useState(true);
	const [toogleValue, setTvalue] = React.useState('');
	const [dataField, setDataField] = React.useState({
		longDescription:'',
		shortDescription:'',
		imagePurpose: 'info',
		shortDescriptionError : true,
		longDescriptionError : true,
		longDescriptionPosition: 'bottom'
	});

	const a11yInitial = [
		//{name: 'longDescription', is_a11y: false},
		{name: 'shortDescription', is_a11y: false},
		//{name: 'imagePurpose', is_a11y: false}
	];

	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	useEffect(() => {
		if (props.item.dataField && props.item.isA11Y) {
			setDataField(props.item.dataField);
			setIsA11Y(props.item.isA11Y);
		}
	}, [])

	useEffect(() => {
		let value = dataField.imagePurpose;
		setImagePurposeTip(getImagePurposeTip(value));
		setImagePurposeLabel(getImagePurposeLabel(value));
		setShortDescriptionTip(getShortDescriptionTip(value));
		setLongDescriptionTip(getLongDescriptionTip(value));

		updateAccessibilityProgress(toogleShort, toogleLong, value);

	}, [dataField.imagePurpose]);

	useEffect(() => {
		setDisplayAltGroup(toogleShort ? 'none' : 'initial');

	}, [toogleShort]);

	useEffect(() => {
		setDisplayAltLong(toogleLong ? 'none' : 'initial');
	}, [toogleLong]);

/* 	useEffect(() => {
		setDataField(dataField => ({...dataField,
			shortDescription: '',
		}));
	}, [displayAltGroup]);

	useEffect(() => {
		setDataField(dataField => ({...dataField,
			shortDescription: '',
			longDescription: '',
		}));
	}, [displayAltLong]); */


	const handleImagePurposeOnChange = event => {
		//console.log("event and target-----------------", event.target)
		const { name, value } = event.target;
	
		let data = {
			[name]: value,
		};
		setDataField( dataField => ({ ...dataField, ...data }));
		let shortToogle = (value === 'deco');
		let longToogle = (toogleShort || value === 'info' || value === 'txt');

		if(toogleShort != shortToogle)
			setToogleShort(shortToogle);

		if(toogleLong != longToogle)
			setToogleLong(longToogle);

		//console.log("event and target-----------------", event.target)
		updateAccessibilityProgress(shortToogle, longToogle, name );

		// let arr = [...isA11Y];


		// if(toogleShort && displayAltGroup === 'initial'){
		// 	data = {...data,
		// 		shortDescription: ''
		// 	};
		// 	arr = arr.filter(a => ( a.name !== 'shortDescription'));
		// }

		// if(toogleLong){
		// 	data = {...data,
		// 		longDescription: ''
		// 	};
		// 	arr = arr.filter(a => ( a.name !== 'longDescription'));
		// }

		// setIsA11Y(arr);
		// setDataField( dataField => ({ ...dataField, ...data }));
	};

	function editorReuse(){
	
			const contentState = convertFromRaw(props.item.dataField.longDescription);
			const editorState =  EditorState.createWithContent(contentState);
			return editorState
			
	
	}
	function updateAccessibilityProgress( shortToogle, longToogle ,toogleValue ){
		//console.log("shortToogle, longToogle----",shortToogle, longToogle, toogleValue ,props)
		if(!shortToogle && longToogle) //hide shortDescription === hideLongDescription
		{	
				if(toogleValue==='info'){
					setIsA11Y([
						{name: 'shortDescription', is_a11y: props.item.isA11Y===undefined ?false : props.item.isA11Y[0].is_a11y},
					]);
				}else if(toogleValue==='deco'){
					setIsA11Y([]);
				}else if(toogleValue==='txt'){
					setIsA11Y([
						{name: 'shortDescription', is_a11y: props.item.isA11Y===undefined ?false : props.item.isA11Y[0].is_a11y},
					]);
				}
				 if(props.item.dataField!=undefined){
					if(toogleValue==='info'){
						setIsA11Y([
							{name: 'shortDescription', is_a11y: props.item.isA11Y===undefined ?false : props.item.isA11Y[0].is_a11y},
						]);
					}else if(toogleValue==='deco'){
						setIsA11Y([]);
					}else if(toogleValue==='txt'){
						setIsA11Y([
							{name: 'shortDescription', is_a11y: props.item.isA11Y===undefined ?false : props.item.isA11Y[0].is_a11y},
						]);
					}
					else{
						if(toogleValue==='cplx'){
							console.log("CPLX")
							setDisplayAltLong('initial')
						}else if(toogleValue==='imagePurpose'){
							setDisplayAltLong('none')
						}
						setIsA11Y([
							{name: 'shortDescription', is_a11y: props.item.isA11Y===undefined ?false : props.item.isA11Y[0].is_a11y},
							{name: 'longDescription',  is_a11y: false}
						]);

					}
					
				} 
		}

		if(!shortToogle && !longToogle) {	
			if(toogleValue==='cplx'){
				setDisplayAltLong('initial')
				setIsA11Y([
					{name: 'shortDescription', is_a11y: props.item.dataField===undefined ?false : true},
					{name: 'longDescription',  is_a11y: props.item.dataField===undefined ?false : true},
				]);
			}
			if(props.item.dataField!=undefined){
				if(toogleValue==='cplx'){
					setDisplayAltLong('initial')
					setIsA11Y([
						{name: 'shortDescription', is_a11y: props.item.dataField.shortDescription!='' ?true : false},
						{name: 'longDescription',  is_a11y: props.item.dataField.longDescription!='' ?true : false},
					]);
				}	
			}
		}
	}

	function handleInputOnChange ({ target: { name, value } }){
		let errValue = value === '';
		setDataField(dataField => ({ ...dataField,
			[name] : value,
			[name+'Error'] : errValue,
		}));
		let new_a11Y = isA11Y.map(el => {
			if(el.name == name)
				return Object.assign({}, el, {is_a11y:!errValue});
				
			return el;
		});
	
		setIsA11Y(new_a11Y);
	}


	function handleLongDescriptionPosition(value){
		if( value === '')
			value = 'bottom';

		setDataField(dataField => ({...dataField,
			longDescriptionPosition : value,
		}));
	}

	function getImagePurposeLabel(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;
			
		switch(purpose){
		case 'info':
			return props.language.image_a11y_purpose_informative_label;
		case 'deco':
			return props.language.image_a11y_purpose_decorative_label;
		case 'txt':
			return props.language.image_a11y_purpose_text_label;
		case 'cplx':
			return props.language.image_a11y_purpose_complex_label;
		default:
			return props.language.error_retrievingData;
		}
	}

	function getImagePurposeTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'info':
			return props.language.image_a11y_purpose_informative_tip;
		case 'deco':
			return props.language.image_a11y_purpose_decorative_tip;
		case 'txt':
			return props.language.image_a11y_purpose_text_tip;
		case 'cplx':
			return props.language.image_a11y_purpose_complex_tip;
		default:
			return props.language.shortDescription_a11y_tip_default_image;;
		}
	}

	function getShortDescriptionTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'info':
			return props.language.shortDescription_a11y_tip_image_informative;
		case 'txt':
			return props.language.shortDescription_a11y_tip_image_text;
		case 'cplx':
			return props.language.shortDescription_a11y_tip_image_complex;
		default:
			return props.language.shortDescription_a11y_default_image;
		}
	}

	function getLongDescriptionTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'cplx':
			return props.language.image_a11y_provide_text;
		default:
			return ;
		}
	}

	return  {
		editorReuse,
		handleInputOnChange: handleInputOnChange,
		handleImagePurposeOnChange:handleImagePurposeOnChange,
		handleLongDescriptionPosition:handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		imagePurposeTip,
		imagePurposeLabel,
		displayAltGroup,
		displayAltLong,
		isA11Y,
	};
};
