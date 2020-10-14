import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import MenuItem from '@material-ui/core/MenuItem';
import Help from '../tools/Help';
import FormPreview from '../files/previews/FormPreview';
import {validateOnlyLetters, validateLettersString, onlySpaces} from '../../../lib/textFieldValidations';
import Paper from "@material-ui/core/Paper";
import InputMask from "react-input-mask";
import Input from "@material-ui/core/TextField";
import FeedbackHelp from "./feedback";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';

export default class CourseInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInformation: this.props.courseInformation,
      weekHourOption: 'hours',
      alert:"Noalert",
      modality:'',
      modality2:true
    }
  }


  componentDidMount(){
    if( this.state.courseInformation.title!='' && this.state.courseInformation.description!='' 
        && this.state.courseInformation.keyWords.length > 2 && this.state.courseInformation.image!=undefined 
        && (this.state.courseInformation.language===0 
          || this.state.courseInformation.language===1
        ||this.state.courseInformation.language===2 
        || this.state.courseInformation.language===3 
        || this.state.courseInformation.language===4)){
      this.props.validate('passInformation')
    } else {
      this.props.validate('NopassInformation')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if( this.state.courseInformation.title!='' && this.state.courseInformation.description!='' 
        && this.state.courseInformation.keyWords.length > 2 && this.state.courseInformation.image!=undefined 
        && (this.state.courseInformation.language===0 || this.state.courseInformation.language===1
        ||this.state.courseInformation.language===2 || this.state.courseInformation.language===3 || this.state.courseInformation.language===4)){
      this.props.validate('passInformation')
    } else {
      this.props.validate('NopassInformation')
    }
    if (prevProps.cancelCounter !== this.props.cancelCounter) {
      this.setState({courseInformation: this.props.courseInformation})
    }
  }

  handleChange = name => event => {
    let courseInformation = this.state.courseInformation;
    if (name === 'title') {
      courseInformation.title = event.target.value;
    }
    else if (name === 'subtitle') {
      courseInformation.subtitle = event.target.value;
    }
    else if (name === 'description') {
      courseInformation.description = event.target.value;
    }
    else if (name === 'duration') {
      var durationAux = event.target.value.split(":");
      var aux1 = durationAux[1].substring(0,1);
      var aux2 = durationAux[2].substring(0,1);
      if ((aux1 !== "_" && aux1 < 6) && (aux2 !== "_" && aux2 < 6))
      courseInformation.duration = event.target.value;
    }
    else if (name === 'durationWeeks') {
      courseInformation.durationweeks = event.target.value;
    }
    else if (name === 'language') {
      courseInformation.language = event.target.value;
    }
    this.setState({
      courseInformation: courseInformation,
    });
  };

  addKeyWord(){
    let keyWord = document.getElementById('keyWord-input').value;
    if (validateLettersString(keyWord) && !onlySpaces(keyWord))
    if(keyWord !== '') {
      let courseInformation = this.state.courseInformation;
      keyWord = keyWord.trim().split(/\s+/);
      if (keyWord.length <= 3) {
        if (courseInformation.keyWords.length < 10) {
          let finalKeyWord = '';
          keyWord[0] = keyWord[0].charAt(0).toUpperCase() + keyWord[0].slice(1);
          for (var i = 0; i < keyWord.length; i++) {
            finalKeyWord = finalKeyWord + keyWord[i];
            if (i < 2) {
              finalKeyWord = finalKeyWord + " ";
            }
          }
          let duplicate=courseInformation.keyWords.includes(finalKeyWord)
          if(duplicate){
            this.props.handleControlMessage(true, this.props.language.repeatedkeywords)
          }else{
            courseInformation.keyWords.push(finalKeyWord);
            this.setState({
              courseInformation: courseInformation,
            });
          }
        } else {
          this.props.handleControlMessage(true, this.props.language.addOneOrMore);
        }
      } else {
        this.props.handleControlMessage(true, this.props.language.keywordsMaximumMessage);
      }
    } else {
      this.props.handleControlMessage(true, this.props.language.keywordsEmptyMessage);
    }
    document.getElementById('keyWord-input').value = "";
  }

  deleteKeyWord(index) {
    let courseInformation = this.state.courseInformation;
    courseInformation.keyWords.splice(index, 1);
    this.setState({
      courseInformation: courseInformation,
    });
  }

  keyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.addKeyWord();
    }
    else {
      validateOnlyLetters(event);
    }
  }

  keyControllerFalse = (event, name) => {
    if (event.which == 13 || event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  }

  render() {
    return(
      <div className="form-input-container">
        <div className="form-input-steps">
          <h2>{this.props.language.information}</h2><br/>
          <TextField
            id="title-input"
            label={`${this.props.language.courseTitle} (${this.props.language.required})`}
            aria-label={this.props.language.textEditor_a11y_title}
            margin="normal"
            variant="outlined"
            fullWidth
            value={this.state.courseInformation.title}
            onChange={this.handleChange('title')}
          />
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.courseTitleInformation}.`}
            describedBy={"i01-helper-text"}
          />
          <TextField
            id="subtitle-input"
            label={this.props.language.courseSubtitle}
            aria-label={this.props.language.textEditor_a11y_subtitle}
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.courseSubtitleInformation}.`}
            describedBy={"i01-helper-text"}
          />
          <TextField
            id="description-input"
            label={`${this.props.language.courseDescription} (${this.props.language.required})`}
            aria-label={this.props.language.description}
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.courseDescriptionInformation}.`}
            describedBy={"i01-helper-text"}
          />
          <TextField
            id="subject-select-currency"
            select
            label={`${this.props.language.language} (${this.props.language.required})`}
            aria-label={this.props.language.language}
            value={this.state.courseInformation.language}
            onChange={this.handleChange('language')}
            fullWidth
            // required
            margin="normal"
            variant="outlined"
          >
            <MenuItem value={0}>{`${this.props.language.english} (US)`}</MenuItem>
            <MenuItem value={1}>{`${this.props.language.spanish} (ES)`}</MenuItem>
            <MenuItem value={2}>{`${this.props.language.portuguese} (PT)`}</MenuItem>
            <MenuItem value={3}>{`${this.props.language.polish} (PL)`}</MenuItem>
            <MenuItem value={4}>{`${this.props.language.turkish} (TR)`}</MenuItem>
          </TextField>
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.selectLanguageCourse}.`}
            describedBy={"i01-helper-text"}
          />
          <div className="row-input">
            <TextField
              id="keyWord-input"
              label={`${this.props.language.courseKeyWords} (${this.props.language.required})`}
              aria-label={this.props.language.courseKeyWords}
              margin="normal"
              variant="outlined"
              className="button-input"
              onKeyPress={() => this.keyController(event)}
            />
            <div className="add-keyword-button">
              <Tooltip title={this.props.language.add}>
                <Fab
                  size="small"
                  className="form-file-selected-button"
                  onClick={() => this.addKeyWord()}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
            
          </div>
          {
            this.state.courseInformation.keyWords.length ?
              <div className="chips-container">
                {this.state.courseInformation.keyWords.map((keyWord, index) => {
                  return(
                    <Chip
                      size="small"
                      avatar={<Avatar>{keyWord.charAt(0)}</Avatar>}
                      label={keyWord}
                      className="chip"
                      color="primary"
                      onDelete={() => this.deleteKeyWord(index)}
                    />
                  )
                })}
              </div>
            :
            undefined
          }
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.courseKeyWordsHelper}.`}
            describedBy={"i01-helper-text"}
          />
          <p className="form-message"> {this.props.language.courseKeyWordsHelp}
            <Help
              helper="default"
              text={this.props.language.keywordsAreUsed}
              language={this.props.language}
            />
          </p>
          <Paper className="sub-course-information" elevation={5} component="form">
            <InputMask mask="999:99:99" value={this.state.courseInformation.duration} onChange={this.handleChange('duration')}>
              {() => (
                <Input
                  id="filled-secondary"
                  label={`${this.props.language.duration} (${this.props.language.required})`}
                  aria-label={this.props.language.duration}
                  size="small"
                  className="duration-course-information"
                  onKeyPress={this.keyControllerFalse}
                  // variant="outlined"
                />
              )}
            </InputMask>
          </Paper>
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.estimatedCourseDuration}. ${this.props.language.minimumCourseDuration}.`}
            describedBy={"i01-helper-text"}
          />
          <br/>
          <Grid container >
            <Grid item xs={12} >
                <h4 >{this.props.language.modality}</h4>
            </Grid>
            <Grid item xs={12} >
            <form >
              {/* <FormLabel component="legend">
                {this.props.language.delivercontent}
              </FormLabel> */}
              <RadioGroup
                aria-label="Course delivery"
                name="coursePlan"
                value={this.state.courseInformation.modality}
                onChange={event => {
                  
                  let courseInformation = this.state.courseInformation;
                  courseInformation.modality = event.target.value;
                  this.setState({
                    courseInformation: courseInformation,
                  });
    
                  }}
              >
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label={this.props.language.online}
                />
                <FormControlLabel
                  value="hybrid"
                  control={<Radio />}
                  label={this.props.language.hybrid}
                />
              </RadioGroup>
            </form>
            </Grid>
          </Grid>
          <FeedbackHelp
            validation={{
              error: false,
              a11y: null
            }}
            tipMsg={`${this.props.language.delivercontent}.`}
            describedBy={"i01-helper-text"}
          />
          <br/>
          {
            this.state.courseInformation.image !== undefined ?
              <FormPreview
                file={this.state.courseInformation.image}
                type="image"
                unPickFile={this.props.unPickFile.bind(this)}
                changeFile={this.props.changeFile.bind(this)}
                courseSyllabus={this.props.language.courseSyllabus}
                language={this.props.language}
              />
            :
              <Button 
                onClick={() => this.props.openFileSelector("image", "image/*")}
                aria-label={this.props.language.chooseCourseImage}
                className="form-image-button" fullWidth 
                color="primary"><ImageSharpIcon 
                className="form-image-icon"
              />
                {this.props.language.selectCourseImage} <br/>
                {`(${this.props.language.required})`}
              </Button>
          }
          <br/><br/><br/>
        </div>
      </div>
    );
  }
}
