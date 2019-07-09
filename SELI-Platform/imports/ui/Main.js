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
import CourseList from '../components/course/CourseList';
import CoursePreview from '../components/course/CoursePreview';
import TutorForm from '../components/tutor/TutorForm';
import TutorList from '../components/tutor/TutorList';
import RequirementsForm from '../components/course/RequirementsForm';
import UnitsEditor from '../components/course/UnitsEditor';
import ContentEditor from '../components/content/ContentEditor';
import QuizEditor from '../components/activities/QuizEditor';
import LearningActivityEditor from '../components/activities/LearningActivityEditor';
import CategoriesManagement from '../components/course/CategoriesManagement';
import ModalitiesManagement from '../components/course/ModalitiesManagement';
import MethodologiesManagement from '../components/course/MethodologiesManagement';
import RequirementsManagement from '../components/course/RequirementsManagement';
import PeopleManagement from '../components/course/PeopleManagement';

import ScrollUpButton from "react-scroll-up-button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Courses } from '../../lib/CourseCollection';
import { Tutors } from '../../lib/TutorCollection';
import { Modalities } from '../../lib/ModalitiesCollection';
import { Methodologies } from '../../lib/MethodologiesCollection';
import { Categories } from '../../lib/CategoriesCollection';
import { Requirements } from '../../lib/RequirementsCollection';
import { People } from '../../lib/PeopleCollection';
import CourseFilesCollection from '../../lib/CourseFilesCollection.js';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseKey: '',
      tutors: [],
      language: undefined,
      controlMessage: '',
      open: false,
      forms: forms,
      steps: steps,
      courseNavigation: false,
      units: [],
      Transition: TransitionRight,
      messageDuration: 8500,
      course: course,
      tutor: undefined,
      category: '',
      saveTutor: false,
      showEditForm: false,
      disabledModalities: [
        false,
        false,
      ],
      modalityItems: [],
      addedModalityItems: [],
      methodologyItems: [],
      addedMethodologyItems: [],
      knowledgeItems: [],
      addedKnowledgeItems: [],
      technilcaItems: [],
      addedTechnilcaItems: [],
      peopleItems: [],
      addedPeopleItems: [],
    }
  }

  saveCourse(course){
    let categories = this.state.categories;
    let courseCategory = categories.find(c => c._id === this.state.category);
    course.category = courseCategory;
    course.modalities = this.state.addedModalityItems;
    course.methodologies = this.state.addedMethodologyItems;
    this.setState({
      course: course,
    }, () => console.log(course));
  }

  setCourseCategory(category){
    let sameCategoty = true;
    if(category !== this.state.category){
      sameCategoty = false;
    }
    this.setState({
      category: category,
    }, () => {
      if(!sameCategoty){
        this.createKnowledgeItems(this.state.category);
        this.setState({
          addedKnowledgeItems: [],
        });
      }
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
    if(form === "TutorList"){
      this.setEditorForm(false);
    }
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
      this.state.forms.show === 'RequirementsForm' || this.state.forms.show === 'UnitsEditor' ||
      this.state.forms.show === 'ContentEditor' || this.state.forms.show === 'QuizEditor' ||
      this.state.forms.show === 'LearningActivityEditor'
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

  showControlMessage(message, showAction, actionType){
    let showTutorListAction = false;
    if(showAction && actionType === "TutorList"){
      showTutorListAction = true;
    }
    this.setState({
      controlMessage: message,
      open: true,
      showTutorListAction: showTutorListAction,
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

  setEditorForm(showEditForm){
    this.setState({
      showEditForm: showEditForm,
    });
  }

  setTutor(tutor){
    let course = this.state.course;
    course.tutor = tutor;
    this.setState({
      tutor: tutor,
      course: course,
    }, () => console.log(this.state.course));
  }

  selectLesson(lesson){
    this.setState({
      selectedLesson: lesson,
    });
  }

  saveRequirements(){
    let course = this.state.course;
    let requirements = {
      knowledge: undefined,
      technical: undefined,
      people: undefined,
    };
    requirements.knowledge = this.state.addedKnowledgeItems;
    requirements.technical = this.state.addedTechnilcaItems;
    requirements.people = this.state.addedPeopleItems;
    course.requirements = requirements;
    this.setState({
      course: course,
    }, () => console.log(this.state.course));
  }

  addContent(content){
    let selectedUnit = this.state.selectedUnit;
    for (var i = 0; i < selectedUnit.lessons.length; i++) {
      if(selectedUnit.lessons[i].key === this.state.selectedLesson.key){
        content.key = selectedUnit.key + "-" + this.state.selectedLesson.key + "-" + this.state.selectedLesson.content.length;
        selectedUnit.lessons[i].content.push(content);
        break;
      }
    }
  }

  updateLesson(lesson){
    this.setState({
      selectLesson: lesson,
    });
  }

  setCourseTemporalKey(key) {
    this.setState({
      courseKey: key,
    });
  }

  saveProgram(){
    let course = this.state.course;
    course.units = this.state.units;
    course.contentKey = this.state.courseKey;
    CourseFilesCollection.update({
      _id: course.image.id,
    }, {
      $set: {
        meta: {parentId: this.state.courseKey}
      }
    });
    CourseFilesCollection.update({
      _id: course.sylabus.id,
    }, {
      $set: {
        meta: {parentId: this.state.courseKey}
      }
    });
    let courseId = Courses.insert({
      course
    });
    if(courseId){
      this.showControlMessage("Course registered succesfully");
      this.resetCourse();
      this.handleCloseDialog();
      location.reload();
    }
  }

  resetCourse(){
    let newCourse = course;
    this.setState({
      course: course,
    });
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  deleteCourses(courses){
    console.log(courses);
  }

  deleteModalities(modalities){
    for (var i = 0; i < modalities.length; i++) {
      Modalities.remove({_id: modalities[i]});
    }
  }

  deleteMethodologies(methodologies){
    for (var i = 0; i < methodologies.length; i++) {
      Methodologies.remove({_id: methodologies[i]});
    }
  }

  deleteCategories(categories){
    for (var i = 0; i < categories.length; i++) {
      Categories.remove({_id: categories[i]});
    }
  }

  deleteRequirements(requirement){
    for (var i = 0; i < requirement.length; i++) {
      Requirements.remove({_id: requirement[i]});
    }
  }

  deletePeople(people){
    for (var i = 0; i < people.length; i++) {
      People.remove({_id: people[i]});
    }
  }

  createModalityItems(){
    let modalityItems = this.state.modalityItems;
    if(modalityItems.length){
      modalityItems.splice(0, modalityItems.length);
    }
    for (var i = 0; i < this.state.modalities.length; i++) {
      modalityItems.push(this.state.modalities[i].name);
    }
    this.setState({
      modalityItems: modalityItems,
    });
  }

  createMethodologyItems(){
    let methodologyItems = this.state.methodologyItems;
    if(methodologyItems.length){
      methodologyItems.splice(0, methodologyItems.length);
    }
    for (var i = 0; i < this.state.methodologies.length; i++) {
      methodologyItems.push(this.state.methodologies[i].name);
    }
    this.setState({
      methodologyItems: methodologyItems,
    });
  }

  createTechnicalItems(){
    let technilcaItems = this.state.technilcaItems;
    if(technilcaItems.length){
      technilcaItems.splice(0, technilcaItems.length);
    }
    for (var i = 0; i < this.state.requirements.length; i++) {
      if(this.state.requirements[i].category.name === "Technical"){
        technilcaItems.push(this.state.requirements[i].name);
      }
    }
    this.setState({
      technilcaItems: technilcaItems,
    });
  }

  createPeopleItems(){
    let peopleItems = this.state.peopleItems;
    if(peopleItems.length){
      peopleItems.splice(0, peopleItems.length);
    }
    for (var i = 0; i < this.state.people.length; i++) {
      peopleItems.push(this.state.people[i].name);
    }
    this.setState({
      peopleItems: peopleItems,
    });
  }

  createKnowledgeItems(category){
    let knowledgeItems = this.state.knowledgeItems;
    if(knowledgeItems.length){
      knowledgeItems.splice(0, knowledgeItems.length);
    }
    for (var i = 0; i < this.state.requirements.length; i++) {
      if(this.state.requirements[i].category._id === category){
        knowledgeItems.push(this.state.requirements[i].name);
      }
    }
    this.setState({
      knowledgeItems: knowledgeItems,
    });
  }

  checkLoadedData(){
    if(this.state.modalities.length) {
      this.createModalityItems();
    }
    if(this.state.methodologies.length) {
      this.createMethodologyItems();
    }
    if(this.state.people.length) {
      this.createPeopleItems();
    }
    if(this.state.requirements.length) {
      this.createTechnicalItems();
    }
  }

  componentDidMount(){
    Tracker.autorun(() => {
        let tutors = Tutors.find().fetch();
        let courses = Courses.find().fetch();
        let modalities = Modalities.find().fetch();
        let methodologies = Methodologies.find().fetch();
        let categories = Categories.find().fetch();
        let requirements = Requirements.find().fetch();
        let people = People.find().fetch();
        this.setState({
          tutors: tutors,
          courses: courses,
          modalities: modalities,
          methodologies: methodologies,
          categories: categories,
          requirements: requirements,
          people: people,
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
                    modalityItems={this.state.modalityItems}
                    methodologyItems={this.state.methodologyItems}
                    addedModalityItems={this.state.addedModalityItems}
                    addedMethodologyItems={this.state.addedMethodologyItems}
                    showForm={this.showForm.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                    saveCourse={this.saveCourse.bind(this)}
                    setCourseCategory={this.setCourseCategory.bind(this)}
                    setModality={this.setModality.bind(this)}
                    removeModality={this.removeModality.bind(this)}
                    showSaveTutor={this.showSaveTutor.bind(this)}
                    setCourseTemporalKey={this.setCourseTemporalKey.bind(this)}
                    courseKey={this.state.courseKey}
                    categories={this.state.categories}
                    category={this.state.category}
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
                    showControlMessage={this.showControlMessage.bind(this)}
                    showEditForm={this.state.showEditForm}
                    setEditorForm={this.setEditorForm.bind(this)}
                    tutor={this.state.tutor}
                    setTutor={this.setTutor.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'CoursePreview' ?
                  <CoursePreview
                    showForm={this.showForm.bind(this)}
                    courses={this.state.courses}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'CourseList' ?
                  <CourseList
                    showForm={this.showForm.bind(this)}
                    courses={this.state.courses}
                    deleteCourses={this.deleteCourses.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
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
                    knowledgeItems={this.state.knowledgeItems}
                    addedKnowledgeItems={this.state.addedKnowledgeItems}
                    technilcaItems={this.state.technilcaItems}
                    addedTechnilcaItems={this.state.addedTechnilcaItems}
                    peopleItems={this.state.peopleItems}
                    addedPeopleItems={this.state.addedPeopleItems}
                    saveRequirements={this.saveRequirements.bind(this)}
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
                    showControlMessage={this.showControlMessage.bind(this)}
                    selectLesson={this.selectLesson.bind(this)}
                    updateLesson={this.updateLesson.bind(this)}
                    openConfirmationDialog={this.handleClickOpenDialog.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'ContentEditor' ?
                  <ContentEditor
                    showForm={this.showForm.bind(this)}
                    addContent={this.addContent.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                    courseKey={this.state.courseKey}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'QuizEditor' ?
                  <QuizEditor
                    showForm={this.showForm.bind(this)}
                    lesson={this.state.selectedLesson}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'LearningActivityEditor' ?
                  <LearningActivityEditor
                    showForm={this.showForm.bind(this)}
                    lesson={this.state.selectedLesson}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'ModalitiesManagement' ?
                  <ModalitiesManagement
                    modalities={this.state.modalities}
                    showForm={this.showForm.bind(this)}
                    deleteModalities={this.deleteModalities.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'MethodologiesManagement' ?
                  <MethodologiesManagement
                    methodologies={this.state.methodologies}
                    showForm={this.showForm.bind(this)}
                    deleteMethodologies={this.deleteMethodologies.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'CategoriesManagement' ?
                  <CategoriesManagement
                    categories={this.state.categories}
                    showForm={this.showForm.bind(this)}
                    deleteCategories={this.deleteCategories.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'RequirementsManagement' ?
                  <RequirementsManagement
                    categories={this.state.categories}
                    requirements={this.state.requirements}
                    showForm={this.showForm.bind(this)}
                    deleteRequirements={this.deleteRequirements.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.forms.show === 'PeopleManagement' ?
                  <PeopleManagement
                    people={this.state.people}
                    showForm={this.showForm.bind(this)}
                    deletePeople={this.deletePeople.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
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
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleCloseDialog}
            keepMounted
            TransitionComponent={TransitionRight}
          >
            <DialogTitle className="modal-title" id="alert-dialog-title">{"Are you sure you want to save the program?"}</DialogTitle>
            <DialogActions>
              <Button  onClick={this.handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={() => this.saveProgram()} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
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
              this.state.showTutorListAction ? <Button onClick={() => this.showForm("TutorList", false)} key="undo" color="secondary" size="small">
                See list
              </Button> : undefined ,
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
