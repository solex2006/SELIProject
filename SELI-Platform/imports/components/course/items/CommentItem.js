import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Meteor } from 'meteor/meteor';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import IconButton from '@material-ui/core/IconButton';
import QuizForm from '../../content/QuizForm';
import { FormControl, FormGroup, TextField ,FormControlLabel, Switch, Dialog, DialogTitle} from '@material-ui/core';
import { Divider } from 'material-ui';
import BadgeUpload from '../../files/BadgeUpload';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import ImagePreview from '../../files/previews/ImagePreview';
export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBadgeForm: false,
      badgeClass: {
        name: "",
        description: "",
        image: undefined,
        criteria: "",
      },
    };
  }

  getAvatarColor = (code) => {
    if (code >= 65 && code <= 67) {
      return "#f44336";
    }
    if (code >= 68 && code <= 70) {
      return "#e91e63";
    }
    if (code >= 71 && code <= 73) {
      return "#673ab7";
    }
    if (code >= 74 && code <= 76) {
      return "#3f51b5";
    }
    if (code >= 78 && code <= 80) {
      return "#2196f3";
    }
    if (code >= 81 && code <= 83) {
      return "#009688";
    }
    if (code >= 84 && code <= 86) {
      return "#009688";
    }
    if (code >= 87 && code <= 89) {
      return "#4caf50";
    }
    if (code >= 90 && code <= 92) {
      return "#ffc107";
    } else {
      return "#ff9800";
    }
  };

  componentDidMount() {
    let profile = Meteor.users.findOne({ _id: this.props.comment.userId });
    this.setState({
      color: this.getAvatarColor(profile.username.toUpperCase().charCodeAt(0)),
    });
    this.setState({
      profile: profile,
    });
  }

  Texteditor = () => {
    const contentState = convertFromRaw(this.props.comment.label);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  openBadgeEditor() {
    this.setState({ showBadgeForm: true });
    console.log("displayin badge editor");
  }
  getbadgeClass(file){
 
    this.setState({
      badgeClass: { image: file },
      showPreview: true,
      showLibrary: false,
    });
    console.log(this.state.badgeClass)
  }
  unPickBadgeImage(){

    this.setState({
      badgeClass: { image: undefined },
      showPreview: true,
      showLibrary: false,
    });
  }
  contentHandleClose = () => {
    this.setState({ showBadgeForm: false });

  }
  createContent = () => {
    console.log('creating copntent');
  }
  handleChange(name) {}
  render() {
    return (
      <div>
        {this.state.profile ? (
          <div className="student-comment">
            <Avatar
              style={{ backgroundColor: this.state.color }}
              className="student-profile-avatar-comment"
            >
              {this.state.profile.username.charAt(0).toUpperCase()}
            </Avatar>
            <Paper
              className="student-profile-information-container-comment"
              elevation={4}
            >
              <div className="student-profile-information-text-comment-button-option">
                <p className="student-profile-information-text-secondary-comment">
                  {`${
                    this.props.language.date
                  }: ${this.props.comment.date.getHours()}:${
                    this.props.comment.date.getMinutes() < 10
                      ? `0${this.props.comment.date.getMinutes()}`
                      : this.props.comment.date.getMinutes()
                  } - ${this.props.comment.date.toLocaleDateString("en-US")}`}
                </p>
                <IconButton
                  onClick={this.openBadgeEditor.bind(this)}
                  style={{ padding: "0px" }}
                >
                  <MoreHorizRoundedIcon />
                </IconButton>
              </div>
              <p className="student-profile-information-text-secondary-comment">
                {`${this.props.language.name}: ${this.state.profile.profile.fullname}`}
              </p>
              {this.props.comment.label &&
                (this.props.comment.label.blocks ? (
                  <div className="activity-item-container-instruction">
                    <Editor editorState={this.Texteditor()} readOnly={true} />
                  </div>
                ) : (
                  <div
                    className="activity-item-container-instruction"
                    dangerouslySetInnerHTML={{
                      __html: this.props.comment.label,
                    }}
                  ></div>
                ))}
            </Paper>
            {this.props.comment.userId === Meteor.userId() ? (
              <Tooltip
                onClick={() => this.props.deleteComment(this.props.comment)}
                title={this.props.language.delete}
              >
                <Fab
                  className="course-item-comment-card-media-fab"
                  size="small"
                >
                  <DeleteIcon color="primary" />
                </Fab>
              </Tooltip>
            ) : undefined}
          </div>
        ) : undefined}
        {/* Badge Section */}
        {this.state.showBadgeForm  ? (
          <Dialog
            open={open}
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
              <AppBar
                className="dialog-app-bar"
                color="primary"
                position="static"
              >
                <Toolbar
                  className="dialog-tool-bar"
                  variant="dense"
                  disableGutters={true}
                >
                  <AppsIcon />

                  {"Badge form creation"}
                  <IconButton
                    id="close-icon"
                    edge="end"
                    className="dialog-toolbar-icon"
                    //disabled={this.state.showCourseOrganization || this.state.showAccessibilityOptions || this.state.showAccessibilityForm}
                    onClick={() => {
                      this.contentHandleClose();
                      // this.contentHandleClose();
                      // if (
                      //   this.state.contentToEdit === undefined &&
                      //   !this.state.showAccessibilityOptions
                      // ) {
                      //   this.cancelContentCreation();
                      // }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </DialogTitle>

            <div className="dialog-form-container">
              {
                <div className="badgeCreationOptions">
                  <div className="badge-form-container">
                    <div className="badge-image-upload ">
                      {this.state.showPreview ? (
                        <div className="form-preview-container">
                          <ImagePreview
                            file={this.state.badgeClass.image}
                            language={this.props.language}
                            unPickFile={this.unPickBadgeImage.bind(this)}
                          />
                        </div>
                      ) : (
                        <div className="form-file-container">
                          <BadgeUpload
                            type={this.state.fileType}
                            user={Meteor.userId()}
                            accept={this.state.accept}
                            getFileInformation={this.getbadgeClass.bind(this)}
                            label={this.props.language.selectBadgeImage}
                          />
                        </div>
                      )}
                    </div>
                    {/*  */}

                    <div className="badge-form-input-column">
                      <div className="sign-form">
                        <TextField
                          id="name-input"
                          label={this.props.language.name}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          autoComplete={"off"}
                          required
                          value={this.state.badgeClass.name}
                          onChange={this.handleChange("badgeName")}
                          error={
                            this.state.showError &&
                            this.state.badgeClass.name === ""
                          }
                        />
                        <TextField
                          id="description-input"
                          label={this.props.language.description}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          autoComplete={"off"}
                          required
                          multiline
                          rows={2}
                          value={this.state.badgeClass.description}
                          onChange={this.handleChange("badgeDescription")}
                          error={
                            this.state.showError &&
                            this.state.badgeClass.description === ""
                          }
                        />
                        <TextField
                          id="description-input"
                          label={this.props.language.criteria}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          autoComplete={"off"}
                          required
                          multiline
                          rows={3}
                          value={this.state.badgeClass.criteria}
                          onChange={this.handleChange("badgeCriteria")}
                          error={
                            this.state.showError &&
                            this.state.badgeClass.criteria === ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="dialog-actions-container">
              <Tooltip title={this.props.language.createContent}>
                <Fab
                  onClick={() => this.createContent()}
                  aria-label={this.props.language.createContent}
                  className="dialog-fab"
                  color="primary"
                >
                  <DoneIcon />
                </Fab>
              </Tooltip>
            </div>
          </Dialog>
        ) : undefined}
      </div>
    );
  }
}
