import React, { Component } from 'react';

import FormStepper from '../navigation/FormStepper'; '../'
import CourseInformation from '../course/CourseInformation';
import CourseRequirements from '../course/CourseRequirements';
import CourseCreatorTool from '../course/CourseCreatorTool';

import { Meteor } from 'meteor/meteor';

import InfoIcon from '@material-ui/icons/Info';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SchoolIcon from '@material-ui/icons/School';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import {Courses} from '../../../lib/CourseCollection';

export default class CreateCourse extends React.Component {
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
        organization: '',
        program: [

        ],
      },
      requirementsList: [],
      buildedItems: false,
      expandedNodes: [],
      selected: [0, 0],
      saved: false,
    }
  }

  showControlMessage(){

  }

  componentDidMount() {
    this.setState({
      courseInformation: {
        title: this.props.courseToEdit.title,
        subtitle: this.props.courseToEdit.subtitle,
        description: this.props.courseToEdit.description,
        keyWords: this.props.courseToEdit.keyWords,
        image: this.props.courseToEdit.image,
        sylabus: this.props.courseToEdit.sylabus,
        duration: this.props.courseToEdit.duration,
        requirements: this.props.courseToEdit.requirements,
        support: this.props.courseToEdit.support,
        organization: this.props.courseToEdit.organization,
        program: this.props.courseToEdit.program,
      },
      saved: this.props.courseToEdit._id,
    }, () => {
      this.setState({
        courseForms: [
          <CourseInformation courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)}/>,
          <CourseRequirements courseInformation={this.state.courseInformation} requirementsList={this.state.requirementsList} buildedItems={this.state.buildedItems} showControlMessage={this.showControlMessage.bind(this)}/>,
          <CourseCreatorTool courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)} expandedNodes={this.state.expandedNodes} selected={this.state.selected}/>,
        ],
      })
    });
  }

  publishCourse() {
    let user = Meteor.user();
    let courseInformation = this.state.courseInformation;
    courseInformation.creationDate = new Date();
    courseInformation.createdBy = user.username;
    courseInformation.published = true;
    let course = Courses.insert(courseInformation);
  }

  saveCourse() {
    if (this.validateSaveCourse()) {
      let user = Meteor.user();
      let courseInformation = this.state.courseInformation;
      if (!this.state.saved) {
        courseInformation.createdBy = user.username;
        courseInformation.published = false;
        let course = Courses.insert(courseInformation);
        this.setState({
          saved: course,
        });
      }
      else {
        Courses.update(
          { _id: this.state.saved },
          { $set:
            {
              title: courseInformation.title,
              subtitle: courseInformation.subtitle,
              description: courseInformation.description,
              keyWords: courseInformation.keyWords,
              image: courseInformation.image,
              sylabus: courseInformation.sylabus,
              duration: courseInformation.duration,
              requirements: courseInformation.requirement,
              support: courseInformation.support,
              organization: courseInformation.organization,
              program: courseInformation.program,
            }
          }
        );
      }
      this.props.handleControlMessage(true, 'Course saved successfully!', true, 'savedList', 'See list');
    }
  }

  validateSaveCourse = () => {
    let courseInformation = this.state.courseInformation;
    if (courseInformation.title === '') {
      this.props.handleControlMessage(true, 'Write the title of the course to save it (Step 1 Course information)', false, '', '');
      return false;
    }
    if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, 'Chose the organization of the course to save it (Step 3 Program)', false, '', '');
      return false;
    }
    return true;
  }

  render() {
    return(
      <div>
        {
          this.state.courseForms !== undefined ?
            <FormStepper
              title="Create course"
              color="primary"
              steps={this.state.courseSteps}
              forms={this.state.courseForms}
              finalLabel="Publish course"
              saveLabel="Save course"
              finalAction={this.publishCourse.bind(this)}
              saveAction={this.saveCourse.bind(this)}
            />
          :
          undefined
        }
      </div>
    )
  }
}
