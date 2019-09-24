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
      toComplete: this.props.activeCourse.toComplete,
      toResolve: this.props.activeCourse.toResolve,
      coursePresentation: true,
      selected: this.props.selected,
    }
  }

  componentDidMount() {
    this.resumeNavigation();
  }

  resumeNavigation = () => {
    if (this.props.selected[0] !== -1) {
      this.setState({
        coursePresentation: false,
        courseContent: true,
      });
    }
  }

  navigateTo(level, to) {
    let selected = this.state.selected;
    selected.splice(0, selected.length)
    selected.push(to[0], to[1]);
    this.setState({
      selected: selected,
      coursePresentation: false,
      courseContent: true,
    });
  }

  showPresentation() {
    let selected = this.state.selected;
    selected.splice(0, selected.length)
    selected.push(-1, -1);
    this.setState({
      selected: selected,
      coursePresentation: true,
      courseContent: false,
    });
  }

  completeUnit = (index) => {
    let toComplete = this.state.toComplete;
    toComplete[index] = true;
    this.setState({
      toComplete: toComplete,
    });
    index + 1 < toComplete.length ?
    this.navigateTo('unit', [(index + 1), undefined]) : undefined
  }

  render() {
    return(
      <div className="course-container">
        <CourseMenu
          course={this.state.course}
          progress={this.state.progress}
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
              completeUnit={this.completeUnit.bind(this)}
              selected={this.state.selected}
              toComplete={this.state.toComplete}
              toResolve={this.state.toResolve}
            />
          :
          undefined
        }
      </div>
    )
  }
}
