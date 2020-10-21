import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];



/* const tutorialSteps2=[
	{
		labelTitle:'Guided or Free CoursePlan',
		label:'You can choose between create the course plan in SELI platform or outside the platform'
	},
	{
		labelTitle:'Template Course Spiral',
		label:"In this model, the course is organised in small units where concepts are introduced to facilitate the resolution of problems or activities by students. Each unit must introduce a concept, without going into details. In the cycle, the next unit will present the contents in more depth and additional topics can be included. Each unit must be interrelated to enable students to solve significant problems or activities presented at the beginning of the course. This model can be used in any course in which there are a large number of concepts that must be mastered together. Link for reference (http://csis.pace.edu/~bergin/PedPat1.3.html#spiral)"
	},
	{
		labelTitle:'Template Course Consistent',
		label:"To teach complex content find a complex and consistent metaphor for the topic being taught. The basis of the metaphor needs to be known to the students. This helps students relate the topic being taught to larger goals, that is, they realize how things fit together. The students need a way to think of the content as a whole. Especially when the details themselves are unfamiliar and new to them. A consistent metaphor with the content being taught and its basic elements, will help students to reflect on the content by making valid inferences when thinking about the metaphor. Link for reference (http://csis.pace.edu/~bergin/PedPat1.3.html#consistentmetaphor)"
	},
	{
		labelTitle:" Template Course ToyBox",
		label:"The content is given to the students letting them 'play' with pedagogical tools. Students work on problems and it's important to give them some examples and / or exercises to provide a rich set of experiences about what is important and what can be done to solve the problem. It can be used in several courses and at several levels. Link for reference (http://csis.pace.edu/~bergin/PedPat1.3.html#toybox)"
	},
	{
		labelTitle:"Template Course Without",
		label:"You can define your template course freely and you can insert the yourself resources."
	},
	{
		labelTitle:" Structure CourseUnit | By units ",
		label:"Organize your course by units and lessons, for example: Unit 1 - Introduction, Unit 2 - Presentation, Unit 3 - Algorithms, etc."
	},
	{
		labelTitle:"StructureCourseTopics | ByTopics",
		label:"Organize your course by topics. You have a free topics creation, for example: Extra Resources, Class 1, Class 2, Class 3, Attachments."
	},
	{
		labelTitle:" CourseSyllabus",
		label:"Outlines a lesson-by-lesson guide of class, a learning plan, the learning objectives, assessment approach, and expectations."
	},
	
] */

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
    marginTop:'5px',
   // backgroundColor: 'lightblue',
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
    maxWidth: 550,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  header1: {
	display: 'flex',
	alignItems: 'center',
	//height: 50,
	paddingLeft: theme.spacing(2),
	backgroundColor: theme.palette.background.default,
 },
 paragrap:{
   paddingRight:'10px',
   paddingLeft:'10px'
 }
}));

export default function TextMobileStepper(props) {
	console.log("FINAL ********************Props", props)
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.helpsTips.length;

  //const [tutorialSteps2, settutorialSteps2]=useState(props.helpsTips)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      
      <Paper square elevation={0} className={classes.header}>
        <Typography style={{fontWeight:'bold', fontSize: '16px'}}><p className="help-text">{props.text}</p></Typography>
      </Paper>
      <Paper square elevation={0} className={classes.header}>
        <Typography style={{fontWeight:'bold', fontSize: '16px'}}>{props.helpsTips[activeStep].labelTitle}</Typography>
      </Paper>
		<Paper className={classes.paragrap} square elevation={0} >
        <Typography style={{textAlign:'justify', fontSize: '14px'}}>{props.helpsTips[activeStep].label}</Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}
