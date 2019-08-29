import React from 'react';
import FileUpload from '../files/FileUpload';
import PdfPreview from '../files//previews/PdfPreview';
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

export default class PdfForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLibrary: false,
    }
  }

  clearInputs(){
    this.setState({
      file: undefined,
      showPreview: false,
      showGallery: false,
    });
  }

  getPdfAttributes(){
    let pdf = this.state.file;
    let instruction = this.state.innerHTML;
    let pdfContent = {
      pdf: pdf,
      instruction: instruction,
    };
    this.clearInputs();
    return pdfContent;
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
    this.props.getPdfAttributesFunction(() => this.getPdfAttributes());
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
                      type="pdf"
                      accept={'.pdf'}
                      getFileInformation={this.getFileInformation.bind(this)}
                    />
                  </div>
                :
                <PdfPreview
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
              <div>
                <p className="form-editor-label">Write the instructions that the student must follow below:</p>
                <div className="editor-block">
                  <Editor
                    areaHeight="20vh"
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
            type={"pdf"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
