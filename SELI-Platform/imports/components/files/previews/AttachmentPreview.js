import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachmentIcon from '@material-ui/icons/Attachment';

export default class AttachmentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    let file = this.props.file;
    this.setState({
      nameWithoutExtension: true,
    });
    file.name = file.name.toString().split('.');
    file.name = file.name[0];
  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.file._id, function (err) {
      if (err) {

      }
    });
    this.props.unPickFile();
  }

  open(){
    var win = window.open(this.props.file.link, '_blank');
    win.focus();
  }

  render() {
    return(
        <div className="file-preview-container">
        <div id="attachment-preview-information" className="file-preview-information">
          <AttachmentIcon className="attachment-file-preview-icon"/>
          <p className="file-preview-name">{this.props.file.name}</p>
        </div>
          <div className="file-preview-actions">
            <Tooltip title={this.props.language.open} placement="left">
              <IconButton onClick={() => this.open()} color="secondary" aria-label="open">
                <img src="openNew.svg"/>
              </IconButton>
            </Tooltip>
            { this.props.preview ? undefined : 
              <Tooltip title={this.props.language.uploadAnother} placement="left">
                <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                  <CloudUploadIcon />
                </IconButton>
              </Tooltip>}
            { this.props.preview ? undefined : 
              <Tooltip title={this.props.language.delete} placement="left">
                <IconButton onClick={() => this.delete()} color="secondary" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          </div>
        </div>
      );
    }
  }
