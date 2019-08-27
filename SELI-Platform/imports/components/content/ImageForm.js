import React from 'react';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files//previews/ImagePreview';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
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

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'flex-start',
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

    });
  }

  getImageAttributes(){
    let image = this.state.image;
    let description = '';
    if(this.state.description){
      description = document.getElementById('description-input').value;
    }
    let alignment = this.state.alignment;
    let imageContent = {
      image: image,
      description: description,
      alignment: alignment,
    };
    this.clearInputs();
    this.generateImageSalt();
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

  resetInputButton(){}

  componentDidMount(){
    this.props.getImageAttributesFunction(() => this.getImageAttributes());
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
                      type="image"
                      accept={'image/*'}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <ImagePreview
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
              <div className="margin-center-row">
                <p className="form-label">Image alignment:</p>
                <Grid item>
                  <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                    <ToggleButton key={1} value="flex-start" onClick={() => this.alignmentHandleChange("left")}>
                      <Tooltip title="Left alignment">
                        <FormatAlignLeftIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton key={2} value="center" onClick={() => this.alignmentHandleChange("center")}>
                      <Tooltip title="Center alignment">
                        <FormatAlignCenterIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton key={3} value="flex-end" onClick={() => this.alignmentHandleChange("right")}>
                      <Tooltip title="Right alignment">
                        <FormatAlignRightIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
              <FormGroup className="content-radio-group-center" row>
                <FormControlLabel
                  control={
                    <Checkbox color="primary" checked={this.state.description} onChange={() => this.handleChange('description')} value={this.state.description} />
                  }
                  label="Text description"
                />
              </FormGroup>
              {
                this.state.description ?
                  <div className="editor-block">
                    <Editor
                      areaHeight="20vh"
                      buttonLabels={false}
                      addLinks={false}
                      getInnerHtml={this.getInnerHtml.bind(this)}
                    />
                  </div>
                :
                undefined
              }
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
