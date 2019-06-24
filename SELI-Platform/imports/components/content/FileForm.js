import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Files from 'react-files'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import FileUpload from '../files/FileUpload';

export default class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: "",
      showFileInput: false,
      parentId: 'creating-course',
      extensions: [],
    }
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
    let icon;
    if(fileType === 0){
      extensions = ['audio/*'];
      icon = 'audio';
    }
    if(fileType === 1){
      extensions = ['.docx', '.pptx', '.xlsx', '.doc', '.xls', '.ppt'];
      icon = 'office';
    }
    if(fileType === 2){
      extensions = ['.pdf'];
      icon = 'pdf';
    }
    if(fileType === 3){
      extensions = ['video/*'];
      icon = 'video';
    }
    if(fileType === 4){
      extensions = ['.zip', '.rar', '.tz', '.7z'];
      icon = 'compressed';
    }
    if(fileType === 5){
      extensions = ['image/*'];
      icon = 'image';
    }
    this.setState({
      extensions: extensions,
      icon: icon,
    });
  }

  onFilesError(error) {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  saveContent(){
    this.props.showForm("UnitsEditor", true);
    let lessonName = document.getElementById('lesson-name-input').value;
    let content = {
      lesson: lessonName,
      type: 'files',
    };
    this.props.addContent(content);
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
        <div className="form-subtitle">File content</div>

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
                <div className="input-file-container">
                  <FileUpload
                    parentId={this.state.parentId + "-file"}
                    getImageInformation={this.getImageInformation.bind(this)}
                    removeUrl={this.removeUrl.bind(this)}
                    resetFile={this.resetFile.bind(this)}
                    accept={this.state.extensions}
                    label="Upload file"
                    uploadedTitle="Content"
                    icon={this.state.icon + "-g.svg"}
                  />
                </div>
              </div>
            :
            undefined
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
