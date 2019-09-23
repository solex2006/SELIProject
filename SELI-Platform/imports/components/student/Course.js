import React, { Component } from 'react';

import Loading from '../tools/Loading';
import { Courses } from '../../../lib/CourseCollection';

import CourseMenu from './CourseMenu';
import CoursePresentation from './CoursePresentation';
import CourseContent from './CourseContent';

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.activeCourse.information,
      progress: this.props.activeCourse.progress,
      coursePresentation: true,
      selected: [-1, -1],
    }
  }

  componentDidMount() {

  }

  navigateTo(level, to) {
    this.setState({
      selected: to,
      coursePresentation: false,
      courseContent: true,
    });
  }

  showPresentation() {
    this.setState({
      coursePresentation: true,
      courseContent: false,
      selected: [-1, -1],
    });
  }

  render() {
    return(
      <div className="course-container">
        <CourseMenu
          course={this.state.course}
          navigateTo={this.navigateTo.bind(this)}
          selected={this.state.selected}
          showPresentation={this.showPresentation.bind(this)}
        />
        {
          this.state.coursePresentation ?
            <CoursePresentation
              course={this.state.course}
              navigateTo={this.navigateTo.bind(this)}
              selected={this.state.selected}
            />
          :
          undefined
        }
        {
          this.state.courseContent ?
            <CourseContent
              course={this.state.course}
              showComponent={this.props.showComponent.bind(this)}
              navigateTo={this.navigateTo.bind(this)}
              selected={this.state.selected}
            />
          :
          undefined
        }
      </div>
    )
  }
}
