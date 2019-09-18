import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';

import MenuItem from './MenuItem';

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
                    {this.props.item.attributes.source === 'upload' ? `Audio file` : `Recorded file`}
                  </Typography>
                </CardContent>
                <CardMedia
                  className="course-item-audio-card-image"
                  image="/audio-gra.svg"
                  title={this.props.item.attributes.title}
                />
              </div>
              <div className="course-item-audio-card-controls">
                <IconButton className="course-item-audio-card-icon-button" aria-label="play/pause">
                  <PlayArrowIcon className="course-item-audio-card-icon"/>
                </IconButton>
                <IconButton className="course-item-audio-card-icon-button" aria-label="add to favorites">
                  <FolderSpecialIcon className="course-item-audio-card-icon"/>
                </IconButton>
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
              this.props.item.attributes.description !== "" ?
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
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
