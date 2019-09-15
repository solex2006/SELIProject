import React from 'react';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files//previews/ImagePreview';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Library from '../tools/Library';
import Switch from '@material-ui/core/Switch';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab'

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'row',
      description: true,
      showLibrary: false,
    }
  }

  clearInputs(){
    this.setState({
      file: undefined,
      showPreview: false,
      showGallery: false,
      description: false,
    });
  }

  getImageAttributes(){
    let image = this.state.file;
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
      image: image,
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
    this.props.getImageAttributesFunction(() => this.getImageAttributes());
  }

  render() {
    return(
      <div>
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container">
              <div className="media-gallery-button-container">
                <Fab onClick={() => this.showLibrary()}>
                  <FolderSpecialIcon/>
                </Fab>
                <p className="media-fab-text">Open library</p>
              </div>
              {
                !this.state.showPreview ?
                  <div className="form-file-container">
                    <FileUpload
                      type='image'
                      accept={'image/*'}
                      label={'Click the button to upload an image'}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <ImagePreview
                  file={this.state.file}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div className="scroll-media-input-container">
                <div className="margin-center-row">
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch size="small" onChange={() => this.handleChange('description')} checked={this.state.description}/>}
                      label={<p className="form-label">Image with text description</p>}
                    />
                  </FormGroup>
                  <p className="form-label">Image position:</p>
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
                    areaHeight="18.5vh"
                    buttonLabels={false}
                    addLinks={true}
                    getInnerHtml={this.getInnerHtml.bind(this)}
                  />
                </div>
              </div>
            </div>
          :
          <Library
            user={"MyUser"}
            type={"image"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
