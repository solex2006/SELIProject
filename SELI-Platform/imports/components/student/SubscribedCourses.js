import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';

import CourseSubscription from '../../components/course/CourseSubscription';
import SchoolIcon from '@material-ui/icons/School';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

export default class SubscribedCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }
   // this.cursos = React.createRef();
  }

  componentDidMount() {
    this.props.getSubscribedCourses(() => this.getSubscribedCourses());
    this.getSubscribedCourses();
    //this.cursos.current.focus();
  }

  componentWillReceiveProps() {
    this.getSubscribedCourses();
  }

  getSubscribedCourses = () => {
    this.setState({
      courses: [],
      loading: true,
    }, () => {
      let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
      this.buildCourses(user[0].profile.courses);
    })
  }

  buildCourses = (courses) => {
    let ids = [];
    courses.map(course => {
      ids.push(course.courseId);
    });
    Tracker.autorun(() => {
      let coursesInformation = Courses.find(
        { _id: {
          $in: ids
        }}
      ).fetch();
      courses.map(course => {
        coursesInformation.map(information => {
          information._id === course.courseId ?
          course.information = information : undefined
        })
      });
      this.setState({
        courses: courses,
        loading: false,
      });
    });
  }

  handleClickCourse = (_id) => {
    const index = this.state.courses.findIndex(course => course.information._id === _id);
    this.props.handleClickCourse(this.state.courses[index]);
  }

  render() {
    return(
      <div  tabIndex="-1" className="subscriptions-dashboard-container">
        <h1  className="management-title">{this.props.language.mySubscriptions}<SchoolIcon className="management-title-icon"/></h1>
        <Divider/>
        {
          this.state.loading ?
            <div tabIndex="-1" className="dashboard-loading-container">
              <Loading tabIndex="-1" message={this.props.language.loadingCourses}/>
            </div>
          :
          <div tabIndex="-1">
            {
              this.state.courses.length ?
                <div tabIndex="-1" className="subscriptions-dashboard-result">
                  {
                    this.state.courses.map((course, index) => {
                      return (
                        <CourseSubscription
                          tabIndex="-1"
                          course={course.information}
                          progress={course.progress}
                          disabled={this.props.disabled}
                          unsubscribe={this.props.unsubscribe.bind(this)}
                          handleClickCourse={this.handleClickCourse.bind(this)}
                          language={this.props.language}
                        />
                      )
                    })
                  }
                </div>
              :
              <div  tabIndex="-1" className="empty-dashboard">
                <div  tabIndex="-1" className="empty-dashboard-row">
                  <p  tabIndex="-1" className="empty-dashboard-text">{this.props.language.youAreNotSubscribed}</p>
                  <InfoIcon tabIndex="-1" className="empty-dashboard-icon"/>
                </div>
                <Button tabIndex="-1" onClick={() => this.props.showComponent('courses')} variant="contained" color="primary" className="empty-dashboard-button">{this.props.language.checkOutCourses}</Button>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
