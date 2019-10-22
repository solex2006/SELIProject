import React, { Component } from 'react';

import Loading from '../../components/tools/Loading';
import { Activities } from '../../../lib/ActivitiesCollection';
import Table from '../data_display/Table';

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStories: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getStories();
  }

  getStories = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let myStories = Activities.find({
          'activity.user': Meteor.userId(),
          'activity.type': "storytelling",
        }).fetch();
        this.setState({
          myStories: myStories,
        }, () => {
          let results = true;
          if (this.state.myStories.length) {
            this.createTableData(this.state.myStories);
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

  edit = (_id) => {
    let myStories = this.state.myStories;
    let story = myStories.find( story => story._id === _id );
    this.props.editStory(story);
  }

  showDeleteConfirmation = (_id) => {
    let storiesToDelete = [];
    storiesToDelete.push(_id);
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Delete stories',
      dialogConfirmationContentText: 'Are you sure you want to delete this story? You will lose all the information of the story, except the images, videos, audios and all the files that you have uploaded to your library.',
      confirmAction: () => this.delete(),
      storiesToDelete: storiesToDelete,
    });
  }

  deleteSelected = (stories) => {
    let storiesToDelete = [];
    stories.map(story => {storiesToDelete.push(story)});
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Delete stories',
      dialogConfirmationContentText: 'Are you sure you want to delete this story/stories?.',
      confirmAction: () => this.delete(),
      storiesToDelete: storiesToDelete,
    });
  }

  delete = () => {
    this.state.storiesToDelete.map((story, index) => {
      Activities.remove({_id: story});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, 'Story/stories deleted successfully!', false, '', '');
  }

  createTableData = (myStories) => {
    let tableData = [];
    let headRows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'date', numeric: true, disablePadding: false, label: 'Date created' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Open on editor", icon: <EditIcon/>, action: this.edit.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    myStories.map(story => {
      tableData.push({name: story.activity.name, date: story.activity.date.toDateString(), _id: story._id})
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, storiesToDelete:[] });
  };

  setSelected(){}

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my stories..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">My stories <CollectionsBookmarkIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{title:'You have', pagination: 'Stories per page:', plural: 'stories'}}
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
                  <p className="empty-dashboard-text">You don't have any story yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.props.showComponent('storytelling')} variant="contained" color="secondary" className="empty-dashboard-button">Create a story</Button>
              </div>
            }
          </React.Fragment>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.dialogConfirmationTitle}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogConfirmationContentText}
            </DialogContentText>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }
  }
