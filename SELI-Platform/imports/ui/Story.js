import React, { Component } from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import Loading from '../components/tools/Loading';
import ControlSnackbar from '../components/tools/ControlSnackbar';
import CommentDialog from '../components/student/comments/CommentDialog';


import StorytellingPlayer from '../components/student/storytelling/StorytellingPlayer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Activities } from '../../lib/ActivitiesCollection';
import { Comments } from '../../lib/CommentsCollection';

export default class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: undefined,
    }
  }

  componentDidMount() {
    this.setState({
      loadingStory: true,
    }, () => {
      let _id = this.props.location.hash.substr(1);
      Tracker.autorun(() => {
        let story = Activities.find({_id: _id}).fetch();
        if (story.length) {
          story = story[0];
          story.nodes = story.activity.data;
          this.setState({
            story: story,
            loadingStory: false,
          });
        }
        else {
          this.setState({
            story: undefined,
          });
        }
      });
    });
  }

  handleCloseComment = () => {
    this.setState({ openComment: false });
  }

  showCommentDialog = () => {
    this.setState({
      openComment: true,
    });
  }

  sendComment = (comment) => {
    Comments.insert({
      comment: comment,
      user: Meteor.userId() !== null ? Meteor.userId() : "guest" ,
      story: this.state.story._id,
      show: true,
      date: new Date(),
    }, () => {
      this.handleControlMessage(true, "Comment successfully sent");
    })
  }

  handleControlMessage = (show, message, showAction, action, actionMessage, course) => {
    if (show) {
      if (action === 'subscribed') {
        action = () => this.showComponent('subscribed');
      }
      if (action === 'stories') {
        action = () => this.showComponent('stories');
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

  setLanguage = (option) => {
    let language = this.state.language;
    if (option === 'Portuguese (PT)') {
      Session.set({language: portuguese});
      language = portuguese;
    }
    else if (option === 'English (US)') {
      Session.set({language: english});
      language = english;
    } else if (option === 'Turkish (TR)') {
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
          <div id="outer-container">
            <main id="page-wrap">
              <React.Fragment>
                {
                  this.state.story === undefined ?
                    undefined
                  :
                  <div className="storytelling-link-container">
                    <AppBar position="static" className="course-dialog-app-bar">
                      <Toolbar style={{position: 'relative'}}>
                        <Typography className="course-dialog-title" variant="h6">
                          SELI stories
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <StorytellingPlayer
                      story={this.state.story}
                      comments={true}
                      link={true}
                      showCommentDialog={this.showCommentDialog.bind(this)}
                    />
                  </div>
                }
              </React.Fragment>
            </main>
          </div>
          <CommentDialog
            open={this.state.openComment}
            title="LEAVE YOUR COMMENT ABOUT THIS STORY"
            handleClose={this.handleCloseComment.bind(this)}
            sendComment={this.sendComment.bind(this)}
            handleControlMessage={this.handleControlMessage.bind(this)}
          />
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
    )
  }
}
