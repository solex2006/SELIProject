import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export default class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      muted: false,
      playedSeconds: 0,
      volume: 0.8,
      timeLabel: "00:00",
      valuetext: "",
      open: false,
      anchorEl: null
    }
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
    if (!this.state.playing) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleToggleMute = () => {
    this.setState({ muted: !this.state.muted });
  }

  handleVolumeChange = (e, newValue) => {
    this.setState({
      volume: parseFloat(newValue)
    }, () => {
      this.player.volume = this.state.volume;
      this.state.volume === 0 ? this.setState({muted: true}) : this.setState({muted: false});
    });
  }

  handleSeekChange = (e, newValue) => {
    var newFloatValue = parseFloat(newValue);
    this.toTimeLabel(newValue);
    this.setState({ playedSeconds: newFloatValue });
    this.player.currentTime = newFloatValue;
  }

  handleProgress = state => {
    var time = 0;
    time = this.player.currentTime;
    this.toTimeLabel(time);
    this.setState({
      playedSeconds: time,
    })
  }

  toTimeLabel = (newTime) => {
    let dateObj = new Date(newTime * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeLabel = minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
    let timeSplit = timeLabel.split(":");
    timeSplit = `${
      timeSplit[0].replace(/^0+/, '') === "" ? "0" : timeSplit[0].replace(/^0+/, '')
      } ${this.props.labels.timeLabels.minutes}, ${timeSplit[1].replace(/^0+/, '') === "" ? "0" : timeSplit[1].replace(/^0+/, '')
      } ${this.props.labels.timeLabels.seconds}`;
    this.setState({
      valuetext: timeSplit,
      timeLabel: timeLabel,
    });
  }

  loadedData = () => {
    this.handleDuration(this.player.duration);
  }

  handleDuration = (duration) => {
    this.setState({ duration })
  }

  downloadFile = () => {

  }

  handleOptions = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget)
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    })
  }

  ref = player => {
    this.player = player
  }

  render() {
    return(
      <React.Fragment>
        <Paper
          square
          elevation={15}
          className="a11y-audio-player-controllers-container"
          id={this.props.audioId}
          aria-describedby={this.props.ariaDescribedby}
          aria-labelledby={this.props.ariaLabelledby}
          tabIndex={0}
        >
          <audio
            ref={this.ref}
            src={this.props.src}
            muted={this.state.muted}
            volume={this.state.volume}
            onLoadedData={this.loadedData}
            onTimeUpdate={this.handleProgress}
            controls={false}
          />
          <IconButton
            onClick={this.handlePlayPause} 
            className="a11y-audio-player-icon-button" 
            aria-label={!this.state.playing ? this.props.labels.play : this.props.labels.pause}
          >
            { 
              !this.state.playing ?
                <PlayArrowIcon className="a11y-audio-player-icon"/>
              :
              <PauseIcon className="a11y-audio-player-icon"/>
            }
          </IconButton>
          <Typography className="a11y-audio-player-medium-label" variant="overline" display="block" gutterBottom>
            {this.state.timeLabel}
          </Typography>
          <Slider
            step={10}
            min={0}
            max={this.state.duration}
            valueLabelDisplay="off"
            value={this.state.playedSeconds}
            color="secondary"
            onChange={(event, newValue) => this.handleSeekChange(event, newValue)}
            className="a11y-audio-player-slider"
            aria-label={this.props.labels.timePosition}
            aria-valuetext={this.state.valuetext}
          />
          <div
            className="a11y-audio-player-volume-container"
          >
            <Slider
              step={0.1}
              min={0}
              max={1}
              value={this.state.volume}
              onChange={(event, newValue) => this.handleVolumeChange(event, newValue)}
              color="secondary"
              valueLabelDisplay="auto"
              className="a11y-audio-player-slider-small"
              aria-label={this.props.labels.volumeControl}
            />
            <IconButton
              onClick={() => this.handleToggleMute()}
              className="a11y-audio-player-icon-button"
              aria-label={!this.state.muted && this.state.volume !== 0 ? this.props.labels.mute : this.props.labels.unmute}
            >
              {
                !this.state.muted && this.state.volume !== 0 ?
                  <VolumeUpIcon className="a11y-audio-player-icon"/>
                :
                <VolumeOffIcon className="a11y-audio-player-icon"/>
              }
            </IconButton>
          </div>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleOptions} 
            className="a11y-audio-player-icon-button"
            aria-label={this.props.labels.options}
          >
            <MoreVertIcon className="a11y-audio-player-icon"/>
          </IconButton>
          <Popover
            id={this.state.open ? `popover-${this.props.audioId}` : undefined}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader" className="list-subheader">
                  {this.props.labels.options.toUpperCase()}
                </ListSubheader>
              }
              className="menu-item-list"
            >
              <Divider light={false}/>
              <a href={this.props.src} download>
                <ListItem button onClick={() => this.downloadFile()}>
                  <ListItemIcon>
                    <CloudDownloadIcon />
                  </ListItemIcon>
                  <ListItemText primary={this.props.labels.optionLabels.download} />
                </ListItem>
              </a>
            </List>
          </Popover>
        </Paper>
      </React.Fragment>
    )
  }
}
