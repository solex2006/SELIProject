import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';
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

        uploadInstance = self.props.collection.insert({
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
          self.props.showControlMessage("The file has been uploaded successfully")
          // Remove the filename from the upload box
          self.refs['fileinput' + self.props.type].value = '';

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
          this.props.showControlMessage('There was an error uploading the file, try again later');
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

  componentDidMount(){
    
  }

  render() {
    debug("Rendering FileUpload", this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {

      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = this.props.collection.findOne({ _id: aFile._id }).link();;
        return <div key={'file' + key}>
          <IndividualFile
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
            removeFileInformation={this.props.removeFileInformation.bind(this)}
            resetFile={this.props.resetFile.bind(this)}
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
                  id={"fileinput" + this.props.type}
                  disabled={this.state.inProgress}
                  onChange={this.uploadIt}
                  ref={"fileinput" + this.props.type}
                  className="file-upload-input"
                  accept={this.props.accept}
                />
                <label htmlFor={"fileinput" + this.props.type}>
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
  let files = props.collection.find({ meta: meta }, { sort: { name: 1 } }).fetch();
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
