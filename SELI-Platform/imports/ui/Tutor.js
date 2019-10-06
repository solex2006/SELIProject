import React from 'react';

import { Meteor } from 'meteor/meteor';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import PublishedCoursesList from '../components/tutor/PublishedCoursesList';
import SavedCoursesList from '../components/tutor/SavedCoursesList';
import CreateCourse from '../components/tutor/CreateCourse';
import EditCourse from '../components/tutor/EditCourse';
import ControlSnackbar from '../components/tools/ControlSnackbar';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {checkUserType} from '../../lib/userSesions';

export default class Tutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
    }
  }

  componentDidMount(){
    this.setState({
      chekingSesion: true,
    }, () => {
      checkUserType(Meteor.userId(), 'tutor');
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
        course: course,
      });
    }
    else {
      this.setState({
        showControlMessage: show,
      });
    }
  }

  showPreview = () => {
    const url = `/coursePreview#${this.state.course}`;
    window.open(url, "_blank");
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
                this.state.component === 'published' ?
                  <PublishedCoursesList
                    user={this.state.user}
                    showComponent={this.showComponent.bind(this)}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'saved' ?
                  <SavedCoursesList
                    user={this.state.user}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                    showComponent={this.showComponent.bind(this)}
                    editCourse={this.editCourse.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'create' ?
                  <CreateCourse
                    user={this.state.user}
                    handleControlMessage={this.handleControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'edit' ?
                  <EditCourse
                    user={this.state.user}
                    courseToEdit={this.state.courseToEdit}
                    handleControlMessage={this.handleControlMessage.bind(this)}
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
        </MuiThemeProvider>
      </div>
      );
    }
  }
