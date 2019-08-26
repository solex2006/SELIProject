import React from 'react';

import MainMenu from '../components/navigation/MainMenu';
import AppBar from '../components/navigation/AppBar';

import Presentation from '../components/navigation/Presentation';
import TutorForm from '../components/tutor/TutorForm';
import TutorList from '../components/tutor/TutorList';
import CourseForm from '../components/course/CourseForm';
import CourseList from '../components/course/CourseList';
import CategoriesManagement from '../components/course/CategoriesManagement';
import ModalitiesManagement from '../components/course/ModalitiesManagement';
import MethodologiesManagement from '../components/course/MethodologiesManagement';
import RequirementsManagement from '../components/course/RequirementsManagement';
import PeopleManagement from '../components/course/PeopleManagement';

import course from '../../lib/course';

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

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: '',
      open: false,
      course: course,
      category: '',
      saveTutor: false,
      showEditForm: false,
      Transition: TransitionRight,
      messageDuration: 8500,
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

  showComponent(component){
    this.setState({
      component: component,
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
    });
  }

  /* Tutor */

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

  /* Tutors */

  /* Course items */

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

  /* Course items */

  /* Course */

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

  setCourseTemporalKey(key) {
    this.setState({
      courseKey: key,
    });
  }

  /* Course */

  /* Course items administration */

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

  deleteCourses(courses){
    console.log(courses);
  }

  /* Course items administration */

  /* Accesibility Form */

  showAccesibilityForm(type){
    this.setState({
      showAccesibilityForm: true,
      contentType: type,
    });
  }

  hideAccesibilityForm(){
    this.setState({
      showAccesibilityForm: false,
      contentType: '',
    });
  }

  /* Accesibility Form */

  setLanguage(language){

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
              showComponent={this.showComponent.bind(this)}
            />
            <main id="page-wrap">
              <AppBar
                setLanguage={this.setLanguage.bind(this)}
              />
              {
                this.state.component === '' ?
                  <Presentation/>
                :
                undefined
              }
              {
                this.state.component === 'createCourse' ?
                  <CourseForm
                    showControlMessage={this.showControlMessage.bind(this)}
                    saveCourse={this.saveCourse.bind(this)}
                    setCourseCategory={this.setCourseCategory.bind(this)}
                    setCourseTemporalKey={this.setCourseTemporalKey.bind(this)}
                    showAccesibilityForm={this.showAccesibilityForm.bind(this)}
                    showSaveTutor={this.showSaveTutor.bind(this)}
                    setTutor={this.setTutor.bind(this)}
                    setEditorForm={this.setEditorForm.bind(this)}
                    modalityItems={this.state.modalityItems}
                    methodologyItems={this.state.methodologyItems}
                    addedModalityItems={this.state.addedModalityItems}
                    addedMethodologyItems={this.state.addedMethodologyItems}
                    courseKey={this.state.courseKey}
                    categories={this.state.categories}
                    category={this.state.category}
                    course={this.state.course}
                    tutors={this.state.tutors}
                    tutor={this.state.tutor}
                    knowledgeItems={this.state.knowledgeItems}
                    addedKnowledgeItems={this.state.addedKnowledgeItems}
                    technilcaItems={this.state.technilcaItems}
                    addedTechnilcaItems={this.state.addedTechnilcaItems}
                    peopleItems={this.state.peopleItems}
                    addedPeopleItems={this.state.addedPeopleItems}
                  />
                :
                undefined
              }
              {
                this.state.component === 'coursesList' ?
                  <CourseList
                    courses={this.state.courses}
                    deleteCourses={this.deleteCourses.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                    showComponent={this.showComponent.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'tutorRegistration' ?
                  <TutorForm
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'tutorsList' ?
                  <TutorList
                    showComponent={this.showComponent.bind(this)}
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
                this.state.component === 'modalitiesManagement' ?
                  <ModalitiesManagement
                    modalities={this.state.modalities}
                    deleteModalities={this.deleteModalities.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'methodologiesManagement' ?
                  <MethodologiesManagement
                    methodologies={this.state.methodologies}
                    deleteMethodologies={this.deleteMethodologies.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'categoriesManagement' ?
                  <CategoriesManagement
                    categories={this.state.categories}
                    deleteCategories={this.deleteCategories.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'requirementsManagement' ?
                  <RequirementsManagement
                    categories={this.state.categories}
                    requirements={this.state.requirements}
                    deleteRequirements={this.deleteRequirements.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
              {
                this.state.component === 'peopleCategories' ?
                  <PeopleManagement
                    people={this.state.people}
                    deletePeople={this.deletePeople.bind(this)}
                    showControlMessage={this.showControlMessage.bind(this)}
                  />
                :
                undefined
              }
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
              this.state.showTutorListAction ? <Button onClick={() => this.showComponent("tutorsList")} key="undo" color="secondary" size="small">
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
      );
    }
  }
