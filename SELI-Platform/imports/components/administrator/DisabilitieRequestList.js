import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../tools/Loading';
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
import { Disabilities } from '../../../lib/DisabilitiesCollection';

export default class DisabilitieRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabilities: [],
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
        title: 'Delete disabilitie requests(s)',
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
        let disabilities = Feedback.find({type: 'disabilitie', answered: false}).fetch();
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
    })
  }

  createTableData = (disabilities) => {
    let tableData = [];
    let headRows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'date', numeric: true, disablePadding: false, label: 'Date recived' },
      { id: 'from', numeric: true, disablePadding: false, label: 'From user' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Approve request", icon: <ThumbUpAltIcon/>, action: this.approveDisabilitie.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    disabilities.map(disabilitie => {
      tableData.push({
        name: disabilitie.name,
        description: disabilitie.description,
        date: disabilitie.date.toLocaleDateString('en-US'),
        from: disabilitie.from,
        _id: disabilitie._id
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

  deleteSelected = (disabilities) => {
    let disabilitiesToDelete = [];
    disabilities.map(disabilitie => {disabilitiesToDelete.push(disabilitie)});
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
    this.state.disabilitiesToDelete.map((disabilitie, index) => {
      Feedback.remove({_id: disabilitie});
    });
    this.handleClose();
    this.props.handleControlMessage(true, "Request(s) deleted successfully")
  }

  setSelected(){}

  approveDisabilitie = (_id) => {
    let disabilities = this.state.disabilities;
    let disabilitie = disabilities.find( disabilitie => disabilitie._id === _id );
    Disabilities.insert({
      name: disabilitie.name,
      description: disabilitie.description,
      additionDate: new Date(),
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
              <Loading message="Loading disabilities requests..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Disabilities requests <AssignmentLateIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title: this.props.language.thereAreDisabilitie, 
                        pagination: this.props.language.requestPerPage,
                        filterList: this.props.language.filterList,
                        refresh: this.props.language.refresh,
                        delete: this.props.language.delete,
                        selected: this.props.language.selected,
                        nextPage: this.props.language.nextPage,
                        previousPage: this.props.language.previousPage,
                        options: this.props.language.options,
                        of: this.props.language.of,
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
                  <p className="empty-dashboard-text">No disabilities requests registered yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
              </div>
            }
          </React.Fragment>
        }
        <Dialog  disableBackdropClick={true} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
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
