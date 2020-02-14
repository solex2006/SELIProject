import React, { Component, Fragment } from 'react';

import Loading from '../tools/Loading';

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
import VideoPreview from './VideoPreview';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import ReactPlayer from 'react-player';
import { Activities } from '../../../lib/ActivitiesCollection';
//import Size from './Size'

export default class StorytellingPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      scenePlaying: 0,
      showDescription: true,
      autoPlay: true,
      playing: true,
      englishAvailable: false,
      spanishAvailable: false,
      portugueseAvailable: false,
      polishAvailable: false,
      turkishAvailable: false,
      width: 500,
      height: 500
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

  handleChangeLanguage = name => event => {
    if (name === "english") {
      this.setState({
        language: 'english'
      });
    }
    if (name === "spanish") {
      this.setState({
        language: 'spanish'
      });
    }
    if (name === "portuguese") {
      this.setState({
        language: 'portuguese'
      });
    }
    if (name === "polish") {
      this.setState({
        language: 'polish'
      });
    }
    if (name === "turkish") {
      this.setState({
        language: 'turkish'
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
    for (let i = 0; i < this.props.story.nodes.length; i++) {
      if(this.props.story.nodes[i].description.turkish !== ""){
        this.setState({ turkishAvailable: true, language: 'turkish' });
      }
      if(this.props.story.nodes[i].description.polish !== ""){
        this.setState({ polishAvailable: true, language: 'polish' });
      }
      if(this.props.story.nodes[i].description.portuguese !== ""){
        this.setState({ portugueseAvailable: true, language: 'portuguese' });
      }
      if(this.props.story.nodes[i].description.spanish !== ""){
        this.setState({ spanishAvailable: true, language: 'spanish' });
      }
      if(this.props.story.nodes[i].description.english !== ""){
        this.setState({ englishAvailable: true, language: 'english' });
      }
    }
  }

size = (width, height)=>{
  console.log(width, height)
  this.setState({
    width:width,
    height:height
  })
}
  render() {
    return(
      <div>
        <div className={this.props.link ? "storytelling-tool-link-container" : "storytelling-tool-play-container"}>
          {
            this.props.story.nodes[this.state.scenePlaying].video === "" ?
              <div>
                <ReactPlayer
                  className="storytelling-tool-audio-player"
                  url={this.props.story.nodes[this.state.scenePlaying].audio.link}
                  playing={this.state.playing}
                  onEnded={this.state.scenePlaying + 1 === this.props.story.nodes[this.state.scenePlaying] ? this.handleEnd() : () => this.handleAutoPlay()}
                />
                <div className="storytelling-player-image-container">
                  <div
                    className="file-image-preview"
                    style={{
                      backgroundImage: `url(${this.props.story.nodes[this.state.scenePlaying].image.link})`,
                      transform: `rotate(${this.props.story.nodes[this.state.scenePlaying].rotate}deg)`,
                    }}
                  ></div>
                </div>
              </div>
            :
              <ReactPlayer 
                className="course-creator-preview-player-storytelling" 
                url={this.props.story.nodes[this.state.scenePlaying].video.link}
                playing={this.state.playing}
                onEnded={this.state.scenePlaying + 1 === this.props.story.nodes[this.state.scenePlaying] ? this.handleEnd() : () => this.handleAutoPlay()}
              />
          }
          <Slide direction="down" in={this.state.showDescription} mountOnEnter unmountOnExit>
            <div className="storytelling-player-description">
              {this.props.story.nodes[this.state.scenePlaying].description[this.state.language]}
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
                  {this.props.language.leaveComment}
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
                <RadioGroup defaultValue="languages" aria-label="languages" name="customized-radios">
                  {
                    this.state.englishAvailable ?
                      <FormControlLabel 
                        control={
                          <Radio
                            checked={this.state.language === 'english'}
                            onChange={this.handleChangeLanguage('english')}
                            value="english"
                            color="primary"
                          />
                        } 
                        label={this.props.language.english} 
                      />
                    :
                        undefined
                  }
                  {
                    this.state.spanishAvailable ?
                      <FormControlLabel  
                        control={
                          <Radio
                            checked={this.state.language === 'spanish'}
                            onChange={this.handleChangeLanguage('spanish')}
                            value="spanish"
                            color="primary"
                          />
                        } 
                        label={this.props.language.spanish}
                      />
                    :
                      undefined
                  }
                  {
                    this.state.portugueseAvailable ?
                      <FormControlLabel  
                        control={
                          <Radio
                            checked={this.state.language === 'portuguese'}
                            onChange={this.handleChangeLanguage('portuguese')}
                            value="portuguese"
                            color="primary"
                          />
                        } 
                        label={this.props.language.portuguese}
                      />
                    :
                      undefined
                  }
                  {
                    this.state.polishAvailable ?
                      <FormControlLabel  
                        control={
                          <Radio
                            checked={this.state.language === 'polish'}
                            onChange={this.handleChangeLanguage('polish')}
                            value="polish"
                            color="primary"
                          />
                        } 
                        label={this.props.language.polish}
                      />
                    :
                      undefined
                  }
                  {
                    this.state.turkishAvailable ?
                      <FormControlLabel  
                        control={
                          <Radio
                            checked={this.state.language === 'turkish'}
                            onChange={this.handleChangeLanguage('turkish')}
                            value="turkish"
                            color="primary"
                          />
                        } 
                        label={this.props.language.turkish}
                      />
                    :
                      undefined
                  }
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.showDescription}
                      onChange={this.handleChange('showDescription')}
                      value="showDescription"
                      color="primary"
                    />
                  }
                  label={this.state.showDescription ? this.props.language.hideDescription : this.props.language.showDescription}
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
                  label={this.props.language.autoPlay}
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }
}
