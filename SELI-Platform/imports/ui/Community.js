import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

// import Loading from '../../components/tools/Loading';
import { Courses } from '../../lib/CourseCollection';
// import { StudentLog } from '../../lib/StudentLogCollection';

// import CourseCard from '../../components/course/CourseCard';

import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from '../../lib/translation/polish';
import turkish from '../../lib/translation/turkish';
export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
  }
  setLanguage = (option) => {
    let language = this.state.language;
    if (option === 'Portuguese (PT)') {
      Session.set({language: portuguese});
      language = portuguese;
    }
    else if (option === 'English (US)') {
      Session.set({language: english});
      language = english;
    } 
    else if (option === 'Spanish (ES)') {
      Session.set({language: spanish});
      language = spanish;
    }
    else if (option === 'Polish (PL)') {
      Session.set({language: polish});
      language = polish;
    }
    else if (option === 'Turkish (TR)') {
      Session.set({language: turkish});
      language = turkish;
    }
    this.setState({
      language: language,
    });
    Meteor.call("ChangeLanguague", Meteor.userId(), option, (error, response) =>  {});
  }
  componentDidMount(){
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });

    if (this.props.history.location.user) {
      this.setInitVariables(this.props.history.location.user);
    } else {
      Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
        this.setInitVariables(response);
      });
    }
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

  setInitVariables = (response) => {
    let language = {};
    if (response.profile.configuration.language === 'us') {
      language = english;
    }
    else if (response.profile.configuration.language === 'pt') {
      language = portuguese;
    } 
    else if (response.profile.configuration.language === 'es') {
      language = spanish;
    }
    else if (response.profile.configuration.language === 'pl') {
      language = polish;
    }
    else if (response.profile.configuration.language === 'tr') {
      language = turkish;
    }
    this.setState({
      language: language,
      user: response,
      chekingSesion: false,
    })
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
          <h1 className="courses-dashboard-title-text">SeliComunnity</h1>
        </div>
        <Divider/>
        {/* {
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
        } */}
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
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
