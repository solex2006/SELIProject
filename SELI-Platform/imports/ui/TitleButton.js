import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import Button from '@material-ui/core/Button';

import {checkUserType} from '../../lib/userSesions';

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import turkish from '../../lib/translation/turkish';

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
      console.log(this.props.history);
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
