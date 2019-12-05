import React, { Component } from 'react';

import Loading from '../../tools/Loading';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ReactPlayer from 'react-player';

import { Activities } from '../../../../lib/ActivitiesCollection';

export default class StorytellingPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      scenePlaying: 0,
      showDescription: true,
      autoPlay: true,
      playing: true,
    }
  }

  handleChange = name => event => {
    if (name === "showDescription") {
      this.setState({
        showDescription: !this.state.showDescription,
      });
    }
    if (name === "autoPlay") {
      this.setState({
        autoPlay: !this.state.autoPlay,
      });
    }
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handlePrevious = () => {
    if (this.state.scenePlaying - 1 >= 0) {
      this.setState({
        scenePlaying: this.state.scenePlaying - 1,
      });
    }
  }

  handleNext = () => {
    if (this.state.scenePlaying + 1 < this.props.story.nodes.length) {
      this.setState({
        scenePlaying: this.state.scenePlaying + 1,
      });
    }
    console.log("AAAAAAAAAAAAAAAAAA")
    console.log(this.state)
  }

  handleAutoPlay = () => {
    if (this.state.scenePlaying + 1 < this.props.story.nodes.length && this.state.autoPlay) {
      this.setState({
        scenePlaying: this.state.scenePlaying + 1,
      });
    }
  }

  handlePlay = () => {
    this.setState({
      playing: !this.state.playing,
    })
  }

  handleEnd = () => {

  }

  handleReplay = () => {
    this.setState({
      scenePlaying: 0,
    })
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <div className={this.props.link ? "storytelling-tool-link-container" : "storytelling-tool-container"}>
          <ReactPlayer
            className="storytelling-tool-audio-player"
            url={this.props.story.nodes[this.state.scenePlaying].audio.link}
            playing={this.state.playing}
            onEnded={this.state.scenePlaying + 1 === this.props.story.nodes[this.state.scenePlaying] ? this.handleEnd() : () => this.handleAutoPlay()}
          />
          <div
            className="storytelling-player-image-container"
            style={{backgroundImage: `url(${this.props.story.nodes[this.state.scenePlaying].image.link})`}}
          ></div>
          <Slide direction="down" in={this.state.showDescription} mountOnEnter unmountOnExit>
            <div className="storytelling-player-description">
              {this.props.story.nodes[this.state.scenePlaying].description}
            </div>
          </Slide>
          <div className="storytelling-player-actions">
            {
              this.props.comments ?
                <Button
                  variant="outlined"
                  className="storytelling-player-button"
                  onClick={() => this.props.showCommentDialog()}
                >
                  Leave a comment
                </Button>
              :
              undefined
            }
            <Fab
              className="storytelling-player-fab"
              onClick={() => this.handlePlay()}
            >
              {
                this.state.playing ?
                  <PauseIcon className="storytelling-player-fab-icon"/>
                :
                <PlayArrowIcon className="storytelling-player-fab-icon"/>
              }

            </Fab>
            <Fab
              className="storytelling-player-fab"
              onClick={() => this.handleReplay()}
            >
              <ReplayIcon className="storytelling-player-fab-icon"/>
            </Fab>
            <Fab
              style={{marginLeft: '1vw'}}
              className="storytelling-player-fab"
              onClick={() => this.handlePrevious()}
              disabled={this.state.scenePlaying === 0}
            >
              <SkipPreviousIcon className="storytelling-player-fab-icon"/>
            </Fab>
            <Fab
              className="storytelling-player-fab"
              onClick={() => this.handleNext()}
              disabled={this.state.scenePlaying === this.props.story.nodes.length - 1}
            >
              <SkipNextIcon className="storytelling-player-fab-icon"/>
            </Fab>
            <IconButton onClick={(event) => this.handleClick(event)} className="storytelling-player-more-menu">
              <MoreVertIcon className="storytelling-player-more-menu-icon"/>
            </IconButton>
            <Popover
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <div className="storytelling-player-pop-menu">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.showDescription}
                      onChange={this.handleChange('showDescription')}
                      value="showDescription"
                      color="primary"
                    />
                  }
                  label={this.state.showDescription ? "Hide description" : "Show description"}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.autoPlay}
                      onChange={this.handleChange('autoPlay')}
                      value="autoPlay"
                      color="primary"
                    />
                  }
                  label="Auto play"
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }
}
