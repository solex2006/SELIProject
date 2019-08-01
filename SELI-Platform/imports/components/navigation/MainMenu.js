import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { scaleRotate as Menu } from 'react-burger-menu';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import administrationOptions from '../../../lib/administrationOptions';
import toCamelCase from '../../../lib/toCamelCase';

import { MdMenu } from "react-icons/md";

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuWidth: '305px',
      menuOpen: false,
      redirect: false,
      options: administrationOptions,
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

  showComponent(option){
    this.closeMenu();
    this.props.showComponent(toCamelCase(option));
  }

  render() {
    return(
      <div>
        <Menu
          pageWrapId={ "page-wrap" }
          outerContainerId={ "outer-container" }
          width={ this.state.menuWidth }
          isOpen={ this.state.menuOpen }
          customBurgerIcon={
            <MdMenu
              color={ "#FFFFFF" }
              size={ "1.75em" }
            />
          }
          onStateChange={(state) => this.handleMenuStateChange(state)}>
          <div onClick={() => this.showComponent("")} className="menu-title">Main menu</div>
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
                              <div onClick={() => this.showComponent(suboptions.label)} className="sub-menu-option">{suboptions.label}</div>
                            )
                          })
                        }
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }
            <div className="options-padding" style={{height: '5vh'}}></div>
          </div>
        </Menu>
      </div>
  )
}
}
