import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';

import FileUpload from '../components/files/FileUpload';
import ImagePreview from '../components/files/previews/ImagePreview';
import Library from '../components/tools/Library';
import FormPreview from '../components/files/previews/FormPreview';

import EmailIcon from '@material-ui/icons/Email';
import {validateOnlyLetters, validateOnlyNumbers} from '../../lib/textFieldValidations';

import {noSpecialCharacters} from '../../lib/textFieldValidations';


export default class UserInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: this.props.userInformation,
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
    let userInformation = this.state.userInformation;
    if (name === 'fullname') {
      userInformation.fullname = event.target.value;
    }
    else if (name === 'username') {
      userInformation.username = event.target.value;
    }
    else if (name === 'password') {
      userInformation.password = event.target.value;
      this.setState({
        userInformation: userInformation,
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
      userInformation.biography = event.target.value;
    }
    else if (name === 'email') {
      userInformation.email = event.target.value;
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
      userInformation.website = event.target.value;
    }
    else if (name === 'googleLink') {
      userInformation.googleLink = event.target.value;
    }
    else if (name === 'phoneNumber') {
      userInformation.phoneNumber = event.target.value;
    }
    else if (name === 'countryCode') {
      userInformation.countryCode = event.target.value;
    }
    this.setState({
      userInformation: userInformation,
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
    let userInformation = this.state.userInformation;
    if (fileType === "image") {
      userInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        userInformation: userInformation,
      });
    }
    else {
      userInformation.sylabus = this.state.sylabus
      this.setState({
        showPreview: false,
        userInformation: userInformation,
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
      this.state.userInformation.email !== '' ?
        this.setState({
          validatingEmail: true,
          emailHelperMessage: this.props.language.validatingEmail,
        }, () => {
          Meteor.call("ValidateEmail", this.state.userInformation.email, (error, response) =>  {
            let message;
            //response=true;
            response ? message = this.props.language.validEmail : message = this.props.language.invalidEmail;
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
      this.props.handleControlMessage(true, this.props.language.validatingEmail);
    }
  }

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.userInformation.password,
        passwordResult: false,
      }, () => {
        let message;
        this.state.equalPasswords ? message = this.props.language.passwordsMatch : message = this.props.language.passwordsNotMatch;
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
      <div className="user-information-container">
        <div className="form-file-column">
          {
            this.state.userInformation.image !== undefined ?
              <FormPreview
                file={this.state.userInformation.image}
                type="image"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
              />
            :
              this.props.type === "tutor" ?
                <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="secondary">
                  <ImageSharpIcon className="form-image-icon"/>{this.props.language.selectYourProfilePhoto} <br/> {this.props.language.required}
                </Button>
              :
                <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="secondary">
                  <ImageSharpIcon className="form-image-icon"/>{this.props.language.selectYourProfilePhoto}
                </Button>
          }
          {
            this.props.type === "tutor" ?
              <div className="form-request-information">
                <p className="form-information-primary-text">{this.props.language.correctEmailAdvice1}</p>
                <EmailIcon className="form-information-icon"/>
                <p className="form-information-secondary-text">{this.props.language.correctEmailAdvice2}</p>
              </div>
            :
              undefined
          }
        </div>
        <div className="form-input-column">
          <div className="sign-form">
            <TextField
              id="name-input"
              label={this.props.language.fullname}
              margin="normal"
              variant="outlined"
              fullWidth
              autoComplete={"off"}
              required
              value={this.state.userInformation.fullname}
              onChange={this.handleChange('fullname')}
              error={this.state.showError && this.state.userInformation.fullname === ''}
            />
            <TextField
              id="username-input"
              label={this.props.language.username}
              margin="normal"
              variant="outlined"
              fullWidth
              autoComplete={"off"}
              required
              value={this.state.userInformation.username}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.userInformation.username === ''}
            />
            <TextField
              id="password-input"
              label={this.props.language.password}
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              required
              error={this.state.showError && this.state.userInformation.password === ''}
              onChange={this.handleChange('password')}
            />
            <TextField
              id="confirm-password-input"
              label={this.props.language.confirmPassword}
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              disabled={this.state.userInformation.password === ''}
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
              id="email-input"
              label={this.props.language.email}
              margin="normal"
              variant="outlined"
              fullWidth
              autoComplete={"off"}
              required
              value={this.state.userInformation.email}
              onChange={this.handleChange('email')}
              onBlur={() => this.validateEmail()}
              onKeyPress={() => this.keyController(event, 'email')}
              error={this.state.showError && this.state.userInformation.email === ''}
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
          </div>
          {
            this.props.type === "tutor" ?
              <div className="sign-form">
                <TextField
                  id="website-input"
                  label={this.props.language.personalWebsite}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.userInformation.website}
                  onChange={this.handleChange('website')}
                />
                <TextField
                  id="google-link-input"
                  label={this.props.language.googleLink}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.userInformation.googleLink}
                  onChange={this.handleChange('googleLink')}
                />
                <div className="form-multiple-input-row">
                  <TextField
                    label={this.props.language.countryCode}
                    margin="normal"
                    variant="outlined"
                    className="form-multiple-input"
                    value={this.state.userInformation.countryCode}
                    onChange={this.handleChange('countryCode')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{`(+)`}</InputAdornment>,
                    }}
                    inputProps={{ min: "1", max: "999", step: "1", maxLength: "3" }}
                    onKeyPress={() => validateOnlyNumbers(event)}
                  />
                  <TextField
                    id="phone-number-input"
                    label={this.props.language.phoneNumber}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    inputProps={{ min: "1000000000", max: "9999999999", step: "1", maxLength: "20" }}
                    value={this.state.userInformation.phoneNumber}
                    onChange={this.handleChange('phoneNumber')}
                    onKeyPress={() => validateOnlyNumbers(event)}
                  />
                </div>
                <TextField
                  id="biography-input"
                  label={this.props.language.biography}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={this.state.userInformation.biography}
                  onChange={this.handleChange('biography')}
                  error={this.state.showError && this.state.userInformation.biography === ''}
                />
              </div>
            :
              undefined
          }
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
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">
            {this.props.language.uploadYourProfilePhoto}
          </DialogTitle>
          <DialogContent>
            <div className="file-form-dialog">
              {
                this.state.showLibrary ?
                  <Library
                    user={"MyUser"}
                    type={this.state.fileType}
                    getFileInformation={this.getFileInformation.bind(this)}
                    hideLibrary={this.hideLibrary.bind(this)}
                    language={this.props.language}
                  />
                :
                <div>
                  {
                    this.state.showPreview ?
                      <div className="form-preview-container">
                        <ImagePreview
                          file={this.state.image}
                          unPickFile={this.unPickFile.bind(this)}
                          language={this.props.language}
                        />
                        
                      </div>
                    :
                    <div className="form-file-container">
                      <FileUpload
                        type={this.state.fileType}
                        user={"guest"}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        handleControlMessage={this.props.handleControlMessage.bind(this)}
                        language={this.props.language}
                        label={this.props.language.uploadImageButtonLabel}
                      />
                    </div>
                  }
                </div>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.selectFile(this.state.fileType)} disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} color="primary">
              {this.props.language.select}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
