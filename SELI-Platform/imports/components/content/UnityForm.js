import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import Help from '../tools/Help';
import UnityUpload from '../files/UnityUpload';
import UnityPreview from '../files/previews/UnityPreview';

export default class UnityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
    }
  }

  handleChange = event => {
    if (event.target.name === 'textType') {
      this.setState({
        textType: event.target.value,
      });
    }
  }

  clearInputs(){

    this.setState({

    });
  }

  getUnityAttributes(){

    let unityContent = {

    };
    this.clearInputs();
    return unityContent;
  }

  getFileInformation(file){
    if (file.decompressResult !== undefined) {
      this.setState({
        file: file,
      }, () => this.handleUpload(this.state.file));
    }
    else {
      this.setState({
        showPreview: false,
        file: undefined,
      })
      this.props.handleControlMessage(true, "Error on server");
    }
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      file: undefined,
    })
  }

  handleUpload(file) {
    let showPreview = false;
    if (!(file.decompressResult.buildJSON.founded && file.decompressResult.loaderJs.founded)) {
      Meteor.call("RemoveCourseFile", file._id, function (err) {});
    }
    if (!file.decompressResult.extracted) {
      this.props.handleControlMessage(true, "Bad rar file try compressing with RAR4");
    }
    else if (file.decompressResult.extracted) {
      if (!(file.decompressResult.buildJSON.founded || file.decompressResult.loaderJs.founded)) {
        this.props.handleControlMessage(true, "No Folder.json and UnityLoader.js founded");
      }
      else if (!file.decompressResult.buildJSON.founded) {
        this.props.handleControlMessage(true, "No Folder.json founded");
      }
      else if (!file.decompressResult.loaderJs.founded) {
        this.props.handleControlMessage(true, "No UnityLoader.js founded");
      }
    }
    if (file.decompressResult.buildJSON.founded && file.decompressResult.loaderJs.founded && file.decompressResult.extracted) {
      showPreview = true;
    }
    this.setState({
      showPreview: showPreview,
    });
  }

  componentDidMount(){
    this.props.getUnityAttributesFunction(() => this.getUnityAttributes());
  }

  render() {
    return(
      <div className="unity-form">
        {
          !this.state.showPreview ?
            <div className="form-file-container">
              <UnityUpload
                type="unity"
                user={Meteor.userId()}
                accept={['.rar']}
                getFileInformation={this.getFileInformation.bind(this)}
              />
            </div>
          :
          <UnityPreview
            file={this.state.file}
            unPickFile={this.unPickFile.bind(this)}
          />
        }
        <div className="center-row">
          <p className="normal-text">Or</p>
        </div>
        <div className="center-row">
          <p className="normal-text">Pick one from our</p>
          <Button color="primary" className="text-button">Library</Button>
        </div>
        <div className="center-row">
          <Help
            helper="unityHelper"
            text="Unity contents are:"
          />
        </div>
        <Divider light={true}/>
        <TextField
          id="name-input"
          label="Name"
          margin="normal"
          variant="outlined"
          required
          className="padding-input"
        />
        <TextField
          id="description-input"
          label="Description"
          margin="normal"
          variant="outlined"
          required
          multiline
          rows={3}
          className="padding-input"
        />
      </div>
    );
  }
}
