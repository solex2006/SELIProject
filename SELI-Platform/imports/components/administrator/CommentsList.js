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

import { Comments } from '../../../lib/CommentsCollection';

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
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
    this.getComments();
  }

  showHideConfirmation = (_id) => {
    let commentToChange = [];
    commentToChange.push(_id);
    this.setState({
      dialog: {
        title: 'Change show/hide comments(s)',
        dialogConfirmationContentText: "Are you sure you want to show/hide this comments(s)?",
        action: 'show/hide',
        confirmActionLabel: 'show/hide'
      },
      open: true,
      confirmAction: () => this.handleShow(),
      commentToChange: commentToChange,
    });
  }

  getComments = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let comments = Comments.find({}).fetch();
        this.setState({
          comments: comments,
        }, () => {
          let results = true;
          if (this.state.comments.length) {
            this.createTableData(this.state.comments);
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

  createTableData = (comments) => {
    let tableData = [];
    let headRows = [
      { id: 'comment', numeric: false, disablePadding: true, label: 'Comment' },
      { id: 'user', numeric: true, disablePadding: false, label: 'Username' },
      { id: 'course', numeric: true, disablePadding: false, label: 'Course' },
      { id: 'show', numeric: true, disablePadding: false, label: 'Displayed' },
      { id: 'date', numeric: true, disablePadding: false, label: 'Date commented' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Show/Hide" , icon: <DeleteIcon/>, action: this.showHideConfirmation.bind(this)},
    ];
    comments.map(comment => {
      tableData.push({
        comment: comment.comment,
        user: comment.user,
        course: comment.course,
        show: comment.show ? 'Yes' : 'No',
        date: comment.date.toLocaleDateString('en-US'),
        _id: comment._id
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

  handleShow = () => {
    this.state.commentToChange.map((commentId, index) => {
      let comment = this.state.comments.find( comment => comment._id === commentId );
      Comments.update(
        { _id: commentId},
        { $set: {
          show: !comment.show,
        }}
        , () => {
          this.props.handleControlMessage(true, "State changed successfully!");
          this.handleClose();
        }
      )
    });
  }

  setSelected(){}

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading comments..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Registered comments <AccountCircleIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title:'Number of comments:', 
                        pagination: 'Comments per page:', 
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
                  <p className="empty-dashboard-text">No comments registered yet</p>
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
              this.state.dialog.action === "information" ?
                <UserCard
                  user={this.state.comments[this.state.selected]}
                />
              :
              undefined
            }
            {
              this.state.dialog.action === "show/hide" ?
                <div>
                  <DialogContentText style={{padding: "0 1vw"}}>{this.state.dialog.dialogConfirmationContentText}</DialogContentText>
                  <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">Cancel</Button>
                    <Button variant="outlined" onClick={() => this.state.confirmAction()} color="primary">{this.state.dialog.confirmActionLabel}</Button>
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
