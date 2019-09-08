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
import AudienceMenu from './AudienceMenu';
import CourseCreatorMenu from './CourseCreatorMenu';
import Unit from './Unit';

import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../../../lib/dragAndDropUtils';
import { createContentItems } from '../../../lib/contentMenuItemsCreator';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

import TabVertical from '../tools/VerticalTab';

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

/* Accessibility Forms */
import VideoAccessibilityForm from '../accessibility/VideoAccessibilityForm';

/* Snackbar */
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';


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
        { id: 1, type: "text" },
        { id: 2, type: "image" },
        { id: 3, type: "video" },
        { id: 4, type: "audio" },
        { id: 5, type: "link" },
        { id: 6, type: "unity" },
        { id: 7, type: "embebed" },
        { id: 8, type: "pdf" },
        { id: 9, type: "compressed" },
        { id: 10, type: "h5p" },
        { id: 11, type: "quiz" },
        { id: 12, type: "activity" }
      ],
      audienceOptions: [
        {label: 'All disabilities', selected: true},
        {label: 'Cognitive', selected: true},
        {label: 'Hearing', selected: true},
        {label: 'Visual', selected: true},
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
    this.setState({ contentOpen: false, });
  };

  openDialog(e){
    let type = e.payload.type;
    let courseInformation = this.state.courseInformation;
    this.setState({
      contentTypeAdded: type,
      addedId: e.payload.id,
      showCourseOrganization: false,
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
    let itemContent = this.getItemAttributes();
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
    this.setState({
      showAccesibilityOptions: true,
    });
    this.resetMenuItems();
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

  setAudienceOption(index){
    let options = this.state.audienceOptions;
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
      audienceOptions: options,
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
        this.props.showControlMessage("First add some content please");
      }
    }
    else {
      if (this.props.courseInformation.program[this.props.selected[0]].items.length) {
        this.setState({
          sortMode: !this.state.sortMode,
        });
      }
      else {
        this.props.showControlMessage("First add some content please");
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
      showCourseOrganization: true,
      contentOpen: true,
    });
  }

  setOrganization() {
    this.contentHandleClose()
    this.setState({
      showCourseOrganization: false,
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


  render() {
    return(
      <div>
        <div className="course-creator-container">
          {
            this.props.courseInformation.organization.subunit ?
              <div className="course-creator-work-area">
                <div
                  style={
                    !this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items.length ?
                      {backgroundImage: "url(drop.svg)", animation: "bounce 1s 2"}
                    :
                    {backgroundImage: "url()"}} className="course-creator-drop-area"
                >
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
                  />
                  {
                    this.state.menuTab === 0 ?
                      <div>
                        <AudienceMenu
                          options={this.state.audienceOptions}
                          setOption={this.setAudienceOption.bind(this)}
                        />
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
                                  <ContentMenuItem type={p.type}/>
                                </Draggable>
                              );
                            })
                          }
                        </Container>
                        <div className="course-creator-menu-actions-container">
                          <List className="course-creator-menu-actions" component="nav" aria-label="course-creator-menu-actions">
                            <ListItem onClick={() => this.toggleSortMode()} selected={this.state.sortMode} className="course-creator-menu-action" button>
                              <ListItemText style={this.state.sortMode ? {color: "var(--primary)"} : {color: "#616161"}} className="course-creator-menu-action-text" primary={"Sort mode"}/>
                            </ListItem>
                            <ListItem className="course-creator-menu-action" button>
                              <ListItemText className="course-creator-menu-action-text" primary="Preview"/>
                            </ListItem>
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
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="orange-avatar" className="avatar">U</Avatar>
                                By Units & Lessons
                              </Button>
                            :
                            undefined
                          }
                          {
                            this.props.courseInformation.organization.unit === "Topic" ?
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="blue-avatar" className="avatar">T</Avatar>
                                By Topics
                              </Button>
                            :
                            undefined
                          }
                          {
                            this.props.courseInformation.organization.unit === "Season" ?
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="teal-avatar" className="avatar">D</Avatar>
                                By Dates
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
          {
            !this.props.courseInformation.organization.subunit && this.props.courseInformation.organization ?
              <div className="course-creator-work-area">
                <div
                  style={
                    !this.props.courseInformation.program[this.props.selected[0]].items.length ?
                      {backgroundImage: "url(drop.svg)", animation: "bounce 1s 2"}
                    :
                    {backgroundImage: "url()"}} className="course-creator-drop-area"
                >
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
                  />
                  {
                    this.state.menuTab === 0 ?
                      <div>
                        <AudienceMenu
                          options={this.state.audienceOptions}
                          setOption={this.setAudienceOption.bind(this)}
                        />
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
                                  <ContentMenuItem type={p.type}/>
                                </Draggable>
                              );
                            })
                          }
                        </Container>
                        <div className="course-creator-menu-actions-container">
                          <List className="course-creator-menu-actions" component="nav" aria-label="course-creator-menu-actions">
                            <ListItem onClick={() => this.toggleSortMode()} selected={this.state.sortMode} className="course-creator-menu-action" button>
                              <ListItemText style={this.state.sortMode ? {color: "var(--primary)"} : {color: "#616161"}} className="course-creator-menu-action-text" primary={"Sort mode"}/>
                            </ListItem>
                            <ListItem className="course-creator-menu-action" button>
                              <ListItemText className="course-creator-menu-action-text" primary="Preview"/>
                            </ListItem>
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
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="orange-avatar" className="avatar">U</Avatar>
                                By Units & Lessons
                              </Button>
                            :
                            undefined
                          }
                          {
                            this.props.courseInformation.organization.unit === "Topic" ?
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="blue-avatar" className="avatar">T</Avatar>
                                By Topics
                              </Button>
                            :
                            undefined
                          }
                          {
                            this.props.courseInformation.organization.unit === "Season" ?
                              <Button onClick={() => this.manageOrganization()} fullWidth className={this.props.courseInformation.organization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
                                <Avatar id="teal-avatar" className="avatar">D</Avatar>
                                By Dates
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
          TransitionComponent={GrowTransition}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle className="content-editor-title">Content editor</DialogTitle>
          <Divider/>
          <DialogContent>
            {
              this.state.contentTypeAdded === 'text' && !this.state.showAccesibilityOptions ?
                <TextForm
                  getTextAttributesFunction={textAttributes => this.getItemAttributes = textAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'image' && !this.state.showAccesibilityOptions ?
                <TabVertical
                  contentTypeAdded={this.state.contentTypeAdded}
                  generateImageSaltFunction={imageSalt => this.generateImageSalt = imageSalt}
                  getImageAttributesFunction={imageAttributes => this.getImageAttributes = imageAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'video' && !this.state.showAccesibilityOptions && !this.state.showAccesibilityForm ?
                <TabVertical
                  contentTypeAdded={this.state.contentTypeAdded}
                  getVideoAttributesFunction={videoAttributes => this.getItemAttributes = videoAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'audio' && !this.state.showAccesibilityOptions ?
                <TabVertical
                  contentTypeAdded={this.state.contentTypeAdded}
                  getAudioAttributesFunction={audioAttributes => this.getItemAttributes = audioAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'link' && !this.state.showAccesibilityOptions ?
                <LinkForm
                  getLinkAttributesFunction={linkAttributes => this.getItemAttributes = linkAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'pdf' && !this.state.showAccesibilityOptions ?
                <PdfForm
                  getPdfAttributesFunction={pdfAttributes => this.getItemAttributes = pdfAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'compressed' && !this.state.showAccesibilityOptions ?
                <CompressedForm
                  getCompressedAttributesFunction={compressedAttributes => this.getItemAttributes = compressedAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'h5p' && !this.state.showAccesibilityOptions ?
                <H5PForm
                  getH5pAttributesFunction={h5pAttributes => this.getItemAttributes = h5pAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'quiz' && !this.state.showAccesibilityOptions ?
                <QuizForm
                  getQuizAttributesFunction={quizAttributes => this.getItemAttributes = quizAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'activity' && !this.state.showAccesibilityOptions ?
                <ActivityForm
                  getActivityAttributesFunction={activityAttributes => this.getItemAttributes = activityAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'embebed' && !this.state.showAccesibilityOptions ?
                <EmbebedForm
                  getEmbebedAttributesFunction={embebedAttributes => this.getItemAttributes = embebedAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'unity' && !this.state.showAccesibilityOptions ?
                <UnityForm
                  getUnityAttributesFunction={unityAttributes => this.getItemAttributes = unityAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.showAccesibilityOptions && !this.state.showCourseOrganization?
                <div className="configure-accessibility-actions">
                  <List>
                    <ListItem onClick={() => this.showAccesibilityForm()} button>
                      <ListItemAvatar>
                        <Avatar className="primary-avatar">
                          <AccessibilityNewIcon className="configure-accessibility-icon"/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Configure accessibility`} secondary="We recommend to configure the accessibility of your content and making it accessible to most audiences."/>
                    </ListItem>
                    <ListItem onClick={() => this.contentHandleClose()} button>
                      <ListItemAvatar>
                        <Avatar className="secondary-avatar">
                          <WatchLaterIcon className="configure-accessibility-icon"/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Configure accessibility later`} secondary="You can configure the accessibility of your content later, but this will be reflected with a red alert in your content."/>
                    </ListItem>
                  </List>
                </div>
              :
              undefined
            }
            {
              this.state.showAccesibilityForm && this.state.contentTypeAdded === 'video' ?
                <VideoAccessibilityForm
                  parentId={"accessibility-video-123"}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.showCourseOrganization ?
                <CourseOrganization
                  courseInformation={this.props.courseInformation}
                  validateOrganization={this.validateOrganization.bind(this)}
                  reRender={this.reRender.bind(this)}
                  selected={this.props.selected}
                />
              :
              undefined
            }
          </DialogContent>
          <Divider/>
          {
            !this.state.showAccesibilityOptions && !this.state.showAccesibilityForm && !this.state.showCourseOrganization ?
              <DialogActions>
                <Button onClick={() => {this.contentHandleClose(); this.cancelContentCreation();}} color="primary">
                  cancel
                </Button>
                <Button onClick={() => this.createContent()} color="primary">
                  create content
                </Button>
              </DialogActions>
            :
            undefined
          }
          {
            this.state.showAccesibilityForm ?
              <DialogActions>
                <Button onClick={() => this.contentHandleClose()} color="primary">
                  cancel
                </Button>
                <Button onClick={() => this.contentHandleClose()}  color="primary">
                  set accessibility
                </Button>
              </DialogActions>
            :
            undefined
          }
          {
            this.state.showCourseOrganization ?
              <DialogActions>
                <Button disabled={this.state.correctOrganization} onClick={() => this.setOrganization()}  color="primary">
                  Start
                </Button>
              </DialogActions>
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
                                  <p className="snackbar-message-title">EDITING</p>
                                  <p>{`${this.props.courseInformation.organization.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}`}</p>
                                  <p>{`${this.props.courseInformation.organization.subunit}: ${this.props.courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}</p>
                                </div>
                              </div>
                            :
                            <div className="snackbar-row">
                              <InfoIcon className="snackbar-icon"/>
                              <div className="navigation-message-container">
                                <p className="snackbar-message-title">EDITING</p>
                                <p>{`${this.props.courseInformation.organization.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}`}</p>
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
