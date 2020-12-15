import React, { Component } from 'react';

import Loading from '../tools/Loading';
import { Activities } from '../../../lib/ActivitiesCollection';
import Table from '../data_display/Table';

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import DownloadIcon from "@material-ui/icons/CloudDownload";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CourseFilesCollection from "../../../lib/CourseFilesCollection";
import ImportButton from '../tools/ImportButton';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStories: [],
      loading: true,
      download: {
        completed: false,
        success: false,
        link: ''
      },
      downloadOpen: false,
    }
  }

  componentDidMount() {
    document.title=this.props.language.myStories;
    this.getStories();
    
  }

  getStories = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let myStories = Activities.find({
          'activity.user': Meteor.userId(),
          'activity.type': { $in: [ "storytelling", "storytelling-time" ] },
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
      dialogConfirmationTitle: this.props.language.deleteStories,
      dialogConfirmationContentText: this.props.language.deleteStoriesWarning,
      confirmAction: () => this.delete(),
      storiesToDelete: storiesToDelete,
    });
  }

  deleteSelected = (stories) => {
    let storiesToDelete = [];
    stories.map(story => {storiesToDelete.push(story)});
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: this.props.language.deleteStories,
      dialogConfirmationContentText: this.props.language.sureDeleteStory,
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
    this.props.handleControlMessage(true, this.props.language.storyDeletedSuccess, false, '', '');
  }

  createTableData = (myStories) => {
    let tableData = [];
    let headRows = [
      { id: 'name', numeric: false, disablePadding: true, label: this.props.language.name },
      { id: 'type', numeric: true, disablePadding: false, label: this.props.language.type },
      { id: 'date', numeric: true, disablePadding: false, label: this.props.language.dateCreated },
      { id: 'actions', numeric: true, disablePadding: false, label: this.props.language.actions },
    ];
    let menuOptions = [
      {label: this.props.language.openInEditor, icon: <EditIcon/>, action: this.edit.bind(this)},
      {label: this.props.language.delete , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
      {label: this.props.language.download , icon: <DownloadIcon/>, action: this.downloadStory.bind(this)},
    ];
    myStories.map(story => {
      tableData.push({
        name: story.activity.name,
        type: story.activity.type === "storytelling" ? this.props.language.scenes : this.props.language.timeline,
        date: story.activity.date.toLocaleDateString('en-US'), 
        _id: story._id})
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

  downloadStory = (id) => {
    var params = {
      id: id,
      type: 'story'
    };
    //Add authentication headers in URL
    const searchParams = new URLSearchParams(params); 
    var url = [Meteor.settings.public.URL_SITE+'file', searchParams].join('?');
    //Open window
    window.open(url);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, storiesToDelete:[] });
  };

  setSelected(){}

  // Download Video
  showDownloadForm = (_id) => {
    let myStories = this.state.myStories;
    let story = myStories.find( story => story._id === _id );
    this.setState({
      downloadOpen: true
    });

    Meteor.call('saveAsVideo', _id, Meteor.userId(), (err, fileId) => {
      let download = { ...this.state.download };
      download.completed = true;
      if (err) {
        console.log(err);
        download.success = false;
      } else {
        setTimeout(() => {
          const file = this.getStoryVideo(fileId, _id);

          if (file) {
            download.success = true;
            download.name = story.activity.name
            download.link = file.link();          
          } else {
            download.success = false;
          }
          this.setState({
            download: download
          });
        }, 100);
      }

    })    
  }

  getStoryVideo = (fileId, storyId) => {
    let file = CourseFilesCollection.findOne({ _id: fileId });
    if (!file) {
      file = CourseFilesCollection.findOne({ name: storyId + '.mp4' });
    }
    return file;
  }

  handleDownloadClose = () => {
    this.setState({
      downloadOpen: false,
      download: {
        completed: false,
        success: false,
        link: ''
      }
    });
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message={this.props.language.loadingMyStories}/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">{this.props.language.myStories}<CollectionsBookmarkIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <div className="import-button-container">
                      <ImportButton
                        file="story"
                        language={this.props.language}
                      />
                    </div>
                    <Table
                      labels={{
                        title: this.props.language.youHaveStories, 
                        pagination: this.props.language.storiesPerPage,
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
                  <p className="empty-dashboard-text">{this.props.language.notHaveStoriesYet}</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.props.showComponent('storytelling')} variant="contained" color="secondary" className="empty-dashboard-button">{this.props.language.createAStory}</Button>
              </div>
            }
          </React.Fragment>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
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
              {this.props.language.cancel}
            </Button>
            <Button variant="outlined" onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              {this.props.language.confirm}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.downloadOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.downloadStoryTelling}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              
            </DialogContentText>
            
            {this.state.download.completed ? 
              <div>
                <div>{this.props.language.downloadVideoDesc}</div>
                {this.state.download.success ?
                <p><a href={this.state.download.link} target="_blank" download>{this.state.download.name}</a></p>
                : 
                  <div>{this.props.language.downloadVideoError}</div>
                }
              </div>
            :
              <div>{this.props.language.downloadVideoState}</div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDownloadClose()} color="primary" autoFocus>
              {this.props.language.close_button}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }
  }
