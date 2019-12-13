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
import Library from './Library';
import Help from './Help';
import FormPreview from '../files/previews/FormPreview';

import EmailIcon from '@material-ui/icons/Email';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import {validateOnlyLetters, validateOnlyNumbers} from '../../../lib/textFieldValidations';

import {noSpecialCharacters} from '../../../lib/textFieldValidations';

export default class ResetInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ResetInformation: this.props.ResetInformation,
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
    let ResetInformation = this.state.ResetInformation;

    if (name === 'password') {
      ResetInformation.password = event.target.value;
      this.setState({
        ResetInformation: ResetInformation,
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
    this.setState({
      ResetInformation: ResetInformation,
    });
  };

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

  confirmPassword = () => {
    this.state.passwordToConfirm !== '' ?
      this.setState({
        equalPasswords: this.state.passwordToConfirm === this.state.ResetInformation.password,
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
      
      <div className="form-container">

        <div className="input-container">
          {`${this.props.language.typeNewPasswd}`}
        </div>
        <div className="input-container">

          <TextField
            id="password-input"
            label={this.props.language.password}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={this.state.showError && this.state.ResetInformation.password === ''}
            onChange={this.handleChange('password')}
          />
        </div>
        <div className="input-container">
          <TextField
            id="confirm-password-input"
            label={this.props.language.confirmPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            disabled={this.state.ResetInformation.password === ''}
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
        </div>
      </div>
      );
    }
  }
