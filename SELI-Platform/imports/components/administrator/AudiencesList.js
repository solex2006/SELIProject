//SELIProject

import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
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

import { Audiences } from '../../../lib/AudiencesCollection';

export default class AudiencesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audiences: [],
      open: false,
      dialog: {
        title: '',
      },
      audience: {
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
        let audiences = Audiences.find({}).fetch();
        this.setState({
          audiences: audiences,
        }, () => {
          let results = true;
          if (this.state.audiences.length) {
            this.createTableData(this.state.audiences);
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

  createTableData = (audiences) => {
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
    audiences.map(audience => {
      tableData.push({name: audience.name, description: audience.description, _id: audience._id})
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
        title: 'Add new audience',
        action: 'add',
        confirmActionLabel: 'Add audience'
      },
      open: true,
      confirmAction: () => this.add(),
    })
  }

  showEditDialog = (_id) => {
    let audiences = this.state.audiences;
    let audience = audiences.find( audience => audience._id === _id );
    this.setState({
      dialog: {
        title: 'Edit audience information',
        action: 'edit',
        confirmActionLabel: 'Edit audience'
      },
      audience: {
        name: audience.name,
        description: audience.description,
      },
      audienceToEdit: _id,
      open: true,
      confirmAction: () => this.edit(),
    })
  }

  handleChange = name => event => {
    let audience = this.state.audience;
    if (name === 'name') {
      audience.name = event.target.value;
    }
    else if (name === 'description') {
      audience.description = event.target.value;
    }
    this.setState({
      audience: audience,
    });
  }

  verifyAudience = () => {
    let audience = this.state.audience;
    if (audience.name === '' || audience.description === '') {
      this.props.handleControlMessage(true, "Fields marked with * are required");
      return false;
    }
    return true;
  }

  deleteSelected = (audiences) => {
    let audiencesToDelete = [];
    audiences.map(audience => {audiencesToDelete.push(audience)});
    this.setState({
      dialog: {
        title: 'Delete audience(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this audience(s)? Remeber that there could be some courses that use this information.',
        action: 'delete',
        confirmActionLabel: 'Delete audience(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      audiencesToDelete: audiencesToDelete,
    });
  }

  add = () => {
    if (this.verifyAudience()) {
      Audiences.insert({
        name: this.state.audience.name,
        description: this.state.audience.description,
        additionDate: new Date(),
      }, () => {
        this.handleClose();
        this.props.handleControlMessage(true, "Audience added successfully");
        this.setState({
          audience: {
            name: '',
            description: '',
          }
        })
      })
    }
  }

  delete = () => {
    this.state.audiencesToDelete.map((audience, index) => {
      Audiences.remove({_id: audience});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, 'Audience(s) deleted successfully!', false, '', '');
  }

  edit = () => {
    if (this.verifyAudience()) {
      Audiences.update(
        { _id: this.state.audienceToEdit},
        { $set: {
          name: this.state.audience.name,
          description: this.state.audience.description,
        }}
        , () => {
          this.handleClose();
          this.props.handleControlMessage(true, "Audience edited successfully");
          this.setState({
            audience: {
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
        title: 'Delete audience(s)',
        dialogConfirmationContentText: "Are you sure you want to delete this audience(s)? Remeber that there could be some courses that use this information. It's better if you edit the information",
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
              <Loading message="Loading audiences..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Audiences <AccessibilityNewIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title: this.props.language.youHaveAudiences, 
                        pagination: this.props.language.audiencePerPage,
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
                      addLabel="Add new audience"
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
                  <p className="empty-dashboard-text">You don't have any audience created yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.showAddDialog()} variant="contained" color="primary" className="empty-dashboard-button">Create an audience</Button>
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
                      value={this.state.audience.name}
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
                      value={this.state.audience.description}
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
                      value={this.state.audience.name}
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
                      value={this.state.audience.description}
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
