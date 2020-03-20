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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Editor, EditorState, convertFromRaw } from "draft-js";



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
    ;
  }

  openExternalLink() {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  componentDidMount() {
    console.log("En video", this.props.item.attributes)
    /* if(this.props.item.attributes.accessibility.dataField!=undefined){
      const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
      this.setState({editorState:EditorState.createWithContent(contentState)});
     }  */
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
    else if(event===true && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'shortlongDescription',
      })
    }
    else if(event===false && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'noshortlongDescription'
      })
    }
  }

  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  checkBoxLabels=()=>{
    return(
      <div>
        {
          this.props.item.attributes.accessibility.dataField===undefined?
                   undefined
                   :
                  <div className="checkBoxItem"> 
                    
                      {
                        (this.props.item.attributes.accessibility.dataField.fileVideoSignal[0]!=null && 
                          this.props.item.attributes.accessibility.dataField.signLanguage==="no") ?
                          <div className="checkboxstyle">
                            <CheckboxLabels
                              language={this.props.language}
                              checkbox={this.checkbox}
                              type="signLanguage"
                              label={this.props.language.signLanguage}
                            />
                          </div>
                          :
                          undefined
                      }
                      {
                        (this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null &&
                        (this.props.item.attributes.accessibility.dataField.audioDescription==="no" &&
                        this.props.item.attributes.accessibility.dataField.audioDescriptionRequired==="yes")) ?
                        <div className="checkboxstyle">
                          <CheckboxLabels
                            language={this.props.language}
                            checkbox={this.checkbox}
                            type="audioDescription"
                            label={this.props.language.audioDescription}
                          />
                        </div>
                        :
                        undefined
                      }
                      {
                        /* (this.props.item.attributes.accessibility.dataField.shortDescription!='' || this.props.item.attributes.accessibility.dataField.longDescription.blocks[0].text!='')?
                          <CheckboxLabels
                            language={this.props.language}
                            checkbox={this.checkbox}
                            type="shortLongDescription"
                            label={this.props.language.textAlternatives}
                          />
                        :
                        undefined */
                      }
                    </div>
                }
      </div>
    )
  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <Card className="course-item-video-card2">
            {this.checkBoxLabels()}
            <CardActionArea className="course-item-video-card-media-action-area">
                 {
                  (this.props.item.attributes.video.name==="External video" )?
                  <ReactPlayer 
                    className="course-item-video-card-media-action-area" 
                    url={this.props.item.attributes.video.link}
                    controls
                  /> 
                  :
                  <VideoPreview file={this.props.item.attributes.video} captions={this.props.item.attributes.accessibility.dataField} className="videoPreview"/>
                 }
                {
                  this.props.item.attributes.accessibility.dataField===undefined?
                  undefined
                  :
                  <div>
                    {
                  this.props.item.attributes.accessibility.dataField.signLanguage==="no"?
                  <div>
                    {
                      this.props.item.attributes.accessibility.dataField.fileVideoSignal[0]!=null?
                      <div>
                        
                      {//for video signal 
                        this.state.signalShow==='signalShow'?
                        <div className="videosignal">
                          <video width="320" height="240"  key={this.state.key} autoPlay={this.state.autoplay} controls id="video-preview-information" className="file-preview-information" ref="video">
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
                      (this.props.item.attributes.accessibility.dataField.audioDescription==="yes" || 
                      (this.props.item.attributes.accessibility.dataField.audioDescription==="no" && 
                      this.props.item.attributes.accessibility.dataField.audioDescriptionRequired==="yes"))?
                        <div>
                          {
                            this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null?
                            <div>
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
            <div>

            {//For text Alternatives
                this.state.shortlongDescription==='shortlongDescription'?
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <h2 className="description">{this.props.language.shortDescription_a11y_label}</h2>
                    {
                        this.props.item.attributes.accessibility.dataField===undefined?
                        undefined
                        :
                      <div> 
                        {
                          this.props.item.attributes.accessibility.dataField!=undefined ?
                          <div>
                            {this.props.item.attributes.accessibility.dataField.shortDescription}
                          </div>
                          :
                          <div>{this.props.language.NoshortDescription}</div>
                        }  
                        </div>
                    }

                    </Grid>
                    <Grid item xs={6}>
                     <h2 className="description">{this.props.language.longDescription_a11y_label}</h2> 
                      {
                        this.props.item.attributes.accessibility.dataField===undefined?
                        undefined
                        :
                      <div> 
                        {
                          this.props.item.attributes.accessibility.dataField!=undefined ?
                          <Editor editorState={this.signalText()} readOnly={true} />
                          :
                          <div>{this.props.language.NolongDescription}</div>
                        }  
                        </div>
                      }
                    </Grid>
                  </Grid>
                  :
                  undefined
            }
          </div>
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
