import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
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

//import { savePDF } from '@progress/kendo-react-pdf';

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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Page, Text, View, Document, StyleSheet, PDFViewer, ReactPDF } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
//import { pdf } from '@react-pdf/renderer';
import CourseCreatorMenu from './CourseCreatorMenu';
import DisabilitieMenu from './DisabilitieMenu';



import ListItemText from '@material-ui/core/ListItemText';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';
import ContentMenuItem from './ContentMenuItem';
import NavigationTool from './NavigationTool';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const saveBlob = (blob, filename) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const savePdf = async (document, filename) => {
  //saveBlob(await pdf(document).toBlob(), filename);
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: '25mm',
    marginTop: '40mm',
    marginBottom: '40mm'
  },
  sectionLeft: {
    width: '20mm',
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',

    padding: 10,
    flexGrow: 1
  },
  sectionRight: {
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    marginRight: 20,
    padding: 10,
    flexGrow: 1
  },
  section: {
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '55mm',
    height: '10mm',
  },
  section1: {
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '100mm',
    height: '10mm'
  },
  section2: {
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '55mm',
    height: '20mm'
  },
  section3: {
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '100mm',
    height: '20mm'
  },
  section4: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '155mm',
    height: '20mm'
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
});

// Create Document Component
const MyDocument = () => (
  <div></div>
  /*<Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.sectionLeft}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.sectionRight}>
        <Text>Section #2</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.flexCol}>
        <View style={styles.flex}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section1}>
            <Text>Section #2</Text>
          </View>
        </View>
        <View style={styles.section4}>

          <Text>Section #5</Text>

        </View>
        <View style={styles.flex}>
          <View style={styles.section2}>
            <Text>Section #3</Text>
          </View>
          <View style={styles.section3}>
            <Text>Section #4</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>*/
);

export default class CourseSpiralCourse extends React.Component {
  constructor(props) {


    super(props);
    this.state = {
      mostrar: false,
      problem: false,
      activity: false,
      count: [1],
      courseInformation: this.props.courseInformation,
      weekHourOption: 'hours',
      contentItems: [
        { id: Math.random(), type: "text" },
        { id: Math.random(), type: "image" },
        { id: Math.random(), type: "video" },
        { id: Math.random(), type: "audio" },
        { id: Math.random(), type: "pdf" },
        { id: Math.random(), type: "compressed" },
        { id: Math.random(), type: "link" },
        { id: Math.random(), type: "quiz" },
        { id: Math.random(), type: "activity" },
        { id: Math.random(), type: "embebed" },
        { id: Math.random(), type: "h5p" },
        { id: Math.random(), type: "unity" },
      ],
      menuTab: 0,
      sortMode: false,
      correctOrganization: false,
      courseInformation: this.props.courseInformation,

    }
  }



  openDialog(e) {
    let type = e.payload.type;
    let courseInformation = this.state.courseInformation;
    let languageTypeAdded = "";
    if (type === 'text') { languageTypeAdded = this.props.language.text }
    else if (type === 'image') { languageTypeAdded = this.props.language.image }
    else if (type === 'video') { languageTypeAdded = this.props.language.video }
    else if (type === 'audio') { languageTypeAdded = this.props.language.audio }
    else if (type === 'link') { languageTypeAdded = this.props.language.link }
    else if (type === 'unity') { languageTypeAdded = this.props.language.unity }
    else if (type === 'embebed') { languageTypeAdded = this.props.language.embebed }
    else if (type === 'pdf') { languageTypeAdded = this.props.language.pdf }
    else if (type === 'compressed') { languageTypeAdded = this.props.language.compressed }
    else if (type === 'h5p') { languageTypeAdded = "h5p" }
    else if (type === 'quiz') { languageTypeAdded = this.props.language.quiz }
    else if (type === 'activity') { languageTypeAdded = this.props.language.activity }
    this.setState({
      contentTypeAdded: type,
      languageType: languageTypeAdded,
      addedId: e.payload.id,
      showCourseOrganization: false,
      showContentEditor: true,
    });
    if (e.addedIndex !== null && e.removedIndex !== null) {

    }
    else {
      this.contentHandleClickOpen();
    }
    if (courseInformation.organization.subunit) {
      courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items = applyDrag(courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items, e);
    }
    else {
      courseInformation.program[this.props.selected[0]].items = applyDrag(courseInformation.program[this.props.selected[0]].items, e);
    }
    this.setState({
      contentaAdded: true,
    });
  }

  getItemAttributes() { }

  createContent() {
    let courseInformation = this.state.courseInformation;
    let index;
    let itemContent = this.getItemAttributes();

    //console.log("courseInformation",courseInformation)
    //console.log("courseInformation",itemContent)
    if (itemContent !== undefined) {
      if (courseInformation.organization.subunit) {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === this.state.addedId) {
            index = i;
            break;
          }
        }
      }
      else {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].items[i].id === this.state.addedId) {
            index = i;
            break;
          }
        }
      }
      if (courseInformation.organization.subunit) {
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes = itemContent;
      }
      else {
        courseInformation.program[this.props.selected[0]].items[index].attributes = itemContent;
      }
      if (this.state.contentTypeAdded === 'image') {
        let size = {
          width: 500,
          height: 300,
        }
        if (courseInformation.organization.subunit) {
          courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.size = size;
        }
        else {
          courseInformation.program[this.props.selected[0]].items[index].attributes.size = size;
        }
      }
      let showAccessibilityOptions = false;
      if (this.state.contentTypeAdded === "audio" || this.state.contentTypeAdded === "image" || this.state.contentTypeAdded === "video") {
        showAccessibilityOptions = true;
      }
      else {
      }
      this.setState({
        showAccessibilityOptions: showAccessibilityOptions,
        showCourseOrganization: false,
        showContentEditor: false,
        contentOpen: showAccessibilityOptions,
        contentToConfigureAccessibility: itemContent,
      });
      this.resetMenuItems();
    }
    else {
    }
  }
  finishEditContent() {
    let courseInformation = this.state.courseInformation;
    let index;
    let itemContent = this.getItemAttributes();
    if (itemContent !== undefined) {
      if (courseInformation.organization.subunit) {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === this.state.contentToEdit.id) {
            index = i;
            break;
          }
        }
      }
      else {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].items[i].id === this.state.contentToEdit.id) {
            index = i;
            break;
          }
        }
      }
      if (courseInformation.organization.subunit) {
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes = itemContent;
      }
      else {
        courseInformation.program[this.props.selected[0]].items[index].attributes = itemContent;
      }
      this.contentHandleClose();
      this.resetMenuItems();
    }
  }

  resetMenuItems() {
    let contentItems = createContentItems();
    this.setState({
      contentItems: contentItems,
    });
  }

  cancelContentCreation() {
    let courseInformation = this.state.courseInformation;
    let index;
    if (courseInformation.organization.subunit) {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === this.state.addedId) {
          index = i;
          break;
        }
      }
      this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.splice(index, 1);
    }
    else {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].items[i].id === this.state.addedId) {
          index = i;
          break;
        }
      }
      this.props.courseInformation.program[this.props.selected[0]].items.splice(index, 1);
    }
    this.setState({
      contentTypeAdded: '',
    });
  }

  removeItem(item) {
    let courseInformation = this.state.courseInformation;
    if (courseInformation.organization.subunit) {
      let removeIndex = this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.indexOf(item);
      this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.splice(removeIndex, 1);
    }
    else {
      let removeIndex = this.props.courseInformation.program[this.props.selected[0]].items.indexOf(item);
      this.props.courseInformation.program[this.props.selected[0]].items.splice(removeIndex, 1);
    }
    this.setState({
      deleted: true,
    });
  }

  editItem(item) {
    this.setState({
      contentTypeAdded: item.type,
      showAccessibilityOptions: false,
      showCourseOrganization: false,
      showContentEditor: true,
      contentOpen: true,
      contentaAdded: true,
      languageType: this.props.language[item.type],
      contentToEdit: item,
    });
  }

  setDisabilitieOption(support) {
    let courseInformation = this.state.courseInformation;
    courseInformation.support = support;
    this.setState({
      courseInformation: courseInformation,
    });
  }

  setMenuTab(tab) {
    this.setState({
      menuTab: tab,
    });
  }

  showAccessibilityForm() {
    this.setState({
      showAccessibilityForm: true,
      showAccessibilityOptions: false,
    })
  }

  editAccessibilityForm(item) {
    this.setState({
      addedId: item.id,
      contentToEdit: item,
      contentTypeAdded: item.type,
      contentaAdded: true,
      languageType: this.props.language[item.type],
      showAccessibilityForm: true,
      showAccessibilityOptions: false,
      contentOpen: true,
      contentToConfigureAccessibility: item.attributes,
      showContentEditor: false,
    })
  }

  toggleSortMode() {
    if (this.props.courseInformation.organization.subunit) {
      if (this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length) {
        this.setState({
          sortMode: !this.state.sortMode,
        });
      }
      else {
        this.props.handleControlMessage(true, this.props.language.firstAddSomeContent);
      }
    }
    else {
      if (this.props.courseInformation.program[this.props.selected[0]].items.length) {
        this.setState({
          sortMode: !this.state.sortMode,
        });
      }
      else {
        this.props.handleControlMessage(true, this.props.language.firstAddSomeContent);
      }
    }
    this.reRender();
  }

  turnOffSortMode() {
    this.setState({
      sortMode: false,
    });
  }

  manageOrganization() {
    this.setState({
      showWarningOrganization: false,
      showCourseOrganization: true,
      contentOpen: true,
    });
  }

  warningOrganization() {
    this.contentHandleClickOpen();
    this.setState({
      showContentEditor: false,
      contentaAdded: false,
      showWarningOrganization: true,
    });
  }

  setOrganization() {
    this.refs.CourseOrganization.addUnit()
    this.refs.CourseOrganization.addSubunit()
    this.contentHandleClose()
    this.setState({
      showCourseOrganization: false,
      correctOrganization: true,
    });
  }

  validateOrganization(value) {
    this.setState({
      correctOrganization: value,
    }, () => {
      !this.state.correctOrganization ? this.showCreatorToolMessage('navigation') : undefined
      this.state.correctOrganization ? this.handleCloseSnackbar() : undefined
    });
  }

  componentDidMount() {
    if (this.props.courseInformation.organization === '') {
      this.setState({
        showWarningOrganization: false,
        showCourseOrganization: true,
        contentOpen: true,
        correctOrganization: true,
      })
    }
    else {
      this.setState({
        showCourseOrganization: false,
        contentOpen: false,
      });
      this.showCreatorToolMessage("navigation");
    }
  }

  reRender() {
    this.forceUpdate();
    this.setState({ state: this.state });
  }
  handleSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  showCreatorToolMessage(type) {
    this.setState({
      snackbarType: type,
    }, () => {
      this.handleSnackbar();
    });
  }

  getAccessibilityPercentage = (value) => {
    let courseInformation = this.state.courseInformation;
    let index;
    if (courseInformation.organization.subunit) {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === this.state.addedId) {
          index = i;
          break;
        }
      }
    }
    else {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].items[i].id === this.state.addedId) {
          index = i;
          break;
        }
      }
    }
    if (courseInformation.organization.subunit) {
      courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.percentage = value;
    }
    else {
      courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.percentage = value;
    }
    this.setState({
      courseInformation: courseInformation,
    });
  }

  handleDecorative = (_id) => {
    let courseInformation = this.state.courseInformation;
    let index;
    if (courseInformation.organization.subunit) {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === _id) {
          index = i;
          break;
        }
      }
    }
    else {
      for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
        if (courseInformation.program[this.props.selected[0]].items[i].id === _id) {
          index = i;
          break;
        }
      }
    }
    if (courseInformation.organization.subunit) {
      courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.pureDecorative = !courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.pureDecorative;
    }
    else {
      courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.pureDecorative = !courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.pureDecorative;
    }
    this.setState({
      courseInformation: courseInformation,
    });
  }

  setContentAccessibilityData = (data) => {
    if (!this.state.configuringAccessibility) {
      let courseInformation = this.state.courseInformation;
      let index;
      if (courseInformation.organization.subunit) {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i].id === this.state.addedId) {
            index = i;
            break;
          }
        }
      }
      else {
        for (var i = 0; i < courseInformation.program[this.props.selected[0]].items.length; i++) {
          if (courseInformation.program[this.props.selected[0]].items[i].id === this.state.addedId) {
            index = i;
            break;
          }
        }
      }
      if (courseInformation.organization.subunit) {
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.dataField = data.dataField;
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.isA11Y = data.isA11Y;
      }
      else {
        courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.dataField = data.dataField;
        courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.isA11Y = data.isA11Y;
      }
      this.setState({
        courseInformation: courseInformation,
      }, () => { this.contentHandleClose() });
    }
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
  handleClick1 = () => {
    this.state.count.push(this.state.count.length+1);
    this.setState({
      count: this.state.count
    });
  }

  handleClick2 = () => {
    this.setState({
      mostrar: !this.state.mostrar
    });
  }

  handleClick3 = () => {
    this.setState({
      problem: !this.state.problem
    });
  }

  handleClick4 = () => {
    this.setState({
      activity: !this.state.activity
    });
  }

  unity = () => {


  }

  render() {

    return (
      <div className="course-information-container">
        {/*
        <div className="form-file-column">
          
          {
            this.state.courseInformation.image !== undefined ?
              <FormPreview
                file={this.state.courseInformation.image}
                type="image"
                unPickFile={this.unPickFile.bind(this)}
                changeFile={this.changeFile.bind(this)}
                courseSyllabus={"Image of course presentation"}
              />
              :
              <Button onClick={() => this.openFileSelector("image", "image/*")} className="form-image-button" fullWidth color="primary"><ImageSharpIcon className="form-image-icon" />
                {this.props.language.selectCourseImage} <br />
                {this.props.language.required}
              </Button>
          }
        </div>
        <div className="form-input-column">
          <TextField
            id="title-input"
            label={"Course Presentation"}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.title}
            onChange={this.handleChange('title')}
          />
          <TextField
            id="subtitle-input"
            label={"Course Learning Objective"}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.subtitle}
            onChange={this.handleChange('subtitle')}
          />
          <TextField
            id="description-input"
            label={"Course Structure"}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
          <TextField
            id="description-input"
            label={"Summary of each topic"}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
          <TextField
            id="description-input"
            label={""}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.courseInformation.description}
            onChange={this.handleChange('description')}
          />
        </div>*/}
        <div className="form-input-column">




          {this.state.count.map((number, index) =>
            <div>
              <Button style={{width:'100%'}} onClick={this.handleClick2}>
                Unit {number}
              </Button>
              {
                this.state.mostrar ?
                  <div>
                    <TextField
                      id="title-input"
                      label={"Content Description"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.title}
                      onChange={this.handleChange('title')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Learning Objective"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Pre-existing knowledge"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Materials"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />                    
                    
                    <TextField
                      id="subtitle-input"
                      label={"Student Profile"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Student Level"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Estimated time"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Educational Context"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <Button style={{width:'100%'}} onClick={this.handleClick3}>
                      + Problem 
                    </Button>

                    {this.state.problem?
                    <div>
                    <TextField
                      id="title-input"
                      label={"Problem / Issue Statement"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.title}
                      onChange={this.handleChange('title')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Samples"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    />
                    <TextField
                      id="description-input"
                      label={"Evaluation"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.description}
                      onChange={this.handleChange('description')}
                    /></div>:null}

                    <Button style={{width:'100%'}} onClick={this.handleClick4}>
                     + Activity
                    </Button>
                    {this.state.activity?
                    <div>
                    <TextField
                      id="title-input"
                      label={"Activity Statement"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.title}
                      onChange={this.handleChange('title')}
                    />
                    <TextField
                      id="subtitle-input"
                      label={"Evaluation"}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.courseInformation.subtitle}
                      onChange={this.handleChange('subtitle')}
                    /></div>:null}

                  </div>
                  : null
              }
            </div>
          )}
        <Button onClick={this.handleClick1}>
            +Add
        </Button>
          {/* <CourseCreatorMenu
            setMenuTab={this.setMenuTab.bind(this)}
            menuTab={this.state.menuTab}
            language={this.props.language}
          />
        
          {
            this.state.menuTab === 1 ?
              <div>
                <div className="button-row">
                  {
                    this.props.courseInformation.organization.unit === "Unit" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="orange-avatar" className="avatar">U</Avatar>
                        {this.props.language.byUnitsAndLessons}
                      </Button>
                      :
                      undefined
                  }
                  {
                    this.props.courseInformation.organization.unit === "Topic" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="blue-avatar" className="avatar">T</Avatar>
                        {this.props.language.byTopics}
                      </Button>
                      :
                      undefined
                  }
                  {
                    this.props.courseInformation.organization.unit === "Season" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="teal-avatar" className="avatar">D</Avatar>
                        {this.props.language.byDates}
                      </Button>
                      :
                      undefined
                  }
                </div>
                <NavigationTool
                  program={this.props.courseInformation.program}
                  organization={this.props.courseInformation.organization}
                  hasSubunits={this.props.courseInformation.organization.subunit}
                  selected={this.props.selected}
                  expandedNodes={this.props.expandedNodes}
                  reRender={this.reRender.bind(this)}
                  turnOffSortMode={this.turnOffSortMode.bind(this)}
                  setMenuTab={this.setMenuTab.bind(this)}
                  showCreatorToolMessage={this.showCreatorToolMessage.bind(this)}
                  dialog={true}
                  language={this.props.language}
                />
              </div>
              :
              undefined
          }
          {
            this.state.menuTab === 0 ?
              <div>
                <div className="button-row">
                  {
                    this.props.courseInformation.organization.unit === "Unit" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="orange-avatar" className="avatar">U</Avatar>
                        {this.props.language.byUnitsAndLessons}
                      </Button>
                      :
                      undefined
                  }
                  {
                    this.props.courseInformation.organization.unit === "Topic" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="blue-avatar" className="avatar">T</Avatar>
                        {this.props.language.byTopics}
                      </Button>
                      :
                      undefined
                  }
                  {
                    this.props.courseInformation.organization.unit === "Season" ?
                      <Button onClick={() => this.warningOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
                        <Avatar id="teal-avatar" className="avatar">D</Avatar>
                        {this.props.language.byDates}
                      </Button>
                      :
                      undefined
                  }
                </div>
                <NavigationTool
                  program={this.props.courseInformation.program}
                  organization={this.props.courseInformation.organization}
                  hasSubunits={this.props.courseInformation.organization.subunit}
                  selected={this.props.selected}
                  expandedNodes={this.props.expandedNodes}
                  reRender={this.reRender.bind(this)}
                  turnOffSortMode={this.turnOffSortMode.bind(this)}
                  setMenuTab={this.setMenuTab.bind(this)}
                  showCreatorToolMessage={this.showCreatorToolMessage.bind(this)}
                  dialog={true}
                  language={this.props.language}
                />
              </div>
              :
              undefined
          }
        */}
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