import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Help from '../tools/Help';
import Unit from './Unit';
import Topic from './Topic';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import InputAdornment from '@material-ui/core/InputAdornment';
import WarningIcon from '@material-ui/icons/Warning';

export default class CourseOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: {label: "Organization by units and lessons", unit: "Unit", subunit: "Lesson"},
      topics: {label: "Organization by topics", unit: "Topic", subunit: false},
      dates: {label: "Organization by dates", unit: "Season", subunit: false},
      selectedOrganization: '',
      unitIndex: 0,
      step: 0,
    }
  }

  setOrganization(organization){
    let courseInformation = this.props.courseInformation;
    let selected = this.props.selected;
    if (this.state.organizationSelected) {
      if (this.state.selectedOrganization.unit !== organization.unit) {
        courseInformation.program = [];
        courseInformation.organization = "";
        selected.splice(0, selected.length);
        selected.push(0);
        selected.push(0);
        this.props.validateOrganization(true);
        this.props.reRender();
        this.setState({
          changedOrganization: true,
          addedUnit: false,
          addedSubunit: false,
          addSubunit: false,
        });
      }
    }
    this.setState({
      selectedOrganization: organization,
    });
  }

  addUnit(){
    let name = document.getElementById('unit-input').value;
    if (name !== '') {
      let courseInformation = this.props.courseInformation;
      if (this.state.selectedOrganization.unit === "Unit") {
        courseInformation.program.push({name: name, lessons: []});
        this.setState({
          addSubunit: true,
        }, () => {
          document.getElementById('subunit-input').focus();
        });
        return;
      }
      else if (this.state.selectedOrganization.unit === "Topic") {
        courseInformation.program.push({name: name, items: []});
      }
      else if (this.state.selectedOrganization.unit === "Season") {
        courseInformation.program.push({name: name, items: []});
      }
      courseInformation.organization = this.state.selectedOrganization;
      this.setState({
        addedUnit: true,
      }, () => {
        this.checkOrganization();
      });
    }
  }

  unitKeyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      if (this.state.editUnit) {
        this.editUnit();
      }
      else {
        this.addUnit();
      }
    }
  }

  subunitKeyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      if (this.state.editSubunit) {
        this.editSubunit();
      }
      else {
        this.addSubunit();
      }
    }
  }

  addSubunit(){
    let name = document.getElementById('subunit-input').value;
    if (name !== '') {
      let courseInformation = this.props.courseInformation;
      if (this.state.selectedOrganization.unit === "Unit") {
        courseInformation.program[this.state.unitIndex].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
      }
      courseInformation.organization = this.state.selectedOrganization;
      this.setState({
        addedSubunit: true,
      }, () => {
        this.checkOrganization();
      });
    }
  }

  checkOrganization() {
    if (this.state.selectedOrganization.unit === "Unit") {
      if (this.props.courseInformation.program.length) {
        if (this.props.courseInformation.program[0].lessons.length) {
          this.props.validateOrganization(false);
          this.setState({
            organizationSelected: true,
          });
        }
        else  {
          this.props.validateOrganization(true);
        }
      }
      else {
        this.props.validateOrganization(true);
      }
    }
    else {
      if (this.props.courseInformation.program.length) {
        this.props.validateOrganization(false);
        this.setState({
          organizationSelected: true,
        });
      }
      else {
        this.props.validateOrganization(true);
      }
    }
  }

  componentDidMount () {
    if (this.props.courseInformation.organization !== "") {
      this.setState({
        organizationSelected: true,
      });
    }
  }

  render() {
    return(
      <div className="organization-form">
        <div className="course-organization-options-container">
          {
            this.state.organizationSelected ?
              <div className="warning-container">
                <WarningIcon className="warning-icon"/>
                <p className="warning-text">You have already selected one type of organization, changing it will cause you to lose the organization structure and its content</p>
              </div>
            :
              undefined
          }
          <p className="form-message">Select how to organize the course content: </p>
          <div className="button-row">
            <Button onClick={() => this.setOrganization(this.state.units)} fullWidth className={this.state.selectedOrganization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
              <Avatar id="orange-avatar" className="avatar">U</Avatar>
              By Units & Lessons
            </Button>
            <Button onClick={() => this.setOrganization(this.state.topics)} fullWidth className={this.state.selectedOrganization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
              <Avatar id="blue-avatar" className="avatar">T</Avatar>
              By Topics
            </Button>
            <Button onClick={() => this.setOrganization(this.state.dates)} fullWidth className={this.state.selectedOrganization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
              <Avatar id="teal-avatar" className="avatar">D</Avatar>
              By Dates
            </Button>
          </div>
          {
            this.state.selectedOrganization !== '' ?
              <div>
                <p className="form-message">
                  {`Example of course organized by ${this.state.selectedOrganization.unit}s`}
                  <Help helper="organization"/>
                </p>
                <p className="form-message">
                  {`To start adding content write the name the first ${this.state.selectedOrganization.unit} of your course`}
                </p>
                {
                  this.state.selectedOrganization.unit === "Unit" ?
                    <div>
                      <TextField
                        id="unit-input"
                        label={`${this.state.selectedOrganization.unit} name`}
                        margin="normal"
                        variant="outlined"
                        className="form-dialog-input"
                        fullWidth
                        required
                        disabled={this.state.addedUnit || this.state.addSubunit}
                        helperText={`Press enter to add new ${this.state.selectedOrganization.unit.toLowerCase()}`}
                        onKeyPress={() => this.unitKeyController(event)}
                      />
                      {
                        this.state.addSubunit ?
                          <TextField
                            id="subunit-input"
                            label={`${this.state.selectedOrganization.unit} name`}
                            margin="normal"
                            variant="outlined"
                            className="form-dialog-input"
                            fullWidth
                            required
                            disabled={this.state.addedSubunit}
                            helperText={`Press enter to add new ${this.state.selectedOrganization.subunit.toLowerCase()}`}
                            onKeyPress={() => this.subunitKeyController(event)}
                          />
                        :
                        undefined
                      }
                    </div>
                  :
                  <TextField
                    id="unit-input"
                    label={`${this.state.selectedOrganization.unit} name`}
                    margin="normal"
                    variant="outlined"
                    className="form-dialog-input"
                    fullWidth
                    required
                    disabled={this.state.addedUnit}
                    helperText={`Press enter to add new ${this.state.selectedOrganization.unit.toLowerCase()}`}
                    onKeyPress={() => this.unitKeyController(event)}
                  />
                }
              </div>
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
