import React from 'react';

import FileUpload from '../files/FileUpload';
import ImagePreview from '../files//previews/ImagePreview';

import VerticalSplitIcon    from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon  from '@material-ui/icons/HorizontalSplit';

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
import AccessibilityHelp from '../tools/AccessibilityHelp'
import PositionedSnackbar from "./ContentAlert"
import TextField from '@material-ui/core/TextField';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordenadaR:0,
      alignment: 'row',
      description: true,
      showLibrary: false,
      attributes: {
        image: undefined,
        hasDescription: true,
        description: '',
        title: '',
        descriptionWidth: 'calc(100% - 500px)',
        alignment: 'row',
        accessibility: {
          pureDecorative: false,
          percentage: 0,
        }
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
    if (content.title === '') {
      this.props.handleControlMessage(true, this.props.language.titleAudioRequired);
      return false;
    }
    if (content.image === undefined) {
      this.props.handleControlMessage(true, this.props.language.uploadAddUrlImage);
      return false;
    }
    /* if (content.hasDescription && content.description === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionImage);
      return false;
    } */
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
    if (name === "title") {
      attributes.title = event.target.value;
    }
    this.setState({
      attributes: attributes,
    });
  }

  

  componentDidMount(){
    this.props.getImageAttributesFunction(() => this.getImageAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        if (this.state.attributes.image !== undefined) {
          this.setState({
            showPreview: true,
          })
        }
        else {
          this.setState({
            showPreview: false,
          })
        }
      })
    }
  }

  coordenadasCursosImageForm =(coordenadas)=> {
    this.state.attributes.image.coordenada=coordenadas
    //console.log("ImageForm ...", this.state.attributes.image)
    //console.log("CoordenadaImageForm ...", coordenadas)
    this.setState({
      coordenadaR: coordenadas 
    })
  } 


  render() {
    //console.log("ImageForm ...", this.state.attributes.image   )
    return(
      <div>
        {
          !this.state.showGallery ?
            <div id="dialog-max-height" className="dialog-form-container">
              <div className="library-button-container">
                <Fab onClick={() => this.showLibrary()}>
                  <FolderSpecialIcon/>
                </Fab>
                <p className="media-fab-text">{this.props.language.library}</p>
              </div>
              <div className="course-creator-input-container">
                <TextField
                  id="title-input"
                  label={this.props.language.imageTitle}
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
                  <div className="form-file-container">
                    <FileUpload
                      type='image'
                      user={Meteor.userId()}
                      accept={'image/*'}
                      label={this.props.language.uploadImageButtonLabel}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      getFileInformation={this.getFileInformation.bind(this)}
                      language={this.props.language}
                    />
                  </div>
                :
                <ImagePreview
                  file={this.state.attributes.image}
                  unPickFile={this.unPickFile.bind(this)}
                  language={this.props.language}
                  coordenadasCursosImageForm={this.coordenadasCursosImageForm}
                  coordenadaR={this.setState.coordenadaR}
                />
              }
              {/* <div className="margin-center-row">
                  <p className="form-label">{this.props.language.imagePosition}</p>
                  <Grid item>
                    <ToggleButtonGroup size="small" onChange={this.handleChange("alignment")} value={this.state.attributes.alignment} exclusive>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={1} value="row">
                        <Tooltip title={this.props.language.leftSide}>
                          <VerticalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={2} value="row-reverse">
                        <Tooltip style={{transform: "rotate(180deg)"}} title={this.props.language.rightSide}>
                          <VerticalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={3} value="column-reverse">
                        <Tooltip title={this.props.language.up}>
                          <HorizontalSplitIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={4} value="column">
                        <Tooltip title={this.props.language.down}>
                          <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </div> */}
              <div className="form-editor-label">
                <AccessibilityHelp 
                    id={'short-description-help-container'} 
                    name={'shortDescriptionHelpContainer'} 
                    error={!this.state.showPreview} 
                    tip={!this.state.showPreview? this.props.language.uploadImage: this.props.language.uploadImageCorrect}
                    //step={props.step}
                    //stepLabel={props.stepLabel}
                    language={this.props.language}
                />
              </div>
              </div>
              
          :
          <Library
            user={Meteor.userId()}
            type={"image"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
            language={this.props.language}
          />
        }
      </div>
    );
  }
}
