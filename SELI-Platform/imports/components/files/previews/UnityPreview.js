import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { DiUnitySmall } from "react-icons/di";
import { Link } from 'react-router-dom';

export default class UnityPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log(this.props.file.decompressResult);
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

  }

  render() {
    return(
        <div className="file-preview-container">
          <div id="unit-preview-information" className="file-preview-information">
            <div className="file-preview-icon-container">
              <p className="file-preview-icon-text">{this.props.language.unityProject}</p>
              <DiUnitySmall className="file-preview-icon"/>
            </div>
            <p className="file-preview-name">{this.props.file.name}</p>
            <p className="file-preview-by">{`By: ${this.props.file.meta.userId}`}</p>
          </div>
          <div className="file-preview-actions">
            <Tooltip title="Open" placement="left">
              <Link
                target="_blank"
                to={{
                  pathname: "/unityWebgl",
                  search: `${this.props.file.decompressResult.loaderJs.path}*${this.props.file.decompressResult.buildJSON.path}*${this.props.file._id}`,
                  hash: `#MyUser`,
                }}
              >
                <IconButton color="secondary" aria-label={this.props.language.open}>
                  <OpenInNewIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title={this.props.language.uploadAnother} placement="left">
              <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={this.props.language.delete} placement="left">
              <IconButton onClick={() => this.delete()} color="secondary" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );
    }
  }
