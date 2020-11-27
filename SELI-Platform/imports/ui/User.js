import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Link } from 'react-router-dom';
import { Courses } from '../../lib/CourseCollection';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import PublishedCoursesList from '../components/tutor/PublishedCoursesList';
import SavedCoursesList from '../components/tutor/SavedCoursesList';
import CreateCourse from '../components/tutor/CreateCourse';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import LoadingSnackbar from '../components/tools/LoadingSnackbar';
import AccountManagement from '../components/user/AccountManagement';
import Help from '../components/user/Help';
import Loading from '../components/tools/Loading';
import StorytellingTool from '../components/storytelling/StorytellingTool';
import StorytellingToolTime from '../components/storytelling/StorytellingToolTime';
import Stories from '../components/storytelling/Stories';
import CoursesDashboard from '../components/student/CoursesDashboard';
import SubscribedCourses from '../components/student/SubscribedCourses';
import Course from '../components/student/Course';
import MyCertificates from '../components/student/MyCertificates';
import DashboardComponent from '../components/dashboard/dashboard';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import WarningIcon from '@material-ui/icons/Warning';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { checkUserType } from '../../lib/userSesions';
import { StudentLog } from '../../lib/StudentLogCollection';

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from '../../lib/translation/polish';
import turkish from '../../lib/translation/turkish';
import BadgeVerification from './BadgeVerification';
import BadgeCollection from '../components/student/BadgeCollection';

export default class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
      nextComponent: '',
      savedCourse: false,
      savedCourseWindow: false,
      accountType: '',
      selected: [-1, -1, -1, -1],
      expandedNodes: [],
      chekingSesion: true,
    }
  }

  componentDidMount(){
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });
    if (this.props.history.location.user) {
      this.setInitVariables(this.props.history.location.user);
    } else {
      Meteor.call("GetUserById", (error, response) =>  {
        if (response) this.setInitVariables(response);
        else this.props.history.push('/');
      });
    }
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
    }, () => {
      checkUserType(response, this.state.user.profile.type, this.props.history);
      this.setLanguage(this.state.user.profile.configuration.language);
      if (this.props.history.location.action) {
        if (this.props.history.location.action === "subscribe") {
          this.subscribe(this.props.history.location.course.courseId, "fromPreview");
        } else if (this.props.history.location.action === "unsubscribe" || this.props.history.location.action === "enter") {
          var courseToSend = Courses.findOne({_id: this.props.history.location.course.courseId});
          this.handleClickCourse(this.props.history.location.course.courseId, courseToSend);
          if (this.props.history.location.action === "unsubscribe") {
            this.openUnsubscribe(this.props.history.location.course.courseId);
          } else {
            this.navigateTo([0, 0, 0, 0]);
          }
        }
      }
    });
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

    //console.log('showComponent---------------------------------------------------', component, this.state)
   
    

    if (!(component === "create" && this.state.component === "create")){
      //console.log("paso 2")
      if (this.state.component === "create" && !this.state.savedCourse){
        if (component !== "create") {
          this.setState({
            savedCourseWindow: true,
            nextComponent: component,
          });
        }
      } else {
        this.setState({
          component: component,
          savedCourse: false,
        });
      }
    }

    if(this.state.component==='edit' && this.state.savedCourse===false ){
     // console.log("paso3****************",component,this.state.component,this.state.savedCourse, this.state )
      this.setState({
        savedCourseWindow: true,
        component: 'edit',
        nextComponent: component
      }); 
    } 
    /* if(component==='published' && this.state.savedCourse===false ){
      console.log("paso 1")
      this.state.savedCourse=true
      this.state.component='published'
      this.setState({
        component: 'edit',//component: component,
        savedCourse: true,
        
      });
    } */

    /* if(this.state.component==='edit' && this.state.savedCourse===true ){
      console.log("createsave****************",component,this.state.component,this.state.savedCourse, this.state )
      this.setState({
        component: component,
        savedCourse: false,
      }); 
    }
 */


      
  }

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'savedList') {
        action = () => this.showComponent('saved');
      }
      else if (action === 'preview') {
        action = () => this.openDialogWindow("preview");
      }
      if (action === 'stories') {
        action = () => this.showComponent('stories');
      }
      if (action === 'subscribed') {
        action = () => this.showComponent('subscribed');
      }
      if (action === 'dashboard'){
        action = () => this.showComponent('dashboard');
        
      }
      this.setState({
        showControlMessage: show,
        controlMessage: message,
        controlAction: action,
        controlActionMessage: actionMessage,
        showControlAction: showAction,
        course: course,
      });
    }
    else {
      this.setState({
        showControlMessage: show,
      });
    }
  }

  subscribe = (courseId, fromPreview) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: this.state.language.joiningClassWait,
    });
    let course = Courses.find({_id: courseId}).fetch();
    this.handleSubscription(course[0], fromPreview);
  }

  unsubscribeFromCourse = (courseId, id) => {
    this.setState({
      showLoadingMessage: true,
      loadingMessage: this.state.language.leavingClassWait,
    })
    let course = Courses.find({_id: courseId}).fetch();
    this.handleUnsubscription(course[0], id);
  }
  
  handleUnsubscription = (course, id) => {
    let removeUserId;
    if (id) {
      removeUserId = id;
    } else {
      removeUserId = Meteor.userId();
    }
    let studentIndex = course.classroom.findIndex(students => students === removeUserId);
    course.classroom.splice(studentIndex, 1);
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: removeUserId});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === course._id);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.users.update(
          { _id: removeUserId },
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
              this.handleControlMessage(true, id ? this.state.language.studendRemoved : this.state.language.courseRemovedSubs, false, '', '', undefined);
              this.state.component === 'subscribed' ? this.getSubscribedCourses() : undefined
              let user = Meteor.users.find({_id: removeUserId}).fetch();
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

  handleSubscription = (course, fromPreview) => {
    course.classroom.push(Meteor.userId());
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        var {toComplete, toResolve} = this.toDos(course);
        var courseToInsert = {};
        courseToInsert.courseId = course._id;
        courseToInsert.progress = "0.00";
        courseToInsert.toComplete = toComplete;
        courseToInsert.toResolve = toResolve;
        user.profile.courses.push(courseToInsert);
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
              }, () => {
                if (fromPreview) {
                  this.handleClickCourse(courseToInsert.courseId, course);
                }
              });
            });
          }
        )
      }
    )
  }

  handleClickCourse = (courseId, courseInformation) => {
    var user = this.state.user;
    var courseToSend = {};
    var courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === courseId);
    var {toComplete, toResolve} = this.toDos(courseInformation, user.profile.courses[courseIndex]);
    user.profile.courses[courseIndex].toComplete = toComplete;
    user.profile.courses[courseIndex].toResolve = toResolve;
    courseToSend.courseId = courseId;
    courseToSend.toComplete = toComplete;
    courseToSend.toResolve = toResolve;
    courseToSend.progress = user.profile.courses[courseIndex].progress;
    courseToSend.information = courseInformation;
    Meteor.users.update(
      {_id: this.state.user._id},
      {$set: {"profile.courses": user.profile.courses}}
    )
    this.setState({
      activeCourse: courseToSend,
      showLoadingMessage: true,
      selected: [-1, -1, -1, -1],
      loadingMessage: this.state.language.startingCourse,
    }, () => {
      if (courseInformation.published) {
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

  toDos = (course, toDosStudent) => {
    let toResolve = [];
    let toComplete = [];
    let parentIndex = 0;
    course.program.map((unitTopic, index) => {
      unitTopic.items.map(item => {
        toResolve = this.toResolveCommons(item, toDosStudent, toResolve);
      })
      if (course.coursePlan.courseStructure === "unit") {
        toComplete.push({subunits: []});
        parentIndex = index;
        unitTopic.lessons.map((lesson, childIndex) => {
          lesson.items.map(item => {
            toResolve = this.toResolveCommons(item, toDosStudent, toResolve);
          })
          if (course.coursePlan.courseTemplate !== "without")
          lesson.activities.map(activity => {
            activity.items.map(item => {
              toResolve = this.toResolveCommons(item, toDosStudent, toResolve);
            })
          })
          if (toDosStudent && toDosStudent.toComplete[parentIndex] && toDosStudent.toComplete[parentIndex].subunits[childIndex]) {
            toComplete[parentIndex].subunits.push(toDosStudent.toComplete[parentIndex].subunits[childIndex])
          } else {
            toComplete[parentIndex].subunits.push(false);
          }
        })
      } else {
        if (course.coursePlan.courseTemplate !== "without")
        unitTopic.activities.map(activity => {
          activity.items.map(item => {
            toResolve = this.toResolveCommons(item, toDosStudent, toResolve);
          })
        })
        if (toDosStudent && toDosStudent.toComplete[index]) {
          toComplete.push(toDosStudent.toComplete[index])
        } else {
          toComplete.push(false);
        }
      }
    });
    return {
      toComplete: toComplete,
      toResolve: toResolve
    };
  }

  toResolveCommons = (content, toDosStudent, toResolve) => {
    let finalToResolve = toResolve;
    let userCourseIndex = -1;
    if (content.type === 'quiz' || content.type === 'activity') {
      if (toDosStudent) {
        userCourseIndex = toDosStudent.toResolve.findIndex(item => item._id === content.id);
      }
      if (userCourseIndex >= 0) {
        finalToResolve.push(toDosStudent.toResolve[userCourseIndex]);
      } else {
        if (content.type === "activity" && content.attributes.type === "forum" && content.attributes.activityId){
          finalToResolve.push({resolved: false, _id: content.id, activityId: content.attributes.activityId});
        } else {
          finalToResolve.push({resolved: false, _id: content.id});
        }
      }
    }
    return finalToResolve;
  }

  openDialogWindow = (value) => {
    this.setState({
      actionType: value,
    }, () => {this.showPreview()})
  }

  showPreview = () => {
    this.setState({
      openDialog: true,
    })
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
      if (story.activity.type === "storytelling") {
        this.showComponent('storytellingEdit');
      } else {
        this.showComponent('storytellingEdit-time');
      }
    });
  }

  handleClose = () => {
    this.setState({ 
      chekingSesion: false,
      openDialog: false, 
    });
  };

  handleCloseSave = () => {
    console.log("222222222222222222222",this.state)
    this.setState({ 
      savedCourseWindow: false,
      savedCourse: false,
      component: this.state.nextComponent, 
    });
  }

  savedCourseState = () => {
    this.setState({
      savedCourse: true, 
    });
  }

  saveCourse = () => {
    console.log("click to save777777777777777",this.refs.CreateCourse.saveCourse())
    this.refs.CreateCourse.saveCourse();
    this.setState({ 
      savedCourseWindow: false,
    });
  }

  searchValue=(value, texttoSearch)=>{
    console.log("SearchValuefunction", value)
    this.setState({
      searchText: value,
      texttoSearch:texttoSearch,
      component: 'courses',
    })
  }

  cleanSearchText = () => {
    this.setState({
      searchText: undefined,
    })
  }

  closeCourse = () => {
    this.setState({
      activeCourse: undefined,
      selected: [-1, -1, -1, -1],
    })
  }

  openUnsubscribe = (courseId) => {
    this.setState({
      courseToUnsubscribe: courseId,
    }, () => {this.openDialogWindow("unsubscribe")});
  }

  confirmUnsubscribe = () => {
    StudentLog.insert({ 
      "UserId": Meteor.userId(), 
      "CourseId" : this.state.courseToUnsubscribe, 
      "Datetime": new Date(), 
      "Action": "Course Unsubscribe" 
    });
    if (this.state.component === 'course') this.showComponent('subscribed');
    this.unsubscribeFromCourse(this.state.courseToUnsubscribe);
    this.handleClose();
  }

  navigateTo = (selected) => {
    this.setState({
      selected: selected,
      coursePresentation: false,
      courseContent: true,
    });
  }

  handleNext = (template, structure, taskLength, unitTopicLength, lessonLength) => {
    let selected = this.state.selected;
    if (selected[3] === 0) {
      if (structure === 'unit' && lessonLength > 0) {selected[3] = 1}
      else {
        if (template !== 'without' && taskLength > 0) selected[3] = 2
        else if (selected[0] < unitTopicLength - 1) selected = [selected[0] + 1, 0, 0, 0]
      }
    } else if (selected[3] === 1) {
      if (selected[1] < lessonLength - 1) {selected[1] = selected[1] + 1}
      else {
        if (selected[0] < unitTopicLength - 1) selected = [selected[0] + 1, 0, 0, 0]
      }
    } else if (selected[3] === 2) {
      if (selected[2] < taskLength - 1) {selected[2] = selected[2] + 1}
      else {
        if (selected[0] < unitTopicLength - 1) selected = [selected[0] + 1, 0, 0, 0]
      }
    } 
    this.navigateTo(selected)
  }

  handlePrevious = (template, structure, previousTaskLength, unitTopicLength, previousLessonLength) => {
    let selected = this.state.selected;
    if (selected[3] === 0) {
      if (selected[0] > 0) {
        if (structure === 'unit' && previousLessonLength > 0) {selected = [selected[0] - 1, selected[1] = previousLessonLength - 1, 0, 1]}
        else {
          if (template !== 'without' && previousTaskLength > 0) selected = [selected[0] - 1, 0, selected[2] = previousTaskLength - 1, 2]
          else if (unitTopicLength > 0) selected = [selected[0] - 1, 0, 0, 0]
        }
      }
    } else if (selected[3] === 1) {
      if (selected[1] > 0) {selected[1] = selected[1] - 1}
      else {
        if (unitTopicLength > 0) selected = [selected[0], 0, 0, 0]
      }
    } else if (selected[3] === 2) {
      if (selected[2] > 0) {selected[2] = selected[2] - 1}
      else {
        if (unitTopicLength > 0) selected = [selected[0], 0, 0, 0]
      }
    }
    this.navigateTo(selected)
  }
  disableDialog=()=>{
    console.log("desabilita el dialogo**************************")
    /* this.state.savedCourseWindow=false
    this.state.chekingSesion=false
    this.state.openDialog=false */
    this.refs.CreateCourse.saveCourse();
     this.setState({ 
     savedCourseWindow: false,
     // chekingSesion: false,
      //openDialog: false, 
    }); 

    this.showComponent('published')
 

    
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          {
            this.state.language && Session.get('language') ?
              <React.Fragment>
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
                      this.state.component === 'published' ?
                        <PublishedCoursesList
                          user={this.state.user}
                          selected={this.state.selected}
                          language={this.state.language}
                          expandedNodes={this.state.expandedNodes}
                          unsubscribe={this.unsubscribeFromCourse.bind(this)}
                          showComponent={this.showComponent.bind(this)}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          handlePrevious={this.handlePrevious.bind(this)}
                          handleNext={this.handleNext.bind(this)}
                          navigateTo={this.navigateTo.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'saved' ?
                        <SavedCoursesList
                          user={this.state.user}
                          language={this.state.language}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          showComponent={this.showComponent.bind(this)}
                          editCourse={this.editCourse.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'create' || this.state.component === 'edit' ?
                        <CreateCourse
                        disableDialog={this.disableDialog.bind(this)}
                          ref="CreateCourse"
                          savedCourseState={this.savedCourseState.bind(this)}
                          language={this.state.language}
                          user={this.state.user}
                          courseToEdit={this.state.component === 'edit' ? this.state.courseToEdit : undefined}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          showComponent={this.showComponent.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'course' ?
                        <Course
                          user={this.state.user}
                          language={this.state.language}
                          selected={this.state.selected}
                          activeCourse={this.state.activeCourse}
                          expandedNodes={this.state.expandedNodes}
                          unsubscribe={this.openUnsubscribe.bind(this)}
                          showComponent={this.showComponent.bind(this)}
                          reRender={this.forceUpdate.bind(this)}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          handlePrevious={this.handlePrevious.bind(this)}
                          handleNext={this.handleNext.bind(this)}
                          navigateTo={this.navigateTo.bind(this)}
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
                          unsubscribe={this.openUnsubscribe.bind(this)}
                          disabled={this.state.showLoadingMessage}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                          searchText={this.state.searchText ? this.state.searchText : undefined}
                          texttoSearch={this.state.texttoSearch ? this.state.texttoSearch : undefined}
                          cleanSearchText={this.cleanSearchText.bind(this)}
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
                          unsubscribe={this.openUnsubscribe.bind(this)}
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
                      this.state.component === 'storytelling' || this.state.component === 'storytellingEdit' ?
                        <StorytellingTool
                          user={this.state.user}
                          language={this.state.language}
                          storyToEdit={this.state.component === 'storytellingEdit' ? this.state.storyToEdit : undefined}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'storytelling-time' || this.state.component === 'storytellingEdit-time' ?
                        <StorytellingToolTime
                          user={this.state.user}
                          language={this.state.language}
                          storyToEdit={this.state.component === 'storytellingEdit-time' ? this.state.storyToEdit : undefined}
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
                      this.state.component === 'dashboard' ?
                        <DashboardComponent/>
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
                      this.state.component === 'badgeVerification' ?
                      <BadgeVerification
                          language={this.state.language}
                          user={this.state.user}
                          history={this.props.history}
                      />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'badgeCollection' ?
                        <BadgeCollection
                          language={this.state.language}
                          user={this.state.user}
                          history={this.props.history}  
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'account' ?
                        <AccountManagement
                          language={this.state.language}
                          user={this.state.user}
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
                          language={this.state.language}
                          user={this.state.user}
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
                  time={this.state.controlMessage==="Quiz successfully done" ? 800: 8000}
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
                <Dialog
                  open={this.state.openDialog}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-confirmation"
                  aria-describedby="alert-dialog-confirmation"
                >
                  <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                    {this.state.actionType === "preview" ?  this.state.language.coursePreview : this.state.language.unsubscribeCourse}
                  </DialogTitle>
                  <DialogContent className="success-dialog-content">
                    <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                      {this.state.actionType === "preview" ? this.state.language.willBeRedirected : this.state.language.sureLeaveClassroom}
                    </DialogContentText>
                    <WarningIcon tabIndex="-1" className="warning-dialog-icon"/>  
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                      {this.state.language.cancel}
                    </Button>
                    {
                      this.state.actionType === "preview" ?
                        <Link className="button-link"
                          target="_blank"
                          to={{
                            pathname: "/coursePreview",
                            hash: this.state.course,
                            state: { fromDashboard: true },
                          }}
                        >
                          <Button color="primary" autoFocus onClick={() => this.handleClose()}>
                            {this.state.language.yes}
                          </Button>
                        </Link>
                      :
                        <Button color="primary" autoFocus onClick={() => this.confirmUnsubscribe()}>
                          {this.state.language.yes}
                        </Button>
                    }
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={this.state.savedCourseWindow}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-confirmation"
                  aria-describedby="alert-dialog-confirmation"
                >
                  <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.language.saveCourse}</DialogTitle>
                  <DialogContent className="success-dialog-content">
                    <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                      {this.state.language.saveCourseLost}
                    </DialogContentText>
                    <WarningIcon className="warning-dialog-icon"/> 
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.handleCloseSave()} color="primary" autoFocus>
                      {this.state.language.no}
                    </Button>
                    <Button variant="outlined" onClick={() => this.saveCourse()} color="primary" autoFocus>
                      {this.state.language.yes}
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            :
            undefined
          }
        </MuiThemeProvider>
      </div>
      );
    }
  }
