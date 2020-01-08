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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Courses} from '../../../lib/CourseCollection';

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSteps: [
        {label: this.props.language.information, icon: <InfoIcon className="step-icon"/>},
        {label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon"/>},
        {label: this.props.language.program, icon: <SchoolIcon className="step-icon"/>},
      ],
      courseInformation: {
        title: '',
        subtitle: '',
        description: '',
        language: '',
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
        <CourseInformation
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <CourseRequirements
          courseInformation={this.state.courseInformation}
          requirementsList={this.state.requirementsList}
          buildedItems={this.state.buildedItems}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <CourseCreatorTool
          courseInformation={this.state.courseInformation}
          expandedNodes={this.state.expandedNodes}
          selected={this.state.selected}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          handlePreview={this.handlePreview.bind(this)}
          language={this.props.language}
        />,
      ],
    });
  }  

  componentDidUpdate(prevProps) {
    if (prevProps.language.languageIndex !== this.props.language.languageIndex) {
      this.setState({
        courseSteps: [
          {label: this.props.language.information, icon: <InfoIcon className="step-icon"/>},
          {label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon"/>},
          {label: this.props.language.program, icon: <SchoolIcon className="step-icon"/>},
        ],
        courseForms: [
          <CourseInformation
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseRequirements
            courseInformation={this.state.courseInformation}
            requirementsList={this.state.requirementsList}
            buildedItems={this.state.buildedItems}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseCreatorTool
            courseInformation={this.state.courseInformation}
            expandedNodes={this.state.expandedNodes}
            selected={this.state.selected}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            handlePreview={this.handlePreview.bind(this)}
            language={this.props.language}
          />,
        ],
      });
    }
  }

  publishCourse() {
    let courseInformation = this.state.courseInformation;
    let course;
    if (this.validatePublishCourse()) {
      if (this.state.saved) {
        Courses.update(
          { _id: this.state.saved },
          { $set:
            {
              title: courseInformation.title,
              subtitle: courseInformation.subtitle,
              description: courseInformation.description,
              language: courseInformation.language,
              keyWords: courseInformation.keyWords,
              image: courseInformation.image,
              sylabus: courseInformation.sylabus,
              duration: courseInformation.duration,
              requirements: courseInformation.requirements,
              support: courseInformation.support,
              organization: courseInformation.organization,
              program: courseInformation.program,
              published: true,
              creationDate: new Date(),
              classroom: [],
            }
          }
        );
        course = this.state.saved;
      }
      else {
        let user = Meteor.user();
        courseInformation.creationDate = new Date();
        courseInformation.createdBy = user.username;
        courseInformation.published = true;
        courseInformation.classroom = [];
        course = Courses.insert(courseInformation);
      }
      this.props.handleControlMessage(true, this.props.language.coursePublishedS, true, this.props.language.preview, this.props.language.seePreview, course);
    }
  }

  saveCourse(showPreview) {
    if (this.validateSaveCourse()) {
      let user = Meteor.user();
      let courseInformation = this.state.courseInformation;
      let course;
      if (!this.state.saved) {
        courseInformation.createdBy = user.username;
        courseInformation.published = false;
        courseInformation.classroom = [];
        course = Courses.insert(courseInformation);
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
              requirements: courseInformation.requirements,
              support: courseInformation.support,
              organization: courseInformation.organization,
              program: courseInformation.program,
            }
          }
        );
      }
      if (showPreview) {
        const url = `/coursePreview#${course}`;
        window.open(url, "_blank");
      }
      this.props.handleControlMessage(true, this.props.language.courseSavedS, true, this.props.language.savedList, this.props.language.seeList);
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
      this.props.handleControlMessage(true, `${this.props.language.fieldsMarkedWith} (${this.props.language.step} 1 ${this.props.language.information})`, false, '', '');
      return false;
    }
    if (!courseInformation.image === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseImage} (${this.props.language.step} 1 ${this.props.language.information})`, false, '', '');
      return false;
    }
    if (!courseInformation.sylabus === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseSyllabus} (${this.props.language.step} 1 ${this.props.language.information})`, false, '', '');
      return false;
    }
    if (!courseInformation.keyWords.length) {
      this.props.handleControlMessage(true, `${this.props.language.addOneOrMore} (${this.props.language.step} 1 ${this.props.language.information})`, false, '', '');
      return false;
    }
    if (!courseInformation.requirements.length) {
      this.props.handleControlMessage(true, `${this.props.language.technicalRequirement} (${this.props.language.step} 2 ${this.props.language.requirements})`, false, '', '');
      return false;
    }
    if (!courseInformation.support.length) {
      this.props.handleControlMessage(true, `${this.props.language.audienceRequirement} (${this.props.language.step} 2 ${this.props.language.requirements})`, false, '', '');
      return false;
    }
    if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, `${this.props.language.organizationRequirement} (${this.props.language.step} 3 ${this.props.language.program})`, false, '', '');
      return false;
    }
    let emptyContent = false;
    if (courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        unit.lessons.map(lesson => {
          if (!lesson.items.length) {
            this.props.handleControlMessage(true, `${this.props.language.contentRequirement} ${courseInformation.organization.unit.toLowerCase()}: ${unit.name} - ${courseInformation.organization.subunit.toLowerCase()}: ${lesson.name}`, false, '', '');
            emptyContent = true;
          }
        })
      })
    }
    if (!courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        if (!unit.items.length) {
          this.props.handleControlMessage(true, `${this.props.language.contentRequirement} ${courseInformation.organization.unit.toLowerCase()}: ${unit.name}`, false, '', '');
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
      this.props.handleControlMessage(true, `${this.props.language.titleRequirement} (${this.props.language.step} 1 ${this.props.language.information})`, false, '', '');
      return false;
    }
    if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, `${this.props.language.organizationRequirement} (${this.props.language.step} 3 ${this.props.language.program})`, false, '', '');
      return false;
    }
    return true;
  }

  handlePreview = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  validatePreviewCourse = () => {

  }

  confirmPreview = () => {
    if (this.validatePublishCourse()) {
      if (this.state.saved) {
        const url = `/coursePreview#${this.state.saved}`;
        window.open(url, "_blank");
      }
      else {
        this.saveCourse(true);
      }
      this.handleClose();
    }
  }

  render() {
    return(
      <div>
        {
          this.state.courseForms !== undefined ?
            <FormStepper
              language={this.props.language}
              title={this.props.language.createCourse}
              color="primary"
              steps={this.state.courseSteps}
              forms={this.state.courseForms}
              finalLabel={this.props.language.publishCourse}
              saveLabel={this.props.language.saveCourse}
              finalAction={this.publishCourse.bind(this)}
              saveAction={this.saveCourse.bind(this)}
            />
          :
          undefined
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.coursePreview}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
            {this.props.language.ifYouWantCP}
            </DialogContentText>
            <InfoIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
            {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.confirmPreview()} color="primary" autoFocus>
            {this.props.language.saoPreview}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
