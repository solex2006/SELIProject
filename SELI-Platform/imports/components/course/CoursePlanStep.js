import React , {useEffect}from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
//import SimulateButtons from "./simulate";
import Grid from "@material-ui/core/Grid";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const { skiped, handleSkip, completed, handleComplete, handleAddie, courseInformation } = props;
  const classes = useStyles();

  useEffect(() => {
    console.log("courseinformation",courseInformation)
  }, [])

  const [courseinformation, setcourseInformation]=React.useState(courseInformation)

  const [coursePlan, setCoursePlan] = React.useState("free");
  const [courseTemplate, setCourseTemplate] = React.useState("without");
  const [courseStruct, setCourseStruct] = React.useState("unit");

  // will hold a reference for our real input file
  let inputFile = "";

  const handleUploadButton = event => {
    if (event.which === 32 || event.which === 13) {
      // alert("button click redirects to input click")
      event.preventDefault();
      inputFile.click();
      return false;
    }
  };




  return (
    <React.Fragment>

      <h3>Guided Course Plan</h3>
      <FormLabel component="legend">
        How would you like to create your course?
      </FormLabel>
      <RadioGroup
        aria-label="Course Plan"
        name="coursePlan"
        value={coursePlan}
        onChange={event => {
          //setCoursePlan(event.target.value);
          let cinformation=courseinformation
          cinformation.coursePlan.guidedCoursePlan=event.target.value
          setcourseInformation(cinformation)         
        }}
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


      {coursePlan === "free" && (
        <Grid item>
          <Grid
            container
            direction="row"
            className={classes.upload}
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography>Course Syllabus (required)</Typography>
            </Grid>
            <Grid item>
              <PublishIcon />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    // onChange={handleInputFile}
                    onClick={event => {
                      if (event.which === 32 || event.which === 13) {
                        // alert("button click redirects to input click")
                        event.preventDefault();
                        inputFile.click();
                        return false;
                      }
                    }}
                    name="fileUpload"
                    ref={input => {
                      // assigns a reference so we can trigger it later
                      inputFile = input;
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      className={classes.button}
                      onClick={handleUploadButton}
                    >
                      Upload Syllabus
                    </Button>
                  </label>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    className={classes.uploadCaption}
                  >
                    Any file limitations
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
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
          </Grid>
        </Grid>
      )}
     
     
     
      {/* <FormLabel component="legend">
        Would you like to use a template?
      </FormLabel>
      <RadioGroup
        aria-label="Course Template"
        name="courseTemplate"
        value={courseTemplate}
        onChange={event => {
          setCourseTemplate(event.target.value);
        }}
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
      {courseTemplate === "without" && (
        <React.Fragment>
          <FormLabel component="legend">
            How would you like to structure your course?
          </FormLabel>
          <RadioGroup
            aria-label="Course Structure"
            name="courseStructure"
            value={courseStruct}
            onChange={event => {
              setCourseStruct(event.target.value);
            }}
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
          /> */}
        {/* </React.Fragment> */}
      //)}
    </React.Fragment>
  );
}
