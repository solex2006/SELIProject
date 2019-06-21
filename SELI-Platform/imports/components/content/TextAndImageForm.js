import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class TextAndImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
       text: '',
       modules: {
         toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'},
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
       },
       formats: [
         'header', 'font', 'size',
         'bold', 'italic', 'underline', 'strike', 'blockquote',
         'list', 'bullet', 'indent',
         'link', 'image', 'color',
       ],
    }
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  saveContent(){
    this.props.showForm("UnitsEditor", true);
    let lessonName = document.getElementById('lesson-name-input').value;
    let content = {
      lesson: lessonName,
      type: 'text-and-image',
    };
    this.props.addContent(content);
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
            id="outlined-uncontrolled"
            label="Lesson objective"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="form-subtitle">Content</div>
        <div className="editor-container">
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.state.modules}
            formats={this.state.formats}
          />
        </div>
        <div className="form-button-container">
          <Button onClick={() => this.saveContent()} className="form-button" id="upload-button" variant="contained" color="secondary">
            Save content
          </Button>
        </div>
      </div>
    )
  }
}
