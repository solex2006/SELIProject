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

import { Feedback } from '../../../lib/FeedbackCollection';

export default class BugsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
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
    this.getBugs();
  }

  showDeleteConfirmation = (_id) => {
    let studentsToDelete = [];
    studentsToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete bugs(s)',
        dialogConfirmationContentText: "Are you sure you want to delete this bugs(s)? Remeber that there could be some courses that use this information. It's better if you edit the information",
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      studentsToDelete: studentsToDelete,
    });
  }

  getBugs = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let bugs = Feedback.find({type: 'report'}).fetch();
        this.setState({
          bugs: bugs,
        }, () => {
          let results = true;
          if (this.state.bugs.length) {
            this.createTableData(this.state.bugs);
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
    })
  }

  createTableData = (bugs) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
      { id: 'from', numeric: true, disablePadding: false, label: 'Sent by' },
      { id: 'date', numeric: true, disablePadding: false, label: 'Date sent' },
    ];
    let menuOptions = [

    ];
    bugs.map(bug => {
      tableData.push({title: bug.title, description: bug.description, from: bug.from, date: bug.date.toLocaleDateString('en-US'), _id: bug._id})
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

  setSelected(){}

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading bugs..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Registered bugs <AccountCircleIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title:'Number of bugs:', 
                        pagination: 'Bugs per page:', 
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
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">No bugs registered yet</p>
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
              this.state.dialog.action === "information" ?
                <UserCard
                  user={this.state.bugs[this.state.selected]}
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
