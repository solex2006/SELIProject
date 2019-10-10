import React, { Component } from 'react';

import AppBar from '../../navigation/AppBar'; '../../s'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../../style/theme';

import Loading from '../../tools/Loading';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';

import StorytellingStart from './StorytellingStart';
import StorytellingScene from './StorytellingScene';
import StorytellingEnd from './StorytellingEnd';

export default class StorytellingTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [
        {
          type: 'start',
          name: 'Start',
          description: '',
          image: undefined,
          audio: undefined,
          ordinal: 0,
          child: undefined,
          _id: Math.random(),
        },
      ],
      selectedNode: 0,
    }
  }

  handleClose = () => {
    this.setState({ chekingSesion: false });
  }

  handleChange = name => event => {
    let nodes = this.state.nodes;
    if (name === 'name') {
      nodes[this.state.selectedNode].name = event.target.value;
    }
    if (name === 'description') {
      nodes[this.state.selectedNode].description = event.target.value;
    }
    this.setState({
      nodes: nodes,
    })
  }

  addSingleNode = () => {
    let nodes = this.state.nodes;
    let newNode = nodes[nodes.length - 1];
    nodes[this.state.selectedNode].child = newNode;
    nodes.push({
      type: 'scene',
      name: 'New scene',
      description: '',
      image: undefined,
      audio: undefined,
      ordinal: nodes.length,
      child: undefined,
      _id: Math.random(),
    });
    this.setState({
      nodes: nodes,
      selectedNode: nodes.length - 1,
    });
  }

  addEndNode = () => {
    let nodes = this.state.nodes;
    nodes[this.state.selectedNode].child = nodes[nodes.length - 1];
    nodes.push({
      type: 'end',
      name: 'End',
      description: '',
      image: undefined,
      audio: undefined,
      ordinal: nodes.length,
      child: undefined,
      _id: Math.random(),
    });
    this.setState({
      nodes: nodes,
      selectedNode: nodes.length - 1,
    });
  }

  selectNode = (index) => {
    this.setState({
      selectedNode: index,
    });
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className="storytelling-tool-container">
            <div className="storytelling-work-area">
              <h2 className="storytelling-work-area-title">Story flow</h2>
              {
                this.state.nodes.map((node, index) => {
                  return(
                    <React.Fragment>
                      {
                        node.type === 'start' ?
                          <StorytellingStart
                            node={node}
                            index={index}
                            selectedNode={this.state.selectedNode}
                            addSingleNode={this.addSingleNode.bind(this)}
                            selectNode={this.selectNode.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        node.type === 'scene' ?
                          <StorytellingScene
                            node={node}
                            index={index}
                            selectedNode={this.state.selectedNode}
                            addSingleNode={this.addSingleNode.bind(this)}
                            addEndNode={this.addEndNode.bind(this)}
                            selectNode={this.selectNode.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        node.type === 'end' ?
                          <StorytellingEnd
                            node={node}
                            index={index}
                            selectedNode={this.state.selectedNode}
                            selectNode={this.selectNode.bind(this)}
                          />
                        :
                        undefined
                      }
                    </React.Fragment>
                  )
                })
              }
            </div>
            <div className="storytelling-menu-container">
              <h3 className="storytelling-menu-title">
                <React.Fragment>
                  {
                    this.state.nodes[this.state.selectedNode].type === 'start' ?
                      "Story beginning"
                    :
                    undefined
                  }
                  {
                    this.state.nodes[this.state.selectedNode].type === 'scene' ?
                      <React.Fragment>
                        {`Scene ${this.state.nodes[this.state.selectedNode].ordinal}`}
                      </React.Fragment>
                    :
                    undefined
                  }
                  {
                    this.state.nodes[this.state.selectedNode].type === 'end' ?
                      <React.Fragment>
                        {"End of the story"}
                      </React.Fragment>
                    :
                    undefined
                  }
                </React.Fragment>
              </h3>
              <TextField
                id="node-name-input"
                label="Name"
                margin="normal"
                variant="outlined"
                fullWidth
                autoComplete={"off"}
                required
                value={this.state.nodes[this.state.selectedNode].name}
                onChange={this.handleChange('name')}
                error={this.state.showError && this.state.nodes[this.state.selectedNode].name === ''}
                helperText="This is the name of the scene ex: Introduction, just scene 1 or whatever you want."
              />
              <TextField
                id="node-description-input"
                label="Description"
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={this.state.nodes[this.state.selectedNode].description}
                onChange={this.handleChange('description')}
                error={this.state.showError && this.state.nodes[this.state.selectedNode].description === ''}
                helperText="This is the description of the scene, is not required but it could help in accessibility for other students (you could write the transcription of the voice recorded)."
              />
              <div></div>
              <Tooltip title="Delete this scene">
                <Fab disabled={this.state.nodes[this.state.selectedNode].type === 'start'} color="secondary" className="storytelling-delete-button">
                  <DeleteIcon/>
                </Fab>
              </Tooltip>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
