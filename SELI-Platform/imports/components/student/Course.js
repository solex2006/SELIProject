import React, { Component } from 'react';

import Loading from '../tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import { Activities } from '../../../lib/ActivitiesCollection';

import CourseMenu from './CourseMenu';
import CoursePresentation from './CoursePresentation';
import CourseContent from './CourseContent';
import MediaPlayer from './MediaPlayer';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    }
  }

  componentDidMount() {
    this.resumeNavigation();
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

  calculateProgress = (toComplete, toResolve) => {
    let total = toComplete.length + toResolve.length;
    let unitPercentage  = parseFloat(100/total);
    let progress = 0;
    toComplete.map(completed => completed ? progress += unitPercentage : undefined);
    toResolve.map(activity => activity.resolved ? progress += unitPercentage : undefined);
    progress = progress.toFixed(2);
    if (progress === 99.99) {
      progress = 100;
    }
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
        "CompleteSection", Meteor.userId(),
        this.state.toComplete,
        this.state.course._id,
        progress,
        (error, response) =>  {

      });
    });
    index + 1 < toComplete.length ?
    this.navigateTo('unit', [(index + 1), undefined]) : undefined
  }

  completeActivity = (id, activity, label) => {
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    for (var i = 0; i < toResolve.length; i++) {
      if (toResolve[i]._id === id) {
        toResolve[i].resolved = true;
        break;
      }
    }
    let progress = this.calculateProgress(toComplete, toResolve);
    this.setState({
      toResolve: toResolve,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteActivity", Meteor.userId(),
        this.state.toResolve,
        this.state.course._id,
        progress,
        (error, response) =>  {
          if (!error) {
            activity.activityId = id;
            activity.date = new Date();
            activity.user = Meteor.userId();
            activity.course = this.state.course._id;
            Activities.insert({
              activity
            }, () => {
              this.props.handleControlMessage(true, `${label} successfully done`);
              this.props.reRender();
            });
          }
      });
    });
  }

  handleClose = () => {
    this.setState({ openMedia: false });
  }

  openMediaPlayer = (media, mediaType, mediaTitle) => {
    this.setState({
      media: media,
      mediaType: mediaType,
      mediaTitle: mediaTitle,
      openMedia: true,
    })
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
        />
        {
          this.state.coursePresentation ?
            <CoursePresentation
              course={this.state.course}
              navigateTo={this.navigateTo.bind(this)}
              selected={this.state.selected}
            />
          :
          undefined
        }
        {
          this.state.courseContent ?
            <CourseContent
              course={this.state.course}
              showComponent={this.props.showComponent.bind(this)}
              handleControlMessage={this.props.handleControlMessage.bind(this)}
              completeActivity={this.completeActivity.bind(this)}
              navigateTo={this.navigateTo.bind(this)}
              completeUnit={this.completeUnit.bind(this)}
              openMediaPlayer={this.openMediaPlayer.bind(this)}
              selected={this.state.selected}
              toComplete={this.state.toComplete}
              toResolve={this.state.toResolve}
            />
          :
          undefined
        }
        <Dialog
          open={this.state.openMedia}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
          className="media-dialog"
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                SELI Media player
              </Typography>
              <p className="app-tooltip">Press Esc to return to course content</p>
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
      </div>
    )
  }
}
