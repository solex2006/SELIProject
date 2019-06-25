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
    Meteor.call(this.props.removeFunction, this.props.fileId, function (err) {
      if (err) {
        this.props.showControlMessage('There was an error deleting the file, try again later');
        return;
      }
    });
    this.props.removeFileInformation();
    this.props.resetFile();
    this.props.showControlMessage('File deleted successfully');
  }

  renameFile() {
    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt = window.prompt('New file name?', this.props.fileName);
    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)){
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  }

  componentDidMount(){
    let fileInformation = {
      url: this.props.fileUrl,
      id: this.props.fileId,
      type: this.props.type,
    }
    this.props.getFileInformation(fileInformation);
  }

  render() {
    return (
      <div>
        <div className="file-info-container">
          <p className="file-name-title">{this.props.uploadedTitle}</p>
          <p className="file-name-text">{this.props.fileName}</p>
          {
            this.props.preview ?
              <div className="centered-image-preview-container">
                <img className="image-preview" style={{ backgroundImage: "url(" + this.props.fileUrl + ")" }}></img>
              </div>
            :
            undefined
          }
          {
            this.props.showIcon ?
              <div className="centered-image-preview-container">
                <img className="file-preview" style={{ backgroundImage: "url(" + this.props.icon + ")" }}></img>
              </div>
            :
              undefined
          }
          {
            this.props.open ?
              <div className="file-button-container">
                <a className="view-file-link" href={this.props.fileUrl} target="_blank">Open</a>
              </div>
            :
            undefined
          }
          {
            this.props.delete ?
              <div className="file-button-container">
                <Button className="file-crud-button" onClick={this.handleClickOpen}>
                  Delete
                </Button>
              </div>
            :
            undefined
          }
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
