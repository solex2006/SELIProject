import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CourseInformationForm from '../course/CourseInformationForm';
import RequirementsForm from '../course/RequirementsForm';
import CourseCreatorTool from '../course/CourseCreatorTool';

const useStyles = makeStyles(theme => ({
  root: {

  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Course information', 'Requirements', 'Program'];
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return (
        <CourseInformationForm
          showControlMessage={props.showControlMessage.bind(this)}
          saveCourse={props.saveCourse.bind(this)}
          showAccesibilityForm={props.showAccesibilityForm.bind(this)}
          setCourseCategory={props.setCourseCategory.bind(this)}
          setCourseTemporalKey={props.setCourseTemporalKey.bind(this)}
          modalityItems={props.modalityItems}
          methodologyItems={props.methodologyItems}
          addedModalityItems={props.addedModalityItems}
          addedMethodologyItems={props.addedMethodologyItems}
          courseKey={props.courseKey}
          categories={props.categories}
          category={props.category}
          course={props.course}
        />
      );
    case 1:
      return (
        <RequirementsForm
          knowledgeItems={props.knowledgeItems}
          addedKnowledgeItems={props.addedKnowledgeItems}
          technilcaItems={props.technilcaItems}
          addedTechnilcaItems={props.addedTechnilcaItems}
          peopleItems={props.peopleItems}
          addedPeopleItems={props.addedPeopleItems}
        />
      );
    case 2:
      return (
        <CourseCreatorTool/>
      );
    default:
      return 'Unknown step';
  }
}

export default function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  return (
    <div className={classes.root}>
      <Stepper className="form-stepper" nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, props)}</Typography>
            <div className="stepper-button-container">
              <Button color="primary" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step: {steps[activeStep]} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="secondary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
