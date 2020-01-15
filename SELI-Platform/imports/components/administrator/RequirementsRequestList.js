import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import Table from '../data_display/Table';
import UserCard from './UserCard';

import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import TabIcon from '@material-ui/icons/Tab';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { Feedback } from '../../../lib/FeedbackCollection';
import { Requirements } from '../../../lib/RequirementsCollection';

export default class DisabilitieRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [],
      loading: true,
      open: false,
      dialog: {
        title: '',
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

  showDeleteConfirmation = (_id) => {
    let disabilitiesToDelete = [];
    disabilitiesToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete requirement requests(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this request(s)?',
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      disabilitiesToDelete: disabilitiesToDelete,
    });
  }

  getDisabilities = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let requirements = Feedback.find({type: 'technical', answered: false}).fetch();
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
    })
  }

  createTableData = (requirements) => {
    let tableData = [];
    let headRows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'date', numeric: true, disablePadding: false, label: 'Date recived' },
      { id: 'from', numeric: true, disablePadding: false, label: 'From user' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Approve request", icon: <ThumbUpAltIcon/>, action: this.approveRequirement.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    requirements.map(requirement => {
      tableData.push({
        name: requirement.name,
        description: requirement.description,
        date: requirement.date.toLocaleDateString('en-US'),
        from: requirement.from,
        _id: requirement._id
      })
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

  deleteSelected = (requirements) => {
    let disabilitiesToDelete = [];
    requirements.map(requirement => {disabilitiesToDelete.push(requirement)});
    this.setState({
      dialog: {
        title: 'Delete request(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this request(s)?',
        action: 'delete',
        confirmActionLabel: 'Delete request(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      disabilitiesToDelete: disabilitiesToDelete,
    });
  }

  delete = () => {
    this.state.disabilitiesToDelete.map((requirement, index) => {
      Feedback.remove({_id: requirement});
    });
    this.handleClose();
    this.props.handleControlMessage(true, "Request(s) deleted successfully")
  }

  setSelected(){}

  approveRequirement = (_id) => {
    let requirements = this.state.requirements;
    let requirement = requirements.find( requirement => requirement._id === _id );
    Requirements.insert({
      name: requirement.name,
      description: requirement.description,
      additionDate: new Date(),
      category: {name: 'Technical'},
      type: 'Technical',
    }, () => {
      Feedback.update(
        { _id: _id},
        { $set: {
          answered: true,
        }}
        , () => {
          this.handleClose();
          this.props.handleControlMessage(true, "Request approved")
        }
      )
    })
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading requirements requests..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Requirements requests <AssignmentLateIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title:'Number of requirement requests:', 
                        pagination: 'Requests per page:', 
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
                      delete={true}
                      deleteSelected={this.deleteSelected.bind(this)}
                      setSelectedFunction={selected => this.setSelected = selected}
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">No requirement requests registered yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
              </div>
            }
          </React.Fragment>
        }
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
          <DialogTitle className="success-dialog-title" id="simple-dialog-title">{this.state.dialog.title}</DialogTitle>
          <div className="center-row">
            {
              this.state.dialog.action === "delete" ?
                <div>
                  <DialogContentText style={{padding: "0 1vw"}}>{this.state.dialog.dialogConfirmationContentText}</DialogContentText>
                  <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">Cancel</Button>
                    <Button onClick={() => this.state.confirmAction()} color="primary">{this.state.dialog.confirmActionLabel}</Button>
                  </DialogActions>
                </div>
              :
              undefined
            }
          </div>
        </Dialog>
      </div>
    )
  }
}
