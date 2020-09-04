import React, { Component } from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import Loading from '../components/tools/Loading';
import CoursePresentation from '../components/student/CoursePresentation';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import AppBar from '../components/navigation/AppBar';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Courses } from '../../lib/CourseCollection';
import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from '../../lib/translation/polish';
import turkish from '../../lib/translation/turkish';

export default class CoursePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: undefined,
      selected: [-1, -1],
    }
  }

  componentDidMount() {
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });
    this.setState({
      loadingCourse: true,
    }, () => {
      let _id = this.props.location.hash.substr(1);
      Tracker.autorun(() => {
        let course = Courses.find({_id: _id}).fetch();
        course.length ?
        this.setState({
          course: course[0],
          loadingCourse: false,
        })
        :
        this.setState({
          course: undefined,
        });
      });
      Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
        if (response) this.setInitVariables(response);
      });
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
    }, () => {
      this.setLanguage(this.state.user.profile.configuration.language);
      if (response) this.calculateProgress();
    });
  }

  calculateProgress = () => {
    let userCourses = this.state.user.profile.courses;
    let courseIndex = userCourses.findIndex(course => course.courseId === this.state.course._id);
    let courseInfo = {};
    if (courseIndex > -1) {
      courseInfo = userCourses[courseIndex];
      this.setState({
        progress: userCourses[courseIndex].progress,
      })
    } else {
      courseInfo.courseId = this.state.course._id;
      this.setState({progress: "noProgress"})
    }
    this.setState({
      courseInfo: courseInfo,
    })
  }

  goToUser = (action) => {
    console.log("en el goto user-----",this.state.user,this.state.courseInfo, this.state.progress)
    this.props.history.push({
      pathname: "/user", 
      user: this.state.user, 
      course: this.state.courseInfo,
      progress: this.state.progress,
      action: action
    });
  }

  navigateTo(level, to) {
    this.setState({
      selected: to,
      coursePresentation: false,
      courseContent: true,
    });
  }

  showPresentation() {
    this.setState({
      coursePresentation: true,
      courseContent: false,
    });
  }

  logOut = () => {
    Meteor.logout();
    location.replace('/');
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

  showComponent = (component) => {
    this.setState({
      component: component,
    });
  }

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'savedList') {
        action = () => this.showComponent('saved');
      }
      else if (action === 'preview') {
        action = () => this.showPreview();
      }
      this.setState({
        showControlMessage: show,
        controlMessage: message,
        controlAction: action,
        controlActionMessage: actionMessage,
        showControlAction: showAction,
        course: action === 'preview' ? course : undefined
      });
    }
    else {
      this.setState({
        showControlMessage: show,
      });
    }
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          {  
            this.state.language && Session.get('language') ?  
              <React.Fragment>  
                <div id="outer-container">
                  <main id="page-wrap">
                    <React.Fragment>
                      {
                        this.state.course === undefined || this.state.progress === undefined?
                          undefined
                        :
                          <div>
                            <AppBar
                              history={this.props.history}
                              language={this.state.language}
                              setLanguage={this.setLanguage.bind(this)}
                              user={undefined}
                              fromAnotherSource
                            />
                            <CoursePresentation
                              course={this.state.course}
                              progress={this.state.progress}
                              goToUser={this.goToUser.bind(this)}
                              navigateTo={this.navigateTo.bind(this)}
                              selected={this.state.selected}
                              language={this.state.language}
                            />
                          </div>
                      }
                    </React.Fragment>
                  </main>
                </div>
                <ControlSnackbar
                  showControlMessage={this.state.showControlMessage}
                  showControlAction={this.state.showControlAction}
                  controlMessage={this.state.controlMessage}
                  controlAction={this.state.controlAction}
                  controlActionMessage={this.state.controlActionMessage}
                  handleControlMessage={this.handleControlMessage.bind(this)}
                />
                <Dialog
                  open={this.state.loadingCourse}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-confirmation"
                  aria-describedby="alert-dialog-confirmation"
                  disableBackdropClick={true}
                  disableEscapeKeyDown={true}
                >
                  <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.language.gettingCourseInf}</DialogTitle>
                  <DialogContent className="success-dialog-content">
                    <Loading message='Loading course...'/>
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            :
              undefined
          }
        </MuiThemeProvider>
      </div>
    )
  }
}
