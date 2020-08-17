import React, { Component } from 'react';

import { Accounts } from 'meteor/accounts-base';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import Table from '../data_display/Table';
import UserCard from './UserCard';

import SchoolIcon from '@material-ui/icons/School';
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

export default class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
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
    this.getCourses();
  }

  showDeleteConfirmation = (_id) => {
    let coursesToDelete = [];
    coursesToDelete.push(_id);
    this.setState({
      dialog: {
        title: 'Delete courses(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this course(s)? Remeber that there could be some students and tutors that are subscribed to this course.',
        action: 'delete',
        confirmActionLabel: 'Delete'
      },
      open: true,
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }

  getCourses = () => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let courses = Courses.find({}).fetch();
        this.setState({
          courses: courses,
        }, () => {
          let results = true;
          if (this.state.courses.length) {
            this.createTableData(this.state.courses);
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

  createTableData = (courses) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'organization', numeric: true, disablePadding: false, label: 'Organization' },
      { id: 'createdBy', numeric: true, disablePadding: false, label: 'Created by' },
      { id: 'state', numeric: true, disablePadding: false, label: 'State' },
      { id: 'classroom', numeric: true, disablePadding: false, label: 'Subscribed' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "See preview", icon: <TabIcon/>, action: this.showPreview.bind(this)},
      {label: "Delete" , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
    ];
    courses.map(course => {
      tableData.push({
        title: course.title,
        organization: course.organization.label,
        createdBy: course.createdBy,
        state: course.published ? 'Published' : 'Not published',
        classroom: course.classroom.length ? `${course.classroom.length} student(s) subscribed` : `No students subscribed`,
        _id: course._id
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

  deleteSelected = (courses) => {
    let coursesToDelete = [];
    courses.map(course => {coursesToDelete.push(course)});
    this.setState({
      dialog: {
        title: 'Delete course(s)',
        dialogConfirmationContentText: 'Are you sure you want to delete this course(s)? Remeber that there could be some students and tutors that are subscribed to this course.',
        action: 'delete',
        confirmActionLabel: 'Delete course(s)'
      },
      open: true,
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }

  delete = () => {
    this.state.coursesToDelete.map((course, index) => {
      let students = Courses.findOne({_id: course}).classroom;
      let courseId = course;
      students.map(student => {
        var user = Meteor.users.findOne({_id: student});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === courseId);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.call("UpdateCourses", student, user.profile.courses, (error, response) =>  {})
      })
      Courses.remove({_id: course}, () => {
        this.props.handleControlMessage(true, "Course(s) deleted successfully");
        this.handleClose();
        this.setSelected();
      })
    });
  }

  setSelected(){}

  showPreview = (_id) => {
    let course = this.state.courses.find( course => course._id === _id );
    if (course.published) {
      const url = `/coursePreview#${_id}`;
      window.open(url, "_blank");
    }
    else {
      this.props.handleControlMessage(true, "You can't see the preview of an unpublished course")
    }
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading courses..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">Registered courses <SchoolIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title:'Number of courses:', 
                        pagination: 'Courses per page:', 
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
                  <p className="empty-dashboard-text">No courses registered yet</p>
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
