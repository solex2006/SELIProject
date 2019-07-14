import React from 'react';
import Table from '../data_display/Table';


export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headRows: [
        { id: 'title', numeric: false, disablePadding: false, label: 'Course title' },
        { id: 'courseDuration', numeric: true, disablePadding: false, label: 'Course duration' },
        { id: 'numberOfUnits', numeric: true, disablePadding: false, label: 'Number of units #' },
        { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'tutor', numeric: false, disablePadding: false, label: 'Tutor' },
      ],
    }
  }

  addFromTable(){
      this.props.showForm("CourseForm", true);
  }

  setSelected(){}

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Registered courses</div>
          <div className="courses-table-container">
            <Table
              courses={this.props.courses}
              type="course"
              tableToolbarHeader="Courses general information"
              add={this.addFromTable.bind(this)}
              deleteFunction={this.props.deleteCourses.bind(this)}
              headRows={this.state.headRows}
              addLabel="create course"
              setSelectedFunction={selected => this.setSelected = selected}
            />
          </div>
        </div>
      </div>
    );
  }
}
