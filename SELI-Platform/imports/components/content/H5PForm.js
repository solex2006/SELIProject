import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Help from '../tools/Help';
import Link from '@material-ui/core/Link';

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
      <div className="h5p-content-form">
        <TextField
          id="url-input"
          label="H5P URL"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <div className="center-button-container">
          <Button color="primary">Check Url</Button>
          <Help
            helper="hp5Helper"
            text="To create H5P content follow the next steps:"
          />
        </div>
        <div className="advice-link-container">
          <p className="advice-link-text">You can find some examples and demos</p>
          <Link
            className="advice-link"
            component="button"
            variant="body2"
            onClick={() => {
              window.open('https://h5p.org/content-types-and-applications', '_blank');
            }}
          >
            Here
          </Link>
        </div>
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
