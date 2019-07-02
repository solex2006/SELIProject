import React from 'react';
import Button from '@material-ui/core/Button';
import CourseRegistry from '../course/CourseRegistry';

export default class CoursePreview extends React.Component {
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
          <div className="courses-list-container">
            {
              this.props.courses.map((courses) =>
                {
                  return <CourseRegistry
                    courses={courses}
                    key={courses._id}
                    showControlMessage={this.props.showControlMessage.bind(this)}/>
                })
            }
          </div>
        </div>
      </div>
    );
  }
}
