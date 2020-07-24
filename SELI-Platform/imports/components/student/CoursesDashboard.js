import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import CourseCard from '../../components/course/CourseCard';
import InfoIcon from '@material-ui/icons/Info';

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
        if(this.props.searchText){
          this.setState({
            courses: this.props.searchText,
          });
          this.props.cleanSearchText();
        } else {
          this.setState({
            courses: courses,
          });
        }
    });
  }

  componentDidUpdate(prevProps){
    if (prevProps.searchText !== this.props.searchText ){
      if(this.props.searchText){
        this.setState({
          courses: this.props.searchText,
        });
        this.props.cleanSearchText();
      }
    }
  }

  render() {
    return(
      <div className="courses-dashboard-container">
        <div className="courses-dashboard-title-container">
          <h1 className="courses-dashboard-title-text">{this.props.language.seliCourses}</h1>
        </div>
        <Divider/>
        {
          !this.state.courses.length ?
            <div className="empty-dashboard-title-row">
              <p className="empty-dashboard-text">{this.props.language.weAreCreatingCourses}</p>
              <InfoIcon className="empty-dashboard-icon"/>
            </div>
          :
          <div className="courses-dashboard-result">
            {
              this.state.courses.map((course, index) => {
                return(
                  <CourseCard
                    course={course}
                    index={index}
                    language={this.props.language}
                    disabled={this.props.disabled}
                    subscribe={this.props.subscribe.bind(this)}
                    unsubscribe={this.props.unsubscribe.bind(this)}
                    //key={Math.random()}
                  />
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}
