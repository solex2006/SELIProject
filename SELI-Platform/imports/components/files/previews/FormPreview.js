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
          <Tooltip title={this.props.type === "image" ? this.props.language.changeImage : this.props.language.changeCourseSyllabus} aria-label="edit">
            <Fab
              size="small"
              aria-label={this.props.type === "image" ? this.props.language.changeImage : this.props.language.changeCourseSyllabus} 
              className="form-file-selected-button"
              onClick={ this.props.type === "image" ? 
                () => this.props.changeFile(this.props.type) :
                () => this.props.resetSylabus()
              }
            >
              <EditIcon />
            </Fab>
          </Tooltip>
        </div>
        {
          this.props.type === "image" ?
            <img
              src={this.props.file.link}
              className="form-file-selected-image-container"
            />
          :
            undefined
        }
        {
          this.props.type === "pdf" ?
            <div className="form-file-selected-file-container">
              <p className="form-file-selected-file-title">{this.props.courseSyllabus}</p>
              <BookIcon className="file-selected-icon"/>
              <p className="form-file-selected-file-subtitle">{`${this.props.file.pdf.name}`}</p>
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
