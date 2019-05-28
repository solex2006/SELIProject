import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ContentPicker from '../components/ContentPicker';
import TextAndImageForm from '../components/TextAndImageForm';
import VideoForm from '../components/VideoForm';
import H5PForm from '../components/H5PForm';
import AnimationForm from '../components/AnimationForm';
import FileForm from '../components/FileForm';
import EmbedForm from '../components/EmbedForm';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Picker',
    }
  }

  showContentForm(content){
    this.setState({
      content: content,
    })
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <MuiThemeProvider theme={theme}>
            {
              this.state.content === 'Picker' ?
                <div>
                  <div className="form-subtitle">Content type</div>
                  <ContentPicker
                    showContentForm={this.showContentForm.bind(this)}
                  />
                </div>
              :
              undefined
            }
            {
              this.state.content === 'TextAndImage' ?
                <TextAndImageForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.content === 'Video' ?
                <VideoForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.content === 'H5P' ?
                <H5PForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.content === 'Animation' ?
                <AnimationForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.content === 'Files' ?
                <FileForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.content === 'Embed' ?
                <EmbedForm
                  showForm={this.props.showForm.bind(this)}
                />
              :
              undefined
            }
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
