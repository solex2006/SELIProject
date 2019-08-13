import React from 'react';
import Button from '@material-ui/core/Button';
import { GoPackage } from "react-icons/go";

export default class CompressedPreview extends React.Component {
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

  download(){
    var tab = window.open(this.props.link, '_blank');
    tab.focus();
  }

  render() {
    return(
        <div className="file-preview-block">
          <div className="file-preview-column">
            <div className="compressed-file-preview">
              <GoPackage
                size="2.5em"
                color="#3f51b5"
              />
            </div>
            <div className="file-preview-text">
              {this.props.name}
            </div>
          </div>
          <div className="file-preview-actions">
            <div className="file-preview-block">
              <div className="file-preview-row">
                <Button
                  className="file-preview-button"
                  variant="contained"
                  color="primary"
                  onClick={() => this.download()}
                >
                  Download
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
                  Upload another
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
