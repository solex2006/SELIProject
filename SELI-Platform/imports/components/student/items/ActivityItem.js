import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AttachmentPreview from '../../files/previews/AttachmentPreview';
import FileUpload from '../../files/FileUpload';
import Editor from '../../inputs/editor/Editor';
import Paper from '@material-ui/core/Paper';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Activities } from '../../../../lib/ActivitiesCollection';

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'activity-panel',
      dialogText: '',
      additionalNotes: '',
      resolved: false,
      textSection: '',
      myStories: [],
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
    this.checkResolved();
    this.getStories();
  }

  getStories = () => {
    Tracker.autorun(() => {
      let myStories = Activities.find({
        'activity.user': Meteor.userId(),
        'activity.type': "storytelling",
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
    this.props.toResolve.map(activity => {
      (activity._id === this.props.item.id && activity.resolved) ? this.setState({resolved: true}) : undefined
    })
  }

  doActivity = () => {
    this.handleClickOpen();
    let dialogText;
    let confirmAction;
    if (this.props.item.attributes.type === 'upload') {
      dialogText = this.props.language.toActivityUpload,
      confirmAction = () => this.sendFile();
    }
    if (this.props.item.attributes.type === 'section') {
      dialogText = this.props.language.toActivityWrite,
      confirmAction = () => this.sendSection();
    }
    if (this.props.item.attributes.type === 'storyboard') {
      dialogText = this.props.language.toActivityStoryboard,
      confirmAction = () => this.sendStoryboard();
    }
    this.setState({
      dialogText: dialogText,
      confirmAction: confirmAction,
    });
  }

  sendStoryboard = () => {
    if (this.validateStoryboard()) {
      let activity = {
        activityId: this.state.storySelected,
        type: 'storyboard',
        public: false,
      }
      this.props.completeActivity(this.props.item.id, activity, "Activity");
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
      this.props.completeActivity(this.props.item.id, activity, "Activity");
      this.handleClose();
    }
  }

  sendSection = () => {
    if (this.validateSectionActivity()) {
      let activity = {
        textSection: this.state.textSection,
        type: 'section',
        public: false,
      }
      this.props.completeActivity(this.props.item.id, activity, "Activity");
      this.handleClose();
    }
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
    if (this.state.textSection === '') {
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
    this.checkResolved();
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
                      className="item-quiz-panel"
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id={this.props.item.id}
                        className="item-quiz-expansion-summary"
                      >
                        <div className="item-quiz-expansion-summary-text-container">
                          <Typography className="activity-panel-title">{this.props.language.activity}</Typography>
                          <Typography className="quiz-panel-subtitle">
                            { this.props.item.attributes.type === 'storyboard' ? this.props.language.storyboardActivity : undefined }
                            { this.props.item.attributes.type === 'upload' ? this.props.language.uploaddActivity : undefined }
                            { this.props.item.attributes.type === 'section' ? this.props.language.textSectionActivity : undefined }
                          </Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="item-quiz-detail">
                        <div className="item-quiz-detail-container">
                          <p className="activity-instruction-title">{this.props.language.instructions}</p>
                          <div className="activity-item-container-instruction">
                            {this.props.item.attributes.instruction}
                          </div>
                          {
                            this.props.item.attributes.type === 'upload' ?
                              <div className="activity-detail-container">
                                <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                                  {this.props.language.acceptedFileType}
                                </Typography>
                                <Typography className="file-type-text-detail" variant="overline" display="block" gutterBottom>
                                  {this.props.item.attributes.fileTypes.label}
                                </Typography>
                              </div>
                            :
                            undefined
                          }
                          {
                            /* this.props.item.attributes.type === 'storyboard' ?
                              <div className="activity-detail-container">
                                <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                                  {`${this.props.language.story}:`}
                                </Typography>
                                <Link className="story-item-button"
                                  //target="_blank"
                                  to={`/story#${this.state.storySelected}`}
                                >
                                  <Typography className="file-type-text-detail" variant="overline" display="block" gutterBottom>
                                    {this.state.storySelectedName}
                                  </Typography>
                                </Link>
                              </div>
                            :
                            undefined */
                          }
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions className="quiz-item-actions">
                        {
                          !this.state.resolved ?
                            <div>
                              <Button size="medium">
                                {this.props.language.setReminder}
                              </Button>
                              <Button onClick={() => this.doActivity()} size="medium" color="primary">
                                {this.props.language.doActivity}
                              </Button>
                            </div>
                          :
                          <div className="align-items-center">
                            <Button size="medium">
                              {this.props.language.activityDone}
                            </Button>
                            <CheckCircleIcon className="done-icon"/>
                          </div>
                        }
                      </ExpansionPanelActions>
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
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.doActivity}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogText}
            </DialogContentText>
            {
              this.props.item.attributes.type === 'upload' ?
                <div style={{width: '100%'}}>
                  {
                    !this.state.showPreview ?
                      <FileUpload
                        type={this.props.item.attributes.fileTypes.label.toLowerCase()}
                        user={Meteor.userId()}
                        accept={this.props.item.attributes.fileTypes.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label={this.props.language.clickUploadFile}
                      />
                    :
                    <AttachmentPreview
                      file={this.state.file}
                      unPickFile={this.unPickFile.bind(this)}
                      language={this.props.language}
                    />
                  }
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
            {
              this.props.item.attributes.type === 'section' ?
                <Editor
                  areaHeight='20vh'
                  innerHTML={this.state.textSection}
                  buttonLabels={false}
                  addLinks={true}
                  getInnerHtml={this.getInnerHtml.bind(this)}
                  language={this.props.language}
                />
              :
              undefined
            }
            {
              this.props.item.attributes.type === 'storyboard' ?
                this.state.myStories.map(story => {
                  return(
                    <Paper 
                      onClick={() => this.selectStory(story._id, story.activity.name)} 
                      elevation={story._id === this.state.storySelected ? 5 : 1} 
                      className="story-item-container"
                    >
                      <LibraryBooksIcon className="story-item-icon"/>
                      <p className="story-item-text-primary">{story.activity.name}</p>
                      <Link className="story-item-button"
                        //target="_blank"
                        to={`/story#${story._id}`}
                      >
                        <Button variant="contained" color="secondary">
                          {this.props.language.open}
                        </Button>
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
