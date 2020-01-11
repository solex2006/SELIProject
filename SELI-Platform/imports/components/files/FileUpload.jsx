import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CourseFilesCollection from '../../../lib/CourseFilesCollection';
import { _ } from 'meteor/underscore';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Loading from '../tools/Loading';

const debug = require('debug')('demo:file');

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false
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
        let uploadInstance = CourseFilesCollection.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            dateAdded: new Date(),
            isFavorite: false,
            usedInCourse: false,
            userId: self.props.user,
            //userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false)

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          //console.log('Starting');
        })

        uploadInstance.on('end', function (error, fileObj) {
          //console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          }, () => {
            // Remove the filename from the upload box
            self.refs['fileinput' + self.props.type].value = '';
          });
          self.getFileInformation(fileObj);
        })

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error)
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  getFileInformation(file){
    Tracker.autorun(() => {
      let uploadedFile = CourseFilesCollection.findOne({_id: file._id});
      this.setState({
        uploadedFile: uploadedFile,
      }, () => {
        if (this.state.uploadedFile !== undefined) {
          file.link = this.state.uploadedFile.link();
          this.props.getFileInformation({_id: file._id, name: file.name, link: file.link});
        }
      });
    });
  }

  cancelUpload(){
    let uploading = this.state.uploading;
    uploading.abort();
    this.setState({
      uploading: [],
      progress: 0,
      inProgress: false
    }, () => {
      // Remove the filename from the upload box
      this.refs['fileinput' + this.props.type].value = '';
    });
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    if (!_.isEmpty(this.state.uploading)) {
      return (
        <div>
          <div className="uploading-file-container">
            <div className="uploading-file-column">
              <div className="uploading-file-row">
                <p className="uploading-file-text">{"Uploading " + this.props.type + ", please wait..."}</p>
                <div className="uploading-file-progress-container">
                  <CircularProgress
                    value={this.state.progress}
                    color="primary"
                    variant="static"
                    size={getComputedStyle(document.documentElement).getPropertyValue('--progress-size')}
                    thickness={5}
                  />
                  <p className="uploading-file-progress-text">
                    {this.state.progress + "%"}
                  </p>
                </div>
              </div>
              <div className="uploading-file-row">
                <div className="uploading-file-actions">
                  <Button className="uploading-file-button" onClick={() => this.cancelUpload()} color="secondary" variant="contained">
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


  handleKeyPress = (event) => {
    console.log('enter press here! ')
    if(event.key === 'Enter'){
      console.log('enter press here! ')
    }
  }
  render() {
    debug("Rendering FileUpload",this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {
      return (
        <div  tabIndex="-1">
          {
            !this.state.inProgress ?
              <div  className="upload-container">
                <div class="upload-btn-wrapper center-row">
                  <Button  id="da" className="sign-button" color="secondary" variant="outlined">{this.props.label}</Button>
                  <input className="upload-btn-wrapper" 
                    tabIndex="0"
                    type="file"
                    id={"fileinput" + this.props.type}
                    onChange={this.uploadIt}
                    ref={"fileinput" + this.props.type}
                    accept={this.props.accept}
                  />
                </div> 
                {/* <p className="upload-label">{this.props.label}</p> */}
              </div>
            :
            undefined
          }
          {this.showUploads()}
        </div>
      );
    }
    else {
      return (
        <div>
          <Loading message="Loading file uploader..."/>
        </div>
      );
    }
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker( ( props ) => {
  const filesHandle = Meteor.subscribe('files.all');
  const docsReadyYet = filesHandle.ready();
  const files = CourseFilesCollection.find({}, {sort: {name: 1}}).fetch();
  return {
    docsReadyYet,
    files,
  };
})(FileUpload);
