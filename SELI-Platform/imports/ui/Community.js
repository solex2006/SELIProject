import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import MainMenu from '../components/navigation/MainMenu';
import Loading from '../components/tools/Loading';
import { Activities } from '../../lib/ActivitiesCollection';

import StoryCard from '../components/course/StoryCard';
import CourseCard from '../components/course/CourseCard';




export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    }
  }

  componentDidMount() {
    Tracker.autorun(() => {
      let stories = Activities.find({'activity.type': { $in: [ "storytelling", "storytelling-time" ] },}).fetch();
      this.setState({
        stories: stories,
      }, () => {
        console.log(this.state.stories);
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
              !this.state.stories.length ?
                <div className="dashboard-loading-container">
                  <Loading message="Loading Stories..."/>
                </div>
              :
              <div className="courses-dashboard-result">
                {
                  this.state.stories.map((course, index) => {
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
