import React, { Component } from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import Loading from '../components/tools/Loading';
import CourseMenu from '../components/student/CourseMenu';
import CoursePresentation from '../components/student/CoursePresentation';
import CourseContent from '../components/student/CourseContent';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { Courses } from '../../lib/CourseCollection';

export default class CoursePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: undefined,
      selected: [-1, -1],
    }
  }

  componentDidMount() {
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
    else if (option === 'Turkish (TR)') {
      Session.set({language: turkish});
      language = turkish;
    }
    this.setState({
      language: language,
    });
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
          <div id="outer-container">
            <main id="page-wrap">
              <div className="no-app-bar-container">
                {
                  this.state.course === undefined ?
                    undefined
                  :
                  <CoursePresentation
                    course={this.state.course}
                    navigateTo={this.navigateTo.bind(this)}
                    selected={this.state.selected}
                  />
                }
              </div>
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
            <DialogTitle className="success-dialog-title" id="alert-dialog-title">Getting course information</DialogTitle>
            <DialogContent className="success-dialog-content">
              <Loading message='Loading course...'/>
            </DialogContent>
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}
