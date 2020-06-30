import { Meteor } from 'meteor/meteor';

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

import AccessibilityRegistration from '../student/AccessibilityRegistration';

export default class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: this.props.user,
      showError: false,
      passwordToConfirm: '',
      emailValidated: true,
      equalPasswords: true,
      username: this.props.user.username,
    }
  }

  showError = () => {

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
      userInformation.profile.fullname = event.target.value;
    }
    else if (name === 'username') {
      this.setState({
        username: event.target.value,
      })
    }
    else if (name === 'password') {
      event.target.value === '' ?
      this.setState({
        newPassword: false,
        equalPasswords: true,
      }, () => {
        this.setState({
          passwordToConfirm: '',
          passwordResult: false,
        })
      })
      :
      this.setState({
        newPassword: true,
        equalPasswords: false,
      })
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
      userInformation.profile.biography = event.target.value;
    }
    else if (name === 'email') {
      userInformation.emails[0].address = event.target.value;
      this.setState({
        emailValidated: false,
      });
      if (this.state.validEmail) {
        this.setState({
          validatingEmail: false,
          validEmail: false,
          emailResult: false,
        }, () => {
          this.handleEmail(false);
        })
      }
    }
    else if (name === 'website') {
      userInformation.profile.website = event.target.value;
    }
    else if (name === 'googleLink') {
      userInformation.profile.googleLink = event.target.value;
    }
    else if (name === 'phoneNumber') {
      userInformation.profile.phoneNumber = event.target.value;
    }
    else if (name === 'countryCode') {
      userInformation.profile.countryCode = event.target.value;
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
    this.setState({
      image: file,
      showPreview: true,
      showLibrary: false,
    });
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      image: undefined,
    });
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
    userInformation.profile.profileImage = this.state.image;
    this.setState({
      showPreview: false,
      userInformation: userInformation,
    });
    this.handleClose();
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

  handleEmail = (value) => {
    this.setState({
      emailValidated: value,
    });
  }

  validateEmail = ()  => {
    if (!this.state.validatingEmail) {
      this.state.userInformation.emails[0].address !== '' ?
        this.setState({
          validatingEmail: true,
          emailHelperMessage: this.props.language.validatingEmail,
        }, () => {
          Meteor.call("ValidateEmail", this.state.userInformation.emails[0].address, (error, response) =>  {
            let message;
            response ? message = this.props.language.validEmail : message = this.props.language.invalidEmail;
            this.setState({
              emailResult: true,
              validEmail: response,
              emailHelperMessage: message,
            }, () => {
              this.setState({
                validatingEmail: false,
              }, () => {
                this.state.validEmail ? this.handleEmail(true) : this.handleEmail(false)
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
      this.props.handleControlMessage(true, this.props.language.validatingEmail, false, '', '');
    }
  }

  handlePassword = (value) => {
    this.setState({
      equalPasswords: value,
    });
  }

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.userInformation.password,
        passwordResult: false,
      }, () => {
        let message;
        this.state.equalPasswords ? message = this.props.language.passwordsMatch : message = this.props.language.passwordsNotMatch;
        this.state.equalPasswords ? this.handlePassword(true) : this.handlePassword(false);
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

  }

  showError = () => {
    this.setState({
      showError: true,
    });
  }

  changeAccountInformation = () => {
    if (this.validateAccountInformation()) {
      let userInformation = this.state.userInformation;
      Meteor.call("ChangeAccountInformation", userInformation, this.state.newPassword, this.state.username, (error, response) =>  {
        if (error) {
          this.props.handleControlMessage(true, error.reason, false, '', '');
        } else {
          userInformation.username = this.state.username;
          this.props.reRender();
          this.props.handleControlMessage(true, this.props.language.informationUpdated, false, '', '');
          if (this.state.newPassword) {
            Meteor.loginWithPassword({username: this.state.username}, this.state.userInformation.password, (error) => {
              if (error) {
                let errorLabel = '';
                if (error.reason === 'Username already exists.') {
                  errorLabel = this.props.language.userAlreadyExists;
                }
                else if (error.reason === 'Email already exists.') {
                  errorLabel = this.props.language.emailAlreadyExists;
                }
                else {
                  errorLabel = this.props.language.unknownError;
                }
                this.props.handleControlMessage(true, errorLabel);
              }
              else {
                this.setState({
                  user: Meteor.user(),
                })
              }
            });
          }
        }
      });
    }
  }

  validateAccountInformation = () => {
    if (
      this.state.userInformation.profile.fullname === '' ||
      this.state.username === '' ||
      this.state.userInformation.profile.biography === '' ||
      this.state.userInformation.emails[0].address === ''
    ) {
      this.showError();
      this.props.handleControlMessage(true, this.props.language.fieldsMarkedWith, false, '', '');
      return false;
    }
    if (this.props.user.profile.type === 'tutor') {
      if (this.state.userInformation.profile.profileImage === undefined) {
        this.props.handleControlMessage(true, this.props.language.uploadYourProfilePhoto, false, '', '');
        return false;
      }
    }
    else if (!this.state.emailValidated) {
      this.props.handleControlMessage(true, this.props.language.validEmail, false, '', '');
      return false;
    }
    else if (!this.state.equalPasswords) {
      this.props.handleControlMessage(true, this.props.language.passwordsNotMatch, false, '', '');
      return false;
    }
    else if (this.state.userInformation.profile.phoneNumber !== "") {
      if (this.state.userInformation.profile.countryCode === "") {
        this.props.handleControlMessage(true, this.props.language.addCountryCode, false, '', '');
        return false;
      }
    }
    else if (this.state.userInformation.profile.countryCode !== "") {
      if (this.state.userInformation.profile.phoneNumber === "") {
        this.props.handleControlMessage(true, this.props.language.addPhoneNumber, false, '', '');
        return false;
      }
    }
    return true;
  }

  componentWillUnmount(){

  }

  render() {
    return(
      <div className="account-management-container">
        <div className="account-management-file-column">
          <div className="account-management-information">
            <p className="account-management-primary-text">{this.props.language.accountManagement}</p>
            <p className="account-management-secondary-text">{this.props.language[this.props.user.profile.type]}</p>
          </div>
          {
            this.state.userInformation.profile.profileImage !== undefined ?
              <Avatar
                className="account-management-avatar"
                src={this.state.userInformation.profile.profileImage.link}
                onClick={() => this.openFileSelector("image", "image/*")}
              />
            :
            <Avatar
              className="account-management-avatar"
              src={'user.svg'}
              style={{backgroundColor: "#000000"}}
              onClick={() => this.openFileSelector("image", "image/*")}
            />
          }
        </div>
        <div className="form-input-column">
          <p className="account-management-secondary-text">{this.props.language.userInformation}</p>
          <TextField
            id="name-input"
            label={this.props.language.fullname}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.userInformation.profile.fullname}
            onChange={this.handleChange('fullname')}
            error={this.state.showError && this.state.userInformation.profile.fullname === ''}
          />
          <TextField
            id="username-input"
            label={this.props.language.username}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.username}
            onChange={this.handleChange('username')}
            onKeyPress={() => this.keyController(event, 'username')}
            error={this.state.showError && this.state.username === ''}
            helperText={this.props.language.usernameHelper}
          />
          <TextField
            id="email-input"
            label={this.props.language.email}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.userInformation.emails[0].address}
            onChange={this.handleChange('email')}
            onBlur={() => this.validateEmail()}
            onKeyPress={() => this.keyController(event, 'email')}
            error={this.state.showError && this.state.userInformation.emails[0].address === ''}
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
          <p className="account-management-secondary-text">{this.props.language.changeYourPassword}</p>
          <TextField
            id="password-input"
            label={this.props.language.newPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={this.state.userInformation.password}
            error={this.state.showError && this.state.userInformation.password === ''}
            onChange={this.handleChange('password')}
          />
          <TextField
            id="confirm-password-input"
            label={this.props.language.confirmNewPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            disabled={this.state.userInformation.password === '' || this.state.userInformation.password === undefined}
            error={this.state.showError && !this.state.equalPasswords}
            required
            value={this.state.passwordToConfirm}
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
          {
            this.props.user.profile.type === 'tutor' ?
              <div>
                <p className="account-management-secondary-text">{this.props.language.tutorBasicInformation}</p>
                <TextField
                  id="biography-input"
                  label={this.props.language.biography}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={this.state.userInformation.profile.biography}
                  onChange={this.handleChange('biography')}
                  error={this.state.showError && this.state.userInformation.profile.biography === ''}
                />
                <TextField
                  id="website-input"
                  label={this.props.language.personalWebsite}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.userInformation.profile.website}
                  onChange={this.handleChange('website')}
                />
                <TextField
                  id="google-link-input"
                  label={this.props.language.googleLink}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={this.state.userInformation.profile.googleLink}
                  onChange={this.handleChange('googleLink')}
                />
                <div className="form-multiple-input-row">
                  <TextField
                    id="country-code-input"
                    label={this.props.language.countryCode}
                    margin="normal"
                    variant="outlined"
                    className="form-multiple-input"
                    value={this.state.userInformation.profile.countryCode}
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
                    inputProps={{ min: "1000000000", max: "9999999999", step: "1", maxLength: "10" }}
                    value={this.state.userInformation.profile.phoneNumber}
                    onChange={this.handleChange('phoneNumber')}
                    onKeyPress={() => validateOnlyNumbers(event)}
                  />
                </div>
              </div>
            :
              <AccessibilityRegistration
                inEdition={true}
                language={this.props.language}
                userInformation={this.state.userInformation}
              ></AccessibilityRegistration>
          }
          <div className="account-management-actions-container">
            <Button onClick={() => this.changeAccountInformation()} className="large-button" variant="outlined" size="large" color="primary">{this.props.language.saveChanges}</Button>
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
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{'Change your profile photo'}</DialogTitle>
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
                        />
                      </div>
                    :
                    <div className="form-file-container">
                      <FileUpload
                        type={this.state.fileType}
                        user={Meteor.userId()}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        handleControlMessage={this.props.handleControlMessage.bind(this)}
                        language={this.props.language}
                        label={this.props.language.uploadYourProfilePhoto}
                      />
                    </div>
                  }
                  <div className="center-row">
                    <p className="normal-text">{this.props.language.or}</p>
                  </div>
                  <div className="center-row">
                    <p className="normal-text">{this.props.language.pickOneFrom}</p>
                    <Button onClick={() => this.showLibrary()} color="primary" className="text-button">{this.props.language.library}</Button>
                  </div>
                </div>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.selectFile(this.state.fileType)} disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} color="primary">
              {this.props.language.change}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
