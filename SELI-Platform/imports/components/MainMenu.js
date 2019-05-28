import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';

/* Sub-options */
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuWidth: '300px',
      expanded: 'coursesExpansionPanel',
      menuOpen: false
    }
  }

  handleMenuStateChange (state) {
   this.setState({menuOpen: state.isOpen})
  }

  closeMenu () {
   this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  showForm(form){
    this.closeMenu();
    this.props.showForm(form);
  }

  render() {
    return(
      <div>
        <Menu
          pageWrapId={ "page-wrap" }
          outerContainerId={ "outer-container" }
          width={ this.state.menuWidth }
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleMenuStateChange(state)}>
          <div className="menu-title">SELI CMS</div>
          <div className="options-container">
            <ExpansionPanel
              expanded={this.state.expanded === 'coursesExpansionPanel'}
              onChange={this.handleChange('coursesExpansionPanel')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Course administration</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="sub-menu-container">
                  <div onClick={() => this.showForm("CourseForm")} className="sub-menu-option">Create course</div>
                  <div onClick={() => this.showForm()} className="sub-menu-option">Courses list</div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Menu>
      </div>
  )
}
}
