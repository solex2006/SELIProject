import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorIcon from '@material-ui/icons/Error';
import ImageIcon from '@material-ui/icons/Image';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';

import FileUpload from '../files/FileUpload';
import ImagePreview from '../files/previews/ImagePreview';
import Library from '../tools/Library';
import Help from '../tools/Help';
import FormPreview from '../files/previews/FormPreview';

import EmailIcon from '@material-ui/icons/Email';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import {validateOnlyLetters, validateOnlyNumbers} from '../../../lib/textFieldValidations';

import {noSpecialCharacters} from '../../../lib/textFieldValidations';

export default class TutorInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorInformation: this.props.tutorInformation,
      showError: false,
      passwordToConfirm: '',
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    let tutorInformation = this.state.tutorInformation;
    if (name === 'fullname') {
      tutorInformation.fullname = event.target.value;
    }
    else if (name === 'username') {
      tutorInformation.username = event.target.value;
    }
    else if (name === 'password') {
      tutorInformation.password = event.target.value;
      this.setState({
        tutorInformation: tutorInformation,
      }, () => {
        this.state.passwordToConfirm !== '' ? this.confirmPassword() : undefined
      })
    }
    else if (name === "confirmPassword") {
      this.setState({
        passwordToConfirm: event.target.value,
      }, () => {
        this.confirmPassword();
      })
    }
    else if (name === 'biography') {
      tutorInformation.biography = event.target.value;
    }
    else if (name === 'email') {
      tutorInformation.email = event.target.value;
      if (this.state.validEmail) {
        this.setState({
          validatingEmail: false,
          validEmail: false,
          emailResult: false,
        }, () => {
          this.props.handleEmail(false);
        })
      }
    }
    else if (name === 'website') {
      tutorInformation.website = event.target.value;
    }
    else if (name === 'googleLink') {
      tutorInformation.googleLink = event.target.value;
    }
    else if (name === 'phoneNumber') {
      tutorInformation.phoneNumber = event.target.value;
    }
    else if (name === 'countryCode') {
      tutorInformation.countryCode = event.target.value;
    }
    this.setState({
      tutorInformation: tutorInformation,
    });
  };

  openFileSelector(fileType, accept){
    this.setState({
      fileType: fileType,
      accept: accept,
    }, () => {this.handleClickOpen()});
  }

  getFileInformation(file){
    this.state.fileType === "image" ?
    this.setState({
      image: file,
      showPreview: true,
      showLibrary: false,
    })
    :
    this.setState({
      sylabus: file,
      showPreview: true,
      showLibrary: false,
    })
  }

  unPickFile(){
    this.state.fileType === "image" ?
    this.setState({
      showPreview: false,
      image: undefined,
    })
    :
    this.setState({
      showPreview: false,
      sylabus: undefined,
    })
  }

  showLibrary(){
    this.setState({
      showLibrary: true,
    })
  }

  hideLibrary(){
    this.setState({
      showLibrary: false,
    })
  }

  selectFile(fileType) {
    let tutorInformation = this.state.tutorInformation;
    if (fileType === "image") {
      tutorInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        tutorInformation: tutorInformation,
      });
    }
    else {
      tutorInformation.sylabus = this.state.sylabus
      this.setState({
        showPreview: false,
        tutorInformation: tutorInformation,
      })
    }
    this.handleClose();
  }

  changeFile(type) {
    if (type === "image") {
      this.openFileSelector("image", "image/*")
    }
    else {
      this.openFileSelector("pdf", ".pdf")
    }
  }

  keyController = (event, from) => {
    if (from === "username") {
      if (event.which == 32 || event.keyCode == 32) {
        event.preventDefault();
        return false;
      }
      else {
        noSpecialCharacters(event);
      }
    }
    if (from === "email") {
      if (event.which == 13 || event.keyCode == 13) {
        this.validateEmail();
      }
    }
  }

  validateEmail = ()  => {
    if (!this.state.validatingEmail) {
      this.state.tutorInformation.email !== '' ?
        this.setState({
          validatingEmail: true,
          emailHelperMessage: 'Validating email, please wait'
        }, () => {
          Meteor.call("ValidateEmail", this.state.tutorInformation.email, (error, response) =>  {
            let message;
            response ? message = "Valid email" : message = "Invalid email";
            this.setState({
              emailResult: true,
              validEmail: response,
              emailHelperMessage: message,
            }, () => {
              this.setState({
                validatingEmail: false,
              }, () => {
                this.state.validEmail ? this.props.handleEmail(true) : this.props.handleEmail(false)
              });
            })
          });
        })
      :
      this.setState({
        emailResult: false,
        validatingEmail: false,
      })
    } else {
      console.log('validating email pls wait');
    }
  }

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.tutorInformation.password,
        passwordResult: false,
      }, () => {
        let message;
        this.state.equalPasswords ? message = "Passwords match" : message = "Passwords doesn't match";
        this.state.equalPasswords ? this.props.handlePassword(true) : this.props.handlePassword(false);
        this.setState({
          passwordHelperMessage: message,
          passwordResult: true,
        });
      })
    :
    this.setState({
      passwordResult: false,
    })
  }

  componentDidMount() {
    this.props.showErrorFunction(() => this.showError());
  }

  showError = () => {
    this.setState({
      showError: true,
    });
  }

  componentWillUnmount(){

  }

  render() {
    return(
      <div className="course-information-container">
        <div className="form-file-column">
          {
            this.state.tutorInformation.image !== undefined ?
              <FormPreview
                file={this.state.tutorInformation.image}
                type="image"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
              />
            :
            <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="secondary"><ImageSharpIcon className="form-image-icon"/>Select your profile photo</Button>
          }
          <div className="form-request-information">
            <p className="form-information-primary-text">Once you have completed the form and submitted the request, you will receive an email the moment your account has been activated.</p>
            <EmailIcon className="form-information-icon"/>
            <p className="form-information-secondary-text">Make sure you enter your email correctly.</p>
          </div>
        </div>
        <div className="form-input-column">
          <TextField
            id="name-input"
            label="Full name"
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.tutorInformation.fullname}
            onChange={this.handleChange('fullname')}
            error={this.state.showError && this.state.tutorInformation.fullname === ''}
          />
          <TextField
            id="username-input"
            label="Username"
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.tutorInformation.username}
            onChange={this.handleChange('username')}
            onKeyPress={() => this.keyController(event, 'username')}
            error={this.state.showError && this.state.tutorInformation.username === ''}
          />
          <TextField
            id="password-input"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={this.state.showError && this.state.tutorInformation.password === ''}
            onChange={this.handleChange('password')}
          />
          <TextField
            id="confirm-password-input"
            label="Confirm password"
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            disabled={this.state.tutorInformation.password === ''}
            error={this.state.showError && this.state.passwordToConfirm === ''}
            required
            onChange={this.handleChange('confirmPassword')}
            helperText={
              this.state.passwordResult ?
                <div className="form-helper-container">
                  {
                    this.state.equalPasswords ?
                      <div className="success-helper-text">
                        <p>{this.state.passwordHelperMessage}</p>
                      </div>
                    :
                    <div className="error-helper-text">
                      <p>{this.state.passwordHelperMessage}</p>
                    </div>
                  }
                </div>
              :
              undefined
            }
          />
          <TextField
            id="biography-input"
            label="Biography"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.tutorInformation.biography}
            onChange={this.handleChange('biography')}
            error={this.state.showError && this.state.tutorInformation.biography === ''}
          />
          <TextField
            id="email-input"
            label="Email"
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.tutorInformation.email}
            onChange={this.handleChange('email')}
            onBlur={() => this.validateEmail()}
            onKeyPress={() => this.keyController(event, 'email')}
            error={this.state.showError && this.state.tutorInformation.email === ''}
            helperText={
              <div>
                {
                  this.state.emailResult && !this.state.validatingEmail ?
                    <div className="form-helper-container">
                      {
                        this.state.validEmail ?
                          <div className="success-helper-text">
                            <p>{this.state.emailHelperMessage}</p>
                          </div>
                        :
                        <div className="error-helper-text">
                          <p>{this.state.emailHelperMessage}</p>
                        </div>
                      }
                    </div>
                  :
                  undefined
                }
                {
                  this.state.validatingEmail ?
                    <div className="form-helper-container">
                      <p>{this.state.emailHelperMessage}</p>
                      <LinearProgress className="helper-progress"/>
                    </div>
                  :
                  undefined
                }
              </div>
            }
          />
          <TextField
            id="website-input"
            label="Personal website"
            margin="normal"
            variant="outlined"
            fullWidth
            value={this.state.tutorInformation.website}
            onChange={this.handleChange('website')}
          />
          <TextField
            id="google-link-input"
            label="Google link"
            margin="normal"
            variant="outlined"
            fullWidth
            value={this.state.tutorInformation.googleLink}
            onChange={this.handleChange('googleLink')}
          />
          <div className="form-multiple-input-row">
            <TextField
              id="country-code-input"
              label="Country code"
              margin="normal"
              variant="outlined"
              className="form-multiple-input"
              value={this.state.tutorInformation.countryCode}
              onChange={this.handleChange('countryCode')}
              InputProps={{
                startAdornment: <InputAdornment position="start">{`(+)`}</InputAdornment>,
              }}
              inputProps={{ min: "1", max: "999", step: "1", maxLength: "3" }}
              onKeyPress={() => validateOnlyNumbers(event)}
            />
            <TextField
              id="phone-number-input"
              label="Phone number"
              margin="normal"
              variant="outlined"
              fullWidth
              inputProps={{ min: "1000000000", max: "9999999999", step: "1", maxLength: "10" }}
              value={this.state.tutorInformation.phoneNumber}
              onChange={this.handleChange('phoneNumber')}
              onKeyPress={() => validateOnlyNumbers(event)}
            />
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="form-dialog"
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{this.state.fileType === "image" ? "Choose or upload the course image" : "Choose or upload the course sylabus"}</DialogTitle>
          <DialogContent>
            <div className="file-form-dialog">
              {
                this.state.showLibrary ?
                  <Library
                    user={"MyUser"}
                    type={this.state.fileType}
                    getFileInformation={this.getFileInformation.bind(this)}
                    hideLibrary={this.hideLibrary.bind(this)}
                  />
                :
                <div>
                  {
                    this.state.showPreview ?
                      <div className="form-preview-container">
                        <ImagePreview
                          file={this.state.image}
                          unPickFile={this.unPickFile.bind(this)}
                        />
                      </div>
                    :
                    <div className="form-file-container">
                      <FileUpload
                        type={this.state.fileType}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label="Click the button to upload your photo"
                      />
                    </div>
                  }
                </div>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.selectFile(this.state.fileType)} disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} color="primary">
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
