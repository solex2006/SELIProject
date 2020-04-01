import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import StopIcon from '@material-ui/icons/Stop';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
          <p
            className="storytelling-item-name"
            onClick={() => this.props.selectNode(this.props.index)}
          >
            {`${this.props.node.name}`}
          </p>
          <Paper
            tabIndex="0"
            elevation={8}
            className="storytelling-item-node-scene"
            onClick={() => this.props.selectNode(this.props.index)}
            onKeyDown={() => this.props.selectNode(this.props.index)}
          ></Paper>
          <div className="storytelling-item-actions">
            <Tooltip
              title={this.props.language.addNewScene}
              leaveTouchDelay={0}
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
            {
              this.props.index !== 1 ?
              <Tooltip
                title={this.props.language.moveSceneUp}
                enterDelay={1000}
                leaveDelay={10}
              >
                <Fab
                  className="storytelling-item-fab"
                  size="small"
                  onClick={() => this.props.moveNodeUp(this.props.index)}
                >
                  <ArrowUpwardIcon className="storytelling-item-fab-icon" fontSize="small"/>
                </Fab>
              </Tooltip>
            :
              undefined
            }
            
            {
              this.props.index !== this.props.nodes.length - 1 &&
              this.props.nodes[this.props.index + 1].type !== 'end' ?
                <Tooltip
                  title={this.props.language.moveSceneDown}
                  enterDelay={1000}
                  leaveDelay={10}
                >
                  <Fab
                    className="storytelling-item-fab"
                    size="small"
                    onClick={() => this.props.moveNodeDown(this.props.index)}
                  >
                    <ArrowDownwardIcon className="storytelling-item-fab-icon" fontSize="small"/>
                  </Fab>
                </Tooltip>
              :
                undefined
            }
            {
              this.props.index === this.props.nodes.length - 1 ? 
                <Tooltip
                  title={this.props.language.addFinalScene}
                  enterDelay={1000}
                  leaveDelay={10}
                >
                  <Fab
                    className="storytelling-item-fab"
                    size="small"
                    onClick={() => this.props.addEndNode(this.props.index)}
                    disabled={this.props.index !== this.props.nodes.length - 1}
                  >
                    <StopIcon className="storytelling-item-fab-icon" fontSize="small"/>
                  </Fab>
                </Tooltip>
              : undefined
            }
          </div>
          <div className="storytelling-selected-empty-container"></div>
        </div>
        {
          this.props.index !== this.props.nodes.length - 1 ?
            <ArrowDownwardIcon fontSize="large" className="storytelling-arrow-item-icon"/>
          :
          undefined
        }
      </div>
    )
  }
}
