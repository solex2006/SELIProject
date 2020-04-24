import React from 'react';
import FileUpload from '../files/FileUpload';
import VideoPreview from '../files/previews/VideoPreview';
import Editor from '../inputs/editor/Editor';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Library from '../tools/Library';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HttpIcon from '@material-ui/icons/Http';
import ReactPlayer from 'react-player';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab'
import AudioPreview from '../files/previews/AudioPreview';
import AudioRecorder from '../tools/AudioRecorder';
import PositionedSnackbar from "./ContentAlert"
import AccessibilityHelp from '../tools/AccessibilityHelp'

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
      attributes: {
        audio:undefined,
        video: undefined,
        videosignal:undefined,
        source: 'upload',
        title: '',
        externalLink: '',
        hasDescription: true,
        description: '',
        subtitles: [],
        accessibility: {
          pureDecorative: false,
          percentage: 0,
        }
      }
    }
  }

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "hasDescription") {
      attributes.hasDescription = !attributes.hasDescription;
    }
    if (name === "title") {
      attributes.title = event.target.value;
    }
    if (name === "externalLink") {
      attributes.externalLink = event.target.value;
    }
    this.setState({
      attributes: attributes,
    });
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.description = innerHTML;
    this.setState({
      attributes: attributes,
    });
  }

  getVideoAttributes(){
    let videoContent = this.state.attributes;
    if (this.validateContent(videoContent) ) {
      return videoContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.title === '') {
      this.props.handleControlMessage(true, this.props.language.titleVideoRequired);
      return false;
    }
    if (content.video === undefined) {
      this.props.handleControlMessage(true, this.props.language.uploadAddUrlVideo);
      return false;
    }
    if (content.hasDescription && content.description === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionVide);
      return false;
    }
    return true;
  }

  getFileInformation(file){
    if(file==="nofile"){
      this.setState({
        showPreview: false,
        alert:"alert"
      });
    }else{
      let attributes = this.state.attributes;
      attributes.video = file;
      this.setState({
        attributes: attributes,
        showPreview: true,
        showGallery: false,
        alert:"Noalert"
      });
    }
  }

  getFileInformationAudioDescription(file){
   
    let attributes = this.state.attributes;
    attributes.audio = file;
    
    this.setState({
      attributes: attributes,
      showPreviewAudioDescription: true,
      showGalleryAudioDescription: false,
    });
  }

  getFileInformationsignal(file){
    let attributes = this.state.attributes;
    attributes.videosignal = file;
    this.setState({
      attributes: attributes,
      showPreviewSignal: true,
      showGallerySignal: false,
    });
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.video = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    });
  }
  unPickFileSignal(){
    let attributes = this.state.attributes;
    attributes.videosignal = undefined;
    this.setState({
      attributes: attributes,
      showPreviewSignal: false,
    });
  }

  unPickFileAudioDescription(){
    let attributes = this.state.attributes;
    attributes.audio = undefined;
    this.setState({
      showPreviewAudioDescription: false,
      attributes: attributes,
    })
  }
  showLibrary(){
    this.setState({
      showGallery: true,
      showGallerySignal: true,
    })
  }

  hideLibrary(){
    this.setState({
      showGallery: false,
      showGallerySignal: false,
    })
  }

  urlHandleChange = name => event => {
    this.setState({
      showHelperText: false,
      url: event.target.value,
      validUrl: false,
    }, () => {
      this.validateUrl()
    })
  }

  validateUrl(){
    let attributes = this.state.attributes;
    let url = document.getElementById('url-input').value;
    let isValid = ReactPlayer.canPlay(url);
    let helperColor = '';
    let showHelperText = true;
    let urlMessage = '';
    if (isValid) {
      let video = {
        name: 'External video',
        link: url,
      };
      attributes.video = video;
      urlMessage = this.props.language.thePlayerCan;
      helperColor = "#4caf50";
    }
    else {
      attributes.video = undefined;
      urlMessage = this.props.language.thePlayerCannot;
      helperColor = "#f44336";
    }
    this.setState({
      showHelperText: showHelperText,
      urlMessage: urlMessage,
      helperColor: helperColor,
      validUrl: isValid,
      url: url,
      attributes: attributes,
    });
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.source = value;
    this.setState({
      attributes: attributes,
    });
  }

  
  componentDidMount(){
    this.props.getVideoAttributesFunction(() => this.getVideoAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        if (this.state.attributes.video !== undefined && this.state.attributes.source === 'upload') {
          this.setState({
            showPreview: true,
            showPreviewSignal: true,
            showPreviewAudioDescription: true,
          })
        }
        else {
          this.setState({
            validUrl: true,
            url: (this.state.attributes.video!=undefined)? (this.state.attributes.video.link): (undefined),
            helperColor: "#4caf50",
            urlMessage: this.props.language.thePlayerCan,
            showHelperText: true,
            showPreview: false,
          })
        }
      })
    }
  }

  render() {
    return(
      <div>
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container-large">
              <div className="dialog-columns-container">
                <div className="course-creator-file-form-column">
                  <div className = "menu-tab-button-container">
                    <Paper square>
                      <Tabs
                        color="primary"
                        value={this.state.attributes.source}
                        indicatorColor="primary"
                        textColor="primary"
                        className="form-tabs-container"
                        variant="fullWidth"
                        centered={true}
                      >
                        <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label={this.props.language.byUploadVideo} icon={<CloudUploadIcon />} />
                        <Tab value={'url'} onClick={() => {this.selectType('url'); this.unPickFile()}} className="form-tab" label={this.props.language.byUrlVideo}  icon={<HttpIcon />} />
                      </Tabs>
                    </Paper>
                  </div>
                  {
                    this.state.attributes.source === "upload" && !this.state.showGallery ?
                      <div className="library-button-container">
                        <Fab onClick={() => this.showLibrary()}>
                          <FolderSpecialIcon/>
                        </Fab>
                        <p className="media-fab-text">{this.props.language.library}</p>
                      </div>
                    :
                    undefined
                  }
                  <div className="form-column-container">
                    {
                      !this.state.showPreview ?
                        <div>
                          {
                            this.state.attributes.source === "upload" ?
                              <FileUpload
                                type="video"
                                user={Meteor.userId()}
                                accept={'video/*'}
                                label={this.props.language.uploadVideoButtonLabel}
                                getFileInformation={this.getFileInformation.bind(this)}
                              />
                            :
                              <div>
                                {
                                  this.state.validUrl ?
                                    <ReactPlayer className="course-creator-preview-player" url={this.state.url}/>
                                  :
                                    undefined
                                }
                                <div className="url-input-container">
                                  <TextField
                                    id="url-input"
                                    label="Url"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.url}
                                    autoFocus={true}
                                    required
                                    onChange={this.urlHandleChange()}
                                    className="url-input"
                                    helperText={ this.state.showHelperText ? <div className="url-helper-text" style={{color: this.state.helperColor}}>{this.state.urlMessage}</div> : undefined }
                                  />
                                </div>

                              </div>
                          }
                        </div>
                      :
                        <div>
                          <div>
                            <VideoPreview
                              file={this.state.attributes.video}
                              unPickFile={this.unPickFile.bind(this)}
                              language={this.props.language}
                            />
                          </div>
                        </div>
                    }
                    <PositionedSnackbar
                      alert={this.state.alert}
                      language={this.props.language}
                      type={"video"}
                    />
                     <div className="form-editor-label">
                      <AccessibilityHelp 
                        id={'short-description-help-container'} 
                        name={'shortDescriptionHelpContainer'} 
                        error={!this.state.showPreview} 
                        tip={!this.state.showPreview? this.props.language.uploadVideo: this.props.language.uploadVideoCorrect} 
                        //step={props.step}
                        //stepLabel={props.stepLabel}
                        language={this.props.language}
                      />
                    </div>
                  </div>
                </div>
                <div className="course-creator-form-column">
                  <div className="course-creator-input-container">
                    <TextField
                      id="title-input"
                      label={this.props.language.videoTitle}
                      margin="normal"
                      variant="outlined"
                      value={this.state.attributes.title}
                      onChange={this.handleChange('title')}
                      required
                      className="form-padding-dialog-input"
                    />
                    <div className="margin-center-row">
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch size="small" onChange={this.handleChange('hasDescription')} checked={this.state.attributes.hasDescription}/>}
                          label={<p className="form-label">{this.props.language.videoWithText}</p>}
                        />
                      </FormGroup>
                    </div>
                    <div style={this.state.attributes.hasDescription ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
                      <p className="editor-label">{`${this.props.language.activityInstructions}:`}</p>
                      <Editor
                        areaHeight='20vh'
                        innerHTML={this.state.attributes.description}
                        buttonLabels={false}
                        addLinks={true}
                        getInnerHtml={this.getInnerHtml.bind(this)}
                        language={this.props.language}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :
          <Library
            user={Meteor.userId()}
            type={"video"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
            language={this.props.language}
          />
        }
      </div>
    );
  }
}
