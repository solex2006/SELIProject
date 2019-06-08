import React from 'react';

import TutorForm from '../tutor/TutorForm';
import TutorRegistry from './TutorRegistry';
import ListTools from '../tools/ListTools';

import Button from '@material-ui/core/Button';

export default class TutorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      filteredTutors: [],
    }
  }

  saveTutor(){
    this.props.showForm('RequirementsForm', true);
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

  render() {
    return(
      <div>
        {
          !this.props.showEditForm ?
            <div className="form-container">
              <div className="form-title">Course editor</div>
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
                            saveTutor={this.props.saveTutor}/>
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
                          saveTutor={this.props.saveTutor}/>
                      })
                  }
                </div>
              }
              {
                this.props.saveTutor ?
                  <div className="form-button-container">
                    <Button onClick={() => this.saveTutor()} className="form-button" id="upload-button" variant="contained" color="secondary">
                      Save tutor
                    </Button>
                  </div>
                :
                undefined
              }
            </div>
          :
          <TutorForm
            showForm={this.props.showForm.bind(this)}
            showControlMessage={this.props.showControlMessage.bind(this)}
            tutorToEdit={this.state.tutorToEdit}
            openList={this.openList.bind(this)}
          />
        }
      </div>
    );
  }
}
