import React from 'react';

import Avatar from '@material-ui/core/Avatar';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.setState({
      color: this.getAvatarColor(this.props.comment.user.toUpperCase().charCodeAt(0)),
    })
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

  render() {
    return (
      <div className="comment-container">
        <Avatar style={{backgroundColor: this.state.color}} className="comment-avatar">{this.props.comment.user.charAt(0).toUpperCase()}</Avatar>
        <div className="comment-container-information">
          <p className="comment-text-secondary">{`${this.props.comment.user} comment:`}</p>
          <p className="comment-text-primary">{this.props.comment.comment}</p>
          <p className="comment-text-secondary">{`${this.props.comment.date.toLocaleDateString('en-US')} - ${this.props.comment.date.toLocaleTimeString()}`}</p>
        </div>
      </div>
    );
  }
}
