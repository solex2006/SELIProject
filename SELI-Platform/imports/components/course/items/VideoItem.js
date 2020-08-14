import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

  componentDidMount() {
    /* if(this.props.item.attributes.accessibility.dataField!=undefined){
      const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
      this.setState({editorState:EditorState.createWithContent(contentState)});
     }  */
  }

  textAlternatives = () => {
    return(
      <TextAlternatives
        item={this.props.item}
        language={this.props.language}
      ></TextAlternatives>
    )
  }

 /*  checkbox=(event, name)=>{
    //console.log("event and name", event, name)
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
                        (this.props.item.attributes.accessibility.dataField.shortDescription!='' || this.props.item.attributes.accessibility.dataField.longDescription.blocks[0].text!='')?
                          <CheckboxLabels
                            language={this.props.language}
                            checkbox={this.checkbox}
                            type="shortLongDescription"
                            label={this.props.language.textAlternatives}
                          />
                        :
                        undefined 
                      }
                    </div>
                }
      </div>
    )
  } */

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <Card className="course-item-video-card">
            {/* this.checkBoxLabels() */}
            <Card className="course-item-video-card-media-action-area">
              { this.props.item.attributes.video && (
                <VideoPreview 
                  file={this.props.item.attributes.video}
                  dataField={this.props.item.attributes.accessibility.dataField ? this.props.item.attributes.accessibility.dataField : undefined}
                />
              )}
              <CardContent className="course-item-video-card-media-content">
                <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                  {this.props.item.attributes.source === 'upload' ? this.props.language.videoFile : this.props.language.externalVideo}
                </Typography>
                <Typography className="course-item-card-title" gutterBottom variant="h5" component="h2">
                  {` ${this.props.item.attributes.title}`}
                </Typography>
              </CardContent>
            </Card>
            {
              this.props.item.attributes.accessibility.dataField!=undefined && this.props.item.attributes.accessibility.dataField.fileAudioDescription[0]!=null ?
                <div className="AudioPlayer">
                  <Typography className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
                    {`${this.props.language.audioDescription}:`}
                  </Typography>
                  <AudioPlayer className="file-preview-information" volume src={this.props.item.attributes.accessibility.dataField.fileAudioDescription[0].link}/>
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
            {
              this.props.item.attributes.externalLink !== '' ?
                <CardActions className="course-item-video-card-media-actions-container">
                  <Button onClick={() => this.openExternalLink()} className="course-item-video-card-media-button" size="small" color="primary">
                    {this.props.language.learnMore}
                  </Button>
                </CardActions>
              :
                undefined
            }
          </Card>
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
