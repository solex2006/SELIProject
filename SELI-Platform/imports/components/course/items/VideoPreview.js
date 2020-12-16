import React from 'react';
import ReactPlayer from 'react-player';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

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

  componentDidMount = () => {
    document.getElementById("video_" + this.props.id).addEventListener('webkitfullscreenchange', this.onFullScreen);
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
    let key = `${this.props.file ? this.props.file.link : "link"}-${configFile.file.tracks.length}`;
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

  handleOpenChild = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      if (this.props.allowSeizures[0] === false) {
        this.refs.video.pause();
        this.props.handleOpenMedia(0);
      }
    }
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
          this.props.allowSeizures[0] === false &&
          <PlayCircleOutlineIcon className="template-play-icon-solo" />
        }
        {
          this.state.isA11y ?
            <video
              ref="video"
              key={initConfiguration.key}
              id={"video_" + this.props.id}
              className="course-creator-player"
              autoPlay={false}
              aria-labelledby={"video_" + this.props.id + "_shortDescr"}
              aria-describedby={"video_" + this.props.id + "_longDescr"}
              onLoadedData={this.ready}
              onPlay={this.play}
              onPause={this.pause}
              onSeeked={this.seek}
              onError={() => this.onErrorVideo(event)}
              controls={this.props.allowSeizures[0]}
              onClick={
                this.props.allowSeizures[0] === false ?
                  () => this.props.handleOpenMedia(0) : undefined
              }
              onKeyPress={this.handleOpenChild}
              style={{
                cursor: this.props.allowSeizures[0] === false && "pointer"
              }}
              tabIndex={this.props.allowSeizures[0] === false && "0"}
            >
              <source src={this.props.file.link} />
              {
                initConfiguration.configFile.file.tracks.length &&
                <track kind="subtitles" src={initConfiguration.configFile.file.tracks[0].src} default/>
              }
            </video>
          :
            <ReactPlayer
              ref="video"
              id={"video_" + this.props.id}
              className="course-creator-player"
              autoPlay={false}
              aria-labelledby={"video_" + this.props.id + "_shortDescr"}
              aria-describedby={"video_" + this.props.id + "_longDescr"}
              controls={this.props.allowSeizures[0]}
              key={initConfiguration.key}
              url={this.props.file.link}
              onReady={this.ready}
              onPlay={this.play}
              onPause={this.pause}
              onSeek={this.seek}
              config={initConfiguration.configFile}
              onClick={
                this.props.allowSeizures[0] === false ?
                  () => this.props.handleOpenMedia(0) : undefined
              }
              onKeyPress={(event) => this.handleOpenChild(event)}
              style={{
                cursor: this.props.allowSeizures[0] === false && "pointer"
              }}
              tabIndex={this.props.allowSeizures[0] === false && "0"}
            />
        }
        {this.signVideo()}
      </React.Fragment>
      );
    }
  }
