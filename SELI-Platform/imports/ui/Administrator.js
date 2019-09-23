import React from 'react';

import { Meteor } from 'meteor/meteor';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import TutorRequestList from '../components/administrator/TutorRequestList';
import ControlSnackbar from '../components/tools/ControlSnackbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export default class Tutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'home',
    }
  }

  componentDidMount(){
    /*Meteor.logout();
    Meteor.loginWithPassword({username: "mateom"}, "1234", (error) => {
      if (error) {
        console.log(error);
      }
      else {
        this.setState({
          user: Meteor.user(),
        })
      }
    })*/
    /*Meteor.call("SendVerificationEmail", Meteor.userId(), (error, response) =>  {
      console.log(response);
    });*/
  }

  logOut = () => {
    Meteor.logout();
    this.setState({
      user: undefined,
    });
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
              {
                this.state.user !== undefined ?
                  <AppBar
                    setLanguage={this.setLanguage.bind(this)}
                    user={this.state.user}
                    logOut={this.logOut.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'home' ?
                  <Presentation/>
                :
                undefined
              }
              {
                this.state.component === 'requests' ?
                  <TutorRequestList
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
        </MuiThemeProvider>
      </div>
      );
    }
  }
