import React, { Component } from 'react';
import { Session } from 'meteor/session';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import ControlSnackbar from '../components/tools/ControlSnackbar';
import CommentDialog from '../components/student/comments/CommentDialog';
import StorytellingPlayer from '../components/storytelling/StorytellingPlayer';
import StorytellingPlayerTime from '../components/storytelling/StorytellingPlayerTime';

import AppBar from '../components/navigation/AppBar';

import { Activities } from '../../lib/ActivitiesCollection';
import { Comments } from '../../lib/CommentsCollection';

import english from '../../lib/translation/english';
import spanish from '../../lib/translation/spanish';
import portuguese from '../../lib/translation/portuguese';
import polish from '../../lib/translation/polish';
import turkish from '../../lib/translation/turkish';

export default class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: undefined,
    }
  }

  componentDidMount() {
    Session.set({language: Session.get('language') ? Session.get('language') : english});
    this.setState({
      language: Session.get('language') ? Session.get('language') : english,
    });
    this.setState({
      loadingStory: true,
    }, () => {
      let _id = this.props.location.hash.substr(1);
      Tracker.autorun(() => {
        let story = Activities.find({_id: _id}).fetch();
        if (story.length) {
          story = story[0];
          let type = story.activity.type;
          story = story.activity;
          story.nodes = story.data;
          story.data = null;
          this.setState({
            story,
            type,
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
    Meteor.call("ChangeLanguague", Meteor.userId(), option, (error, response) =>  {});
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          {  
            this.state.language && Session.get('language') ?  
              <React.Fragment>      
                <div id="outer-container">
                  <main id="page-wrap">
                    <AppBar
                      history={this.props.history}
                      language={this.state.language}
                      setLanguage={this.setLanguage.bind(this)}
                      user={undefined}
                      fromAnotherSource
                    />
                    {
                      !this.state.story || !this.state.type ? undefined :
                        this.state.type === "storytelling" ?
                          <StorytellingPlayer
                            story={this.state.story}
                            comments={true}
                            link={true}
                            showCommentDialog={this.showCommentDialog.bind(this)}
                            language={this.state.language}
                          />
                        :
                          <StorytellingPlayerTime
                            story={this.state.story}
                            comments={true}
                            link={true}
                            showCommentDialog={this.showCommentDialog.bind(this)}
                            language={this.state.language}
                          />
                    }
                  </main>
                </div>
                <CommentDialog
                  open={this.state.openComment}
                  title={this.state.language.leaveCommentStory}
                  handleClose={this.handleCloseComment.bind(this)}
                  sendComment={this.sendComment.bind(this)}
                  handleControlMessage={this.handleControlMessage.bind(this)}
                  language={this.state.language}
                />
                <ControlSnackbar
                  showControlMessage={this.state.showControlMessage}
                  showControlAction={this.state.showControlAction}
                  controlMessage={this.state.controlMessage}
                  controlAction={this.state.controlAction}
                  controlActionMessage={this.state.controlActionMessage}
                  handleControlMessage={this.handleControlMessage.bind(this)}
                />
              </React.Fragment>
            :
              undefined
          }
        </MuiThemeProvider>
      </div>
    )
  }
}
