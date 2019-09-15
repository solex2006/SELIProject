import React from 'react';
import FileUpload from '../files/FileUpload';
import AudioPreview from '../files//previews/AudioPreview';
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

export default class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'row',
      description: true,
      showLibrary: false,
      audioType: 'upload',
    }
  }

  alignmentHandleChange = (value) => {
    this.setState({
      alignment: value,
    });
  }

  handleChange = (event) => {
    this.setState({
      description: !this.state.description,
    });
  }

  clearInputs(){
    this.setState({
      file: undefined,
      showPreview: false,
      showGallery: false,
      description: false,
    });
  }

  getAudioAttributes(){
    let audio = this.state.file;
    let alignment = this.state.alignment;
    let description = '';
    let descriptionWidth = "calc(100% - 500px)";
    if (this.state.description) {
      description = this.state.innerHTML;
    }
    if (this.state.alignment !== "row" && this.state.alignment !== "row-reverse") {
      descriptionWidth = "100%";
    }
    let imageContent = {
      audio: audio,
      description: description,
      alignment: alignment,
      descriptionWidth: descriptionWidth,
    };
    this.clearInputs();
    return imageContent;
  }

  getFileInformation(file){
    this.setState({
      file: file,
      showPreview: true,
      showGallery: false,
    });
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      file: undefined,
    })
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
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
  }

  selectType(value){
    this.setState({
      audioType: value,
    });
  }

  render() {
    return(
      <div>
        {
          this.state.audioType === "upload" && !this.state.showGallery ?
            <div className="media-gallery-tab-button-container">
              <Fab onClick={() => this.showLibrary()}>
                <FolderSpecialIcon/>
              </Fab>
              <p className="media-fab-text">Open library</p>
            </div>
          :
          undefined
        }
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container">
              <Paper square>
                <Tabs
                  color="primary"
                  value={this.state.audioType}
                  indicatorColor="primary"
                  textColor="primary"
                  className="form-tabs-container"
                  variant="fullWidth"
                  centered={true}
                >
                  <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label="By upload" icon={<CloudUploadIcon />} />
                  <Tab value={'record'} onClick={() => {this.selectType('record'); this.unPickFile()}} className="form-tab" label="Record audio" icon={<MicIcon />} />
                </Tabs>
              </Paper>
              {
                !this.state.showPreview ?
                  <div className="form-file-container">
                    {
                      this.state.audioType === 'upload' ?
                        <FileUpload
                          type="audio"
                          accept={'audio/*'}
                          label={'Click the button to upload an audio'}
                          getFileInformation={this.getFileInformation.bind(this)}
                        />
                      :
                      <AudioRecorder
                        getFileInformation={this.getFileInformation.bind(this)}
                      />
                    }
                  </div>
                :
                <AudioPreview
                  file={this.state.file}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div className="margin-center-row">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch size="small" onChange={() => this.handleChange('description')} checked={this.state.description}/>}
                    label={<p className="form-label">Audio with text description</p>}
                  />
                </FormGroup>
                <p className="form-label">Audio position:</p>
                <Grid item>
                  <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                    <ToggleButton disabled={!this.state.description} key={1} value="row" onClick={() => this.alignmentHandleChange("row")}>
                      <Tooltip title="Left side">
                        <VerticalSplitIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton disabled={!this.state.description} key={2} value="row-reverse" onClick={() => this.alignmentHandleChange("row-reverse")}>
                      <Tooltip style={{transform: "rotate(180deg)"}} title="Right side">
                        <VerticalSplitIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton disabled={!this.state.description} key={3} value="column-reverse" onClick={() => this.alignmentHandleChange("column-reverse")}>
                      <Tooltip title="Up">
                        <HorizontalSplitIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton disabled={!this.state.description} key={4} value="column" onClick={() => this.alignmentHandleChange("column")}>
                      <Tooltip title="Down">
                        <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
              <div style={this.state.description ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
                <Editor
                  areaHeight={'10vh'}
                  buttonLabels={false}
                  addLinks={true}
                  getInnerHtml={this.getInnerHtml.bind(this)}
                />
              </div>
            </div>
          :
          <Library
            user={"MyUser"}
            type={"audio"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
