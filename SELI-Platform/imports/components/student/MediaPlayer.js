import React, { Component } from 'react';
import AppBar from '../navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import ScaleLoader from 'react-spinners/ScaleLoader';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

import ReactPlayer from 'react-player';
import Fullscreen from "react-full-screen";

const HIDE_TIME = 8000;

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showControls: false,
      url: this.props.url,
      playing: false,
      fullScreen: false,
      muted: false,
      playedSeconds: 0,
      volume: 0.8,
      timeLabel: "00:00"
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
    this.setState({ playing: !this.state.playing })
  }

  handleToggleFullscreen = () => {
    this.setState({ fullScreen: !this.state.fullScreen });
  }

  handleToggleMute = () => {
    this.setState({ muted: !this.state.muted });
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
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
    this.toTimeLabel(state.playedSeconds);
    this.setState({
      playedSeconds: state.playedSeconds,
    })
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleSeekChange = (e, newValue) => {
    this.toTimeLabel(newValue);
    this.setState({ playedSeconds: parseFloat(newValue) })
    this.player.seekTo(parseFloat(newValue));
  }

  handleVolumeChange = (e, newValue) => {
    this.setState({
      volume: parseFloat(newValue)
    }, () => {
      this.state.volume === 0 ? this.setState({muted: true}) : this.setState({muted: false})
    });
  }

  handleSeek  = (e) => {

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

  render() {
    return(
      <div style={{width: '100%'}}>
        {
          this.props.mediaType === 'video' ?
            <Fullscreen
              enabled={this.state.fullScreen}
              onChange={fullScreen => this.setState({fullScreen})}
            >
              <div
                onMouseMove={!this.state.showControls ? () => this.handleInactivity() : undefined}
                className={this.state.fullScreen ? "media-player-container-full" : "media-player-container"}
              >
                <ReactPlayer
                  ref={this.ref}
                  url={this.state.url}
                  className="video-media-player"
                  controls={false}
                  playing={this.state.playing}
                  onProgress={this.handleProgress}
                  muted={this.state.muted}
                  volume={this.state.volume}
                  onSeek={e => this.handleSeek}
                  onDuration={this.handleDuration}
                  onBuffer={this.handleBuffer}
                  onBufferEnd={this.handleBufferEnd}
                />
                <Slide direction="up" in={this.state.showControls} mountOnEnter unmountOnExit>
                  <Paper
                    square
                    elevation={15}
                    className="media-player-controllers-container"
                  >
                    <IconButton onClick={this.handlePlayPause} className="media-player-icon-button">
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
                    />
                    <IconButton
                      onClick={this.handleToggleMute}
                      className="media-player-icon-button"
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
                    />
                    <IconButton className="media-player-icon-button">
                      <SubtitlesIcon className="media-player-icon"/>
                    </IconButton>
                    <IconButton
                      onClick={this.handleToggleFullscreen}
                      className="media-player-icon-button"
                    >
                      {
                        !this.state.fullScreen ?
                          <FullscreenIcon className="media-player-icon"/>
                        :
                        <FullscreenExitIcon className="media-player-icon"/>
                      }
                    </IconButton>
                  </Paper>
                </Slide>
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
          this.props.mediaType === 'audio' ?
            <div className="audio-media-container">
              <ReactPlayer
                ref={this.ref}
                url={this.state.url}
                className="audio-media-player"
                controls={false}
                playing={this.state.playing}
                onProgress={this.handleProgress}
                muted={this.state.muted}
                volume={this.state.volume}
                onSeek={e => this.handleSeek}
                onDuration={this.handleDuration}
                onBuffer={this.handleBuffer}
                onBufferEnd={this.handleBufferEnd}
              />
              <Paper
                square
                elevation={15}
                className="audio-media-player-paper"
              >
                <LibraryMusicIcon className="audio-media-player-icon-big"/>
                <div className="audio-media-player-controls">
                  <p className="audio-media-player-text">{this.props.mediaTitle}</p>
                  <IconButton color="primary" onClick={this.handlePlayPause} className="audio-media-player-icon-button">
                    {
                      !this.state.playing ?
                        <PlayArrowIcon className="audio-media-player-icon"/>
                      :
                      <PauseIcon className="audio-media-player-icon"/>
                    }
                  </IconButton>
                  <div className="audio-media-player-row">
                    <Typography className="audio-media-player-medium-label" variant="overline" display="block" gutterBottom>
                      {this.state.timeLabel}
                    </Typography>
                    <Slider
                      step={1 / (this.state.duration)}
                      min={0}
                      max={this.state.duration}
                      valueLabelDisplay="off"
                      value={this.state.playedSeconds}
                      color="primary"
                      onChange={(event, newValue) => this.handleSeekChange(event, newValue)}
                      className="audio-media-player-slider"
                    />
                  </div>
                </div>
              </Paper>
            </div>
          :
          undefined
        }
      </div>
    )
  }
}
