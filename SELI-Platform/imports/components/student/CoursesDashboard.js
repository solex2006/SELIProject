import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import { StudentLog } from '../../../lib/StudentLogCollection';

import CourseCard from '../../components/course/CourseCard';

import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CoursesDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    Tracker.autorun(() => {
      let courses = Courses.find({published: true}).fetch();
        if(this.props.searchText){
          this.setState({
            courses: this.props.searchText,
          });
          this.props.cleanSearchText();
        } else {
          this.setState({
            courses: courses,
          });
        }
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
    StudentLog.insert({ 
      "UserId": Meteor.userId(), 
      "CourseId" : this.state.courseToUnsubscribe, 
      "Datetime": new Date(), 
      "Action": "Course Unsubscribe" 
    });
    this.props.unsubscribe(this.state.courseToUnsubscribe);
    this.handleClose();
  }

  componentDidUpdate(prevProps){
    if (prevProps.searchText !== this.props.searchText ){
      if(this.props.searchText){
        this.setState({
          courses: this.props.searchText,
        });
        this.props.cleanSearchText();
      }
    }
  }

  render() {
    return(
      <div className="courses-dashboard-container">
        <div className="courses-dashboard-title-container">
          <p className="courses-dashboard-title-text">{this.props.language.seliCourses}</p>
        </div>
        <Divider/>
        {
          !this.state.courses.length ?
            <div className="empty-dashboard-title-row">
              <p className="empty-dashboard-text">{this.props.language.weAreCreatingCourses}</p>
              <InfoIcon className="empty-dashboard-icon"/>
            </div>
          :
          <div className="courses-dashboard-result">
            {
              this.state.courses.map((course, index) => {
                return(
                  <CourseCard
                    course={course}
                    index={index}
                    language={this.props.language}
                    disabled={this.props.disabled}
                    subscribe={this.props.subscribe.bind(this)}
                    unsubscribe={this.unsubscribe.bind(this)}
                    //key={Math.random()}
                  />
                )
              })
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
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              {this.props.language.confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
