import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TimerMachine from 'react-timer-machine'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from '@material-ui/core/Select';
import moment, { min } from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Checkbox from '@material-ui/core/Checkbox';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import { Courses } from '../../../lib/CourseCollection';
import { bakeBadge} from '../badge/AwardBadge';


momentDurationFormatSetup(moment);
const useStyles = theme => ({
  root: {
    width: '79%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  lista: {
    listStyleType: "none"
  }
});


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      answers: [], //should be load at start of the component
      panelshow: '',
      age: '',
      open: false,
      alert: '',
      answertest: false,
      average: '',
      successTrue: '',
      Incorrect: '',
      extraTime: false,
      start: false,
      alertTimeValue: '',
      handleTick: '',
      extendedTime: "",
      newaddTime: "",
      selectedtime: '',
      noTime: false,
      thefocus:0,
      num:1
    }
  }

  componentDidMount() {
    console.log("datos de quiz", this.props)
    this.setState({
      start: false,
      // selectedtime: this.props.quiz.attributes.extendtime
    })
    //configure warningalerts must consider default alerts and teacher alerts
    if (this.props.time > 0) {
      if (this.props.quiz.attributes.accessibility.isA11Y === undefined) {
        let timeLimit = ((this.props.time) / (60 * 1000))
        if (timeLimit > 19) {
          this.setState({ alertTimeValue: 10 })
        } else {
          this.setState({ alertTimeValue: (timeLimit / 2) })
        }
      } else {//when is no undefined
        if (this.props.quiz.attributes.accessibility.isA11Y[1].is_a11y === true) {
          this.setState({
            extraTime: true, //see if there is extra time and put it into the state
            extendedTime: this.props.quiz.attributes.accessibility.dataField.extendedTimeValue, // in th for "hh:mm:ss"

          })
        }
        if (this.props.quiz.attributes.accessibility.isA11Y[0].is_a11y === true) {
          this.setState({
            noTime: true
          })
        }
        if (this.props.quiz.attributes.accessibility.isA11Y[2].is_a11y === false) {//when warning alert is false
          console.log("paso3")
          let timeLimit = ((this.props.time) / (60 * 1000))
          if (timeLimit > 19) {
            this.setState({ alertTimeValue: 10 })
          } else {
            this.setState({ alertTimeValue: (timeLimit / 2) })
          }
        }
        else { //when is_a11y true
          let warning = this.props.quiz.attributes.accessibility.dataField.warningAlertValue.split(":")
          let warningtime = (parseInt(warning[0]) * 60 + parseInt(warning[1]) + (parseInt(warning[2]) / 60))
          this.setState({ alertTimeValue: warningtime })
        }
      }
    } else { //time is zero we need without time for all students
      this.setState({
        panelshow: 'stop'
      })
    }

  }
  componentDidUpdate(prevProps, prevState) {

    if(prevState.showFinishConfirmation!=this.state.showFinishConfirmation){
      //console.log("sea ctualzaoasdsdasd", document.getElementById('finishquiz'))
      if(document.getElementById('finishquiz')!=null){
        document.getElementById('finishquiz').focus()
      } 

    }
    if (prevState.selectedtime !== this.state.selectedtime) {
      this.setState({ start: false })

    }
  }

  componentWillMount() {
    let answers = this.state.answers;
    let controlAnswers = this.state.controlAnswers;
    let questions = this.props.quiz.attributes.questions;

    questions.map(question => {
      let answerlength = question.correctAnswers.length;
      answers.push(Array.apply(null, new Array(answerlength)).map(Boolean.prototype.valueOf, false));
    })
    this.setState({
      answers: answers,
      panelshow: this.props.time,
      selectedtime: this.props.time
    });
  }

  handleChange = (check, event) => {
    let answers = this.state.answers;
    answers[this.state.selected][check] = event.target.checked;
    this.setState({
      answers: answers,
    });
  }

  handlePrevious = () => {
    let selected = this.state.selected;
    selected--;
    this.setState({
      selected: selected,
      answer: '',
    })
  }

  handleNext = () => {
  this.state.num=this.state.num+1
  this.setState(this.state)
  // console.log("The active element is now:before  ", this.state, this.state.selected);
  //if(this.state.num!=this.state.answers){
    document.activeElement.blur();
  
    
   // console.log("The active element is now: " + $(document.activeElement).prop('tagName'));
    //console.log("The Focus-------------------------->",this.state.thefocus)
    let selected = this.state.selected;
    selected++;
    console.log("The active element is now:before  ", this.state, this.state.selected);
    this.setState({
      selected: selected,
      answer: '',
     // thefocus: this.state.thefocus+1,
    })
  }

  validateQuiz = () => {
    for (var i = 0; i < this.state.answers.length; i++) {
      if (this.state.answers[i] === '') {
        this.props.handleControlMessage(true, this.props.language.questionsWithoutAnswers);
        return false;
      }
    }
    return true;

  }

  getQuizResults = (answers) => {
    let hits = [];
    let success = 0;
    let successTrue = 0;
    let Incorrect = 0;
    let appprovalPercentage = 0;
    let average = 0;
    let NumberAnswers = 0;
    let TotalAverage = 0;
    let TotalCorrectTrue = 0;
    let TotalIncorrect = 0;
    // console.log("Answers de llegada", answers)
    //console.log("Answers verdaderas",this.props.quiz.attributes.questions)
    answers.map(((answersgroup, index) => {
      success = 0;
      successTrue = 0;
      Incorrect = 0;
      NumberAnswers = 0;
      average = 0
      answersgroup.map((IndividualAnswer, Individualindex) => {
        NumberAnswers++
        if (IndividualAnswer === this.props.quiz.attributes.questions[index].correctAnswers[Individualindex]) {
          success++;
          // console.log("Coincide para prgunta ", index, "answer ", Individualindex,"exitos ",success  )
          if ((IndividualAnswer && this.props.quiz.attributes.questions[index].correctAnswers[Individualindex]) === true) {
            successTrue++;
          }
        } else if (IndividualAnswer === true && this.props.quiz.attributes.questions[index].correctAnswers[Individualindex] === false) {
          Incorrect++;
        }
      })
      //calculate score
      if (NumberAnswers === success) { //all answers correct
        //console.log("100% Bien")
        average = 100;
      } else if ((successTrue === 0) || (successTrue === Incorrect)) { //all answers incorrect
        //console.log("0% mal")
        average = 0;
      } else if ((Incorrect - successTrue) > 0) {
        //console.log("0% mal")
        average = 0;
      } else if ((Incorrect - successTrue) < 0) {
        let correctquiz = (this.props.quiz.attributes.questions[index].correctAnswers.filter(x => x == true).length)
        //console.log(correctquiz)
        average = (((successTrue - Incorrect) * 100) / correctquiz)
        // console.log("Se calcula:", average)
      }
      TotalAverage = average + TotalAverage;
      TotalCorrectTrue = successTrue + TotalCorrectTrue;
      TotalIncorrect = Incorrect + TotalIncorrect;

    }))
    TotalAverage = (TotalAverage / answers.length)
    console.log("total", TotalAverage, TotalCorrectTrue, TotalIncorrect)
    return ({ score: TotalAverage, hits: TotalCorrectTrue, Incorrect: TotalIncorrect, answers: answers, trueAnswers: this.props.quiz.attributes.questions });
  }

  handleFinish = (validate, type) => {
   
    if (validate) {
      if (this.validateQuiz()) { // always validate inclusive without any question resolved
        let results = this.getQuizResults(this.state.answers);
        let approved;

        results.score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
        let quiz = {
          score: results.score.toFixed(2),
          hits: results.hits,
          approved: approved,
          public: false,
          type: 'quiz',
          Incorrect: results.Incorrect,
          answers: results.answers,
          trueAnswers: results.trueAnswers
        }
        this.props.completeActivity(this.props.quiz.id, quiz);
      }
    }
    else {
      let score = this.getQuizResults(this.state.answers);
      let approved;
      score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
      let quiz = {
        score: results.score,
        hits: results.hits,
        approved: approved,
        public: false,
        type: 'quiz',
        Incorrect: results.Incorrect,
        answers: results.answers,
        trueAnswers: results.trueAnswers
      }
      this.props.completeActivity(this.props.quiz.id, quiz);
    }
    this.props.handleClose();
    let score = this.getQuizResults(this.state.answers);
    console.log(score.score);
    console.log(this.props.quiz.attributes.approvalPercentage);
    if (score.score >= this.props.quiz.attributes.approvalPercentage) {
      console.log('baking after succesful quiz');
      let badgeClass = this.props.quiz.attributes.badgeClass;
      this.issueBadge(badgeClass);
      // Meteor.call("UpdateCourses", Meteor.userId, user.profile.b);
    }
    else {
      console.log("no approved");
    }
    let approved;
    score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
    console.log(approved);
    //adding badge
    // this.persistBadge(this.props.quiz.attributes.badgeClass);

  }

  showFinishConfirmation = () => {
    
    this.setState({
      showFinishConfirmation: true,
    })
    let elemento=document.getElementById('finishquiz')
    console.log("handle finish",elemento)
    //document.getElementById('finishquiz').focus()
  }

  cancelFinish = () => {
    this.setState({
      showFinishConfirmation: false,
    })
  }

  handleTick = (time) => {
    let progress;
    let fullTime = this.props.time;
    let seconds = time.s;
    let minutes = time.m;
    let hours = time.h;
    time = seconds + minutes * 60 + hours * 3600;
    progress = (100 * time) / (fullTime / 1000);
    this.setState({
      progress: progress,
      handleTick: time
    })
    if (time === (this.state.alertTimeValue * 60)) {
      this.setState({
        alert: 'alert',
        open: true,
      })
    }


  }

  stoptime = () => {
    this.setState({
      panelshow: 'stop'
    })
  }

  adjust = () => {
    this.setState({
      panelshow: 'adjust'
    })
  }



  closeExtraTime = () => {
    this.setState({
      panelshow: 'exitExtraTime'
    })
  }


  handleClose = () => {
    this.setState({
      open: false
    })
    console.log("se cerro")
  };

  handleOpen = () => {
    this.setState({
      open: true
    })
    //console.log("se abrio")
  };

  cambio = () => {
    const { classes } = this.props;
    return (
      <div tabindex="0" key={this.state.selectedtime}>
        <TimerMachine
          timeStart={this.state.selectedtime} // start at 10 seconds
          timeEnd={0}       // end at 20 seconds
          started={true}
          paused={this.state.start}//false
          countdown={true}  // use as stopwatch
          interval={1000}   // tick every 1 second
          formatTimer={(time, ms) =>
            moment.duration(ms, "milliseconds").format("hh:mm:ss", {
              trim: false
            })
          }
          onTick={time =>
            this.handleTick(time)
          }
          onComplete={time =>
            this.handleFinish(true, "finish")
          }
        />
        <div className={classes.root}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      </div>
    )

  }
  alerta = () => {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-confirmation"
        aria-describedby="alert-dialog-confirmation"
        disableBackdropClick={true}
      >
      <DialogTitle  tabIndex="-1" className="success-dialog-title" id="alert-dialog-title">{this.props.language.warningTime}</DialogTitle>
      <DialogContent tabIndex="-1" className="success-dialog-content">
        <DialogContentText tabIndex="-1" className="success-dialog-content-text" id="alert-dialog-description">
          {this.state.dialogConfirmationContentText}
        </DialogContentText>
        <WarningIcon tabIndex="-1" className="warning-dialog-icon"/>
      </DialogContent>
      <DialogActions>
        {
          (this.state.extraTime===true && this.state.panelshow!='adjust')?
          <Button onClick={()=>this.handleMoreTime()} variant="contained"  color="primary" className="bar-button">{this.props.language.moreTime}</Button>	  
          :
          undefined
        } 
        <Button variant="outlined" onClick={()=>this.handleClosepublish()} color="primary" autoFocus>
        {this.props.language.continue}
        </Button>
      </DialogActions>
      </Dialog>
    )
  }
  handleClosepublish = () => {
    this.setState({ alert: 'cierra' });
  }
  handleMoreTime = () => {

    this.setState({
      alert: 'cierra',//nf
      open: false,
      panelshow: 'adjust',
      extraTime: false
    });
    //add more time
    let extendedtime = (this.state.extendedTime.split(":"))
    let moreTime = (this.state.handleTick + (parseInt(extendedtime[0]) * 60 * 60) + (parseInt(extendedtime[1]) * 60) + parseInt(extendedtime[2])) //seconds
    this.setState({ selectedtime: moreTime * 1000 })

  }

  // OpenBadge
  async  issueBadge(badgeClass) {
    console.log("issueBadge :  badgeClass")
    console.log(badgeClass);
    let user = Meteor.users.find({ _id: Meteor.userId() }).fetch();
    user = user[0];
    //if you want to use course info in some badge fields, but no required at the moment
    // let course = Courses.find({ "program.items.id": this.props.quiz.id }).fetch();
    // course = course[0];  
    bakeBadge(badgeClass, user).then((data) => {
      console.log(data);
      this.props.badgeInformation(data);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="quiz-dashboard-container">
        {
          Number.isNaN(this.state.selectedtime) || this.state.panelshow === 'stop' ?
            undefined
            :
            <Paper elevation={10} className="quiz-dashboard-side" >
              <p tabindex="0" className="quiz-dashboard-primary-text">{this.props.quiz.attributes.quizTitle}</p>
              <QuestionAnswerIcon className="quiz-dashboard-icon" />
              <p tabindex="0" className="quiz-dashboard-label-text">{this.props.language.timeLeft}</p>
              {
                this.cambio()
              }

              {
                this.state.extraTime === true ?
                  <Button onClick={() => this.handleMoreTime()} variant="contained" color="primary" className="bar-button1">{this.props.language.moreTime}</Button>
                  :
                  undefined
              }

              {
                (this.state.panelshow === 'adjust' && this.state.extraTime === true) ?
                  <div className="more-time alert">
                    <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                      A time of {this.props.quiz.attributes.accessibility.dataField.extendedTimeValue} was assigned *
                </DialogTitle>
                    <div className="center-row">
                    </div>

                  </div>
                  :
                  undefined
              }

              {//option for no time
                this.state.noTime === true ?
                  <Button onClick={() => this.stoptime()} className="course-item-video-card-media-button">{this.props.language.stopTime}</Button>
                  :
                  undefined
              }
            </Paper>
        }
        {
          this.state.alert === 'alert' ?
            this.alerta()
            :
            undefined
        }
        <Paper elevation={8} className="quiz-dashboard-questions-container">
          <p tabindex="0"  className="question-dashboard-label-text">{this.props.language.chooseCorrectAnswer}</p>
          <Divider />
        
          <p tabindex="0">  {this.props.quiz.attributes.questions[this.state.selected].questionTitle}</p>
              
          <div className="question-dashboard-container">
           
               


          
           <div>
              <div >
                
                  {
                      this.props.quiz.attributes.questions[this.state.selected].questionTitle!=''?
                      <FormGroup role="group" aria-labelledby={"qtitle-" + this.state.selected}>
                          <ul>
                            {
                              this.props.quiz.attributes.questions[this.state.selected].answersText.map((text, index) => {
                                return (
                                      <li className={classes.lista}>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              className={"question-dashboard-form-control-label"}
                                              checked={this.state.answers[this.state.selected][index] === true}
                                              onChange={() => this.handleChange(index, event)}
                                              /* inputProps={{
                                                'aria-label': text,
                                              }} */
                                              name={"opcao_" + index}
                                            />
                                          }
                                          label={text}
                                          
                                        />
                                      </li>
                                    
                                  
                                )
                              })
                            }
                          </ul>
                      </FormGroup>
                      :
                      undefined
                      
                      
                  }
                
                </div>
            </div>
            {/* </FormControl> */}
            

          </div>
          {
            this.state.showFinishConfirmation ?
              <div  className="question-dashboard-actions">
                <p tabindex="0" id='finishquiz'  className="question-dashboard-label-text">{this.props.language.sureFinishQuiz}</p>
                <div>
                <Button 
                  className="question-dashboard-button"
                  color="primary"
                  onClick={() => this.cancelFinish()}
                >
                  {this.props.language.no}
                </Button>
                <Button
        
                  className="question-dashboard-button"
                  color="primary"
                  onClick={() => this.handleFinish(true, "finish")}
                >
                  {this.props.language.yes}
                </Button>
                </div>
                
              </div>
              :
              <div className="question-dashboard-actions">
                {
                  this.state.selected === 0 ?
                    undefined
                    :
                    <Button
                      className="question-dashboard-button"
                      color="primary"
                      variant="contained"
                      onClick={() => this.handlePrevious()}
                    >
                      {this.props.language.previousStep}
                    </Button>
                }
                {
                  this.state.selected === this.props.quiz.attributes.questions.length - 1 ?
                    <Button
                      tabindex="0"
                      className="question-dashboard-button"
                      color="primary"
                      variant="contained"
                      onClick={() => this.showFinishConfirmation()}
                    >
                      {this.props.language.finish}
                    </Button>
                    :
                    <Button
                      tabindex="0"
                      className="question-dashboard-button"
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleNext()}
                    >
                      {this.props.language.next}
                    </Button>
                }
              </div>
          }
        </Paper>
      </div>
    )
  }
}

export default withStyles(useStyles)(Quiz)