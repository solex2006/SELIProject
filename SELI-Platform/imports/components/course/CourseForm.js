import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Item from '../../map/Item';
import TransferList from '../inputs/TransferList';
import ImageUpload from '../files/ImageUpload';
import FileUpload from '../files/FileUpload';

import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.course.category,
      parentId: 'creating-course',
      modalityItems: ['Distance', 'Presential', 'Semipresential'],
      methodologyItems: ['Cooperative', 'Design thinking', 'Thinking based learning', 'Competitions']
    }
  }

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value,
    }, () => {
      this.props.setCourseCategory(this.state.category);
      this.setState({
        category: this.props.course.category,
      });
    });
  };

  saveCourse(){
    if(this.getData()) {
      this.props.showForm('TutorList', true);
      this.props.showSaveTutor(true);
    }
  }

  showEmptyInputs(){
    let title = document.getElementById('course-title-input').value;
    let subtitle = document.getElementById('course-subtitle-input').value;
    let time = document.getElementById('course-time-input').value;
    let description = document.getElementById('course-description-input').value;
    let category = this.props.course.category;
    let modalities = this.props.course.modalities;
    if(title === ""){
      title = true;
    }
    else {
      title = false;
    }
    if(subtitle === ""){
      subtitle = true;
    }
    else {
      subtitle = false;
    }
    if(time === ""){
      time = true;
    }
    else {
      time = false;
    }
    if(description === ""){
      description = true;
    }
    else {
      description = false;
    }
    if(category === ""){
      category = true;
    }
    else {
      category = false;
    }
    if(modalities.length === 0){
      modalities = true;
    }
    else {
      modalities = false;
    }
    this.setState({
      titleError: title,
      subtitleError: subtitle,
      timeError: time,
      descriptionError: description,
      categoryError: category,
      modalitiesError: modalities,
    });
  }

  validateEmptyInputs(inputs){
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === "") {
        this.props.showControlMessage('Fields marked with * are required');
        this.showEmptyInputs();
        return false;
      }
    }
    if(this.props.course.modalities.length === 0){
      this.props.showControlMessage('Pls add at least one modality');
      this.showEmptyInputs();
      return false;
    }
    return true;
  }

  getData(){
    let course = {};
    let title = document.getElementById('course-title-input').value;
    let subtitle = document.getElementById('course-subtitle-input').value;
    let time = document.getElementById('course-time-input').value;
    let description = document.getElementById('course-description-input').value;
    let simpleInputs = [];
    simpleInputs.push(title);
    simpleInputs.push(subtitle);
    simpleInputs.push(time);
    simpleInputs.push(description);
    if(/*this.validateEmptyInputs(simpleInputs)*/true) {
      course.title = title;
      course.subtitle = subtitle;
      course.time = time;
      course.description = description;
      this.props.saveCourse(course);
      return true;
    }

    return false;
  }

  removeUrl(){
    this.setState({
      url: '',
      imageId: '',
    });
  }

  getImageInformation(url, id){
    this.setState({
      url: url,
      imageId: id,
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  componentWillUnmount(){
    /*let files = CourseFilesCollection.find({ meta: {parentId: "creating-course"} }, { sort: { name: 1 } }).fetch();
    for (var i = 0; i < files.length; i++) {
      Meteor.call('RemoveCourseFile', files[i]._id, function (err) {
        if (err)
        console.log(err);
      });
    }*/
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Course information</div>
          <div className="input-container">
            <TextField
              id="course-title-input"
              label="Course title"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.titleError}
              defaultValue={this.props.course.title}
            />
          </div>
          <div className="input-container">
            <TextField
              id="course-subtitle-input"
              label="Course sub title"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.subtitleError}
              defaultValue={this.props.course.subtitle}
            />
          </div>
          <div className="select-input-container">
            <FormControl
              variant="outlined"
              error={this.state.categoryError}
            >
              <InputLabel
                ref={ref => {
                    this.InputLabelRef = ref;
                }}
                htmlFor="course-category"
              >
                Course category *
              </InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleCategoryChange}
                required
                input={
                  <OutlinedInput
                    name="course-category"
                    id="course-category"
                  />
                }
              >
                <MenuItem value={0}>Informatics</MenuItem>
                <MenuItem value={1}>Pedagogy</MenuItem>
                <MenuItem value={2}>Educaional videogames</MenuItem>
                <MenuItem value={3}>Personal development</MenuItem>
                <MenuItem value={4}>English as a second</MenuItem>
                <MenuItem value={5}>Special education</MenuItem>
                <MenuItem value={6}>Computational thinking</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-file-container">
            <ImageUpload
              parentId={this.state.parentId}
              getImageInformation={this.getImageInformation.bind(this)}
              removeUrl={this.removeUrl.bind(this)}
              resetFile={this.resetFile.bind(this)}
            />
          </div>
          <div className="input-file-container">
            <FileUpload
              parentId={this.state.parentId + "-file"}
              getImageInformation={this.getImageInformation.bind(this)}
              removeUrl={this.removeUrl.bind(this)}
              resetFile={this.resetFile.bind(this)}
              accept=".pdf"
              label="Upload sylabus"
              uploadedTitle="Course sylabus"
              icon="pdf-g.svg"
            />
          </div>
          <div className="input-container">
            <TextField
              id="course-time-input"
              label="Estimated course duration"
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              }}
              inputProps={{ min: "0", max: "150", step: "1" }}
              error={this.state.timeError}
              defaultValue={this.props.course.time}
            />
          </div>
          <div className="input-container">
            <TextField
              id="course-description-input"
              label="Course description"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              multiline
              rows="3"
              error={this.state.descriptionError}
              defaultValue={this.props.course.description}
            />
          </div>
          <div className="input-list-container">
            <p className="list-input-label">Modality</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.state.modalityItems}
              />
            </div>
          </div>
          <div className="input-list-container">
            <p className="list-input-label">Methodology</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.state.methodologyItems}
              />
            </div>
          </div>
          <div className="form-button-container">
            <Button onClick={() => this.saveCourse()} className="form-button" id="upload-button" variant="contained" color="secondary">
              Save course
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
