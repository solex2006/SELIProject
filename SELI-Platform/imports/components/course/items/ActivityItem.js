import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import CommentItem from './CommentItem.js';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachmentPreview from '../../files/previews/AttachmentPreview';
import FileUpload from '../../files/FileUpload';
import Paper from '@material-ui/core/Paper';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import InfoIcon from '@material-ui/icons/Info';
import { Tracker } from 'meteor/tracker';
import { Activities } from '../../../../lib/ActivitiesCollection';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import A11yEditor, { getText } from '../../inputs/editor/A11yEditor';
import AccessibilityHelp from '../../tools/AccessibilityHelp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'activity-panel',
      dialogText: '',
      additionalNotes: '',
      resolved: false,
      textSection: {},
      myStories: [],
      index: 0,
      activityId: '',
    }
  }

  handleChangePanel = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  componentDidMount(){
    document.title=this.props.language.myStories;
    let dialogText;
    if (this.props.item.attributes.type === 'upload') {
      dialogText = this.props.language.toActivityUpload;
    } else if (this.props.item.attributes.type === 'section') {
      dialogText = this.props.language.toActivityWrite;
    } else if (this.props.item.attributes.type === 'storyboard') {
      dialogText = this.props.language.toActivityStoryboard;
    }
    this.setState({
      dialogText,
    });
    if (this.props.toResolve && !this.props.fromProgram) {
      if (this.props.item.attributes.type === 'forum' || this.props.item.attributes.type === 'storyboard') {
        this.getStories();
      }
      this.getIndex();
    }
  }

  instructionHeader = () => {
    return (
      <div className="activity-item-container-instruction">
        {
          this.props.item.attributes.type !== "forum" &&
          <React.Fragment>
            <p>{this.state.dialogText}</p><br/>
          </React.Fragment>
        }
        {
          this.props.item.attributes.instruction && (
            this.props.item.attributes.instruction.blocks ?
              <Editor 
                editorState={this.Texteditor(this.props.item.attributes.instruction)} readOnly={true} 
              /> 
            :
              <div
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}>
              </div>
          )
        }
      </div>
    )
  }

  getIndex = () => {
    this.props.toResolve.map((activity, index) => {
      if (activity._id === this.props.item.id) {
        this.setState(
          {index},
          () => {
            if (activity.activityId) {
              this.setState({activityId: activity.activityId}, () => {
                this.getActivityInformation();
                this.checkResolved();
              })
            }
          }
        ) 
      }
    })
  }

  getActivityInformation = () => {
    this.listsTracker = Tracker.autorun(() => {
      Meteor.subscribe('activityInformation'); // Auto publish when loggedin
      let activityInformation = Activities.findOne({
        _id: this.state.activityId,
      })
      if (this.props.item.attributes.type === 'section') {
        this.setState({
          textSection: activityInformation.activity.textSection,
        });
      }
      this.setState({ activityInformation });
    });
  }

  getStories = () => {
    Tracker.autorun(() => {
      let myStories = Activities.find({
        'activity.user': Meteor.userId(),
        'activity.type': { $in: [ "storytelling", "storytelling-time" ] },
      }).fetch();
      this.setState({
        myStories: myStories,
      });
    });
  }

  selectStory = (story, name) => {
    this.setState({
      storySelected: story,
      storySelectedName: name,
    });
  }

  checkResolved = () => {
    if (this.props.toResolve[this.state.index]._id === this.props.item.id && this.props.toResolve[this.state.index].resolved) {
      this.setState({resolved: true}); 
    }
  }

  doActivity = () => {
    this.handleClickOpen();
    let confirmAction;
    if (this.props.item.attributes.type === 'forum') {
      confirmAction = () => this.sendComment();
    }
    if (this.props.item.attributes.type === 'upload') {
      confirmAction = () => this.sendFile();
    }
    if (this.props.item.attributes.type === 'section') {
      confirmAction = () => this.sendSection();
    }
    if (this.props.item.attributes.type === 'storyboard') {
      confirmAction = () => this.sendStoryboard();
    }
    this.setState({
      confirmAction: confirmAction,
    });
  }

  sendComment = () => {
    const childText = getText();
    this.setState({textSection: childText}, () => {
      if (this.validateSectionActivity()) {
        let comment = {};
        let activity = this.state.activityInformation;
        let data = activity.activity.data;
        comment.id = Math.random();
        comment.userId = Meteor.userId();
        comment.date = new Date();
        comment.label = this.state.textSection;
        comment.media = [];
        data.push(comment);
        Activities.update(
          { _id: this.state.activityId},
          { $set: {
            'activity.data': data,
          }}, () => {
            if (!this.props.fromTutor) {
              this.props.completeActivity(this.props.item.id, activity.activity);
            }
            this.setState({
              textSection: '',
            })
          }
        );
        this.handleClose();
      }
    })
  }

  deleteComment = (commentToDelete) => {
    let activity = this.state.activityInformation;
    let data = activity.activity.data;
    const index = data.findIndex(comment => comment.id === commentToDelete.id);
    data.splice(index, 1);
    Activities.update(
      { _id: this.state.activityId},
      { $set: {
        'activity.data': data,
      }}
    );
  }

  sendStoryboard = () => {
    if (this.validateStoryboard()) {
      let activity = {
        activityId: this.state.storySelected,
        type: 'storyboard',
        public: false,
      }
      this.props.completeActivity(this.props.item.id, activity);
      this.handleClose();
    }
  }

  sendFile = () => {
    if (this.validateUploadActivity()) {
      let activity = {
        file: this.state.file,
        additionalNotes: this.state.additionalNotes,
        type: 'upload',
        public: false,
      }
      this.props.completeActivity(this.props.item.id, activity);
      this.handleClose();
    }
  }

  sendSection = () => {
    const childText = getText();
    this.setState({textSection: childText}, () => {
      if (this.validateSectionActivity()) {
        let activity = {
          textSection: this.state.textSection,
          type: 'section',
          public: true,
        }
        this.props.completeActivity(this.props.item.id, activity);
        this.handleClose();
      }
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getFileInformation = (file) => {
    this.setState({
      file: file,
      showPreview: true,
    });   
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      file: undefined,
    });
  }

  handleChange = name => event => {
    if (name === 'additionalNotes') {
      this.setState({
        additionalNotes: event.target.value,
      });
    }
  }

  validateStoryboard = () => {
    if (this.state.storySelected === undefined) {
      this.props.handleControlMessage(true, this.props.language.completeActivityStoryboard)
      return false;
    }
    return true;
  }

  validateUploadActivity = () => {
    if (this.state.file === undefined) {
      this.props.handleControlMessage(true, this.props.language.completeActivityUpload)
      return false;
    }
    return true;
  }

  validateSectionActivity = () => {
    if (this.state.textSection === null || this.state.textSection.blocks.text === "") {
      this.props.handleControlMessage(true, this.props.language.completeActivityWrite)
      return false;
    }
    return true;
  }

  getInnerHtml(innerHTML){
    this.setState({
      textSection: innerHTML,
    });
  }

  componentWillReceiveProps() {
    if (this.props.toResolve && !this.props.fromProgram) this.getIndex()
  }

  closeer=()=>{
    this.setState({
      alert:"Noalert"
    })
  }

  Texteditor = (section) => {
    const contentState = convertFromRaw(section);
    const editorState =  EditorState.createWithContent(contentState);
    return editorState;
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="activity-content-item">
              <div>
                <div className="activity-item-container">
                  <div className="activity-container">
                    <ExpansionPanel
                      defaultExpanded
                      expanded={this.props.item.attributes.expanded}
                      onChange={this.handleChangePanel('activity-panel')}
                      className="activity-parent-panel"
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        aria-labelledby={`activity-summary-${this.props.item.id} activity-instructions-${this.props.item.id}`}
                        id={this.props.item.id}
                        className="item-quiz-expansion-summary"
                      >
                        <div id={`activity-summary-${this.props.item.id}`} className="item-quiz-expansion-summary-text-container">
                          <h2 className="activity-panel-title  MuiTypography-root activity-panel-title MuiTypography-body1">{this.props.language.activity}</h2>
                          <h3 className="quiz-panel-subtitle MuiTypography-root quiz-panel-subtitle MuiTypography-body1">
                            <Button tabIndex="-1" className="quiz-panel-subtitle " aria-expanded="true" aria-controls="sect1" id="acc1id"  size="large" >
                              { this.props.item.attributes.type === 'storyboard' ? this.props.language.storyboardActivity : undefined }
                              { this.props.item.attributes.type === 'upload' ? this.props.language.uploaddActivity : undefined }
                              { this.props.item.attributes.type === 'section' ? this.props.language.textSectionActivity : undefined }
                            { this.props.item.attributes.type === 'forum' ? this.props.language.forum : undefined }
                            </Button>
                          </h3>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="item-quiz-detail">
                        <div id={`activity-instructions-${this.props.item.id}`} className="item-quiz-detail-container">
                          <p className="activity-instruction-title">{this.props.language.instructions}</p>
                          {this.instructionHeader()}
                          {
                            this.props.item.attributes.type === 'upload' ?
                              <div>
                                <p className="activity-instruction-title">{`${this.props.language.fileType}: ${this.props.item.attributes.fileTypes.label}`}</p>
                                {
                                  this.state.activityInformation && this.state.activityInformation.activity.type === 'upload' ?
                                    <div>
                                      <div className="activity-item-container-instruction"
                                        dangerouslySetInnerHTML={{__html: this.state.activityInformation.activity.additionalNotes}}>
                                      </div>
                                      <div className="activity-item-container-file">
                                        {
                                          !this.state.activityInformation.activity.file ? undefined :
                                            <AttachmentPreview
                                              preview
                                              file={this.state.activityInformation.activity.file}
                                              unPickFile={this.unPickFile.bind(this)}
                                              language={this.props.language}
                                            />
                                        }
                                      </div>
                                    </div>
                                  : undefined
                                }
                              </div>
                            :
                              undefined
                          }
                          {
                            !this.state.activityInformation ? undefined :
                              this.state.activityInformation.activity.type === 'storytelling' ||
                              this.state.activityInformation.activity.type === 'storytelling-time'  ?
                                <div>
                                  <p className="activity-instruction-title">{`${this.props.language.story}:`}</p>
                                  <div className="activity-item-container-instruction">
                                    <Link style={{"text-decoration": "none"}}
                                      target="_blank"
                                      to={`/story#${this.state.activityInformation._id}`}
                                    >
                                      {this.state.activityInformation.activity.name}
                                    </Link>
                                  </div>
                                </div>
                              :
                                undefined
                          }
                          {
                            this.state.activityInformation && this.state.activityInformation.activity.type === 'section' ?
                              this.state.textSection &&
                              <div>
                                <p className="activity-instruction-title">{`${this.props.language.text}:`}</p>
                                {
                                  this.state.textSection.blocks ?
                                    <div className="activity-item-container-instruction">
                                      <Editor 
                                        editorState={this.Texteditor(this.state.textSection)} readOnly={true} 
                                      /> 
                                    </div>
                                  :
                                    <div className="activity-item-container-instruction"
                                      dangerouslySetInnerHTML={{__html: this.state.textSection}}>
                                    </div>
                                }
                              </div>
                            :
                              undefined
                          }
                          {
                            this.state.activityInformation && this.state.activityInformation.activity.type === 'forum' && this.state.activityInformation.activity.data.length > 0 ?
                              <div>
                                <p className="activity-instruction-title">{`${this.props.language.comments}:`}</p>
                                {
                                  this.state.activityInformation.activity.data.map(comment => {
                                    console.log(this.state.activityInformation)
                                    return(
                                      <CommentItem 
                                        comment={comment}
                                        deleteComment={this.deleteComment.bind(this)}
                                        language={this.props.language}
                                        activityId={this.state.activityId}
                                        displayBadge={this.state.activityInformation.activity.badge === ""}
                                        tutorId = {this.state.activityInformation.activity.user}
                                      />
                                    )
                                  })
                                }
                              </div>
                            :
                              undefined
                          }
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                      {
                        !this.props.fromProgram &&
                        <ExpansionPanelActions className="quiz-item-actions">
                          {
                            this.props.fromTutor ? undefined : 
                              <div>
                                <Button size="medium">
                                  {this.props.language.setReminder}
                                </Button>
                                <Button onClick={() => this.doActivity()} size="medium" color="primary">
                                  {this.props.language.doActivity}
                                </Button>
                              </div>
                          }
                          {
                            this.state.resolved  ?
                              <div className="align-items-center">
                                <Button size="medium">
                                  {this.props.language.activityDone}
                                </Button>
                                <CheckCircleIcon className="done-icon"/>
                              </div>
                            :
                              undefined
                          }
                        </ExpansionPanelActions>
                      }
                    </ExpansionPanel>
                  </div>
                </div>
              </div>
            </div>
          :
          undefined
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.doActivity}</DialogTitle>
          <DialogContent className="stories-dialog-content">
            {this.instructionHeader()}
            {
              this.props.item.attributes.type === 'upload' ?
                <div style={{width: '100%'}}>
                  <br></br>
                  {
                    !this.state.showPreview ?
                      <FileUpload
                        type={this.props.item.attributes.fileTypes.label.toLowerCase()}
                        user={Meteor.userId()}
                        accept={this.props.item.attributes.fileTypes.accept}
                        handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label={this.props.language.clickUploadFile}
                        language={this.props.language}
                      />
                    :
                      <AttachmentPreview
                        file={this.state.file}
                        unPickFile={this.unPickFile.bind(this)}
                        language={this.props.language}
                      />
                  }
                  
                  <div>
                      {
                          this.props.item.attributes.fileTypes.label==="Compressed"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadCompressed: this.props.language.uploadCompressedCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Audio"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadAudio: this.props.language.uploadAudioCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Video"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadVideo: this.props.language.uploadVideoCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Word"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadWord: this.props.language.uploadWordCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Pdf"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadPdf: this.props.language.uploadPdfCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Image"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadImage: this.props.language.uploadImageCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Power point"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadPowerPoint: this.props.language.uploadPowerPointCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                          this.props.item.attributes.fileTypes.label==="Excel"?
                          <div className="form-editor-label">
                            <AccessibilityHelp 
                              id={'short-description-help-container'} 
                              name={'shortDescriptionHelpContainer'} 
                              error={!this.state.showPreview} 
                              tip={!this.state.showPreview? this.props.language.uploadExcel: this.props.language.uploadExcelCorrect} 
                              //step={props.step}
                              //stepLabel={props.stepLabel}
                              language={this.props.language}
                            />
                          </div>
                          :
                          undefined
                      }
                  </div>
                  
                
                  <TextField
                    id="biography-input"
                    label={`${this.props.language.additionalNotes}:`}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={this.state.additionalNotes}
                    onChange={this.handleChange('additionalNotes')}
                  />
                </div>
              :
              undefined
            }
            {/* {
              this.props.item.attributes.type === 'section'  || this.props.item.attributes.type === 'forum' ?
                <EditorLinks
                  id="comment-input"
                  areaHeight='20vh'
                  innerHTML={this.state.textSection}
                  buttonLabels={false}
                  addLinks={true}
                  stories={this.props.item.attributes.type === 'forum' ? this.state.myStories : undefined}
                  getInnerHtml={this.getInnerHtml.bind(this)}
                  language={this.props.language}
                />
              :
                undefined
            } */}
            {
              this.props.item.attributes.type === 'section'  || this.props.item.attributes.type === 'forum' ?
                <A11yEditor
                  textSection={this.state.textSection}
                  language={this.props.language}
                />
              :
                undefined
            }
            {
              this.props.item.attributes.type === 'storyboard' ?
                this.state.myStories.length === 0 ?
                  <div className="empty-dashboard-row">
                    <p >{this.props.language.notHaveStoriesYet}</p>
                    <InfoIcon />
                  </div>
                :
                  this.state.myStories.map(story => {
                    return(
                      <Paper 
                        onClick={() => this.selectStory(story._id, story.activity.name)} 
                        elevation={story._id === this.state.storySelected ? 15 : 2} 
                        className="story-item-container"
                        tabIndex="0"
                      >
                        <LibraryBooksIcon className="story-item-icon"/>
                        <p className="story-item-text-primary">{story.activity.name}</p>
                        <Link className="story-item-button"
                          target="_blank"
                          to={`/story#${story._id}`}
                          tabIndex="-1"
                        >
                          <Tooltip title={this.props.language.open} placement="left">
                            <IconButton color="secondary" aria-label="open">
                              <img src="openNew.svg"/>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Paper>
                    )
                  })
              :
                undefined
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              {this.props.language.deliverActivity}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
