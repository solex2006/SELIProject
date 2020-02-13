import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileUpload from '../components/files/FileUpload';
import ImagePreview from '../components/files/previews/ImagePreview';
import Library from '../components/tools/Library';
import FormPreview from '../components/files/previews/FormPreview';
import {noSpecialCharacters} from '../../lib/textFieldValidations';
import BadgeUpload from '../components/files/BadgeUpload';

export default class BadgeInformation extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      userInformation: this.props.badgeInformation,
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

  

  componentDidMount() {
    this.props.showErrorFunction(() => this.showError());
  }

  showError = () => {
    this.setState({
      showError: true,
    });
  }

  render() {
    return(
      <div className="course-information-container">
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

        </div>
        <div className="form-input-column">
          <div className="sign-form">
            <TextField
              id="name-input"
              label={this.props.language.name}
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
              id="description-input"
              label={this.props.language.description}
              margin="normal"
              variant="outlined"
              fullWidth
              autoComplete={"off"}
              required
              multiline
              rows={3}
              value={this.state.userInformation.username}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.userInformation.username === ''}
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
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">
            {
              this.state.fileType === "image" ?
                this.props.language.chooseOrUploadImage
              :
              undefined
            }
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
                      <BadgeUpload
                        type={this.state.fileType}
                        user={"guest"}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
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
