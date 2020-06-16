import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import VerticalTab from '../tools/VerticalTab';
import { applyDrag, generateItems } from '../../../lib/dragAndDropUtils';
import { createContentItems } from '../../../lib/contentMenuItemsCreator';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Content Forms */
import TextForm from '../content/TextForm';
import ImageForm from '../content/ImageForm';
import VideoForm from '../content/VideoForm';
import AudioForm from '../content/AudioForm';
import LinkForm from '../content/LinkForm';
import PdfForm from '../content/PdfForm';
import CompressedForm from '../content/CompressedForm';
import H5PForm from '../content/H5PForm';
import QuizForm from '../content/QuizForm';
import ActivityForm from '../content/ActivityForm';
import EmbebedForm from '../content/EmbebedForm';
import UnityForm from '../content/UnityForm';
import CourseOrganization from './CourseOrganization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
//Teamplates
import FreeWithout from './templates/FreeWithout';
import TemplateParent from './templates/TemplateParent';

export default class CourseProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  contentHandleClickOpen = () => {
    this.setState({ showAccessibilityForm: false, showAccessibilityOptions: false, contentOpen: true });
  };

  contentHandleClose = () => {
    this.setState({ 
      contentOpen: false, 
      contentToEdit: undefined, 
      contentTypeAdded: '', 
      showAccessibilityForm: false,
      showCourseOrganization: false,
      showWarningOrganization: false,
    });
  };

  openDialog(e, templateCode){
    console.log(templateCode)
    let type = e.payload.type;
    let courseInformation = this.state.courseInformation;
    let languageTypeAdded = "";
    if    (type === 'text'){ languageTypeAdded = this.props.language.text }
    else if (type === 'image'){ languageTypeAdded = this.props.language.image }
    else if (type === 'video'){ languageTypeAdded = this.props.language.video }
    else if (type === 'audio'){ languageTypeAdded = this.props.language.audio }
    else if (type === 'link'){ languageTypeAdded = this.props.language.link }
    else if (type === 'unity'){ languageTypeAdded = this.props.language.unity }
    else if (type === 'embebed'){ languageTypeAdded = this.props.language.embebed }
    else if (type === 'pdf'){ languageTypeAdded = this.props.language.pdf }
    else if (type === 'compressed'){ languageTypeAdded = this.props.language.compressed }
    else if (type === 'h5p'){ languageTypeAdded = "h5p" }
    else if (type === 'quiz'){ languageTypeAdded = this.props.language.quiz }
    else if (type === 'activity'){ languageTypeAdded = this.props.language.activity }
    this.setState({
      contentTypeAdded: type,
      languageType: languageTypeAdded,
      templateCode: templateCode,
      addedId: e.payload.id,
      showCourseOrganization: false,
      showContentEditor: true,
    });
    if(e.addedIndex !== null && e.removedIndex !== null) {}
    else {
      this.contentHandleClickOpen();
    }
    let a = e;
    if (templateCode) {
      a.payload.code = templateCode;
    }
    if (courseInformation.organization.subunit) {
      courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items = applyDrag(courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items, a);
    }
    else {
      courseInformation.program[this.props.selected[0]].items = applyDrag(courseInformation.program[this.props.selected[0]].items, a);
    }
    this.setState({
      contentaAdded: true,
    });
  }

  getItemAttributes(){}

  createContent(){
    let courseInformation = this.state.courseInformation;
    let index;
    let itemContent = this.getItemAttributes();
    console.log(itemContent)

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
      if (this.state.contentTypeAdded === "audio" || this.state.contentTypeAdded === "image" || this.state.contentTypeAdded === "video" ||   this.state.contentTypeAdded==='quiz') {
        showAccessibilityOptions = true;
      }
      else {
      }
      console.log("showAccessibilityOptions",showAccessibilityOptions,showAccessibilityOptions)
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
  finishEditContent(){
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

  resetMenuItems(){
    let contentItems = createContentItems();
    this.setState({
      contentItems: contentItems,
    });
  }

  cancelContentCreation(){
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

  removeItem(item){
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

  editItem(item){
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

  setDisabilitieOption(support){
    let courseInformation = this.state.courseInformation;
    courseInformation.support = support;
    this.setState({
      courseInformation: courseInformation,
    });
  }

  setMenuTab(tab){
    this.setState({
      menuTab: tab,
    });
  }

  showAccessibilityForm(){
    this.setState({
      showAccessibilityForm: true,
      showAccessibilityOptions: false,
    })
  }

  editAccessibilityForm(item){
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

  toggleSortMode(){
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
    });
  }

  componentDidMount(){
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
    }
  }
  
  reRender(){
    this.forceUpdate();
    this.setState({ state: this.state });
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
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.isA11Y= data.isA11Y;
      }
      else {
        courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.dataField = data.dataField;
        courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.isA11Y = data.isA11Y;
      }
      this.setState({
        courseInformation: courseInformation,
      }, () => {this.contentHandleClose()});
    }
  }

  choosingTemplate = () => {
    if (this.props.courseInformation.coursePlan.courseTemplate === 'without') {
      return (
        <FreeWithout
          courseInformation={this.props.courseInformation}
          selected={this.props.selected}
          menuTab={this.state.menuTab}
          sortMode={this.state.sortMode}
          contentItems={this.state.contentItems}
          expandedNodes={this.props.expandedNodes}
          reRender={this.reRender.bind(this)}
          turnOffSortMode={this.turnOffSortMode.bind(this)}
          openDialog={this.openDialog.bind(this)}
          removeItem={this.removeItem.bind(this)}
          editItem={this.editItem.bind(this)}
          handleDecorative={this.handleDecorative.bind(this)}
          editAccessibilityForm={this.editAccessibilityForm.bind(this)}
          setMenuTab={this.setMenuTab.bind(this)}
          setDisabilitieOption={this.setDisabilitieOption.bind(this)}
          toggleSortMode={this.toggleSortMode.bind(this)}
          handlePreview={this.props.handlePreview.bind(this)}
          warningOrganization={this.warningOrganization.bind(this)}
          language={this.props.language}
        ></FreeWithout>
      )
    } else if (this.props.courseInformation.coursePlan.courseTemplate === 'spiral') {
      return (
        <TemplateParent
          courseInformation={this.props.courseInformation}
          selected={this.props.selected}
          menuTab={this.state.menuTab}
          sortMode={this.state.sortMode}
          contentItems={this.state.contentItems}
          expandedNodes={this.props.expandedNodes}
          reRender={this.reRender.bind(this)}
          turnOffSortMode={this.turnOffSortMode.bind(this)}
          openDialog={this.openDialog.bind(this)}
          removeItem={this.removeItem.bind(this)}
          editItem={this.editItem.bind(this)}
          handleDecorative={this.handleDecorative.bind(this)}
          editAccessibilityForm={this.editAccessibilityForm.bind(this)}
          setMenuTab={this.setMenuTab.bind(this)}
          setDisabilitieOption={this.setDisabilitieOption.bind(this)}
          toggleSortMode={this.toggleSortMode.bind(this)}
          handlePreview={this.props.handlePreview.bind(this)}
          warningOrganization={this.warningOrganization.bind(this)}
          language={this.props.language}
        ></TemplateParent>
      )
    }
  }

  render() {
    return(
      <div>
        {this.choosingTemplate()}
        <Dialog
          open={this.state.contentOpen}
          onClose={this.contentHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar" variant="dense" disableGutters={true}>
                <AppsIcon/>
                <h4 className="dialog-label-title">{ 
                  this.state.contentaAdded ? 
                    this.state.showAccessibilityForm ?
                      `${this.props.language.accessibility} - ${this.state.languageType}` 
                    :
                      `${this.props.language.contentEditor} - ${this.state.languageType}` 
                  : this.props.language.courseOrganization}
                </h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  //disabled={this.state.showCourseOrganization || this.state.showAccessibilityOptions || this.state.showAccessibilityForm}
                  onClick={() => {
                    this.contentHandleClose();
                    if (this.state.contentToEdit === undefined && !this.state.showAccessibilityOptions) {
                      this.cancelContentCreation();
                    }
                  }}
                >
                  <CloseIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          {
            this.state.showWarningOrganization ?
              <div>
                <DialogContent className="success-dialog-content">
                  <div className="organization-form">
                    <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                      {this.props.language.courseOrganizationChangeWarning}
                    </DialogContentText>
                  </div>
                  <WarningIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.contentHandleClose()} color="primary" autoFocus>
                    {this.props.language.cancel}
                  </Button>
                  <Button onClick={() => this.manageOrganization()} color="primary" autoFocus>
                    {this.props.language.continue}
                  </Button>
                </DialogActions>
              </div>
            :
              undefined
          }
          {
            this.state.showCourseOrganization ?
              <div>
                <CourseOrganization 
                  ref="CourseOrganization"
                  courseInformation={this.props.courseInformation}
                  validateOrganization={this.validateOrganization.bind(this)}
                  reRender={this.reRender.bind(this)}
                  selected={this.props.selected}
                  language={this.props.language}
                />
                <div className="dialog-actions-container">
                  <Tooltip title={this.props.language.done}>
                    <Fab disabled={this.state.correctOrganization} onClick={() => this.setOrganization()} aria-label={this.props.language.startCreatingCourse} className="dialog-fab" color="primary">
                      <AssignmentTurnedInIcon/>
                    </Fab>
                  </Tooltip>
                </div>
              </div>
            :
            undefined
          }
          {
            this.state.showContentEditor ?
              <div>
                {
                  this.state.contentTypeAdded === 'text' && !this.state.showAccessibilityOptions ?
                    <TextForm
                      getTextAttributesFunction={textAttributes => this.getItemAttributes = textAttributes}
                      reRender={this.reRender.bind(this)}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                
                {
                  this.state.contentTypeAdded === 'image' && !this.state.showAccessibilityOptions ?
                    <ImageForm
                      getImageAttributesFunction={imageAttributes => this.getItemAttributes = imageAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }

                {
                  this.state.contentTypeAdded === 'video' && !this.state.showAccessibilityOptions && !this.state.showAccessibilityForm ?
                    <VideoForm
                      getVideoAttributesFunction={videoAttributes => this.getItemAttributes = videoAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'audio' && !this.state.showAccessibilityOptions ?
                    <AudioForm
                      getAudioAttributesFunction={audioAttributes => this.getItemAttributes = audioAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'link' && !this.state.showAccessibilityOptions ?
                    <LinkForm
                      getLinkAttributesFunction={linkAttributes => this.getItemAttributes = linkAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'pdf' && !this.state.showAccessibilityOptions ?
                    <PdfForm
                      getPdfAttributesFunction={pdfAttributes => this.getItemAttributes = pdfAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'compressed' && !this.state.showAccessibilityOptions ?
                    <CompressedForm
                      getCompressedAttributesFunction={compressedAttributes => this.getItemAttributes = compressedAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'h5p' && !this.state.showAccessibilityOptions ?
                    <H5PForm
                      getH5pAttributesFunction={h5pAttributes => this.getItemAttributes = h5pAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'quiz' && !this.state.showAccessibilityOptions ?
                    <QuizForm
                      getQuizAttributesFunction={quizAttributes => this.getItemAttributes = quizAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'activity' && !this.state.showAccessibilityOptions ?
                    <ActivityForm
                      getActivityAttributesFunction={activityAttributes => this.getItemAttributes = activityAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'embebed' && !this.state.showAccessibilityOptions ?
                    <EmbebedForm
                      getEmbebedAttributesFunction={embebedAttributes => this.getItemAttributes = embebedAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'unity' && !this.state.showAccessibilityOptions ?
                    <UnityForm
                      getUnityAttributesFunction={unityAttributes => this.getItemAttributes = unityAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentToEdit === undefined ?
                    <div className="dialog-actions-container">
                      <Tooltip title={this.props.language.createContent}>
                        <Fab onClick={() => this.createContent()} aria-label={this.props.language.createContent} className="dialog-fab" color="primary">
                          <DoneIcon/>
                        </Fab>
                      </Tooltip>
                    </div>
                  :
                  <div className="dialog-actions-container">
                    <Tooltip title={this.props.language.editContent}>
                      <Fab onClick={() => this.finishEditContent()} aria-label={this.props.language.createContent} className="dialog-fab" color="primary">
                        <EditIcon/>
                      </Fab>
                    </Tooltip>
                  </div>
                }
              </div>
            :
            undefined
          }
          {
            this.state.showAccessibilityOptions && (this.state.contentTypeAdded === 'quiz' || this.state.contentTypeAdded === 'image' || this.state.contentTypeAdded === 'audio' || this.state.contentTypeAdded === 'video') ?  
             //this.contentHandleClose()  // uncomment for view accessibility Menu
              <div className="configure-accessibility-actions"> 
                <List>
                  <ListItem disabled={false} onClick={() => this.showAccessibilityForm()} button>
                    <ListItemAvatar>
                      <Avatar className="primary-avatar">
                        <AccessibilityNewIcon className="configure-accessibility-icon"/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.language.configureAccessibility} secondary={this.props.language.weRecomendAccessibility}/>
                  </ListItem>
                  <ListItem onClick={() => this.contentHandleClose()} button>
                    <ListItemAvatar>
                      <Avatar className="secondary-avatar">
                        <WatchLaterIcon className="configure-accessibility-icon"/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.language.configureAccessibilityLater} secondary={this.props.language.youConfigureAccessibility}/>
                  </ListItem> 
                </List> 
              </div>  
            :
              undefined
          }
          {
            this.state.showAccessibilityForm ?
              <React.Fragment>
                <VerticalTab
                  support={ ["Vestibular","Speech", "Visual", "Elderly", "Language", "Hearing", "Diversity","Cognitive", "Motor"]}
                  contentTypeAdded={this.state.contentTypeAdded}
                  item={this.state.contentToConfigureAccessibility}
                  getAccessibilityPercentage={this.getAccessibilityPercentage.bind(this)}
                  setContentAccessibilityData={this.setContentAccessibilityData.bind(this)}
                  language={this.props.language}
                />
              </React.Fragment>
            :
            undefined
          }
        </Dialog>
      </div>
    );
  }
}
