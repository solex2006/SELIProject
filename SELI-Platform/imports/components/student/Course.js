import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Activities } from '../../../lib/ActivitiesCollection';
import { Comments } from '../../../lib/CommentsCollection';
import CourseMenu from './CourseMenu';
import CoursePresentation from './CoursePresentation';
import CourseContent from './CourseContent';
import MediaPlayer from './MediaPlayer';
import CommentDialog from '../student/comments/CommentDialog';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import AppsIcon from '@material-ui/icons/Apps';
import Tooltip from '@material-ui/core/Tooltip';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.activeCourse.information,
      progress: this.props.activeCourse.progress,
      toComplete: this.props.activeCourse.toComplete,
      toResolve: this.props.activeCourse.toResolve,
      coursePresentation: true,
      selected: this.props.selected,
      media: '',
      certificateCreated: false,
      certificateError: false,
      certificateDialogOpen: false,
      certificateErrorDialogOpen: false,
      stories: [],
    }
  }

  componentDidMount() {
    this.resumeNavigation();
    this.setState({
      progress: this.calculateProgress(this.props.activeCourse.toComplete, this.props.activeCourse.toResolve)
    }, () => {
      Meteor.call(
        "UpdateProgress",
        Meteor.userId(),
        this.state.course._id,
        this.state.progress,
        (error, response) =>  {}
      );
    });
  }

  resumeNavigation = () => {
    if (this.props.selected[0] !== -1) {
      this.setState({
        coursePresentation: false,
        courseContent: true,
      });
    }
  }

  navigateTo(level, to) {
    let selected = this.state.selected;
    selected.splice(0, selected.length)
    selected.push(to[0], to[1]);
    this.setState({
      selected: selected,
      coursePresentation: false,
      courseContent: true,
    });
  }

  showPresentation() {
    let selected = this.state.selected;
    selected.splice(0, selected.length)
    selected.push(-1, -1);
    this.setState({
      selected: selected,
      coursePresentation: true,
      courseContent: false,
    });
  }

  calculateProgress = (toComplete, toResolve, notCertificate) => {
    let total;
    if (this.state.course.organization.subunit) {
      let totalSubunits = 0;
      for (var i = 0; i < toComplete.length; i++) {
        for (var j = 0; j < toComplete[i].subunits.length; j++) {
          totalSubunits++;
        }
      }
      total = totalSubunits + toResolve.length;
    }
    else {
      total = toComplete.length + toResolve.length;
    }
    let unitPercentage  = parseFloat(100/total);
    let progress = 0;
    if (this.state.course.organization.subunit) {
      toComplete.map(completed => {
        completed.subunits.map(subunit => subunit ? progress += unitPercentage : undefined)
      });
    }
    else {
      toComplete.map(completed => completed ? progress += unitPercentage : undefined);
    }
    toResolve.map(activity => activity.resolved ? progress += unitPercentage : undefined);
    progress = progress.toFixed(2);
    return progress;
  }

  completeUnit = (index) => {
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    toComplete[index] = true;
    let progress = this.calculateProgress(toComplete, toResolve);
    this.setState({
      toComplete: toComplete,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteSection",
        Meteor.userId(),
        this.state.toComplete,
        this.state.course._id,
        progress,
        (error, response) =>  {
          if (!error) {
            this.props.handleControlMessage(true, this.props.language.topicCompletedText);
          }
        }
      );
    });
  }

  completeSubunit = (parent, child) => {
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    toComplete[parent].subunits[child] = true;
    let progress = this.calculateProgress(toComplete, toResolve);
    this.setState({
      toComplete: toComplete,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteSection",
        Meteor.userId(),
        this.state.toComplete,
        this.state.course._id,
        progress, (error, response) =>  {
          if (!error) {
            this.props.handleControlMessage(true, this.props.language.lessonCompletedText);
          }
        }
      );
    });
  }

  handleNextUnit = () => {
    let index = this.state.selected[0];
    this.navigateTo('unit', [(index + 1), undefined])
  }

  handlePreviousUnit = () => {
    let index = this.state.selected[0];
    this.navigateTo('unit', [(index - 1), undefined])
  }

  handleNextSubunit = () => {
    let parent = this.state.selected[1];
    let child = this.state.selected[0];
    if (child + 1 === this.state.course.program[this.state.selected[1]].lessons.length) {
      this.navigateTo('unit', [0, parent + 1])
    }
    else {
      this.navigateTo('unit', [child + 1, parent])
    }
  }

  handlePreviousSubunit = () => {
    let parent = this.state.selected[1];
    let child = this.state.selected[0];
    if (child === 0) {
      this.navigateTo('unit', [this.state.course.program[parent - 1].lessons.length - 1, parent - 1])
    }
    else {
      this.navigateTo('unit', [child - 1, parent])
    }
  }

  completeActivity = (id, activity) => {
   
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    let activityInserted;
   
    for (var i = 0; i < toResolve.length; i++) {
      if (toResolve[i]._id === id) {
        if (activity.type === "forum") { 
          toResolve[i].resolved = true;
        } else if (activity.type === "storyboard"){
          toResolve[i].resolved = true;
          toResolve[i].activityId = activity.activityId;
        } else {
          if (toResolve[i].resolved === true){
         
            activity.date = new Date();
            activity.user = Meteor.userId();
            activity.course = this.state.course._id;
            Activities.update(
              {_id: toResolve[i].activityId},
              {activity: activity}
            )
          } else {
            activity.date = new Date();
            activity.user = Meteor.userId();
            activity.course = this.state.course._id;
            activityInserted = Activities.insert({
              activity
            });
            toResolve[i].resolved = true;
            toResolve[i].activityId = activityInserted;
          }
        }
        //break;
      }
    }
    let progress = this.calculateProgress(toComplete, toResolve);
    this.setState({
      toResolve: toResolve,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteActivity",
        Meteor.userId(),
        this.state.toResolve,
        this.state.course._id,
        progress,
        (error, response) => {
          if (!error) {
            this.props.handleControlMessage(true, `${this.props.language[activity.type]} ${this.props.language.successfullyDone}`);
            this.props.reRender();
          }
        }
      );
    });
  }

  handleCloseMedia = () => {
    this.setState({ openMedia: false });
  }

  handleCloseComment = () => {
    this.setState({ openComment: false });
  }

  openMediaPlayer = (media, mediaType, mediaTitle) => {
    this.setState({
      media: media,
      mediaType: mediaType,
      mediaTitle: mediaTitle,
      openMedia: true,
    })
  }

  leaveComment = () => {
    this.setState({
      openComment: true,
    });
  }

  sendComment = (comment) => {
    Comments.insert({
      comment: comment,
      user: this.props.user.username,
      course: this.state.course._id,
      show: true,
      date: new Date(),
    }, () => {
      this.props.handleControlMessage(true, this.props.language.commentSuccessfullySent);
    })
  }

  handleCloseStories = () => {
    this.setState({
      openStories: false,
    });
  };

  showCourseStories = () => {
    this.setState({
      loadingStories: true,
    }, () => {
      Tracker.autorun(() => {
        let stories = Activities.find({
          'activity.type': { $in: [ "storytelling", "storytelling-time" ] }, 
          'activity.courseId': this.state.course._id,
        }).fetch();
        this.buildStories(stories);
      });
    });
  }

  buildStories = (stories) => {
    if (stories.length) {
      let users = [];
      stories.map(story => {
        let user = Meteor.users.find({_id: story.activity.user}).fetch();
        story.userInformation = user[0];
      })
      this.setState({
        stories: stories,
        results: true,
        loadingStories: false,
        openStories: true,
      })
    }
    else {
      this.setState({
        results: false,
        loadingStories: false,
      }, () => {
        this.props.handleControlMessage(true, this.props.language.notStoriesMessage)
      })
    }
  }

  render() {
    return(
      <div className="course-container">
        <CourseMenu
          course={this.state.course}
          progress={this.state.progress}
          navigateTo={this.navigateTo.bind(this)}
          selected={this.state.selected}
          showPresentation={this.showPresentation.bind(this)}
          showCourseStories={this.showCourseStories.bind(this)}
          language={this.props.language}
        />
        {
          this.state.coursePresentation ?
            <CoursePresentation
              course={this.state.course}
              navigateTo={this.navigateTo.bind(this)}
              selected={this.state.selected}
              language={this.props.language}
            />
          :
          undefined
        }
        {
          this.state.courseContent ?
            <CourseContent
              course={this.state.course}
              showPresentation={this.showPresentation.bind(this)}
              showComponent={this.props.showComponent.bind(this)}
              handleControlMessage={this.props.handleControlMessage.bind(this)}
              handlePreviousUnit={this.handlePreviousUnit.bind(this)}
              handleNextUnit={this.handleNextUnit.bind(this)}
              handlePreviousSubunit={this.handlePreviousSubunit.bind(this)}
              handleNextSubunit={this.handleNextSubunit.bind(this)}
              completeActivity={this.completeActivity.bind(this)}
              navigateTo={this.navigateTo.bind(this)}
              completeUnit={this.completeUnit.bind(this)}
              completeSubunit={this.completeSubunit.bind(this)}
              openMediaPlayer={this.openMediaPlayer.bind(this)}
              leaveComment={this.leaveComment.bind(this)}
              selected={this.state.selected}
              toComplete={this.state.toComplete}
              toResolve={this.state.toResolve}
              language={this.props.language}
            />
          :
          undefined
        }
        <Dialog
          open={this.state.openMedia}
          onClose={this.handleCloseMedia}
          TransitionComponent={Transition}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
          className="media-dialog"
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseMedia} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                {this.props.language.seliMediaPlayer}
              </Typography>
              <p className="app-tooltip">{this.props.language.pressEscCourse}</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="media-dialog-content">
            <MediaPlayer
              url={this.state.media.link}
              mediaType={this.state.mediaType}
              mediaTitle={this.state.mediaTitle}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openStories}
          onClose={this.handleCloseStories}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="media-dialog"
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar-information" variant="dense" disableGutters={true}>
                <AppsIcon/>
                <h4 className="dialog-label-title">{this.props.language.courseStories}</h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  onClick={this.handleCloseStories}
                >
                  <CloseIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className="stories-dialog-content">
            {
              this.state.stories.map(story => {
                return(
                  <Paper elevation={5} className="story-item-container">
                    <LibraryBooksIcon className="story-item-icon"/>
                    <p className="story-item-text-primary">{story.activity.name}</p>
                    <p className="story-item-text-secondary">{`By: ${story.userInformation.username}`}</p>
                    <Link className="story-item-button"
                      target="_blank"
                      to={`/story#${story._id}`}
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
            }
          </DialogContent>
        </Dialog>
        <CommentDialog
          open={this.state.openComment}
          title={this.props.language.leaveCommentTitle}
          handleClose={this.handleCloseComment.bind(this)}
          sendComment={this.sendComment.bind(this)}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />
      </div>
    )
  }
}
