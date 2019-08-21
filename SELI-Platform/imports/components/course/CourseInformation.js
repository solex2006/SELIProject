import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorIcon from '@material-ui/icons/Error';
import ImageIcon from '@material-ui/icons/Image';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import GalleryFileUpload from '../files/GalleryFileUpload';
import ImagePreview from '../files/previews/ImagePreview';
import PdfPreview from '../files/previews/PdfPreview';
import Library from '../tools/Library';
import Help from '../tools/Help';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';

export default class CourseInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInformation: {
        title: '',
        subtitle: '',
        description: '',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: '',
        modalities: [],
        methodologies: [],
      },
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  generateCourseCreatorKey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleChange = name => event => {
    let courseInformation = this.state.courseInformation;
    if (name === 'title') {
      courseInformation.title = event.target.value;
    }
    else if (name === 'subtitle') {
      courseInformation.subtitle = event.target.value;
    }
    else if (name === 'description') {
      courseInformation.description = event.target.value;
    }
    else if (name === 'duration') {
      courseInformation.duration = event.target.value;
    }
    this.setState({
      courseInformation: courseInformation,
    }, () => console.log(this.state.courseInformation));
  };

  addKeyWord(){
    let keyWord = document.getElementById('keyWord-input').value;
    if(keyWord !== '') {
      let courseInformation = this.state.courseInformation;
      courseInformation.keyWords.push(keyWord);
      this.setState({
        courseInformation: courseInformation,
      }, () => console.log(this.state.courseInformation));
    }
    document.getElementById('keyWord-input').value = "";
  }

  deleteKeyWord(index) {
    let courseInformation = this.state.courseInformation;
    courseInformation.keyWords.splice(index, 1);
    this.setState({
      courseInformation: courseInformation,
    }, () => console.log(this.state.courseInformation));
  }

  openGallery(fileType){
    this.setState({
      fileType: fileType
    }, () => {this.handleClickOpen()});
  }

  getFileInformation(fileInformation){
    let courseInformation = this.state.courseInformation;
    if(this.state.fileType === "image"){
      courseInformation.image = fileInformation;
    }
    if(this.state.fileType === "pdf"){
      courseInformation.sylabus = fileInformation;
    }
    this.setState({
      courseInformation: courseInformation,
      showPreview: true,
    });
  }

  removeFileInformation(){
    let courseInformation = this.state.courseInformation;
    if(this.state.fileType === "image"){
      courseInformation.image = undefined;
    }
    if(this.state.fileType === "pdf"){
      courseInformation.sylabus = undefined;
    }
    this.setState({
      courseInformation: courseInformation,
      showPreview: false,
    });
  }

  generateImageSalt(){
    this.setState({
      imageSalt: Math.random(),
    });
  }

  generatePdfSalt(){
    this.setState({
      pdfSalt: Math.random(),
    });
  }

  pickFile(file){
    let fileInformation = {
      url: file.link,
      id: file._id,
    }
    let courseInformation = this.state.courseInformation;
    if(this.state.fileType === "image"){
      fileInformation.type = "image";
      courseInformation.image = fileInformation;
    }
    if(this.state.fileType === "pdf"){
      fileInformation.type = "pdf";
      fileInformation.name = file.name;
      courseInformation.sylabus = fileInformation;
    }
    this.setState({
      courseInformation: courseInformation,
      showPreview: true,
    });
  }

  ignoreFile(){
    let courseInformation = this.state.courseInformation;
    if(this.state.fileType === "image"){
      courseInformation.image = undefined;
    }
    if(this.state.fileType === "pdf"){
      courseInformation.sylabus = undefined;
    }
    this.setState({
      courseInformation: courseInformation,
      showPreview: false,
    });
  }

  resetInputButton(){}

  componentDidMount() {
    this.generateImageSalt();
    this.generatePdfSalt();
    //this.props.setCourseTemporalKey(this.generateCourseCreatorKey(15));
  }

  componentWillUnmount(){

  }

  render() {
    return(
      <div className="course-information-container">
        <div className="form-file-column">
          <Button onClick={() => this.openGallery("image")} className="form-image-button" fullWidth color="primary"><ImageSharpIcon className="form-image-icon"/>Select the course image</Button>
          <Button onClick={() => this.openGallery("pdf")} className="form-file-button" fullWidth color="secondary"><PictureAsPdfSharpIcon className="form-image-icon"/>Select the course sylabus</Button>
        </div>
        <div className="form-input-column">
          <TextField
            id="title-input"
            label="Course title"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.courseInformation.title}
            onChange={this.handleChange('title')}
          />
          <TextField
            id="subtitle-input"
            label="Course subtitle"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
          <TextField
            id="description-input"
            label="Course description"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
          <div className="row-input">
            <TextField
              id="keyWord-input"
              label="Course keywords"
              margin="normal"
              variant="outlined"
              required
              className="button-input"
            />
            <Button onClick={() => this.addKeyWord()} className="form-small-button" color="primary">Add keyword</Button>
            <Help
              helper="keyWordHelper"
              text="Key words are used for this:"
            />
          </div>
          {
            this.state.courseInformation.keyWords.length ?
              <div className="chips-container">
                {this.state.courseInformation.keyWords.map((keyWord, index) => {
                  return(
                    <Chip
                      size="small"
                      avatar={<Avatar>{keyWord.charAt(0)}</Avatar>}
                      label={keyWord}
                      className="chip"
                      color="primary"
                      onDelete={() => this.deleteKeyWord(index)}
                    />
                  )
                })}
              </div>
            :
            <p className="form-message">No key words added <ErrorIcon className="form-message-icon"/></p>
          }
          <TextField
            id="duration-input"
            label="Estimated course duration"
            margin="normal"
            variant="outlined"
            type="number"
            fullWidth
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">hours</InputAdornment>,
            }}
            inputProps={{ min: "5", max: "300", step: "1" }}
            value={this.state.courseInformation.duration}
            onChange={this.handleChange('duration')}
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="form-dialog"
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{this.state.fileType === "image" ? "Choose or upload the course image" : "Choose or upload the course sylabus"}</DialogTitle>
          <DialogContent>
            {
              this.state.fileType === "image" ?
                <div>
                  <div className="form-file-preview">
                    {
                      this.state.showPreview && this.state.courseInformation.image !== undefined ?
                        <ImagePreview
                          id={this.state.courseInformation.image.id}
                          link={this.state.courseInformation.image.url}
                          showControlMessage={this.props.showControlMessage.bind(this)}
                          resetInputButton={this.resetInputButton.bind(this)}
                          generateSalt={this.generateImageSalt.bind(this)}
                        />
                      :
                      <GalleryFileUpload
                        parentId={"my-images" + this.state.imageSalt}
                        removeFunction="RemoveCourseFile"
                        collection={CourseFilesCollection}
                        accept="image/*"
                        label="Upload an image"
                        type={"image"}
                        showControlMessage={this.props.showControlMessage.bind(this)}
                        getFileInformation={this.getFileInformation.bind(this)}
                        removeFileInformation={this.removeFileInformation.bind(this)}
                        resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                        generateSalt={this.generateImageSalt.bind(this)}
                        ignoreFile={this.ignoreFile.bind(this)}
                      />
                    }
                  </div>
                  <DialogContentText className="form-dialog-center-text" id="alert-dialog-description">
                    Or pick one from your
                  </DialogContentText>
                  <p className="gallery-subtitle">Image gallery</p>
                  <div className="form-library-container">
                    <Library
                      user={"my-user"}
                      type={"image"}
                      pickFile={this.pickFile.bind(this)}
                      showControlMessage={this.props.showControlMessage.bind(this)}
                      resetInputButton={this.resetInputButton.bind(this)}
                    />
                  </div>
                </div>
              :
                undefined
            }
            {
              this.state.fileType === "pdf" ?
                <div>
                  <div className="form-file-preview">
                    {
                      this.state.showPreview && this.state.courseInformation.sylabus !== undefined ?
                        <PdfPreview
                          id={this.state.courseInformation.sylabus.id}
                          link={this.state.courseInformation.sylabus.url}
                          name={this.state.courseInformation.sylabus.name}
                          showControlMessage={this.props.showControlMessage.bind(this)}
                          resetInputButton={this.resetInputButton.bind(this)}
                          generateSalt={this.generatePdfSalt.bind(this)}
                        />
                      :
                      <GalleryFileUpload
                        parentId={"my-image" + this.state.pdfSalt}
                        removeFunction="RemoveCourseFile"
                        collection={CourseFilesCollection}
                        accept=".pdf"
                        label="Upload a pdf"
                        type={"pdf"}
                        showControlMessage={this.props.showControlMessage.bind(this)}
                        getFileInformation={this.getFileInformation.bind(this)}
                        removeFileInformation={this.removeFileInformation.bind(this)}
                        resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                        generateSalt={this.generatePdfSalt.bind(this)}
                        ignoreFile={this.ignoreFile.bind(this)}
                      />
                    }
                  </div>
                  <DialogContentText className="form-dialog-center-text" id="alert-dialog-description">
                    Or pick one from your
                  </DialogContentText>
                  <p className="gallery-subtitle">Pdf library</p>
                  <div className="form-library-container">
                    <Library
                      user={"my-user"}
                      type={"pdf"}
                      pickFile={this.pickFile.bind(this)}
                      showControlMessage={this.props.showControlMessage.bind(this)}
                      resetInputButton={this.resetInputButton.bind(this)}
                    />
                  </div>
                </div>
              :
                undefined
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {
              this.state.fileType === "image" ?
                <Button disabled={this.state.courseInformation.image === undefined} onClick={this.handleClose} color="primary" autoFocus>
                  {"Use image"}
                </Button>
              :
                undefined
            }
            {
              this.state.fileType === "pdf" ?
                <Button disabled={this.state.courseInformation.sylabus === undefined} onClick={this.handleClose} color="primary" autoFocus>
                  {"Use sylabus"}
                </Button>
              :
                undefined
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
