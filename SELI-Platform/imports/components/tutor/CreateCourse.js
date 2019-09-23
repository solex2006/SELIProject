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
      courseForms: [
        <CourseInformation courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseRequirements courseInformation={this.state.courseInformation} requirementsList={this.state.requirementsList} buildedItems={this.state.buildedItems} showControlMessage={this.showControlMessage.bind(this)}/>,
        <CourseCreatorTool courseInformation={this.state.courseInformation} showControlMessage={this.showControlMessage.bind(this)} expandedNodes={this.state.expandedNodes} selected={this.state.selected}/>,
      ],
    });
  }

  publishCourse() {
    if (this.validatePublishCourse()) {
      if (this.state.saved) {
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
              published: true,
              creationDate: new Date(),
              classroom: [],
            }
          }
        );
      }
      else {
        let user = Meteor.user();
        let courseInformation = this.state.courseInformation;
        courseInformation.creationDate = new Date();
        courseInformation.createdBy = user.username;
        courseInformation.published = true;
        courseInformation.classroom = [];
        let course = Courses.insert(courseInformation);
      }
    }
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

  validatePublishCourse = () => {
    let courseInformation = this.state.courseInformation;
    if (
      courseInformation.title === '' ||
      courseInformation.subtitle === '' ||
      courseInformation.description === '' ||
      courseInformation.duration === ''
    ) {
      this.props.handleControlMessage(true, 'Fields marked with an asterisk (*) are required (Step 1 Course information)', false, '', '');
      return false;
    }
    if (!courseInformation.keyWords.length) {
      this.props.handleControlMessage(true, 'Add one or more keywords so users can search your courses (Step 1 Course information)', false, '', '');
      return false;
    }
    if (!courseInformation.requirements.length) {
      this.props.handleControlMessage(true, 'Select the technical requirements that your course will require (Step 2)', false, '', '');
      return false;
    }
    if (!courseInformation.support.length) {
      this.props.handleControlMessage(true, 'Select what the audience(s) that your course will support (Step 2)', false, '', '');
      return false;
    }
    if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, 'Chose the organization of the course to save it (Step 3 Program)', false, '', '');
      return false;
    }
    let emptyContent = false;
    if (courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        unit.lessons.map(lesson => {
          if (!lesson.items.length) {
            this.props.handleControlMessage(true, `You are missing to add content to ${courseInformation.organization.unit.toLowerCase()}: ${unit.name} - ${courseInformation.organization.subunit.toLowerCase()}: ${lesson.name}`, false, '', '');
            emptyContent = true;
          }
        })
      })
    }
    if (!courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        if (!unit.items.length) {
          this.props.handleControlMessage(true, `You are missing to add content to ${courseInformation.organization.unit.toLowerCase()}: ${unit.name}`, false, '', '');
          emptyContent = true;
        }
      })
    }
    if (emptyContent) {
      return false;
    }
    return true;
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
