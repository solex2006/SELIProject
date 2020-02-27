import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export default class StorytellingEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="storytelling-item-full-container">
        <div className="storytelling-item-row-container">
          {
            this.props.selectedNode === this.props.index ?
              <ArrowRightIcon fontSize="large" className="storytelling-selected-item-icon"/>
            :
            <div className="storytelling-selected-empty-container"></div>
          }
          <p
            className="storytelling-item-name"
            onClick={() => this.props.selectNode(this.props.index)}
          >
            {`${this.props.node.name}`}
          </p>
          <Paper
            tabIndex="0"
            elevation={8}
            className="storytelling-item-node-end"
            onClick={() => this.props.selectNode(this.props.index)}
            onKeyDown={() => this.props.selectNode(this.props.index)}
          ></Paper>
          <div className="storytelling-selected-empty-container"></div>
          <div className="storytelling-selected-empty-container"></div>
        </div>
      </div>
    )
  }
}
