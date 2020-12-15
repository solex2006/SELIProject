import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import MainMenu from '../components/navigation/MainMenu';
import Loading from '../components/tools/Loading';
import { Courses } from '../../lib/CourseCollection';

import CourseCard from '../components/course/CourseCard';



export default class CoursesDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    
    Tracker.autorun(() => {
      let courses = Courses.find({published: true}).fetch();
      this.setState({
        courses: courses,
      }, () => {
        console.log(this.state.courses);
      });
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className="courses-dashboard-container">
            {
              !this.state.courses.length ?
                <div className="dashboard-loading-container">
                  <Loading message="Loading courses..."/>
                </div>
              :
              <div className="courses-dashboard-result">
                {
                  this.state.courses.map((course, index) => {
                    return(
                      <CourseCard
                        course={course}
                        index={index}
                      />
                    )
                  })
                }
              </div>
            }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
