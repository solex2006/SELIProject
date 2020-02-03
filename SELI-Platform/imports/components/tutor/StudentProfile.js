import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Meteor } from 'meteor/meteor';

import Popover from '@material-ui/core/Popover';

import { Courses } from '../../../lib/CourseCollection';

export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getAvatarColor = (code) => {
    if (code >= 65 && code <= 67) {
      return "#f44336"
    }
    if (code >= 68 && code <= 70) {
      return "#e91e63"
    }
    if (code >= 71 && code <= 73) {
      return "#673ab7"
    }
    if (code >= 74 && code <= 76) {
      return "#3f51b5"
    }
    if (code >= 78 && code <= 80) {
      return "#2196f3"
    }
    if (code >= 81 && code <= 83) {
      return "#009688"
    }
    if (code >= 84 && code <= 86) {
      return "#009688"
    }
    if (code >= 87 && code <= 89) {
      return "#4caf50"
    }
    if (code >= 90 && code <= 92) {
      return "#ffc107"
    }
    else {
      return "#ff9800";
    }
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  componentDidMount() {
      this.setState({
        color: this.getAvatarColor(this.props.profile.studentInformation.username.toUpperCase().charCodeAt(0)),
      })
  }

  handleUnsubscription = () => {
    let course = Courses.find({_id: this.props.profile.courseProfile.courseId}).fetch();
    course = course[0];
    let studentIndex = course.classroom.findIndex(students => students === this.props.profile.studentId);
    course.classroom.splice(studentIndex, 1);
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: this.props.profile.studentId});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === this.props.profile.courseProfile.courseId);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.call("UpdateCourses", this.props.profile.studentId, user.profile.courses, (error, response) =>  {
            if (response) {
              this.props.handleControlMessage(true, this.props.language.studendRemoved);
              this.handleClose();
              this.props.reload(this.props.profile.courseProfile.courseId);
            }
        });
      }
    )
  }

  render() {
    return(
      <div className="student-profile-container">
        <Avatar
          style={{backgroundColor: this.state.color}}
          className="student-profile-avatar"
        >
          {this.props.profile.studentInformation.username.charAt(0).toUpperCase()}
        </Avatar>
        <Paper
          className="student-profile-information-container"
          elevation={8}
        >
          <div>
            <p className="student-profile-information-text-primary">
              {this.props.profile.studentInformation.username}
            </p>
            <p className="student-profile-information-text-secondary">
              {`${this.props.language.joinedSeli}: ${this.props.profile.studentInformation.dateJoined}`}
            </p>
            <p className="student-profile-information-text-secondary">
              {`${this.props.language.studentName}: ${this.props.profile.studentInformation.fullname}`}
            </p>
            <p className="student-profile-information-text-secondary">
              {`${this.props.language.progress}: ${this.props.profile.courseProfile.progress}%`}
            </p>
          </div>
          <div className="student-profile-actions-container">
            <Button
              className="student-profile-button"
              color="primary"
              variant="outlined"
            >
              {this.props.language.sendMessage}
            </Button>
            <Button
              className="student-profile-button"
              color="primary"
              variant="outlined"
              onClick={(event) => this.handleClick(event)}
            >
              {this.props.language.cancelSubscription}
            </Button>
            <Popover
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <div className="confirmation-popover-container">
                <p>{this.props.language.cancelSubscriptionStudent}</p>
                <div>
                  <Button
                    className="student-confirmation-button"
                    onClick={() => this.handleUnsubscription()}
                    variant="contained" color="primary"
                  >
                    {this.props.language.yes}
                  </Button>
                  <Button
                    className="student-confirmation-button"
                    onClick={() => this.handleClose()}
                    variant="contained"
                    color="secondary"
                  >
                    {this.props.language.no}
                  </Button>
                </div>
              </div>
            </Popover>
          </div>
        </Paper>
      </div>
    )
  }
}
