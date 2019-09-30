import React from 'react';

import { Meteor } from 'meteor/meteor';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import CoursesDashboard from '../components/student/CoursesDashboard';
import SubscribedCourses from '../components/student/SubscribedCourses';
import Course from '../components/student/Course';
import CourseDial from '../components/student/CourseDial';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import LoadingSnackbar from '../components/tools/LoadingSnackbar';
import AccountManagement from '../components/user/AccountManagement';
import Loading from '../components/tools/Loading';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {checkUserType} from '../../lib/userSesions';

import { Courses } from '../../lib/CourseCollection';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
      activeCourse: undefined,
      selected: [-1, -1],
    }
  }

  componentDidMount(){
    this.setState({
      chekingSesion: true,
    }, () => {
      checkUserType(Meteor.userId(), 'student');
      Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
        this.setState({
          user: response[0],
          chekingSesion: false,
        });
      });
    });
  }

  logOut = () => {
    Meteor.logout((error) => {
      location.replace('/')
    })
  }

  setLanguage = () => {

  }

  showComponent = (component) => {
    this.setState({
      component: component,
    });
  }

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'subscribed') {
        action = () => this.showComponent('subscribed');
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

  editCourse = (course) => {
    this.setState({
      courseToEdit: course,
    }, () => {
      this.showComponent('edit');
    });
  }

  handleClose = () => {
    this.setState({ chekingSesion: false });
  };

  subscribe = (courseId) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: 'Joining classroom please wait',
    });
    let course = Courses.find({_id: courseId}).fetch();
    this.handleSubscription(course[0]);
  }

  unsubscribe = (courseId) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: 'Leaving classroom please wait',
    })
    let course = Courses.find({_id: courseId}).fetch();
    this.handleUnsubscription(course[0]);
  }

  handleSubscription = (course) => {
    course.classroom.push(Meteor.userId());
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        var toComplete = this.toComplete(course);
        var toResolve = this.toResolve(course);
        user.profile.courses.push({
          courseId: course._id,
          progress: 0,
          toComplete: toComplete,
          toResolve: toResolve,
        });
        Meteor.users.update(
          { _id: Meteor.userId() },
          { $set: {
            'profile.courses': user.profile.courses,
          }}
          , () => {
            this.setState({
              subscribed: true,
              showLoadingMessage: false,
            } , () => {
              this.handleControlMessage(true, 'Added to subscribed courses', true, 'subscribed', 'see list', undefined);
            });
          }
        )
      }
    )
  }

  handleUnsubscription = (course) => {
    let studentIndex = course.classroom.findIndex(students => students === Meteor.userId());
    course.classroom.splice(studentIndex, 1);
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === course._id);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.users.update(
          { _id: Meteor.userId() },
          { $set: {
            'profile.courses': user.profile.courses,
          }}
          , () => {
            this.setState({
              unsubscribed: true,
              showLoadingMessage: false,
            }, () => {
              if (this.state.activeCourse !== undefined) {
                this.state.activeCourse.courseId === course._id ? this.closeCourse() : undefined
              }
              this.handleControlMessage(true, 'Course removed from your subscriptions', false, '', '', undefined);
              this.state.component === 'subscribed' ? this.getSubscribedCourses() : undefined
            });
          }
        )
      }
    )
  }

  getSubscribedCourses = () => {}

  handleClickCourse = (course) => {
    this.setState({
      activeCourse: course,
      showLoadingMessage: true,
      selected: [-1, -1],
      loadingMessage: 'Starting course, please wait',
    }, () => {
      let course = Courses.find({_id: this.state.activeCourse.information._id}).fetch();
      course = course[0];
      let published = course.published;
      if (published) {
        this.setState({
          showLoadingMessage: false,
        }, () => {
          this.showComponent('course');
        })
      }
      else {
        this.getSubscribedCourses();
      }
    });
  }

  toComplete = (course) => {
    let toComplete = [];
    if (course.organization.subunit) {
      course.program.map(unit => {
        unit.lessons.map(subunit => {
          toComplete.push(false);
        })
      })
    }
    else {
      course.program.map(unit => {
        toComplete.push(false);
      })
    }
    return toComplete;
  }

  toResolve = (course) => {
    let toResolve = [];
    if (course.organization.subunit) {
      course.program.map(unit => {
        unit.lessons.map(subunit => {
          subunit.items.map(content => {
            if (content.type === 'quiz' || content.type === 'activity') {
              toResolve.push({resolved: false, _id: content.id});
            }
          })
        })
      })
    }
    else {
      course.program.map(unit => {
        unit.items.map(content => {
          if (content.type === 'quiz' || content.type === 'activity') {
            toResolve.push({resolved: false, _id: content.id});
          }
        })
      })
    }
    return toResolve;
  }

  closeCourse = () => {
    this.setState({
      activeCourse: undefined,
      selected: [-1, -1],
    })
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div id="outer-container">
            {
              this.state.user !== undefined ?
                <MainMenu
                  user={this.state.user}
                  showComponent={this.showComponent.bind(this)}
                />
              :
              undefined
            }
            <main id="page-wrap">
              <AppBar
                setLanguage={this.setLanguage.bind(this)}
                user={this.state.user}
                logOut={this.logOut.bind(this)}
                showComponent={this.showComponent.bind(this)}
              />
              {
                this.state.component === 'home' ?
                  <Presentation/>
                :
                undefined
              }
              {
                this.state.component === 'course' ?
                  <Course
                    user={this.state.user}
                    reRender={this.forceUpdate.bind(this)}
                    selected={this.state.selected}
                    activeCourse={this.state.activeCourse}
                    showComponent={this.showComponent.bind(this)}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'courses' ?
                  <CoursesDashboard
                    user={this.state.user}
                    subscribe={this.subscribe.bind(this)}
                    unsubscribe={this.unsubscribe.bind(this)}
                    disabled={this.state.showLoadingMessage}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'subscribed' ?
                  <SubscribedCourses
                    user={this.state.user}
                    unsubscribe={this.unsubscribe.bind(this)}
                    disabled={this.state.showLoadingMessage}
                    getSubscribedCourses={subscribedCourses => this.getSubscribedCourses = subscribedCourses}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                    handleClickCourse={this.handleClickCourse.bind(this)}
                    showComponent={this.showComponent.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'account' ?
                  <AccountManagement
                    user={this.state.user}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                    showErrorFunction={showError => this.showError = showError}
                    reRender={this.forceUpdate.bind(this)}
                  />
                :
                undefined
              }
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
          <LoadingSnackbar
            showLoadingMessage={this.state.showLoadingMessage}
            loadingMessage={this.state.loadingMessage}
          />
          <Dialog
            open={this.state.chekingSesion}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-confirmation"
            aria-describedby="alert-dialog-confirmation"
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle className="success-dialog-title" id="alert-dialog-title">Checking sesion please wait</DialogTitle>
            <DialogContent className="success-dialog-content">
              <Loading message='Loading user...'/>
            </DialogContent>
          </Dialog>
          {
            this.state.activeCourse !== undefined && this.state.component !== 'course' ?
              <CourseDial
                showComponent={this.showComponent.bind(this)}
                closeCourse={this.closeCourse.bind(this)}
              />
            :
            undefined
          }
        </MuiThemeProvider>
      </div>
      );
    }
  }
