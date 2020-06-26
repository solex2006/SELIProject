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
      addedUnit: undefined,
      nameLabels: { nameUnit: "", nameSubunit: ""},
      disableButton: true,
    }
  }

  expandNode(node, expanded) {
    let expandedNodes = this.state.expandedNodes;
    if (!expanded) {
      let index = expandedNodes.indexOf(node);
      expandedNodes.splice(index, 1);
    }
    else {
      expandedNodes.push(node);
    }
    this.setState({
      expanded: expanded,
    });
  }

  selectUnit(index) {
    if (this.props.dialog) {
      let program = this.state.program;
      let selected = this.state.selected;
      selected.splice(0, selected.length);
      selected.push(index);
      selected.push(0);
      this.setState({
        update: true,
      }, () => {
        this.props.reRender();
        this.props.turnOffSortMode();
      });
    }
  }

  selectSubunit(_id) {
    if (this.props.dialog) {
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
      this.setState({
        update: true,
      }, () => {
        this.props.reRender();
        this.props.turnOffSortMode();
      });
    }
  }

  render() {
    return(
      <div>
        {
          this.props.coursePlan.courseStructure === "unit" ?
            <TreeView
              defaultCollapseIcon={<ArrowDropDownIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              defaultExpandIcon={<ArrowRightIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
              defaultExpanded={this.props.expandedNodes}
              onNodeToggle={(nodeId, expanded) => {this.expandNode(nodeId, expanded)}}
            >
              {
                this.props.program.map((node, index) => {
                  return(
                    <TreeItem 
                      className="parent-node" 
                      nodeId={`p${index}`} 
                      label={<div className="tree-label-view">{node.name}</div>}
                    >
                      {
                        node.lessons.map((childNode, index) => {
                          return(
                            <TreeItem
                              onDoubleClick={() => {this.selectSubunit(childNode._id); this.props.setMenuTab(0)}}
                              onClick={() => this.selectSubunit(childNode._id)} className="child-node" nodeId={`c${index} c${childNode._id}`}
                              label={<div className="tree-label-view">{childNode.name}</div>}
                            >
                              {
                                childNode.activities.map((activityNode, activityIndex) => {
                                  return(
                                    <TreeItem
                                      icon={<LabelIcon fontSize="small"/>}
                                      /* onDoubleClick={() => {this.selectSubunit(activityNode._id); this.props.setMenuTab(0)}}
                                      onClick={() => this.selectSubunit(activityNode._id)} className="task-node" nodeId={`t${activityIndex} t${activityNode._id}`} */
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
              defaultExpanded={this.props.expandedNodes}
              onNodeToggle={(nodeId, expanded) => {this.expandNode(nodeId, expanded)}}
            >
              {
                this.props.program.map((node, index) => {
                  return(
                    <TreeItem
                      onDoubleClick={() => {this.selectUnit(index); this.props.setMenuTab(0)}}
                      onClick={() => this.selectUnit(index)}
                      className="parent-node"
                      nodeId={`p${index}`} 
                      label={<div className="tree-label-view">{node.name}</div>}
                    >
                      {
                        node.activities.map((activityNode, activityIndex) => {
                          return(
                            <TreeItem
                              icon={<LabelIcon fontSize="small"/>}
                              /* onDoubleClick={() => {this.selectSubunit(activityNode._id); this.props.setMenuTab(0)}}
                              onClick={() => this.selectSubunit(activityNode._id)} className="task-node" nodeId={`t${activityIndex} t${activityNode._id}`} */
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
