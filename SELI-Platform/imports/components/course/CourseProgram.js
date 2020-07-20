import React from 'react';
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
import EmbeddedForm from '../content/EmbeddedForm';
import UnityForm from '../content/UnityForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VerticalPanel from './templates/VerticalPanel';
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
        { id: Math.random(), type: "embedded" },
        { id: Math.random(), type: "h5p" },
        { id: Math.random(), type: "unity" },
      ],
      menuTab: 0,
      sortMode: false,
      courseInformation: this.props.courseInformation,
      titleTop: "",
      prevIndexState: 0,
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
    });
  };

  openDialog(e, templateCode){
    if (e.payload) {
      let type = e.payload.type;
      let languageTypeAdded = "";
      if    (type === 'text'){ languageTypeAdded = this.props.language.text }
      else if (type === 'image'){ languageTypeAdded = this.props.language.image }
      else if (type === 'video'){ languageTypeAdded = this.props.language.video }
      else if (type === 'audio'){ languageTypeAdded = this.props.language.audio }
      else if (type === 'link'){ languageTypeAdded = this.props.language.link }
      else if (type === 'unity'){ languageTypeAdded = this.props.language.unity }
      else if (type === 'embedded'){ languageTypeAdded = this.props.language.embedded }
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
        showContentEditor: true,
      });
      if (e.addedIndex !== null && e.removedIndex !== null) {
        this.relativeProgramCommons("drag", e);
      } else {
        if (e.addedIndex !== null) {
          this.contentHandleClickOpen();
          let a = e;
          if (templateCode) {
            a.payload.code = templateCode;
          }
          this.relativeProgramCommons("drag", a);
          this.setState({
            contentaAdded: true,
          });
        }
      }
    }
  }

  getItemAttributes(){}

  relativeProgramCommons = (action, itemValue) => {
    let courseInformation = this.state.courseInformation;
    let index;
    let arrayOfItems;
    let stateId;
    if (action === "create" || action === "cancel" || action === "getA11y" || action === "setA11y") {
      stateId = this.state.addedId;
    } else if (action === "edit") {
      stateId = this.state.contentToEdit.id;
    } else if (action === "remove"){
      stateId = itemValue.id;
    } else if (action === "decorative"){
      stateId = itemValue;
    }
    if (this.props.selected[3] === 0) {
      arrayOfItems = courseInformation.program[this.props.selected[0]].items;
    } else if (this.props.selected[3] === 1) {
      arrayOfItems = courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items;
    } else {
      if (courseInformation.coursePlan.courseStructure === "unit") {
        arrayOfItems = courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].items;
      } else {
        arrayOfItems = courseInformation.program[this.props.selected[0]].activities[this.props.selected[2]].items;
      }
    }
    //Processing Array of Items
    if (action === "drag"){
      arrayOfItems = applyDrag(arrayOfItems, itemValue);
    } else {
      for (var i = 0; i < arrayOfItems.length; i++) {
        if (arrayOfItems[i].id === stateId) {
          index = i;
          break;
        }
      }
    }
    if (action === "create" || action === "edit") {
      let itemContent = this.getItemAttributes();
      if (itemContent != undefined) {
        arrayOfItems[index].attributes = itemContent;
        if (action === "create") {
          if (this.state.contentTypeAdded === 'image') {
            let size = {
              width: 500,
              height: 300,
            }
            arrayOfItems[index].attributes.size = size;
          }
          this.finishCreateContent(itemContent);
        }
      }
    } else if (action === "cancel" || action === "remove") {
      arrayOfItems.splice(index, 1);
    } else if (action === "getA11y") {
      arrayOfItems[index].attributes.accessibility.percentage = itemValue;
    } else if (action === "decorative") {
      arrayOfItems[index].attributes.accessibility.pureDecorative = !arrayOfItems[index].attributes.accessibility.pureDecorative;
    } else if (action === "setA11y") {
      arrayOfItems[index].attributes.accessibility.dataField = itemValue.dataField;
      arrayOfItems[index].attributes.accessibility.isA11Y = itemValue.isA11Y;
    }
    // Saving Changes
    if (this.props.selected[3] === 0) {
      courseInformation.program[this.props.selected[0]].items = arrayOfItems;
    } else if (this.props.selected[3] === 1) {
      courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items = arrayOfItems;
    } else {
      if (courseInformation.coursePlan.courseStructure === "unit") {
        courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].items = arrayOfItems
      }
      else {
        courseInformation.program[this.props.selected[0]].activities[this.props.selected[2]].items = arrayOfItems;
      }
    }
    this.setState({
      arrayOfItems,
    })
    if (arrayOfItems.length) {console.log(arrayOfItems)}
  }

  createContent(){
    this.relativeProgramCommons("create");
  }

  finishCreateContent = (itemContent) => {
    let showAccessibilityOptions = false;
    if (this.state.contentTypeAdded === "audio" || this.state.contentTypeAdded === "image" || this.state.contentTypeAdded === "video" ||   this.state.contentTypeAdded==='quiz') {
      showAccessibilityOptions = true;
    }
    else {
    }
    this.setState({
      showAccessibilityOptions: showAccessibilityOptions,
      showContentEditor: false,
      contentOpen: showAccessibilityOptions,
      contentToConfigureAccessibility: itemContent,
    });
    this.resetMenuItems();
  }

  finishEditContent(){
    this.relativeProgramCommons("edit");
    this.contentHandleClose();
    this.resetMenuItems();
  }

  resetMenuItems(){
    let contentItems = createContentItems();
    this.setState({
      contentItems: contentItems,
    });
  }

  cancelContentCreation(){
    this.relativeProgramCommons("cancel");
    this.setState({
      contentTypeAdded: '',
    });
  }

  removeItem(item){
    this.relativeProgramCommons("remove", item);
    this.setState({
      deleted: true,
    });
  }

  editItem(item){
    this.setState({
      contentTypeAdded: item.type,
      showAccessibilityOptions: false,
      showContentEditor: true,
      contentOpen: true,
      contentaAdded: true,
      languageType: this.props.language[item.type],
      contentToEdit: item,
    });
  }

  setDisabilitieOption(support){
    let courseInformation = this.state.courseInformation;
    courseInformation.support[1] = support;
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
    if (this.state.arrayOfItems.length > 0) {
      this.setState({
        sortMode: !this.state.sortMode,
      });
    }
    else {
      this.props.handleControlMessage(true, this.props.language.firstAddSomeContent);
    }
    this.reRender();
  }

  turnOffSortMode() {
    this.setState({
      sortMode: false,
    });
  }

  loadingData = () => {
    let arrayOfItems;
    let arrayOfDesignItems;
    let tools;
    let titleTop;
    let courseInformation = this.state.courseInformation;
    if (courseInformation.program.length) {
      if (this.props.selected[3] === 0) {
        arrayOfItems = courseInformation.program[this.props.selected[0]].items;
        arrayOfDesignItems = courseInformation.design[this.props.selected[0]];
        tools = courseInformation.design[this.props.selected[0]].tools;
        if (courseInformation.coursePlan.courseStructure === "unit") {
          titleTop = `${this.props.language.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}`
        }
        else {
          titleTop = `${this.props.language.topic}: ${this.props.courseInformation.program[this.props.selected[0]].name}`
        }
      } else if (this.props.selected[3] === 1) {
        arrayOfItems = courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].items;
        arrayOfDesignItems = courseInformation.design[this.props.selected[0]].lessons[this.props.selected[1]];
        tools = courseInformation.design[this.props.selected[0]].lessons[this.props.selected[1]].tools;
        titleTop = `${this.props.language.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}
        - ${this.props.language.lesson}: ${courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`
      } else {
        if (courseInformation.coursePlan.courseStructure === "unit") {
          arrayOfItems = courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].items;
          arrayOfDesignItems = courseInformation.design[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]];
          tools = courseInformation.design[this.props.selected[0]].lessons[this.props.selected[1]].tools;
          titleTop = `${this.props.language.unit}: ${this.props.courseInformation.program[this.props.selected[0]].name}
          - ${this.props.language.lesson}: ${courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].name}
          - ${this.props.language.activity}: ${courseInformation.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].name}`
        }
        else {
          arrayOfItems = courseInformation.program[this.props.selected[0]].activities[this.props.selected[2]].items;
          arrayOfDesignItems = courseInformation.design[this.props.selected[0]].activities[this.props.selected[2]];
          tools = courseInformation.design[this.props.selected[0]].tools;
          titleTop = `${this.props.language.topic}: ${this.props.courseInformation.program[this.props.selected[0]].name} 
          - ${this.props.language.activity}: ${courseInformation.program[this.props.selected[0]].activities[this.props.selected[2]].name}`
        }
      }
      this.setState({
        arrayOfItems,
        arrayOfDesignItems,
        tools,
        titleTop,
      })
    }
  }

  componentDidMount(){
    this.loadingData();
  }
  
  reRender(){
    this.forceUpdate();
    this.loadingData();
    this.setState({ state: this.state });
  }

  getAccessibilityPercentage = (value) => {
    this.relativeProgramCommons("getA11y", value);
  }

  handleDecorative = (_id) => {
    this.relativeProgramCommons("decorative", _id);
  }

  setContentAccessibilityData = (data) => {
    if (!this.state.configuringAccessibility) {
      this.relativeProgramCommons("setA11y", data);
      this.contentHandleClose();
    }
  }

  choosingTemplate = () => {
    if (this.props.courseInformation.coursePlan.courseTemplate === 'without') {
      return (
        <FreeWithout
          sortMode={this.state.sortMode}
          arrayOfItems={this.state.arrayOfItems}
          editItem={this.editItem.bind(this)}
          removeItem={this.removeItem.bind(this)}
          openDialog={this.openDialog.bind(this)}
          handleDecorative={this.handleDecorative.bind(this)}
          editAccessibilityForm={this.editAccessibilityForm.bind(this)}
          language={this.props.language}
        ></FreeWithout>
      )
    } else {
      return (
        <TemplateParent
          sortMode={this.state.sortMode}
          arrayOfItems={this.state.arrayOfItems}
          arrayOfDesignItems={this.state.arrayOfDesignItems}
          tools={this.state.tools}
          selected={this.props.selected}
          editItem={this.editItem.bind(this)}
          removeItem={this.removeItem.bind(this)}
          openDialog={this.openDialog.bind(this)}
          handleDecorative={this.handleDecorative.bind(this)}
          editAccessibilityForm={this.editAccessibilityForm.bind(this)}
          language={this.props.language}
        ></TemplateParent>
      )
    }
  }

  render() {
    return(
      <div>
        {this.state.arrayOfItems && (
          <div className="course-creator-container">
            <div className="course-creator-work-area">
              <div className="general-container-drop-area">
                <div className="title-course">  
                  <div className="subtitle">{this.state.titleTop}</div>
                </div>
                {this.choosingTemplate()}
              </div>
              <VerticalPanel
                courseInformation={this.props.courseInformation}
                menuTab={this.state.menuTab}
                selected={this.props.selected}
                expandedNodes={this.props.expandedNodes}
                contentItems={this.state.contentItems}
                setMenuTab={this.setMenuTab.bind(this)}
                toggleSortMode={this.toggleSortMode.bind(this)}
                handlePreview={this.props.handlePreview.bind(this)}
                setDisabilitieOption={this.setDisabilitieOption.bind(this)}
                reRender={this.reRender.bind(this)}
                turnOffSortMode={this.turnOffSortMode.bind(this)}
                language={this.props.language}
              ></VerticalPanel>
            </div>
          </div>
        )}
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
                <h4 className="dialog-label-title">
                  { 
                    this.state.showAccessibilityForm ?
                      `${this.props.language.accessibility} - ${this.state.languageType}` 
                    :
                      `${this.props.language.contentEditor} - ${this.state.languageType}` 
                  }
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
                      arrayOfDesignItems={this.state.arrayOfDesignItems}
                      getActivityAttributesFunction={activityAttributes => this.getItemAttributes = activityAttributes}
                      contentToEdit={this.state.contentToEdit}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  this.state.contentTypeAdded === 'embedded' && !this.state.showAccessibilityOptions ?
                    <EmbeddedForm
                      getEmbeddedAttributesFunction={embeddedAttributes => this.getItemAttributes = embeddedAttributes}
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
