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
   // this.cursos = React.createRef();
  }

  componentDidMount() {
    this.props.getSubscribedCourses(() => this.getSubscribedCourses());
    this.getSubscribedCourses();
    //this.cursos.current.focus();
  }

  componentWillReceiveProps() {
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
      dialogConfirmationTitle: this.props.language.unsubscribeCourse,
      dialogConfirmationContentText: this.props.language.sureLeaveClassroom,
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
      <div  tabIndex="-1" className="subscriptions-dashboard-container">
        <p  tabIndex="-1" className="management-title">{this.props.language.mySubscriptions}<SchoolIcon className="management-title-icon"/></p>
        <Divider/>
        {
          this.state.loading ?
            <div tabIndex="-1" className="dashboard-loading-container">
              <Loading tabIndex="-1" message={this.props.language.loadingCourses}/>
            </div>
          :
          <div tabIndex="-1">
            {
              this.state.courses.length ?
                <div tabIndex="-1" className="subscriptions-dashboard-result">
                  {
                    this.state.courses.map((course, index) => {
                      return (
                        <CourseSubscription
                          tabIndex="-1"
                          course={course.information}
                          progress={course.progress}
                          disabled={this.props.disabled}
                          unsubscribe={this.unsubscribe.bind(this)}
                          handleClickCourse={this.handleClickCourse.bind(this)}
                          language={this.props.language}
                        />
                      )
                    })
                  }
                </div>
              :
              <div  tabIndex="-1" className="empty-dashboard">
                <div  tabIndex="-1" className="empty-dashboard-row">
                  <p  tabIndex="-1" className="empty-dashboard-text">{this.props.language.youAreNotSubscribed}</p>
                  <InfoIcon tabIndex="-1" className="empty-dashboard-icon"/>
                </div>
                <Button tabIndex="-1" onClick={() => this.props.showComponent('courses')} variant="contained" color="primary" className="empty-dashboard-button">{this.props.language.checkOutCourses}</Button>
              </div>
            }
          </div>
        }
        <Dialog
          tabIndex="-1"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle  tabIndex="-1" className="success-dialog-title" id="alert-dialog-title">{this.state.dialogConfirmationTitle}</DialogTitle>
          <DialogContent tabIndex="-1" className="success-dialog-content">
            <DialogContentText tabIndex="-1" className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogConfirmationContentText}
            </DialogContentText>
            <WarningIcon tabIndex="-1" className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button tabIndex="0" onClick={() => this.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            <Button tabIndex="0" onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              {this.props.language.confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
