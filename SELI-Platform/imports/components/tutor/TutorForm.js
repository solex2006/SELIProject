import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../files/ImageUpload';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { Tutors } from '../../../lib/TutorCollection';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      imageId: '',
      teacherId: 'creating',
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  showEmptyInputs(){
    let name = document.getElementById('teacher-name-input').value;
    let url = this.state.url;
    let biography = document.getElementById('teacher-biography-input').value;
    let googleLink = document.getElementById('teacher-google-link-input').value;
    let personalWebsite = document.getElementById('teacher-personal-website-input').value;
    let email = document.getElementById('teacher-email-input').value;
    let phoneNumber = document.getElementById('teacher-phone-number-input').value;
    if(name === ""){
      name = true;
    }
    else {
      name = false;
    }
    if(biography === ""){
      biography = true;
    }
    else {
      biography = false;
    }
    if(googleLink === ""){
      googleLink = true;
    }
    else {
      googleLink = false;
    }
    if(personalWebsite === ""){
      personalWebsite = true;
    }
    else {
      personalWebsite = false;
    }
    if(email === ""){
      email = true;
    }
    else {
      email = false;
    }
    if(phoneNumber === ""){
      phoneNumber = true;
    }
    else {
      phoneNumber = false;
    }
    this.setState({
      nameError: name,
      biographyError: biography,
      googleLinkError: googleLink,
      personalWebsiteError: personalWebsite,
      emailError: email,
      phoneNumberError: phoneNumber,
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
    if(this.state.url === ""){
      this.props.showControlMessage('You have to upload your profile photo');
      return false;
    }
    return true;
  }

  getData(){
    let name = document.getElementById('teacher-name-input').value;
    let biography = document.getElementById('teacher-biography-input').value;
    let googleLink = document.getElementById('teacher-google-link-input').value;
    let personalWebsite = document.getElementById('teacher-personal-website-input').value;
    let email = document.getElementById('teacher-email-input').value;
    let phoneNumber = document.getElementById('teacher-phone-number-input').value;
    let simpleInputs = [];
    simpleInputs.push(name);
    simpleInputs.push(biography);
    simpleInputs.push(googleLink);
    simpleInputs.push(personalWebsite);
    simpleInputs.push(email);
    simpleInputs.push(phoneNumber);
    if(this.validateEmptyInputs(simpleInputs)){
      let tutor = {
        name: name,
        imageId: this.state.imageId,
        imageUrl: this.state.url,
        biography: biography,
        googleLink: googleLink,
        personalWebsite: personalWebsite,
        email: email,
        phoneNumber: phoneNumber,
      }
      if(this.props.tutorToEdit){
        this.editTutor(tutor);
      }
      else{
        this.saveTutor(tutor);
      }
    }
  }

  getImageInformation(url, id){
    this.setState({
      url: url,
      imageId: id,
    });
  }

  resetInputs(){
    document.getElementById('teacher-name-input').value = "";
    document.getElementById('teacher-biography-input').value = "";
    document.getElementById('teacher-google-link-input').value = "";
    document.getElementById('teacher-personal-website-input').value = "";
    document.getElementById('teacher-email-input').value = "";
    document.getElementById('teacher-phone-number-input').value = "";
    this.setState({
      url: '',
      imageId: '',
      teacherId: 'creating',
      nameError: false,
      biographyError: false,
      googleLinkError: false,
      personalWebsiteError: false,
      emailError: false,
      phoneNumberError: false,
    });
  }

  saveTutor(tutor){
    let teacherId = Tutors.insert(tutor);
    if(teacherId) {
      let changeImageMeta = TutorFilesCollection.update(
        {_id: this.state.imageId },
        { $set: {
          meta: {
            teacherId: teacherId,
          }
        }}
      );
      if(changeImageMeta){
        this.props.showControlMessage('Teacher registered successfully', true, "TutorList");
        this.resetInputs();
      }
      else {
        this.props.showControlMessage("Could't regiter teacher. Please try again");
      }
    }
  }

  editTutor(tutor){
    if(Tutors.update(
      { _id : this.props.tutorToEdit._id },
      { $set:
        {
          name: tutor.name,
          imageId: tutor.imageId,
          imageUrl: tutor.imageUrl,
          biography: tutor.biography,
          googleLink: tutor.googleLink,
          personalWebsite: tutor.personalWebsite,
          email: tutor.email,
          phoneNumber: tutor.phoneNumber,
        }
      }
    )) {
      this.props.showControlMessage("Tutor edited successfully");
      this.props.openList();
    }
    else{
      this.props.showControlMessage("Could't edit this teacher, please try again");
    }
  }

  componentDidMount(){
    if(this.props.tutorToEdit !== undefined){
      this.setState({
        url: this.props.tutorToEdit.imageUrl,
        imageId: this.props.tutorToEdit.imageId,
        teacherId: this.props.tutorToEdit._id,
      });
    }
  }

  removeUrl(){
    this.setState({
      url: '',
      imageId: '',
    });
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Tutor information</div>
          <div className="input-container">
            <TextField
              id="teacher-name-input"
              label="Teacher name"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.name : undefined}
            />
          </div>
          <div className="input-file-container">
            <ImageUpload
              teacherId={this.state.teacherId}
              getImageInformation={this.getImageInformation.bind(this)}
              removeUrl={this.removeUrl.bind(this)}
            />
          </div>
          <div className="input-container">
            <TextField
              id="teacher-biography-input"
              label="Short biography"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              multiline
              rows="3"
              error={this.state.biographyError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.biography : undefined}
            />
          </div>
          <div className="input-container">
            <TextField
              id="teacher-google-link-input"
              label="Google link"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.googleLinkError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.googleLink : undefined}
            />
          </div>
          <div className="input-container">
            <TextField
              id="teacher-personal-website-input"
              label="Personal website"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.personalWebsiteError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.personalWebsite : undefined}
            />
          </div>
          <div className="input-container">
            <TextField
              id="teacher-email-input"
              label="Email"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.emailError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.email : undefined}
            />
          </div>
          <div className="input-container">
            <TextField
              id="teacher-phone-number-input"
              label="Phone number"
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
              required
              inputProps={{ min: "0", max: "9999999999", step: "1" }}
              error={this.state.phoneNumberError}
              defaultValue={this.props.tutorToEdit ? this.props.tutorToEdit.phoneNumber : undefined}
            />
          </div>
          {
            this.props.tutorToEdit ?
              <div className="form-button-container">
                <Button onClick={() => this.getData()} className="form-button" id="upload-button" variant="contained" color="secondary">
                  Edit tutor
                </Button>
              </div>
            :
            <div className="form-button-container">
              <Button onClick={() => this.getData()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Save tutor
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}
