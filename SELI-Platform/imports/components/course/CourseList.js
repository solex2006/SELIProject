import React from 'react';
import Table from '../data_display/Table';


export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Registered courses</div>
          <div className="courses-table-container">
            <Table
              courses={this.props.courses}
            />
          </div>
        </div>
      </div>
    );
  }
}
