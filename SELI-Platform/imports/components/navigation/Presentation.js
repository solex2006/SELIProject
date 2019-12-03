import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SchoolIcon from '@material-ui/icons/School';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      params: {
        loop: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: true,
        },
        speed: 2000,
        spaceBetween: 1000,
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
    }
  }

  handleAutoplay = () => {
    let playing = this.state.playing;
    if (playing) {
      this.state.swiper.autoplay.stop();
    }
    else {
      this.state.swiper.autoplay.start();
    }
    playing = !playing;
    this.setState({
      playing: playing,
    });
  }

  redirect = (url, external) => {
    if (external) {
      var win = window.open(url, '_blank');
      win.focus();
    }
    else {
      this.props.history.push(url);
    }
  }

  updateSwiper = (swiper) => {
    this.setState({
      swiper: swiper,
    });
  }

  render() {
    return(
      <div>
        <div className="absolute-container">
          <div className="slider-container">
            <Swiper getSwiper={(swiper) => this.updateSwiper(swiper)} {...this.state.params}>
              <div id="dashboard-1" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    {this.props.language.seliFullText}
                  </p>
                  <p className="dashboard-text-medium">
                    {this.props.language.learningPlatform}
                  </p>
                  <p className="dashboard-paragraph">
                    {this.props.language.seliPresentation}
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('http://seliproject.org/description', true)}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> {this.props.language.learnMore}
                  </Button>
                </div>
              </div>
              <div id="dashboard-2" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    {this.props.language.hereToTeachYou}
                  </p>
                  <p className="dashboard-text-medium">
                    {this.props.language.joinOurClassroom}
                  </p>
                  <Paper elevation={15} className="dashboard-paper">
                    <InputBase
                      fullWidth
                      className="dashboard-input-base"
                      placeholder={this.props.language.learnAbout}
                      inputProps={{ 'aria-label': 'what do you want to learn about' }}
                    />
                    <IconButton className="dashboard-icon-button" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    <Divider orientation="vertical" />
                  </Paper>
                </div>
              </div>
              <div id="dashboard-3" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    {this.props.language.thinkingOnAccessibility}
                  </p>
                  <AccessibilityNewIcon className="dashboard-large-icon"/>
                  <p className="dashboard-paragraph">
                    {this.props.language.accessibilityPresentation}
                  </p>
                  <Button
                    className="dashboard-link-button-black"
                    onClick={() => this.redirect('http://seliproject.org/project-overview', true)}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> {this.props.language.learnMore}
                  </Button>
                </div>
              </div>
              <div id="dashboard-4" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    {this.props.language.instructionalDesign}
                  </p>
                  <p className="dashboard-paragraph">
                    {this.props.language.instructionalDesignPresentation}
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('http://seliproject.org/project-structure', true)}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> {this.props.language.learnMore}
                  </Button>
                  <p className="dashboard-text-large">
                    {this.props.language.teachOnSeli}
                  </p>
                  <p className="dashboard-text-medium">
                    {this.props.language.teachOnSeliText}
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('/tutorRegistration', false)}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> {this.props.language.becomeATutor}
                  </Button>
                </div>
              </div>
            </Swiper>
            <Tooltip title={this.state.playing ? this.props.language.stopSlider : this.props.language.resumeSlider} placement="left">
              <Fab onClick={() => this.handleAutoplay()} className="control-slider-fab" color="primary" size="small">
                {
                  this.state.playing ?
                    <PauseIcon/>
                  :
                  <PlayArrowIcon/>
                }
              </Fab>
            </Tooltip>
          </div>
          <Rotate top left cascade>
            <div className="about-presentation-container">
              <p className="h1-primary-title">{this.props.language.whatIsSeli}</p>
              <Divider />
            </div>
          </Rotate>
          <Zoom>
            <div className="justified-text">
              {this.props.language.whatIsSeliText}
            </div>
          </Zoom>
          <div className="sponsors-section"></div>
          <div className="copyright-section">
            <p className="copyright-text">{this.props.language.madeBySeliTeam}</p>
          </div>
        </div>
      </div>
    )
  }
}
