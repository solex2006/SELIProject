import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div className="image-item-container">
            <Card raised className="course-item-audio-card">
              <div className="course-item-audio-card-details">
                <CardContent className="course-item-audio-card-content">
                  <Typography component="h5" variant="h5">
                    Audio file
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Title
                  </Typography>
                </CardContent>
                <CardMedia
                  className="course-item-audio-card-image"
                  image="/audio-gra.svg"
                  title="Live from space album cover"
                />
              </div>
              <div className="course-item-audio-card-controls">
                <IconButton className="course-item-audio-card-icon-button" aria-label="play/pause">
                  <PlayArrowIcon className="course-item-audio-card-icon"/>
                </IconButton>
                <IconButton className="course-item-audio-card-icon-button" aria-label="add to favorites">
                  <FolderSpecialIcon className="course-item-audio-card-icon"/>
                </IconButton>
                <Button className="course-item-video-card-media-button" size="small" color="primary">
                  Learn More
                </Button>
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
      </div>
      );
    }
  }
