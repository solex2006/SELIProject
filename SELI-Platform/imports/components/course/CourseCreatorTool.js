import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import BottomMenu from '../navigation/BottomMenu';
import ContentMenuItem from './ContentMenuItem';
import ContentItem from './ContentItem';
import SortItem from './items/SortItem';
import DisabilitieMenu from './DisabilitieMenu';
import CourseCreatorMenu from './CourseCreatorMenu';
import VerticalTab from '../tools/VerticalTab';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../../../lib/dragAndDropUtils';
import { createContentItems } from '../../../lib/contentMenuItemsCreator';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
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
import NavigationTool from './NavigationTool';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
/* Accessibility Forms */
import VideoAccessibilityForm from '../accessibility/VideoAccessibilityForm';
/* Snackbar */
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { FaThumbsDown } from 'react-icons/fa';
import WarningIcon from '@material-ui/icons/Warning';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}
const GrowTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});


export default class CourseCreatorTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [
        { id: Math.random(), type: "text" },
        { id: Math.random(), type: "image" },
        { id: Math.random(), type: "video" },
        { id: Math.random(), type: "audio" },
        { id: Math.random(), type: "link" },
        { id: Math.random(), type: "unity" },
        { id: Math.random(), type: "embebed" },
        { id: Math.random(), type: "pdf" },
        { id: Math.random(), type: "compressed" },
        { id: Math.random(), type: "h5p" },
        { id: Math.random(), type: "quiz" },
        { id: Math.random(), type: "activity" }
      ],
      disabilitieOptions: [
        {label: this.props.language.allDisabilities, selected: true},
        {label: this.props.language.congnitive, selected: true},
        {label: this.props.language.hearing, selected: true},
        {label: this.props.language.visual, selected: true},
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
    this.setState({ showAccesibilityForm: false, showAccesibilityOptions: false, contentOpen: true });
  };

  contentHandleClose = () => {
    this.setState({ 
      contentOpen: false, 
      contentToEdit: undefined, 
      contentTypeAdded: '', 
      showAccesibilityForm: false,
      showCourseOrganization: false,
      showWarningOrganization: false,
    });
  };

  openDialog(e){
    let type = e.payload.type;
    let courseInformation = this.state.courseInformation;
    let languageTypeAdded = "";
    if (type === 'text'){ languageTypeAdded = this.props.language.text }
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
      addedId: e.payload.id,
      showCourseOrganization: false,
      showContentEditor: true,
    });
    if(e.addedIndex !== null && e.removedIndex !== null) {

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

  getItemAttributes(){}

  createContent(){
    let courseInformation = this.state.courseInformation;
    let index;
    let itemContent = this.getItemAttributes();
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
      let showAccesibilityOptions = false;
      if (this.state.contentTypeAdded === "audio" || this.state.contentTypeAdded === "image" || this.state.contentTypeAdded === "video") {
        showAccesibilityOptions = true;
      }
      else {

      }
      this.setState({
        showAccesibilityOptions: showAccesibilityOptions,
        showCourseOrganization: false,
        showContentEditor: false,
        contentOpen: showAccesibilityOptions,
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
    else {

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
      showAccesibilityOptions: false,
      showCourseOrganization: false,
      showContentEditor: true,
      contentOpen: true,
      contentToEdit: item,
    });
  }

  setDisabilitieOption(index){
    let options = this.state.disabilitieOptions;
    if (index === 0) {
      options[index].selected ? options.map(option => option.selected = false) : options.map(option => option.selected = true)
    }
    else {
      options[index].selected = !options[index].selected;
      let allSelected = true;
      for (var i = 1; i < options.length; i++) {
        if (!options[i].selected) {
          allSelected = false;
        }
      }
      allSelected ? options[0].selected = true : options[0].selected = false;
    }
    this.setState({
      disabilitieOptions: options,
    });
  }

  setMenuTab(tab){
    this.setState({
      menuTab: tab,
    });
  }

  showAccesibilityForm(){
    this.setState({
      showAccesibilityForm: true,
      showAccesibilityOptions: false,
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
    }, () => {
      !this.state.correctOrganization ? this.showCreatorToolMessage('navigation') : undefined
      this.state.correctOrganization ? this.handleCloseSnackbar() : undefined
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
      this.showCreatorToolMessage("navigation");
    }
  }
  
  reRender(){
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

  getAccessibilityPercetage = (value) => {
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
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[index].attributes.accessibility.dataField = data;
      }
      else {
        courseInformation.program[this.props.selected[0]].items[index].attributes.accessibility.dataField = data;
      }
      this.setState({
        courseInformation: courseInformation,
      }, () => console.log(this.state.courseInformation.program));
    }

  }

  render() {
    return(
      <div>
        <div className="course-creator-container">
          {
            this.props.courseInformation.organization.subunit ?
            <div>
                <div className="title-course">
                  <div className="subtitle">{this.props.language.coursetitle}: {this.props.courseInformation.title}</div>
                </div>
              <div className="course-creator-work-area">
                
                <div
                  style={
                    !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ?
                      {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
                    :
                    {backgroundImage: "url()"}} className="course-creator-drop-area"
                >
                  {
                    !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ?
                      <div className="background">
                        {this.props.language.dropHereLabel.toUpperCase()}
                      </div>
                    :
                      undefined
                  }
                  {
                    !this.state.sortMode ?
                      <Container
                        lockAxis="y"
                        dragBeginDelay={500}
                        dragClass="drag-class"
                        style={{width: "100%", height: "100%"}}
                        groupName="1"
                        getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
                        onDrop={e => this.openDialog(e)}>
                        {
                          this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.map((p, i) => {
                            return (
                              <Draggable key={i}>
                                <ContentItem
                                  item={p}
                                  removeItem={this.removeItem.bind(this)}
                                  editItem={this.editItem.bind(this)}
                                  handleDecorative={this.handleDecorative.bind(this)}
                                  language={this.props.language}
                                />
                              </Draggable>
                            );
                          })
                        }
                      </Container>
                    :
                    <Container
                      lockAxis="y"
                      dragBeginDelay={0}
                      dragClass="drag-class"
                      style={{width: "100%", height: "100%"}}
                      groupName="1"
                      getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items[i]}
                      onDrop={e => this.openDialog(e)}
                    >
                      {
                        this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.map((p, i) => {
                          return (
                            <Draggable key={i}>
                              <SortItem
                                item={p}
                                removeItem={this.removeItem.bind(this)}
                                index={i}
                                language={this.props.language}
                              />
                            </Draggable>
                          );
                        })
                      }
                    </Container>
                  }
                </div>

          
                <div className="course-creator-menu-area">
                  <CourseCreatorMenu
                    setMenuTab={this.setMenuTab.bind(this)}
                    menuTab={this.state.menuTab}
                    language={this.props.language}
                  />
                  {
                    this.state.menuTab === 0 ?
                      <div>
                        <DisabilitieMenu
                          options={this.state.disabilitieOptions}
                          setOption={this.setDisabilitieOption.bind(this)}
                          language={this.props.language}
                        />
                        <Divider light/>
                        <div className="course-creator-menu-actions">
                          <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.dragDropItems}/>
                        </div>
                        <Container
                          orientation="horizontal"
                          groupName="1"
                          behaviour="copy"
                          getChildPayload={i => this.state.contentItems[i]}
                          onDrop={e => this.setState({ contentItems: applyDrag(this.state.contentItems, e) })}
                        >
                          {
                            this.state.contentItems.map((p,i) => {
                              return (
                                <Draggable key={i}>
                                  <ContentMenuItem type={p.type} language={this.props.language}/>
                                </Draggable>
                              );
                            })
                          }
                        </Container>
                        <div className="course-creator-menu-actions-container">
                          <List className="course-creator-menu-actions" component="nav" aria-label="course-creator-menu-actions">
                            <Divider light/>
                            <ListItem onClick={() => this.toggleSortMode()} selected={this.state.sortMode} className="course-creator-menu-action" button>
                              <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.sortMode}/>
                            </ListItem>
                            <Divider light/>
                            <ListItem onClick={() => this.props.handlePreview()} className="course-creator-menu-action" button>
                              <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.seePreview}/>
                            </ListItem>
                            <Divider light/>
                          </List>
                        </div>
                      </div>
                    :
                    undefined
                  }
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
                </div>
              </div>
            </div>
            :
            undefined
          }
          {
            !this.props.courseInformation.organization.subunit && this.props.courseInformation.organization ?
              <div className="course-creator-work-area">
                <div
                  style={
                    !this.props.courseInformation.program[this.props.selected[0]].items.length ?
                      {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"}
                    :
                    {backgroundImage: "url()"}} className="course-creator-drop-area"
                >
                  {
                    !this.props.courseInformation.program[this.props.selected[0]].items.length ?
                      <div className="background">
                        {this.props.language.dropHereLabel.toUpperCase()}
                      </div>
                    :
                      undefined
                  }
                  {
                    !this.state.sortMode ?
                      <Container
                        lockAxis="y"
                        dragBeginDelay={500}
                        dragClass="drag-class"
                        style={{width: "100%", height: "100%"}}
                        groupName="1"
                        getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].items[i]}
                        onDrop={e => this.openDialog(e)}>
                        {
                          this.props.courseInformation.program[this.props.selected[0]].items.map((p, i) => {
                            return (
                              <Draggable key={i}>
                                <ContentItem
                                  item={p}
                                  removeItem={this.removeItem.bind(this)}
                                  editItem={this.editItem.bind(this)}
                                  handleDecorative={this.handleDecorative.bind(this)}
                                  language={this.props.language}
                                />
                              </Draggable>
                            );
                          })
                        }
                      </Container>
                    :
                    <Container
                      lockAxis="y"
                      dragBeginDelay={0}
                      dragClass="drag-class"
                      style={{width: "100%", height: "100%"}}
                      groupName="1"
                      getChildPayload={i => this.props.courseInformation.program[this.props.selected[0]].items[i]}
                      onDrop={e => this.openDialog(e)}
                    >
                      {
                        this.props.courseInformation.program[this.props.selected[0]].items.map((p, i) => {
                          return (
                            <Draggable key={i}>
                              <SortItem
                                item={p}
                                removeItem={this.removeItem.bind(this)}
                                index={i}
                                language={this.props.language}
                              />
                            </Draggable>
                          );
                        })
                      }
                    </Container>
                  }
                </div>
                <div className="course-creator-menu-area">
                  <CourseCreatorMenu
                    setMenuTab={this.setMenuTab.bind(this)}
                    menuTab={this.state.menuTab}
                    language={this.props.language}
                  />
                  {
                    this.state.menuTab === 0 ?
                      <div>
                        <DisabilitieMenu
                          options={this.state.disabilitieOptions}
                          setOption={this.setDisabilitieOption.bind(this)}
                          language={this.props.language}
                        />
                        <Divider light/>
                        <div className="course-creator-menu-actions">
                          <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.dragDropItems}/>
                        </div>
                        <Container
                          orientation="horizontal"
                          groupName="1"
                          behaviour="copy"
                          getChildPayload={i => this.state.contentItems[i]}
                          onDrop={e => this.setState({ contentItems: applyDrag(this.state.contentItems, e) })}
                        >
                          {
                            this.state.contentItems.map((p,i) => {
                              return (
                                <Draggable key={i}>
                                  <ContentMenuItem type={p.type} language={this.props.language}/>
                                </Draggable>
                              );
                            })
                          }
                        </Container>
                        <div className="course-creator-menu-actions-container">
                          <List className="course-creator-menu-actions" component="nav" aria-label="course-creator-menu-actions">
                            <Divider light/>
                            <ListItem onClick={() => this.toggleSortMode()} selected={this.state.sortMode} className="course-creator-menu-action" button>
                              <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.sortMode}/>
                            </ListItem>
                            <Divider light/>
                            <ListItem onClick={() => this.props.handlePreview()} className="course-creator-menu-action" button>
                              <ListItemText style={{color: "var(--primary)"}} className="course-creator-menu-action-text" primary={this.props.language.seePreview}/>
                            </ListItem>
                            <Divider light/>
                          </List>
                        </div>
                      </div>
                    :
                    undefined
                  }
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
                </div>
              </div>
            :
            undefined
          }
        </div>
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
                <h4 className="dialog-label-title">{ this.state.contentaAdded ? `${this.props.language.contentEditor} - ${this.state.languageType}` : this.props.language.courseOrganization}</h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  //disabled={this.state.showCourseOrganization || this.state.showAccesibilityOptions || this.state.showAccesibilityForm}
                  onClick={() => {
                    this.contentHandleClose();
                    if (this.state.contentToEdit === undefined) {
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
                  this.state.contentTypeAdded === 'text' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'image' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'video' && !this.state.showAccesibilityOptions && !this.state.showAccesibilityForm ?
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
                  this.state.contentTypeAdded === 'audio' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'link' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'pdf' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'compressed' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'h5p' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'quiz' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'activity' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'embebed' && !this.state.showAccesibilityOptions ?
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
                  this.state.contentTypeAdded === 'unity' && !this.state.showAccesibilityOptions ?
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
            this.state.showAccesibilityOptions && (this.state.contentTypeAdded === 'image' || this.state.contentTypeAdded === 'audio' || this.state.contentTypeAdded === 'video') ?  
             //this.contentHandleClose()  // uncomment for view accesibility Menu
              <div className="configure-accessibility-actions"> 
                <List>
                  <ListItem disabled={true} onClick={() => this.showAccesibilityForm()} button>
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
            this.state.showAccesibilityForm ?
              <React.Fragment>
                <VerticalTab
                  contentTypeAdded={this.state.contentTypeAdded}
                  item={this.state.contentToConfigureAccessibility}
                  getAccessibilityPercetage={this.getAccessibilityPercetage.bind(this)}
                  setContentAccessibilityData={this.setContentAccessibilityData.bind(this)}
                />
                <div className="dialog-actions-container">
                  <Tooltip title="Set accessibility configuration">
                    <Fab onClick={() => this.contentHandleClose()} aria-label={this.props.language.setAccessibilityConf} className="dialog-fab" color="primary">
                      <AccessibilityNewIcon/>
                    </Fab>
                  </Tooltip>
                </div>
              </React.Fragment>
            :
            undefined
          }
        </Dialog>
        <Snackbar
          className="navigation-snackbar"
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          key={"navigation-tool-snackbar"}
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          TransitionComponent={TransitionRight}
          message={
            <div>
              {
                this.state.snackbarType === "navigation" ?
                  <div>
                    {
                      this.props.courseInformation.program.length ?
                        <div>
                          {
                            this.props.courseInformation.organization.subunit ?
                              <div className="snackbar-row">
                                <InfoIcon className="snackbar-icon"/>
                                <div className="navigation-message-container">
                                  <p className="snackbar-message-title">{this.props.language.editing}</p>
                                  <p>{`${this.props.language.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}`}</p>
                                  <p>{`${this.props.language.lesson}: ${this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}</p>
                                </div>
                              </div>
                            :
                            <div className="snackbar-row">
                              <InfoIcon className="snackbar-icon"/>
                              <div className="navigation-message-container">
                                <p className="snackbar-message-title">{this.props.language.editing}</p>
                                <p>{`${this.props.language.topic}: ${this.props.courseInformation.program[this.props.selected[0]].name}`}</p>
                              </div>
                            </div>
                          }
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
