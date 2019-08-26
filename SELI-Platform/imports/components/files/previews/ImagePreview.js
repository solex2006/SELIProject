import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log(this.props.file);
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
          <div id="image-preview-information" className="file-preview-information">
            <div style={{backgroundImage: `url(${this.props.file.link})`}} className="file-image-preview"></div>
          </div>
          <div className="file-preview-actions">
            <Tooltip title="Open" placement="left">
              <IconButton onClick={() => this.open()} color="secondary" aria-label="open">
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload another" placement="left">
              <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="left">
              <IconButton onClick={() => this.delete()} color="secondary" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );
    }
  }
