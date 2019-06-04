import React, { Component } from 'react';

import course from '../../lib/course';
import forms from '../../lib/forms';
import steps from '../../lib/steps';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

import MainMenu from '../components/navigation/MainMenu';
import LanguageSelector from '../components/navigation/LanguageSelector';
import Presentation from '../components/navigation/Presentation';
import CourseNavigationPanel from '../components/navigation/CourseNavigationPanel';
import CourseForm from '../components/course/CourseForm';
import TutorForm from '../components/tutor/TutorForm';
import TutorList from '../components/tutor/TutorList';
import RequirementsForm from '../components/course/RequirementsForm';
import UnitsEditor from '../components/course/UnitsEditor';
import ContentEditor from '../components/content/ContentEditor';
import QuizEditor from '../components/activities/QuizEditor';
import LearningActivityEditor from '../components/activities/LearningActivityEditor';

import ScrollUpButton from "react-scroll-up-button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { Tutors } from '../../lib/TutorCollection';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
      language: undefined,
      controlMessage: '',
      open: false,
      forms: forms,
      steps: steps,
      courseNavigation: false,
      units: [],
      Transition: TransitionRight,
      messageDuration: 5000,
      course: course,
      category: '',
      saveTutor: false,
      disabledModalities: [
        false,
        false,
      ],
    }
  }

  saveCourse(course){
    let courseData = this.state.course;
    courseData.title = course.title;
    courseData.subtitle = course.subtitle;
    courseData.time = course.time;
    courseData.description = course.description;
    this.setState({
      course: courseData,
    });
  }

  setCourseCategory(category){
    let courseData = this.state.course;
    courseData.category = category;
    this.setState({
      course: courseData,
    });
  }

  setLanguage(language){

  }

  setNavigation(form){
    let steps = this.state.steps;
    for (var i = 0; i < steps.length; i++) {
      steps[i].active = false;
    }
    if(form === 'CourseForm'){
      steps[0].active = true;
      steps[0].enabled = true;
    }
    if(form === 'TutorList'){
      steps[1].active = true;
      steps[1].enabled = true;
      steps[0].done = true;
      steps[0].active = false;
    }
    if(form === 'RequirementsForm'){
      steps[2].active = true;
      steps[2].enabled = true;
      steps[1].done = true;
      steps[1].active = false;
    }
    if(form === 'UnitsEditor'){
      steps[3].active = true;
      steps[3].enabled = true;
      steps[2].done = true;
      steps[2].active = false;
    }
    if(form === 'ContentEditor'){
      steps[3].active = true;
      steps[3].enabled = true;
      steps[2].done = true;
      steps[2].active = false;
    }
  }

  showForm(form, courseNavigation){
    let forms = this.state.forms;
    forms.show = form;
    this.setState({
      forms: forms,
    },() => {
      if(form !== 'Presentation'){
        this.changeControlsColor('white');
        window.scrollTo(0, 0);
      }
      else {
        this.changeControlsColor('black');
      }
      if(courseNavigation){
        this.showCourseNavigation();
        this.setNavigation(form);
        this.showSaveTutor(true);
      }
      else {
        this.showSaveTutor(false);
        this.setState({
          courseNavigation: false,
        })
      }
    });
  }

  navigateTo(formId){
    if(formId == 1){
      this.showForm("CourseForm", true);
    }
    if(formId  == 2){
      this.showForm("TutorList", true);
    }
    if(formId == 3){
      this.showForm("RequirementsForm", true);
    }
    if(formId == 4){
      this.showForm("UnitsEditor", true);
    }
  }

  showCourseNavigation() {
    let courseNavigation;
    if(
      this.state.forms.show === 'CourseForm' || this.state.forms.show === 'TutorList' ||
      this.state.forms.show === 'RequirementsForm' || this.state.forms.show === 'UnitsEditor'
    ){
      courseNavigation = true;
    }
    else {
      courseNavigation = false;
    }
    this.setState({
      courseNavigation: courseNavigation,
    });
  }

  changeControlsColor(color){
    let bgMenuBars = document.getElementsByClassName('bm-burger-bars');
    if(color === 'white'){
      document.getElementById('language-selector-button').style.color = "#FFF";
      for (var i = 0; i < bgMenuBars.length; i++) {
        bgMenuBars[i].style.backgroundColor = "#FFF";
      }
    }
    else {
      document.getElementById('language-selector-button').style.color = "#09090C";
      for (var i = 0; i < bgMenuBars.length; i++) {
        bgMenuBars[i].style.backgroundColor = "#09090C";
      }
    }
  }

  createUnit(unit){
    let units = this.state.units;
    if(units.length === 0){
      unit.selected = true;
      units.push(unit);
      this.setState({
        selectedUnitIndex: 0,
        selectedUnit: units[0],
      });
    }
    else {
      unit.selected = false;
      units.push(unit);
    }
    this.setState({
      units: units,
    });
  }

  chooseUnit(unit){
    let units = this.state.units;
    let index;
    for (var i = 0; i < units.length; i++) {
      if(units[i].key === unit.key){
        index = i;
        break;
      }
    }
    for (var i = 0; i < units.length; i++) {
      units[i].selected = false;
    }
    units[index].selected = true;
    this.setState({
      units: units,
      selectedUnit: units[index],
      selectedUnitIndex: index,
    },() => {
      let forms = this.state.forms;
      forms.show = "UnitsEditor";
      this.setState({
        forms: forms,
      })
      this.showCourseNavigation();
      this.setNavigation('UnitsEditor');
    });
  }

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showControlMessage(message){
    this.setState({
      controlMessage: message,
      open: true,
    }, () => {

    });
  }

  setModality(modality){
    let course = this.state.course;
    let disabledModalities = this.state.disabledModalities;
    disabledModalities[modality.key] = true;
    course.modalities.push(modality);
    this.setState({
      course: course,
      disabledModalities: disabledModalities,
    });
  }

  removeModality(key){
    let course = this.state.course;
    for (var i = 0; i < course.modalities.length; i++) {
      if(course.modalities[i].key === key){
        course.modalities.splice(i, 1);
        break;
      }
    }
    let disabledModalities = this.state.disabledModalities;
    disabledModalities[key] = false;
    this.setState({
      course: course,
      disabledModalities: disabledModalities,
    });
  }

  showSaveTutor(show) {
    this.setState({
      saveTutor: show,
    });
  }

  checkLoadedData(){

  }

  componentDidMount(){
    Tracker.autorun(() => {
        let tutors = Tutors.find().fetch();
        this.setState({
          tutors: tutors,
        }, () => this.checkLoadedData());
      });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div id="outer-container">
            <MainMenu
              showForm={this.showForm.bind(this)}
            />
            <main id="page-wrap">
              {
                this.state.forms.show === 'Presentation' ?
                  <Presentation/>
                :
                undefined
              }
              {
                this.state.courseNavigation ?
                  <CourseNavigationPanel
                    showForm={this.showForm.bind(this)}
                    navigateTo={this.navigateTo.bind(this)}
                    steps={this.state.steps}
                    units={this.state.units}
                    selectedUnitIndex={this.state.selectedUnitIndex}
                    form={this.state.forms.show}
                    chooseUnit={this.chooseUnit.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'CourseForm' ?
                  <CourseForm
                    course={this.state.course}
                    disabledModalities={this.state.disabledModalities}
                    showForm={this.showForm.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                    saveCourse={this.saveCourse.bind(this)}
                    setCourseCategory={this.setCourseCategory.bind(this)}
                    setModality={this.setModality.bind(this)}
                    removeModality={this.removeModality.bind(this)}
                    showSaveTutor={this.showSaveTutor.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'TutorList' ?
                  <TutorList
                    showForm={this.showForm.bind(this)}
                    tutors={this.state.tutors}
                    saveTutor={this.state.saveTutor}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'TutorForm' ?
                  <TutorForm
                    showForm={this.showForm.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'RequirementsForm' ?
                  <RequirementsForm
                    showForm={this.showForm.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'UnitsEditor' ?
                  <UnitsEditor
                    units={this.state.units}
                    showForm={this.showForm.bind(this)}
                    createUnit={this.createUnit.bind(this)}
                    selectedUnitIndex={this.state.selectedUnitIndex}
                    selectedUnit={this.state.selectedUnit}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'ContentEditor' ?
                  <ContentEditor
                    showForm={this.showForm.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'QuizEditor' ?
                  <QuizEditor
                    showForm={this.showForm.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'LearningActivityEditor' ?
                  <LearningActivityEditor
                    showForm={this.showForm.bind(this)}
                  />
                :
                undefined
              }
              <LanguageSelector
                language={this.state.language}
                setLanguage={this.setLanguage.bind(this)}
              />
              <ScrollUpButton
                id="scroll-up-button"
                StopPosition={0}
                ShowAtPosition={50}
                EasingType='easeOutCubic'
                AnimationDuration={1000}
                ContainerClassName='ScrollUpButton__Container'
                TransitionClassName='ScrollUpButton__Toggled'
                style={{}}
                ToggledStyle={{}}/>
            </main>
          </div>
          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            autoHideDuration={this.state.messageDuration}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            message={<span id="message-id">{this.state.controlMessage}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}
