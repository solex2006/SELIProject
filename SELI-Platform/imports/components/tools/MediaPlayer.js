import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ScaleLoader from 'react-spinners/ScaleLoader';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import ReactPlayer from 'react-player';
import Fullscreen from "react-full-screen";

import TextAlternatives from '../accessibility/alternative/TextAlternatives';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';

const HIDE_TIME = 5000;

export default class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showControls: false,
      media: this.props.mediaItems[this.props.index],
      index: this.props.index,
      playing: false,
      fullScreen: false,
      muted: false,
      playedSeconds: 0,
      volume: 0.8,
      timeLabel: "00:00",
      captions: [],
      hasA11y: false,
      isA11y: true,
      disableCaptions: true,
    }
  }

  loadingData = () => {
    if (this.state.media.attributes.accessibility.dataField) {
      this.setState({hasA11y: true})
      if(this.state.media.attributes.accessibility.dataField.fileTranscription && this.state.media.attributes.accessibility.dataField.fileTranscription.length>0){
        var caption = [{kind: 'subtitles', src: this.state.media.attributes.accessibility.dataField.fileTranscription[0].link, default: true}];
        this.setState({
          disableCaptions: false,
          captions: caption,
          tracks: caption
        })
      }
    } else {
      this.setState({hasA11y: false})
    }
  }

  setData = (index) => {
    this.setState({
      media: this.props.mediaItems[index],
      index: index,
    }, () => {
      this.loadingData();
    })
  }

  componentDidMount = () => {
    this.loadingData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.index !== this.props.index) {
      this.setData(this.props.index);
    }
  }

  handleInactivity() {
    this.setState({
      showControls: true,
    });
    setTimeout(() => {
      this.setState({
        showControls: false,
      });
    }, HIDE_TIME);
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
    if (this.state.isA11y) {
      if (!this.state.playing) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
    if (this.validateA11ySign()) {
      if (!this.state.playing) {
        this.refs.videoSign.play();
      } else {
        this.refs.videoSign.pause();
      }
    }
  }

  loadedData = () => {
    this.handleDuration(this.player.duration);
  }

  loadedDataSign = () => {
    this.refs.videoSign.volume = 0;
  }

  handleToggleFullscreen = () => {
    this.setState({ fullScreen: !this.state.fullScreen });
  }

  handleToggleMute = () => {
    this.setState({ muted: !this.state.muted });
  }

  handleBuffer = () => {
    this.setState({
      isBuffering: true,
    })
  }

  handleBufferEnd = () => {
    this.setState({
      isBuffering: false,
    })
  }

  handleProgress = state => {
    var time = 0;
    if (this.state.isA11y) time = this.player.currentTime;
    else time = state.playedSeconds;
    this.toTimeLabel(time);
    this.setState({
      playedSeconds: time,
    })
  }

  handleSeekChange = (e, newValue) => {
    var newFloatValue = parseFloat(newValue);
    this.toTimeLabel(newValue);
    this.setState({ playedSeconds: newFloatValue })
    if (this.state.isA11y) this.player.currentTime = newFloatValue;
    else this.player.seekTo(newFloatValue);
    this.handleSeekChangeA11y(newFloatValue);
  }

  handleSeekChangeA11y = (value) => {
    if (this.validateA11ySign()){
      var videoTime = value;
      var videoSignTime = this.refs.videoSign.duration;
      if (videoTime > videoSignTime) {
        this.refs.videoSign.currentTime = videoSignTime;
      } else {
        this.refs.videoSign.currentTime = videoTime;
      }
    }
  }

  handleVolumeChange = (e, newValue) => {
    this.setState({
      volume: parseFloat(newValue)
    }, () => {
      if (this.state.isA11y) {
        this.player.volume = this.state.volume;
      }
      this.state.volume === 0 ? this.setState({muted: true}) : this.setState({muted: false})
    });
  }

  handleDuration = (duration) => {
    this.setState({ duration })
  }

  ref = player => {
    this.player = player
  }

  toTimeLabel = (playedSeconds) => {
    let dateObj = new Date(playedSeconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeLabel = minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
    this.setState({
      timeLabel: timeLabel,
    });
  }

  handleChange = () => {
    if (this.state.captions.length) {
      this.setState({captions: []});
    } else {
      this.setState({captions: this.state.tracks});
    }
    if (this.state.playing) {
      this.handlePlayPause();
    }
  }

  handleNext = () => {
    if (this.state.media.type === 'image') {
      if (this.state.index < this.props.mediaItems.length - 1) this.setData(this.state.index + 1)
      else this.setData(0);
    }
  }

  handleBack = () => {
    if (this.state.media.type === 'image') {
      if (this.state.index > 0) this.setData(this.state.index - 1)
      else this.setData(this.props.mediaItems.length - 1);
    }
  }

  handleNavigate = (event) => {
    if (event.which == 9 || event.keyCode == 9) {
      if (!this.state.showControls) this.handleInactivity();
    }else if (event.which == 27 || event.keyCode == 27) {
      this.props.handleCloseMedia();
    } else if (event.which == 37 || event.keyCode == 37) {
      this.handleBack();
    } else if (event.which == 39 || event.keyCode == 39) {
      this.handleNext();
    }
  }

  onErrorVideo = (event) => {
    this.setState({
      isA11y: false,
    })
  }

  validateA11ySign = () => {
    if (this.state.media.attributes.accessibility.dataField && this.state.media.attributes.accessibility.dataField.signLanguage==="no" && this.state.media.attributes.accessibility.dataField.fileVideoSignal[0]!=null) 
      return true;
    else 
      return false;
  }

  a11yContent = () => {
    return (
      <div className={!this.state.fullScreen && "media-a11y-container"}>
        {
          this.state.media.type === 'video' && this.validateA11ySign() ?
            <div className={!this.state.fullScreen && "AudioPlayer"}>
              {
                !this.state.fullScreen &&
                <Typography className="course-item-card-subtitle" variant="subtitle1" style={{color: "white"}}>
                  {`${this.props.language.signLanguage}:`}
                </Typography>
              }
              <Paper
                square
                elevation={15}
                className={!this.state.fullScreen ? "media-player-a11y-container" : "media-player-a11y-container-fullscreen"}
              >
                <video
                  ref="videoSign"
                  className="media-player-a11y-video"
                  id="video-sign-language"
                  preload="auto"
                  controls={false}
                  src={this.state.media.attributes.accessibility.dataField.fileVideoSignal[0].link}
                  onLoadedData={this.loadedDataSign}
                />
              </Paper>
            </div>
          :
            undefined   
        }
        {
          !this.state.fullScreen && this.state.media.type === 'video' && this.state.media.attributes.accessibility.dataField!=undefined && this.state.media.attributes.accessibility.dataField.fileAudioDescription[0]!=null ?
            <div className="AudioPlayer">
              <Typography className="course-item-card-subtitle" variant="subtitle1" style={{color: "white"}}>
                {`${this.props.language.audioDescription}:`}
              </Typography>
              <audio 
                ref="audioMediaPreview" 
                className="audio-file-preview"
                src={this.state.media.attributes.accessibility.dataField.fileAudioDescription[0].link}
                controls
              />
            </div>
          :      
            undefined
        }
        {
          !this.state.fullScreen &&
          <TextAlternatives
            fromMediaPlayer
            item={this.state.media}
            language={this.props.language}
          ></TextAlternatives>
        }
      </div>
    )
  }

  imageItem = () => {
    const a11y = this.state.media.attributes.accessibility;
    var altText = "";
    if (a11y.dataField && a11y.dataField.shortDescription !== "") {
      if (this.state.media.attributes.accessibility.dataField.imagePurpose==='deco') altText =""
      else altText = a11y.dataField.shortDescription
    } else altText = this.state.media.attributes.title;
    return (
      <img
        tabIndex={altText !== "" ? "0" : "-1"}
        className={this.state.hasA11y ? "image-media-player-paper-a11y" : "image-media-player-paper"}
        src={this.state.media.attributes.image.link}
        alt={altText}
      >
      </img>
    )
  }

  render() {
    return(
      <React.Fragment>
        <Dialog
          open={this.props.openMedia}
          onClose={this.props.handleCloseMedia}
          fullScreen
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-dialog-title"
          aria-describedby="exit-player-tooltip"
          disableBackdropClick={true}
          className="media-dialog"
          onKeyDown={this.handleNavigate}
          tabIndex={-1}
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton tabIndex={this.state.fullScreen ? "-1" : "0"} edge="start" color="inherit" onClick={this.props.handleCloseMedia} aria-label={this.props.language.close}>
                <CloseIcon />
              </IconButton>
              <Typography id="course-dialog-title" className="course-dialog-title" variant="h6">
                {`${this.props.language.seliMediaPlayer} | ${this.state.media.attributes ? this.state.media.attributes.title : ""}`}
              </Typography>
              <p id="exit-player-tooltip" className="app-tooltip">{this.props.language.pressEscCourse}</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="media-dialog-content">
            {
              this.state.media.type === 'video' ?
                <Fullscreen
                  enabled={this.state.fullScreen}
                  onChange={fullScreen => this.setState({fullScreen})}
                  onKeyDown={this.state.fullScreen && this.handleNavigate}
                >
                  <div
                    className={this.state.fullScreen ? "media-player-container-full" : "media-player-container"}
                  >
                    <div className="fullscreen-media-container">
                      {
                        this.state.isA11y ?
                          <video
                            onMouseMove={!this.state.showControls ? () => this.handleInactivity() : undefined}
                            ref={this.ref}
                            className={this.state.hasA11y && !this.state.fullScreen ? "video-media-player-a11y" : "video-media-player"}
                            aria-describedby={"video_" + this.props.id + "_longDescr"}
                            aria-labelledby={"video_" + this.props.id + "_shortDescr"}
                            controls={false}
                            onTimeUpdate={this.handleProgress}
                            muted={this.state.muted}
                            onLoadedData={this.loadedData}
                            onError={() => this.onErrorVideo(event)}
                          >
                            <source src={this.state.media.attributes.video.link} />
                            {
                              this.state.captions.length &&
                              <track kind="subtitles" src={this.state.captions[0].src} default/>
                            }
                          </video>
                        :
                          <ReactPlayer
                            onMouseMove={!this.state.showControls ? () => this.handleInactivity() : undefined}
                            ref={this.ref}
                            url={this.state.media.attributes.video.link}
                            className={this.state.hasA11y && !this.state.fullScreen ? "video-media-player-a11y" : "video-media-player"}
                            aria-describedby={"video_" + this.props.id + "_longDescr"}
                            aria-labelledby={"video_" + this.props.id + "_shortDescr"}
                            controls={false}
                            playing={this.state.playing}
                            onProgress={this.handleProgress}
                            muted={this.state.muted}
                            volume={this.state.volume}
                            onDuration={this.handleDuration}
                            onBuffer={this.handleBuffer}
                            onBufferEnd={this.handleBufferEnd}
                            config={{file: {
                              tracks: this.state.captions
                            }}}
                          />
                      }
                      {this.state.hasA11y && this.a11yContent()}
                    </div>
                    <Paper
                      square
                      elevation={15}
                      className={
                        !this.state.showControls ?
                        "media-player-controllers-dissapear" :
                        this.state.fullScreen || !this.state.hasA11y ? "media-player-controllers-container" : "media-player-controllers-container-a11y"
                      }
                    >
                      <IconButton 
                        onClick={this.handlePlayPause} 
                        className="media-player-icon-button" 
                        aria-label={!this.state.playing ? this.props.language.play : this.props.language.pause}
                      >
                        { 
                          !this.state.playing ?
                            <PlayArrowIcon className="media-player-icon"/>
                          :
                          <PauseIcon className="media-player-icon"/>
                        }
                      </IconButton>
                      <Typography className="media-player-medium-label" variant="overline" display="block" gutterBottom>
                        {this.state.timeLabel}
                      </Typography>
                      <Slider
                        step={1 / (this.state.duration)}
                        min={0}
                        max={this.state.duration}
                        valueLabelDisplay="off"
                        value={this.state.playedSeconds}
                        color="secondary"
                        onChange={(event, newValue) => this.handleSeekChange(event, newValue)}
                        className="media-player-slider"
                        aria-label={this.props.language.timePosition}
                      />
                      <IconButton
                        onClick={this.handleToggleMute}
                        className="media-player-icon-button"
                        aria-label={!this.state.muted && this.state.volume !== 0 ? this.props.language.mute : this.props.language.unmute}
                      >
                        {
                          !this.state.muted && this.state.volume !== 0 ?
                            <VolumeUpIcon className="media-player-icon"/>
                          :
                          <VolumeOffIcon className="media-player-icon"/>
                        }
                      </IconButton>
                      <Slider
                        step={0.1}
                        min={0}
                        max={1}
                        value={this.state.volume}
                        onChange={(event, newValue) => this.handleVolumeChange(event, newValue)}
                        color="secondary"
                        valueLabelDisplay="auto"
                        className="media-player-slider-small"
                        aria-label={this.props.language.volumeControl}
                      />
                      <IconButton 
                        disabled={this.state.disableCaptions} 
                        onClick={() => this.handleChange()} 
                        className={this.state.captions && this.state.captions.length ? "media-player-icon-button" : "media-player-icon-button-des" }
                        aria-label={this.props.language.Captions}
                      >
                        <SubtitlesIcon className="media-player-icon"/>
                      </IconButton>
                      <IconButton
                        onClick={this.handleToggleFullscreen}
                        className="media-player-icon-button"
                        aria-label={!this.state.fullScreen ? this.props.language.fullscreen : this.props.language.exitFullscreen}
                      >
                        {
                          !this.state.fullScreen ?
                            <FullscreenIcon className="media-player-icon"/>
                          :
                          <FullscreenExitIcon className="media-player-icon"/>
                        }
                      </IconButton>
                    </Paper>
                  </div>
                  {
                    this.state.isBuffering ?
                      <div className="media-player-loading-container">
                        <ScaleLoader
                          color={getComputedStyle(document.documentElement).getPropertyValue('--secondary')}
                          width={12}
                          radius={2}
                          margin="5px"
                          height={100}
                        />
                      </div>
                    :
                    undefined
                  }
                </Fullscreen>
              :
              undefined
            }
            {
              this.state.media.type === 'image' ?
                <div className="media-player-container">
                  <div className="fullscreen-media-container-stepper">
                    {this.imageItem()}
                    {this.state.hasA11y && this.a11yContent()}
                  </div>
                  <MobileStepper
                    className="media-mobile-stepper"
                    steps={this.props.mediaItems.length}
                    position="static"
                    variant="text"
                    activeStep={this.state.index}
                    nextButton={
                      <Button 
                        className="media-mobile-stepper-button"
                        size="small"
                        onClick={this.handleNext}
                      >
                        {this.props.language.next}
                        {<KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button
                        className="media-mobile-stepper-button"
                        size="small" 
                        onClick={this.handleBack}
                      >
                        {<KeyboardArrowLeft />}
                        {this.props.language.back}
                      </Button>
                    }
                  />
                </div>
              :
                undefined
            }
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}
