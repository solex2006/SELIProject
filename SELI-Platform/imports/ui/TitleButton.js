import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

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
import StorytellingTool from '../components/storytelling/StorytellingTool';
import Stories from '../components/storytelling/Stories';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import InfoIcon from '@material-ui/icons/Info';

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
import { Activities } from '../../lib/ActivitiesCollection';

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import turkish from '../../lib/translation/turkish';
import WarningIcon from '@material-ui/icons/Warning';

export default class TitleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.language.badgeVerification,
      button: this.props.language.verifyBadge,
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


  render() {
    return(
      <div className="title-button">
        <h1 className="title-badge-registration" style={{color: getComputedStyle(document.documentElement).getPropertyValue('--' + this.props.color)}}>{this.state.title}</h1>
        <Button onClick={this.props.onClick} className="form-stepper-complete-button" color={this.props.color}>
                {this.state.button}
        </Button>
      </div>
    )}
  }
