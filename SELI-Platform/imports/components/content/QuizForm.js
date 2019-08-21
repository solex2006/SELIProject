import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

export default class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsLimit: 8,
      questions: [
        {
          index: 1,
          correctAnswers: [false, false, false, false],
          questionText: '',
          answersText: ['', '', '', ''],
        },
      ],
      timeLimits: ['5', '10', '20', '30', '60', '90', '120'],
      timeLimit: '60',
      awardPoints: false,
    }
  }

  handleChange = name => event => {
    if (name === 'awardPoints') {
      this.setState({
        awardPoints: event.target.checked,
      });
    }
    else if (name === 'timeLimit') {
      this.setState({
        timeLimit: event.target.value,
      });
    }
    else {
      let questions = this.state.questions;
      let indexArray = name;
      indexArray = indexArray.split(",");
      questions[indexArray[1]].correctAnswers[indexArray[0]] = event.target.checked;
      this.setState({
        questions: questions,
      });
    }
  };

  textHandleChange = (name, array) => event => {
    let questions = this.state.questions;
    if (name === 'question') {
      questions[array].questionText = event.target.value;
    }
    else {
      let indexArray = array;
      indexArray = indexArray.split(",");
      questions[indexArray[1]].answersText[indexArray[0]] = event.target.value;
    }
    this.setState({
      questions: questions,
    });
    this.forceUpdate();
  };

  addQuestion(){
    let questions = this.state.questions;
    questions.push({
      index: questions.length + 1,
      correctAnswers: [false, false, false, false],
      questionText: '',
      answersText: ['', '', '', ''],
    });
    this.setState({
      questions: questions,
    }, () => {
      document.getElementById('question-' + this.state.questions.length).scrollIntoView(false);
      document.getElementById('question-form-button-container').scrollIntoView(false);
    });
  }

  removeQuestion(index){
    let questions = this.state.questions;

      questions.splice(index, 1);
      for (var i = index; i < questions.length; i++) {
        questions[i].index = questions[i].index - 1;
      }
      this.setState({
        questions: questions,
      });

  }

  clearInputs(){
    document.getElementById('quiz-input').value = "";
    document.getElementById('credit-input').value = "";
    this.setState({
      questions: [
        {
          index: 1,
          correctAnswers: [false, false, false, false],
          questionText: '',
          answersText: ['', '', '', ''],
          awardPoints: false,
        },
      ],
      timeLimit: '60',
    });
  }

  getQuizAttributes(){
    let quiz = {};
    quiz.title = document.getElementById('quiz-input').value;
    quiz.creditResources = document.getElementById('credit-input').value;
    quiz.timeLimit = this.state.timeLimit;
    quiz.awardPoints = this.state.awardPoints;
    quiz.questions = this.state.questions;
    quiz.expanded = true;
    this.clearInputs();
    return quiz;
  }

  componentDidMount(){
    this.props.getQuizAttributesFunction(() => this.getQuizAttributes());
  }

  render() {
    return(
      <div className="quiz-form">
        <TextField
          id="quiz-input"
          label="Quiz title"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <div className="question-input-container">
          <TextField
            id="credit-input"
            label="Credit resources"
            margin="normal"
            variant="outlined"
            required
            className="question-input"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Time limit"
            required
            value={this.state.timeLimit}
            onChange={this.handleChange('timeLimit')}
            SelectProps={{
              MenuProps: {

              },
            }}
            margin="normal"
            variant="outlined"
            className="question-input"
          >
            {this.state.timeLimits.map(option => (
              <MenuItem value={option}>
                {option + " minutes"}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.awardPoints}
                onChange={this.handleChange('awardPoints')}
                value="awardPoints"
                color="primary"
              />
            }
            label="Award points"
          />
        </div>
        <Divider/>
        {
          this.state.questions.map((question, index) => {
            return(
              <div key={index} id={"question-" + question.index} className="question-form">
                <div className="question-input-container">
                  <TextField
                    id={"question-input"+index}
                    label={"Question " + question.index}
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.textHandleChange('question', index)}
                    value={this.state.questions[index].questionText}
                  />
                  <IconButton
                    className="close-icon"
                    aria-label="more"
                    aria-controls="item-menu"
                    aria-haspopup="true"
                    size="medium"
                    onClick={() => this.removeQuestion(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
                <div className="question-input-container">
                  <TextField
                    id={"answer-input-1" + question.index}
                    label="Answer 1"
                    margin="normal"
                    variant="outlined"
                    required
                    className="answer-input"
                    onChange={this.textHandleChange('answer', "0," + index)}
                    value={this.state.questions[index].answersText[0]}
                  />
                  <Checkbox
                    checked={this.state.questions[index].correctAnswers[0]}
                    onChange={this.handleChange("0," + index)}
                    value="checkedA"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                  <TextField
                    id={"answer-input-2" + question.index}
                    label="Answer 2"
                    margin="normal"
                    variant="outlined"
                    required
                    className="answer-input"
                    onChange={this.textHandleChange('answer', "1," + index)}
                    value={this.state.questions[index].answersText[1]}
                  />
                  <Checkbox
                    checked={this.state.questions[index].correctAnswers[1]}
                    onChange={this.handleChange("1," + index)}
                    value="checkedA"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                </div>
                <div className="question-input-container">
                  <TextField
                    id={"answer-input-1" + question.index}
                    label="Answer 3"
                    margin="normal"
                    variant="outlined"
                    required
                    className="answer-input"
                    onChange={this.textHandleChange('answer', "2," + index)}
                    value={this.state.questions[index].answersText[2]}
                  />
                  <Checkbox
                    checked={this.state.questions[index].correctAnswers[2]}
                    onChange={this.handleChange("2," + index)}
                    value="checkedA"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                  <TextField
                    id={"answer-input-2" + question.index}
                    label="Answer 4"
                    margin="normal"
                    variant="outlined"
                    required
                    className="answer-input"
                    onChange={this.textHandleChange('answer', "3," + index)}
                    value={this.state.questions[index].answersText[3]}
                  />
                  <Checkbox
                    checked={this.state.questions[index].correctAnswers[3]}
                    onChange={this.handleChange("3," + index)}
                    value="checkedA"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                </div>
                <Divider/>
              </div>
            )
          })
        }
        {
          this.state.questions.length < this.state.questionsLimit ?
            <div id="question-form-button-container" className="question-form-button-container">
              <Fab onClick={() => this.addQuestion()} color="primary" variant="extended" aria-label="add question">
                <AddIcon/>
                Add question
              </Fab>
            </div>
          :
          <div id="question-form-button-container" className="question-form-button-container">

          </div>
        }
      </div>
    );
  }
}
