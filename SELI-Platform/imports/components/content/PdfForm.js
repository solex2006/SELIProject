import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import GalleryFileUpload from '../files/GalleryFileUpload';
import Library from '../tools/Library';
import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';
import PdfPreview from '../files//previews/PdfPreview';


export default class PdfForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  clearInputs(){
    document.getElementById('instruction-input').value = "";
    this.setState({
      pdf: undefined,
    });
  }

  getPdfAttributes(){
    let pdf = this.state.pdf;
    let instruction = document.getElementById('instruction-input').value;
    let pdfContent = {
      pdf: pdf,
      instruction: instruction,
    };
    this.clearInputs();
    this.generatePdfSalt();
    return pdfContent;
  }

  getFileInformation(fileInformation){
    if(fileInformation){
      this.setState({
        pdf: fileInformation,
      });
    }
  }

  removeFileInformation(){
    this.setState({
      pdf: undefined,
    });
  }

  generatePdfSalt(){
    this.setState({
      pdfSalt: Math.random(),
    });
  }

  pickFile(file){
    let fileInformation = {
      url: file.link,
      id: file._id,
      name: file.name,
      type: "pdf",
    }
    this.setState({
      pdf: fileInformation,
      showPreview: false,
    }, () => {
      this.setState({
        showPreview: true,
      });
    });
  }

  ignoreFile(){
    this.setState({
      fileInformation: undefined,
      showPreview: false,
    })
  }

  resetInputButton(){}

  componentDidMount(){
    this.props.getPdfAttributesFunction(() => this.getPdfAttributes());
    this.props.resetInputButtonFunction(() => this.resetInputButton());
    this.props.generatePdfSaltFunction(() => this.generatePdfSalt());
    this.generatePdfSalt();
  }

  render() {
    return(
      <div className="gallery-content-form-container">
        <div className="gallery-content-row">
          <div className="button-preview-column">
            {
              this.state.showPreview ?
                <PdfPreview
                  id={this.state.pdf.id}
                  link={this.state.pdf.url}
                  name={this.state.pdf.name}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  resetInputButton={this.resetInputButton.bind(this)}
                  generateSalt={this.generatePdfSalt.bind(this)}
                />
              :
              <GalleryFileUpload
                parentId={"my-images" + this.state.pdfSalt}
                removeFunction="RemoveCourseFile"
                collection={CourseFilesCollection}
                accept=".pdf"
                label="Upload a pdf"
                type={"pdf"}
                showControlMessage={this.props.showControlMessage.bind(this)}
                getFileInformation={this.getFileInformation.bind(this)}
                removeFileInformation={this.removeFileInformation.bind(this)}
                resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                generateSalt={this.generatePdfSalt.bind(this)}
                ignoreFile={this.ignoreFile.bind(this)}
              />
            }
          </div>
          <div className="gallery-input-column">
            <div className="gallery-center-container">
              <TextField
                id="instruction-input"
                label="Instruction"
                margin="normal"
                variant="outlined"
                required
                multiline
                rows="3"
                className="gallery-content-input"
              />
            </div>
          </div>
        </div>
        <Divider light={true}/>
        <p className="gallery-subtitle">Pdf library</p>
        <div id="gallery-content-row-overflow" className="gallery-content-row">
          <Library
            user={"my-user"}
            type={"pdf"}
            pickFile={this.pickFile.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetInputButton={this.resetInputButton.bind(this)}
          />
        </div>
      </div>
    );
  }
}
