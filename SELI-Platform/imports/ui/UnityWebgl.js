import React, { Component } from 'react';
import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import Unity, { UnityContent } from "react-unity-webgl";

export default class UnityWebgl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unityContent: new UnityContent(
        "UnityTest/Build/UnityLoader.js",
        "UnityTest/Build/UnityTest.json",
      ),
    }
  }

  componentDidMount(){
    /*let settings = this.props.location.search;
    settings = settings.split('*');
    let loader = settings[0].substring(1, settings[0].length);
    let build = settings[1];
    let search = settings[2];
    console.log(loader);
    console.log(build);
    this.setState({
      unityContent: new UnityContent(
        build,
        loader,
      ),
    });*/
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <Unity unityContent={this.state.unityContent}/>
        </MuiThemeProvider>
      </div>
    )
  }
}
