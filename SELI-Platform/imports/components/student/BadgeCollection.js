import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CertificatesValidationForm from '../../components/certificates/CertificatesValidationForm';
import AppBar from '../../components/navigation/AppBar';

import theme from '../../style/theme';
import Divider from '@material-ui/core/Divider';
import BadgeView from './BadgeView';
export default class BadgeCollection extends React.Component {
  constructor(props) {
    super(props);
    let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
     Session.set({language: Session.get('language') ? Session.get('language') : english});
    console.log(user);
    this.state = ({ 
        badges : user[0].profile.badge,
         language: Session.get('language') ? Session.get('language') : english,
    });
 
    console.log(this.state.language)

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

  render() {
    return(
      <MuiThemeProvider theme={theme}>{
        this.state.language && Session.get('language') ?
        <React.Fragment>
          <BadgeView/>
          <BadgeView/>
          <div>
            <div className="subscriptions-dashboard-container">
              <p className="management-title">My badges</p>
            </div>
            <Divider/>
            <Divider/>
            <h1>Space</h1>
            <h1>Space</h1>
            <h1>Space</h1>
            <div className="badge-container">
              {this.state.badges.map(badge => (   
                badge.name ?        
                    <BadgeView
                      name={badge.name}
                      description={badge.description}
                      image={badge.image}
                    />
                    :
                    undefined
                ))}
            </div>

          </div>
        </React.Fragment>
        :
        console.log('error theme badge collection')
      }
        
        </MuiThemeProvider>
     

    )
  }
}
