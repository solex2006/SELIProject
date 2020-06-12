import React , {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormPreview from '../files/previews/FormPreview';
import FormLabel from "@material-ui/core/FormLabel";
//import SimulateButtons from "./simulate";
import Grid from "@material-ui/core/Grid";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import FeedbackHelp from "./feedback";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30em"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30em"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  upload: {
    "& svg": {
      width: "5em",
      height: "5em",
      marginRight: "0.5em"
    },
    "& $uploadCaption": {
      marginLeft: ".5em"
    },
    "& $textField": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "21.5em"
    }
  },
  uploadCaption: {},
  img: {
    // "& svg": {
    width: "5em",
    height: "5em",
    marginRight: "0.5em"
    // },
  }
}));

export default function CoursePlanStep(props) {
  const classes = useStyles();
  useEffect(()=>{
    console.log("CoursePlanStep:", props)
    setCoursePlan(courseInformation.coursePlan.guidedCoursePlan);
    setCourseTemplate(courseInformation.coursePlan.courseTemplate);
    setCourseStructure(courseInformation.coursePlan.courseStructure);
  },[])

  useEffect(()=>{// guided spiral unit
    console.log("INFO cOURSE pLAN", coursePlan, courseTemplate, courseStructure)
       if(coursePlan==='guided' && courseTemplate==='without' && (courseStructure==='unit' || courseStructure==='topic' )){
            props.validate('passCoursePlan')
        }
        else if(coursePlan==='guided' && (courseTemplate==='spiral' || courseTemplate==='consistent' || courseTemplate==='toyBox')){
          props.validate('passCoursePlan')
        }
        else if(coursePlan==='free' && (courseTemplate==='spiral' || courseTemplate==='consistent' || courseTemplate==='toyBox')){
          props.validate('passCoursePlanFree')
        }
        else if(coursePlan==='free' && courseTemplate==='without' && (courseStructure==='unit' || courseStructure==='topic' )){
          props.validate('passCoursePlanFree')
       }
        else{
          props.validate('NopassCoursePlan')
        }
  })

  const [courseInformation, setCourseInformation]=React.useState(props.courseInformation);
  const [coursePlan, setCoursePlan] = React.useState('');
  const [courseTemplate, setCourseTemplate] = React.useState('');
  const [courseStructure, setCourseStructure] = React.useState('');
  
  // will hold a reference for our real input file
  let inputFile = "";
  const handleChange = type => event => {
    let cinformation=courseInformation;
    if (type === 'coursePlan') {
      cinformation.coursePlan.guidedCoursePlan=event.target.value;
      setCoursePlan(event.target.value);
      props.updateCourseInformation(cinformation);
    } else if (type === 'courseTemplate') {
      cinformation.coursePlan.courseTemplate=event.target.value;
      setCourseTemplate(event.target.value);
    } else {
      cinformation.coursePlan.courseStructure=event.target.value;
      setCourseStructure(event.target.value);
    }
    setCourseInformation(cinformation);
  }

  const handleUploadButton = event => {
    if (event.which === 32 || event.which === 13) {
      // alert("button click redirects to input click")
      event.preventDefault();
      inputFile.click();
      return false;
    }
  };

  return (
    <div className="course-information-container">
      <div className="form-input-column">
        <h3>Guided Course Plan</h3>
        <br/>
        <FormLabel component="legend">
          How would you like to create your course?
        </FormLabel>
        <RadioGroup
          aria-label="Course Plan"
          name="coursePlan"
          value={coursePlan}
          onChange={handleChange("coursePlan")}      
        >
          <FormControlLabel value="guided" control={<Radio />} label="Guided" />
          <FormControlLabel value="free" control={<Radio />} label="Free" />
        </RadioGroup>
        <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg="Instructions goes here."
          describedBy={"i05-helper-text"}
        />
        {courseInformation.coursePlan.guidedCoursePlan === "free" && (
            courseInformation.sylabus !== undefined ?
              <FormPreview
                file={courseInformation.sylabus}
                type="pdf"
                unPickFile={props.unPickFile.bind(this)}
                changeFile={props.changeFile.bind(this)}
                courseSyllabus={props.language.courseSyllabus}
              />
            :
              <Button onClick={() => props.openFileSelector("pdf", ".pdf")} className="form-file-button" fullWidth color="secondary"><PictureAsPdfSharpIcon className="form-image-icon"/>
                {props.language.selectCourseSyllabus} <br/>
                {props.language.required}
              </Button>
        )} 
        <br/>
        <FormLabel component="legend">
          Would you like to use a template?
        </FormLabel>
        <RadioGroup
          aria-label="Course Template"
          name="courseTemplate"
          value={courseTemplate}
          onChange={handleChange("courseTemplate")}
        >
          <FormControlLabel
            value="spiral"
            control={<Radio />}
            label="Spiral Model"
          />
          <FormControlLabel
            value="consistent"
            control={<Radio />}
            label="Consistent"
          />
          <FormControlLabel value="toyBox" control={<Radio />} label="ToyBox" />
          <FormControlLabel
            value="without"
            control={<Radio />}
            label="Without template"
          />
        </RadioGroup>
        <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg="Instructions goes here."
          describedBy={"i05-helper-text"}
          stepHelp={{
            step: "textHelper",
            stepLabel: "a title"
          }}
          decisionHelp={{
            name: "cplx"
          }}
        />
        <br/>
        {courseInformation.coursePlan.courseTemplate === "without" && (
          <React.Fragment>
            <FormLabel component="legend">
              How would you like to structure your course?
            </FormLabel>
            <RadioGroup
              aria-label="Course Structure"
              name="courseStructure"
              value={courseStructure}
              onChange={handleChange('courseStructure')}
            >
              <FormControlLabel
                value="unit"
                control={<Radio />}
                label="by Unit"
              />
              <FormControlLabel
                value="topic"
                control={<Radio />}
                label="by Topic"
              />
            </RadioGroup>
            <FeedbackHelp
              validation={{
                error: false,
                errorMsg: "",
                errorType: "",
                a11y: null
              }}
              tipMsg="Instructions goes here."
              describedBy={"i05-helper-text"}
              stepHelp={{
                step: "textHelper",
                stepLabel: "a title"
              }}
            />
          </React.Fragment>
        )}
        <br/><br/><br/><br/>
      </div>
    </div>
  );
}
