import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AudioPlayer from 'react-h5-audio-player';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import ReactPlayer from 'react-player';
import VideoPreview from '../../storytelling/VideoPreview';
import CheckboxLabels from './CheckBox'

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signalShow:'',
      autoplay:false,
      key:78
    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  checkbox=(event)=>{
    if(event===true){
      this.setState({
        signalShow:"signalShow"
      })
    }else if(event===false){
      this.setState({
        signalShow:'nosignalShow',
        autoplay:false
      })
    }
  }

  playAudio=(event)=>{
     if(this.state.signalShow==='signalShow'){
      this.setState({
        autoplay:true,
        key:Math.random()
      })
     }
  }

  render() {

    return(
      <div className="content-box">
        <div className="image-content-item">
          <div className="image-item-container2">
            <Card raised className="course-item-audio-card">
              <div className="course-item-audio-card-details">
                <CardContent className="course-item-audio-card-content">
                  <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                    {` ${this.props.item.attributes.title}`}
                  </Typography>
                  <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {this.props.item.attributes.source === 'upload' ? this.props.language.audioFile : this.props.language.recordedAudio}
                  </Typography>
                </CardContent>
                <CardMedia
                  className="course-item-audio-card-image"
                  image="/audio-gra.svg"
                  title="Live from space album cover"
                />
              </div>
              <br/>
              <div  className="checkboxstyle">
              <CheckboxLabels
                language={this.props.language}
                checkbox={this.checkbox}
              />
              {
                this.state.signalShow==='signalShow'?
                <div className="AudioSignal">
                  <video  width="320" height="240" key={this.state.key} autoPlay={this.state.autoplay} controls id="video-preview-information" className="file-preview-information" ref="video">
                    <source src={this.props.item.attributes.videosignal.link}></source>
                  </video>
                </div>        
                  :
                  undefined  
              }
              </div>
              <div className="course-item-audio-card-controls"> 
              <AudioPlayer 
                volume 
                src={this.props.item.attributes.audio.link}
                onPlay={this.playAudio}
                
              />
                <Tooltip title={this.props.language.addToMyLibrary}>
                  <IconButton className="course-item-audio-card-icon-button" aria-label="add to favorites">
                    <FolderSpecialIcon className="course-item-audio-card-icon"/>
                  </IconButton>
                </Tooltip> 
                {
                  this.props.item.attributes.externalLink !== '' ?
                    <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                      {this.props.language.externalLink}
                    </Button>
                  :
                    undefined
                }
              </div>
            </Card>
            {
              this.props.item.attributes.hasDescription ?
                <div
                  className="course-item-audio-card-description"
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                >
                </div>
              :
                undefined
            }
          </div>
        </div>
      </div>
      );
    }
  }
