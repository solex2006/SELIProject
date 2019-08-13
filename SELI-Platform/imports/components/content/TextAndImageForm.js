import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class TextAndImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  saveContent(images, text){
    let lessonName = document.getElementById('lesson-name-input').value;
    let lessonObjective = document.getElementById('lesson-objective-input').value;
    let content = {
      lesson: lessonName,
      objective: lessonObjective,
      text: text,
      images: images,
      type: 'text-and-image',
    };
    this.props.addContent(content);
    this.props.showForm("UnitsEditor", true);
  }

  uploadedContent(images, text){
    this.saveContent(images, text);
  }

  render() {
    return(
      <div>
        <div className="form-title">Course editor</div>
        <div className="form-subtitle">Text & image content</div>
        <div className="input-container">
          <TextField
            id="lesson-name-input"
            label="Lesson name"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="input-container">
          <TextField
            id="lesson-objective-input"
            label="Lesson objective"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="form-subtitle">Content</div>
      </div>
    )
  }
}
