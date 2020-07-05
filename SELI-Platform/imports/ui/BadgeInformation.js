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
    super(props);
    this.state = {
      badgeInformation: this.props.badgeInformation,
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
    console.log("handle change: "+name);
    let badgeInformation = this.state.badgeInformation;
    if (name === 'fullname') {
      badgeInformation.fullname = event.target.value;
    }
    else if (name === 'username') {
      badgeInformation.username = event.target.value;
    }

    this.setState({
      badgeInformation: badgeInformation,
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
    let badgeInformation = this.state.badgeInformation;
    if (fileType === "image") {
      badgeInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        badgeInformation: badgeInformation,
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

  fillBadgeData()
  {
    console.log('fill Badge data');
    console.log(this.props.badgeInformation);
    this.setState({badgeInformation:this.props.badgeInformation});
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
    console.log("componentDidMount");
    this.props.showErrorFunction(() => this.showError());
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextProps;
  }
  // static getDerivedStateFromProps(props, current_state) {
  //   console.log("getDerivedState")
  //   if (current_state.value !== props.value) {
  //     return {
  //       badgeInformation: props.badgeInformation
  //     }
  //   }
  //   return null
  // }
  showError = () => {
    this.setState({
      showError: true,
    });
  }
  print(){
    console.log(this.props.badgeInformation);
    console.log(this.state.badgeInformation);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ badgeInformation: nextProps.badgeInformation });  
  }
  static getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps.badgeInformation);
    if(nextProps.badgeInformation!==prevState.badgeInformation){
      return { badgeInformation: nextProps.badgeInformation};
   }
   else return null;
 }
  render() {
    return(
      <div className="badge-verification-container">
        <div className="form-file-column">
          {
            this.state.badgeInformation.image !== undefined ?
              <FormPreview
                file={this.state.badgeInformation.image}
                type="image"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
              />
            :
              this.props.type === "tutor" ?
                <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="secondary">
                  <ImageSharpIcon className="form-image-icon"/>{this.props.language.selectYourBadgeImage} <br/> {this.props.language.required}
                </Button>
              :
                <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="secondary">
                  <ImageSharpIcon className="form-image-icon"/>{this.props.language.selectYourBadgeImage}
                </Button>
          }

        </div>
        <div className="form-input-column">
          <div className="sign-form">
            <label class="badge-information-label">Name of the Student</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeStudent}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.badgeInformation  .username === ''}
            />
            <label class="badge-information-label">Name of the badge</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeName}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.badgeInformation  .username === ''}
            />
            <label class="badge-information-label">Description of the badge</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeDescription}
              onChange={this.handleChange('username')}
              error={this.state.showError && this.state.badgeInformation  .username === ''}
            />
            <label class="badge-information-label">Name of the teacher</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeTeacher}
              onChange={this.handleChange('username')}
            />
            <label class="badge-information-label">Course</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeCourse}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.badgeInformation  .username === ''}
            />
            <label class="badge-information-label">Issued on</label>
            <TextField
              id="description-input"
              label={this.props.badgeInformation.username}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.props.badgeInformation.badgeDate}
              onChange={this.handleChange('username')}
              onKeyPress={() => this.keyController(event, 'username')}
              error={this.state.showError && this.state.badgeInformation  .username === ''}
            />
            <Button  variant="outlined" color="primary">
                Verify
            </Button>
            <Button  variant="outlined" color="secondary">
                Clean
            </Button>
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
