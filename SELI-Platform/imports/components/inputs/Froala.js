import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import CourseFilesCollection from '../../../lib/CourseFilesCollection.js';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '<span>Text and image content</span>',
      contentId: '',
      saved: false,
    };
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  handleModelChange (model) {
    this.setState({
      content: model,
    });
  }

  uploadImages(file){
    let self = this;
    let uploadInstance = CourseFilesCollection.insert({
      file: file,
      meta: {
        contentId: this.state.contentId,
      },
      streams: 'dynamic',
      chunkSize: 'dynamic',
      allowWebWorkers: true // If you see issues with uploads, change this to false
    }, false);
    uploadInstance.on('start', function () {
      //console.log('Starting');
    })

    uploadInstance.on('end', function (error, fileObj) {
      self.getUploads(uploadInstance);
    })

    uploadInstance.on('uploaded', function (error, fileObj) {
      self.handleCloseLoading();
      self.props.showControlMessage("Content uploaded succesfully");
    })

    uploadInstance.on('error', function (error, fileObj) {
      //console.log('Error during upload: ' + error)
    });

    uploadInstance.on('progress', function (progress, fileObj) {
      //console.log('Upload Percentage: ' + progress
    });
    uploadInstance.start();
  }

  convertImage(url) {
    var blob = null;
    let self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    xhr.onload = function()
    {
        blob = xhr.response;//xhr.response is now a blob object
        var file = new File([blob], "image.png", {type: 'image/jpeg'});
        self.uploadImages(file);
    }
    xhr.send();
  }

  checkAllUploads(){
    if(this.state.urlArray.length === this.state.imagesToChange.length){
      let links = [];
      for (var i = 0; i < this.state.imagesToChange.length; i++) {
        let link = CourseFilesCollection.findOne({_id: this.state.imagesToChange[i]._id}).link();
        links.push(link);
      }
      this.setState({
        links: links,
      });
      let content = this.buildContent(this.state.urlArray, this.state.content, links);
      this.setState({
        content: content,
      }, () => {
        this.updateContent(content);
      });
    }
  }

  getUploads(file){
    Tracker.autorun(() => {
      this.setState({
        imagesToChange: CourseFilesCollection.find({meta: {contentId: this.state.contentId}}).fetch(),
      }, () => {
        this.checkAllUploads();
      });
    });
  }

  getImageUrl(content){
    const imageTag = '<img src="';
    const imageTagSize = imageTag.length;
    let urlArray = [];
    let i = 0;
    while(i < content.length){
      let index = content.indexOf(imageTag, i);
      if(index > -1){
        let url = content.substring(index + imageTagSize);
        url = url.split('"');
        url = url[0];
        urlArray.push(url);
        i = url.length + index + imageTagSize;
      }
      else {
        i++;
      }
    }
    this.setState({
      urlArray: urlArray,
    });
    return urlArray;
  }

  buildContent(urlArray, content, newUrl){
    for (var i = 0; i < urlArray.length; i++) {
      content = content.replace(urlArray[i], newUrl[i]);
    }
    return content;
  }

  searchImages(){
    let url = this.getImageUrl(this.state.content);
    this.setState({
      url: url,
    }, () => {
      if(url.length){
        this.handleClickOpenLoading();
      }
      else {
        this.props.uploadedContent(url, this.state.content);
      }
      for (var i = 0; i < url.length; i++) {
        this.convertImage(url[i]);
      }
    });
  }

  createContent(){
    return this.props.courseKey;
  }

  saveContent(){
    let contentId = this.createContent();
    this.setState({
      contentId: contentId,
    }, () => {
      this.searchImages();
    });
  }

  updateContent(content){
    this.props.uploadedContent(this.state.links, this.state.content);
    /*let savedContent = Content.update({
      _id: this.state.contentId,
    }, {
      $set: {
        content: content
      }
    });*/
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenLoading = () => {
    this.setState({ openLoading: true });
  };

  handleCloseLoading = () => {
    this.setState({ openLoading: false });
  };

  render () {
    return(
      <div>
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <div className="form-button-container">
          <Button onClick={() => this.handleClickOpen()} className="create-button" variant="contained" color="primary">
            Show preview
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle id="language-select-title">Text and image preview</DialogTitle>
          <DialogContent className="editor-preview-dialog">
            <FroalaEditorView
              model={this.state.content}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openLoading}
          onClose={this.handleCloseLoading}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle id="language-select-title">Uploading content please wait...</DialogTitle>
          <DialogContent>
            <div className="loading-file-progress-icon">
              <CircularProgress
                value={this.state.progress + "%"}
                color="primary"
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="form-button-container">
          <Button onClick={() => this.saveContent()} className="form-button" id="upload-button" variant="contained" color="secondary">
            Save content
          </Button>
        </div>
      </div>
    );
  }

}
