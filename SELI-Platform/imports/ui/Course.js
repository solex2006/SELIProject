import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import MainMenu from '../components/navigation/MainMenu';
import Loading from '../components/tools/Loading';
import { Courses } from '../../lib/CourseCollection';

import CourseMenu from '../components/student/CourseMenu';
import CoursePresentation from '../components/student/CoursePresentation';
import CourseContent from '../components/student/CourseContent';

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      coursePresentation: true,
      selected: [-1, -1],
    }
  }

  componentDidMount() {
    Tracker.autorun(() => {
      let course = Courses.find().fetch();
      this.setState({
        course: course,
      }, () => {
        console.log(this.state.course);
      });
    });
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
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className="course-container">
            {
              !this.state.course.length ?
                <div className="loading-course-container">
                  <Loading message="loading course..."/>
                </div>
              :
              <div>
                <CourseMenu
                  course={this.state.course[1]}
                  navigateTo={this.navigateTo.bind(this)}
                  selected={this.state.selected}
                  showPresentation={this.showPresentation.bind(this)}
                />
                {
                  this.state.coursePresentation ?
                    <CoursePresentation
                      course={this.state.course[1]}
                      navigateTo={this.navigateTo.bind(this)}
                      selected={this.state.selected}
                    />
                  :
                  undefined
                }
                {
                  this.state.courseContent ?
                    <CourseContent
                      course={this.state.course[1]}
                      navigateTo={this.navigateTo.bind(this)}
                      selected={this.state.selected}
                    />
                  :
                  undefined
                }
              </div>
            }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
