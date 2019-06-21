import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuestionForm from './QuestionForm';

import Quiz from '../../map/Quiz.js';

export default class QuizEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuizForm: true,
      showQuestions: false,
      showQuestionForm: false,
      selectedQuiz: undefined,
    }
  }

  saveQuiz() {
    this.setState({
      showQuizForm: false,
      showQuestions: true,
      showQuestionForm: false,
    });
    let lesson = this.props.lesson;
    let title  = document.getElementById('quiz-title-input').value;
    let quiz = {};
    quiz.title = title;
    quiz.questions = [];
    quiz.key = lesson.key + lesson.quizes.length;
    quiz.ordinal = lesson.quizes.length + 1;
    lesson.quizes.push(quiz);
  }

  showQuestionForm() {
    this.setState({
      showQuizForm: false,
      showQuestions: true,
      showQuestionForm: true,
    });
  }

  addQuestion(question){
    this.setState({
      showQuizForm: false,
      showQuestions: true,
      showQuestionForm: false,
    });
    let quiz = this.state.selectedQuiz;
    quiz.questions.push(question);
  }

  showQuizForm(){
    this.setState({
      showQuizForm: true,
      showQuestions: false,
      showQuestionForm: false,
    });
  }

  selectQuiz(quiz){
    this.setState({
      selectedQuiz: quiz,
    });
    this.showQuestionForm();
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          {
            this.state.showQuizForm ?
              <div>
                <div className="form-subtitle">Quiz</div>
                <div className="input-container">
                  <TextField
                    id="quiz-title-input"
                    label="Quiz title"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </div>
                <div className="input-container">
                  <TextField
                    id="outlined-uncontrolled"
                    label="Quiz description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows="2"
                    className="description-input"
                  />
                </div>
                <div className="input-container">
                  <div className="image-preview"></div>
                  <Button className="main-button" id="upload-button" variant="contained" color="primary">
                    Upload quiz image
                  </Button>
                </div>
                <div className="form-button-container">
                  <Button onClick={() => this.saveQuiz()} className="form-button" id="upload-button" variant="contained" color="secondary">
                    Save quiz
                  </Button>
                </div>
              </div>
            :
              undefined
          }
          {
            this.state.showQuestions && !this.state.showQuestionForm ?
              <div>
                <div className="form-subtitle">Questions</div>
                <div className="added-question-container">
                  {
                    this.props.lesson.quizes.length ?
                      <div className="quizes-container">
                        {
                          this.props.lesson.quizes.map((quizes) =>
                            {
                              return <Quiz
                                quizes={quizes}
                                key={quizes.key}
                                selectQuiz={this.selectQuiz.bind(this)}/>
                            })
                        }
                      </div>
                    :
                    undefined
                  }
                </div>
                <div className="add-quiz-button-container">
                  <Button onClick={() => this.showQuizForm()} variant="contained" color="primary">
                    Add another quiz
                  </Button>
                </div>
                <div className="form-button-container">
                  <Button onClick={() => this.props.showForm("UnitsEditor", true)} className="form-button" id="upload-button" variant="contained" color="secondary">
                    Save quizes
                  </Button>
                </div>
              </div>
            :
              undefined
          }
          {
            this.state.showQuestionForm ?
              <QuestionForm
                addQuestion={this.addQuestion.bind(this)}
              />
            :
              undefined
          }
        </div>
      </div>
    );
  }
}
