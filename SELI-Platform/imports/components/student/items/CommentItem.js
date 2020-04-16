import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Checkbox from '@material-ui/core/Checkbox';
import { Meteor } from 'meteor/meteor';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Divider } from 'material-ui';

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getAvatarColor = (code) => {
    if (code >= 65 && code <= 67) {
      return "#f44336"
    }
    if (code >= 68 && code <= 70) {
      return "#e91e63"
    }
    if (code >= 71 && code <= 73) {
      return "#673ab7"
    }
    if (code >= 74 && code <= 76) {
      return "#3f51b5"
    }
    if (code >= 78 && code <= 80) {
      return "#2196f3"
    }
    if (code >= 81 && code <= 83) {
      return "#009688"
    }
    if (code >= 84 && code <= 86) {
      return "#009688"
    }
    if (code >= 87 && code <= 89) {
      return "#4caf50"
    }
    if (code >= 90 && code <= 92) {
      return "#ffc107"
    }
    else {
      return "#ff9800";
    }
  }

  componentDidMount(){
    let profile = Meteor.users.findOne({_id: this.props.comment.userId});
    this.setState({
      color: this.getAvatarColor(profile.username.toUpperCase().charCodeAt(0)),
    })
    this.setState({
      profile: profile,
    })
  }

  render() {
    return(
      <div>
        {
          this.state.profile ?
            <div className="student-comment">
              <Avatar
                style={{backgroundColor: this.state.color}}
                className="student-profile-avatar-comment"
              >
                {this.state.profile.username.charAt(0).toUpperCase()}
              </Avatar>
              <Paper
                className="student-profile-information-container-comment"
                elevation={4}
              >
                <p className="student-profile-information-text-secondary-comment">
                  {`${this.props.language.date}: ${this.props.comment.date.getHours()}:${
                    this.props.comment.date.getMinutes() < 10 ? 
                    `0${this.props.comment.date.getMinutes()}` : 
                    this.props.comment.date.getMinutes()} - ${this.props.comment.date.toLocaleDateString('en-US')}`}
                </p>
                <p className="student-profile-information-text-secondary-comment">
                  {`${this.props.language.name}: ${this.state.profile.profile.fullname}`}
                </p>
                <div className="activity-item-container-instruction"
                  dangerouslySetInnerHTML={{__html: this.props.comment.label}}>
                </div>
              </Paper>
              {
                this.props.comment.userId === Meteor.userId() ?
                  <Tooltip onClick={() => this.props.deleteComment(this.props.comment)} title={this.props.language.delete}>
                    <Fab className="course-item-comment-card-media-fab" size="small">
                      <DeleteIcon color="primary"/>
                    </Fab>
                  </Tooltip>
                :
                  undefined
              }
            </div>
          :
            undefined
        }  
      </div>
    );
  }
}
