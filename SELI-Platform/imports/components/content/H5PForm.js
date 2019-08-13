import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class H5PForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getSize(iFrameText) {
    let widthIndex = iFrameText.indexOf('width="');
    let attributes = iFrameText.substring(widthIndex);
    attributes = attributes.split('"');
    let width = attributes[1];
    let height = attributes[3];
    let size = {width: width, height: height};
    return size;
  }

  getSourceUrl(iFrameText) {
    const iFrameTag = '<iframe src="';
    let url = iFrameText.substring(iFrameTag.length);
    url = url.split('"');
    url = url[0];
    return url;
  }

  clearInputs() {
    document.getElementById('instruction-input').value = "";
    document.getElementById('url-input').value = "";
  }

  getH5pAttributes(){
    let type = this.state.linkType;
    let h5pContent = {
      instruction: document.getElementById('instruction-input').value,
      link: this.getSourceUrl(document.getElementById('url-input').value),
      size: this.getSize(document.getElementById('url-input').value),
    };
    this.clearInputs();
    return h5pContent;
  }

  componentDidMount(){
    this.props.getH5pAttributesFunction(() => this.getH5pAttributes());
  }

  render() {
    return(
      <div>
        <TextField
          id="url-input"
          label="H5P URL"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          id="instruction-input"
          label="Instruction"
          margin="normal"
          variant="outlined"
          required
          multiline
          rows="3"
          fullWidth
        />
      </div>
    )
  }
}
