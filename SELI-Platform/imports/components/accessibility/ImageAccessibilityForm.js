import React, {useState, useEffect} from 'react';
//Semantic layout
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// form componenets
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import EditorA11Y from '../tools/a11yEditor';
import Editor from '../inputs/editor/Editor';
// feedback
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import PublishIcon from '@material-ui/icons/Publish';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Help from '../tools/Help';

export default function ImageAccessibility(props) {

	//const editor = React.useRef(null);
	

	//data variable
	const [imagePurpose, setImagePurpose] = React.useState('deco');
	const [longDescription, setLongDescription] = React.useState('');
	const [shortDescription, setShortDescription] = React.useState('');
	const [longDescriptionPosition, setLongDescriptionPosition] = React.useState('bottom');

	//feedback
	const [shortDescriptionTip, setShortDescriptionTip] = React.useState(getShortDescriptionTip('deco'));
	const [longDescriptionTip, setLongDescriptionTip] = React.useState(getLongDescriptionTip('deco'));
	const [imagePurposeTip, setImagePurposeTip] = React.useState(getImagePurposeTip('deco'));
	const [imagePurposeLabel, setImagePurposeLabel] = React.useState(getImagePurposeLabel('deco'));
	
	//error states
	const [longDescriptionError, setLongDescriptionError] = React.useState(true);
	const [shortDescriptionError, setShortDescriptionError] = React.useState(true);
	
	//layout states
	const [displayAltGroup, setDisplayAltGroup] = React.useState('none');
	const [displayAltLong, setDisplayAltLong] = React.useState('none');
	
	const handleImagePurposeOnChange = event => {	
		const { name, value } = event.target;

		setImagePurpose(value);


		let toogleShort = value === 'deco';
		let toogleLong =  toogleShort || value === 'info' || value === 'txt';

		setDisplayAltLong(toogleLong ? 'none' : 'initial');
		setDisplayAltGroup(toogleShort ? 'none' : 'initial');

		if(toogleShort){
			setShortDescription('');
		}

		if(toogleLong){
			setLongDescription('');
		}

		setImagePurposeTip(getImagePurposeTip(value));
		setImagePurposeLabel(getImagePurposeLabel(value));
		setShortDescriptionTip(getShortDescriptionTip(value));
		setLongDescriptionTip(getLongDescriptionTip(value));
	};

	const handleShortDescriptionOnChange = event =>{
		setShortDescription(event.target.value);
		setShortDescriptionError(event.target.value === '');
	};

	function handleLongDescriptionOnChange (value){
		setLongDescription(value);
		setLongDescriptionError(value === '');
	};

	function LongDescriptionHasError(value ='')
	{
		let err = value === '';
		setLongDescriptionError(err);
		return err;
	}
	function getImagePurposeLabel(purpose =''){
		if(purpose === '')
			purpose = imagePurpose;

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
			return	;
		}
	}

	function getImagePurposeTip(purpose =''){
		if(purpose === '')
			purpose = imagePurpose;

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
			purpose = imagePurpose;

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
			purpose = imagePurpose;

		switch(purpose){
		case 'cplx':
			return 'Provide a full-text equivalent of the data or information provided in the image as the text alternative. . As a result, it is possible to remove the image content and replace it with the text alternative and no functionality or information would be lost.';
		default:
			return;
		}
	}

	return (

		<React.Fragment>
			<section id='image-decoration' className='accessib-form'>
				<header><h3>Function of image</h3></header>
				<FormControl component='fieldset'>
					<FormLabel component='legend' id='image-purpose-label'>Image could be configured based on the purpose of the image</FormLabel>
					<RadioGroup name='imagePurpose' 
						id='image-purpose'
						aria-labelledby='image-purpose-label' 
						aria-describedby='image-purpose-exp'
						value={imagePurpose}  
						onChange={handleImagePurposeOnChange} 
						row>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-info'
							label='Informative'
							value='info'
							control={<Radio color='primary' />}
							labelPlacement='start'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-deco'
							label='Decorative'
							value='deco'
							control={<Radio color='primary' />}
							labelPlacement='start'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-txt'
							label="Image of text"
							value='txt'
							control={<Radio color='primary' />}
							labelPlacement='start'
						/>
						<FormControlLabel
							name='imagePurpose'
							id='image-purpose-cplx'
							label="Complex images"
							value='cplx'
							control={<Radio color='primary' />}
							labelPlacement='start'
						/>
					</RadioGroup>
					<AccessibilityHelp id='image-purpose' name='imagePurpose' error={false} tip={imagePurposeTip} step={'imagePurposeHelper_'+imagePurpose} stepLabel={imagePurposeLabel} guide=''/>
				</FormControl>
			</section>


			<section id='image-text-alternatives'  className="form accessib-form" 
				style={{'display':displayAltGroup}}
			>
				<header><h3>Text alternatives to image content</h3></header>
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
							value={shortDescription} 
							onChange={handleShortDescriptionOnChange}
							error={shortDescriptionError}
						/>
						<AccessibilityHelp id='short-description-input' name='image-shortDescription' error={shortDescriptionError} tip={shortDescriptionTip}  step={'shortAltHelper_'+imagePurpose} />
					</Grid>
					<Grid  item id='long-description-container' role='grid' style={{'display' : displayAltLong}}>
						<EditorA11Y id='long-description-input'
							name='longDescription'
							label='Transcription'
							aria-describedby='long-description-exp'
							placeholder="Video transcription"
							value={longDescription} 
							onChange={handleLongDescriptionOnChange}
							error={longDescriptionError}
							required={true}
							handleError={LongDescriptionHasError}
						/>
						<AccessibilityHelp id='long-description-input' name='image-longDescription' error={longDescriptionError} step={'longAltHelper_'+imagePurpose} stepLabel='' tip={longDescriptionTip} />

						<Grid item  id='long-description-position-container' role='grid'>
							<span id='long-description-position-label'>Text position relative to image </span>
							<ToggleButtonGroup 
								name='longDescriptionPosition'
								id='long-description-position'
								aria-labelledby='long-description-position-label' 
								value={longDescriptionPosition} 
								exclusive
								size='small' 
							>
								<ToggleButton 
									key={1} 
									value='bottom' 
									onClick={() => setLongDescriptionPosition('bottom')}>
									<Tooltip title='Bottom'><HorizontalSplitIcon className='toggle-button-icon'/>
									</Tooltip>
								</ToggleButton>
								<ToggleButton 
									key={2} 
									value='top' 
									onClick={() => setLongDescriptionPosition('top')}>
									<Tooltip title='Top'><HorizontalSplitIcon style={{transform: 'rotate(180deg)'}} className='toggle-button-icon'/>
									</Tooltip>
								</ToggleButton>
							</ToggleButtonGroup>
						</Grid>
					</Grid>
				</Grid>
			</section>
		</React.Fragment>
	);
}