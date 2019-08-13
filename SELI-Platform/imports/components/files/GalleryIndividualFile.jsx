import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePreview from './previews/ImagePreview';
import VideoPreview from './previews/VideoPreview';
import AudioPreview from './previews/AudioPreview';
import PdfPreview from './previews/PdfPreview';
import CompressedPreview from './previews/CompressedPreview';

class GalleryIndividualFile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  propTypes = {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  componentDidMount(){
    let fileInformation = {
      url: this.props.fileUrl,
      id: this.props.fileId,
      type: this.props.type,
    }
    this.props.getFileInformation(fileInformation);
  }

  render() {
    return (
      <div className="file-preview-container">
        {
          this.props.type === "image" ?
            <ImagePreview
              id={this.props.fileId}
              link={this.props.fileUrl}
              showControlMessage={this.props.showControlMessage.bind(this)}
              resetInputButton={this.props.resetInputButton.bind(this)}
              generateSalt={this.props.generateSalt.bind(this)}
            />
          :
          undefined
        }
        {
          this.props.type === "video" ?
            <VideoPreview
              id={this.props.fileId}
              link={this.props.fileUrl}
              showControlMessage={this.props.showControlMessage.bind(this)}
              resetInputButton={this.props.resetInputButton.bind(this)}
              generateSalt={this.props.generateSalt.bind(this)}
            />
          :
          undefined
        }
        {
          this.props.type === "audio" ?
            <AudioPreview
              id={this.props.fileId}
              link={this.props.fileUrl}
              showControlMessage={this.props.showControlMessage.bind(this)}
              resetInputButton={this.props.resetInputButton.bind(this)}
              generateSalt={this.props.generateSalt.bind(this)}
            />
          :
          undefined
        }
        {
          this.props.type === "pdf" ?
            <PdfPreview
              id={this.props.fileId}
              link={this.props.fileUrl}
              name={this.props.fileName}
              showControlMessage={this.props.showControlMessage.bind(this)}
              resetInputButton={this.props.resetInputButton.bind(this)}
              generateSalt={this.props.generateSalt.bind(this)}
            />
          :
          undefined
        }
        {
          this.props.type === "compressed" ?
            <CompressedPreview
              id={this.props.fileId}
              link={this.props.fileUrl}
              name={this.props.fileName}
              showControlMessage={this.props.showControlMessage.bind(this)}
              resetInputButton={this.props.resetInputButton.bind(this)}
              generateSalt={this.props.generateSalt.bind(this)}
            />
          :
          undefined
        }
      </div>
      )
    }
  }
  export default GalleryIndividualFile;
