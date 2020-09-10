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
import TimePickers from './TimePicker'
import AccessibilityHelp from '../tools/AccessibilityHelp';
import BadgeUpload from '../files/BadgeUpload';
import ImagePreview from '../files/previews/ImagePreview';
import createBadge from '../badge/CreateBadge';

export default class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofAnswers: 1,
      timeLimits: ['5', '10', '20', '30', '60', '90', '120', 'Without time limit'],
      approvalPercentages: ['50', '60', '70', '80', '90'],
      questionSelected: 0,
      addedQuestions: 0,
      showBadgeOptions: false,
      attributes: {
        showCheckBox:false,
        quizTitle: '',
        timeLimit: "01:01:01",
        extendtime:'0',
        approvalPercentage: '50',
        numberofQuestions: 0,
        awardPoints: false,
        accessibility: {
          pureDecorative: false,
          percentage: 0,
        },
         badgeClass: {
          name: '',
          description: '',
          image: undefined,
          criteria: '',
        },
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

  handleChangeTimes = (name, evento)=>{
    console.log("name y event///", name, evento)
    let attributes = this.state.attributes;
    if(evento===null || evento===undefined){
      var evento="01:00"
    }
    let value= evento.split(":");
    
    if (name === 'timeLimit') {
      if(value[0] >0 || value[1]>0){
        this.setState({
          limitHelp:false
        })
        attributes.timeLimit = evento;
      }
      if(value[0] ==="00" && value[1]==="00"){
        console.log("igual acero///")
        this.setState({
          limitHelp:true
        })
        attributes.timeLimit = "00:00"
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
    
    else if (name === 'extendedTime') {
      if(event >0){
        attributes.extendtime = event; ///save the value of extendTime
      }else{
        //console.log("Time quiz Incorrect default 60", event) //save default aproval percentage of 100
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
      if(event <50){
        this.setState({
          percentageHelp:true
        })
      }
      if(event >=50){
        this.setState({
          percentageHelp:false
        })
      }
    }

    else if (name === 'checkTime') {
      //console.log("Evento del checkbox", event.target.checked)
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
        console.log("this.state.questionSelected--->", this.state.questionSelected,questions)

          questions[this.state.questionSelected].answersText.pop();
          questions[this.state.questionSelected].correctAnswers.pop();

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
    else if (name === 'badgeName') {
      attributes.badgeClass.name = event.target.value;
    }
    else if (name === 'badgeDescription') {
      attributes.badgeClass.description = event.target.value;
    }
    else if (name === 'badgeCriteria') {
      attributes.badgeClass.criteria = event.target.value;
    }
    else if (name === 'allowBadge') {
      this.setState({showBadgeOptions:!this.state.showBadgeOptions});
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
    
    let questions=[...content.questions];
    questions.filter((question,indexQuestion) =>{
      if(question.questionTitle==='' ){
        questions.splice(indexQuestion)
      }
    });
    console.log("EN LA VALIDACION---->", questions, this.state.questionSelected)
    console.log("paso5",this.validateQuestion(content.questions[this.state.questionSelected], questions, 'validation'))

    if (!this.validateQuestion(content.questions[this.state.questionSelected], questions, 'validation')) {
      //this.props.handleControlMessage(true, this.props.language.completeLastQuestion);
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
    else if ((this.state.addedQuestions + 1) < 2) {
      this.props.handleControlMessage(true, this.props.language.atLeast2Questions);
      return false;
    }
    
    return true;
  }

  getQuizAttributes(){
    console.log('getQuizAttribute')
    let quizContent = this.state.attributes;
    console.log('getQuizAttribute--->:',quizContent)
    if (this.validateContent(quizContent)) {
      let questions = quizContent.questions.slice(0, (this.state.addedQuestions + 1));
      quizContent.expanded = true;
      
      questions.filter((question,indexQuestion) =>{
        if(question.questionTitle==='' ){
          questions.splice(indexQuestion)
        }
      });
      console.log("QUESTIONS*********************",questions)
      quizContent.questions = questions;
      createBadge(quizContent.badgeClass)
      return quizContent;
    }
    else {
      return undefined;
    }
  }

  validateQuestion = (question, questions, flag) => {
    console.log("en el validation---->",question, questions,"number of questions-->" ,this.state.attributes.numberofQuestions)
   
    if(flag==='validation'){
      let flag=""
      questions.map((question, indexQuestion)=>{
        if (question.questionTitle === '') {
          this.props.handleControlMessage(true, this.props.language.titleIsR);
          console.log("paso1 ",)
          flag=false
          return false;
          
        }
        for (var i = 0; i < question.answersText.length; i++) {
          if (question.answersText[i] === '') {
            this.props.handleControlMessage(true, `${this.props.language.addAnswerOfQ} ${indexQuestion+1}`);
            console.log("paso2 ",)
            flag=false
            return false;
          
          }
        }
        if (!question.correctAnswers[0] && !question.correctAnswers[1] && !question.correctAnswers[2] && !question.correctAnswers[3]) {
          this.props.handleControlMessage(true, `${this.props.language.selectOneCorrect} ${indexQuestion+1}`);
          console.log("paso3 ",)
          flag=false
          return false;
          
        }
        console.log("pas41 ",)
        if(flag===false){
          flag=false
        }else{
          flag=true
          return true;
        }
        
      })
      if(flag!=''){
        console.log("pas4111 ",)
        return flag
      }

    }else{
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

      

  
    
  }

  getAddedQuestions = () => {
    let addedQuestions = 0;
    for (var i = 0; i < this.state.attributes.questions.length; i++) {
      if (this.validateQuestion(this.state.attributes.questions[i],this.state.attributes.questions)) {
        addedQuestions++;
      }
    }
    this.setState({
      addedQuestions: addedQuestions,
    });
  }

  getAddedQuestionsEdit = () => {
    console.log(" getAddedQuestionsEdit",this.state.attributes.questions)
    let addedQuestions = 0;
    for (var i = 0; i < this.state.attributes.questions.length; i++) {
      if (this.validateQuestion(this.state.attributes.questions[i],this.state.attributes.questions)) {
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
      if (this.validateQuestion(this.state.attributes.questions[this.state.questionSelected],this.state.attributes.questions)) {
        this.getAddedQuestions();
        this.setState({
          questionSelected: index,
        });
      }
    }
  }

  componentDidMount(){ //despues del render
    this.props.getQuizAttributesFunction(() => this.getQuizAttributes());
    console.log("nuevo", this.state)
    if(this.state.attributes.approvalPercentage <50 || this.state.attributes.timeLimit ){
      this.setState({
        percentageHelp:true,
        timeLimit:true
      })
    }else{
      this.setState({
        percentageHelp:false,
        timeLimit:false
      })
    }
  }

  componentWillMount(){ //se llama antes del render
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        let attributes = this.state.attributes;
        for (var i = attributes.questions.length; i < 10; i++) {
          attributes.questions.push({
            correctAnswers: [],
            questionTitle: '',
            answersText: [],
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
  // badge addition
  getbadgeClass(file){
    let attributes = this.state.attributes;
    attributes.badgeClass.image = file;
 
    this.setState({
      attributes: attributes,
      showPreview: true,
      showLibrary: false,
    })
    console.log(this.state.attributes.badgeClass)
    this.handleClickOpen();
  }
  unPickBadgeImage(){
    let attributes = this.state.attributes;
    attributes.badgeClass.image = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
          </div>   
          <br></br>
          <div className="quiz-input-container">   
            <p className="form-dialog-question-button-container-text">{this.props.language.timeLimit}</p> 
              <TimePickers
                value={this.state.attributes.timeLimit}
                format={"HH:mm"}
                handleChangeTimes ={this.handleChangeTimes}
                myFormat={this.myFormat}
              />
              <AccessibilityHelp idName='captions-radiogroup' error={this.state.limitHelp } tip={this.props.language.helpTimeRestriction}/>
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
            <AccessibilityHelp idName='captions-radiogroup' error={this.state.percentageHelp} tip={this.props.language.helpPercentage}/> 
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
            //console.log("Numeric Input", this.state.attributes.questions[this.state.questionSelected].correctAnswers.length)
           
          }
           <div className="quiz-input-container">
            <NumericInput 
              key={Math.random()}
              mobile
              defaultValue={this.state.attributes.questions[this.state.questionSelected].correctAnswers.length}
              min={0}
              max={500}
              onChange={this.handleChange('numberofAnswers', this.state.attributes.questions[this.state.questionSelected].correctAnswers.length)}
              required
            /> 
          </div>
           <div className="form-dialog-question-input-container">         
             {
              this.state.attributes.questions[this.state.questionSelected].correctAnswers.map((value,index)=>{
                //value.answersText.map((answer,index)=>{
                  //console.log("question selected", this.state.attributes.questions[this.state.questionSelected])
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
         {/* Badge section */}
        <Divider />
        <div className="center-row">
          <FormControl className="quiz-form-control" component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={this.handleChange('allowBadge')} value="allowBadge" />}
                label={this.state.showBadgeOptions?this.props.language.removeBadge:this.props.language.addBadge}
              />
            </FormGroup>
          </FormControl>
        </div>
         { 
            this.state.showBadgeOptions ?
            <div className="badgeCreationOptions">
              <div className="badge-form-container">
                <div className="badge-image-upload ">
                  {
                    this.state.showPreview ?
                      <div className="form-preview-container">
                        <ImagePreview
                          file={this.state.attributes.badgeClass.image}
                          language={this.props.language}
                          unPickFile={this.unPickBadgeImage.bind(this)}
                        />
                      </div>
                      :
                      <div className="form-file-container">
                        <BadgeUpload
                          type={this.state.fileType}
                          user={Meteor.userId()}
                          accept={this.state.accept}
                          getFileInformation={this.getbadgeClass.bind(this)}
                          label={this.props.language.selectBadgeImage}
                        />
                      </div>
                  }
                </div>
                {/*  */}

                <div className="badge-form-input-column">
                  <div className="sign-form">
                    <TextField
                      id="name-input"
                      label={this.props.language.name}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete={"off"}
                      required
                      value={this.state.attributes.badgeClass.name}
                      onChange={this.handleChange('badgeName')}
                      error={this.state.showError && this.state.attributes.badgeClass.name === ''}
                    />
                    <TextField
                      id="description-input"
                      label={this.props.language.description}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete={"off"}
                      required
                      multiline
                      rows={2}
                      value={this.state.attributes.badgeClass.description}
                      onChange={this.handleChange('badgeDescription')}
                      error={this.state.showError && this.state.attributes.badgeClass.description === ''}
                    />
                     <TextField
                      id="description-input"
                      label={this.props.language.criteria}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete={"off"}
                      required
                      multiline
                      rows={3}
                      value={this.state.attributes.badgeClass.criteria}
                      onChange={this.handleChange('badgeCriteria')}
                      error={this.state.showError && this.state.attributes.badgeClass.criteria === ''}
                    />
                  </div>
                </div>
              </div>
            </div>
            :
            undefined
        }
      </div>
    );
  }
}
