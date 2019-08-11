import React from 'react';
import Button from '@material-ui/core/Button';

export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.id, function (err) {
      if (err) {
        this.props.showControlMessage('There was an error deleting the file, try again later');
        return;
      }
    });
    this.props.showControlMessage('File deleted successfully');
    this.props.resetInputButton();
  }

  open(){
    var tab = window.open(this.props.link, '_blank');
    tab.focus();
  }

  render() {
    return(
        <div className="file-preview-block">
          <audio controls className="audio-file-preview">
            <source src={this.props.link}></source>
          </audio>
          <div className="file-preview-actions">
            <div className="file-preview-block">
              <div className="file-preview-row">
                <Button
                  className="file-preview-button"
                  variant="contained"
                  color="primary"
                  onClick={() => this.open()}
                >
                  Open
                </Button>
                <Button
                  className="file-preview-button"
                  variant="contained"
                  color="primary"
                  onClick={() => this.delete()}
                >
                  Delete
                </Button>
                <Button
                  className="file-preview-button"
                  variant="contained"
                  color="primary"
                  onClick={() => {this.props.resetInputButton(); this.props.generateSalt()}}
                >
                  upload another
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
