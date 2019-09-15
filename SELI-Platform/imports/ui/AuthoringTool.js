import React, { Component } from 'react';

import FormStepper from '../components/navigation/FormStepper';
import MessageCard from '../../imports/components/tools/MessageCard';
import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';
import CourseInformation from '../components/course/CourseInformation';
import CourseRequirements from '../components/course/CourseRequirements';
import CourseCreatorTool from '../components/course/CourseCreatorTool';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import InfoIcon from '@material-ui/icons/Info';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SchoolIcon from '@material-ui/icons/School';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import {Courses} from '../../lib/CourseCollection';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSteps: [
        {label: 'Information', icon: <InfoIcon className="step-icon"/>},
        {label: 'Requirements', icon: <PlaylistAddCheckIcon className="step-icon"/>},
        {label: 'Program', icon: <SchoolIcon className="step-icon"/>},
      ],
      courseInformation: {
        title: '',
        subtitle: '',
        description: '',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: '',
        requirements: [],
        support: [],
        organization: {label: "Organization by topics", unit: "Topic", subunit: false},
        program: [
          {
            "name": "JavaScript",
            "items": []
          },
          {
            "name": "What is React?",
            "items": []
          },
          {
            "name": "What is Material UI?",
            "items": []
          },
          {
            "name": "Creating react project",
            "items": []
          },
          {
            "name": "NPM",
            "items": []
          },
          {
            "name": "Render function",
            "items": []
          },
          {
            "name": "React component life cycle",
            "items": []
          },
          {
            "name": "ECMS6",
            "items": []
          },
          {
            "name": "Importing components",
            "items": []
          },
          {
            "name": "Material UI components",
            "items": []
          },
          {
            "name": "TextFields",
            "items": []
          },
          {
            "name": "React events",
            "items": []
          }
        ],
      },
      requirementsList: [],
      buildedItems: false,
      expandedNodes: [],
      selected: [0, 0],
    }
  }

  showControlMessage(){

  }

  componentDidMount() {
    this.setState({
      courseForms: [
        <CourseInformation courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseRequirements courseInformation={this.state.courseInformation} requirementsList={this.state.requirementsList} buildedItems={this.state.buildedItems} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseCreatorTool courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)} expandedNodes={this.state.expandedNodes} selected={this.state.selected}/>,
      ],
    })
  }

  saveCourse() {
    let courseInformation = this.state.courseInformation;
    courseInformation.creationDate = new Date();
    courseInformation.createdBy = "mateo1309"
    let course = Courses.insert(courseInformation);
  }

  render() {
    return(
      <div>
        {
          <MuiThemeProvider theme={theme}>
            <AppBar/>
            {
              this.state.courseForms !== undefined ?
                <FormStepper
                  title="Create course"
                  color="primary"
                  steps={this.state.courseSteps}
                  forms={this.state.courseForms}
                  finalLabel="Publish course"
                  saveLabel="Save course"
                  finalAction={this.saveCourse.bind(this)}
                  finalMessage={
                    <MessageCard
                      title="Course published successfully!"
                      icon={<DoneAllIcon className="message-card-icon"/>}
                    />
                  }
                />
              :
              undefined
            }
          </MuiThemeProvider>
        }
      </div>
    )
  }
}
