import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';

import CourseSubscription from '../../components/course/CourseSubscription';

import WarningIcon from '@material-ui/icons/Warning';
import SchoolIcon from '@material-ui/icons/School';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class SubscribedCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    this.props.getSubscribedCourses(() => this.getSubscribedCourses());
    this.getSubscribedCourses();
  }

  getSubscribedCourses = () => {
    this.setState({
      courses: [],
      loading: true,
    }, () => {
      let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
      this.buildCourses(user[0].profile.courses);
    })
  }

  buildCourses = (courses) => {
    let ids = [];
    courses.map(course => {
      ids.push(course.courseId);
    });
    Tracker.autorun(() => {
      let coursesInformation = Courses.find(
        { _id: {
          $in: ids
        }}
      ).fetch();
      courses.map(course => {
        coursesInformation.map(information => {
          information._id === course.courseId ?
          course.information = information : undefined
        })
      });
      this.setState({
        courses: courses,
        loading: false,
      });
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  unsubscribe = (courseId) => {
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Unsubscribe course',
      dialogConfirmationContentText: `Are you sure you want to leave this classroom? All your progress on this course will be errased.`,
      courseToUnsubscribe: courseId,
      confirmAction: () => this.confirmUnsubscribe(),
    });
  }

  confirmUnsubscribe = () => {
    this.props.unsubscribe(this.state.courseToUnsubscribe);
    this.handleClose();
    this.getSubscribedCourses();
  }

  handleClickCourse = (_id) => {
    const index = this.state.courses.findIndex(course => course.information._id === _id);
    this.props.handleClickCourse(this.state.courses[index]);
  }

  render() {
    return(
      <div className="subscriptions-dashboard-container">
        <p className="management-title">My subscriptions<SchoolIcon className="management-title-icon"/></p>
        <Divider/>
        {
          this.state.loading ?
            <div className="dashboard-loading-container">
              <Loading message="Loading courses..."/>
            </div>
          :
          <div>
            {
              this.state.courses.length ?
                <div className="subscriptions-dashboard-result">
                  {
                    this.state.courses.map((course, index) => {
                      return (
                        <CourseSubscription
                          course={course.information}
                          progress={course.progress}
                          disabled={this.props.disabled}
                          unsubscribe={this.unsubscribe.bind(this)}
                          handleClickCourse={this.handleClickCourse.bind(this)}
                        />
                      )
                    })
                  }
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">You aren't subscribed to any of our courses yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.props.showComponent('courses')} variant="contained" color="primary" className="empty-dashboard-button">Check out our courses</Button>
              </div>
            }
          </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.dialogConfirmationTitle}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogConfirmationContentText}
            </DialogContentText>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
