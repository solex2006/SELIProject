import React from 'react';

import { Meteor } from 'meteor/meteor';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "1",
    }
  }

  componentDidMount(){
    
  }

  setLanguage = () => {

  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div id="outer-container">
            <MainMenu

            />
            <main id="page-wrap">
              <AppBar
                setLanguage={this.setLanguage.bind(this)}
              />
              <Presentation/>
            </main>
          </div>
        </MuiThemeProvider>
      </div>
      );
    }
  }
