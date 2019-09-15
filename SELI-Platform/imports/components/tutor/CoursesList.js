import React, { Component } from 'react';

import AppBar from '../../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';
import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../tutor/Table';

import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TabIcon from '@material-ui/icons/Tab';

export default class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getMyCourses('mateo1309');
  }

  getMyCourses = (user) => {
    Tracker.autorun(() => {
      let myCourses = Courses.find({createdBy: user}).fetch();
      this.setState({
        myCourses: myCourses,
      }, () => {
        if (this.state.myCourses.length) {
          this.createTableData(this.state.myCourses);
        }
      });
    });
  }

  preview = (_id) => {
    console.log(_id);
  }

  edit = (_id) => {

  }

  delete = (_id) => {

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
      {label: "Delete course" , icon: <DeleteIcon/>, action: this.delete.bind(this)},
      {label: "Edit course" , icon: <EditIcon/>, action: this.edit.bind(this)},
    ];
    myCourses.map(course => {
      tableData.push({title: course.title, organization: course.organization.label, duration: `${course.duration} hours`, creationDate: course.creationDate.toDateString(), _id: course._id})
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

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className="management-container">
            {
              this.state.loading ?
                <div className="loading-course-container">
                  <Loading message="Loading my courses..."/>
                </div>
              :
              <div className="management-result-container">
                <p className="management-title">My courses <SchoolIcon className="management-title-icon"/></p>
                <div className="management-table-container">
                  <Table
                    labels={{pagination: 'Courses per page:', plural: 'courses'}}
                    headRows={this.state.headRows}
                    menuOptions={this.state.menuOptions}
                    tableData={this.state.tableData}
                  />
                </div>
              </div>
            }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
