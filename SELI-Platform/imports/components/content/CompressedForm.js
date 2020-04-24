import React from 'react';
import FileUpload from '../files/FileUpload';
import CompressedPreview from '../files/previews/CompressedPreview';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Library from '../tools/Library';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import Fab from '@material-ui/core/Fab'
import PositionedSnackbar from "./ContentAlert"
import AccessibilityHelp from '../tools/AccessibilityHelp'

export default class CompressedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
      attributes: {
        compressed: undefined,
        instruction: '',
      }
    }
  }

  validateContent = (content) => {
    //console.log(content);
    if (content.compressed === undefined) {
      this.props.handleControlMessage(true, this.props.language.uploadAddUrlCompressed);
      return false;
    }
    if (content.instruction === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionCompressed);
      return false;
    }
    return true;
  }

  getCompressedAttributes(){
    let compressedContent = this.state.attributes;
    if (this.validateContent(compressedContent)) {
      return compressedContent;
    }
    else {
      return undefined;
    }
  }

  getFileInformation(file){
    if(file==="nofile"){
      this.setState({
        showPreview: false,
        alert:"alert"
      });
    }else{
      let attributes = this.state.attributes;
      attributes.compressed = file;
      this.setState({
        attributes: attributes,
        showPreview: true,
        showGallery: false,
        alert:"Noalert"
      });
    }
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.compressed = undefined;
    this.setState({
      showPreview: false,
      attributes: attributes,
    });
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.instruction = innerHTML;
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

  componentDidMount(){
    this.props.getCompressedAttributesFunction(() => this.getCompressedAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        if (this.state.attributes.compressed !== undefined) {
          this.setState({
            showPreview: true,
          })
        }else {
          this.setState({
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
            <div id="dialog-max-height" className="dialog-form-container">
              <div className="library-button-container">
                <Fab onClick={() => this.showLibrary()}>
                  <FolderSpecialIcon/>
                </Fab>
                <p className="media-fab-text">{this.props.language.library}</p>
              </div>
              {
                !this.state.showPreview ?
                  <div className="form-file-container">
                    <FileUpload
                      type="compressed"
                      user={Meteor.userId()}
                      accept={['.zip', '.rar', '.tz', '.7z']}
                      label={this.props.language.uploadCompressedButtonLabel}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <CompressedPreview
                  file={this.state.attributes.compressed}
                  unPickFile={this.unPickFile.bind(this)}
                  language={this.props.language}
                />
              }
              <div className="form-editor-label">
                <AccessibilityHelp 
                  id={'short-description-help-container'} 
                  name={'shortDescriptionHelpContainer'} 
                  error={!this.state.showPreview} 
                  tip={!this.state.showPreview? this.props.language.uploadCompressed: this.props.language.uploadCompressedCorrect} 
                  //step={props.step}
                  //stepLabel={props.stepLabel}
                  language={this.props.language}
                />
              </div>

              <PositionedSnackbar
                alert={this.state.alert}
                language={this.props.language}
                type={"compressed"}
              />
              <div>
                <p className="form-editor-label">{this.props.language.writeTheInstructions}</p>
                <div className="editor-block">
                  <p className="editor-label">{`${this.props.language.activityInstructions}:`}</p>
                  <Editor
                    areaHeight="25vh"
                    buttonLabels={false}
                    innerHTML={this.state.attributes.instruction}
                    addLinks={true}
                    getInnerHtml={this.getInnerHtml.bind(this)}
                    language={this.props.language}
                  />
                </div>
              </div>
            </div>
          :
          <Library
            user={Meteor.userId()}
            type={"compressed"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
            language={this.props.language}
          />
        }
      </div>
    );
  }
}
