import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class ImportButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      showButton: false,
      open: false,
      uploading: 'none',
      upload: ""
    }
  }

  uploadIt (event) {
    this.setState({
      showButton: !this.state.showButton, 
      upload: event.target.files[0].name
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showButton: !this.state.showButton,
      uploading: "uploading"
    })
    var file = this.fileInput.current.files[0]; //assuming 1 file only
    if (!file) return;
    const formData = new FormData()
    formData.append('json', file)
    console.log("form data",formData, Meteor.userId())
    fetch(
      Meteor.settings.public.URL_SITE+'upload', 
      { 
        method: 'POST', 
        body: formData, 
        headers: {'Authorization': Meteor.userId(), 'file': this.props.file}
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log("data regreso:",data);
      if (data)
      this.setState({
        uploading: "done",
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  cancelUpload = () => {
    this.resetValues();
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    }, () => {
      this.resetValues();
    })
  }

  resetValues = () => {
    this.setState({
      showButton: false,
      uploading: "none",
      upload: ""
    })
  }

  render() {
    return(
      <React.Fragment>
        <Button 
          onClick={() => this.handleOpen()} 
          variant="contained"
          className="course-content-import-button"
        >
          <img className="course-content-import-image" src="upload.svg"/>
          {this.props.language[`${this.props.file}Upload`]}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="dialog"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">
            {this.props.language.uploading}
          </DialogTitle>
          {
            this.state.uploading === "none" ? 
              <form onSubmit={this.handleSubmit} >
                <div  className="upload-container">
                  <div className="upload-btn-wrapper-import">
                    <input 
                      style={{ display: 'none' }}
                      name="file-3[]" 
                      id="file-3" 
                      class="inputfile inputfile-3" 
                      data-multiple-caption="{count} files selected"
                      accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                      type="file" 
                      ref={this.fileInput}
                      onChange={this.uploadIt}
                    />
                    {
                      this.state.showButton === true ?
                        <React.Fragment>
                          <div>{`${this.props.language.fileName}:`}</div>
                          <div>{this.state.upload}</div>
                          <Button type="submit" className="sign-button-import" color="secondary" variant="outlined">
                            <div className="course-content-import-button-child">
                              {this.props.language.upload}
                            </div>
                          </Button>
                        </React.Fragment>
                      :
                        <Button className="sign-button-import" color="secondary" variant="outlined">
                          <label for="file-3" className="course-content-import-button-child">
                            <span>{this.props.language.selectYourFile}</span>
                          </label>
                        </Button>
                    }
                    {/* <button class="boton1" type="submit" style={{ display: this.state.showButton === true? 'flex' : 'none' }}>{this.props.language.upload}</button> */}
                  </div> 
                </div>
              </form>
            : this.state.uploading === "done" ?
              <DialogContent className="success-dialog-content">
                <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                  {this.props.language.fileSucessfullyUploaded}
                </DialogContentText>
                <CheckCircleIcon className="success-dialog-icon"/>
              </DialogContent>
            :
              <div className="uploading-file-container">
                <div className="upload-btn-wrapper-import">
                  <div className="uploading-file-row">
                    <p className="uploading-file-text">{`${this.props.language.uploading} ${this.props.language[this.props.file]}, ${this.props.language.pleaseWait}`}</p>
                  </div>
                  <div className="uploading-file-progress-container">
                    <CircularProgress
                      color="primary"
                      size={getComputedStyle(document.documentElement).getPropertyValue('--progress-size')}
                      thickness={3}
                    />
                  </div>
                  {/* <div className="uploading-file-row">
                    <div className="uploading-file-actions">
                      <Button className="uploading-file-button" onClick={() => this.cancelUpload()} color="secondary" variant="contained">
                        {this.props.language.cancel}
                      </Button>
                    </div>
                  </div> */}
                </div>
              </div>
          }
          <DialogActions>
            <Button 
              disabled={!(this.state.uploading === "none" || this.state.uploading === "done")} 
              onClick={() => this.handleClose()} color="primary" autoFocus
            >
              {this.state.uploading === "done" ? this.props.language.ok : this.props.language.close}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}