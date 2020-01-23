import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const hP5Steps = [
	{
		longdesc: '',
		label: 'To use your H5P activities in SELI Platform.',
		imgPath:
			'h5p-blue.png'
	},
	{
		longdesc: '',
		label: 'Open your H5P activity.',
		imgPath:
			'h5p-step1.png'
	},
	{
		longdesc: '',
		label: 'Click the embed button in the corner.',
		imgPath:
		'h5p-step2.png',
	},
	{
		longdesc: '',
		label: 'Copy all this code.',
		imgPath:
		'h5p-step3.png'
	},
	{
		longdesc: '',
		label: 'Paste in the H5P URL input.',
		imgPath:
		'h5p-step4.png'
	},
];

//steps for text style in Textform
const textStyleSteps = [
	{
		longdesc: '',
		label: 'Left align all body text.',
		imgPath:
			'text-align.png'
	},
	/*
		TODO: Add others subjects to tutorial. 
		@ValeriaFarinazzo will create tutorial content    
		{
			label: 'TO-DO.',
		},
	*/
];

//steps for image purpose selection in ImageAccessibilityForm
const imagePurposeInfoSteps = [
	{
		label: 'Images used to label other information.',
		imgPath:
			'image-info-ex01.png',
		longdesc: 'This example shows two image icons – one of a telephone, one of a fax machine. A phone number follows each image.',
	},
	{
		label: 'Images used to supplement other information',
		imgPath:
			'image-info-ex02.png',
		longdesc: 'The following image shows a dog wearing a bell. It supplements the adjacent text that explains the purpose of this bell. Note: If the text included an explanation of how the dog wears a bell, the image might be considered redundant and therefore decorative. As this isn’t mentioned in the text, the image is deemed to be informative.',
	},
	{
		label: ' Images conveying succinct information',
		imgPath:
			'image-info-ex03.png',
		longdesc: 'This simple diagram illustrates a counter-clockwise direction for unscrewing a bottle top or cap. NOTE: If more information than that of the diagram is intended to be conveyed by the image, it may be better to follow one of the approaches described in Complex images. For example, if the fact that this diagram appears on a bottle or if the shape and size of the bottle were relevant pieces of information, use a more detailed alternative text.'
	},
	{
		label: 'Images conveying an impression or emotion',
		imgPath:
			'image-info-ex04.png',
		longdesc: 'This photograph shows a happy family group. It’s a stock image so the individuals should not be identified. It’s being used to give the impression that the website or the company it represents is family-friendly.'
	}, 
	// {
	//   label: 'Images conveying file format',
	//   imgPath:
	//     'image-info-ex05.png',
	//   longdesc: 'In this example, a document is available to download in three different formats identified by format icons within text links. They have the text alternatives “HTML”, “Word document”, and “PDF” to distinguish the file type for each link:',
	// },  
];
//steps for image purpose selection in ImageAccessibilityForm
const imagePurposeDecoSteps = [
	{
		label: 'Image with adjacent text alternative',
		imgPath:
			'image-deco-ex03.png',
		longdesc: 'This picture of a sleeping dog is already sufficiently described by the adjacent text. There is no need to repeat this information',
	},
	{
		label: 'Image used for ambiance (eye-candy)',
		imgPath:
			'image-deco-ex04.png',
		longdesc: 'This image is used only to add ambiance or visual interest to the page. Note: If the purpose of this image was to identify a plant or convey other information, rather than just to improve the look of the page, it should probably be treated as informative. The author determines the purpose for the use of the image.',
	},
];
//steps for image purpose selection in ImageAccessibilityForm
const imagePurposeCplxSteps = [
	{
		label: 'Image of graph or charts',
		imgPath:
			'image-cplx-ex01.png',
		longdesc: 'A bar chart of website visitor statistic.',
	},
	{
		label: 'Diagrams and illustrations where the page text relies on the user being able to understand the image',
		imgPath:
			'image-cplx-ex02.jpg',
		longdesc: '',
	},
	{
		label: 'Maps showing locations or other information such as weather systems.',
		imgPath:
			'image-cplx-ex03.jpg',
		longdesc: '',
	},
];
//steps for image purpose selection in ImageAccessibilityForm
const imagePurposeTxtSteps = [
	{
		label: 'Styled text with decorative effect',
		imgPath:
			'image-txt-ex01.png',
		longdesc: 'This following image is used to convey a slogan text with decorative effects.',
	},
	{
		label: 'Mathematical expressions',
		imgPath:
			'image-txt-ex03.png',
		longdesc: 'The image below displays a recurring decimal number (decimal numbers that never end).',
	},
];

//steps for short description of Images
const shortAltInfoSteps = [
	{
		label: 'Images used to label other information.',
		imgPath:
			'image-info-ex01.png',
		longdesc: 'Consistent with the visual presentation, the text alternatives “Telephone:” and “Fax:” are used to identify the device associated with each number.',
	},
	{
		label: 'Images used to supplement other information',
		imgPath:
			'image-info-ex02.png',
		longdesc: 'A short text alternative is sufficient to describe the information that is displayed visually but is not explained in the text; in this case, the text alternative is “Dog with a bell attached to its collar.”',
	},
	{
		label: ' Images conveying succinct information',
		imgPath:
			'image-info-ex03.png',
		longdesc: 'The information can be described in a short sentence, so the text alternative “Push the cap down and turn it counter-clockwise (from right to left)” is given.  NOTE: An alternative technique would be to provide the instructions within the main content rather than as a text alternative to the image. This technique makes all information available in text for everyone while providing an illustration for people who prefer to view the information visually.'
	},
	{
		label: 'Images conveying an impression or emotion',
		imgPath:
			'image-info-ex04.png',
		longdesc: 'The text alternative is “We’re family-friendly” as this best describes the intended impression.'
	}, 
	// {
	//   label: 'Images conveying file format',
	//   imgPath:
	//     'image-info-ex05.png',
	//   longdesc: 'In this example, a document is available to download in three different formats identified by format icons within text links. They have the text alternatives “HTML”, “Word document”, and “PDF” to distinguish the file type for each link:',
	// },  
];
//steps for short description of Images
const shortAltTxtSteps = [
	{
		label: 'Styled text with decorative effect',
		imgPath:
			'image-txt-ex01.png',
		longdesc: 'The text alternative for this image is the same as the slogan presented in the image: “Your access to the city”. The decorative effects (stylized text and shadow) are not be described because they are not relevant.',
	},
	{
		label: 'Mathematical expressions',
		imgPath:
			'image-txt-ex03.png',
		longdesc: 'The alt text for this recurring number is “0.3333 recurring. (In the image, the recurrence is indicated by a line over the ‘3’ in the fourth decimal place.)" In this particular example, the way that the recurrence is shown is important, so it is also described in the text alternative.”',
	},
];
//steps for short description of Images
const shortAltCplxSteps = [
	{ //link to external resource (pdf or other site)
		label: 'Image of graph or charts',
		imgPath:
			'image-cplx-ex01.png',
		longdesc: 'In this example, a bar chart of website visitor statistics has the short description “Bar chart showing monthly and total visitors for the first quarter 2014 for sites 1 to 3”.',
	},
];
//steps for long description of Images
const longAltCplxSteps = [
	{ //link to external resource (pdf or other site)
		label: 'Image of graph or charts',
		imgPath:
			'image-cplx-ex01l.png',
		longdesc: 'In this example, the long description (link to external resource like pdf or web page) provides detailed information, including scales, values, relationships and trends that are represented visually. For example, the long description can point out the declining values for site 1, consistent values for site 2, and increasing values for site 3 that are encoded in the bar chart.',
	},
	{
		label: 'Description containing textual information',
		imgPath:
			'image-cplx-ex02l.png',
		longdesc: 'In this example, the head of the peacock is described using a paragraph of text that is on the web page.',
	},
	{
		label: 'Maps showing locations or other information such as weather systems.',
		imgPath:
			'image-cplx-ex03.png',
		longdesc: 'For example, consider an image that shows cloud cover and precipitation as part of a weather status report. Since the image is supplementing the rest of the weather report (that is presented in natural language - text), a less verbose description of the animation is necessary. However, if the image appears in a pedagogical setting where students are learning about cloud formations in relation to land mass, then the image ought to be described for those who can not view the image but who also want to learn the lesson.',
	},
];

//steps for link text 
const linkTextSteps =[
	{ 
		label: 'Click here',
		imgPath: 'link-click-here.png',
		longdesc: 'You could restructure your sentence to remove ‘click here’ or ‘link’ and then surround the meaningful part with the link'  
	},
	{ 
		label: 'Read more',
		imgPath: 'link-read-more.png',
	},
];

//Deafault Help
const defaultSteps = [
	{
		longdesc: '',
		label: 'Ask for the manual',
		imgPath:
			'manual.svg'
	}
];

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
		margin: 'auto',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: 'hidden',
		display: 'block',
		width: '100%',
	},
}));

export default function ImageHelpStepper(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	function getTutorialSteps(helper){
		switch(helper) {
		case 'default':
			return defaultSteps;
		case 'hp5Helper':
			return hP5Steps;
		case 'textHelper':
			return textStyleSteps;
		case 'imagePurposeHelper_info':
			return imagePurposeInfoSteps;
		case 'imagePurposeHelper_deco':
			return imagePurposeDecoSteps;
		case 'imagePurposeHelper_txt':
			return imagePurposeTxtSteps;
		case 'imagePurposeHelper_cplx':
			return imagePurposeCplxSteps;
		case 'shortAltHelper_info':
			return shortAltInfoSteps;
		case 'shortAltHelper_txt':
			return shortAltTxtSteps;
		case 'shortAltHelper_cplx':
			return shortAltCplxSteps;
		case 'longAltHelper_cplx':
			return longAltCplxSteps;
		case 'linkTextHelper':
			return linkTextSteps;
		default:
			return [];
		}
	}

	function getLabel()
	{
		const tutorial = getTutorialSteps(props.helper);
		if(tutorial !== null && tutorial.length > 0)
			return tutorial[activeStep].label;

		return 'Error on retrieve information';
	}

	function getImage()
	{
		const tutorial = getTutorialSteps(props.helper);
		if(tutorial !== null && tutorial.length > 0)
			return tutorial[activeStep].imgPath;

		return '';
	}

	function getDesc()
	{
		const tutorial = getTutorialSteps(props.helper);
		if(tutorial !== null && tutorial.length > 0)
			return tutorial[activeStep].longdesc;

		return 'Error on retrieve information';
	}

	function getLength()
	{
		const tutorial = getTutorialSteps(props.helper);
		if(tutorial !== null && tutorial.length > 0)
			return tutorial.length;

		return 1;
	}


	return (
		<div className={classes.root}>
			<Paper square elevation={0}>
				<Typography className='help-active-step-label'>{getLabel()}</Typography>
			</Paper>
			<figure>
				<img
					className='helper-image'
					src={getImage()}
					alt={getLabel()}
				/>
				<figcaption>
					{getDesc()}
				</figcaption>
			</figure>
			<MobileStepper
				steps={getLength()}
				position='static'
				variant='text'
				activeStep={activeStep}
				nextButton={
					<Button size='small' onClick={handleNext} disabled={activeStep === getLength() - 1}>
						{props.language.next}
						{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size='small' onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
						{props.language.back}
					</Button>
				}
			/>
		</div>
	);
}
