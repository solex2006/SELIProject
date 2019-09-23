import React, { Component } from 'react';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../tutor/Table';

import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getMyCourses(this.props.user.username);
  }

  getMyCourses = (user) => {
    Tracker.autorun(() => {
      let myCourses = Courses.find({createdBy: user, published: false}).fetch();
      this.setState({
        myCourses: myCourses,
      }, () => {
        if (this.state.myCourses.length) {
          this.createTableData(this.state.myCourses);
        }
      });
    });
  }

  edit = (_id) => {
    let myCourses = this.state.myCourses;
    let course = myCourses.find( course => course._id === _id );
    this.props.editCourse(course);
  }

  showDeleteConfirmation = (_id) => {
    let coursesToDelete = [];
    coursesToDelete.push(_id);
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Delete courses',
      dialogConfirmationContentText: 'Are you sure you want to delete this course? You will lose all the information of the course, except the images, videos, audios and all the files that you have uploaded to your library.',
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }

  deleteSelected = (courses) => {
    let coursesToDelete = [];
    courses.map(course => {coursesToDelete.push(course)});
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Delete courses',
      dialogConfirmationContentText: 'Are you sure you want to delete this course(s)? You will lose all the information of the course, except the images, videos, audios and all the files that you have uploaded to your library.',
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }

  delete = () => {
    this.state.coursesToDelete.map((course, index) => {
      Courses.remove({_id: course});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, 'Course(s) deleted successfully!', false, '', '');
  }

  createTableData = (myCourses) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'organization', numeric: true, disablePadding: false, label: 'Organization' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Resume editing", icon: <EditIcon/>, action: this.edit.bind(this)},
      {label: "Delete course" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    myCourses.map(course => {
      tableData.push({title: course.title, organization: course.organization.label, _id: course._id})
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
    this.setState({ open: false, coursesToDelete:[] });
  };

  setSelected(){}

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my courses..."/>
            </div>
          :
          <div className="management-result-container">
            <p className="management-title">My saved courses <SchoolIcon className="management-title-icon"/></p>
            <div className="management-table-container">
              <Table
                labels={{pagination: 'Courses per page:', plural: 'courses'}}
                headRows={this.state.headRows}
                menuOptions={this.state.menuOptions}
                tableData={this.state.tableData}
                delete={true}
                deleteSelected={this.deleteSelected.bind(this)}
                setSelectedFunction={selected => this.setSelected = selected}
              />
            </div>
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
        }
      </div>
    )
  }
}
