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
import Checkbox from '@material-ui/core/Checkbox';
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
      Incorrect:''
   
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
      console.log("Answer-Length", answerlength)
      answers.push(Array.apply(null, new Array(answerlength)).map(Boolean.prototype.valueOf,false));
    })
    this.setState({
      answers: answers,
      start: false,
      panelshow: this.props.time,
      selectedtime: this.props.time
    });

    console.log("despues el anaswer",this.state.answers)

  }

  handleChange = (check,event) => {
    console.log("check and index",this.state.selected, check , this.state.answers, 'event---', event.target.checked)
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
    /* let questions = this.props.quiz.attributes.questions;
    let hits = 0;
    for (var i = 0; i < questions.length; i++) {
      if (answers[i] !== '') {
        if (questions[i].correctAnswers[parseInt(answers[i])]) {
          hits++;
        }
      }
    }
    return {score: (hits / this.props.quiz.attributes.questions.length) * 100, hits: hits}; */
    
    //new method for validate answers with multiples choices
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

    console.log("Answers de llegada", answers)
    console.log("Answers verdaderas",this.props.quiz.attributes.questions)
    answers.map(((answersgroup, index)=>{
      /* if(JSON.stringify(answersgroup)===JSON.stringify(this.props.quiz.attributes.questions[index].correctAnswers)){
      } */
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
            console.log("100% Bien")
             average=100;
        }else if((successTrue===0) || (successTrue===Incorrect)){ //all answers incorrect
          console.log("0% mal")
           average=0;
        }else if((Incorrect-successTrue)>0){
          console.log("0% mal")
           average=0;
        }else if((Incorrect-successTrue)<0){
          let correctquiz=(this.props.quiz.attributes.questions[index].correctAnswers.filter(x => x == true).length)
          console.log(correctquiz)
           average=(((successTrue-Incorrect)*100)/correctquiz)
          console.log("Se calcula:", average)
        }
        TotalAverage=average+TotalAverage;
        TotalCorrectTrue=successTrue+TotalCorrectTrue;
        TotalIncorrect=Incorrect+TotalIncorrect;
        
         
        
    }))
    TotalAverage=(TotalAverage/answers.length)
    console.log("totlaes", TotalAverage, TotalCorrectTrue, TotalIncorrect)
    return({score: TotalAverage, hits: TotalCorrectTrue,  Incorrect: TotalIncorrect});
     

  }

  handleFinish = (validate) => {
    this.setState({
      start: true,
    });
    if(validate) {
      console.log("validate..")
      if (this.validateQuiz()) { // always validate inclusive without any question resolved
        let results = this.getQuizResults(this.state.answers);
        let approved;
        console.log("results", results)
         results.score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
        
        let quiz = {
          score: results.score,
          hits: results.hits,
          approved: approved,
          public: false,
          type: 'quiz',
          Incorrect: results.Incorrect,
        }
        this.props.completeActivity(this.props.quiz.id, quiz ,"Quiz"); 
      } 
    }
     else {
      console.log("no validate..")
      let score = this.getQuizResults(this.state.answers);
      let approved;
      score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
      let quiz = {
        score: score,
        approved: approved,
        public: false,
        type: 'quiz',
      }
      this.props.completeActivity(this.props.quiz.id, quiz, "Quiz");
    }
    this.props.handleClose(); 
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
    //console.log("handleTick")
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
    this.setState({})
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
                className="question-dashboard-radio-group"
              >
                {
                  this.props.quiz.attributes.questions[this.state.selected].answersText.map((text, index)=>{ 
                    console.log("answertTesxt", text)
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
                  onClick={() => this.handlePrevious()}
                >
                  {this.props.language.previous}
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