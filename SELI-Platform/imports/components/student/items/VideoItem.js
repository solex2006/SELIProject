import React from 'react';
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
import VideoPreview from '../../storytelling/VideoPreview';
import CheckboxLabels from './CheckBox'



export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signalShow:'',
      autoplay:false,
      key:'78'

    }
  }

  openExternalLink() {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  componentDidMount() {

    console.log("En video", this.props.item.attributes)

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


  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <Card className="course-item-video-card2">
            <CardActionArea className="course-item-video-card-media-action-area">
             
                  <VideoPreview file={this.props.item.attributes.video} className="videoPreview"/>
     
                {
                    this.state.signalShow==='signalShow'?
                    <div className="videosignal">
                      <video width="160" height="120"  key={this.state.key} autoPlay={this.state.autoplay} controls id="video-preview-information" className="file-preview-information" ref="video">
                        <source src={this.props.item.attributes.videosignal.link}></source>
                      </video>
                    </div>
                      :
                      undefined  
                  }
                <div className="checkboxstyle">
                  <CheckboxLabels
                    language={this.props.language}
                    checkbox={this.checkbox}
                  />
                </div>
              
            
              <CardContent className="course-item-video-card-media-content">
                <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                  {` ${this.props.item.attributes.title}`}
                </Typography>
                <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {this.props.item.attributes.source === 'upload' ? this.props.language.videoFile : this.props.language.externalVideo }
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
            </CardActionArea>
            <CardActions className="course-item-video-card-media-actions-container">
              {
                this.props.item.attributes.externalLink !== '' ?
                  <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                    {this.props.language.learnMore}
                  </Button>
                :
                  undefined
              }

              <Tooltip title={this.props.language.addToMyLibrary}>
                <Fab className="course-item-video-card-media-fab" size="small">
                  <FolderSpecialIcon/>
                </Fab>
              </Tooltip>
            </CardActions>
          </Card>
        </div>
      </div>
      );
    }
  }
