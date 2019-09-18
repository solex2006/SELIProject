import React from 'react';

import FileUpload from '../files/FileUpload';
import ImagePreview from '../files//previews/ImagePreview';

import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Library from '../tools/Library';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';
import Tooltip from '@material-ui/core/Tooltip';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'row',
      description: true,
      showLibrary: false,
      attributes: {
        image: undefined,
        hasDescription: true,
        description: '',
        descriptionWidth: 'calc(100% - 500px)',
        alignment: 'row'
      }
    }
  }

  getImageAttributes(){
    let imageContent = this.state.attributes;
    if (this.validateContent(imageContent) ) {
      return imageContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.image === undefined) {
      console.log("upload or url");
      return false;
    }
    if (content.hasDescription && content.description === '') {
      console.log("enter a description or turn off");
      return false;
    }
    return true;
  }

  getFileInformation(file){
    let attributes = this.state.attributes;
    attributes.image = file;
    this.setState({
      attributes: attributes,
      showPreview: true,
      showGallery: false,
    });
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.image = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    })
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.description = innerHTML;
    this.setState({
      attributes: attributes,
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

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "alignment") {
      attributes.alignment = event.target.value;
      if (attributes.alignment !== "row" && attributes.alignment !== "row-reverse") {
        attributes.descriptionWidth = "100%";
      }
    }
    else if (name === "hasDescription") {
      attributes.hasDescription = !attributes.hasDescription;
    }
    this.setState({
      attributes: attributes,
    }, () => {
      console.log(this.state.attributes);
    });
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
                  file={this.state.attributes.image}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div className="scroll-media-input-container">
                <div className="margin-center-row">
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch size="small" onChange={this.handleChange('hasDescription')} checked={this.state.attributes.hasDescription}/>}
                      label={<p className="form-label">Image with text description</p>}
                    />
                  </FormGroup>
                  <p className="form-label">Image position:</p>
                  <Grid item>
                    <ToggleButtonGroup size="small" onChange={this.handleChange("alignment")} value={this.state.attributes.alignment} exclusive>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={1} value="row">
                        <Tooltip title="Left side">
                          <VerticalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={2} value="row-reverse">
                        <Tooltip style={{transform: "rotate(180deg)"}} title="Right side">
                          <VerticalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={3} value="column-reverse">
                        <Tooltip title="Up">
                          <HorizontalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={4} value="column">
                        <Tooltip title="Down">
                          <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </div>
                <div style={this.state.attributes.hasDescription ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
                  <Editor
                    areaHeight="18.5vh"
                    buttonLabels={false}
                    innerHTML={this.state.attributes.description}
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
