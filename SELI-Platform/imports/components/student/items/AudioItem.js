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

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="content-box">
        .
        <div className="image-content-item">
          <div className="image-item-container">
            <Card raised className="course-item-audio-card">
              <div className="course-item-audio-card-details">
                <CardContent className="course-item-audio-card-content">
                  <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                    {` ${this.props.item.attributes.title}`}
                  </Typography>
                  <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {this.props.item.attributes.source === 'upload' ? `Audio file` : `Recorded file`}
                  </Typography>
                </CardContent>
                <CardMedia
                  className="course-item-audio-card-image"
                  image="/audio-gra.svg"
                  title="Live from space album cover"
                />
              </div>
              <div className="course-item-audio-card-controls">
              
                <Tooltip title="Open media player">
                <div style={{padding: "5px"}}>
                  <AudioPlayer autoPlay={false} src={this.props.item.attributes.audio.link} />
                </div>
               
                  {/*<IconButton onClick={() => this.props.openMediaPlayer(this.props.item.attributes.audio, this.props.item.type, this.props.item.attributes.title)} className="course-item-audio-card-icon-button" aria-label="play/pause">
                    <PlayArrowIcon className="course-item-audio-card-icon"/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add to library">
                  <IconButton className="course-item-audio-card-icon-button" aria-label="add to favorites">
                    <FolderSpecialIcon className="course-item-audio-card-icon"/>
                  </IconButton>*/}
                </Tooltip> 
                {
                  this.props.item.attributes.externalLink !== '' ?
                    <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                      Learn More
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
