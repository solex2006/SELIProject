import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import Table from '../data_display/Table';
import UserCard from './UserCard';

import ComputerIcon from '@material-ui/icons/Computer';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { Requirements } from '../../../lib/RequirementsCollection';

export default class RequirementsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [],
      open: false,
      dialog: {
        title: '',
      },
      requirement: {
        name: '',
        description: '',
      }
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getAudiences();
  }

  getAudiences = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let requirements = Requirements.find({}).fetch();
        this.setState({
          requirements: requirements,
        }, () => {
          let results = true;
          if (this.state.requirements.length) {
            this.createTableData(this.state.requirements);
          }
          else {
            results = false;
          }
          this.setState({
            loading: false,
            results: results,
          })
        });
      });
    });
  }

  createTableData = (requirements) => {
    let tableData = [];
    let headRows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Edit", icon: <EditIcon/>, action: this.showEditDialog.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    requirements.map(requirement => {
      tableData.push({name: requirement.name, description: requirement.description, _id: requirement._id})
    })
    this.setState({
      headRows: headRows,
      menuOptions: menuOptions,
      tableData: tableData,
    }, () => {
      this.setState({
        loading: false,
      })
    });
  }

  showAddDialog = () => {
    this.setState({
      dialog: {
        title: 'Add new requirement',
        action: 'add',
        confirmActionLabel: 'Add requirement'
      },
      open: true,
      confirmAction: () => this.add(),
    })
  }

  showEditDialog = (_id) => {
    let requirements = this.state.requirements;
    let requirement = requirements.find( requirement => requirement._id === _id );
    this.setState({
      dialog: {
        title: 'Edit requirement information',
        action: 'edit',
        confirmActionLabel: 'Edit requirement'
      },
      requirement: {
        name: requirement.name,
        description: requirement.description,
      },
      audienceToEdit: _id,
      open: true,
      confirmAction: () => this.edit(),
    })
  }

  handleChange = name => event => {
    let requirement = this.state.requirement;
    if (name === 'name') {
      requirement.name = event.target.value;
    }
    else if (name === 'description') {
      requirement.description = event.target.value;
    }
    this.setState({
      requirement: requirement,
    });
  }

  verifyAudience = () => {
    let requirement = this.state.requirement;
    if (requirement.name === '' || requirement.description === '') {
      this.props.handleControlMessage(true, "Fields marked with * are required");
      return false;
    }
    return true;
  }

  deleteSelected = (requirements) => {
    let audiencesToDelete = [];
    requirements.map(requirement => {audiencesToDelete.push(requirement)});
    this.setState({
      dialog: {
        title: 'Delete requirement(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this requirement(s)? Remeber that there could be some courses that use this information.',
        action: 'delete',
        confirmActionLabel: 'Delete requirement(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      audiencesToDelete: audiencesToDelete,
    });
  }

  add = () => {
    if (this.verifyAudience()) {
      Requirements.insert({
        name: this.state.requirement.name,
        description: this.state.requirement.description,
        additionDate: new Date(),
        type: 'technical'
      }, () => {
        this.handleClose();
        this.props.handleControlMessage(true, "Requirement added successfully");
        this.setState({
          requirement: {
            name: '',
            description: '',
          }
        })
      })
    }
  }

  delete = () => {
    this.state.audiencesToDelete.map((requirement, index) => {
      Requirements.remove({_id: requirement});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, 'Requirement(s) deleted successfully!', false, '', '');
  }

  edit = () => {
    if (this.verifyAudience()) {
      Requirements.update(
        { _id: this.state.audienceToEdit},
        { $set: {
          name: this.state.requirement.name,
          description: this.state.requirement.description,
        }}
        , () => {
          this.handleClose();
          this.props.handleControlMessage(true, "Requirement edited successfully");
          this.setState({
            requirement: {
              name: '',
              description: '',
              audienceToEdit: '',
            }
          })
        }
      )
    }
  }

  keyController = (event, name) => {
    if (event.which == 13 || event.keyCode == 13) {
      this.state.confirmAction();
    }
    else {
      return false;
    }
  }

  setSelected(){}

  showDeleteConfirmation = (_id) => {
    let audiencesToDelete = [];
    audiencesToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete requirement(s)',
        dialogConfirmationContentText: "Are you sure you want to delete this requirement(s)? Remeber that there could be some courses that use this information. It's better if you edit the information",
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      audiencesToDelete: audiencesToDelete,
    });
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading requirements..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Requirements <ComputerIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{title:'You have', pagination: 'Requirements per page:', plural: 'requirements'}}
                      headRows={this.state.headRows}
                      menuOptions={this.state.menuOptions}
                      tableData={this.state.tableData}
                      add={true}
                      addLabel="Add new requirement"
                      addAction={this.showAddDialog.bind(this)}
                      delete={true}
                      deleteSelected={this.deleteSelected.bind(this)}
                      setSelectedFunction={selected => this.setSelected = selected}
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">You don't have any requirement created yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.showAddDialog()} variant="contained" color="primary" className="empty-dashboard-button">Create a requirement</Button>
              </div>
            }
          </React.Fragment>
        }
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
          <DialogTitle className="success-dialog-title" id="simple-dialog-title">{this.state.dialog.title}</DialogTitle>
          <div className="center-row">
            {
              this.state.dialog.action === "add" ?
                <div>
                  <DialogContentText style={{padding: "0 1vw"}}>Fill the following fields:</DialogContentText>
                  <DialogContent className="management-dialog-form-content">
                    <TextField
                      id="name-input"
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      value={this.state.requirement.name}
                      onChange={this.handleChange('name')}
                    />
                    <TextField
                      id="description-input"
                      label="Description"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.requirement.description}
                      onKeyPress={() => this.keyController(event, 'add')}
                      onChange={this.handleChange('description')}
                    />
                  </DialogContent>
                </div>
              :
              undefined
            }
            {
              this.state.dialog.action === "edit" ?
                <div>
                  <DialogContent className="management-dialog-form-content">
                    <TextField
                      id="name-input"
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      value={this.state.requirement.name}
                      onChange={this.handleChange('name')}
                    />
                    <TextField
                      id="description-input"
                      label="Description"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      value={this.state.requirement.description}
                      onKeyPress={() => this.keyController(event, 'edit')}
                      onChange={this.handleChange('description')}
                    />
                  </DialogContent>
                </div>
              :
              undefined
            }
            {
              this.state.dialog.action === "delete" ?
                <div>
                  <DialogContentText style={{padding: "0 1vw"}}>{this.state.dialog.dialogConfirmationContentText}</DialogContentText>
                </div>
              :
              undefined
            }
          </div>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">Cancel</Button>
            <Button onClick={() => this.state.confirmAction()} color="primary">{this.state.dialog.confirmActionLabel}</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
