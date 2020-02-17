import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay:false

    }
  }

  componentDidMount(){
    this.setState({
      isPlaying: this.props.file.link,
    })
    if (this.props.autoplay==="autoplay"){
      this.setState({
        autoplay: true
      })
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.file.link !== this.props.file.link) {
      this.setState({
        isPlaying: this.props.file.link,
      })
      this.refs.video.pause();
      this.refs.video.play();
      this.refs.video.load();
    }
  }

  render() {
    return(
        <video  controls id="video-preview-information" className="file-preview-information" ref="video">
          <source src={this.props.file.link}></source>
        </video>
      );
    }
  }
