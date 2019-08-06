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
    if(e.removedIndex === null){
      let type = e.payload.type;
      this.setState({
        contentTypeAdded: type,
      }, () => {
        this.contentHandleClickOpen();
      });
    }
    this.setState({ addedItems: applyDrag(this.state.addedItems, e) })
  }

  getTextAttributes(){

  }

  createContent(){
    let addedItems = this.state.addedItems;
    if (this.state.contentTypeAdded === 'text') {
      let textContent = this.getTextAttributes();
      addedItems[addedItems.length - 1].attributes = textContent;
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

  setMenu(option){

  }

  componentDidMount(){

  }

  render() {
    return(
      <div>
        <div className="course-creator-container">
          <div className="course-creator-units-container">
            {
              this.state.units.map(units => {
                return(
                  <Unit
                    unit={units}
                    key={units.ordinal}
                  />
                )
              })
            }
            <Button onClick={() => this.handleClickOpen()} className="new-tool-button" color="secondary">New unit</Button>
          </div>
          <div className="course-creator-work-area">
            <div className="course-creator-drop-area">
              <Container style={{width: "100%", height: "100%"}} onDragEnter={() => console.log("yes")} groupName="1" getChildPayload={i => this.state.addedItems[i]} onDrop={e => this.openDialog(e)}>
                {
                  this.state.addedItems.map((p, i) => {
                    return (
                      <Draggable key={i}>
                        <ContentItem item={p}/>
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
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={SlideTransition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle id="language-select-title">Unit editor</DialogTitle>
          <DialogContent className="form-dialog">
            <div className="dialog-form-container">
              <div className="dialog-input-container">
                <TextField
                  id="unit-name-input"
                  label="Unit name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete={"off"}
                  error={this.state.inputs[0].error}
                />
              </div>
              <div className="dialog-input-container">
                <TextField
                  id="unit-description-input"
                  label="Unit description"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows="3"
                  error={this.state.inputs[1].error}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="form-button-container">
              <Button onClick={() => this.addUnit()} color="secondary">
                create unit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.contentOpen}
          onClose={this.contentHandleClose}
          TransitionComponent={GrowTransition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle className="sign-title">Content editor</DialogTitle>
          <Divider/>
          <DialogContent>
            {
              this.state.contentTypeAdded === 'text' ?
                <TextForm
                  getTextAttributesFuction={textAttributes => this.getTextAttributes = textAttributes}
                />
              :
              this.state.contentTypeAdded
            }
          </DialogContent>
          <Divider/>
          <DialogActions>
            <Button color="secondary">
              cancel
            </Button>
            <Button onClick={() => this.createContent()} color="secondary">
              create content
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
