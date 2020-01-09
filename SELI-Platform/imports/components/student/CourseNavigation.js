import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SubunitCourseNavigation from './SubunitCourseNavigation';
import UnitCourseNavigation from './UnitCourseNavigation';

export default class CourseNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  showControlMessage(){

  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <List
          dense
          component="nav"
          aria-labelledby="navigation-list"
          subheader={
            <ListSubheader className="course-navigation-list-subheader" component="div">
              {this.props.navigate ? this.props.courseNav : this.props.organization.label}
            </ListSubheader>
          }
          className="course-navigation-list"
        >
          {
            this.props.organization.subunit ?
              <div>
                {
                  this.props.program.map((unit, index) => {
                    return(
                      <SubunitCourseNavigation
                        unit={unit}
                        index={index}
                        organization={this.props.organization}
                        navigate={this.props.navigate}
                        selected={this.props.selected}
                        navigateTo={this.props.navigateTo.bind(this)}
                        closeDrawer={this.props.navigate ? this.props.closeDrawer.bind(this) : undefined}
                        unitLabel={this.props.unit}
                        lessonLabel={this.props.lesson}
                      />
                    )
                  })
                }
              </div>
            :
            <div>
              {
                this.props.program.map((unit, index) => {
                  return(
                    <UnitCourseNavigation
                      unit={unit}
                      index={index}
                      organization={this.props.organization}
                      selected={this.props.selected}
                      navigate={this.props.navigate}
                      navigateTo={this.props.navigateTo.bind(this)}
                      closeDrawer={this.props.navigate ? this.props.closeDrawer.bind(this) : undefined}
                      topicLabel={this.props.topic}
                    />
                  )
                })
              }
            </div>
          }
        </List>
      </div>
    )
  }
}
