import React from 'react';
import FileUpload from '../files/FileUpload';
import PdfPreview from '../files//previews/PdfPreview';
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

export default class PdfForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
      attributes: {
        pdf: undefined,
        instruction: '',
      }
    }
  }

  validateContent = (content) => {
    if (content.pdf === undefined) {
      this.props.handleControlMessage(true, "Upload or add the url of the pdf source");
      return false;
    }
    if (content.instruction === '') {
      this.props.handleControlMessage(true, "Add the instruction that the student must follow with the pdf file");
      return false;
    }
    return true;
  }

  getPdfAttributes(){
    let pdfContent = this.state.attributes;
    if (this.validateContent(pdfContent) ) {
      return pdfContent;
    }
    else {
      return undefined;
    }
  }

  getFileInformation(file){
    let attributes = this.state.attributes;
    attributes.pdf = file;
    this.setState({
      attributes: attributes,
      showPreview: true,
      showGallery: false,
    });
  }

  unPickFile(){
    let attributes = this.state.attributes;
    attributes.pdf = undefined;
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
    this.props.getPdfAttributesFunction(() => this.getPdfAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        if (this.state.attributes.pdf !== undefined) {
          this.setState({
            showPreview: true,
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
                      type="pdf"
                      user={Meteor.userId()}
                      accept={'.pdf'}
                      label={'Click the button to upload a pdf'}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <PdfPreview
                  file={this.state.attributes.pdf}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div>
                <p className="form-editor-label">Write the instructions that the student must follow below:</p>
                <div className="editor-block">
                  <Editor
                    areaHeight="25vh"
                    buttonLabels={false}
                    innerHTML={this.state.attributes.instruction}
                    addLinks={true}
                    getInnerHtml={this.getInnerHtml.bind(this)}
                  />
                </div>
              </div>
            </div>
          :
          <Library
            user={Meteor.userId()}
            type={"pdf"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
