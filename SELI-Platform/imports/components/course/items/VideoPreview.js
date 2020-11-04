import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
      captions: '',
      loaded: false,
      isA11y: true
    }
  }

  componentDidMount(){
    document.getElementById("video-preview-information").addEventListener('webkitfullscreenchange', this.onFullScreen)
  }

  loadingConfig = () => {
    let configFile = {file: {
      tracks: []
    }};
    if(this.props.dataField !== undefined){
      if(this.props.dataField.fileTranscription && this.props.dataField.fileTranscription.length > 0){
        configFile.file.tracks = [];
        this.props.dataField.fileTranscription.map((track) => {
          configFile.file.tracks.push(
            {kind: 'subtitles', src: track.link}
          )
        })
        configFile.file.tracks[0].default = true;
      }    
    }
    let key = configFile.file.tracks.length;
    return {configFile, key};
  }

  onFullScreen = (e) => {
    var isFullscreenNow = document.webkitFullscreenElement !== null
    if (isFullscreenNow) {
      this.pause();
      this.props.handleOpenMedia(0);
    }
  }
  
  ready = () => {
    this.setState({loaded: true});
    //var tracks = this.refs.video.textTracks[0];
    //tracks.mode = 'showing';
  }

  readySign = () => {
    this.refs.videoSign.volume = 0;
  }

  play = () => {
    if (this.state.loaded && this.validateA11ySign()) 
    this.refs.videoSign.play();
  }

  pause = () => {
    if (this.state.loaded && this.validateA11ySign()) 
    this.refs.videoSign.pause();
  }

  seek = () => {
    if (this.state.loaded && this.validateA11ySign()){
      var videoTime = this.state.isA11y ? this.refs.video.currentTime : this.refs.video.getCurrentTime();
      var videoSignTime = this.refs.videoSign.duration;
      if (videoTime > videoSignTime) {
        this.refs.videoSign.currentTime = videoSignTime;
      } else {
        this.refs.videoSign.currentTime = videoTime;
      }
    }
  }

  onErrorVideo = (event) => {
    this.setState({
      isA11y: false,
    })
  }

  validateA11ySign = () => {
    if (this.props.dataField && this.props.dataField.signLanguage==="no" && this.props.dataField.fileVideoSignal[0]!=null) 
      return true;
    else 
      return false;
  }

  signVideo = () => {
    return(
      <React.Fragment>
        {
          this.validateA11ySign() &&
          <video
            ref="videoSign"
            className="videosignal"
            id="video-sign-language"
            preload="auto"
            src={this.props.dataField.fileVideoSignal[0].link}
            onLoadedData={this.readySign}
          /> 
        }
      </React.Fragment>
    )
  }

  render() {
    const initConfiguration = this.loadingConfig();
    return(
      <React.Fragment>
        {
          this.state.isA11y ?
            <video
              ref="video"
              key={initConfiguration.key}
              id="video-preview-information"
              className="course-creator-preview-player"
              preload="auto"
              src={this.props.file.link}
              onLoadedData={this.ready}
              onPlay={this.play}
              onPause={this.pause}
              onSeeked={this.seek}
              onError={() => this.onErrorVideo(event)}
              controls
            >
              {
                initConfiguration.configFile.file.tracks.length &&
                <track kind="subtitles" src={initConfiguration.configFile.file.tracks[0].src} default/>
              }
            </video>
          :
            <ReactPlayer
              ref="video"
              id="video-preview-information"
              className="course-creator-preview-player"
              controls
              key={initConfiguration.key}
              url={this.props.file.link}
              onReady={this.ready}
              onPlay={this.play}
              onPause={this.pause}
              onSeek={this.seek}
              config={initConfiguration.configFile}
            />
        }
        {this.signVideo()}
      </React.Fragment>
      );
    }
  }
