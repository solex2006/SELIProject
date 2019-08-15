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
import AudioPreview from '../files//previews/AudioPreview';


export default class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'flex-start',
      description: false,
    }
  }

  handleChange = event => {
    if (event.target.name === 'alignment') {
      this.setState({
        alignment: event.target.value,
      });
    }
    else {
      this.setState({
        description: event.target.checked,
      });
    }
  }

  clearInputs(){
    if(this.state.description){
      document.getElementById('description-input').value = "";
    }
    this.setState({
      description: false,
      alignment: 'flex-start',
      audio: undefined,
    });
  }

  getAudioAttributes(){
    let audio = this.state.audio;
    let description = '';
    if(this.state.description){
      description = document.getElementById('description-input').value;
    }
    let alignment = this.state.alignment;
    let audioContent = {
      audio: audio,
      description: description,
      alignment: alignment,
    };
    this.clearInputs();
    this.generateAudioSalt();
    return audioContent;
  }

  getFileInformation(fileInformation){
    if(fileInformation){
      this.setState({
        audio: fileInformation,
      });
    }
  }

  removeFileInformation(){
    this.setState({
      audio: undefined,
    });
  }

  generateAudioSalt(){
    this.setState({
      audioSalt: Math.random(),
    });
  }

  pickFile(file){
    let fileInformation = {
      url: file.link,
      id: file._id,
      type: "audio",
    }
    this.setState({
      audio: fileInformation,
      showPreview: false,
    }, () => {
      this.setState({
        showPreview: true,
      });
    });
  }

  ignoreFile(){
    this.setState({
      fileInformation: undefined,
      showPreview: false,
    })
  }

  resetInputButton(){}

  componentDidMount(){
    this.props.getAudioAttributesFunction(() => this.getAudioAttributes());
    this.props.resetInputButtonFunction(() => this.resetInputButton());
    this.props.generateAudioSaltFunction(() => this.generateAudioSalt());
    this.generateAudioSalt();
  }

  render() {
    return(
      <div className="gallery-content-form-container">
        <div className="gallery-content-row">
          <div className="button-preview-column">
            {
              this.state.showPreview ?
                <AudioPreview
                  id={this.state.audio.id}
                  link={this.state.audio.url}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  resetInputButton={this.resetInputButton.bind(this)}
                  generateSalt={this.generateAudioSalt.bind(this)}
                />
              :
              <GalleryFileUpload
                parentId={"my-images" + this.state.audioSalt}
                removeFunction="RemoveCourseFile"
                collection={CourseFilesCollection}
                accept="audio/*"
                label="Upload an audio"
                type={"audio"}
                showControlMessage={this.props.showControlMessage.bind(this)}
                getFileInformation={this.getFileInformation.bind(this)}
                removeFileInformation={this.removeFileInformation.bind(this)}
                resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                generateSalt={this.generateAudioSalt.bind(this)}
                ignoreFile={this.ignoreFile.bind(this)}
              />
            }
          </div>
          <div className="gallery-input-column">
            <div className="gallery-center-container">
              <FormControl className="content-form-control" component="fieldset">
                <FormLabel className="content-form-label-center" component="legend">Image alignment</FormLabel>
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
        <p className="gallery-subtitle">Audio gallery</p>
        <div id="gallery-content-row-overflow" className="gallery-content-row">
          <Library
            user={"my-user"}
            type={"audio"}
            pickFile={this.pickFile.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetInputButton={this.resetInputButton.bind(this)}
          />
        </div>
      </div>
    );
  }
}
