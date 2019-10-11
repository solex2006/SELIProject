import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="storytelling-media-preview-container">
        <audio controls className="audio-file-preview" controlsList="nodownload">
          <source src={this.props.file.link}></source>
        </audio>
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
