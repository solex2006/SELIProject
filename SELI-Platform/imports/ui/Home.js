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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClose = () => {
    this.setState({ chekingSesion: false });
  };

  componentDidMount() {
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
                location.replace("/tutor");
              }
              else if (this.state.user.profile.type === 'student') {
                location.replace("/student");
              }
              else if (this.state.user.profile.type === 'administrator') {
                location.replace("/administrator");
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

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <Presentacion/>
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
    )
  }
}
