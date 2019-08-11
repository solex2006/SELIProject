import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';
import { _ } from 'meteor/underscore';
import GalleryIndividualFile from './GalleryIndividualFile';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IoMdCloudUpload } from "react-icons/io";

const debug = require('debug')('demo:file');

class GalleryFileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      uploaded: false,
      showUploadButton: true,
    };

    this.uploadIt = this.uploadIt.bind(this);
  }

  uploadIt(e) {
    e.preventDefault();
    let self = this;
    let uploaded = true;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance;

        uploadInstance = self.props.collection.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            parentId: this.props.parentId,
            userId: 'my-user',
            isFavorite: false,
            dateAdded: new Date(),
            isUsedInCourse: false,
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          self.setState({
            showUploadButton: false,
          });
          if(self.props.type === 'video'){
            self.props.setSourceRadioGroup(true);
          }
        })

        uploadInstance.on('end', function (error, fileObj) {
          self.setState({
            showUploadButton: false,
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        })

        uploadInstance.on('abort', function (fileObj) {
          Meteor.call(self.props.removeFunction, uploadInstance.config.fileId, function (err) {
            if (err) {
              this.props.showControlMessage('There was an error deleting the file, try again later');
              return;
            }
          });
          self.props.removeFileInformation();
          self.props.showControlMessage('Upload canceled');
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
            uploaded: false,
            showUploadButton: true,
          });
          if(self.props.type === 'video'){
            self.props.setSourceRadioGroup(false);
          }
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          self.props.showControlMessage("The file has been uploaded successfully");
          if(self.props.type === 'video'){
            //self.props.showVideoAccesibilityForm();
          }
          if(self.props.multifile){
            let fileInformation = {};
            fileInformation.fileId = uploadInstance.config.fileId;
            fileInformation.type = self.props.type;
            fileInformation.name = uploadInstance.file.name
            self.props.addFile(fileInformation);
          }
          // Remove the filename from the upload box
          self.clearUploadInput();
          if(self.props.multifile){
            uploaded = false;
          }
          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
            uploaded: uploaded,
            showUploadButton: false,
          })
        })



        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error)
          this.props.showControlMessage('There was an error uploading the file, try again later');
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          //console.log('Upload Percentage: ' + progress)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  clearUploadInput(){
    this.setState({
      showUploadButton: true,
    }, () => {
      this.refs['fileinput' + this.props.type].value = '';
    }, () => {
      this.setState({
        showUploadButton: false,
      });
    });
  }

  cancelUpload(){
    let uploading = this.state.uploading;
    uploading.abort();
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    if (!_.isEmpty(this.state.uploading)) {
      return (
        <div>
          <div className="uploading-library-content-container">
            <div className="uploading-library-column">
              <div className="uploading-library-row">
                <p className="uploading-library-text">{"Uploading " + this.props.type + ", please wait..."}</p>
                <div className="uploading-library-progress-container">
                  <CircularProgress
                    value={this.state.progress}
                    color="primary"
                    variant="static"
                    size={"3.75vw"}
                    thickness={5}
                  />
                  <p className="uploading-library-progress-text">
                    {this.state.progress + "%"}
                  </p>
                </div>
              </div>
              <div className="uploading-library-row">
                <div className="uploading-library-actions">
                  <Button className="uploading-library-button" onClick={() => this.cancelUpload()} color="secondary" variant="contained">
                    Cancel upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  resetInputButton(){
    this.clearUploadInput();
    this.setState({
      showUploadButton: true,
      uploading: [],
      progress: 0,
      inProgress: false,
      uploaded: false,
    });
    if(this.props.type === 'video'){
      this.props.setSourceRadioGroup(false);
    }
    this.props.ignoreFile();
  }

  componentDidMount(){
    this.setState({
      uploaded: false,
    });
    this.props.resetInputButtonFunction(() => this.resetInputButton());
  }

  removeFileInformation(){
    this.setState({
      uploading: [],
      progress: 0,
      inProgress: false,
      uploaded: false,
      showUploadButton: true,
    }, () => {
      this.props.removeFileInformation();
    });
  }

  render() {
    debug("Rendering FileUpload", this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {

      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = this.props.collection.findOne({ _id: aFile._id }).link();
        return <div key={'file' + key}>
          <GalleryIndividualFile
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
            preview={this.props.preview}
            dowload={this.props.download}
            open={this.props.open}
            delete={this.props.delete}
            showIcon={this.props.showIcon}
            parent={this.props.parentId}
            collectionName={aFile._collectionName}
            uploadedTitle={this.props.uploadedTitle}
            icon={this.props.icon}
            collection={this.props.collection}
            removeFunction={this.props.removeFunction}
            type={this.props.type}
            showControlMessage={this.props.showControlMessage.bind(this)}
            getFileInformation={this.props.getFileInformation.bind(this)}
            removeFileInformation={this.removeFileInformation.bind(this)}
            resetInputButton={this.resetInputButton.bind(this)}
            generateSalt={this.props.generateSalt.bind(this)}
          />
        </div>
      })

      return (
        <div>
          {
            !this.state.uploaded ?
              <div>
                {
                  this.state.showUploadButton ?
                    <div className="input-file-container">
                      <input
                        type="file"
                        id={"fileinput" + this.props.type}
                        disabled={this.state.inProgress}
                        onChange={this.uploadIt}
                        ref={"fileinput" + this.props.type}
                        className="file-upload-input"
                        accept={this.props.accept}
                      />
                      <label htmlFor={"fileinput" + this.props.type}>
                        <Button className="gallery-upload-button" variant="contained" component="span" disabled={this.props.disabled}>
                          <div className="button-icon-center-container">
                            <IoMdCloudUpload className="gallery-upload-icon"/>
                          </div>
                          {this.props.label}
                        </Button>
                      </label>
                    </div>
                  :
                  undefined
                }
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
    userId: 'my-user',
  };
  let files = props.collection.find({ 'meta.userId': meta.userId , 'meta.parentId': meta.parentId }, { sort: { name: 1 } }).fetch();
  //console.log(meta);
  //console.log(files);
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
})(GalleryFileUpload);
