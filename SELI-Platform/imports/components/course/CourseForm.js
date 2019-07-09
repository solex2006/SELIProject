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
    }
  }

  handleChangeCategory = name => event => {
    this.setState({
      category: event.target.value,
    }, () => {
      this.props.setCourseCategory(this.state.category);
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
      course.image = this.state.imageInformation;
      course.sylabus = this.state.fileInformation;
      this.props.saveCourse(course);
      return true;
    }

    return false;
  }

  getImageFileInformation(fileInformation){
    this.setState({
      imageInformation: fileInformation,
    });
  }

  removeImageFileInformation(){
    this.setState({
      imageInformation: [],
    });
  }

  resetImageFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  getFileInformation(fileInformation){
    this.setState({
      fileInformation: fileInformation,
    });
  }

  removeFileInformation(){
    this.setState({
      fileInformation: [],
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  setItems(picked, type, action){
    let items;
    let added;
    if(type === 'methodology'){
      added = this.props.addedMethodologyItems;
      items = this.props.methodologyItems;
    }
    if(type === 'modality'){
      added = this.props.addedModalityItems;
      items = this.props.modalityItems;
    }
    for (var i = 0; i < picked.length; i++) {
      if(action === 'remove'){
        this.filterArray(picked[i], added);
        items.push(picked[i]);
      }
      if(action === 'add'){
        added.push(picked[i]);
        this.filterArray(picked[i], items);
      }
    }
  }

  setAll(type, action) {
    let items;
    let added;
    if(type === 'methodology'){
      added = this.props.addedMethodologyItems;
      items = this.props.methodologyItems;
    }
    if(type === 'modality'){
      added = this.props.addedModalityItems;
      items = this.props.modalityItems;
    }
    if(action === 'add'){
      for (var i = 0; i < items.length; i++) {
        added.push(items[i]);
      }
      items.splice(0);
    }
    if(action === 'remove'){
      for (var i = 0; i < added.length; i++) {
        items.push(added[i]);
      }
      added.splice(0);
    }
  }

  filterArray(filterItem, filterList){
    let removeIndex = filterList.indexOf(filterItem);
    filterList.splice(removeIndex, 1);
  }

  generateCourseCreatorKey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  componentDidMount() {
    this.props.setCourseTemporalKey(this.generateCourseCreatorKey(15));
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
        <div className="input-container">
          <TextField
            id="outlined-select-currency"
            select
            label="Category"
            fullWidth
            required
            value={this.state.category}
            onChange={this.handleChangeCategory('category')}
            SelectProps={{
              MenuProps: {

              },
            }}
            margin="normal"
            variant="outlined"
          >
            {this.props.categories.map(option => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="input-file-container">
          <FileUpload
            parentId={this.props.courseKey + "-image-course"}
            accept="image/*"
            label="Upload course image"
            uploadedTitle="Course sylabus"
            icon=""
            collection={CourseFilesCollection}
            removeFunction="RemoveCourseFile"
            type="image"
            preview={true}
            dowload={false}
            open={false}
            delete={true}
            showIcon={false}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetFile={this.resetImageFile.bind(this)}
            getFileInformation={this.getImageFileInformation.bind(this)}
            removeFileInformation={this.removeImageFileInformation.bind(this)}
          />
        </div>
        <div className="input-file-container">
          <FileUpload
            parentId={this.props.courseKey + "-file-pdf-course"}
            accept=".pdf"
            label="Upload sylabus"
            uploadedTitle="Course sylabus"
            icon="pdf-g.svg"
            collection={CourseFilesCollection}
            removeFunction="RemoveCourseFile"
            type="pdf"
            preview={false}
            dowload={false}
            open={true}
            delete={true}
            showIcon={true}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetFile={this.resetFile.bind(this)}
            getFileInformation={this.getFileInformation.bind(this)}
            removeFileInformation={this.removeFileInformation.bind(this)}
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
              items={this.props.modalityItems}
              added={this.props.addedModalityItems}
              type="modality"
              setItems={this.setItems.bind(this)}
              setAll={this.setAll.bind(this)}
            />
          </div>
        </div>
        <div className="input-list-container">
          <p className="list-input-label">Methodology</p>
          <div className="transfer-list-container">
            <TransferList
              items={this.props.methodologyItems}
              added={this.props.addedMethodologyItems}
              type="methodology"
              setItems={this.setItems.bind(this)}
              setAll={this.setAll.bind(this)}
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
