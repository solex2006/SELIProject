import React from 'react';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files//previews/ImagePreview';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Library from '../tools/Library';

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
