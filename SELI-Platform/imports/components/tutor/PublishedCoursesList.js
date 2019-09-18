import React, { Component } from 'react';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../tutor/Table';

import SchoolIcon from '@material-ui/icons/School';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
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
    this.getMyCourses(this.props.user.username);
  }

  getMyCourses = (user) => {
    Tracker.autorun(() => {
      let myCourses = Courses.find({createdBy: user, published: true}).fetch();
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

  unpublish = (_id) => {

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
      {label: "Unpublish course" , icon: <UnarchiveIcon/>, action: this.unpublish.bind(this)},
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
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my courses..."/>
            </div>
          :
          <div className="management-result-container">
            <p className="management-title">My published courses <SchoolIcon className="management-title-icon"/></p>
            <div className="management-table-container">
              <Table
                labels={{pagination: 'Courses per page:', plural: 'courses'}}
                headRows={this.state.headRows}
                menuOptions={this.state.menuOptions}
                tableData={this.state.tableData}
                delete={false}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}
