import React from 'react';

import TutorForm from '../tutor/TutorForm';
import TutorRegistry from './TutorRegistry';
import ListTools from '../tools/ListTools';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export default class TutorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      filteredTutors: [],
      selectedTutor: undefined,
    }
  }

  saveTutor(){
    this.props.showComponent('RequirementsForm');
  }

  openEditForm(tutorToEdit){
    window.scrollTo(0, 0);
    this.props.setEditorForm(true);
    this.setState({
      tutorToEdit: tutorToEdit,
    });
  }

  openList(){
    this.props.setEditorForm(false);
    this.setState({
      tutorToEdit: undefined,
    });
  }

  ascOrder(){
    var sortJsonArray = require('sort-json-array');
    let filteredTutors = this.state.filteredTutors;
    if(filteredTutors.length){
      sortJsonArray(filteredTutors, 'name','asc');
    }
    else {
      filteredTutors = this.props.tutors;
      sortJsonArray(filteredTutors, 'name','asc');
    }
    this.setState({
      filteredTutors: filteredTutors,
      showFilteredSearch: true,
    });
  }

  desOrder(){
    var sortJsonArray = require('sort-json-array');
    let filteredTutors = this.state.filteredTutors;
    if(filteredTutors.length){
      sortJsonArray(filteredTutors, 'name','des');
    }
    else {
      filteredTutors = this.props.tutors;
      sortJsonArray(filteredTutors, 'name','des');
    }
    this.setState({
      filteredTutors: filteredTutors,
      showFilteredSearch: true,
    });
  }

  resetSearch(){
    this.setState({
      filteredTutors: [],
      showFilteredSearch: false,
    });
  }

  searchTutors(input){
    let tutors = this.props.tutors;
    let filteredTutors = [];
    for (var i = 0; i < tutors.length; i++) {
      if(tutors[i].name.toUpperCase().search(input.toUpperCase()) >= 0){
        filteredTutors.push(tutors[i]);
      }
    }
    this.setState({
      filteredTutors: filteredTutors,
      showFilteredSearch: true,
    });
  }

  selectTutor(tutor){
    this.props.setTutor(tutor);
  }

  render() {
    return(
      <div>
        {
          !this.props.showEditForm ?
            <div className="form-container">
              {
                !this.props.saveTutor ?
                  <div className="form-title">Tutor list</div>
                :
                undefined
              }
              {
                this.props.tutor && this.props.saveTutor ?
                  <div>
                    <div className="form-subtitle">Selected tutor</div>
                    <div className="selected-container">
                      <div className="selected-row">
                        <div className="tutor-icon"></div>
                        <div className="tutor-atribute">Course tutor</div>
                        <div className="tutor-info">{this.props.tutor.name}</div>
                      </div>
                    </div>
                    <div id="form-list-button" className="form-button-container">
                      <Button onClick={() => this.saveTutor()} className="form-button" variant="contained" color="secondary">
                        Save tutor
                      </Button>
                    </div>
                  </div>
                :
                undefined
              }
              <div className="form-subtitle">Registered tutors</div>
              <ListTools
                type="tutor"
                searchTutors={this.searchTutors.bind(this)}
                resetSearch={this.resetSearch.bind(this)}
                ascOrder={this.ascOrder.bind(this)}
                desOrder={this.desOrder.bind(this)}
              />
              {
                !this.state.showFilteredSearch ?
                  <div className="registry-list-container">
                    {
                      this.props.tutors.map((tutors) =>
                        {
                          return <TutorRegistry
                            tutors={tutors}
                            key={tutors._id}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            openEditForm={this.openEditForm.bind(this)}
                            saveTutor={this.props.saveTutor}
                            selectTutor={this.selectTutor.bind(this)}/>
                        })
                    }
                  </div>
                :
                <div className="registry-list-container">
                  {
                    this.state.filteredTutors.map((tutors) =>
                      {
                        return <TutorRegistry
                          tutors={tutors}
                          key={tutors._id}
                          showControlMessage={this.props.showControlMessage.bind(this)}
                          openEditForm={this.openEditForm.bind(this)}
                          saveTutor={this.props.saveTutor}
                          selectTutor={this.selectTutor.bind(this)}/>
                      })
                  }
                </div>
              }
            </div>
          :
          <TutorForm
            showComponent={this.props.showComponent.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            tutorToEdit={this.state.tutorToEdit}
            openList={this.openList.bind(this)}
          />
        }
      </div>
    );
  }
}
