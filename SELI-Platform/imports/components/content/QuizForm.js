import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import {validateOnlyNumbers} from '../../../lib/textFieldValidations';
import NumericInput from 'react-numeric-input';


export default class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofAnswers: 1,
      timeLimits: ['5', '10', '20', '30', '60', '90', '120', 'Without time limit'],
      approvalPercentages: ['50', '60', '70', '80', '90'],
      questionSelected: 0,
      addedQuestions: 0,
      attributes: {
        showCheckBox:false,
        quizTitle: '',
        timeLimit: '60',
        extendtime:'0',
        approvalPercentage: '50',
        numberofQuestions: 0,
        //creditResources: '',
        awardPoints: false,
        questions: [
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
          {
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
            quizTitle: '',
          },
        ],
      }
    }
  }

  handleChange = (name, index) => event => {
    console.log("Metodo HANDLE (name e index)", name, index, "evento-->", event)
    let attributes = this.state.attributes;
    if (name === 'quizTitle') {
      attributes.quizTitle = event.target.value;
      attributes.questions[this.state.questionSelected].quizTitle = event.target.value;
    }
    else if (name === 'awardPoints') {
      attributes.awardPoints = event.target.checked;
    }
    else if (name === 'timeLimit') {
      if(event >0){
        attributes.timeLimit = event; ///save the value of aproval percentage
      }else{
        console.log("Time quiz Incorrect default 60", event) //save default aproval percentage of 100
        attributes.timeLimit = 60;
      }
    }
    else if (name === 'extendedTime') {
      if(event >0){
        attributes.extendtime = event; ///save the value of extendTime
      }else{
        console.log("Time quiz Incorrect default 60", event) //save default aproval percentage of 100
        attributes.extendtime = 0;
      }
    }
    else if (name === 'approvalPercentage') {
      if(event <101 && event >0){
        attributes.approvalPercentage = event; ///save the value of aproval percentage
      }else{
        //console.log("Aproval Percentage Incorrect", event) //save default aproval percentage of 100
        attributes.approvalPercentage = 100;
      }
    }
    else if (name === 'checkTime') {
      console.log("Evento del checkbox", event.target.checked)
      if (event.target.checked===true){
        //console.log("cambia a false")

        attributes.showCheckBox= true
    
        //attributes.timeLimit='Without time limit';
      }
      else{   
          attributes.showCheckBox= false
      }
    
    } 
    else if (name === 'questionTitle') {
      attributes.questions[this.state.questionSelected].questionTitle = event.target.value;
    }
    else if(name==='numberofAnswers'){
      
      let questions=this.state.attributes.questions;
      
      if(event>index){
       
            questions[this.state.questionSelected].answersText.push('');
            questions[this.state.questionSelected].correctAnswers.push(false);
 
        }
      else if (event<index){

          questions[this.state.questionSelected].answersText.pop();

      }
    
      this.setState({
        numberofAnswers: index,
      })
    }
    else if (name === 'answersText') {
      attributes.questions[this.state.questionSelected].answersText[index] = event.target.value;
    }
    else if (name === 'correctAnswers') {
      attributes.questions[this.state.questionSelected].correctAnswers[index] = event.target.checked;
    }
    this.setState({
      attributes: attributes,
    });
  };

 myFormat=(num)=> {
    return num + '%';
}
myFormatminutes=(num)=> {
  return num + 'min';
}
  validateContent = (content) => {
    if (!this.validateQuestion(content.questions[this.state.questionSelected])) {
      this.props.handleControlMessage(true, this.props.language.completeLastQuestion);
      return false;
    }
    //else if (content.quizTitle === '' || content.creditResources === '') {
    else if (content.quizTitle === '') {
      this.props.handleControlMessage(true, this.props.language.titleAndCreditAreR);
      return false;
    }
    else if ((this.state.addedQuestions + 1) < 2) {
      this.props.handleControlMessage(true, this.props.language.atLeast2Questions);
      return false;
    }
    
    return true;
  }

  getQuizAttributes(){
    let quizContent = this.state.attributes;
    if (this.validateContent(quizContent)) {
      let questions = quizContent.questions.slice(0, (this.state.addedQuestions + 1));
      quizContent.expanded = true;
      quizContent.questions = questions;
      return quizContent;
    }
    else {
      return undefined;
    }
  }

  validateQuestion = (question) => {
    if (question.questionTitle === '') {
      this.props.handleControlMessage(true, this.props.language.titleIsR);
      return false;
    }
    for (var i = 0; i < question.answersText.length; i++) {
      if (question.answersText[i] === '') {
        this.props.handleControlMessage(true, `${this.props.language.addAnswerOfQ} ${i + 1}`);
        return false;
      }
    }
    if (!question.correctAnswers[0] && !question.correctAnswers[1] && !question.correctAnswers[2] && !question.correctAnswers[3]) {
      this.props.handleControlMessage(true, this.props.language.selectOneCorrect);
      return false;
    }
    return true;
  }

  getAddedQuestions = () => {
    let addedQuestions = 0;
    for (var i = 0; i < this.state.attributes.questions.length; i++) {
      if (this.validateQuestion(this.state.attributes.questions[i])) {
        addedQuestions++;
      }
    }
    this.setState({
      addedQuestions: addedQuestions,
    });
  }

  getAddedQuestionsEdit = () => {
    let addedQuestions = 0;
    for (var i = 0; i < this.state.attributes.questions.length; i++) {
      if (this.validateQuestion(this.state.attributes.questions[i])) {
        addedQuestions++;
      }
    }
    addedQuestions--;
    this.setState({
      addedQuestions: addedQuestions,
    });
  }

  deleteQuestion = () => {
    let index = this.state.questionSelected;
    let attributes = this.state.attributes;
    attributes.questions.splice(index, 1);
    attributes.questions.push(
      {
        correctAnswers: [false, false, false, false],
        questionTitle: '',
        answersText: ['', '', '', ''],
      },
    );
    let addedQuestions = this.state.addedQuestions;
    addedQuestions--;
    this.setState({
      attributes: attributes,
      addedQuestions: addedQuestions,
    });
  }

  handleClickQuestion = (index) => {
    if (index === this.state.questionSelected) {
      return;
    }
    else if (index < this.state.questionSelected || index < (this.state.addedQuestions + 1)) {
      this.setState({
        questionSelected: index,
      });
    }
    else if ((this.state.questionSelected + 1) === index) {
      if (this.validateQuestion(this.state.attributes.questions[this.state.questionSelected])) {
        this.getAddedQuestions();
        this.setState({
          questionSelected: index,
        });
      }
    }
  }

  componentDidMount(){ //despues del render
    this.props.getQuizAttributesFunction(() => this.getQuizAttributes());
  }

  componentWillMount(){ //se llama antes del render
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        let attributes = this.state.attributes;
        for (var i = attributes.questions.length; i < 10; i++) {
          attributes.questions.push({
            correctAnswers: [false, false, false, false],
            questionTitle: '',
            answersText: ['', '', '', ''],
          });
        }
        this.setState({
          attributes: attributes,
        }, () => {
          this.getAddedQuestionsEdit();
        });
      })
    }
  }

  render() {
    return(
      <div className="dialog-form-container">
        <div className="quiz-header-container">
          <div className="quiz-input-container">
            <TextField
              id="quiz-input"
              label={this.props.language.quizTitle}
              margin="normal"
              variant="outlined"
              className="quiz-input-title"
              required
              value={this.state.attributes.quizTitle}
              onChange={this.handleChange('quizTitle')}
              autoFocus={true}
            />
          </div>
          <div className="quiz-input-container">
          <p className="form-dialog-question-button-container-text">{this.props.language.notime}</p> 
            <FormControlLabel 
            control={
              <Checkbox
              checked={this.state.attributes.showCheckBox}
              value="checkedTime" 
              onChange={this.handleChange('checkTime')}
              inputProps={{
                'aria-label': 'primary checkbox',
              }}
            />
            } 
            //label={this.props.language.notime} 
            />
            <NumericInput
              className="quiz-inputnumeric"
              defaultValue={0}
              min={0}
              max={1000}
              value={this.state.attributes.timeLimit} //por defecto 60
              onChange={this.handleChange('timeLimit')}
              format={this.myFormatminutes}
            /> 
          </div>
          
          <div className="quiz-input-container">
            <p className="form-dialog-question-button-container-text">{this.props.language.approvalPercentage}</p> 
            
              <NumericInput
                className="quiz-inputnumeric"
                defaultValue={0}
                min={0}
                max={100}
                value={this.state.attributes.approvalPercentage}
                onChange={this.handleChange('approvalPercentage')}
                format={this.myFormat}
              />
              <p className="form-dialog-question-button-container-text">Extended Time*</p>
              <NumericInput
                className="quiz-inputnumeric"
                defaultValue={0}
                min={0}
                max={300}
                value={this.state.attributes.extendtime}
                onChange={this.handleChange('extendedTime')}
                format={this.myFormatminutes}
              />
          </div>

          <div className="center-row">
            <FormControl className="quiz-form-control" component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={this.state.attributes.awardPoints} onChange={this.handleChange('awardPoints')} value="awardPoints" />}
                  label={this.props.language.awardPoints}
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>

        <Divider/>

        <div className="form-dialog-question-button-container">
          <p className="form-dialog-question-button-container-text">{this.props.language.questions}</p>
          {this.state.attributes.questions.map((question, index) => {
            return(
              <Button
                disabled={index > (this.state.addedQuestions + 1)}
                className="form-dialog-question-button"
                color={index === this.state.questionSelected ? "primary" : undefined}
                variant={index === this.state.questionSelected ? "outlined" : undefined}
                onClick={() => this.handleClickQuestion(index)}
              >
                {index + 1}
              </Button>
            )
          })}
          <Tooltip title={this.props.language.deleteQuestion}>
            <IconButton onClick={() => this.deleteQuestion()} disabled={this.state.addedQuestions < 2} style={{marginLeft: '1vw'}} size='small'>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="form-dialog-selected-question-input-container">
          <TextField
            label={`${this.props.language.question} ${(this.state.questionSelected + 1)}`}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={this.state.attributes.questions[this.state.questionSelected].questionTitle}
            onChange={this.handleChange('questionTitle')}
          />
          <div className="quiz-input-container">
            <p className="form-dialog-question-button-container-text-select">{this.props.language.numberofAnswers}</p>
          </div>
          {
            console.log("Numeric Input", this.state.attributes.questions[this.state.questionSelected].correctAnswers.length)
           
          }
           <div className="quiz-input-container">
            <NumericInput 
              key={Math.random()}
              mobile
              defaultValue={this.state.attributes.questions[this.state.questionSelected].correctAnswers.length}
              min={1}
              max={500}
              onChange={this.handleChange('numberofAnswers', this.state.attributes.questions[this.state.questionSelected].correctAnswers.length)}
              required
            /> 
          </div>
           <div className="form-dialog-question-input-container">         
             {
              this.state.attributes.questions[this.state.questionSelected].correctAnswers.map((value,index)=>{
                //value.answersText.map((answer,index)=>{
                  console.log("question selected", this.state.attributes.questions[this.state.questionSelected])
                   return(
                    <div className="questions">
                      <TextField
                        label={`${this.props.language.answer} ${index}`}
                        margin="normal"
                        variant="outlined"
                        required
                        className="answer-input"
                        value={this.state.attributes.questions[this.state.questionSelected].answersText[index]}
                        onChange={this.handleChange('answersText',index)}
                        InputProps={{
                          endAdornment:
                          <InputAdornment position="end">
                            <Checkbox
                              //value="checkedA"
                              checked={this.state.attributes.questions[this.state.questionSelected].correctAnswers[index]}
                              onChange={this.handleChange('correctAnswers', index)}
                              inputProps={{
                                'aria-label': 'primary checkbox',
                              }}
                            />
                          </InputAdornment>,
                        }}
                      />
                    </div>
                  ) 
              })
            }
          </div> 
        </div>
      </div>
    );
  }
}
