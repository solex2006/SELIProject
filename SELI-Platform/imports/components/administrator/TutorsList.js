import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import Table from '../data_display/Table';
import UserCard from './UserCard';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

import { Courses } from '../../../lib/CourseCollection';

export default class TutorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
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
    this.getTutors();
  }

  showDeleteConfirmation = (_id) => {
    let tutorsToDelete = [];
    tutorsToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete tutors(s)',
        dialogConfirmationContentText: "Are you sure you want to delete this tutors(s)? Remeber that there could be some courses that use this information. It's better if you edit the information",
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      tutorsToDelete: tutorsToDelete,
    });
  }

  getTutors = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        Meteor.call("GetTutors", (error, response) =>  {
          this.setState({
            tutors: response,
          }, () => {
            let results = true;
            if (this.state.tutors.length) {
              this.createTableData(this.state.tutors);
            }
            else {
              results = false;
            }
            this.setState({
              loading: false,
              results: results,
            })
          })
        });
      });
    })
  }

  fullInformation = (_id) => {
    let tutors = this.state.tutors;
    const index = tutors.findIndex(tutor => tutor._id === _id);
    this.setState({
      selected: index,
      dialog: {
        title: "User information",
        action: "information",
      }
    }, () => {
      this.handleClickOpen();
    })
  }

  createTableData = (tutors) => {
    let tableData = [];
    let headRows = [
      { id: 'fullname', numeric: false, disablePadding: true, label: 'Full Name' },
      { id: 'username', numeric: true, disablePadding: false, label: 'Username' },
      { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "See full information", icon: <TabIcon/>, action: this.fullInformation.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    tutors.map(tutor => {
      tableData.push({fullname: tutor.profile.fullname, username: tutor.username, email: tutor.emails[0].address, _id: tutor._id})
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

  deleteSelected = (tutors) => {
    let tutorsToDelete = [];
    tutors.map(tutor => {tutorsToDelete.push(tutor)});
    this.setState({
      dialog: {
        title: 'Delete tutor(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this tutor(s)? Remeber that there could be some courses that use this information.',
        action: 'delete',
        confirmActionLabel: 'Delete tutor(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      tutorsToDelete: tutorsToDelete,
    });
  }

  delete = () => {
    this.state.tutorsToDelete.map((tutor, index) => {
      Meteor.call("DeleteUser", tutor, (error, response) =>  {
        if (error) {
          console.log(error);
        }
        else {
          this.handleClose();
          this.setSelected();
          this.getTutors();
          this.props.handleControlMessage(true, 'Tutor(s) deleted successfully!', false, '', '');
        }
      });
    });
  }

  setSelected(){}

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading tutors..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Registered tutors <AccountCircleIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title:'Number of tutors:', 
                        pagination: 'Tutors per page:',
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
                      refresh={true}
                      refreshAction={this.getTutors.bind(this)}
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">No tutors registered yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
              </div>
            }
          </React.Fragment>
        }
        <Dialog disableBackdropClick={true} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
          <DialogTitle className="success-dialog-title" id="simple-dialog-title">{this.state.dialog.title}</DialogTitle>
          <div className="center-row">
            {
              this.state.dialog.action === "information" ?
                <UserCard
                  user={this.state.tutors[this.state.selected]}
                />
              :
              undefined
            }
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
