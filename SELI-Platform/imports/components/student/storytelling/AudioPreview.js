import React from 'react';
import Button from '@material-ui/core/Button';
import AudioPlayer from 'react-h5-audio-player';

export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ''

    }
  }

  componentDidMount(){
    this.setState({
      link: this.props.file.link
    })
  }

  componentDidUpdate(prevProps, prevState) {
    //only update chart if the data has changed
     if (prevProps.file.link !== this.props.file.link) {
      this.setState({
        link: this.props.file.link
      })
    } 
    
  }
  

  render() {
    let audio= <AudioPlayer
    src={this.props.file.link}
    />

    return(
      <div className="storytelling-media-preview-container">
        {audio}

        <Button
          className="storytelling-media-button"
          variant="outlined"
          color="primary"
          onClick={() => this.props.unPickAudioFile()}
        >
          Record again
        </Button>
      </div>
      );
    }
  }
