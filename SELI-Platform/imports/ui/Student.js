import React from 'react';

import { Meteor } from 'meteor/meteor';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import CoursesDashboard from '../components/student/CoursesDashboard';
import SubscribedCourses from '../components/student/SubscribedCourses';
import StorytellingTool from '../components/storytelling/StorytellingTool';
import Stories from '../components/storytelling/Stories';
import Course from '../components/student/Course';
import CertificatesValidationForm from '../components/certificates/CertificatesValidationForm';

import CourseDial from '../components/student/CourseDial';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import LoadingSnackbar from '../components/tools/LoadingSnackbar';
import AccountManagement from '../components/user/AccountManagement';
import Help from '../components/user/Help';
import Loading from '../components/tools/Loading';
import MyCertificates from '../components/student/MyCertificates';

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
import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import turkish from '../../lib/translation/turkish';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
      activeCourse: undefined,
      selected: [-1, -1],
      searchText:[]
    }
  }

  componentDidMount(){
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });
    this.setState({
      chekingSesion: true,
    }, () => {
      checkUserType(Meteor.userId(), 'student', this.props.history);
      Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
        this.setState({
          user: response[0],
          chekingSesion: false,
        }, () => {
          this.setLanguage(this.state.user.profile.configuration.language);
        });
      });
    });

    console.log("compnetsadasd333333333333",this.props.navbar)
  }

  logOut = () => {
    Meteor.logout((error) => {
      this.props.history.push('/');
    })
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
      searchText:[]
    });
  }

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'subscribed') {
        action = () => this.showComponent('subscribed');
      }
      if (action === 'stories') {
        action = () => this.showComponent('stories');
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

  editStory = (story) => {
    this.setState({
      storyToEdit: story,
    }, () => {
      this.showComponent('storytellingEdit');
    });
  }

  handleClose = () => {
    this.setState({ chekingSesion: false });
  };

  subscribe = (courseId) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: this.state.language.joiningClassWait,
    });
    let course = Courses.find({_id: courseId}).fetch();
    this.handleSubscription(course[0]);
  }

  unsubscribe = (courseId) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: this.state.language.leavingClassWait,
    })
    let course = Courses.find({_id: courseId}).fetch();
    this.handleUnsubscription(course[0]);
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
              this.handleControlMessage(true, this.state.language.courseRemovedSubs, false, '', '', undefined);
              this.state.component === 'subscribed' ? this.getSubscribedCourses() : undefined
              let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
              this.setState({
                user: user[0],
              });
            });
          }
        )
      }
    )
  }

  getSubscribedCourses = () => {}

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
              this.handleControlMessage(true, this.state.language.addedToSCourses, true, 'subscribed', this.state.language.seeList, undefined);
              let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
              this.setState({
                user: user[0],
              });
            });
          }
        )
      }
    )
  }

  handleClickCourse = (course) => {
    var user = Meteor.users.findOne({_id: this.state.user._id});
    var courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === course.courseId);
    var toComplete = this.toComplete(course.information, user.profile.courses[courseIndex].toComplete);
    var toResolve = this.toResolve(course.information, user.profile.courses[courseIndex].toResolve);
    user.profile.courses[courseIndex].toComplete = toComplete;
    course.toComplete = toComplete;
    user.profile.courses[courseIndex].toResolve = toResolve;
    course.toResolve = toResolve;
    Meteor.users.update(
      {_id: this.state.user._id},
      {$set: {"profile.courses": user.profile.courses}}
    )
    this.setState({
      activeCourse: course,
      showLoadingMessage: true,
      selected: [-1, -1],
      loadingMessage: this.state.language.startingCourse,
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

  toResolve = (course, toResolveStudent) => {
    let toResolve = [];
    let userCourseIndex = -1;
    if (course.organization.subunit) {
      course.program.map(unit => {
        unit.lessons.map(subunit => {
          subunit.items.map(content => {
            if (content.type === 'quiz' || content.type === 'activity') {
              if (toResolveStudent) {
                userCourseIndex = toResolveStudent.findIndex(item => item._id === content.id);
              }
              if (userCourseIndex >= 0) {
                toResolve.push(toResolveStudent[userCourseIndex])
              } else {
                if (content.type === "activity" && content.attributes.type === "forum" && content.attributes.activityId){
                  toResolve.push({resolved: false, _id: content.id, activityId: content.attributes.activityId});
                } else {
                  toResolve.push({resolved: false, _id: content.id});
                }
              }
            }
          })
        })
      })
    }
    else {
      course.program.map(unit => {
        unit.items.map(content => {
          if (content.type === 'quiz' || content.type === 'activity') {
            if (toResolveStudent) {
              userCourseIndex = toResolveStudent.findIndex(item => item._id === content.id);
            }
            if (userCourseIndex >= 0) {
              toResolve.push(toResolveStudent[userCourseIndex])
            } else {
              if (content.type === "activity" && content.attributes.type === "forum" && content.attributes.activityId){
                toResolve.push({resolved: false, _id: content.id, activityId: content.attributes.activityId});
              } else {
                toResolve.push({resolved: false, _id: content.id});
              }
            }
          }
        })
      })
    }
    return toResolve;
  }

  toComplete = (course, toCompleteStudent) => {
    let toComplete = [];
    if (course.organization.subunit) {
      let parentIndex = 0;
      course.program.map((unit, index) => {
        toComplete.push({subunits: []})
        parentIndex = index;
        unit.lessons.map((subunit, childIndex) => {
          if (toCompleteStudent && toCompleteStudent[parentIndex] && toCompleteStudent[parentIndex].subunits[childIndex]) {
            toComplete[parentIndex].subunits.push(toCompleteStudent[parentIndex].subunits[childIndex])
          } else {
            toComplete[parentIndex].subunits.push(false);
          }
        })
      })
    }
    else {
      course.program.map((unit, index) => {
        if (toCompleteStudent && toCompleteStudent[index]) {
          toComplete.push(toCompleteStudent[index])
        } else {
          toComplete.push(false);
        }
      })
    }
    return toComplete;
  }

  closeCourse = () => {
    this.setState({
      activeCourse: undefined,
      selected: [-1, -1],
    })
  }

  searchValue=(value)=>{
    console.log("Value to search", value)
    this.setState({
      searchText:value,
      component : 'courses'
    })

  }

  render() {
    return(
      <div tabIndex="-1">
        <MuiThemeProvider tabindex="-1" theme={theme}>
          {
            this.state.language && Session.get('language') ?
              <React.Fragment tabIndex="-1">
                <div id="outer-container">
                  {
                    this.state.user !== undefined ?
                      <MainMenu
                        user={this.state.user}
                        language={this.state.language}
                        showComponent={this.showComponent.bind(this)}
                      />
                    :
                    undefined
                  }
                  <main id="page-wrap">
                    <AppBar
                      tabIndex="-1"
                      history={this.props.history}
                      language={this.state.language}
                      setLanguage={this.setLanguage.bind(this)}
                      user={this.state.user}
                      logOut={this.logOut.bind(this)}
                      showComponent={this.showComponent.bind(this)}
                      searchValue={this.searchValue}
                    />
                    {
                      this.state.component === 'home' ?
                        <Presentation
                          language={this.state.language}
                          history={this.props.history}
                          searchValue={this.searchValue}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'course' ?
                        <Course
                          user={this.state.user}
                          language={this.state.language}
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
                          language={this.state.language}
                          subscribe={this.subscribe.bind(this)}
                          unsubscribe={this.unsubscribe.bind(this)}
                          disabled={this.state.showLoadingMessage}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          searchText={this.state.searchText}
                      
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'subscribed' ?
                        <SubscribedCourses
                          tabIndex="-1"
                          user={this.state.user}
                          language={this.state.language}
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
                      this.state.component === 'storytelling' ?
                        <StorytellingTool
                          user={this.state.user}
                          language={this.state.language}
                          storyToEdit={undefined}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'storytellingEdit' ?
                        <StorytellingTool
                          user={this.state.user}
                          language={this.state.language}
                          storyToEdit={this.state.storyToEdit}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'stories' ?
                        <Stories
                          user={this.state.user}
                          language={this.state.language}
                          showComponent={this.showComponent.bind(this)}
                          editStory={this.editStory.bind(this)}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'certificates' ?
                        <MyCertificates
                          user={this.state.user}
                          language={this.state.language}
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
                          language={this.state.language}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          showErrorFunction={showError => this.showError = showError}
                          reRender={this.forceUpdate.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'help' ?
                        <Help
                          user={this.state.user}
                          language={this.state.language}
                          handleControlMessage={this.handleControlMessage.bind(this)}
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
                  <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.language.checkingSession}</DialogTitle>
                  <DialogContent className="success-dialog-content">
                    <Loading message={this.state.language.loadingUser}/>
                  </DialogContent>
                </Dialog>
                {
                  this.state.activeCourse !== undefined && this.state.component !== 'course' ?
                    <CourseDial
                      showComponent={this.showComponent.bind(this)}
                      closeCourse={this.closeCourse.bind(this)}
                      language={this.state.language}
                    />
                  :
                  undefined
                }
              </React.Fragment>
            :
              undefined
          }
        </MuiThemeProvider>
      </div>
      );
    }
  }
