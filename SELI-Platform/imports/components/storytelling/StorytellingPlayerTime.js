import React from 'react';

import Fab from '@material-ui/core/Fab';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import StorytelingFrames from './StorytellingFrames';
import ReactPlayer from 'react-player';

export default class StorytellingPlayerTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      scenePlaying: 0,
      imagePlaying: 0,
      scriptPlaying: 0,
      images: [],
      scripts: [],
      imageValue: undefined,
      scriptValue: undefined,
      showDescription: true,
      autoPlay: true,
      playing: false,
      available: {
        english: false,
        spanish: false,
        portuguese: false,
        polish: false,
        turkish: false,
      },
      languages: ['turkish', 'polish', 'portuguese', 'spanish', 'english'],
      width: 500,
      height: 500,
      intervalFrame: "start"
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
    let languages = this.state.languages;
    languages.map((languageItem) => {
      if (name === languageItem) {
        this.setState({
          language: languageItem,
        });
        if (this.state.scriptPlaying > 0){
          this.setState({
            scriptValue: this.state.scripts[this.state.scriptPlaying - 1].script[languageItem],
          });
        } else if (this.state.scenePlaying > 0 && this.props.story.nodes[this.state.scenePlaying - 1].scripts.length > 0) {
          this.setState({
            scriptValue: this.props.story.nodes[this.state.scenePlaying - 1].scripts[this.props.story.nodes[this.state.scenePlaying - 1].scripts.length - 1].script[languageItem],
          });
        }
      }
    })
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
      this.settingStates(this.state.scenePlaying - 1);
      if (this.state.scenePlaying === 1) {
        this.cleanData();
      } else {
        this.handleFrame("scenes");
        this.handleSelect(this.state.scenePlaying - 1);
      }
    }
  }

  handleNext = () => {
    if (this.state.scenePlaying + 1 < this.props.story.nodes.length) {
      this.handleFrame("scenes");
      this.settingStates(this.state.scenePlaying + 1);
      this.handleSelect(this.state.scenePlaying + 1);
    }
  }

  handleAutoPlay = () => {
    if (this.state.autoPlay) {
      if (this.state.scenePlaying + 1 < this.props.story.nodes.length) {
        this.settingStates(this.state.scenePlaying + 1);
      } else {
        this.handleFrame("end");
      }
    }
  }

  handleSelect = (indexSelected) => {
    let selectedImages = this.props.story.nodes[indexSelected - 1].images;
    let selectedScripts = this.props.story.nodes[indexSelected - 1].scripts;
    if (selectedImages.length){
      this.setState({
        imageValue: selectedImages[selectedImages.length - 1],
      });
    }
    if (selectedScripts.length){
      this.setState({
        scriptValue: selectedScripts[selectedScripts.length - 1].script[this.state.language],
      });
    }
  }

  handleReplay = () => {
    this.cleanData();
    /* this.refs.storytellingPlayer.seekTo(0, 'seconds'); */
  }

  settingStates = (indexSelected) => {
    this.setState({
      scenePlaying: indexSelected,
      imagePlaying: 0,
      scriptPlaying: 0,
      images: this.props.story.nodes[indexSelected].images,
      scripts: this.props.story.nodes[indexSelected].scripts,
    });
  }

  cleanData = () => {
    this.setState({
      imageValue: undefined,
      scriptValue: undefined,
    }, () => {
      this.handleFrame("start");
      this.settingStates(0);
    })
  }

  handlePlay = () => {
    this.setState({
      playing: !this.state.playing,
    })
  }

  handleFrame = (intervalFrame) => {
    this.setState({
      intervalFrame,
    })
  }

  onProgress = ({ playedSeconds }) => {
    if (
      this.state.images.length && 
      this.state.imagePlaying < this.state.images.length &&
      playedSeconds > this.state.images[this.state.imagePlaying].timestamp) 
    {
      this.setState({
        imagePlaying: this.state.imagePlaying + 1,
        imageValue: this.state.images[this.state.imagePlaying],
      })
    }
    if (
      this.state.scripts.length &&
      this.state.scriptPlaying < this.state.scripts.length &&
      playedSeconds > this.state.scripts[this.state.scriptPlaying].timestamp) 
    {
      this.setState({
        scriptPlaying: this.state.scriptPlaying + 1,
        scriptValue: this.state.scripts[this.state.scriptPlaying].script[this.state.language],
      })
    }
  }

  componentDidMount() {
    let languages = this.state.languages;
    let available = this.state.available;
    languages.map((languageItem) =>{
      for (let i = 0; i < this.props.story.nodes.length; i++) {
        if (this.state.available[languageItem] === false) {
          this.props.story.nodes[i].scripts.map((item) => {
            if(item.script[languageItem] !== ""){
              available[languageItem] = true;
              this.setState({ language: languageItem, });
            }
          })
        }
      }
    })
    this.setState({ 
      available,
    });
    this.settingStates(0);
  }

  size = (width, height)=>{
    this.setState({
      width,
      height,
    })
  }

  render() {
    return(
      <div>
        <div className="storytelling-tool-play-container-time" style={this.state.intervalFrame === "end" ? {"background-color": "#ffffff"} : undefined}>
          {
            this.state.intervalFrame === "scenes" ?
              <div>
                <ReactPlayer
                  ref="storytellingPlayer"
                  className="storytelling-tool-audio-player-time"
                  url={this.props.story.nodes[this.state.scenePlaying].audio.link}
                  playing={this.state.playing}
                  progressInterval={100}
                  onProgress={this.onProgress}
                  onEnded={() => this.handleAutoPlay()}
                />
                <div className="storytelling-player-image-container-time">
                  <div
                    className="file-image-preview"
                    style={{
                      backgroundImage: this.state.imageValue && this.state.imageValue.file !== "" ? `url(${this.state.imageValue.file.link})` : "none",
                      transform: `rotate(${this.state.imageValue && this.state.imageValue.rotate ? this.state.imageValue.rotate : 0}deg)`,
                    }}
                  ></div>
                </div>
                <Slide direction="down" in={this.state.showDescription} mountOnEnter unmountOnExit>
                  <div className="storytelling-player-description-time">
                    {this.state.scriptValue}
                  </div>
                </Slide>
              </div>
            : 
              <StorytelingFrames
                story={this.props.story}
                playing={this.state.playing}
                intervalFrame={this.state.intervalFrame}
                handleFrame={this.handleFrame.bind(this)}
                language={this.props.language}
              />
          }
          <div className="storytelling-player-actions-time">
            {
              this.props.comments ?
                <Button
                  variant="outlined"
                  className="storytelling-player-button-time"
                  onClick={() => this.props.showCommentDialog()}
                >
                  {this.props.language.leaveComment}
                </Button>
              :
              undefined
            }
            <Fab
              className="storytelling-player-fab-time"
              onClick={() => this.handlePlay()}
            >
              {
                this.state.playing ?
                  <PauseIcon className="storytelling-player-fab-icon-time"/>
                :
                <PlayArrowIcon className="storytelling-player-fab-icon-time"/>
              }
            </Fab>
            <Fab
              className="storytelling-player-fab-time"
              onClick={() => this.handleReplay()}
            >
              <ReplayIcon className="storytelling-player-fab-icon-time"/>
            </Fab>
            <Fab
              style={{marginLeft: '1vw'}}
              className="storytelling-player-fab-time"
              onClick={() => this.handlePrevious()}
              disabled={this.state.scenePlaying === 0}
            >
              <SkipPreviousIcon className="storytelling-player-fab-icon-time"/>
            </Fab>
            <Fab
              className="storytelling-player-fab-time"
              onClick={() => this.handleNext()}
              disabled={this.state.scenePlaying === this.props.story.nodes.length - 1}
            >
              <SkipNextIcon className="storytelling-player-fab-icon-time"/>
            </Fab>
            <IconButton onClick={(event) => this.handleClick(event)} className="storytelling-player-more-menu-time">
              <MoreVertIcon className="storytelling-player-more-menu-icon-time"/>
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
              <div className="storytelling-player-pop-menu-time">
                <RadioGroup defaultValue="languages" aria-label="languages" name="customized-radios">
                  {
                    this.state.languages.map((languageItem) => {
                      if (this.state.available[languageItem]) {
                        return(
                          <FormControlLabel 
                            control={
                              <Radio
                                checked={this.state.language === languageItem}
                                onChange={this.handleChangeLanguage(languageItem)}
                                value="english"
                                color="primary"
                              />
                            } 
                            label={this.props.language[languageItem]} 
                          />
                        )
                      }
                    })
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
