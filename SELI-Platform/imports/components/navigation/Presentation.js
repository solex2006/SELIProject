import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SchoolIcon from '@material-ui/icons/School';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';

import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        loop: true,
        autoplay: {
          delay: 12000,
          disableOnInteraction: false
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

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    return(
      <div>
        <div className="absolute-container">
          <div className="slider-container">
            <Swiper {...this.state.params}>
              <div id="dashboard-1" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    Smart Ecosystem for Learning and Inclusion
                  </p>
                  <p className="dashboard-text-medium">
                    Learning platform
                  </p>
                  <p className="dashboard-paragraph">
                    The SELI learning platform provides the opportunity to create courses for various types of audiences, taking into consideration accessibility standards, interaction between students and stimulating the creativity of tutors and students.
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('http://seliproject.org/description')}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> Learn more
                  </Button>
                </div>
              </div>
              <div id="dashboard-2" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    We're here to teach you!
                  </p>
                  <p className="dashboard-text-medium">
                    Join our classroom and learn about whatever you want!
                  </p>
                  <Paper elevation={15} className="dashboard-paper">
                    <IconButton className="dashboard-icon-button" aria-label="menu">
                      <MenuIcon className="dashboard-icon"/>
                    </IconButton>
                    <InputBase
                      fullWidth
                      className="dashboard-input-base"
                      placeholder="What do you want to learn about?"
                      inputProps={{ 'aria-label': 'what do you want to learn about' }}
                    />
                    <IconButton className="dashboard-icon-button" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    <Divider orientation="vertical" />
                    <IconButton className="dashboard-icon-button" aria-label="directions">
                      <SchoolIcon className="dashboard-icon"/>
                    </IconButton>
                  </Paper>
                </div>
              </div>
              <div id="dashboard-3" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    Thinking on accessibility!
                  </p>
                  <AccessibilityNewIcon className="dashboard-large-icon"/>
                  <p className="dashboard-paragraph">
                    Course designed for students, young people, the unemployed, the disabled, the elderly, migrants, and people living in remote areas in Europe and the LAC.
                  </p>
                  <Button
                    className="dashboard-link-button-black"
                    onClick={() => this.redirect('http://seliproject.org/project-overview')}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> Learn more
                  </Button>
                </div>
              </div>
              <div id="dashboard-4" className="dashboard">
                <div className="dashboard-center-container">
                  <p className="dashboard-text-large">
                    Instructional design!
                  </p>
                  <p className="dashboard-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('http://seliproject.org/project-structure')}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> Learn more
                  </Button>
                  <p className="dashboard-text-large">
                    Teach on SELI!
                  </p>
                  <p className="dashboard-text-medium">
                    Create and design your own courses!
                  </p>
                  <Button
                    className="dashboard-link-button"
                    onClick={() => this.redirect('/tutorRegistration')}
                  >
                    <MoreHorizIcon className="dashboard-link-icon"/> Become a tutor
                  </Button>
                </div>
              </div>
            </Swiper>
          </div>
          <Rotate top left cascade>
            <div className="about-presentation-container">
              <p className="h1-primary-title">What is SELI?</p>
              <Divider />
            </div>
          </Rotate>
          <Zoom>
            <div className="justified-text">
              The concept of the project approaches the topic of digital exclusion and the inaccessibility of education for disadvantaged groups as forming a set of challenges that offer the potential for improving the digital competences of teachers in the LAC and EU regions, and can lead to the extensive participation of citizens who have relatively poor access to innovative technologies involved in education, training and inclusion through ICT. Project activities are related to fostering more efficient ICT solutions for better education and inclusion.
            </div>
          </Zoom>
          <div className="sponsors-section"></div>
          <div className="copyright-section">
            <p className="copyright-text">Made by SELI Team 2019</p>
          </div>
        </div>
      </div>
    )
  }
}
