import React, { Component } from 'react';

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

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      answers: [],
    }
  }

  componentDidMount() {
    let answers = this.state.answers;
    let controlAnswers = this.state.controlAnswers;
    let questions = this.props.quiz.attributes.questions;
    questions.map(question => {
      answers.push('');
    })
    this.setState({
      answers: answers,
      start: false,
    });
  }

  handleChange = check => {
    let answers = this.state.answers;
    answers[this.state.selected] = check;
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
        this.props.handleControlMessage(true, "You have questions with out answer");
        return false;
      }
    }
    return true;
  }

  getQuizResults = (answers) => {
    let questions = this.props.quiz.attributes.questions;
    let hits = 0;
    for (var i = 0; i < questions.length; i++) {
      if (answers[i] !== '') {
        if (questions[i].correctAnswers[parseInt(answers[i])]) {
          hits++;
        }
      }
    }
    return {score: (hits / this.props.quiz.attributes.questions.length) * 100, hits: hits};
  }

  handleFinish = (validate) => {
    this.setState({
      start: true,
    });
    if (validate) {
      if (this.validateQuiz()) {
        let results = this.getQuizResults(this.state.answers);
        let approved;
        results.score >= this.props.quiz.attributes.approvalPercentage ? approved = true : approved = false;
        let quiz = {
          score: results.score,
          hits: results.hits,
          approved: approved,
          public: false,
          type: 'quiz',
        }
        this.props.completeActivity(this.props.quiz.id, quiz ,"Quiz");
      }
    }
    else {
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
  }

  render() {
    return(
      <div className="quiz-dashboard-container">
        <Paper elevation={10} className="quiz-dashboard-side">
          <p className="quiz-dashboard-primary-text">{this.props.quiz.attributes.quizTitle}</p>
          <QuestionAnswerIcon className="quiz-dashboard-icon"/>
          <p className="quiz-dashboard-label-text">Time left</p>
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
          <CircularProgress
            className="quiz-countdown-progress"
            variant="determinate"
            value={this.state.progress}
            thickness={5.5}
            size={65}
          />
        </Paper>
        <Paper elevation={8} className="quiz-dashboard-questions-container">
          <p className="question-dashboard-label-text">Choose the correct answer</p>
          <Divider/>
          <div className="question-dashboard-container">
            <FormControl component="fieldset" className="question-dashboard-form-control">
              <FormLabel component="legend" className="question-dashboard-form-label">{this.props.quiz.attributes.questions[this.state.selected].questionTitle}</FormLabel>
              <RadioGroup
                aria-label="answer"
                name="answer"
                className="question-dashboard-radio-group"
              >
                <FormControlLabel
                  onClick={() => this.handleChange(0)}
                  className="question-dashboard-form-control-label"
                  control={<Radio color="primary"/>}
                  checked={this.state.answers[this.state.selected] === 0}
                  label={this.props.quiz.attributes.questions[this.state.selected].answersText[0]}
                />
                <FormControlLabel
                  onClick={() => this.handleChange(1)}
                  className="question-dashboard-form-control-label"
                  control={<Radio color="primary"/>}
                  checked={this.state.answers[this.state.selected] === 1}
                  label={this.props.quiz.attributes.questions[this.state.selected].answersText[1]}
                />
                <FormControlLabel
                  onClick={() => this.handleChange(2)}
                  className="question-dashboard-form-control-label"
                  control={<Radio color="primary"/>}
                  checked={this.state.answers[this.state.selected] === 2}
                  label={this.props.quiz.attributes.questions[this.state.selected].answersText[2]}
                />
                <FormControlLabel
                  onClick={() => this.handleChange(3)}
                  className="question-dashboard-form-control-label"
                  control={<Radio color="primary"/>}
                  checked={this.state.answers[this.state.selected] === 3}
                  label={this.props.quiz.attributes.questions[this.state.selected].answersText[3]}
                />
              </RadioGroup>
            </FormControl>
          </div>
          {
            this.state.showFinishConfirmation ?
              <div className="question-dashboard-actions">
                <p className="question-dashboard-label-text">Are you sure you want to finish the quiz?</p>
                <Button
                  className="question-dashboard-button"
                  color="primary"
                  onClick={() => this.cancelFinish()}
                >
                  No
                </Button>
                <Button
                  className="question-dashboard-button"
                  color="primary"
                  onClick={() => this.handleFinish(true)}
                >
                  Yes
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
                  Previous
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
                    Finish
                  </Button>
                :
                <Button
                  className="question-dashboard-button"
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleNext()}
                >
                  Next
                </Button>
              }
            </div>
          }
        </Paper>
      </div>
    )
  }
}
