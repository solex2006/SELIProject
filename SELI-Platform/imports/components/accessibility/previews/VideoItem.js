import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.externalLink, '_blank');
    win.focus();
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.video &&
          <ReactPlayer controls={true} className="course-creator-item-video-card-preview-player" url={this.props.item.video.link}/>
        }
      </div>
      );
    }
  }
