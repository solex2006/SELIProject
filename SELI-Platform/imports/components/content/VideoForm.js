import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Files from 'react-files'

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFile: undefined,
      showVideoInput: true,
    }
  }

  onFilesChange = (files) => {
    console.log(files);
    this.setState({
      videoFile: files,
      showVideoInput: false,
    });
  }

  onFilesError(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
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
        <div className="form-subtitle">Or upload video</div>
        <div className="input-container">
          {
            this.state.showVideoInput ?
              <Files
                className='files-dropzone'
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={['video/*']}
                multiple
                maxFiles={1}
                maxFileSize={100000000000}
                minFileSize={0}
                clickable
              >
                <Button className="upload-file-button" id="upload-file-button" variant="contained" color="primary">
                  Choose file
                </Button>
              </Files>
            :
            <div className="video-information-container">
              <div className="video-information-icon"></div>
              <div className="video-information-text">
                <p>{this.state.videoFile[0].name}</p>
                <p>{this.state.videoFile[0].sizeReadable}</p>
                <p>{this.state.videoFile[0].type}</p>
              </div>
            </div>
          }
        </div>
        <div className="form-button-container">
          <Button onClick={() => this.saveContent()} className="form-button" id="upload-button" variant="contained" color="secondary">
            Save content
          </Button>
        </div>
      </div>
    )
  }
}
