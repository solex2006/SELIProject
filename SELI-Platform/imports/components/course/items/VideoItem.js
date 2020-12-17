import React from 'react';
import Typography from '@material-ui/core/Typography';
import ItemFeedback from '../../accessibility/ItemFeedback';
import VideoPreview from './VideoPreview';
import TextAlternatives from '../../accessibility/alternative/TextAlternatives';
import MediaPlayer from '../../tools/MediaPlayer';

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signalShow:'',
      signalShowAudioDescription:'',
      autoplay:false,
      key:'78',
      editorState:'',
      shortlongDescription:'',
      openMedia: false,
      allowSeizures: [true],
      index: 0
    }
  }

  componentDidMount = () => {
    if (this.props.item.attributes.accessibility.dataField && this.props.item.attributes.accessibility.dataField.seizures === "yes") {
      this.setState({
        allowSeizures: [false],
      })
    }
  }

  handleAllowSeizures = (value) => {
    this.setState({
      allowSeizures: [value]
    })
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

  handleOpenMedia = (index) => {
    if (!this.props.fromProgram) {
      const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
      cancellFullScreen.call(document);
      this.setState({
        openMedia: true,
        index: index,
      });
    }
  }
  
  handleCloseMedia = () => {
    this.setState({
      openMedia: false,
      index: 0
    });
  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div className="course-item-video-card">
            <figure
              id={`video_box_${this.props.item.id}`}
              className="media-item-container"
            >
              { this.props.item.attributes.video && (
                <VideoPreview
                  id={this.props.item.id}
                  file={this.props.item.attributes.video}
                  dataField={this.props.item.attributes.accessibility.dataField ? this.props.item.attributes.accessibility.dataField : undefined}
                  allowSeizures={this.state.allowSeizures}
                  handleOpenMedia={this.handleOpenMedia.bind(this)}
                />
              )}
              <div>
                <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                  {this.props.item.attributes.source === 'upload' ? this.props.language.videoFile : this.props.language.externalVideo}
                </Typography>
                <Typography tabIndex="0" className="course-item-card-title" gutterBottom variant="h5" component="h3">
                  {this.props.item.attributes.title}
                </Typography>
              </div>
            </figure>
            {
              this.props.item.attributes.accessibility.dataField!=undefined ?
                this.textAlternatives()
              :
                undefined
            }
            {
              this.props.item.attributes.accessibility.dataField!=undefined && this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null ?
                <div className="AudioPlayer">
                  <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {`${this.props.language.audioDescription}:`}
                  </Typography>
                  <audio 
                    ref="audioDescription" 
                    className="audio-file-preview"
                    src={this.props.item.attributes.accessibility.dataField.fileAudioDescription[0].link} 
                    controls
                  />
                </div>
              :      
                undefined
            }
          </div>
        </div>
        {this.props.fromProgram && 
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
        {
          !this.props.fromProgram &&
          <MediaPlayer
            index={this.state.index}
            openMedia={this.state.openMedia}
            mediaItems={[this.props.item]}
            allowSeizures={this.state.allowSeizures}
            handleAllowSeizures={this.handleAllowSeizures.bind(this)}
            handleCloseMedia={this.handleCloseMedia.bind(this)}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
