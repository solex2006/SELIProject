import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Files from 'react-files'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

import FileUpload from '../files/FileUpload';
import File from '../../map/File';

import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: "",
      showFileInput: false,
      parentId: this.props.courseKey,
      extensions: [],
      files: [],
      open: false,
    }
  }

  handleChange = event => {
    this.setState({
      fileType: event.target.value,
      file: undefined,
      validFile: false,
    }, () => {
      this.setState({
        selectedFile: true,
      }, () => {
        this.checkShowUpload();
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
      type: icon,
    });
  }

  saveContent(){
    this.handleClickOpenLoading();
    for (var i = 0; i < this.state.files.length; i++) {
      this.state.files[i].link = CourseFilesCollection.findOne({ _id: this.state.files[i].fileId }).link();
    }
    let lessonName = document.getElementById('lesson-name-input').value;
    let lessonObjetive = document.getElementById('lesson-objective-input').value;
    let content = {
      lesson: lessonName,
      objective: lessonObjetive,
      type: 'files',
      files: this.state.files,
    };
    this.props.addContent(content);
    this.handleCloseLoading();
  }

  getFileInformation(fileInformation){
    this.setState({
      fileInformation: fileInformation,
    });
  }

  removeFileInformation(){
    this.setState({
      fileInformation: [],
    });
    this.setState({
      showVideoAccesibilityForm: false,
    });
  }

  showVideoAccesibilityForm(){
    this.setState({
      showVideoAccesibilityForm: true,
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-course',
    });
  }

  handleChangeText = fileDescription => event => {
    let fillFileDescription = false;
    if(event.target.value.length > 0){
      fillFileDescription = true;
    }
    else {
      fillFileDescription = false;
    }
    this.setState({
      fillFileDescription: fillFileDescription,
    }, () => {
      this.checkShowUpload();
    });
  };

  checkShowUpload(){
    let showFileInput;
    if(this.state.fillFileDescription && this.state.selectedFile){
      showFileInput = true;
    }
    else {
      showFileInput = false;
    }
    this.setState({
      showFileInput: showFileInput,
    });
  }

  addFile(file){
    let files = this.state.files;
    let description = document.getElementById('file-description-input').value;
    file.description = description;
    files.push(file);
    this.setState({
      files: files,
    });
    document.getElementById('file-description-input').value = "";
    this.setState({
      showFileInput: false,
    });
  }

  deleteFile(_id){
    Meteor.call('RemoveCourseFile', _id, function (err) {
      if (err) {
        this.props.showControlMessage('There was an error deleting the file, try again later');
        return;
      }
    });

    let files = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if(files[i].fileId === _id){
        files.splice(i, 1);
      }
    }
    this.setState({
      files: files,
    }, () => {
      this.props.showControlMessage('File deleted successfully');
    });
  }

  handleClickOpenLoading = () => {
    this.setState({ openLoading: true });
  };

  handleCloseLoading = () => {
    this.setState({ openLoading: false }, () => {this.props.showForm("UnitsEditor", true)});
  };

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
            id="lesson-objective-input"
            label="Lesson objective"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        {
          this.state.files.length ?
            <div className="added-files-container">
              <div className="form-subtitle">Added files</div>
              {
                this.state.files.map((files) =>
                  {
                    return <File
                      files={files}
                      key={files.fileId}
                      showControlMessage={this.props.showControlMessage.bind(this)}
                      deleteFile={this.deleteFile.bind(this)}/>
                  })
              }
            </div>
          :
            undefined
        }
        <div className="input-container">
          <TextField
            id="file-description-input"
            label="File description"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows="3"
            onChange={this.handleChangeText('fileDescription')}
            helperText="Fill this description to upload the file"
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
            <FormHelperText>Also select the file type to upload the file</FormHelperText>
          </FormControl>
        </div>
        <div className="input-container">
          {
            this.state.showFileInput ?
              <div>
                <div className="input-file-container">
                  <FileUpload
                    parentId={this.state.parentId + "-file" + "-" + this.state.type + "-" + this.state.files.length}
                    accept={this.state.extensions}
                    label="Upload file"
                    uploadedTitle="File content"
                    icon={this.state.icon + "-g.svg"}
                    collection={CourseFilesCollection}
                    removeFunction="RemoveCourseFile"
                    type={this.state.type}
                    preview={this.state.preview}
                    dowload={this.state.download}
                    open={this.state.open}
                    delete={true}
                    showIcon={true}
                    showControlMessage={this.props.showControlMessage.bind(this)}
                    resetFile={this.resetFile.bind(this)}
                    getFileInformation={this.getFileInformation.bind(this)}
                    removeFileInformation={this.removeFileInformation.bind(this)}
                    multifile={true}
                    addFile={this.addFile.bind(this)}
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
        <Dialog
          open={this.state.openLoading}
          onClose={this.handleCloseLoading}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle id="language-select-title">Uploading content please wait...</DialogTitle>
          <DialogContent>
            <div className="loading-file-progress-icon">
              <CircularProgress
                value={this.state.progress + "%"}
                color="primary"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
          )
        }
      }
