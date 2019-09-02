import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';

import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';


export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        loop: true,
        autoplay: {
          delay: 7500,
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

  render() {
    return(
      <div>
        <div className="absolute-container">
          <div className="slider-container">
            <Swiper {...this.state.params}>
              <div id="dashboard-1" className="dashboard"></div>
              <div id="dashboard-2" className="dashboard"></div>
              <div id="dashboard-3" className="dashboard"></div>
              <div id="dashboard-4" className="dashboard"></div>
              <div id="dashboard-5" className="dashboard"></div>
              <div id="dashboard-6" className="dashboard"></div>
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
