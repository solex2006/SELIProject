import React from 'react';
import MenuItem from './MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import ItemFeedback from '../../accessibility/ItemFeedback';
import DragItem from './DragItem'
import Divider from '@material-ui/core/Divider';
import VideoPreview from '../../storytelling/VideoPreview';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="content-box">
        <div className={!this.props.fromTemplate ? "image-content-item" : "template-general-item"}>
          <Card className={!this.props.fromTemplate ? "course-item-video-card" : "template-video-item"}>
            <Card className="course-item-video-card-media-action-area">
              {
                this.props.item.attributes.source === 'upload' ?
                  <VideoPreview file={this.props.item.attributes.video} fromTemplate={this.props.fromTemplate ? this.props.fromTemplate : undefined}/>
                :
                  <ReactPlayer className="course-creator-item-video-card-preview-player" url={this.props.item.attributes.video.link}/>
              }
              <CardContent className="course-item-video-card-media-content">
                <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                  {` ${this.props.item.attributes.title}`}
                </Typography>
                <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {this.props.item.attributes.source === 'upload' ? this.props.language.videoFile : this.props.language.externalVideo}
                </Typography>
                {
                  this.props.item.attributes.hasDescription ?
                  <div
                    className="course-item-video-card-media-description"
                    dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                  >
                  </div>
                  :
                  undefined
                }
              </CardContent>
            </Card>
            <CardActions className="course-item-video-card-media-actions-container">
              {
                this.props.item.attributes.externalLink !== '' ?
                  <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                    {this.props.language.learnMore}
                  </Button>
                :
                  undefined
              }
            </CardActions>
          </Card>
        </div>
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          />
        </div>
        {
          !this.props.fromTemplate && (
            <React.Fragment>
              <Divider orientation="vertical" />
              <DragItem
                holdanddrag={this.props.language.holdanddrag}
              />
            </React.Fragment>
          )
        }
        <ItemFeedback
          accessibility={this.props.item.attributes.accessibility}
          language={this.props.language}
        />
      </div>
      );
    }
  }
