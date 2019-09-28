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

  calculateProgress = (toComplete, toResolve) => {
    let total = toComplete.length + toResolve.length;
    let unitPercentage  = parseFloat(100/total);
    let progress = 0;
    toComplete.map(completed => completed ? progress += unitPercentage : undefined);
    toResolve.map(resolved => resolved ? progress += unitPercentage : undefined);
    progress = progress.toFixed(2);
    if (progress === 99.99) {
      progress = 100;
    }
    return progress;
  }

  completeUnit = (index) => {
    let toComplete = this.state.toComplete;
    let toResolve = this.state.toResolve;
    toComplete[index] = true;
    let progress = this.calculateProgress(toComplete, toResolve);
    this.setState({
      toComplete: toComplete,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteSection", Meteor.userId(),
        this.state.toComplete,
        this.state.course._id,
        progress,
        (error, response) =>  {

      });
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
