import React from 'react';
import FileUpload from '../files/FileUpload';
import VideoPreview from '../files/previews/VideoPreview';
import Library from '../tools/Library';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HttpIcon from '@material-ui/icons/Http';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import ReactPlayer from 'react-player';
import Button from '@material-ui/core/Button';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';

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
        isA11y: true,
        accessibility: {
          pureDecorative: false,
          percentage: 0,
        }
      },
      url: "",
      isValid: true,
      isA11y: true,
      acceptA11y: false,
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

  validateContentCommons = (content) => {
    if (this.validateContent(content) ) {
      return content;
    }
    else {
      return undefined;
    }
  }

  getVideoAttributes(){
    let videoContent = this.state.attributes;
    videoContent.video.link = encodeURI(videoContent.video.link);
    videoContent.isA11y = this.state.isA11y;
    if (this.state.isA11y || this.state.acceptA11y) {
      return this.validateContentCommons(videoContent);
    } else {
      this.handleOpen();
      return undefined;
    }
  }
  
  continueCreate = () => {
    this.setState({acceptA11y: true}, () => {
      this.props.continueEdit('edit');
    });
  }

  validateContent = (content) => {
    if (content.title === '') {
      this.props.handleControlMessage(true, this.props.language.titleVideoRequired);
      return false;
    }
    if (!content.video) {
      this.props.handleControlMessage(true, this.props.language.uploadAddUrlVideo);
      return false;
    }
    /* if (content.hasDescription && content.description === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionVide);
      return false;
    } */
    return true;
  }

  getFileInformation(file){
    let attributes = this.state.attributes;
    attributes.video = file;
    this.setState({
      attributes: attributes,
      showPreview: true,
      showGallery: false,
    });
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
      isValid: true,
      isA11y: true
    }, () => {
      this.validateUrl()
    })
  }

  onErrorVideo = (event) => {
    this.setState({
      isA11y: false,
    }, () => {
      if (!ReactPlayer.canPlay(this.state.url)) {
        this.setState({isValid: false}, () => {
          this.validateUrl();
        })
      } else {
        this.validateUrl();
      }
    })
  }

  validateUrl(){
    let attributes = this.state.attributes;
    let url = document.getElementById('url-input').value;
    let helperColor = '';
    let showHelperText = true;
    let urlMessage = '';
    if (this.state.isValid) {
      let video = {
        name: 'External video',
        link: url,
      };
      attributes.video = video;
      if (this.state.isA11y) {
        urlMessage = this.props.language.thePlayerCan;
        helperColor = "#4caf50";
      } else {
        urlMessage = this.props.language.feedback_a11y_accessibility_no;
        helperColor = "#d1a101";
      }
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
      url: url,
      attributes: attributes,
    });
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.source = value;
    this.setState({
      attributes: attributes,
      url: "",
      isValid: true,
      isA11y: true,
      acceptA11y: false,
    });
  }

  
  componentDidMount(){
    this.props.getVideoAttributesFunction(() => this.getVideoAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: {...this.props.contentToEdit.attributes},
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
            url: (this.state.attributes.video!=undefined) ? (this.state.attributes.video.link): (undefined),
            helperColor: "#4caf50",
            urlMessage: this.props.language.thePlayerCan,
            showHelperText: true,
            showPreview: false,
          })
        }
      })
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    return(
      <div>
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container">
              <div className="course-creator-file-form-column">
                <div className = "menu-tab-button-container">
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
                  </div>
                  {
                    !this.state.showPreview ?
                      <React.Fragment>
                        {
                          this.state.attributes.source === "upload" ?
                            <FileUpload
                              type="video"
                              user={Meteor.userId()}
                              accept={'video/*'}
                              label={this.props.language.uploadVideoButtonLabel}
                              handleControlMessage={this.props.handleControlMessage.bind(this)}
                              getFileInformation={this.getFileInformation.bind(this)}
                              language={this.props.language}
                            />
                          :
                            <React.Fragment>
                              {
                                this.state.isA11y ?
                                  <video
                                    ref="urlVideo"
                                    id="video-preview-url" 
                                    className="course-creator-preview-player"
                                    src={this.state.url}
                                    onError={() => this.onErrorVideo(event)}
                                    controls
                                  />
                                :
                                  <ReactPlayer
                                    ref="urlVideo"
                                    id="video-preview-url" 
                                    className="course-creator-preview-player"
                                    url={this.state.url}
                                    controls={true}
                                  />
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
                            </React.Fragment>
                        }
                      </React.Fragment>
                    :
                      <VideoPreview
                        file={this.state.attributes.video}
                        unPickFile={this.unPickFile.bind(this)}
                        language={this.props.language}
                      />
                  }
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          role="dialog"
          className="media-dialog"
          tabIndex={-1}
        >
          <DialogTitle className="success-dialog-title" id="course-dialog-title">{this.props.language.videoSettings_a11y}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="exit-player-tooltip">
              {`${this.props.language.feedback_a11y_accessibility_no}. ${this.props.language.wantProceed}`}
            </DialogContentText>
            <InfoIcon className="warning-dialog-icon"/>   
          </DialogContent>
          <DialogActions>
            <Button aria-label={this.props.language.cancel} onClick={() => this.handleClose()} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button aria-label={this.props.language.confirm} onClick={() => this.continueCreate()} color="primary">
              {this.props.language.confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
