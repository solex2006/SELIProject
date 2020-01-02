import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import PublishedCoursesList from '../components/tutor/PublishedCoursesList';
import SavedCoursesList from '../components/tutor/SavedCoursesList';
import CreateCourse from '../components/tutor/CreateCourse';
import EditCourse from '../components/tutor/EditCourse';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import AccountManagement from '../components/user/AccountManagement';
import Help from '../components/user/Help';
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

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import turkish from '../../lib/translation/turkish';

export default class Tutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
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
      checkUserType(Meteor.userId(), 'tutor', this.props.history);
      Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
        let language = {};
        if (response[0].profile.configuration.language === 'us') {
          language = english;
        }
        else if (response[0].profile.configuration.language === 'pt') {
          language = portuguese;
        } 
        else if (response[0].profile.configuration.language === 'es') {
          language = spanish;
        }
        else if (response[0].profile.configuration.language === 'tr') {
          language = turkish;
        }
        this.setState({
          language: language,
          user: response[0],
          chekingSesion: false,
        }, () => {
          this.setLanguage(this.state.user.profile.configuration.language);
        });
      });
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
                    />
                    {
                      this.state.component === 'home' ?
                        <Presentation
                          language={this.state.language}
                          history={this.props.history}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'published' ?
                        <PublishedCoursesList
                          user={this.state.user}
                          language={this.state.language}
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
                          language={this.state.language}
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
                          language={this.state.language}
                          user={this.state.user}
                          handleControlMessage={this.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      this.state.component === 'edit' ?
                        <EditCourse
                          language={this.state.language}
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
              </React.Fragment>
            :
            undefined
          }
        </MuiThemeProvider>
      </div>
      );
    }
  }
