import React from 'react';
/* import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; */
import Typography from '@material-ui/core/Typography';
import ItemFeedback from '../../accessibility/ItemFeedback';
import VideoPreview from './VideoPreview';
import AudioPlayer from 'react-h5-audio-player';
//import CheckboxLabels from './CheckBox';
import TextAlternatives from '../../accessibility/alternative/TextAlternatives';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signalShow:'',
      signalShowAudioDescription:'',
      autoplay:false,
      key:'78',
      editorState:'',
      shortlongDescription:''
    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  textAlternatives = () => {
    return(
      <TextAlternatives
        item={this.props.item}
        language={this.props.language}
      ></TextAlternatives>
    )
  }

  openMediaChild = () => {
    if (this.props.openMedia) {
      const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
      cancellFullScreen.call(document);
      this.props.openMedia(this.props.item);
    }
  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div className="course-item-video-card">
            <div className={this.props.fromTemplate ? "course-item-video-card-media-action-area-template" : "course-item-video-card-media-action-area"}>
              { this.props.item.attributes.video && (
                <VideoPreview 
                  file={this.props.item.attributes.video}
                  dataField={this.props.item.attributes.accessibility.dataField ? this.props.item.attributes.accessibility.dataField : undefined}
                  openMediaChild={this.openMediaChild.bind(this)}
                />
              )}
              <div className="course-item-video-card-media-content">
                <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                  {this.props.item.attributes.source === 'upload' ? this.props.language.videoFile : this.props.language.externalVideo}
                </Typography>
                <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                  {` ${this.props.item.attributes.title}`}
                </Typography>
              </div>
            </div>
            {
              this.props.item.attributes.accessibility.dataField!=undefined && this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null ?
                <div className="AudioPlayer">
                  <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {`${this.props.language.audioDescription}:`}
                  </Typography>
                  <AudioPlayer volume src={this.props.item.attributes.accessibility.dataField.fileAudioDescription[0].link}/>
                </div>
              :      
                undefined
            }
            {
              this.props.item.attributes.accessibility.dataField!=undefined ?
                this.textAlternatives()
              :
                undefined
            }
            {/* {
              this.props.item.attributes.externalLink !== '' ?
                <CardActions className="course-item-video-card-media-actions-container">
                  <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                    {this.props.language.learnMore}
                  </Button>
                </CardActions>
              :
                undefined
            } */}
          </div>
        </div>
        {this.props.fromProgram && 
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
