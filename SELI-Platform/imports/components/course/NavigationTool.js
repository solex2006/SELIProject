import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeItem from '@material-ui/lab/TreeItem';
import RemoveIcon from '@material-ui/icons/Remove';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";

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

  handleClickOpen = () => {
    this.setState({ open: true});
    let nameLabels = this.state.nameLabels
    if (this.state.action === "addUnit" ) {
      nameLabels.nameUnit = ""
      nameLabels.nameSubunit = ""
    }
    else if (this.state.action === "addSubunit") {
      nameLabels.nameSubunit = ""
    }
    else if (this.state.action === "editSubunit") {
      nameLabels.nameSubunit = this.props.program[this.state.unitToEdit].lessons[this.state.subunitToEdit].name
    }
    else {
      nameLabels.nameUnit = this.props.program[this.state.unitToEdit].name
    }
    let totalLength = nameLabels.nameUnit.length + nameLabels.nameSubunit.length;
    this.setState({
      nameLabels: nameLabels,
      totalLength: totalLength
    });
  };

  handleClose = () => {
    this.setState({ open: false, addedUnit: undefined });
  };

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
        this.props.showCreatorToolMessage("navigation");
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
        this.props.showCreatorToolMessage("navigation");
      });
    }
  }

  addUnit(type) {
    let languageTypeAdded = "";
    if (type === 'Unit'){ languageTypeAdded = this.props.language.unitName }
    if (type === 'Topic'){ languageTypeAdded = this.props.language.topicName }
    if (this.props.dialog) {
      this.setState({
        action: "addUnit",
        languageType: languageTypeAdded,
      }, () => {
        this.handleClickOpen();
        document.getElementById('unit-input').value = "";
        document.getElementById('unit-input').focus();
      });
    }
  }

  addSubunit(index) {
    if (this.props.dialog) {
      this.setState({
        action: "addSubunit",
        selectedUnit: index,
      }, () => {
        this.handleClickOpen();
        document.getElementById('subunit-input').value = "";
        document.getElementById('subunit-input').focus();
      });
    }
  }

  unitController() {
    if (this.state.action === "addUnit" ) {
      this.finishAddUnit();
    }
    if (this.state.action === "addSubunit" ) {
      this.finishAddSubunit();
    }
    if (this.state.action === "editUnit" ) {
      this.finishEditUnit();
    }
    if (this.state.action === "editSubunit" ) {
      this.finishEditSubunit();
    }
    this.handleClose();
  }

  finishAddUnit() {
    let name = this.state.nameLabels.nameUnit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      let addedUnit = program.push({name: name, lessons: []});
      program[addedUnit-1].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
      document.getElementById('subunit-input').value = "";
    }
    else if (this.props.organization.unit === "Topic") {
      program.push({name: name, items: []});
    }
    else if (this.props.organization.unit === "Season") {
      program.push({name: name, items: []});
    }
    document.getElementById('unit-input').value = "";
  }

  finishAddSubunit () {
    let name = this.state.nameLabels.nameSubunit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      program[this.state.selectedUnit].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
    }
    document.getElementById('subunit-input').value = "";
  }

  finishEditUnit() {
    let name = this.state.nameLabels.nameUnit;
    let program = this.props.program;
    program[this.state.unitToEdit].name = name;
    this.setState({
      edited: true,
    }, () => {
      this.props.reRender();
    })
  }

  finishEditSubunit() {
    let name = this.state.nameLabels.nameSubunit;
    let program = this.props.program;
    if (this.props.organization.unit === "Unit") {
      program[this.state.unitToEdit].lessons[this.state.subunitToEdit].name = name;
    }
    this.setState({
      edited: true,
    }, () => {
      this.props.reRender();
    })
  }

  deletUnit(index) {
    let program = this.state.program;
    let selected = this.state.selected;
    if (program.length - 1 >= 1) {
      program.splice(index, 1);
      if (this.props.selected[0] === index && this.props.organization.subunit) {
        this.selectSubunit(program[index].lessons[0]._id);
      }
    }
    else {
      console.log("At least one unit with one lesson");
    }
    this.setState({
      deleted: true,
    }, () => {
      this.props.reRender();
    });
  }

  deletSubunit(_id) {
    let program = this.state.program;
    let selected = this.state.selected;
    let unitIndex;
    let subunitIndex;
    for (var i = 0; i < program.length; i++) {
      for (var j = 0; j < program[i].lessons.length; j++) {
        if (program[i].lessons[j]._id === _id) {
          if (program[i].lessons.length - 1 >= 1) {
            program[i].lessons.splice(j, 1);
            if (this.props.selected[0] === i && this.props.selected[1] === j) {
              this.selectSubunit(program[i].lessons[j]._id);
            }
          }
          else {
            console.log("At least one lesson");
          }
          break;
        }
      }
    }
    this.setState({
      deleted: true,
    });
  }

  editUnit(index, type) {
    let program = this.state.program;
    let languageTypeAdded = "";
    if (type === 'Unit'){ languageTypeAdded = this.props.language.unitName }
    if (type === 'Topic'){ languageTypeAdded = this.props.language.topicName }
    this.setState({
      unitToEdit: index,
      action: "editUnit",
      languageType: languageTypeAdded,
    }, () => {
      this.handleClickOpen();
      document.getElementById('unit-input').value = this.props.program[this.state.unitToEdit].name;
      document.getElementById('unit-input').focus();
    });
  }

  editSubunit(_id) {
    let program = this.state.program;
    for (var i = 0; i < program.length; i++) {
      for (var j = 0; j < program[i].lessons.length; j++) {
        if (program[i].lessons[j]._id === _id) {
          this.setState({
            unitToEdit: i,
            subunitToEdit: j,
            action: "editSubunit",
          }, () => {
            this.handleClickOpen();
            document.getElementById('subunit-input').value = this.props.program[this.state.unitToEdit].lessons[this.state.subunitToEdit].name;
            document.getElementById('subunit-input').focus();
          });
        }
      }
    }
  }

  checkOrganizationStructure() {
    if (this.props.organization.subunit) {
      let program = this.props.program;
      for (var i = 0; i < program.length; i++) {
        if (program[i].lessons.length === 0) {
          program.splice(i, 1);
        }
      }
    }
    this.setState({
      checked: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalLength !== this.state.totalLength) {
      if (this.state.action === "addUnit" ) {
        if (this.props.organization.unit === "Unit") {
          if (this.state.nameLabels.nameUnit.length !== 0 && this.state.nameLabels.nameSubunit.length !== 0 ){
            this.setState({
              disableButton: false
            });
          } else {
            this.setState({
              disableButton: true
            });
          }
        } else {
          if (this.state.nameLabels.nameUnit.length !== 0 ){
            this.setState({
              disableButton: false
            });
          } else {
            this.setState({
              disableButton: true
            });
          }
        }
      } 
      else if (this.state.action === "addSubunit" || this.state.action === "editSubunit"){
        if (this.state.nameLabels.nameSubunit.length !== 0 ){
          this.setState({
            disableButton: false
          });
        } else {
          this.setState({
            disableButton: true
          });
        }
      }
      else {
        if (this.state.nameLabels.nameUnit.length !== 0 ){
          this.setState({
            disableButton: false
          });
        } else {
          this.setState({
            disableButton: true
          });
        }
      }
    };
  };

  handleChange = valueType => event => {
    let nameLabels = this.state.nameLabels
    if (valueType === 'unit') {
      nameLabels.nameUnit = event.target.value
    }
    else if (valueType === 'subunit') {
      nameLabels.nameSubunit = event.target.value
    }
    let totalLength = nameLabels.nameUnit.length + nameLabels.nameSubunit.length;
    this.setState({
      nameLabels: nameLabels,
      totalLength: totalLength
    });
  };

  render() {
    console.log(this.state.nameLabels)
    return(
      <div>
        {
          this.props.organization.subunit ?
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
                        <ContextMenuTrigger id={`p${index}`}>
                          <TreeItem className="parent-node" nodeId={`p${index}`} label={`${node.name}`}>
                            <div>
                              {
                                node.lessons.map((childNode, index, parentIndex) => {
                                  return(
                                    <div>
                                      <ContextMenuTrigger id={`c${index} c${childNode._id}`}>
                                        <TreeItem
                                          onDoubleClick={() => {this.selectSubunit(childNode._id); this.props.setMenuTab(0)}}
                                          icon={<RemoveIcon fontSize="small"/>}
                                          onClick={() => this.selectSubunit(childNode._id)} className="child-node" nodeId={`c${index} c${childNode._id}`}
                                          label={`${childNode.name}`}
                                        />
                                      </ContextMenuTrigger>
                                      <ContextMenu className="right-click-menu" hideOnLeave={true} id={`c${index} c${childNode._id}`}>
                                        <Paper elevation={8}>
                                          <List className="navigation-options-list" dense={true} component="nav" aria-label="navigation-options">
                                            <ListItem onClick={() => this.editSubunit(childNode._id)} button>
                                              <ListItemIcon>
                                                <EditIcon />
                                              </ListItemIcon>
                                              <ListItemText primary={this.props.language.edit} />
                                            </ListItem>
                                            <ListItem onClick={() => this.deletSubunit(childNode._id)} button>
                                              <ListItemIcon>
                                                <CancelIcon />
                                              </ListItemIcon>
                                              <ListItemText primary={this.props.language.delete} />
                                            </ListItem>
                                          </List>
                                        </Paper>
                                      </ContextMenu>
                                    </div>
                                  )
                                })
                              }
                              {
                                this.props.organization.subunit ?
                                  <ContextMenuTrigger disabled={true} id={`noMenu${index}`}>
                                    <TreeItem onClick={() => this.addSubunit(index)} icon={<AddIcon fontSize="small"/>} className="child-node-add" nodeId={`c${index}AddChild`} label={this.props.language.addLesson}/>
                                  </ContextMenuTrigger>
                                :
                                undefined
                              }
                            </div>
                          </TreeItem>
                        </ContextMenuTrigger>
                        <ContextMenu className="right-click-menu" hideOnLeave={true} id={`p${index}`}>
                          <Paper elevation={8}>
                            <List className="navigation-options-list" dense={true} component="nav" aria-label="navigation-options">
                              <ListItem onClick={() => this.editUnit(index, this.props.organization.unit)} button>
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary={this.props.language.edit} />
                              </ListItem>
                              <ListItem onClick={() => this.deletUnit(index)} button>
                                <ListItemIcon>
                                  <CancelIcon />
                                </ListItemIcon>
                                <ListItemText primary={this.props.language.delete} />
                              </ListItem>
                            </List>
                          </Paper>
                        </ContextMenu>
                      </div>
                    )
                  })
                }
                <TreeItem onClick={() => this.addUnit(this.props.organization.unit)} icon={<AddBoxIcon fontSize="small"/>} className="parent-node-add" nodeId={`pAddUnit`} label={this.props.language.addUnit}/>
              </TreeView>
            </div>
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
                  <div>
                    <ContextMenuTrigger id={`p${index}`}>
                      <TreeItem
                        onDoubleClick={() => {this.selectUnit(index); this.props.setMenuTab(0)}}
                        onClick={() => this.selectUnit(index)}
                        className="parent-node"
                        icon={<RemoveIcon fontSize="small"/>}
                        nodeId={`p${index}`} label={`${node.name}`}
                      />
                    </ContextMenuTrigger>
                    <ContextMenu className="right-click-menu" hideOnLeave={true} id={`p${index}`}>
                      <Paper elevation={8}>
                        <List className="navigation-options-list" dense={true} component="nav" aria-label="navigation-options">
                          <ListItem onClick={() => this.editUnit(index, this.props.organization.unit)} button>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.language.edit} />
                          </ListItem>
                          <ListItem onClick={() => this.deletUnit(index)} button>
                            <ListItemIcon>
                              <CancelIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.language.delete} />
                          </ListItem>
                        </List>
                      </Paper>
                    </ContextMenu>
                  </div>
                )
              })
            }
            <TreeItem onClick={() => this.addUnit(this.props.organization.unit)} icon={<AddBoxIcon fontSize="small"/>} className="parent-node-add" nodeId={`pAddUnit`} label={this.props.language.addTopic}/>
          </TreeView>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          onExiting={() => this.checkOrganizationStructure()}
          aria-labelledby="Add new unit-subunit"
          aria-describedby="Add new unit-subunit"
          keepMounted
          className="navigation-dialog"
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar" variant="dense" disableGutters={true}>
                <AppsIcon/>
                <h4 className="dialog-label-title">{this.props.language.navigationEditor}</h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  onClick={this.handleClose}
                >
                  <CloseIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            <div className="navigation-content">
              {
                this.state.action === "addUnit" ?
                  <div>
                    <TextField
                      id="unit-input"
                      label={this.state.languageType}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      disabled={this.state.addedUnit !== undefined}
                      //helperText={this.props.language.pressEnterToAdd}
                      //onKeyPress={() => this.unitKeyController(event)}
                      value={this.state.nameUnit}
                      onChange={this.handleChange('unit')}
                    />
                    {
                      this.props.organization.unit === "Unit" ?
                        <div>
                          <p className="navigation-label">
                            {this.props.language.atLeastAdd}
                          </p>
                          <TextField
                            id="subunit-input"
                            label={this.props.language.lessonName}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            //helperText={this.props.language.pressEnterToAdd}
                            //onKeyPress={() => this.unitKeyController(event)}
                            value={this.state.nameSubunit}
                            onChange={this.handleChange('subunit')}
                          />
                        </div>
                      :
                        undefined
                    }
                  </div>
                :
                  undefined
              }
              {
                this.state.action === "addSubunit" ?
                  <div>
                    <p className="navigation-label">
                      {`${this.props.language.addingLessons}: ${this.props.program[this.state.selectedUnit].name.toLowerCase()}`}
                    </p>
                    <TextField
                      id="subunit-input"
                      label={this.props.language.lessonName}
                      margin="normal"
                      variant="outlined"
                      //onKeyPress={() => this.unitKeyController(event)}
                      fullWidth
                      //helperText={this.props.language.pressEnterToAdd}
                      required
                      value={this.state.nameSubnit}
                      onChange={this.handleChange('subunit')}
                    />
                  </div>
                :
                undefined
              }
              {
                this.state.action === "editUnit" ?
                  <div>
                    <TextField
                      id="unit-input"
                      label={this.state.languageType}
                      margin="normal"
                      variant="outlined"
                      //onKeyPress={() => this.unitKeyController(event)}
                      fullWidth
                      //helperText={this.props.language.pressEnterToEdit}
                      required
                      value={this.state.nameUnit}
                      onChange={this.handleChange('unit')}
                    />
                  </div>
                :
                undefined
              }
              {
                this.state.action === "editSubunit" ?
                  <div>
                    <TextField
                      id="subunit-input"
                      label={this.props.language.lessonName}
                      margin="normal"
                      variant="outlined"
                      //onKeyPress={() => this.unitKeyController(event)}
                      fullWidth
                      //helperText={this.props.language.pressEnterToEdit}
                      required
                      value={this.state.nameSubnit}
                      onChange={this.handleChange('subunit')}
                    />
                  </div>
                :
                undefined
              }
            </div>
          </DialogContent>
          <div className="dialog-actions-container">
            <Tooltip title={this.props.language.done}>
              <Fab 
              disabled={this.state.disableButton} 
              onClick={() => {this.unitController()}} 
              aria-label={this.props.language.startCreatingCourse} 
              className="dialog-fab" color="primary">
                {
                  this.state.action === "addUnit" || this.state.action === "addSubunit" ?
                    <AssignmentTurnedInIcon/>
                  :
                    <EditIcon/>
                }
              </Fab>
            </Tooltip>
          </div>
        </Dialog>
      </div>
    )
  }
}
