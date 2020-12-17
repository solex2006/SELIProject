import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { scaleRotate as Menu } from 'react-burger-menu';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import tutorProfile from '../../../lib/tutorProfile';
import administratorProfile from '../../../lib/administratorProfile';
import studentProfile from '../../../lib/studentProfile';

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
    if(component === 'STUDENT_DASHBOARD_SITE_URL'){
      this.redirect(Meteor.settings.public.STUDENT_DASHBOARD_SITE_URL);
    }else if(component === 'documentation'){
      this.redirect("/manual/home.html");
    }
    else{
      this.props.showComponent(component);
    }
      
    }

  componentDidMount(){
    if (this.props.user.profile.type === 'tutor') {
      this.setState({
        options: tutorProfile,
      });
    }
    if (this.props.user.profile.type === 'administrator') {
      this.setState({
        options: administratorProfile,
      });
    }
    if (this.props.user.profile.type === 'student') {
      this.setState({
        options: studentProfile,
      });
    }
  }

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  buildHandleEnterKeyPress = (onClick) => ({ key }) => {
    if (key === 'Enter') { 
      //console.log(onClick)
      onClick(); 
    }
  };

  buildHandleEnterKeyPressMenu= (e)=>{
    this.setState({
      menuOpen: true, 
    }) 
    /* if (key === 'Enter') { 
      console.log("Enter")
      this.setState({
        menuOpen: true, 
      }) 
    } */
  }
  render() {
    return(
      <React.Fragment >
        <Menu
          // customOnKeyDown={this.closeAllMenusOnEsc()} 
          pageWrapId={ "page-wrap" }
          outerContainerId={ "outer-container" }
          isOpen={ this.state.menuOpen }
          tabIndex="0"
          onKeyPress={ this.buildHandleEnterKeyPressMenu }
          customBurgerIcon={
            <MdMenu 
              tabIndex="-1"
              //onKeyPress={ this.buildHandleEnterKeyPressMenu } 
              color={ "#FFFFFF" }
              size={ "1.75em" }
            />
          }
          onStateChange={(state) => this.handleMenuStateChange(state)}
          className="menu-left-panel-container"
        >
          <Button tabIndex={this.state.menuOpen ? "0" : "-1"} onClick={() => this.showComponent("home")} className="menu-title">{this.props.language.seliLearningPlatform}</Button>
          <Divider className="user-menu-profile-divider" light={true}/>
          <div className="options-container">
            {
              this.state.options.map(options => {
                return(
                  <ExpansionPanel
                    tabIndex="-1" 
                    className="menu-expansion-panel"
                    defaultExpanded={ true }
                    onChange={this.handleChange(options.label[this.props.language.languageIndex])}
                  >
                    <ExpansionPanelSummary
                      tabIndex="-1" 
                      className="menu-expansion-summary"
                      expandIcon={
                        <ExpandMoreIcon tabIndex={this.state.menuOpen ? "0" : "-1"} className="menu-expand-more-icon"/>
                      }
                    >
                    <Typography tabIndex="-1"   className="menu-option">{options.label[this.props.language.languageIndex]}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails tabIndex="-1" >
                      <div tabIndex="-1"  className="sub-menu-container">
                        {
                          options.suboptions.map((suboptions, index) => {
                            return(
                              <div 
                                tabIndex={this.state.menuOpen ? "0" : "-1"}
                                onClick={() => this.showComponent(suboptions.component)}
                                onKeyPress={ this.buildHandleEnterKeyPress(() => this.showComponent(suboptions.component)) } 
                                className="sub-menu-option">{suboptions.label[this.props.language.languageIndex]}
                              </div>
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
              <IconButton tabIndex={this.state.menuOpen ? "0" : "-1"} onClick={() => this.redirect('http://seliproject.org/')} className="social-icon-button">
                <FaGlobe/>
              </IconButton>
              <IconButton tabIndex={this.state.menuOpen ? "0" : "-1"} onClick={() => this.redirect('https://www.facebook.com/SELIProject/?ref=br_rs')} className="social-icon-button">
                <FaFacebookSquare/>
              </IconButton>
            </div>
            <div className="options-padding" style={{height: '5vh'}}></div>
          </div>
        </Menu>
      </React.Fragment>
  )
}
}
