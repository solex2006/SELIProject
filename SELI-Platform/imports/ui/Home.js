import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import Presentacion from '../components/navigation/Presentation';

import Loading from '../components/tools/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {checkUserType} from '../../lib/userSesions';

import english from '../../lib/translation/english';
import portuguese from '../../lib/translation/portuguese';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: english,
    }
  }

  handleClose = () => {
    this.setState({ chekingSesion: false });
  };

  componentDidMount() {
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });
    Meteor.call('CheckForAdmin', function(error, response) {
      if (error) {
        console.log('CheckForAdmin: Error: ', error);
      }
      if (response) {
        console.log('CheckForAdmin: Response: ', response);
      }
    });
    if (Meteor.userId()) {
      this.setState({
        chekingSesion: true,
      }, () => {
        Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  {
          if (response.length) {
            this.setState({
              user: response[0],
              chekingSesion: false,
            }, () => {
              if (this.state.user.profile.type === 'tutor') {
                this.props.history.push('/tutor');
              }
              else if (this.state.user.profile.type === 'student') {
                this.props.history.push('/student');
              }
              else if (this.state.user.profile.type === 'administrator') {
                this.props.history.push('/administrator');
              }
            });
          }
          else {
            this.setState({
              chekingSesion: false,
            })
          }
        });
      });
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
    this.setState({
      language: language,
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          {
            this.state.language && Session.get('language') ?
              <React.Fragment>
                <AppBar
                  history={this.props.history}
                  language={this.state.language}
                  setLanguage={this.setLanguage.bind(this)}
                />
                <Presentacion
                  language={this.state.language}
                  history={this.props.history}
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
      )
    }
  }
