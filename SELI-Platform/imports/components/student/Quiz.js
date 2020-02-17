import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
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
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import Checkbox from '@material-ui/core/Checkbox';

const bakery=require('openbadges-bakery-v2');

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
});


class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      answers: [], //should be load at start of the componen
      panelshow: '',
      age: '',
      open: false,
      selectedtime:'',
      alert: '',
      answertest: false,
      average:'',
      successTrue:'',
      Incorrect:'',
    }
  }

  componentDidMount() {
    //console.log("numero de respuetas por pregunta", this.props.quiz.attributes.questions)
    
  }

  componentWillMount(){
    console.log("Correct",this.props.quiz.attributes.questions )
    let answers = this.state.answers;
    let controlAnswers = this.state.controlAnswers;
    let questions = this.props.quiz.attributes.questions;
    questions.map(question => {
      let answerlength=question.correctAnswers.length;
      answers.push(Array.apply(null, new Array(answerlength)).map(Boolean.prototype.valueOf,false));
    })
    this.setState({
      answers: answers,
      start: false,
      panelshow: this.props.time,
      selectedtime: this.props.time
    });
  }

  handleChange = (check,event) => {
    //console.log("check and index",this.state.selected, check , this.state.answers, 'event---', event.target.checked)
    let answers = this.state.answers;
    answers[this.state.selected][check]=event.target.checked;
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
    let selected = this.state.selected;
    selected++;
    this.setState({
      selected: selected,
      answer: '',
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
    let success=0;
    let successTrue=0;
    let Incorrect=0;
    let appprovalPercentage=0;
    let average=0;
    let NumberAnswers=0;
    let TotalAverage=0;
    let TotalCorrectTrue=0;
    let TotalIncorrect=0;
   // console.log("Answers de llegada", answers)
    //console.log("Answers verdaderas",this.props.quiz.attributes.questions)
    answers.map(((answersgroup, index)=>{
      success=0;
      successTrue=0;
      Incorrect=0;
      NumberAnswers=0;
      average=0
        answersgroup.map((IndividualAnswer,Individualindex)=>{
          NumberAnswers++
          if(IndividualAnswer===this.props.quiz.attributes.questions[index].correctAnswers[Individualindex]){
              success++;
           // console.log("Coincide para prgunta ", index, "answer ", Individualindex,"exitos ",success  )
            if((IndividualAnswer && this.props.quiz.attributes.questions[index].correctAnswers[Individualindex])===true){
              successTrue++;
            }
          }else if(IndividualAnswer===true && this.props.quiz.attributes.questions[index].correctAnswers[Individualindex]===false){
              Incorrect++;
          }
        })
        //calculate score
        if (NumberAnswers===success){ //all answers correct
            //console.log("100% Bien")
             average=100;
        }else if((successTrue===0) || (successTrue===Incorrect)){ //all answers incorrect
          //console.log("0% mal")
           average=0;
        }else if((Incorrect-successTrue)>0){
          //console.log("0% mal")
           average=0;
        }else if((Incorrect-successTrue)<0){
          let correctquiz=(this.props.quiz.attributes.questions[index].correctAnswers.filter(x => x == true).length)
          //console.log(correctquiz)
           average=(((successTrue-Incorrect)*100)/correctquiz)
         // console.log("Se calcula:", average)
        }
        TotalAverage=average+TotalAverage;
        TotalCorrectTrue=successTrue+TotalCorrectTrue;
        TotalIncorrect=Incorrect+TotalIncorrect;

    }))
    TotalAverage=(TotalAverage/answers.length)
    console.log("total", TotalAverage, TotalCorrectTrue, TotalIncorrect)
    return({score: TotalAverage, hits: TotalCorrectTrue,  Incorrect: TotalIncorrect, answers: answers, trueAnswers: this.props.quiz.attributes.questions});
  }

  handleFinish = (validate) => {
    this.setState({
      start: true,
    });
    let approved;
    if(validate) {
      if (this.validateQuiz()) { // always validate inclusive without any question resolved
        let results = this.getQuizResults(this.state.answers);
        console.log("results", results)
         results.score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
        let quiz = {
          score: results.score,
          hits: results.hits,
          approved:   approved,
          public: false,
          type: 'quiz',
          Incorrect: results.Incorrect,
          answers:results.answers,
          trueAnswers:results.trueAnswers
        }
        this.props.completeActivity(this.props.quiz.id, quiz); 
      } 
    }
     else {
      console.log("no validate..")
      let score = this.getQuizResults(this.state.answers);
      score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
      let quiz = {
        score: results.score,
          hits: results.hits,
          approved: approved,
          public: false,
          type: 'quiz',
          Incorrect: results.Incorrect,
          answers:results.answers,
          trueAnswers:results.trueAnswers
      }
      this.props.completeActivity(this.props.quiz.id, quiz);
    }
    if(approved === true){
      let badgeImage = this.props.quiz.attributes.badgeInformation.image;
      this.issueBadge(badgeImage);
      // Meteor.call("UpdateCourses", Meteor.userId, user.profile.b);

    }
    else{
      console.log("no approved");
    }
    this.props.handleClose();
  }

  issueBadge(image){
    let self = this;
    console.log(self.props);
    let buffer = CourseFilesCollection.findOne({_id: image._id });
    buffer = buffer.meta.buffer;
    var theAssertion ={
      "uid": "123456789abcdefghi987654321jklmnopqr",
      "recipient": {
        "identity": "sha256$98765edcba98765edcba98765edcba",
        "type": "email",
        "hashed": true,
        "badgeName": self.props.quiz.attributes.badgeInformation.name,
        "badgeDescription": self.props.quiz.attributes.badgeInformation.description,
        "badgeTeacher": "Teacher 1",
        "badgeCourse": "Test Course",
        "badgeStudent": "student1",
      },
      "badge": "http://issuersite.com/badge",
      "verify": {
        "url": "http://issuersite.com/assertion",
        "type": "hosted"
      },
      "issuedOn": new Date().toISOString().substring(0, 10),
      };
    var options = {
      image: buffer,
      assertion: theAssertion,
    };

    bakery.bake(options, function(err, data){
      let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
      user = user[0];
      var file = new File([data],image._id+".png",{ type: "image/png", 
                                                    ext: "png",
                                                    extension: "png",
                                                    extensionWithDot: ".png"});
      let uploadInstance = CourseFilesCollection.insert({
        file: file,
        meta: {
            locator: '',
            dateAdded: new Date(),
            isFavorite: false,
            usedInCourse: false,
            userId: '', 
            buffer: '',
          //userId: Meteor.userId() // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true // If you see issues with uploads, change this to false
      }, false);
      uploadInstance.start(); 




      let idStudent = user._id;
      let student = user.profile.fullname;
      let tutor = 'Maestro';
      let today = new Date();
      let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      let course = self.props.quiz.attributes.badgeInformation.name;
      let description = self.props.quiz.attributes.badgeInformation.description;
      let duration = '10';
      let certificateInfo = {
        idStudent: idStudent,
        name: student,
        tutor: tutor,
        date: date,
        course: course,
        description: description,
        duration: duration,
      };

      console.log(certificateInfo);

      fetch('https://201.159.223.92/datos', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificateInfo)
      }).then(res => res.json())
      .then(res => {
        console.log(res);
        if(res === "se genero el certificado con exito en 201.159.223.92"){
          this.setState({
            certificateCreated: true,
            certificateError: false,
            certificateDialogOpen: true,
          });
        }else{
          this.setState({
            certificateCreated: false,
            certificateError: true,
            certificateErrorDialogOpen: true,
          });
        }
      });
  

    },self)


   
  }
  showFinishConfirmation = () => {
    this.setState({
      showFinishConfirmation: true,
    })
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
    })

    if(seconds==0 && minutes==1 && hours==0){
      this.setState({
        alert: 'alert',
      })
    }
  }

  stoptime= ()=>{
    this.setState({
      panelshow: 'stop'
    })
  }

  adjust = () => {
    this.setState({
      panelshow: 'adjust'
    })
  }
  handleChangeselector = event => {
     let time=(event.target.value*this.props.time)
    this.setState({
        age: event.target.value,
        selectedtime: time,
        panelshow: 'cambio'
      }) 
    };

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

 

  cambio=(time)=>{
    //console.log("Cambio a: ", time, this.state.panelshow)
    const { classes } = this.props;
    return(
      <div key={time}>
        <TimerMachine 
            timeStart={time} // start at 10 seconds
            timeEnd={0} // end at 20 seconds
            started={true}
            paused={this.state.start}
            countdown={true} // use as stopwatch
            interval={1000} // tick every 1 second
            formatTimer={(time, ms) =>
              moment.duration(ms, "milliseconds").format("hh:mm:ss", {
                trim: false
              })
            }
            onTick={time =>
              this.handleTick(time)
            }
            onComplete={time =>
              this.handleFinish(false)
            }
          />
          <div className={classes.root }>
              <LinearProgress />
              <LinearProgress color="secondary" />
            </div>
          <Button onClick={()=>this.reload()} className="timebutton">{this.props.language.startVerb}</Button>
      </div>
    )
  }

  reload = () => {
    let selected = this.state.selected;
    
  }

  alerta =() =>{
    return(
      <div className="sign-actions1">
        <React.Fragment className="alert" >
            <DialogTitle className="success-dialog-title" id="alert-dialog-title">
              {this.props.language.warningTime}
            </DialogTitle>
            <div className="center-row">
            <Button onClick={()=>this.handleClosepublish()} variant="contained"  color="secondary" className="bar-button"
            >
              {this.props.language.continue}
            </Button>	
            <Button onClick={()=>this.handleMoreTime()} variant="contained"  color="primary" className="bar-button"
            >
              {this.props.language.moreTime}
            </Button>	                 
            </div>
        </React.Fragment>
      </div>

    )
  }
  handleClosepublish = () => {
    this.setState({ alert: 'cierra' });
  }
  handleMoreTime = () =>{
    this.setState({ 
      alert: 'cierra',
      panelshow: 'adjust'
  });

  }
  render() {
    const { classes } = this.props;
    //console.log("vuelve ajsutar", this.state.selectedtime)
    return(
      <div className="quiz-dashboard-container">
        {
          Number.isNaN(this.state.selectedtime) || this.state.panelshow === 'stop' ?
          undefined
          :
          <Paper elevation={10} className="quiz-dashboard-side" >
          <p className="quiz-dashboard-primary-text">{this.props.quiz.attributes.quizTitle}</p>
          <QuestionAnswerIcon className="quiz-dashboard-icon"/>
          <p className="quiz-dashboard-label-text">{this.props.language.timeLeft}</p>
          {
            this.state.panelshow==='cambio'?
            this.cambio(this.state.selectedtime)
            :
            <div >
              <TimerMachine 
                timeStart={this.props.time} // start at 10 seconds
                timeEnd={0} // end at 20 seconds
                started={true}
                paused={this.state.start}
                countdown={true} // use as stopwatch
                interval={1000} // tick every 1 second
                formatTimer={(time, ms) =>
                  moment.duration(ms, "milliseconds").format("hh:mm:ss", {
                    trim: false
                  })
                }
                onTick={time =>
                  this.handleTick(time)
                }
                onComplete={time =>
                  this.handleFinish(false)
                }
              />
            <div className={classes.root }>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
          
      </div>
          }
            <Button onClick={()=>this.stoptime()} className="course-item-video-card-media-button">{this.props.language.stopTime}</Button>
            {
                this.state.panelshow==='adjust' ?
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">{this.props.language.adjustTime}</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.age}
                  onChange={this.handleChangeselector}
                >
                  <MenuItem value={2}>x2</MenuItem>
                  <MenuItem value={4}>x4</MenuItem>
                  <MenuItem value={6}>x6</MenuItem>
                  <MenuItem value={8}>x8</MenuItem>
                  <MenuItem value={10}>x10</MenuItem>
                </Select>
              </FormControl>
              :
              <Button onClick={()=>this.adjust()} className="course-item-video-card-media-button" size="small" color="primary">{this.props.language.adjustTime}</Button>
            }
        </Paper>
        }
       
        {
          this.state.alert==='alert' ?
          this.alerta()
          :
          undefined
        }

       
        <Paper elevation={8} className="quiz-dashboard-questions-container">
          <p className="question-dashboard-label-text">{this.props.language.chooseCorrectAnswer}</p>
          <Divider/>

           <div className="question-dashboard-container">
            <FormControl component="fieldset" className="question-dashboard-form-control">
              <FormLabel component="legend" className="question-dashboard-form-label">{this.props.quiz.attributes.questions[this.state.selected].questionTitle}</FormLabel>
              <RadioGroup
                aria-label="answer"
                name="answer"
                className="question-dashboard-radio-group-student"
              >
                {
                  this.props.quiz.attributes.questions[this.state.selected].answersText.map((text, index)=>{ 
                   // console.log("answertTesxt", text)
                    return(
                      <FormControlLabel
                        control={
                          <Checkbox
                              className={"question-dashboard-form-control-label"}
                              checked={this.state.answers[this.state.selected][index]===true}
                              onChange={() => this.handleChange(index,event)}
                              inputProps={{
                                'aria-label': 'primary checkbox',
                              }}  
                          />
                        }
                        label={text}
                      />
                          
                    )
                  })
                }
              </RadioGroup>
            </FormControl>
          </div>

          {
            this.state.showFinishConfirmation ?
              <div className="question-dashboard-actions">
                <p className="question-dashboard-label-text">{this.props.language.sureFinishQuiz}</p>
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
                  onClick={() => this.handleFinish(true)}
                >
                  {this.props.language.yes}
                </Button>
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
                    className="question-dashboard-button"
                    color="primary"
                    variant="contained"
                    onClick={() => this.showFinishConfirmation()}
                  >
                    {this.props.language.finish}
                  </Button>
                :
                <Button
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