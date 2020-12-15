import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';
import LabelIcon from '@material-ui/icons/Label';

export default class NavigationTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodes: this.props.expandedNodes,
      program: this.props.program,
      selected: this.props.selected,
      coursePlan: this.props.coursePlan
    }
  }

  handleToggle = (event, nodeIds) => {
    let expandedNodes = this.state.expandedNodes;
    expandedNodes.splice(0, expandedNodes.length);
    nodeIds.map(node => {
      expandedNodes.push(node);
    })
    this.setState({
      expandedNodes,
    });
  }

  selectUnit(index) {
    let selected = this.state.selected;
    selected.splice(0, selected.length);
    selected.push(index);
    selected.push(0);
    selected.push(0);
    selected.push(0);
    this.doCommons(selected);
  }

  selectSubunit(_id) {
    let program = this.state.program;
    let selected = this.state.selected;
    let unitIndex;
    let subunitIndex;
    for (var i = 0; i < program.length; i++) {
      for (var j = 0; j < program[i].lessons.length; j++) {
        if (program[i].lessons[j]._id === _id) {
          unitIndex = i;
          subunitIndex = j;
          break;
        }
      }
    }
    selected.splice(0, selected.length);
    selected.push(unitIndex);
    selected.push(subunitIndex);
    selected.push(0);
    selected.push(1);
    this.doCommons(selected);
  }

  selectTask(_id, type) {
    let program = this.state.program;
    let selected = this.state.selected;
    let unitIndex;
    let subunitIndex;
    let taskIndex;
    for (var i = 0; i < program.length; i++) {
      if (type === "unit") {
        for (var j = 0; j < program[i].lessons.length; j++) {
          for (var k = 0; k < program[i].lessons[j].activities.length; k++) {
            if (program[i].lessons[j].activities[k]._id === _id) {
              unitIndex = i;
              subunitIndex = j;
              taskIndex = k;
              break;
            }
          }
        }
      } else {
        for (var j = 0; j < program[i].activities.length; j++) {
          if (program[i].activities[j]._id === _id) {
            unitIndex = i;
            subunitIndex = 0;
            taskIndex = j;
            break;
          }
        }
      }
    }
    selected.splice(0, selected.length);
    selected.push(unitIndex);
    selected.push(subunitIndex);
    selected.push(taskIndex);
    selected.push(2);
    this.doCommons(selected);
  }

  doCommons = (selected) => {
    this.setState({
      update: true,
    }, () => {
      if (this.props.closeDrawer) {
        this.props.navigateTo(selected)
        if (selected[3] === 2) {
          this.props.closeDrawer();
        }
      } else {
        this.props.loadingData();
        this.props.turnOffSortMode();
      }
      if (document.getElementById("courseContainer"))
      document.getElementById("courseContainer").scroll(0,0);
    });
  }

  render() {
    return(
      <div>
        {
          this.state.coursePlan.courseStructure === "unit" ?
            <TreeView
              defaultCollapseIcon={<ArrowDropDownIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              defaultExpandIcon={<ArrowRightIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              expanded={this.state.expandedNodes}
              onNodeToggle={this.handleToggle}
            >
              {
                this.state.program.map((node, index) => {
                  return(
                    <TreeItem
                      /* onDoubleClick={() => {this.selectUnit(index); this.props.setMenuTab(0)}} */
                      onClick={() => this.selectUnit(index)}
                      className="parent-node" 
                      nodeId={`p${index}`} 
                      label={<div className="tree-label-view">{node.name}</div>}
                    >
                      {
                        node.lessons.map((childNode, index) => {
                          return(
                            <TreeItem
                              /* onDoubleClick={() => {this.selectSubunit(childNode._id); this.props.setMenuTab(0)}} */
                              onClick={() => this.selectSubunit(childNode._id)} className="child-node" nodeId={`c${index} c${childNode._id}`}
                              label={<div className="tree-label-view">{childNode.name}</div>}
                            >
                              { this.state.coursePlan.guidedCoursePlan === "guided" &&
                                childNode.activities.map((activityNode, activityIndex) => {
                                  return(
                                    <TreeItem
                                      icon={<LabelIcon fontSize="small"/>}
                                      /* onDoubleClick={() => {this.selectTask(activityNode._id, "unit"); this.props.setMenuTab(0)}} */
                                      onClick={() => this.selectTask(activityNode._id, "unit")} 
                                      className="task-node" nodeId={`t${activityIndex} t${activityNode._id}`}
                                      label={<div className="tree-label-view">{activityNode.name}</div>}
                                    />
                                  )
                                })
                              }
                            </TreeItem>
                          )
                        })
                      }
                    </TreeItem>
                  )
                })
              }
            </TreeView>
          :
            <TreeView
              defaultCollapseIcon={<ArrowDropDownIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              defaultExpandIcon={<ArrowRightIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              expanded={this.state.expandedNodes}
              onNodeToggle={this.handleToggle}
            >
              {
                this.state.program.map((node, index) => {
                  return(
                    <TreeItem
                      /* onDoubleClick={() => {this.selectUnit(index); this.props.setMenuTab(0)}} */
                      onClick={() => this.selectUnit(index)}
                      className="parent-node"
                      nodeId={`p${index}`} 
                      label={<div className="tree-label-view">{node.name}</div>}
                    >
                      { this.state.coursePlan.guidedCoursePlan === "guided" &&
                        node.activities.map((activityNode, activityIndex) => {
                          return(
                            <TreeItem
                              icon={<LabelIcon fontSize="small"/>}
                              /* onDoubleClick={() => {this.selectTask(activityNode._id, "topic"); this.props.setMenuTab(0)}} */
                              onClick={() => this.selectTask(activityNode._id, "topic")} 
                              className="task-node" nodeId={`t${activityIndex} t${activityNode._id}`}
                              label={<div className="tree-label-view">{activityNode.name}</div>}
                            />
                          )
                        })
                      }
                    </TreeItem>
                  )
                })
              }
            </TreeView>
        }
      </div>
    )
  }
}
