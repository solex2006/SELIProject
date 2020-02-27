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
import AudioPlayer from 'react-h5-audio-player';


export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signalShow:'',
      signalShowAudioDescription:'',
      autoplay:false,
      key:'78',
    }
  }

  openExternalLink() {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  componentDidMount() {
    console.log("En video", this.props.item.attributes)
  }

  checkbox=(event, name)=>{
    console.log("event and name", event, name)
    if(event===true && name==='signLanguage'){//Videosignal
      this.setState({
        signalShow:"signalShow"
      })
    }
    else if(event===true && name==='audioDescription'){//AudioDescription
      this.setState({
        signalShowAudioDescription:"signalShowAudioDescription"
      })
    }else if(event===false && name==='signLanguage'){
      this.setState({
        signalShow:'nosignalShow',
        autoplay:false
      })
    }
    else if(event===false && name==='audioDescription'){
      this.setState({
        signalShowAudioDescription:'nosignalShowAudioDescription',
        autoplay:false
      })
    }
  }

  render() {
 //   console.log("ATRIBUTOS", this.props.item.attributes,this.props.item.attributes.accessibility.dataField.fileVideoSignal[0].link)
    return(
      <div className="content-box">
        <div className="image-content-item">
          <Card className="course-item-video-card2">
            <CardActionArea className="course-item-video-card-media-action-area">
                 <VideoPreview file={this.props.item.attributes.video} className="videoPreview"/>

                 {
                   this.props.item.attributes.accessibility.dataField===undefined?
                   undefined
                   :
                  <div>
                    {
                      this.props.item.attributes.accessibility.dataField.signLanguage==="yes"?
                      <div>
                        {
                          this.props.item.attributes.accessibility.dataField.fileVideoSignal[0]!=null?
                          <div>
                            <div className="checkboxstyle">
                            <CheckboxLabels
                              language={this.props.language}
                              checkbox={this.checkbox}
                              type="signLanguage"
                              label={this.props.language.signLanguage}
                            />
                          </div>
                          {//for video signal 
                            this.state.signalShow==='signalShow'?
                            <div className="videosignal">
                              <video width="160" height="120"  key={this.state.key} autoPlay={this.state.autoplay} controls id="video-preview-information" className="file-preview-information" ref="video">
                                <source src={this.props.item.attributes.accessibility.dataField.fileVideoSignal[0].link}></source>
                              </video>
                            </div>
                              :
                              undefined  
                          }
                          </div>
                          :
                          
                          undefined
  
                            }
                          </div>
                          :
                          undefined    
                    }
                  </div>
                 }
                  
                  {
                   this.props.item.attributes.accessibility.dataField===undefined?
                   undefined
                   :
                   <div>
                    {
                      this.props.item.attributes.accessibility.dataField.audioDescription==="yes"?
                        <div>
                          {
                            this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null?
                            <div>
                              <div className="checkboxstyle">
                              <CheckboxLabels
                                language={this.props.language}
                                checkbox={this.checkbox}
                                type="audioDescription"
                                label={this.props.language.audioDescription}
                              />
                            </div>
                            {//For Audio description
                              this.state.signalShowAudioDescription==='signalShowAudioDescription'?
                                <div className="AudioPlayer">
                                  <AudioPlayer className="file-preview-information" volume src={this.props.item.attributes.accessibility.dataField.fileAudioDescription[0].link}/>
                                </div>
                                :
                                undefined  
                            }
                            </div>
                            :   
                            undefined
                          }

                        </div>    
                        :
                        undefined
                    }
                   </div>

                  }

                  

                  
           
                 
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
