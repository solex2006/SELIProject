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
import MenuItem from '@material-ui/core/MenuItem';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files/previews/ImagePreview';
import PdfPreview from '../files/previews/PdfPreview';
import Library from '../tools/Library';
import Help from '../tools/Help';
import FormPreview from '../files/previews/FormPreview';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import { validateOnlyLetters, validateOnlyNumbers } from '../../../lib/textFieldValidations';
import Audiences from './Audiences';
import FormLabel from '@material-ui/core/FormLabel';

import { savePDF } from '@progress/kendo-react-pdf';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import RadioButtonsGroup from './CheckBox'


import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Collapse } from '@material-ui/core';

export default class CourseAnalysis extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      courseInformation: this.props.courseInformation,
      weekHourOption: 'hours',
    }

    //savePDF(React.createRef().current, { 

    //fileName: 'certifcado.pdf',
    //margin: 1
    //})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    if (this.state.courseInformation.image !== undefined) {
      this.setState({
        image: this.state.courseInformation.image,
      });
    }
    if (this.state.courseInformation.sylabus !== undefined) {
      this.setState({
        sylabus: this.state.courseInformation.sylabus,
      });
    }
    this.setState({ open: false });
  };

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
    else if (name === 'durationWeeks') {
      courseInformation.durationweeks = event.target.value;
    }
    else if (name === 'language') {
      courseInformation.language = event.target.value;
    }
    this.setState({
      courseInformation: courseInformation,
    });
  };
  exportPDF() {
    // TODO: Fetch data from backend
    // TODO: Move content generator to different function
    // const element = <h2>teeeeest</h2>
    document.getElementById('test').style.display = ''
    const element = document.getElementById('test')


    savePDF(element, {
      paperSize: 'A4',
      fileName: 'report.pdf',
      margin: { top: '2cm', left: '2.5cm', right: '2.5cm', bottom: '2cm' },
      scale: 0.8,
      keepTogether: '.card',
    });
    element.style.display = 'none'
  }

  addKeyWord() {
    let keyWord = document.getElementById('keyWord-input').value;
    if (keyWord !== '') {
      let courseInformation = this.state.courseInformation;
      keyWord = keyWord.trim().split(/\s+/);
      if (keyWord.length <= 3) {
        let finalKeyWord = '';
        keyWord[0] = keyWord[0].charAt(0).toUpperCase() + keyWord[0].slice(1);
        for (var i = 0; i < keyWord.length; i++) {
          finalKeyWord = finalKeyWord + keyWord[i];
          if (i < 2) {
            finalKeyWord = finalKeyWord + " ";
          }
        }
        courseInformation.keyWords.push(finalKeyWord);
        this.setState({
          courseInformation: courseInformation,
        });
      }
      else {
        this.props.handleControlMessage(true, this.props.language.keywordsMaximumMessage);
      }
    }
    else {
      this.props.handleControlMessage(true, this.props.language.keywordsEmptyMessage);
    }
    document.getElementById('keyWord-input').value = "";
  }

  deleteKeyWord(index) {
    let courseInformation = this.state.courseInformation;
    courseInformation.keyWords.splice(index, 1);
    this.setState({
      courseInformation: courseInformation,
    });
  }

  keyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.addKeyWord();
    }
    else {
      validateOnlyLetters(event);
    }
  }

  openFileSelector(fileType, accept) {
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: false,
    }, () => { this.handleClickOpen() });
  }

  openFileSelectorEdit(fileType, accept) {
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: true,
    }, () => { this.handleClickOpen() });
  }

  getFileInformation(file) {
    this.state.fileType === "image" ?
      this.setState({
        image: file,
        showPreview: true,
        showLibrary: false,
      })
      :
      this.setState({
        sylabus: file,
        showPreview: true,
        showLibrary: false,
      })
  }

  unPickFile() {
    this.state.fileType === "image" ?
      this.setState({
        showPreview: false,
        image: undefined,
      })
      :
      this.setState({
        showPreview: false,
        sylabus: undefined,
      })
  }

  showLibrary() {
    this.setState({
      showLibrary: true,
    })
  }

  hideLibrary() {
    this.setState({
      showLibrary: false,
    })
  }

  selectFile(fileType) {
    let courseInformation = this.state.courseInformation;
    if (fileType === "image") {
      courseInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        courseInformation: courseInformation,
      });
    }
    else {
      courseInformation.sylabus = this.state.sylabus
      this.setState({
        showPreview: false,
        courseInformation: courseInformation,
      })
    }
    this.handleClose();
  }

  changeFile(type) {
    if (type === "image") {
      this.openFileSelectorEdit("image", "image/*");
    }
    else {
      this.openFileSelectorEdit("pdf", ".pdf");
    }
  }

  componentDidMount() {
    this.setState({
      image: this.state.courseInformation.image,
      sylabus: this.state.courseInformation.sylabus,
    })
    //console.log("CourePrueba",this.props.courseInformation)
  }

  getAudiences = (audiences, name) => {
    let courseInformation = this.state.courseInformation;
    //console.log("Audiences in Course Information", audiences, name)
    // console.log("CoursePrueba:::::::::::", courseInformation )
    //courseInformation.audiences = audiences;
    if (name === 'signature') {
      courseInformation.signature = audiences;
    }
    else if (name === 'level') {
      courseInformation.level = audiences;
    }
    else if (name === 'type') {
      courseInformation.type = audiences;
    }
  }

  courseDuration = (hourWeek) => {
    console.log("Semana u hora: ", hourWeek)
    if (hourWeek === "weeks") {
      this.setState({
        weekHourOption: 'weeks'
      })
    } else if (hourWeek === "hours") {
      this.setState({
        weekHourOption: 'hours'
      })
    }
  }

  render() {

    return (

      <div >
        <div id='test' style={{ display: 'none'}}>
          <div style={{ display: 'table', 
            border: '1px solid',
            width: '95%',
            height:'900px',
            }}>
            <div style={{ display: 'table-row',height:'60px',border: '1px solid'}}>
              <div style={{ border: '1px solid',display: 'table-cell',width: '30%',}}>
                123456789012
              </div>   
              <div style={{ border: '1px solid', display: 'table-cell'}}>
                Teachers:
              </div>                                  
            </div>
            <div style={{display: 'table-row',border: '1px solid'}}>
              <div style={{ border: '1px solid', display: 'table-cell'}}>
                Teachers:
              </div>
              <div style={{ border: '1px solid', display: 'table-cell'}}>
                Teachers:
              </div>
            </div>
          </div>

        </div>
        <div className="course-information-container">

        <Button onClick={() => this.exportPDF()} className="form-image-button" fullWidth color="primary"><ImageSharpIcon className="form-image-icon" />
          {this.props.language.selectCourseImage} <br />
          {this.props.language.required}
        </Button>

        <center>
          <div style={{ backgroundColor: '#edeff0', marginLeft: '500px', marginRight: '500px', fontSize: '30px', marginTop: '40px' }}>
            {"Analysis Phase"}
          </div>
        </center>
        <div style={{ width: '100%', marginLeft: '25px', marginRight: '25px', overflowY: 'scroll' }}>

          <TextField
            id="title-input"
            label={this.props.language.courseTitle}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.courseInformation.title}
            onChange={this.handleChange('title')}
          />
          <TextField
            id="subtitle-input"
            label={this.props.language.courseSubtitle}
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />

          <TextField
            id="subtitle-input"
            label="Learning Objective"
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />

          <FormLabel component="legend">Audience</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Pedagogic"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Computing"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Mathematics"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Postgraduate"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Undergraduate"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Secondary"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Teacher"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Student"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Other:"
            />
          </FormGroup>

          <TextField
            id="subtitle-input"
            label=""
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value=""

          />


          <TextField
            id="subtitle-input"
            label="Audience Characteristics"
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
          <TextField
            id="subtitle-input"
            label="Expective Behavioral Outcome"
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />

          <TextField
            id="subtitle-input"
            label="Learning Constrainst"
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />

          <FormLabel component="legend">How the content will be delivered *</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="face to face"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="blending with online"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="hybrid"
            />
          </FormGroup>


          <TextField
            id="subtitle-input"
            label="Pedagogical Considerations*"
            margin="normal"
            variant="outlined"
            fullWidth
            //required
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
        </div>
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
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar-information" variant="dense" disableGutters={true}>
                <AppsIcon />
                <h4 className="dialog-label-title">{this.state.fileType === "image" ? this.props.language.chooseOrUploadImage : this.props.language.chooseOrUploadSyllabus}</h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            <div className="file-form-dialog">
              {
                this.state.showLibrary ?
                  <Library
                    user={Meteor.userId()}
                    type={this.state.fileType}
                    getFileInformation={this.getFileInformation.bind(this)}
                    hideLibrary={this.hideLibrary.bind(this)}
                    language={this.props.language}
                  />
                  :
                  <div>
                    <div className="library-button-container">
                      <Fab onClick={() => this.showLibrary()}>
                        <FolderSpecialIcon />
                      </Fab>
                      <p className="media-fab-text">{this.props.language.library}</p>
                    </div>
                    {
                      this.state.showPreview ?
                        <div className="form-preview-container">
                          {
                            this.state.fileType === "image" ?
                              <ImagePreview
                                file={this.state.image}
                                unPickFile={this.unPickFile.bind(this)}
                                language={this.props.language}
                                tipo={"Course"}
                              />
                              :
                              <PdfPreview
                                file={this.state.sylabus}
                                unPickFile={this.unPickFile.bind(this)}
                                language={this.props.language}
                              />
                          }
                        </div>
                        :
                        <div className="form-file-container">
                          <FileUpload
                            type={this.state.fileType}
                            user={Meteor.userId()}
                            accept={this.state.accept}
                            getFileInformation={this.getFileInformation.bind(this)}
                            label={this.state.fileType === 'image' ? this.props.language.uploadImageButtonLabel : this.props.language.uploadPdfButtonLabel}
                          />
                        </div>
                    }
                  </div>
              }
            </div>
          </DialogContent>
          <div className="dialog-actions-container">
            <Tooltip title={this.props.language.done}>
              <Fab onClick={() => this.selectFile(this.state.fileType)} disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} className="dialog-fab" color="primary">
                <AssignmentTurnedInIcon />
              </Fab>
            </Tooltip>
          </div>
        </Dialog>
      </div>
    );
  }
}
