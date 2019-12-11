import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class StorytellingStart extends React.Component {
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
            elevation={8}
            className="storytelling-item-node-start"
            onClick={() => this.props.selectNode(this.props.index)}
          ></Paper>
          <div className="storytelling-item-actions">
            <Tooltip
              title="Add new scene"
              enterDelay={1000}
              leaveDelay={10}
            >
              <Fab
                className="storytelling-item-fab"
                size="small"
                onClick={() => this.props.addSingleNode(this.props.index)}
              >
                <AddIcon className="storytelling-item-fab-icon" fontSize="small"/>
              </Fab>
            </Tooltip>
          </div>
          <div className="storytelling-selected-empty-container"></div>
        </div>
        {
          this.props.nodes.length > 1 ?
            <ArrowDownwardIcon fontSize="large" className="storytelling-arrow-item-icon"/>
          :
          undefined
        }
      </div>
    )
  }
}
