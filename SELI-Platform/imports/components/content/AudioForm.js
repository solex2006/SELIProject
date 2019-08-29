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

export default class AudioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'row',
      description: true,
      showLibrary: false,
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

  render() {
    return(
      <div>
        {
          !this.state.showGallery ?
            <div className="image-form">
              {
                !this.state.showPreview ?
                  <div className="form-file-container">
                    <FileUpload
                      type="audio"
                      accept={'audio/*'}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <AudioPreview
                  file={this.state.file}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div className="center-row">
                <p className="normal-text">Or</p>
              </div>
              <div className="center-row">
                <p className="normal-text">Pick one from your</p>
                <Button onClick={() => this.showLibrary()} color="primary" className="text-button">Library</Button>
              </div>
              <FormGroup className="content-radio-group-center" row>
                <FormControlLabel
                  className="form-label"
                  control={
                    <Checkbox color="primary" checked={this.state.description} onChange={() => this.handleChange('description')} value={this.state.description} />
                  }
                  label="Add text description to the audio"
                />
              </FormGroup>
              {
                this.state.description ?
                  <div>
                    <div className="margin-center-row">
                      <p className="form-label">Audio position:</p>
                      <Grid item>
                        <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                          <ToggleButton key={1} value="row" onClick={() => this.alignmentHandleChange("row")}>
                            <Tooltip title="Left side">
                              <VerticalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={2} value="row-reverse" onClick={() => this.alignmentHandleChange("row-reverse")}>
                            <Tooltip style={{transform: "rotate(180deg)"}} title="Right side">
                              <VerticalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={3} value="column-reverse" onClick={() => this.alignmentHandleChange("column-reverse")}>
                            <Tooltip title="Up">
                              <HorizontalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={4} value="column" onClick={() => this.alignmentHandleChange("column")}>
                            <Tooltip title="Down">
                              <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </div>
                    <p className="form-editor-label">Write the description of the audio below:</p>
                    <div className="editor-block">
                      <Editor
                        areaHeight="20vh"
                        buttonLabels={false}
                        addLinks={true}
                        getInnerHtml={this.getInnerHtml.bind(this)}
                      />
                    </div>
                  </div>
                :
                undefined
              }
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
