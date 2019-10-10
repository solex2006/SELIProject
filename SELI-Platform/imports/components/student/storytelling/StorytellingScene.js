import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import StopIcon from '@material-ui/icons/Stop';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export default class StorytellingScene extends React.Component {
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
          <p className="storytelling-item-name">{`${this.props.node.name}`}</p>
          <Paper
            elevation={8}
            className="storytelling-item-node-scene"
            onClick={() => this.props.selectNode(this.props.index)}
          ></Paper>
          <div className="storytelling-item-actions">
            <Tooltip
              title="Add new scene"
              leaveTouchDelay={0}
            >
              <Fab
                className="storytelling-item-fab"
                size="small"
                onClick={() => this.props.addSingleNode()}
                disabled={this.props.node.child !== undefined}
              >
                <AddIcon className="storytelling-item-fab-icon" fontSize="small"/>
              </Fab>
            </Tooltip>
            <Tooltip
              title="Add final scene"
              leaveTouchDelay={0}
            >
              <Fab
                className="storytelling-item-fab"
                size="small"
                onClick={() => this.props.addEndNode()}
                disabled={this.props.node.child !== undefined}
              >
                <StopIcon className="storytelling-item-fab-icon" fontSize="small"/>
              </Fab>
            </Tooltip>
          </div>
          <div className="storytelling-selected-empty-container"></div>
        </div>
      </div>
    )
  }
}
