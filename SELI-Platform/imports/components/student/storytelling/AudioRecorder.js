import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import ReactStopwatch from 'react-stopwatch';
import CourseFilesCollection from '../../../../lib/CourseFilesCollection';

let self;

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      saveButton: false,
    }
    self = this;
  }

  startRecording = () => {
    this.setState({
      record: true,
      saveButton: false,
    });
  }

  stopRecording = () => {
    this.setState({
      record: false,
    });
  }

  onData(recordedBlob) {
    //console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    //console.log('recordedBlob is: ', recordedBlob);
    let milliseconds = recordedBlob.stopTime - recordedBlob.startTime;
    let time = self.toTime(milliseconds);
    time = time.substring(0, 8);
    self.setState({
      audioBlob: recordedBlob,
      time: time,
    }, () => {
      self.setState({
        saveButton: true,
      });
    });
  }

  getAudioFile() {
    let url = this.state.audioBlob.blobURL;
    var blob = null;
    let self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    xhr.onload = function()
    {
        blob = xhr.response;//xhr.response is now a blob object
        var file = new File([blob], `audio-recorded-${new Date().toDateString()}.wav`, {type: 'audio/wav'});
        self.saveAudio(file);
    }
    xhr.send();
  }

  toTime(ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }

  saveAudio(file) {
    let uploadInstance = CourseFilesCollection.insert({
      file: file,
      meta: {
        locator: self.props.fileLocator,
        dateAdded: new Date(),
        isFavorite: false,
        usedInCourse: false,
        userId: Meteor.userId(),
        //userId: Meteor.userId() // Optional, used to check on server for file tampering
      },
      streams: 'dynamic',
      chunkSize: 'dynamic',
      allowWebWorkers: true // If you see issues with uploads, change this to false
    }, false);
    uploadInstance.on('start', function () {
      //console.log('Starting');
    })

    uploadInstance.on('end', function (error, fileObj) {
      self.getUpload(uploadInstance);
    })

    uploadInstance.on('uploaded', function (error, fileObj) {

    })

    uploadInstance.on('error', function (error, fileObj) {
      //console.log('Error during upload: ' + error)
    });

    uploadInstance.on('progress', function (progress, fileObj) {
      //console.log('Upload Percentage: ' + progress
    });
    uploadInstance.start();
  }

  getUpload(upload){
    Tracker.autorun(() => {
      let audio = CourseFilesCollection.findOne({_id: upload.config.fileId});
      this.setState({
        audio: audio,
      }, () => {
        if (this.state.audio !== undefined) {
          let file = this.state.audio;
          file.link = this.state.audio.link();
          this.props.getFileInformation(file);
        }
      });
    });
  }

  saveRecordedAudio() {
    this.getAudioFile();
  }

  render() {
    return (
      <div className="audio-record-container">
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#FFFFFF"
          backgroundColor="#e0f2f1"
        />
        <div className="recorder-actions">
          {
            this.state.record ?
              <ReactStopwatch
                seconds={0}
                minutes={0}
                hours={0}
                limit="00:05:00"
                onCallback={() => this.stopRecording()}
                render={({ formatted, hours, minutes, seconds }) => {
                  return (
                    <div>
                      <p className="stopwatch-label">
                        { formatted }
                      </p>
                    </div>
                  );
                }}
              />
            :
            <p className="stopwatch-label">
              {this.state.saveButton ? this.state.time : `00:00:00`}
            </p>
          }
          <Tooltip title="Start recording">
            <Fab disabled={this.state.record} size="small" color={this.state.record ? "secondary" : undefined} className="recorder-button" onClick={this.startRecording}>
              <MicIcon/>
            </Fab>
          </Tooltip>
          <Tooltip title="Stop recording">
            <Fab size="small" disabled={!this.state.record} className="recorder-button" onClick={this.stopRecording}>
              <StopIcon/>
            </Fab>
          </Tooltip>
          {
            this.state.saveButton ?
              <Tooltip title="Save audio">
                <Fab size="small" onClick={() => this.saveRecordedAudio()} color="secondary" className="recorder-button" onClick={() => this.saveRecordedAudio()}>
                  <SaveIcon/>
                </Fab>
              </Tooltip>
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
