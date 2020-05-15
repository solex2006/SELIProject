import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FormStepper from '../navigation/FormStepper'; '../'
import CourseInformation from '../course/CourseInformation';

import CourseAnalysisPhase from '../course/CourseAnalysisPhase';
import CourseDesignPhase from '../course/CourseDesignPhase';

import CourseSpiralCourse from "../course/CourseSpiralCourse";
import CourseSpiralContent from "../course/CourseSpiralContent";
import CourseSpiralTopic from "../course/CourseSpiralTopic";
import CourseSpiralProblem from "../course/CourseSpiralProblem";
import CourseSpiralActivity from "../course/CourseSpiralActivity";
import CourseChoseModel from "../course/CourseChoseModel";

import CourseTechRequirements from '../course/CourseTechRequirements';
import CourseCreatorTool from '../course/CourseCreatorTool';
import { Meteor } from 'meteor/meteor';
import InfoIcon from '@material-ui/icons/Info';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SchoolIcon from '@material-ui/icons/School';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import { Courses } from '../../../lib/CourseCollection';
import { Activities } from '../../../lib/ActivitiesCollection';


export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSteps: [
        // { label: this.props.language.analysisPhase, icon: <SearchIcon className="step-icon" /> },
        // { label: this.props.language.designPhase, icon: <ListIcon className="step-icon" /> },
        { label: this.props.language.information, icon: <InfoIcon className="step-icon" /> },
        { label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon" /> },
        { label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon" /> },
        { label: this.props.language.program, icon: <SchoolIcon className="step-icon" /> },

        { label: this.props.language.program, icon: <SchoolIcon className="step-icon" /> },
        
        { label: this.props.language.program, icon: <SchoolIcon className="step-icon" /> },
        
      ],
      courseInformation: {
        title: '',
        subtitle: "",
        description: '',
        technicalRequirement:'',
        language: '',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: 0,
        durationweeks: 0,
        requirements: [],
        support: [],
        organization: '',
        signature: '',
        level: '',
        type: '',
        program: [],
      },
      indexNext: 0,
      lists: [],
      buildedItems: false,
      expandedNodes: [],
      selected: [0, 0],
      saved: false,
      action: "",
      openSelection: false,
      openModelSelection: false,
      courseType: ""
    }
  }

  showControlMessage() {
  }

  componentDidMount() {
    if (this.props.courseToEdit) {
      this.setState({
        courseInformation: {
          title: this.props.courseToEdit.title,
          subtitle: this.props.courseToEdit.subtitle,
          description: this.props.courseToEdit.description,
          language: this.props.courseToEdit.language,
          keyWords: this.props.courseToEdit.keyWords,
          image: this.props.courseToEdit.image,
          sylabus: this.props.courseToEdit.sylabus,
          duration: this.props.courseToEdit.duration,
          requirements: this.props.courseToEdit.requirements,
          support: this.props.courseToEdit.support,
          organization: this.props.courseToEdit.organization,
          program: this.props.courseToEdit.program,
          classroom: this.props.courseToEdit.classroom,
        },
        saved: this.props.courseToEdit._id,
      }, () => { this.loadingData() })
    } else { this.loadingData() }
  }

  loadingData = () => {
    this.setState({
      courseForms: [
        // this.state.courseType === "guide" ? <CourseAnalysisPhase
        //   courseInformation={this.state.courseInformation}
        //   handleControlMessage={this.props.handleControlMessage.bind(this)}
        //   language={this.props.language}
        //   handleNextFather={this.handleNextFather.bind(this)}
        // /> : undefined,
        // this.state.courseType === "guide" ? <CourseDesignPhase
        //   courseInformation={this.state.courseInformation}
        //   handleControlMessage={this.props.handleControlMessage.bind(this)}
        //   language={this.props.language}
        //   handleNextFather={this.handleNextFather.bind(this)}
        // /> : undefined,
        <CourseInformation
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <CourseTechRequirements
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
          buildedItems={this.state.buildedItems}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <CourseChoseModel
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
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

        <CourseAnalysisPhase
          courseInformation={this.state.courseInformation}
          expandedNodes={this.state.expandedNodes}
          selected={this.state.selected}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          handlePreview={this.handlePreview.bind(this)}
          language={this.props.language}
/>,

<CourseSpiralCourse
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
          // { label: this.props.language.analysisPhase, icon: <SearchIcon className="step-icon" /> },
          // { label: this.props.language.designPhase, icon: <ListIcon className="step-icon" /> },
          { label: this.props.language.information, icon: <InfoIcon className="step-icon" /> },
          { label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon" /> },
          { label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon" /> },
          { label: this.props.language.program, icon: <SchoolIcon className="step-icon" /> },
        ]
      });
      this.loadingData();
    }
  }

  publishCourse() {
    if (this.validatePublishCourse()) {
      this.saveCourse();
      if (this.state.saved) {
        Courses.update(
          { _id: this.state.saved },
          { $set: { published: true } }
        );
        this.props.showComponent('published')
        this.props.handleControlMessage(true, this.props.language.coursePublishedS, true, 'preview', this.props.language.seePreview, this.state.saved);
      } else {
        this.props.handleControlMessage(true, this.props.language.saveCourse);
      }
    }
  }

  saveCourse() {
    if (this.validateSaveCourse()) {
      let user = Meteor.user();
      let courseInformation = this.state.courseInformation;
      let course;
      let valueSubtitle = courseInformation.subtitle;
      let valueduration = courseInformation.duration;
      if (valueSubtitle === undefined) {
        valueSubtitle = "-----"
      }
      if (valueduration === undefined) {
        valueduration = "0"
      }
      if (!this.state.saved) {
        courseInformation.creationDate = new Date();
        courseInformation.createdBy = user.username;
        courseInformation.published = false;
        courseInformation.classroom = [];
        course = Courses.insert(courseInformation);
        this.setState({
          saved: course,
        });
        this.props.savedCourseState();
        this.props.createForum(courseInformation, course);
      }
      else {
        Courses.update(
          { _id: this.state.saved },
          {
            $set:
            {
              title: courseInformation.title,
              subtitle: valueSubtitle,
              description: courseInformation.description,
              language: courseInformation.language,
              keyWords: courseInformation.keyWords,
              image: courseInformation.image,
              sylabus: courseInformation.sylabus,
              duration: valueduration,
              durationweeks: courseInformation.durationweeks,
              requirements: courseInformation.requirements,
              support: courseInformation.support,
              organization: courseInformation.organization,
              program: courseInformation.program,
              classroom: courseInformation.classroom,
              creationDate: new Date(),
            }
          }
        );
        this.props.savedCourseState();
        this.createForum(courseInformation, this.state.saved);
      }
      this.props.handleControlMessage(true, this.props.language.courseSavedS, true, 'savedList', this.props.language.seeList);
    }
  }

  createForum = (course, courseId) => {
    if (course.organization.subunit) {
      course.program.map((unit, index) => {
        let unitIndex = index;
        unit.lessons.map((lesson, index) => {
          let lessonIndex = index;
          lesson.items.map((item, index) => {
            if (item.type === "activity" && item.attributes.type === "forum" && item.attributes.activityId === undefined) {
              this.createForumItem(item.id, courseId, unitIndex, index, lessonIndex);
            }
          })
        })
      })
    } else {
      course.program.map((topic, index) => {
        let topicIndex = index;
        topic.items.map((item, index) => {
          if (item.type === "activity" && item.attributes.type === "forum" && item.attributes.activityId === undefined) {
            this.createForumItem(item.id, courseId, topicIndex, index);
          }
        })
      })
    }
  }

  createForumItem = (itemId, courseId, parentIndex, index, childIndex) => {
    let courseInformation = this.state.courseInformation;
    let activity = {
      data: [],
      type: 'forum',
      public: false,
    }
    let activityId;
    if (itemId && courseId) {
      activity.date = new Date();
      activity.user = Meteor.userId();
      activity.course = courseId;
      activityId = Activities.insert({
        activity
      });
    }
    let program = Courses.findOne({ _id: courseId }).program;
    if (childIndex) {
      program[parentIndex].lessons[childIndex].items[index].attributes.activityId = activityId;
    } else {
      program[parentIndex].items[index].attributes.activityId = activityId;
    }
    Courses.update(
      { _id: courseId },
      { $set: { program: program } }
    )
    courseInformation.program = program;
    this.setState({
      courseInformation: courseInformation,
    })
  }

  validatePublishCourse = () => {
    let courseInformation = this.state.courseInformation;
    if (
      courseInformation.title === '' ||
      courseInformation.description === '' ||
      courseInformation.duration === ''
    ) {
      this.props.handleControlMessage(true, `${this.props.language.fieldsMarkedWith} (${this.props.language.step} 1: ${this.props.language.information})`, false, '', '');
      return false;
    }
    else if (courseInformation.image === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseImage} (${this.props.language.step} 1: ${this.props.language.information})`, false, '', '');
      return false;
    }
    else if (courseInformation.sylabus === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseSyllabus} (${this.props.language.step} 1: ${this.props.language.information})`, false, '', '');
      return false;
    }
    else if (!courseInformation.keyWords.length) {
      this.props.handleControlMessage(true, `${this.props.language.addOneOrMore} (${this.props.language.step} 1: ${this.props.language.information})`, false, '', '');
      return false;
    }
    /*  else if (courseInformation.duration < 5) {
       this.props.handleControlMessage(true, `${this.props.language.minimumCourseDuration} (${this.props.language.step} 1: ${this.props.language.information})`, false, '', '');
       return false;
     } */
    /* else if (!courseInformation.requirements.length) {
      this.props.handleControlMessage(true, `${this.props.language.technicalRequirement} (${this.props.language.step} 2: ${this.props.language.requirements})`, false, '', '');
      return false;
    }
    else if (!courseInformation.support.length) {
      this.props.handleControlMessage(true, `${this.props.language.disabilitieRequirement} (${this.props.language.step} 2: ${this.props.language.requirements})`, false, '', '');
      return false;
    } */
    else if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, `${this.props.language.organizationRequirement} (${this.props.language.step} 3: ${this.props.language.program})`, false, '', '');
      return false;
    }

    let emptyContent = false;
    if (courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        unit.lessons.map(lesson => {
          if (!lesson.items.length) {
            this.props.handleControlMessage(true, `${this.props.language[courseInformation.organization.unit.toLowerCase()]}: ${unit.name} - ${this.props.language[courseInformation.organization.subunit.toLowerCase()]}: ${lesson.name} ${this.props.language.contentRequirement}`, false, '', '');
            emptyContent = true;
          }
        })
      })
    }
    if (!courseInformation.organization.subunit) {
      courseInformation.program.map(unit => {
        if (!unit.items.length) {
          this.props.handleControlMessage(true, `${this.props.language[courseInformation.organization.unit.toLowerCase()]} ${unit.name} ${this.props.language.contentRequirement}`, false, '', '');
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
    if (this.validatePublishCourse()) {
      this.setState({
        open: true,
        action: "preview",
      })
    }
  }

  handlePublish = () => {
    this.setState({
      open: true,
      action: "publish",
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleCloseSelection = () => {
    this.setState({ openSelection: false });
  }

  handleCloseModelSelection = () => {
    this.setState({ openModelSelection: false });
  }

  confirmPreview = () => {
    this.saveCourse();
    this.handleClose();
  }

  handleNextFather = () => {
    console.log("handleNext");
    this.setState({
      indexNext: this.state.indexNext + 1
    })
  }

  setCourseType = (type) => {
    let tmp = this.state.courseSteps;
    let tmpForms = this.state.courseForms;
    if (type === "guide") {
      tmp.unshift(
        { label: this.props.language.analysisPhase, icon: <SearchIcon className="step-icon" /> },
        { label: this.props.language.designPhase, icon: <ListIcon className="step-icon" /> },
      )
      tmpForms.unshift(
        <CourseAnalysisPhase
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
          handleNextFather={this.handleNextFather.bind(this)}
        />,
        <CourseDesignPhase
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
          handleNextFather={this.handleNextFather.bind(this)}
        />
      )
      this.setState({
        courseSteps: tmp,
        courseType: type,
        openSelection: false
      })

    }
    if (type === "model") {
      this.setState({
        openModelSelection: true
      })
    }
    if (type === "free") {
      this.setState({
        openSelection: false
      })
    }
  }

  setCourseModel = (model) => {
    let tmp = this.state.courseSteps;
    let tmpForms = this.state.courseForms;
    if (model === "spiral") {
      // tmp.unshift(
      //   { label: this.props.language.analysisPhase, icon: <SearchIcon className="step-icon" /> },
      //   { label: this.props.language.designPhase, icon: <ListIcon className="step-icon" /> },
      // )
      // tmpForms.unshift(
      //   <CourseAnalysisPhase
      //     courseInformation={this.state.courseInformation}
      //     handleControlMessage={this.props.handleControlMessage.bind(this)}
      //     language={this.props.language}
      //     handleNextFather={this.handleNextFather.bind(this)}
      //   />,
      //   <CourseDesignPhase
      //     courseInformation={this.state.courseInformation}
      //     handleControlMessage={this.props.handleControlMessage.bind(this)}
      //     language={this.props.language}
      //     handleNextFather={this.handleNextFather.bind(this)}
      //   />
      // )
      this.setState({
        courseSteps: [
          { label: 'Course Info', icon: <SearchIcon className="step-icon" /> },
          { label: 'Course Content', icon: <SearchIcon className="step-icon" /> },
          { label: 'Course Topic', icon: <SearchIcon className="step-icon" /> },
          { label: 'Course Problem', icon: <SearchIcon className="step-icon" /> },
          { label: 'Course Activity', icon: <SearchIcon className="step-icon" /> },
        ],
        courseForms: [
          <CourseSpiralCourse
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseSpiralContent
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseSpiralTopic
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseSpiralProblem
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
          <CourseSpiralActivity
            courseInformation={this.state.courseInformation}
            handleControlMessage={this.props.handleControlMessage.bind(this)}
            language={this.props.language}
          />,
        ],
        openModelSelection: false,
        openSelection: false
      })
      // import CourseSpiralCourse from "../course/spiral/CourseSpiralCourse";
      // import CourseSpiralContent from "../course/spiral/CourseSpiralContent";
      // import CourseSpiralTopic from "../course/spiral/CourseSpiralTopic";
      // import CourseSpiralProblem from "../course/spiral/CourseSpiralProblem";
      // import CourseSpiralActivity from "../course/spiral/CourseSpiralActivity";
    }
  }

  render() {
    return (
      <div>
        {
          this.state.courseForms !== undefined ?
            <FormStepper
              language={this.props.language}
              title={this.props.courseToEdit ? this.props.language.editing : this.props.language.createCourse}
              color="primary"
              steps={this.state.courseSteps}
              forms={this.state.courseForms}
              indexNext={this.state.indexNext}
              finalLabel={this.props.language.publishCourse}
              saveLabel={this.props.language.saveCourse}
              finalAction={this.handlePublish.bind(this)}
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
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">
            {this.state.action === "preview" ? this.props.language.coursePreview : this.props.language.publishCourse}
          </DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.action === "preview" ? this.props.language.ifYouWantCP : this.props.language.ifYouWantPC}
            </DialogContentText>
            <InfoIcon className="warning-dialog-icon" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            {
              this.state.action === "preview" ?
                <Link className="button-link"
                  //target="_blank"
                  onClick={() => this.confirmPreview()}
                  to={{
                    pathname: "/coursePreview",
                    hash: this.state.saved,
                    state: { fromDashboard: true },
                    query: { language: this.props.language }
                  }}
                >
                  <Button color="primary" autoFocus>
                    {this.props.language.saoPreview}
                  </Button>
                </Link>
                :
                <Button onClick={() => this.publishCourse()} color="primary" autoFocus>
                  {this.props.language.ok}
                </Button>
            }
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openSelection}
          onClose={this.handleCloseSelection}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="dialog"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar" variant="dense" disableGutters={true}>
                <AppsIcon />
                <h4 className="dialog-label-title">{
                  // this.state.contentaAdded ?
                  //   this.state.showAccessibilityForm ?
                  //     `${this.props.language.accessibility} - ${this.state.languageType}`
                  //     :
                  //     `${this.props.language.contentEditor} - ${this.state.languageType}`
                  //   : this.props.language.courseOrganization
                  "New Course"
                }
                </h4>
                {/* <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  //disabled={this.state.showCourseOrganization || this.state.showAccessibilityOptions || this.state.showAccessibilityForm}
                  onClick={() => {
                    this.handleCloseSelection();
                    if (this.state.contentToEdit === undefined) {
                      this.cancelContentCreation();
                    }
                  }}
                >
                  <CloseIcon/>
                </IconButton> */}
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className="success-dialog-content">
            {/* <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.action === "preview" ? this.props.language.ifYouWantCP : this.props.language.ifYouWantPC}
            </DialogContentText>
            <InfoIcon className="warning-dialog-icon" /> */}
            {/* <div class="button-row"> */}
            <div>
              {
                // this.props.courseInformation.organization.unit === "Unit" ?
                <Button onClick={() => this.setCourseType("free")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="orange-avatar" className="avatar">M</Avatar> */}
                  {"Free"}
                  {/* {this.props.language.byUnitsAndLessons} */}
                </Button>
                // :
                // undefined
              }
              {
                // this.props.courseInformation.organization.unit === "Topic" ?
                <Button onClick={() => this.setCourseType("model")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="blue-avatar" className="avatar">S</Avatar> */}
                  {"Using a Model"}
                  {/* {this.props.language.byTopics} */}
                </Button>
                // :
                // undefined
              }
              {
                // this.props.courseInformation.organization.unit === "Topic" ?
                <Button onClick={() => this.setCourseType("guide")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="green-avatar" className="avatar">P</Avatar> */}
                  {"Instructional Design"}
                  {/* {this.props.language.byTopics} */}
                </Button>
                // :
                // undefined
              }
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openModelSelection}
          onClose={this.handleCloseModelSelection}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="dialog"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar" variant="dense" disableGutters={true}>
                <AppsIcon />
                <h4 className="dialog-label-title">{
                  // this.state.contentaAdded ?
                  //   this.state.showAccessibilityForm ?
                  //     `${this.props.language.accessibility} - ${this.state.languageType}`
                  //     :
                  //     `${this.props.language.contentEditor} - ${this.state.languageType}`
                  //   : this.props.language.courseOrganization
                  "Course Model"
                }
                </h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  //disabled={this.state.showCourseOrganization || this.state.showAccessibilityOptions || this.state.showAccessibilityForm}
                  onClick={() => {
                    this.handleCloseModelSelection();
                    if (this.state.contentToEdit === undefined) {
                      // this.cancelContentCreation();
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className="success-dialog-content">
            {/* <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.action === "preview" ? this.props.language.ifYouWantCP : this.props.language.ifYouWantPC}
            </DialogContentText>
            <InfoIcon className="warning-dialog-icon" /> */}
            {/* <div class="button-row"> */}
            <div>
              {
                // this.props.courseInformation.organization.unit === "Unit" ?
                <Button onClick={() => this.setCourseModel("metaphora")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="orange-avatar" className="avatar">L</Avatar> */}
                  {"Metaphora"}
                  {/* {this.props.language.byUnitsAndLessons} */}
                </Button>
                // :
                // undefined
              }
              {
                // this.props.courseInformation.organization.unit === "Topic" ?
                <Button onClick={() => this.setCourseModel("spiral")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="blue-avatar" className="avatar">M</Avatar> */}
                  {"Spiral"}
                  {/* {this.props.language.byTopics} */}
                </Button>
                // :
                // undefined
              }
              {
                // this.props.courseInformation.organization.unit === "Topic" ?
                <Button onClick={() => this.setCourseModel("toybox")} fullWidth>{/*} className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>*/}
                  {/* <Avatar id="green-avatar" className="avatar">A</Avatar> */}
                  {"Toy Box"}
                  {/* {this.props.language.byTopics} */}
                </Button>
                // :
                // undefined
              }
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
