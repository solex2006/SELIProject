import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Files from 'react-files'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: "",
      showFileInput: false,
      file: undefined,
      validFile: false,
      extensions: [],
    }
  }

  onFilesChange = (files) => {
    console.log(files);
    this.setState({
      file: files
    }, () => {
      this.setState({
        validFile: true,
      });
    });
  }

  handleChange = event => {
    this.setState({
      fileType: event.target.value,
      file: undefined,
      validFile: false,
    }, () => {
      this.setState({
        showFileInput: true,
      });
      this.setFileType(this.state.fileType);
    });
  };

  setFileType(fileType) {
    let extensions;
    if(fileType === 0){
      extensions = ['audio/*'];
    }
    if(fileType === 1){
      extensions = ['.docx', '.pptx', '.xlsx', '.doc', '.xls', '.ppt'];
    }
    if(fileType === 2){
      extensions = ['.pdf'];
    }
    if(fileType === 3){
      extensions = ['video/*'];
    }
    if(fileType === 4){
      extensions = ['.zip', '.rar', '.tz', '.7z'];
    }
    if(fileType === 5){
      extensions = ['image/*'];
    }
    this.setState({
      extensions: extensions,
    });
  }

  onFilesError(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  render() {
    return(
      <div>
        <div className="form-title">Course editor</div>
        <div className="form-subtitle">File content</div>
        <MuiThemeProvider theme={theme}>
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
          <div className="select-input-container">
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="course-category"
                className="select-input-label"
                id="file-type-select-input-label"
              >
                File type *
              </InputLabel>
              <Select
                value={this.state.fileType}
                onChange={this.handleChange}
                required
                input={
                  <OutlinedInput
                    name="file-type"
                    id="file-type"
                  />
                }
              >
                <MenuItem value={0}>Audio</MenuItem>
                <MenuItem value={1}>Office (Word, Excel, Power Point)</MenuItem>
                <MenuItem value={2}>Pdf</MenuItem>
                <MenuItem value={3}>Video</MenuItem>
                <MenuItem value={4}>Compressed</MenuItem>
                <MenuItem value={5}>Image</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-container">
            {
              this.state.showFileInput ?
                <div>
                  <div className="form-subtitle">Content</div>
                  <Files
                    className='files-dropzone'
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    accepts={this.state.extensions}
                    maxFileSize={100000000000}
                    minFileSize={0}
                    clickable
                  >
                    <Button className="upload-file-button" id="upload-file-button" variant="contained" color="primary">
                      Choose file
                    </Button>
                  </Files>
                </div>
              :
              undefined
            }
          </div>
          <div className="input-container">
            {
              this.state.validFile ?
                <div className="file-information-container">
                  {
                    this.state.fileType === 0 ?
                      <div className="audio-information-icon"></div>
                    :
                    undefined
                  }
                  {
                    this.state.fileType === 1 ?
                      <div className="office-information-icon"></div>
                    :
                    undefined
                  }
                  {
                    this.state.fileType === 2 ?
                      <div className="pdf-information-icon"></div>
                    :
                    undefined
                  }
                  {
                    this.state.fileType === 3 ?
                      <div className="video-information-icon"></div>
                    :
                    undefined
                  }
                  {
                    this.state.fileType === 4 ?
                      <div className="compressed-information-icon"></div>
                    :
                    undefined
                  }
                  {
                    this.state.fileType === 5 ?
                      <div className="image-information-icon"></div>
                    :
                    undefined
                  }
                  <div className="video-information-text">
                    <p>{this.state.file[0].name}</p>
                    <p>{this.state.file[0].sizeReadable}</p>
                    <p>{this.state.file[0].type}</p>
                  </div>
                </div>
              :
              undefined
            }
          </div>
          <div className="form-button-container">
            <Button onClick={() => this.props.showForm("UnitsEditor")} className="form-button" id="upload-button" variant="contained" color="secondary">
              Save content
            </Button>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
