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
import CompressedPreview from '../files//previews/CompressedPreview';


export default class CompressedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  clearInputs(){
    document.getElementById('instruction-input').value = "";
  }

  getCompressedAttributes(){
    let compressed = this.state.compressed;
    let instruction = document.getElementById('instruction-input').value;
    let compressedContent = {
      compressed: compressed,
      instruction: instruction,
    };
    this.clearInputs();
    this.generateCompressedSalt();
    return compressedContent;
  }

  getFileInformation(fileInformation){
    if(fileInformation){
      this.setState({
        compressed: fileInformation,
      });
    }
  }

  removeFileInformation(){
    this.setState({
      fileInformation: undefined,
    });
  }

  generateCompressedSalt(){
    this.setState({
      compressedSalt: Math.random(),
    });
  }

  pickFile(file){
    let fileInformation = {
      url: file.link,
      id: file._id,
      name: file.name,
      type: "compressed",
    }
    this.setState({
      compressed: fileInformation,
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
    this.props.getCompressedAttributesFunction(() => this.getCompressedAttributes());
    this.props.resetInputButtonFunction(() => this.resetInputButton());
    this.props.generateCompressedSaltFunction(() => this.generateCompressedSalt());
    this.generateCompressedSalt();
  }

  render() {
    return(
      <div className="gallery-content-form-container">
        <div className="gallery-content-row">
          <div className="button-preview-column">
            {
              this.state.showPreview ?
                <CompressedPreview
                  id={this.state.compressed.id}
                  link={this.state.compressed.url}
                  name={this.state.compressed.name}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  resetInputButton={this.resetInputButton.bind(this)}
                  generateSalt={this.generateCompressedSalt.bind(this)}
                />
              :
              <GalleryFileUpload
                parentId={"my-images" + this.state.compressedSalt}
                removeFunction="RemoveCourseFile"
                collection={CourseFilesCollection}
                accept={['.zip', '.rar', '.tz', '.7z']}
                label="Upload a compressed file"
                type={"compressed"}
                showControlMessage={this.props.showControlMessage.bind(this)}
                getFileInformation={this.getFileInformation.bind(this)}
                removeFileInformation={this.removeFileInformation.bind(this)}
                resetInputButtonFunction={resetInputButton => this.resetInputButton = resetInputButton}
                generateSalt={this.generateCompressedSalt.bind(this)}
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
        <p className="gallery-subtitle">Compressed library</p>
        <div id="gallery-content-row-overflow" className="gallery-content-row">
          <Library
            user={"my-user"}
            type={"compressed"}
            pickFile={this.pickFile.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            resetInputButton={this.resetInputButton.bind(this)}
          />
        </div>
      </div>
    );
  }
}
