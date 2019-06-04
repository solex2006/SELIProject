import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Files from 'react-files'

export default class AnimationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationFile: undefined,
      showAnimationInput: true,
    }
  }

  onFilesChange = (files) => {
    console.log(files);
    this.setState({
      animationFile: files,
      showAnimationInput: false,
    });
  }

  onFilesError(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  render() {
    return(
      <div>
        <div className="form-title">Course editor</div>
        <div className="form-subtitle">Animation content</div>

        <div className="input-container">
          <TextField
            id="outlined-uncontrolled"
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
            label="Animation URL"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="form-subtitle">Or upload animation</div>
        <div className="input-container">
          {
            this.state.showAnimationInput ?
              <Files
                className='files-dropzone'
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={['.html']}
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
                <p>{this.state.animationFile[0].name}</p>
                <p>{this.state.animationFile[0].sizeReadable}</p>
                <p>{this.state.animationFile[0].type}</p>
              </div>
            </div>
          }
        </div>
        <div className="form-button-container">
          <Button onClick={() => this.props.showForm("UnitsEditor", true)} className="form-button" id="upload-button" variant="contained" color="secondary">
            Save content
          </Button>
        </div>
      </div>
    )
  }
}
