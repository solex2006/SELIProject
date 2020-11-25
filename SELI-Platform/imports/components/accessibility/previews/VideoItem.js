import React from 'react';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.video &&
          <video
            ref="a11yVideo"
            id="video-preview-information-a11y" 
            className="course-creator-item-video-card-preview-player"
            src={this.props.item.video.link}
            controls
          />
        }
      </div>
      );
    }
  }
