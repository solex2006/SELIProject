//SELIProject

import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../tools/Loading';
import Table from '../data_display/Table';
import UserCard from './UserCard';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
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

import { Disabilities } from '../../../lib/DisabilitiesCollection';

export default class DisabilitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabilities: [],
      open: false,
      dialog: {
        title: '',
      },
      disabilitie: {
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
    this.getDisabilities();
  }

  getDisabilities = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let disabilities = Disabilities.find({}).fetch();
        this.setState({
          disabilities: disabilities,
        }, () => {
          let results = true;
          if (this.state.disabilities.length) {
            this.createTableData(this.state.disabilities);
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

  createTableData = (disabilities) => {
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
    disabilities.map(disabilitie => {
      tableData.push({name: disabilitie.name, description: disabilitie.description, _id: disabilitie._id})
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
        title: 'Add new disabilitie',
        action: 'add',
        confirmActionLabel: 'Add disabilitie'
      },
      open: true,
      confirmAction: () => this.add(),
    })
  }

  showEditDialog = (_id) => {
    let disabilities = this.state.disabilities;
    let disabilitie = disabilities.find( disabilitie => disabilitie._id === _id );
    this.setState({
      dialog: {
        title: 'Edit disabilitie information',
        action: 'edit',
        confirmActionLabel: 'Edit disabilitie'
      },
      disabilitie: {
        name: disabilitie.name,
        description: disabilitie.description,
      },
      disabilitieToEdit: _id,
      open: true,
      confirmAction: () => this.edit(),
    })
  }

  handleChange = name => event => {
    let disabilitie = this.state.disabilitie;
    if (name === 'name') {
      disabilitie.name = event.target.value;
    }
    else if (name === 'description') {
      disabilitie.description = event.target.value;
    }
    this.setState({
      disabilitie: disabilitie,
    });
  }

  verifyDisabilitie = () => {
    let disabilitie = this.state.disabilitie;
    if (disabilitie.name === '' || disabilitie.description === '') {
      this.props.handleControlMessage(true, "Fields marked with * are required");
      return false;
    }
    return true;
  }

  deleteSelected = (disabilities) => {
    let disabilitiesToDelete = [];
    disabilities.map(disabilitie => {disabilitiesToDelete.push(disabilitie)});
    this.setState({
      dialog: {
        title: 'Delete disabilitie(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this disabilitie(s)? Remeber that there could be some courses that use this information.',
        action: 'delete',
        confirmActionLabel: 'Delete disabilitie(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      disabilitiesToDelete: disabilitiesToDelete,
    });
  }

  add = () => {
    if (this.verifyDisabilitie()) {
      Disabilities.insert({
        name: this.state.disabilitie.name,
        description: this.state.disabilitie.description,
        additionDate: new Date(),
      }, () => {
        this.handleClose();
        this.props.handleControlMessage(true, "Disabilitie added successfully");
        this.setState({
          disabilitie: {
            name: '',
            description: '',
          }
        })
      })
    }
  }

  delete = () => {
    this.state.disabilitiesToDelete.map((disabilitie, index) => {
      Disabilities.remove({_id: disabilitie});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, 'Disabilitie(s) deleted successfully!', false, '', '');
  }

  edit = () => {
    if (this.verifyDisabilitie()) {
      Disabilities.update(
        { _id: this.state.disabilitieToEdit},
        { $set: {
          name: this.state.disabilitie.name,
          description: this.state.disabilitie.description,
        }}
        , () => {
          this.handleClose();
          this.props.handleControlMessage(true, "Disabilitie edited successfully");
          this.setState({
            disabilitie: {
              name: '',
              description: '',
              disabilitieToEdit: '',
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
    let disabilitiesToDelete = [];
    disabilitiesToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete disabilitie(s)',
        dialogConfirmationContentText: "Are you sure you want to delete this disabilitie(s)? Remeber that there could be some courses that use this information. It's better if you edit the information",
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      disabilitiesToDelete: disabilitiesToDelete,
    });
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading disabilities..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Disabilities <AccessibilityNewIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title: this.props.language.youHaveDisabilities, 
                        pagination: this.props.language.disabilitiePerPage,
                        filterList: this.props.language.filterList,
                        refresh: this.props.language.refresh,
                        delete: this.props.language.delete,
                        selected: this.props.language.selected,
                        nextPage: this.props.language.nextPage,
                        previousPage: this.props.language.previousPage,
                        options: this.props.language.options,
                      }}
                      headRows={this.state.headRows}
                      menuOptions={this.state.menuOptions}
                      tableData={this.state.tableData}
                      add={true}
                      addLabel="Add new disabilitie"
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
                  <p className="empty-dashboard-text">You don't have any disabilitie created yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.showAddDialog()} variant="contained" color="primary" className="empty-dashboard-button">Create an disabilitie</Button>
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
                      value={this.state.disabilitie.name}
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
                      value={this.state.disabilitie.description}
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
                      value={this.state.disabilitie.name}
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
                      value={this.state.disabilitie.description}
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
