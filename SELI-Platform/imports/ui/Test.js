import React, { Component } from 'react';

import FormStepper from '../components/navigation/FormStepper';
import AppBar from '../components/navigation/AppBar';
import CourseInformation from '../components/course/CourseInformation';
import CourseRequirements from '../components/course/CourseRequirements';
import CourseCreatorTool from '../components/course/CourseCreatorTool';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import InfoIcon from '@material-ui/icons/Info';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SchoolIcon from '@material-ui/icons/School';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSteps: [
        {label: 'Information', save: 'Save course information', edit: 'Edit course information', icon: <InfoIcon color="primary"/>},
        {label: 'Requirements', save: 'Save course requirements', edit: 'Edit course requirements', icon: <PlaylistAddCheckIcon color="primary"/>},
        {label: 'Program', save: 'Save course program', edit: 'Edit course program', icon: <SchoolIcon color="primary"/>},
      ],
      courseInformation: {
        title: '',
        subtitle: '',
        description: '',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: '',
        modalities: [],
        methodologies: [],
      },
      requirementsList: [],
      buildedItems: false,
    }
  }

  showControlMessage(){

  }

  componentDidMount() {
    this.setState({
      courseForms: [
        <CourseInformation courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseRequirements requirementsList={this.state.requirementsList} buildedItems={this.state.buildedItems} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseCreatorTool showControlMessage={this.showControlMessage.bind(this)}/>,
      ],
    })
  }

  getUnityAttributes(){}

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          {
            this.state.courseForms !== undefined ?
              <FormStepper
                title="Create course"
                color="primary"
                steps={this.state.courseSteps}
                forms={this.state.courseForms}
              />
            :
            undefined
          }
        </MuiThemeProvider>
      </div>
    )
  }
}
