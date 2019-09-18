import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { scaleRotate as Menu } from 'react-burger-menu';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import tutorProfile from '../../../lib/tutorProfile';

import { FaFacebookSquare } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import { MdMenu } from "react-icons/md";

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuWidth: '305px',
      menuOpen: false,
      options: [],
    }
  }

  handleMenuStateChange(state) {
   this.setState({menuOpen: state.isOpen})
  }

  closeMenu() {
   this.setState({menuOpen: false})
  }

  toggleMenu() {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  showComponent(component){
    this.closeMenu();
    this.props.showComponent(component);
  }

  componentDidMount(){
    if (this.props.user.profile.type === 'tutor') {
      this.setState({
        options: tutorProfile,
      })
    }
  }

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    return(
      <div>
        <Menu
          pageWrapId={ "page-wrap" }
          outerContainerId={ "outer-container" }
          isOpen={ this.state.menuOpen }
          customBurgerIcon={
            <MdMenu
              color={ "#FFFFFF" }
              size={ "1.75em" }
            />
          }
          onStateChange={(state) => this.handleMenuStateChange(state)}>
          <div onClick={() => this.showComponent("home")} className="menu-title">SELI LEARNING PLATFORM</div>
          <Divider className="user-menu-profile-divider" light={true}/>
          <div className="options-container">
            {
              this.state.options.map(options => {
                return(
                  <ExpansionPanel
                    className="menu-expansion-panel"
                    defaultExpanded={ true }
                    onChange={this.handleChange(options.label)}>
                    <ExpansionPanelSummary
                      className="menu-expansion-summary"
                      expandIcon={
                        <ExpandMoreIcon className="menu-expand-more-icon"/>
                      }
                    >
                      <Typography className="menu-option">{options.label}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="sub-menu-container">
                        {
                          options.suboptions.map(suboptions => {
                            return(
                              <div onClick={() => this.showComponent(suboptions.component)} className="sub-menu-option">{suboptions.label}</div>
                            )
                          })
                        }
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }
            <div className="main-menu-social-container">
              <IconButton onClick={() => this.redirect('http://seliproject.org/')} className="social-icon-button">
                <FaGlobe/>
              </IconButton>
              <IconButton onClick={() => this.redirect('https://www.facebook.com/SELIProject/?ref=br_rs')} className="social-icon-button">
                <FaFacebookSquare/>
              </IconButton>
            </div>
            <div className="options-padding" style={{height: '5vh'}}></div>
          </div>
        </Menu>
      </div>
  )
}
}
