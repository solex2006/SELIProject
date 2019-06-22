import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Trasitions */
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

class IndividualFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);
  }

  propTypes = {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeFile() {
    if(this.props.collectionName === 'TutorFilesCollection'){
      Meteor.call('RemoveTutorFile', this.props.fileId, function (err) {
        if (err)
        console.log(err);
      });
    }
    if(this.props.collectionName === 'CourseFilesCollection'){
      Meteor.call('RemoveCourseFile', this.props.fileId, function (err) {
        if (err)
        console.log(err);
      });
    }
    this.props.removeUrl();
    this.props.resetFile();
  }

  renameFile() {

    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt = window.prompt('New file name?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err) {
        if (err)
        console.log(err);
      })
    }
  }

  componentDidMount(){
    this.props.getImageInformation(this.props.fileUrl, this.props.fileId);
  }

  render() {
    return (
      <div>
        <div className="file-info-container">
          <p className="file-name-title">{this.props.uploadedTitle}</p>
          <p className="file-name-text">{this.props.fileName}</p>
          <div className="centered-image-preview-container">
            <img className="file-preview" style={{ backgroundImage: "url(" + this.props.icon + ")" }}></img>
          </div>
          <div className="file-button-container">
            <a className="view-file-link" href={this.props.fileUrl} target="_blank">Open</a>
          </div>
          <div className="file-button-container">
            <Button className="file-crud-button" onClick={this.handleClickOpen}>
              Delete
            </Button>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          keepMounted
          TransitionComponent={Transition}
        >
          <DialogTitle className="modal-title" id="alert-dialog-title">{"Are you sure you want to delete the file?"}</DialogTitle>
          <DialogActions>
            <Button  onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.removeFile} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }
  }
  export default IndividualFile;
