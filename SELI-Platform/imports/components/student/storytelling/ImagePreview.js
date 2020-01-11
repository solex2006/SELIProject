import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
        <div className="storytelling-media-preview-container">
          <div className="storytelling-media-image">
            <div style={{backgroundImage: `url(${this.props.file.link})`}} className="file-image-preview"></div>
          </div>
        </div>
      );
    }
  }
