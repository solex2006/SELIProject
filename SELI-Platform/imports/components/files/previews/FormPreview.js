import React from 'react';
import BookIcon from '@material-ui/icons/Book';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

export default class FormPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setSelected(){}

  render() {
    return(
      <div className="form-file-selected-container">
        <div className="form-file-selected-actions">
          <Tooltip title={this.props.type === "image" ? "Change course image" : "Change course sylabus"} aria-label="edit">
            <Fab
              size="small"
              aria-label="edit"
              className="form-file-selected-button"
              onClick={() => this.props.changeFile(this.props.type)}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
        </div>
        {
          this.props.type === "image" ?
            <div
              style={{backgroundImage: `url(${this.props.file.link})`}}
              className="form-file-selected-image-container"
            >
            </div>
          :
          undefined
        }
        {
          this.props.type === "pdf" ?
            <div className="form-file-selected-file-container">
              <p className="form-file-selected-file-title">Course sylabus</p>
              <BookIcon className="file-selected-icon"/>
              <p className="form-file-selected-file-subtitle">{`${this.props.file.name}`}</p>
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
