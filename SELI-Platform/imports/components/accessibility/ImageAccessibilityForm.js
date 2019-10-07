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

export default function ImageAccessibility(props) {
	const  {
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
				<header>
					<h3 className="accessibility-form-title">Function of image</h3>
				</header>
				<FormControl component='fieldset'>
					<FormLabel component='legend' id='image-purpose-label' className="accessibility-form-label">
						Image could be configured based on the purpose of the image
					</FormLabel>
					<RadioGroup
						name='imagePurpose'
						id='image-purpose'
						aria-labelledby='image-purpose-label'
						aria-describedby='image-purpose-exp'
						value={dataField.imagePurpose}
						onChange={React.useCallback(handleImagePurposeOnChange)}
						column
					>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-info'
							label='Informative'
							value='info'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-deco'
							label='Decorative'
							value='deco'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-txt'
							label="Image of text"
							value='txt'
							control={<Radio color='primary' />}
							labelPlacement='end'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-cplx'
							label="Complex images"
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
					/>
				</FormControl>
			</section>


			<section id='image-text-alternatives'  className="form accessib-form"
				style={{'display':displayAltGroup}}
			>
				<header>
					<h3 className="accessibility-form-title">Text alternatives to image content</h3>
				</header>
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
							step={'shortAltHelper_'+dataField.imagePurpose}
						/>
					</Grid>
					<Grid  item style={{'display' : displayAltLong}}>
						<A11YLongDescription
							handleOnChange={React.useCallback(handleInputOnChange)}
							error={dataField.longDescriptionError}
							value={dataField.longDescription}
							name="longDescription"
							label="Long Description"
							//ariaLabelledBy
							//ariaDescribedBy
							//editorData
							placeholder="Caption"
							required={true}
							tip={longDescriptionTip}
							step={'longAltHelper_'+dataField.imagePurpose}
							stepLabel=''
							position={dataField.longDescriptionPosition}
							handlePosition={React.useCallback(handleLongDescriptionPosition)}
							textPositionLabel='Text position relative to image'
						/>
					</Grid>
				</Grid>
			</section>
		</React.Fragment>
	);
}

export const useImageDataField = () => {

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

	const [dataField, setDataField] = React.useState({
		longDescription:'',
		shortDescription:'',
		imagePurpose: 'info',
		shortDescriptionError : true,
		longDescriptionError : true,
		longDescriptionPosition: 'bottom'
	});

	const a11yInitial = [
		// {name: 'longDescription', is_a11y: false},
		// {name: 'shortDescription', is_a11y: false},
		// {name: 'imagePurpose', is_a11y: false}
	];

	const [isA11Y, setIsA11Y] = React.useState(a11yInitial);

	useEffect(() => {

		let value = dataField.imagePurpose;

		setImagePurposeTip(getImagePurposeTip(value));
		setImagePurposeLabel(getImagePurposeLabel(value));
		setShortDescriptionTip(getShortDescriptionTip(value));
		setLongDescriptionTip(getLongDescriptionTip(value));

		updateAccessibilityProgress(toogleShort, toogleLong);

	}, [dataField.imagePurpose]);

	useEffect(() => {
		setDisplayAltGroup(toogleShort ? 'none' : 'initial');

	}, [toogleShort]);

	useEffect(() => {
		setDisplayAltLong(toogleLong ? 'none' : 'initial');
	}, [toogleLong]);

	useEffect(() => {
		setDataField(dataField => ({...dataField,
			shortDescription: '',
		}));
	}, [displayAltGroup]);

	useEffect(() => {
		setDataField(dataField => ({...dataField,
			shortDescription: '',
			longDescription: '',
		}));
	}, [displayAltLong]);


	const handleImagePurposeOnChange = event => {
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

		updateAccessibilityProgress(shortToogle, longToogle);

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

	function updateAccessibilityProgress(shortToogle, longToogle)
	{
		if(shortToogle) //hide shortDescription === hideLongDescription
		{
			setIsA11Y([]);
		}
		else if(!longToogle)
		{
			setIsA11Y([
				{name: 'shortDescription', is_a11y: false},
				{name: 'longDescription', is_a11y: false},
			]);
		}
		else
		{
			setIsA11Y([
				{name: 'shortDescription', is_a11y: false},
			]);
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
			return 'Informative Images';
		case 'deco':
			return 'Decorative Images';
		case 'txt':
			return 'Images of Texts';
		case 'cplx':
			return 'Complex Images';
		default:
			return	'Error retrieving information';
		}
	}

	function getImagePurposeTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'info':
			return 'Images that graphically represent SIMPLE concepts and information, typically pictures, photos, and illustrations.';
		case 'deco':
			return 'Decorative images don’t add information to the content of a page.';
		case 'txt':
			return 'Readable text presented within an image. If the image is not a logo, avoid text in images, because genuine text is much more flexible than images: It can be resized without losing clarity, and background and text colors can be modified to suit the reading preferences of users';
		case 'cplx':
			return 'Complex images such as graphs, charts, diagrams, ilustration, maps. Complex images contain substantial information – more than can be conveyed in a short phrase or sentence.';
		default:
			return;
		}
	}

	function getShortDescriptionTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'info':
			return 'Creat at least a short description conveying the essential information presented by the image, like meaning or content that is displayed visually, which typically isn’t a literal description of the image.';
		case 'txt':
			return 'Should contain the same words as in the image.';
		case 'cplx':
			return 'Creat a short description to identify and provide a brief overview of the information.';
		default:
			return;
		}
	}

	function getLongDescriptionTip(purpose =''){
		if(purpose === '')
			purpose = dataField.imagePurpose;

		switch(purpose){
		case 'cplx':
			return 'Provide a full-text equivalent of the data or information provided in the image as the text alternative. . As a result, it is possible to remove the image content and replace it with the text alternative and no functionality or information would be lost.';
		default:
			return;
		}
	}

	return  {
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
