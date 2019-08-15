import React from 'react';
import Button from '@material-ui/core/Button';

import Unit from './Unit';

import BottomMenu from '../navigation/BottomMenu';
import ContentMenuItem from './ContentMenuItem';
import ContentItem from './ContentItem';

import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../../../lib/dragAndDropUtils';
import { createContentItems1, createContentItems2, createContentItems3, createContentItems4 } from '../../../lib/contentMenuItemsCreator';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

/* Forms */
import TextForm from '../content/TextForm';
import ImageForm from '../content/ImageForm';
import VideoForm from '../content/VideoForm';
import AudioForm from '../content/AudioForm';
import LinkForm from '../content/LinkForm';
import PdfForm from '../content/PdfForm';
import CompressedForm from '../content/CompressedForm';
import H5PForm from '../content/H5PForm';
import QuizForm from '../content/QuizForm';

function SlideTransition(props) {
  return <Slide direction="right" {...props} />;
}

const GrowTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default class CourseCreatorTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems1: [
        { id: 1, type: "text" },
        { id: 2, type: "image" },
        { id: 3, type: "video" }
      ],
      contentItems2: [
        { id: 4, type: "audio" },
        { id: 5, type: "link" },
        { id: 6, type: "unity" }
      ],
      contentItems3: [
        { id: 7, type: "embebed" },
        { id: 8, type: "pdf" },
        { id: 9, type: "compressed" }
      ],
      contentItems4: [
        { id: 10, type: "h5p" },
        { id: 11, type: "quiz" },
        { id: 12, type: "activity" }
      ],
      inputs: [
        { id: 'unit-name-input', value: '', error: false },
        { id: 'unit-description-input', value: '', error: false },
      ],
      units: [],
      addedItems: [],
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  contentHandleClickOpen = () => {
    this.setState({ contentOpen: true });
  };

  contentHandleClose = () => {
    this.setState({ contentOpen: false });
  };

  validateInputs(){
    let validInputs = true;
    let inputs = this.state.inputs;
    for (var i = 0; i < inputs.length; i++){
      inputs[i].value = document.getElementById(inputs[i].id).value;
      if (inputs[i].value === "") {
        this.props.showControlMessage("Fields marked with * are required");
        validInputs = false;
        inputs[i].error = true;
      }
      else{
        inputs[i].error = false;
      }
    }
    this.setState({
      inputs: inputs,
    });
    return  validInputs;
  }

  addUnit(){
    if(this.validateInputs()){
      let units = this.state.units;
      let unit = {};
      unit.name = this.state.inputs[0].value;
      unit.description = this.state.inputs[1].value;
      unit.ordinal = parseInt(this.state.units.length + 1);
      unit.lessons = [];
      units.push(unit);
      this.setState({
        units: units,
      });
      this.clearInputs();
      this.props.showControlMessage("New unit added");
      this.handleClose();
    }
  }

  clearInputs(){
    let inputs = this.state.inputs;
    for (var i = 0; i < inputs.length; i++){
      inputs[i].value = "";
      document.getElementById(inputs[i].id).value = "";
    }
    this.setState({
      inputs: inputs,
    });
  }

  openDialog(e){
    let type = e.payload.type;
    if(e.removedIndex === null){
      this.setState({
        contentTypeAdded: type,
        addedIndex: e.addedIndex,
      }, () => {
        this.contentHandleClickOpen();
      });
    }
    this.setState({ addedItems: applyDrag(this.state.addedItems, e) })
  }

  resetInputButton(){}
  generateImageSalt(){}
  generateVideoSalt(){}
  generateAudioSalt(){}
  generatePdfSalt(){}
  generateCompressedSalt(){}
  getTextAttributes(){}
  getImageAttributes(){}
  getVideoAttributes(){}
  getAudioAttributes(){}
  getLinkAttributes(){}
  getPdfAttributes(){}
  getCompressedAttributes(){}
  getH5pAttributes(){}
  getQuizAttributes(){}

  createContent(){
    let addedItems = this.state.addedItems;
    if (this.state.contentTypeAdded === 'text') {
      let textContent = this.getTextAttributes();
      addedItems[this.state.addedIndex].attributes = textContent;
      this.setState({
        addedItems: addedItems,
      });
    }
    else if (this.state.contentTypeAdded === 'image') {
      let imageContent = this.getImageAttributes();
      addedItems[this.state.addedIndex].attributes = imageContent;
      let size = {
        width: 500,
        height: 300,
      }
      addedItems[this.state.addedIndex].attributes.size = size;
      this.setState({
        addedItems: addedItems,
      });
      this.resetInputButton();
    }
    else if (this.state.contentTypeAdded === 'video') {
      let videoContent = this.getVideoAttributes();
      addedItems[this.state.addedIndex].attributes = videoContent;
      this.setState({
        addedItems: addedItems,
      });
      this.resetInputButton();
    }
    else if (this.state.contentTypeAdded === 'audio') {
      let audioContent = this.getAudioAttributes();
      addedItems[this.state.addedIndex].attributes = audioContent;
      this.setState({
        addedItems: addedItems,
      });
      this.resetInputButton();
    }
    else if (this.state.contentTypeAdded === 'pdf') {
      let pdfContent = this.getPdfAttributes();
      addedItems[this.state.addedIndex].attributes = pdfContent;
      this.setState({
        addedItems: addedItems,
      });
      this.resetInputButton();
    }
    else if (this.state.contentTypeAdded === 'compressed') {
      let compressedContent = this.getCompressedAttributes();
      addedItems[this.state.addedIndex].attributes = compressedContent;
      this.setState({
        addedItems: addedItems,
      });
      this.resetInputButton();
    }
    else if (this.state.contentTypeAdded === 'link') {
      let linkContent = this.getLinkAttributes();
      addedItems[this.state.addedIndex].attributes = linkContent;
      this.setState({
        addedItems: addedItems,
      });
    }
    else if (this.state.contentTypeAdded === 'h5p') {
      let h5pContent = this.getH5pAttributes();
      addedItems[this.state.addedIndex].attributes = h5pContent;
      this.setState({
        addedItems: addedItems,
      });
    }
    else if (this.state.contentTypeAdded === 'quiz') {
      let quizContent = this.getQuizAttributes();
      addedItems[this.state.addedIndex].attributes = quizContent;
      this.setState({
        addedItems: addedItems,
      });
    }
    this.contentHandleClose();
    this.resetMenuItems();
  }

  resetMenuItems(){
    let contentItems1 = createContentItems1();
    let contentItems2 = createContentItems2();
    let contentItems3 = createContentItems3();
    let contentItems4 = createContentItems4();
    this.setState({
      contentItems1: contentItems1,
      contentItems2: contentItems2,
      contentItems3: contentItems3,
      contentItems4: contentItems4,
    })
  }

  cancelContentCreation(){
    let addedItems = this.state.addedItems;
    addedItems.splice(this.state.addedIndex, 1);
    this.setState({
      addedItems:addedItems,
    });
    if (this.state.contentTypeAdded === 'image') {
      this.generateImageSalt();
      this.resetInputButton();
    }
    if (this.state.contentTypeAdded === 'video') {
      this.generateVideoSalt();
      this.resetInputButton();
    }
    if (this.state.contentTypeAdded === 'audio') {
      this.generateAudioSalt();
      this.resetInputButton();
    }
    if (this.state.contentTypeAdded === 'pdf') {
      this.generatePdfSalt();
      this.resetInputButton();
    }
    if (this.state.contentTypeAdded === 'compressed') {
      this.generateCompressedSalt();
      this.resetInputButton();
    }
    this.contentHandleClose();
  }

  setMenu(option){

  }

  removeItem(item){
    let addedItems = this.state.addedItems;
    let removeIndex = addedItems.indexOf(item);
    addedItems.splice(removeIndex, 1);
    this.setState({
      addedItems: addedItems,
    });
  }

  componentDidMount(){

  }

  render() {
    return(
      <div>
        <div className="course-creator-container">
          <div className="course-creator-work-area">
            <div className="course-creator-drop-area">
              <Container dragBeginDelay={500} dragClass="drag-class" nonDragAreaSelector="resizable-item" style={{width: "100%", height: "100%"}} groupName="1" getChildPayload={i => this.state.addedItems[i]} onDrop={e => this.openDialog(e)}>
                {
                  this.state.addedItems.map((p, i) => {
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
            </div>
            <div className="course-creator-menu-area">
              <Container orientation="horizontal" groupName="1" behaviour="copy" getChildPayload={i => this.state.contentItems1[i]} onDrop={e => this.setState({ contentItems1: applyDrag(this.state.contentItems1, e) })}>
                {
                  this.state.contentItems1.map((p,i) => {
                    return (
                      <Draggable key={i}>
                        <ContentMenuItem type={p.type}/>
                      </Draggable>
                    );
                  })
                }
              </Container>
              <Container orientation="horizontal" groupName="1" behaviour="copy" getChildPayload={i => this.state.contentItems2[i]} onDrop={e => this.setState({ contentItems2: applyDrag(this.state.contentItems2, e) })}>
                {
                  this.state.contentItems2.map((p,i) => {
                    return (
                      <Draggable key={i}>
                        <ContentMenuItem type={p.type}/>
                      </Draggable>
                    );
                  })
                }
              </Container>
              <Container orientation="horizontal" groupName="1" behaviour="copy" getChildPayload={i => this.state.contentItems3[i]} onDrop={e => this.setState({ contentItems3: applyDrag(this.state.contentItems3, e) })}>
                {
                  this.state.contentItems3.map((p,i) => {
                    return (
                      <Draggable key={i}>
                        <ContentMenuItem type={p.type}/>
                      </Draggable>
                    );
                  })
                }
              </Container>
              <Container orientation="horizontal" groupName="1" behaviour="copy" getChildPayload={i => this.state.contentItems4[i]} onDrop={e => this.setState({ contentItems4: applyDrag(this.state.contentItems4, e) })}>
                {
                  this.state.contentItems4.map((p,i) => {
                    return (
                      <Draggable key={i}>
                        <ContentMenuItem type={p.type}/>
                      </Draggable>
                    );
                  })
                }
              </Container>
            </div>
          </div>
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
              this.state.contentTypeAdded === 'text' ?
                <TextForm
                  getTextAttributesFunction={textAttributes => this.getTextAttributes = textAttributes}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'image' ?
                <ImageForm
                  generateImageSaltFunction={imageSalt => this.generateImageSalt = imageSalt}
                  getImageAttributesFunction={imageAttributes => this.getImageAttributes = imageAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'video' ?
                <VideoForm
                  generateVideoSaltFunction={videoSalt => this.generateVideoSalt = videoSalt}
                  getVideoAttributesFunction={videoAttributes => this.getVideoAttributes = videoAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'audio' ?
                <AudioForm
                  generateAudioSaltFunction={audioSalt => this.generateAudioSalt = audioSalt}
                  getAudioAttributesFunction={audioAttributes => this.getAudioAttributes = audioAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'link' ?
                <LinkForm
                  getLinkAttributesFunction={linkAttributes => this.getLinkAttributes = linkAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'pdf' ?
                <PdfForm
                  generatePdfSaltFunction={pdfSalt => this.generatePdfSalt = pdfSalt}
                  getPdfAttributesFunction={pdfAttributes => this.getPdfAttributes = pdfAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'compressed' ?
                <CompressedForm
                  generateCompressedSaltFunction={compressedSalt => this.generateCompressedSalt = compressedSalt}
                  getCompressedAttributesFunction={compressedAttributes => this.getCompressedAttributes = compressedAttributes}
                  resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'h5p' ?
                <H5PForm
                  getH5pAttributesFunction={h5pAttributes => this.getH5pAttributes = h5pAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.contentTypeAdded === 'quiz' ?
                <QuizForm
                  getQuizAttributesFunction={quizAttributes => this.getQuizAttributes = quizAttributes}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                />
              :
              undefined
            }
          </DialogContent>
          <Divider/>
          <DialogActions>
            <Button onClick={() => this.cancelContentCreation()} color="primary">
              cancel
            </Button>
            <Button onClick={() => this.createContent()} color="primary">
              create content
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
