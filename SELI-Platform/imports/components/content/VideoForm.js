import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FileUpload from '../files/FileUpload';


import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme.js';

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFile: undefined,
      showVideoInput: true,
      parentId: 'creating-course',
      wayToAdd: '',
    }
  }

  saveContent(){
    this.props.showForm("UnitsEditor", true);
    let lessonName = document.getElementById('lesson-name-input').value;
    let content = {
      lesson: lessonName,
      type: 'video',
    };
    this.props.addContent(content);
  }

  getWayToAdd = event => {
    this.setState({
      wayToAdd: event.target.value,
    });
  }

  removeUrl(){
    this.setState({
      url: '',
      imageId: '',
    });
  }

  getImageInformation(url, id){
    this.setState({
      url: url,
      imageId: id,
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  render() {
    return(
      <div>
        <div className="form-title">Course editor</div>
        <div className="form-subtitle">Video content</div>
        <div className="input-container">
          <TextField
            id="lesson-name-input"
            label="Lesson name"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-uncontrolled"
            label="Lesson objective"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="form-subtitle">Content</div>
        <MuiThemeProvider theme={theme}>
          <div className="input-container">
            <FormControl component="fieldset">
              <FormLabel component="legend" className="radio-label">Select the way to add the video</FormLabel>
            </FormControl>
            <RadioGroup aria-label="position" name="position" value={this.state.wayToAdd} onChange={this.getWayToAdd} row>
              <FormControlLabel
                value="url"
                control={<Radio color="primary" />}
                label="By url"
                labelPlacement="end"
              />
              <FormControlLabel
                value="upload"
                control={<Radio color="primary" />}
                label="By upload"
                labelPlacement="end"
              />
            </RadioGroup>
          </div>
        </MuiThemeProvider>
        <div className=""></div>
        {
          this.state.wayToAdd === 'upload' ?
            <div className="input-file-container">
              <FileUpload
                parentId={this.state.parentId + "-file"}
                getImageInformation={this.getImageInformation.bind(this)}
                removeUrl={this.removeUrl.bind(this)}
                resetFile={this.resetFile.bind(this)}
                accept="video/*"
                label="Upload video"
                uploadedTitle="Video content"
                icon="video-g.svg"
              />
            </div>
          :
          undefined
        }
        {
          this.state.wayToAdd === 'url' ?
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Video URL"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
          :
          undefined
        }
        <div className="form-button-container">
          <Button onClick={() => this.saveContent()} className="form-button" id="upload-button" variant="contained" color="secondary">
            Save content
          </Button>
        </div>
      </div>
    )
  }
}
