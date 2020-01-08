import React, { Component } from 'react';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../data_display/Table';

import StudentProfile from './StudentProfile';

import SchoolIcon from '@material-ui/icons/School';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import TabIcon from '@material-ui/icons/Tab';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class PublishedCoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: [],
      courseProfiles: [],
    }
  }

  componentDidMount() {
    this.getMyCourses(this.props.user.username);
  }

  getMyCourses = (user) => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let myCourses = Courses.find({createdBy: user, published: true}).fetch();
        this.setState({
          myCourses: myCourses,
        }, () => {
          let results = true;
          if (this.state.myCourses.length) {
            this.createTableData(this.state.myCourses);
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

  preview = (_id) => {
    const url = `/coursePreview#${_id}`;
    window.open(url, "_blank");
  }

  unpublish = (_id) => {
    Courses.update(
      { _id: this.state.courseToUnpublish },
      { $set:
        {
          published: false,
        }
      }
    );
    this.handleClose();
    this.props.handleControlMessage(true, 'Course unpublished, you can find it in your saved courses!', true, 'savedList', 'See list');
  }

  createTableData = (myCourses) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'organization', numeric: true, disablePadding: false, label: 'Organization' },
      { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
      { id: 'creationDate', numeric: true, disablePadding: false, label: 'Creation Date' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Course preview", icon: <TabIcon/>, action: this.preview.bind(this)},
      {label: "Classroom management" , icon: <GroupIcon/>, action: this.openClassroomManagement.bind(this)},
      {label: "Unpublish course" , icon: <UnarchiveIcon/>, action: this.showUnpublishConfirmation.bind(this)},
    ];
    myCourses.map(course => {
      tableData.push({title: course.title, organization: course.organization.label, duration: `${course.duration} hours`, creationDate: course.creationDate.toLocaleDateString('en-US'), _id: course._id})
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

  showUnpublishConfirmation = (_id) => {
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Unpublish course',
      dialogConfirmationContentText: `Are you sure you want to unpublish this course? All your suscriptors won't be able to access the course content`,
      courseToUnpublish: _id,
      confirmAction: () => this.unpublish(),
    });
  }

  openClassroomManagement = (_id) => {
    let courses = this.state.myCourses;
    let course = courses.find(course => course._id === _id);
    let classroom = course.classroom;
    let results = true;
    if (classroom.length) {
      this.setState({
        loadingProfiles: true,
      });
      let courseProfiles = [];
      classroom.map(student => {
        Tracker.autorun(() => {
          Meteor.call("GetUserById", student, (error, response) =>  {
              if (response) {
                let courseProfile = response[0].profile.courses.find(course => course.courseId === _id);
                courseProfiles.push({
                  studentId: student,
                  courseProfile: courseProfile,
                  studentInformation: {
                    fullname: response[0].profile.fullname,
                    username: response[0].username,
                    dateJoined: response[0].createdAt,
                  }
                });
              }
              if (courseProfiles.length === classroom.length) {
                this.setState({
                  loadingProfiles: false,
                  courseProfiles: courseProfiles,
                });
              }
          });
        });
      });
    }
    else {
      results = false;
    }
    this.setState({
      openClassroom: true,
      classroomResults: results,
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseClassroom = () => {
    this.setState({ openClassroom: false });
  };

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my courses..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">My published courses <SchoolIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                    <Table
                      labels={{title:'You have', pagination: 'Courses per page:', plural: 'courses'}}
                      headRows={this.state.headRows}
                      menuOptions={this.state.menuOptions}
                      tableData={this.state.tableData}
                      delete={false}
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">You don't have any course published yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.props.showComponent('create')} variant="contained" color="secondary" className="empty-dashboard-button">Create a course</Button>
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
        <Dialog
          open={this.state.openClassroom}
          onClose={this.handleCloseClassroom}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseClassroom} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                Classroom management
              </Typography>
              <p className="app-tooltip">Press Esc to return to published courses</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="classroom-dialog-content">
            {
              this.state.classroomResults ?
                <React.Fragment>
                  {
                    this.state.loadingProfiles ?
                      <div className="loading-course-container">
                        <Loading message="Loading students..."/>
                      </div>
                    :
                    <React.Fragment>
                      <DialogContentText className="classroom-dialog-title" id="alert-dialog-description">
                        Students in your classroom
                      </DialogContentText>
                      <div className="classroom-management-students-container">
                        {
                          this.state.courseProfiles.map((profile, index) => {
                            return(
                              <StudentProfile
                                profile={profile}
                                handleControlMessage={this.props.handleControlMessage.bind(this)}
                                reload={this.openClassroomManagement.bind(this)}
                              />
                            )
                          })
                        }
                      </div>
                    </React.Fragment>
                  }
                </React.Fragment>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">You don't have any student subscribed in this course yet</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
