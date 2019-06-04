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

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.course.category,
      modality: "",
      modalities: [
        {key: 0, label: "Presential"},
        {key: 1, label: "Distance"},
      ],
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

  handleModalityChange = event => {
    this.setState({
      modality: event.target.value,
    }, () => {

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
    if(this.validateEmptyInputs(simpleInputs)) {
      course.title = title;
      course.subtitle = subtitle;
      course.time = time;
      course.description = description;
      this.props.saveCourse(course);
      return true;
    }

    return false;
  }

  addModality(){
    if(this.state.modality !== ""){
      let modalityIndex = this.state.modality;
      let disabledModalities = this.state.disabledModalities;
      this.props.setModality(this.state.modalities[modalityIndex]);
    }
    else{
      this.props.showControlMessage('Please select one modality');
    }
    this.setState({
      modality: "",
    });
  }

  removeModality(key){
    this.props.removeModality(key);
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
          <div className="input-container">
            <div className="image-preview"></div>
            <Button className="main-button" id="upload-button" variant="contained" color="primary">
              Upload course image
            </Button>
          </div>
          <div className="input-container">
            <div className="file-preview"></div>
            <Button className="main-button" id="upload-button" variant="contained" color="primary">
              Upload syllabus (.pdf)
            </Button>
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
          <div className="multiple-inputs-container">
            <FormControl
              variant="outlined"
            >
              <InputLabel
                ref={ref => {
                    this.InputLabelRef = ref;
                }}
                htmlFor="course-modality"
              >
                Course modality*
              </InputLabel>
              <Select
                id="modality-select-input"
                value={this.state.modality}
                error={this.state.modalitiesError}
                onChange={this.handleModalityChange}
                required
                defaultValue={this.state.modality}
                input={
                  <OutlinedInput
                    name="course-modality"
                    id="course-modality"
                  />
                }
              >
                <MenuItem disabled value="">Modality</MenuItem>
                {this.props.disabledModalities[0] ? undefined : <MenuItem value={0}>Presential</MenuItem>}
                {this.props.disabledModalities[1] ? undefined : <MenuItem value={1}>Distance</MenuItem>}
              </Select>
            </FormControl>
            <Button onClick={() => this.addModality()} className="mutiple-button" id="upload-button" variant="contained" color="primary">
              Add
            </Button>
            <div className="input-list">
              <div className="input-list-title">Modalities</div>
              <div className="input-list-container">
                {
                  this.props.course.modalities.map((modalities) =>
                    {
                      return <Item
                        modalities={modalities}
                        key={modalities.key}
                        removeModality={this.removeModality.bind(this)}/>
                    })
                }
              </div>
            </div>
          </div>
          <div className="multiple-inputs-container">
            <TextField
              className="multiple-input"
              id="outlined-uncontrolled"
              label="Course methodology"
              margin="normal"
              variant="outlined"
              required
            />
            <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
              Add
            </Button>
            <div className="input-list">
              <div className="input-list-title">Methodologies</div>
              <div className="input-list-container"></div>
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
