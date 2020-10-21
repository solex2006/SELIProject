import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
      captions: '',
      loaded: false,
      playing: false,
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
      this.props.openMediaChild();
    }
  }
  
  ready = () => {
    this.setState({loaded: true})
  }

  play = () => {
    if (this.state.loaded && this.props.dataField && this.props.dataField.signLanguage==="no" && this.props.dataField.fileVideoSignal[0]!=null) 
    this.setState({playing: true})
  }

  pause = () => {
    if (this.state.loaded && this.props.dataField && this.props.dataField.signLanguage==="no" && this.props.dataField.fileVideoSignal[0]!=null) 
    this.setState({playing: false})
  }

  seek = () => {
    if (this.state.loaded && this.props.dataField && this.props.dataField.signLanguage==="no" && this.props.dataField.fileVideoSignal[0]!=null){
      var videoTime = this.refs.video.getCurrentTime();
      var videoSignTime = this.refs.videoSign.getDuration();
      if (videoTime > videoSignTime) {
        this.refs.videoSign.seekTo(videoSignTime, 'seconds');
      } else {
        this.refs.videoSign.seekTo(videoTime, 'seconds');
      }
    }
  }

  signVideo = () => {
    return(
      <React.Fragment>
        {
          this.props.dataField && this.props.dataField.signLanguage==="no" && this.props.dataField.fileVideoSignal[0]!=null?
            <ReactPlayer
              ref="videoSign"
              className="videosignal"
              id="video-sign-language"
              playing={this.state.playing}
              url={this.props.dataField.fileVideoSignal[0].link}
              volume={0}
            />
          :
            undefined   
        }
      </React.Fragment>
    )
  }

  render() {
    const initConfiguration = this.loadingConfig();
    return(
      <React.Fragment>
        <ReactPlayer
          ref="video"
          id="video-preview-information"
          className="course-creator-preview-player"
          controls
          key={initConfiguration.key}
          playing={this.state.playing}
          url={this.props.file.link}
          onReady={this.ready}
          onPlay={this.play}
          onPause={this.pause}
          onSeek={this.seek}
          config={initConfiguration.configFile}
        />
        {this.signVideo()}
      </React.Fragment>
      );
    }
  }
