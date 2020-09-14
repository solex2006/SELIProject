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
	let  {
		editorReuse,
		handleInputOnChange,
		handleImagePurposeOnChange,
		handleLongDescriptionPosition,
		dataField,
		shortDescriptionTip,
		longDescriptionTip,
		imagePurposeTip,
		imagePurposeLabel,
		//displayAltGroup,
		//displayAltLong,
		isA11Y,
	} = props.data;

	const [displayAltGroup,setdisplayAltGroup]=useState(props.data.displayAltGroup)
	const [displayAltLong,setdisplayAltLong]=useState(props.data.displayAltLong)
	 useEffect(() => {
		
		  if(props.data.dataField.imagePurpose==='deco'){
			console.log("Cambio de Checkbox------->", props.data)
			setdisplayAltGroup('none')
			setdisplayAltLong('none')
		 }
		  else if(props.data.dataField.imagePurpose==='txt'){
			setdisplayAltGroup('initial')
			setdisplayAltLong('none')
		}
		else if(props.data.dataField.imagePurpose==='info'){
			setdisplayAltGroup('initial')
			setdisplayAltLong('none')
		}
		else if(props.data.dataField.imagePurpose==='cplx'){
			setdisplayAltGroup('initial')
			setdisplayAltLong('initial')
		}
	}) 


	return (
		<React.Fragment>
			<section id='image-decoration' className='accessib-form'>
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
			{console.log("displayAltGroup---->",displayAltGroup)}
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
					
					<Grid  item style={{'display' :displayAltLong}}>
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

					</Grid>
				</Grid>
			</section>
		</React.Fragment>
	);
}

export const useImageDataField = (props) => {
	//console.log("Propiedades en useImageDataField",props)
	//feedback
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(getShortDescriptionTip('info'));
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(getLongDescriptionTip('info'));
	const [imagePurposeTip, setImagePurposeTip] = React.useState(getImagePurposeTip('info'));
	const [imagePurposeLabel, setImagePurposeLabel] = React.useState(getImagePurposeLabel('info'));
	//layout states
	const [displayAltGroup, setDisplayAltGroup] = React.useState('none');
	const [displayAltLong, setDisplayAltLong] = React.useState('none');
	const [toogleShort, setToogleShort] = React.useState(false);
	const [toogleLong, setToogleLong] = React.useState(false);
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
		//console.log("carga lo gurdadoantes", props.item.dataField, props.item.isA11Y)
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

	}, [dataField.imagePurpose]);

	useEffect(() => {
		console.log("opcion uno",toogleShort, dataField)
		setDisplayAltGroup(toogleShort ? 'none' : 'initial');

	}, [toogleShort]);

	useEffect(() => {
		console.log("opcion dos",toogleLong)
		setDisplayAltLong(toogleLong ? 'initial' : 'none');
	}, [toogleLong]);



	const handleImagePurposeOnChange = event => {
		console.log("event and target and toogleLong-----------------", dataField)

		if (dataField.imagePurpose==='cplx'){
			setIsA11Y([isA11Y[0]])
			//toogleLong=true
			//setToogleLong(true)
		}
		
		
		
		const { name, value } = event.target;
		console.log("name y value---->", name, value)
		
		let data = {
			[name]: value,
		};
		setDataField( dataField => ({ ...dataField, ...data }));
		let shortToogle = (value === 'deco');
		let longToogle = (toogleShort || value === 'info' || value === 'txt');

		if(toogleShort != shortToogle)
			setToogleShort(shortToogle);

		console.log("value", value)
		if( value === 'info' || value === 'txt'){
			//setToogleLong(true);
			setDisplayAltLong('none');
			setDisplayAltGroup('initial');
		}
		if( value === 'cplx'){
			//setToogleLong(false);
			setDisplayAltLong('initial');
			setDisplayAltGroup('initial');
			setIsA11Y([
				{name: 'shortDescription', is_a11y: isA11Y===undefined ?false : isA11Y[0].is_a11y},
				{name: 'longDescription',  is_a11y: dataField.longDescription.blocks[0].text===''  ?false : true},
			]);
		}
		if (value==='deco'){
			setDisplayAltLong('none');
			setDisplayAltGroup('none');
		}
		updateAccessibilityProgress(shortToogle, longToogle, name, value );

		
	};

	function editorReuse(){
			const contentState = convertFromRaw(props.item.dataField.longDescription);
			const editorState =  EditorState.createWithContent(contentState);
			return editorState
	}
	function updateAccessibilityProgress( shortToogle, longToogle ,toogleValue, value ){
		console.log("shortToogle, longToogle----",shortToogle, longToogle, toogleValue ,value,props, isA11Y,dataField)

		if(shortToogle && !longToogle){
			if(value==='deco'){
				//setDisplayAltGroup('none')
				setIsA11Y([ {name: 'deco', is_a11y: true}]);
			}
		}
		
		
		if(!shortToogle && longToogle) //hide shortDescription === hideLongDescription
		{	
			
				  if(props.item.dataField!=undefined){
					//setToogleLong(true)
					if(value==='info'){
						//setDisplayAltLong('none')
						if(dataField.shortDescription!=''){
							setIsA11Y([
								{name: 'shortDescription', is_a11y: true},
							]);
						}else{
							setIsA11Y([
								{name: 'shortDescription', is_a11y: false},
							]);
						}
						//setIsA11Y([
						//	{name: 'shortDescription', is_a11y: isA11Y===undefined ?false : (dataField.imagePurpose==='deco'? !isA11Y[0].is_a11y:false)},
						//]);
					}else if(value==='txt'){
						//setDisplayAltLong('none')
						if(dataField.imagePurpose==='deco' && dataField.shortDescription===''){
							setIsA11Y([
								{name: 'shortDescription', is_a11y: false}
							]);
						}else{
							setIsA11Y([
								{name: 'shortDescription', is_a11y: isA11Y===undefined ?false : isA11Y[0].is_a11y}
							]);
						}
					}
					
				}  
		}

		if(!shortToogle && !longToogle) {	
			if(value==='cplx'){
				
				setToogleLong(false)
				setIsA11Y([
					{name: 'shortDescription', is_a11y: isA11Y===undefined ?false : isA11Y[0].is_a11y},
					{name: 'longDescription',  is_a11y: dataField.longDescription.blocks[0].text===''  ?false : true},
				]);
			}
		}
	}

	function handleInputOnChange ({ target: { name, value } }){
		if(name==='longDescription'){
			let errValue = '';
			if(value.blocks[0].text===''){
				 errValue = true;
			}
			else{
				 errValue = false;
			}
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
		else{
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
