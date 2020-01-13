import React from 'react';
import Button from '@material-ui/core/Button';
import AudioPlayer from 'react-h5-audio-player';

export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: ''

    }
  }
  
  componentDidMount(){
    this.setState({
      isPlaying: this.props.file.link,
    })
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.file.link !== this.props.file.link) {
      this.setState({
        isPlaying: this.props.file.link,
      })
      this.refs.audio.pause();
      this.refs.audio.play();
      this.refs.audio.load();
    }
  }


  render() {
/*     let audio= <AudioPlayer
    src={this.props.file.link}
    /> */

    return(
      <div className="storytelling-media-preview-container">
        {/* {audio} */}
        <audio controls className="storytelling-media-audio" ref="audio">
          <source src={this.state.isPlaying}></source>
        </audio>
      </div>
      );
    }
  }
