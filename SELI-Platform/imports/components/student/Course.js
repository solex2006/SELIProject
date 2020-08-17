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
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
      media: '',
      certificateCreated: false,
      certificateError: false,
      certificateDialogOpen: false,
      certificateErrorDialogOpen: false,
      stories: [],
    }
  }

  componentDidMount() {
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

  calculateProgress = (toComplete, toResolve, notCertificate) => {
    let total;
    if (this.state.course.coursePlan.courseStructure === "unit") {
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
    if (this.state.course.coursePlan.courseStructure === "unit") {
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

  completeTopicLesson = () => {
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    if (this.state.course.coursePlan.courseStructure === "unit") {
      toComplete[this.props.selected[0]].subunits[this.props.selected[1]] = true;
    } else {
      toComplete[this.props.selected[0]] = true;
    }
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
            this.props.handleControlMessage(true,
              this.state.course.coursePlan.courseStructue === "unit" ?
              this.props.language.lessonCompletedText :
              this.props.language.topicCompletedText
            );
          }
        }
      );
    });
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

  openMedia = (media, mediaType, mediaTitle) => {
    this.setState({
      media: media,
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
        {this.props.selected[3] !== -1 && <CourseMenu
          course={this.state.course}
          progress={this.state.progress}
          expandedNodes={this.props.expandedNodes}
          navigateTo={this.props.navigateTo.bind(this)}
          selected={this.props.selected}
          showCourseStories={this.showCourseStories.bind(this)}
          language={this.props.language}
        />}
        {
          this.props.selected[3] === -1 ?
            <CoursePresentation
              course={this.state.course}
              progress={this.state.progress}
              selected={this.props.selected}
              navigateTo={this.props.navigateTo.bind(this)}
              unsubscribe={this.props.unsubscribe.bind(this)}
              language={this.props.language}
            />
          :
            <CourseContent
              course={this.state.course}
              showComponent={this.props.showComponent.bind(this)}
              handleControlMessage={this.props.handleControlMessage.bind(this)}
              handlePrevious={this.props.handlePrevious.bind(this)}
              handleNext={this.props.handleNext.bind(this)}
              navigateTo={this.props.navigateTo.bind(this)}
              completeActivity={this.completeActivity.bind(this)}
              completeTopicLesson={this.completeTopicLesson.bind(this)}
              openMedia={this.openMedia.bind(this)}
              leaveComment={this.leaveComment.bind(this)}
              selected={this.props.selected}
              toComplete={this.state.toComplete}
              toResolve={this.state.toResolve}
              language={this.props.language}
            />
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
                {`${this.props.language.seliMediaPlayer} | ${this.state.media ? this.state.media.attributes.title : ""}`}
              </Typography>
              <p className="app-tooltip">{this.props.language.pressEscCourse}</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="media-dialog-content">
            <MediaPlayer
              media={this.state.media}
              language={this.props.language}
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
          disableBackdropClick={true}
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
