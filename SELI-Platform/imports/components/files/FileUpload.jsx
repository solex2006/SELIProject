import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import { _ } from 'meteor/underscore';
import IndividualFile from './IndividualFile';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const debug = require('debug')('demo:file');

class FileUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      uploaded: false,
    };

    this.uploadIt = this.uploadIt.bind(this);
  }

  uploadIt(e) {
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance;
        if(this.props.parentId === "creating-tutor"){
          uploadInstance = TutorFilesCollection.insert({
            file: file,
            meta: {
              locator: self.props.fileLocator,
              parentId: this.props.parentId,
              //userId: Meteor.userId() // Optional, used to check on server for file tampering
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true // If you see issues with uploads, change this to false
          }, false);
        }

        if(this.props.parentId === "creating-course-file"){
          uploadInstance = CourseFilesCollection.insert({
            file: file,
            meta: {
              locator: self.props.fileLocator,
              parentId: this.props.parentId,
              //userId: Meteor.userId() // Optional, used to check on server for file tampering
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true // If you see issues with uploads, change this to false
          }, false);
        }
        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        })

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);
          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
            uploaded: true,
          })
        })



        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error)
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);
    if (!_.isEmpty(this.state.uploading)) {
      return (
        <div>
          <div className="loading-file-container">
            <p className="loading-file-name-text">{this.state.uploading.file.name}</p>
            <p className="loading-file-progress-text">{"Progress: " + this.state.progress + " % complete"}</p>
            <div className="loading-file-progress-icon">
              <CircularProgress
                value={this.state.progress + "%"}
                color="primary"
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    debug("Rendering FileUpload", this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {

      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link;
        if(this.props.parentId === 'creating-tutor'){
          link = TutorFilesCollection.findOne({ _id: aFile._id }).link();  //The "view/download" link
        }
        else if(this.props.parentId === 'creating-course-file'){
          link = CourseFilesCollection.findOne({ _id: aFile._id }).link();  //The "view/download" link
        }
        else {
          let tutorLink = TutorFilesCollection.findOne({ _id: aFile._id }).link();  //The "view/download" link
          let courseLink = TutorFilesCollection.findOne({ _id: aFile._id }).link();  //The "view/download" link
          if(tutorLink) {
            link = tutorLink;
          }
          if(courseLink) {
            link = courseLink;
          }
        }
        console.log(link);
        // Send out components that show details of each file
        return <div key={'file' + key}>
          <IndividualFile
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
            getImageInformation={this.props.getImageInformation.bind(this)}
            removeUrl={this.props.removeUrl.bind(this)}
            resetFile={this.props.resetFile.bind(this)}
            parent={this.props.parentId}
            collectionName={aFile._collectionName}
            uploadedTitle={this.props.uploadedTitle}
            icon={this.props.icon}
          />
        </div>
      })

      return (
        <div>
          {
            !this.props.uploaded ?
              <div className="input-file-container">
                <input
                  type="file"
                  id="fileinput"
                  disabled={this.state.inProgress}
                  onChange={this.uploadIt}
                  ref="fileinput"
                  className="file-upload-input"
                  accept={this.props.accept}
                />
                <label htmlFor="fileinput">
                  <Button className="upload-file-button" variant="contained" component="span">
                    {this.props.label}
                  </Button>
                </label>
              </div>
            :
            undefined
          }
          <div>
              {this.showUploads()}
          </div>
          {display}
        </div>
      )
    }
    else {
      return (
        <div>
          <CircularProgress
            value={this.state.progress + "%"}
            color="primary"
          />
        </div>
      );
    }
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker((props) => {
  const filesHandle = Meteor.subscribe('files.all');
  const docsReadyYet = filesHandle.ready();
  const meta = {
    parentId: props.parentId,
  };
  let files;
  if(props.parentId === 'creating-tutor'){
    files = TutorFilesCollection.find({ meta: meta }, { sort: { name: 1 } }).fetch();
  }
  else if(props.parentId === 'creating-course-file'){
    files = CourseFilesCollection.find({ meta: meta }, { sort: { name: 1 } }).fetch();
  }
  else{
    let tutorFiles = TutorFilesCollection.find({ meta: meta }, { sort: { name: 1 } }).fetch();
    let courseFiles = CourseFilesCollection.find({ meta: meta }, { sort: { name: 1 } }).fetch();
    if(tutorFiles.length) {
      files = tutorFiles;
    }
    if(courseFiles.length) {
      files = courseFiles;
    }
    if(!tutorFiles.length && !courseFiles.length){
      files = CourseFilesCollection.find({ meta: {parentId: 'none'} }, { sort: { name: 1 } }).fetch();
    }
  }
  console.log(files);
  let uploaded = false;
  if(files !== undefined){
    if (files.length) {
      uploaded = true;
    }
  }
  return {
    docsReadyYet,
    files,
    uploaded,
  };
})(FileUploadComponent);
