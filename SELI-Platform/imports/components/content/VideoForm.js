import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import GalleryFileUpload from '../files/GalleryFileUpload';
import Library from '../tools/Library';
import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';
import VideoPreview from '../files/previews/VideoPreview';
import ReactPlayer from 'react-player'

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'flex-start',
      description: false,
      addToGallery: false,
      source: 'upload',
      hideSource: false,
    }
  }

  handleChange = event => {
    if (event.target.name === 'alignment') {
      this.setState({
        alignment: event.target.value,
      });
    }
    else if (event.target.name === 'source') {
      this.setState({
        source: event.target.value,
        validUrl: false,
        showHelperText: false,
      });
    }
    else {
      this.setState({
        description: event.target.checked,
      });
    }
  }

  addToGalleryHandleChange = event => {
    this.setState({
      addToGallery: event.target.checked,
    });
  }

  clearInputs(){
    if(this.state.description){
      document.getElementById('description-input').value = "";
    }
    this.setState({
      alignment: 'flex-start',
      description: false,
      source: 'upload',
    });
  }

  getVideoAttributes(){
    let video;
    let source;
    if (this.state.source === 'url') {
      video = {
          id: this.state.url,
          url: this.state.url,
          type: 'video',
      };
      source = "external";
    }
    else {
      video = this.state.video;
      source = "upload";
    }
    let description = '';
    if(this.state.description){
      description = document.getElementById('description-input').value;
    }
    let alignment = this.state.alignment;
    let videoContent = {
      video: video,
      description: description,
      alignment: alignment,
      source: source,
    };
    this.clearInputs();
    this.generateVideoSalt();
    return videoContent;
  }

  getFileInformation(fileInformation){
    if(fileInformation){
      this.setState({
        uploaded: true,
        video: fileInformation,
      });
    }
  }

  removeFileInformation(){
    this.setState({
      uploaded: false,
      fileInformation: undefined,
    });
  }

  generateVideoSalt(){
    this.setState({
      videoSalt: Math.random(),
    });
  }

  pickFile(file){
    let fileInformation = {
      url: file.link,
      id: file._id,
      type: "video",
    }
    this.setState({
      video: fileInformation,
      showPreview: false,
    }, () => {
      this.setState({
        showPreview: true,
      });
    });
  }

  setSourceRadioGroup(set){
    this.setState({
      hideSource: set,
    });
  }

  ignoreFile(){
    this.setState({
      fileInformation: undefined,
      showPreview: false,
      showHelperText: false,
    })
  }

  resetInputButton(){}

  urlHandleChange = name => event => {
    this.setState({
      showHelperText: false,
      url: event.target.value,
      validUrl: false,
    })
  }

  validateUrl(){
    let url = document.getElementById('url-input').value;
    let isValid = ReactPlayer.canPlay(url);
    let helperColor = '';
    let showHelperText = true;
    let urlMessage = '';
    if (isValid) {
      urlMessage = "The player can reproduce this type of source";
      helperColor = "#4caf50";
    }
    else {
      urlMessage = "The player can't reproduce this type of source";
      helperColor = "#f44336";
    }
    this.setState({
      showHelperText: showHelperText,
      urlMessage: urlMessage,
      helperColor: helperColor,
      validUrl: isValid,
      url: url,
    });
  }

  componentDidMount(){
    this.props.getVideoAttributesFunction(() => this.getVideoAttributes());
    this.props.resetInputButtonFunction(() => this.resetInputButton());
    this.props.generateVideoSaltFunction(() => this.generateVideoSalt());
    this.generateVideoSalt();
  }

  render() {
    return(
      <div className="gallery-content-form-container">
        <div className="gallery-content-row">
          <div className="button-preview-column">
            {
              this.state.showPreview ?
                <VideoPreview
                  id={this.state.video.id}
                  link={this.state.video.url}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  resetInputButton={this.resetInputButton.bind(this)}
                  generateSalt={this.generateVideoSalt.bind(this)}
                />
              :
              <div>
                {
                  this.state.source === 'upload' ?
                    <GalleryFileUpload
                      parentId={"my-images" + this.state.videoSalt}
                      removeFunction="RemoveCourseFile"
                      collection={CourseFilesCollection}
                      accept="video/*"
                      label="Upload a video"
                      type={"video"}
                      setSourceRadioGroup={this.setSourceRadioGroup.bind(this)}
                      showControlMessage={this.props.showControlMessage.bind(this)}
                      getFileInformation={this.getFileInformation.bind(this)}
                      removeFileInformation={this.removeFileInformation.bind(this)}
                      resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                      generateSalt={this.generateVideoSalt.bind(this)}
                      ignoreFile={this.ignoreFile.bind(this)}
                    />
                  :
                  undefined
                }
                {
                  this.state.source === 'url' ?
                    <div className="url-input-container">
                      <TextField
                        id="url-input"
                        label="Url"
                        margin="normal"
                        variant="outlined"
                        required
                        onChange={this.urlHandleChange()}
                        className="url-input"
                        helperText={ this.state.showHelperText ? <div className="url-helper-text" style={{color: this.state.helperColor}}>{this.state.urlMessage}</div> : undefined }
                      />
                      <Button onClick={() => this.validateUrl()} className="url-check-button" color="primary">Test source</Button>
                    </div>
                  :
                  undefined
                }
                {
                  this.state.validUrl ?
                    <FormControl className="content-form-control" component="fieldset">
                      <FormGroup className="center-form-group" aria-label="position" name="description" value={this.state.addToGallery} onChange={this.addToGalleryHandleChange} row>
                        <FormControlLabel
                          value="description"
                          control={<Checkbox color="primary" checked={this.state.addToGallery}/>}
                          label="Add to video gallery"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  :
                  undefined
                }
                {
                  !this.state.hideSource ?
                    <FormControl id="video-source-form-control" className="content-form-control" component="fieldset">
                      <FormLabel className="content-form-label-center" component="legend">Source</FormLabel>
                      <RadioGroup className="content-radio-group-center" aria-label="position" name="source" value={this.state.source} onChange={this.handleChange} row>
                        <FormControlLabel
                          value="upload"
                          control={<Radio color="primary" />}
                          label="Upload"
                          labelPlacement="end"
                          className="radio-input"
                        />
                        <FormControlLabel
                          value="url"
                          control={<Radio color="primary" />}
                          label="Url"
                          labelPlacement="end"
                          className="radio-input"
                        />
                      </RadioGroup>
                    </FormControl>
                  :
                  undefined
                }
              </div>
            }
          </div>
          <div className="gallery-input-column">
            <div className="gallery-center-container">
              <FormControl className="content-form-control" component="fieldset">
                <FormLabel className="content-form-label-center" component="legend">Video alignment</FormLabel>
                <RadioGroup className="content-radio-group-center" aria-label="position" name="alignment" value={this.state.alignment} onChange={this.handleChange} row>
                  <FormControlLabel
                    value="flex-start"
                    control={<Radio color="primary" />}
                    label="Left"
                    labelPlacement="end"
                    className="radio-input"
                  />
                  <FormControlLabel
                    value="center"
                    control={<Radio color="primary" />}
                    label="Center"
                    labelPlacement="end"
                    className="radio-input"
                  />
                  <FormControlLabel
                    value="flex-end"
                    control={<Radio color="primary" />}
                    label="Right"
                    labelPlacement="end"
                    className="radio-input"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className="content-form-control" component="fieldset">
                <FormGroup className="center-form-group" aria-label="position" name="description" value={this.state.description} onChange={this.handleChange} row>
                  <FormControlLabel
                    value="description"
                    control={<Checkbox color="primary" checked={this.state.description}/>}
                    label="Add text description"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
              {
                this.state.description ?
                  <TextField
                    id="description-input"
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    required
                    multiline
                    rows="1"
                    className="gallery-content-input"
                  />
                :
                undefined
              }
            </div>
          </div>
        </div>
        <Divider light={true}/>
        <p className="gallery-subtitle">Video gallery</p>
        <div id="gallery-content-row-overflow" className="gallery-content-row">
          <Library
            user={"my-user"}
            type={"video"}
            pickFile={this.pickFile.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetInputButton={this.resetInputButton.bind(this)}
          />
        </div>
      </div>
    );
  }
}
