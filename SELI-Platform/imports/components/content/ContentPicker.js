import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="content-picker-container">
          <div className="content-picker-row">
            <Button onClick={() => this.props.showContentForm('TextAndImage')} className="picker-button" id="text-and-image-content" variant="contained" color="primary">
              Text & Image
            </Button>
            <Button onClick={() => this.props.showContentForm('Video')} className="picker-button" id="video-content" variant="contained" color="primary">
              Video
            </Button>
            <Button onClick={() => this.props.showContentForm('H5P')} className="picker-button" id="h5p-content" variant="contained" color="primary">
              H5p
            </Button>
          </div>
          <div className="content-picker-row">
            <Button onClick={() => this.props.showContentForm('Animation')} className="picker-button" id="animation-content" variant="contained" color="primary">
              Animation
            </Button>
            <Button onClick={() => this.props.showContentForm('Files')} className="picker-button" id="file-content" variant="contained" color="primary">
              File
            </Button>
            <Button onClick={() => this.props.showContentForm('Embed')} className="picker-button" id="embed-content" variant="contained" color="primary">
              Embed
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
