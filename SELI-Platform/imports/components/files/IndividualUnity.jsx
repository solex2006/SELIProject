import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IndividualUnity extends Component {
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
      name: this.props.fileName,
      type: this.props.type,
    }
    //this.props.getFileInformation(fileInformation);
  }

  render() {
    return (
      <div className="unity-file-preview-container">

      </div>
      )
    }
  }
  export default IndividualUnity;
