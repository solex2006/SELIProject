import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import Presentation from '../components/navigation/Presentation';

import Loading from '../components/tools/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from '../../lib/translation/polish';
import turkish from '../../lib/translation/turkish';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: english,
      chekingSesion: true,
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
    Meteor.call("GetUser", (error, response) =>  {
      if (response) {
        this.setState({
          user: response,
          chekingSesion: false,
        }, () => {
          if (this.state.user.profile.type === 'tutor' || this.state.user.profile.type === 'student') {
            this.props.history.push({pathname: "/user", user: response});
          }
          else if (this.state.user.profile.type === 'administrator') {
            this.props.history.push('/administrator');
          }
        });
      } else {
        this.setState({
          chekingSesion: false,
        }, () => {
          if (this.props.history.location.action) {
            if (this.props.history.location.action === "in") {
              this.refs.AppBar.handleClickOpen("in", this.props.history.location.course);
            } else {
              this.refs.AppBar.handleClickOpen("up", this.props.history.location.course);
            }
          }
        })
      }
    });
    Meteor.call('CheckForAdmin', function(error, response) {
      if (error) {
        console.log('CheckForAdmin: Error: ', error);
      }
      if (response) {
        console.log('CheckForAdmin: Response: ', response);
      }
    });
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
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          {
            this.state.language && Session.get('language') ?
              <React.Fragment>
                <AppBar
                  ref="AppBar"
                  history={this.props.history}
                  language={this.state.language}
                  setLanguage={this.setLanguage.bind(this)}
                />
                <Presentation
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
