import React from 'react';

export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return(
      <div className="storytelling-media-preview-container">
        <audio 
          ref="storytellingAudio" 
          className="storytelling-media-audio"
          src={this.props.file ? this.props.file.link : ""} 
          controls
        />
      </div>
      );
    }
  }
