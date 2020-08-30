import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import AudioPlayer from 'react-h5-audio-player';

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.externalLink, '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="content-box">
        <Card raised className="course-item-audio-card">
          <div className="course-item-audio-card-details">
            <CardContent className="course-item-audio-card-content">
              <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                {` ${this.props.item.title}`}
              </Typography>
              <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                {this.props.item.source === 'upload' ? this.props.language.audioFile : this.props.language.recordedAudio}
              </Typography>
            </CardContent>
            <CardMedia
              className="course-item-audio-card-image"
              image="/audio-gra.svg"
              title={this.props.item.title}
            />
          </div>
          <div className="audio-file-preview">
            <AudioPlayer volume src={this.props.item.audio.link}/>
          </div>
        </Card>
      </div>
      );
    }
  }
