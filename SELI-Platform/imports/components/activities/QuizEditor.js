import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuestionForm from './QuestionForm';

export default class QuizEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuizForm: true,
      showQuestions: false,
      showQuestionForm: false,
    }
  }

  saveQuiz() {
    this.setState({
      showQuizForm: false,
      showQuestions: true,
      showQuestionForm: false,
    });
  }

  showQuestionForm() {
    this.setState({
      showQuizForm: false,
      showQuestions: true,
      showQuestionForm: true,
    });
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
                    id="outlined-uncontrolled"
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

                </div>
                <div className="add-question-button-container">
                  <Button onClick={() => this.showQuestionForm()} variant="contained" color="primary">
                    Add question
                  </Button>
                </div>
              </div>
            :
              undefined
          }
          {
            this.state.showQuestionForm ?
              <QuestionForm/>
            :
              undefined
          }
        </div>
      </div>
    );
  }
}
