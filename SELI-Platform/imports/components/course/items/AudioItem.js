import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import ItemFeedback from '../../accessibility/ItemFeedback';
import Link from '@material-ui/core/Link';

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
        <div className="image-content-item">
          <div className="image-item-container">
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
                  title={this.props.item.attributes.title}
                />
              </div>
              <br/>
              <div className="course-item-audio-card-controls">
                <audio controls className="storytelling-media-audio">
                  {
                    this.props.item.attributes.audio===undefined?
                    undefined
                    :
                    <source src={this.props.item.attributes.audio.link}></source> 
                  }
                </audio>
                <Link 
                  className="course-item-audio-card-icon-button MuiButtonBase-root MuiIconButton-root course-item-audio-card-icon-button" 
                  aria-label="add to favorites">
                  <FolderSpecialIcon className="course-item-audio-card-icon"/>
                </Link>
                {
                  this.props.item.attributes.externalLink !== '' ?
                    <Link 
                      onClick={() => this.openExternalLink()} 
                      className="course-item-video-card-media-button MuiButtonBase-root MuiButton-root MuiButton-text course-item-video-card-media-button MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall" 
                      size="small" 
                      color="primary">
                      {this.props.language.learnMore}
                    </Link>
                  :
                    undefined
                }
              </div>
            </Card>
            {/* {
              this.props.item.attributes.hasDescription ?
                <div
                  className="course-item-audio-card-description"
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                >
                </div>
              :
                undefined
            } */}
          </div>
        </div>
        <ItemFeedback
          accessibility={this.props.item.attributes.accessibility}
          language={this.props.language}
        />
      </div>
      );
    }
  }
