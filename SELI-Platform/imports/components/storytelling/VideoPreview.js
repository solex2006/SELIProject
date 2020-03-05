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
      autoplay:false,
      captions:'',
    }
  }


  componentDidMount(){
   // console.log("desde VIDEOPREVIEW", this.props.captions)
    if(this.props.captions!=undefined){
      this.setState({
        captions:this.props.captions.fileTranscription[0].link
      })
    }

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
        <video width="640" height="480"  controls id="video-preview-information" className="file-preview-information" ref="video">
          <source src={this.props.file.link}></source>
          {
            this.state.captions!=''?   
            <track src={this.state.captions} kind="subtitles" srcLang="captions" />
            :
            undefined
          }
        </video>
      );
    }
  }
