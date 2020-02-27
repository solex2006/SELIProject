import React from 'react';
import FileUpload from '../files/FileUpload';
import AudioPreview from '../files/previews/AudioPreview';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Library from '../tools/Library';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AudioRecorder from '../tools/AudioRecorder';
import TextField from '@material-ui/core/TextField';


export default class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
      attributes: {
        audio: undefined,
        videosignal:undefined,
        source: 'upload',
        title: '',
        externalLink: '',
        hasDescription: true,
        description: '',
        accessibility: {
          pureDecorative: false,
          percentage: 0,
        }
      },
    }
  }

  alignmentHandleChange = (value) => {
    this.setState({
      alignment: value,
    });
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

  getAudioAttributes(){
    let audioContent = this.state.attributes;
    if (this.validateContent(audioContent) ) {
      return audioContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.title === '') {
      this.props.handleControlMessage(true, this.props.language.titleAudioRequired);
      return false;
    }
    if (content.audio === undefined) {
      this.props.handleControlMessage(true, this.props.language.uploadRecordAudio);
      return false;
    }
    if (content.hasDescription && content.description === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionVideo);
      return false;
    }
    return true;
  }

  getFileInformation(file){
    console.log("fileAudio", file)
    let attributes = this.state.attributes;
    attributes.audio = file;
    
    this.setState({
      attributes: attributes,
      showPreview: true,
      showGallery: false,
    });
  }
  
  getFileInformationVideo(file){
    console.log("filevideo", file)
    let attributes = this.state.attributes;
    attributes.videosignal = file;
    
    this.setState({
      attributes: attributes,
     // showPreview: true,
      //showGallery: false,
    });
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.audio = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    })
  }

  showLibrary(){
    this.setState({
      showGallery: true,
    })
  }

  hideLibrary(){
    this.setState({
      showGallery: false,
    })
  }

  componentDidMount(){
    this.props.getAudioAttributesFunction(() => this.getAudioAttributes());
    console.log("ContnetToedit",this.props.contentToEdit)
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        if (this.state.attributes.audio !== undefined) {
          this.setState({
            showPreview: true,
          })
        }
      })
    }
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.source = value;
    this.setState({
      attributes: attributes,
    });
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
                        <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label={this.props.language.byUploadAudio} icon={<CloudUploadIcon />} />
                        <Tab value={'record'} onClick={() => {this.selectType('record'); this.unPickFile()}} className="form-tab" label={this.props.language.byRecordedAudio} icon={<MicIcon />} />
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
                            this.state.attributes.source === 'upload' ?
                              <FileUpload
                                type="audio"
                                accept={'audio/*'}
                                user={Meteor.userId()}
                                label={this.props.language.uploadAudioButtonLabel}
                                getFileInformation={this.getFileInformation.bind(this)}
                              />
                            :
                            <AudioRecorder
                              getFileInformation={this.getFileInformation.bind(this)}
                              language={this.props.language}
                            />
                          }
                        </div>
                      :
                      <AudioPreview
                        file={this.state.attributes.audio}
                        unPickFile={this.unPickFile.bind(this)}
                        language={this.props.language}
                      />
                    }
                  </div>



                </div>
                <div className="course-creator-form-column">
                  <div className="course-creator-input-container">
                    <TextField
                      id="title-input"
                      label={this.props.language.audioTitle}
                      margin="normal"
                      variant="outlined"
                      value={this.state.attributes.title}
                      onChange={this.handleChange('title')}
                      required
                      className="form-padding-dialog-input"
                    />
                    <TextField
                      id="link-input"
                      label={this.props.language.externalLink}
                      value={this.state.attributes.externalLink}
                      onChange={this.handleChange('externalLink')}
                      margin="normal"
                      variant="outlined"
                      className="form-padding-dialog-input"
                    />
                    <div className="margin-center-row">
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch size="small" onChange={this.handleChange('hasDescription')} checked={this.state.attributes.hasDescription}/>}
                          label={<p className="form-label">{this.props.language.audioWithText}</p>}
                        />
                      </FormGroup>
                    </div>
                    <div style={this.state.attributes.hasDescription ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
                      <Editor
                        areaHeight='20vh'
                        buttonLabels={false}
                        innerHTML={this.state.attributes.description}
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
            type={"audio"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
            language={this.props.language}
          />
        }
      </div>
    );
  }
}
