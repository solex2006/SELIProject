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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
