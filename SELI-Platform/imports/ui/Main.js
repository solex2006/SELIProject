import React, { Component } from 'react';
import MainMenu from '../components/MainMenu';
import Presentation from '../components/Presentation';
import LanguageSelector from '../components/LanguageSelector';
import CourseNavigationPanel from '../components/CourseNavigationPanel';
import CourseForm from '../components/CourseForm';
import TutorForm from '../components/TutorForm';
import RequirementsForm from '../components/RequirementsForm';
import UnitsEditor from '../components/UnitsEditor';
import ContentEditor from '../components/ContentEditor';
import QuizEditor from '../components/QuizEditor';
import LearningActivityEditor from '../components/LearningActivityEditor';
import ScrollUpButton from "react-scroll-up-button";
import forms from '../../lib/forms';
import steps from '../../lib/steps';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: undefined,
      forms: forms,
      steps: steps,
      courseNavigation: false,
      units: [],
    }
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
    if(form === 'TutorForm'){
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

  showForm(form){
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
      this.showCourseNavigation();
      this.setNavigation(form);
    });
  }

  navigateTo(formId){
    if(formId == 1){
      this.showForm("CourseForm");
    }
    if(formId  == 2){
      this.showForm("TutorForm");
    }
    if(formId == 3){
      this.showForm("RequirementsForm");
    }
    if(formId == 4){
      this.showForm("UnitsEditor");
    }
  }

  showCourseNavigation() {
    if(
      this.state.forms.show === 'CourseForm' || this.state.forms.show === 'TutorForm' ||
      this.state.forms.show === 'RequirementsForm' || this.state.forms.show === 'UnitsEditor'
    ){
      this.setState({
        courseNavigation: true,
      });
    }
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

  componentDidMount(){

  }

  render() {
    return(
      <div>
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
                  showForm={this.showForm.bind(this)}
                />
              :
              undefined
            }
            {
              this.state.forms.show === 'TutorForm' ?
                <TutorForm
                  showForm={this.showForm.bind(this)}
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
      </div>
    )
  }
}
