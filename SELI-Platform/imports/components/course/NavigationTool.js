import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';
import RemoveIcon from '@material-ui/icons/Remove';

export default class NavigationTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodes: this.props.expandedNodes,
      program: this.props.program,
      selected: this.props.selected,
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
    this.setState({
      update: true,
    }, () => {
      this.props.reRender();
      this.props.turnOffSortMode();
    });
  }

  render() {
    return(
      <div>
        <TreeView
          defaultCollapseIcon={<ArrowDropDownIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
          defaultExpandIcon={<ArrowRightIcon fontSize="small" style={{animation: "fadeIn 0.5s"}}/>}
          defaultExpanded={this.props.expandedNodes}
          onNodeToggle={(nodeId, expanded) => {this.expandNode(nodeId, expanded)}}
        >
          {
            this.props.program.map((node, index) => {
              return(
                <div>
                  <TreeItem className="parent-node" nodeId={`p${index}`} label={`${node.name}`}>
                    <div>
                      {
                        node.lessons.map((childNode, index, parentIndex) => {
                          return(
                            <TreeItem icon={<RemoveIcon fontSize="small"/>} onClick={() => this.selectSubunit(childNode._id)} className="child-node" nodeId={`c${index} c${childNode._id}`} label={`${childNode.name}`}/>
                          )
                        })
                      }
                    </div>
                  </TreeItem>
                </div>
              )
            })
          }
        </TreeView>
      </div>
    )
  }
}
