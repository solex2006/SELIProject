import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Help from '../tools/Help';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import InputAdornment from '@material-ui/core/InputAdornment';
import WarningIcon from '@material-ui/icons/Warning';

export default class CourseOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: {label: this.props.language.organizationByUAL, unit: "Unit", subunit: "Lesson"},
      topics: {label: this.props.language.organizationByT, unit: "Topic", subunit: false},
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
                <p className="warning-text">{this.props.language.courseOrganizationChangeWarning}</p>
              </div>
            :
              undefined
          }
          <p className="form-message">{`${this.props.language.selectHowToOrganize}:`}</p>
          <div className="button-row">
            <Button onClick={() => this.setOrganization(this.state.units)} fullWidth className={this.state.selectedOrganization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
              <Avatar id="orange-avatar" className="avatar">U</Avatar>
              {this.props.language.byUnitsAndLessons}
            </Button>
            <Button onClick={() => this.setOrganization(this.state.topics)} fullWidth className={this.state.selectedOrganization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
              <Avatar id="blue-avatar" className="avatar">T</Avatar>
              {this.props.language.byTopics}
            </Button>
          </div>
          {
            this.state.selectedOrganization !== '' ?
              <div>
                <p className="form-message">
                  {
                  this.state.selectedOrganization.unit === "Unit" ?
                    this.props.language.exampleByUnits
                  :
                    this.props.language.exampleByTopics
                  }
                  <Help helper="organization" language={this.props.language}/>
                </p>
                <p className="form-message">
                  {
                    this.state.selectedOrganization.unit === "Unit" ?
                      this.props.language.toStartOrganizationU
                    :
                      this.props.language.toStartOrganizationT
                  }
                </p>
                {
                  this.state.selectedOrganization.unit === "Unit" ?
                    <div>
                      <TextField
                        id="unit-input"
                        label={this.props.language.unitName}
                        margin="normal"
                        variant="outlined"
                        className="form-dialog-input"
                        fullWidth
                        required
                        disabled={this.state.addedUnit || this.state.addSubunit}
                        helperText={this.props.language.pressEnterToAdd}
                        onKeyPress={() => this.unitKeyController(event)}
                      />
                      {
                        this.state.addSubunit ?
                          <TextField
                            id="subunit-input"
                            label={this.props.language.lessonName}
                            margin="normal"
                            variant="outlined"
                            className="form-dialog-input"
                            fullWidth
                            required
                            disabled={this.state.addedSubunit}
                            helperText={this.props.language.pressEnterToAdd}
                            onKeyPress={() => this.subunitKeyController(event)}
                          />
                        :
                        undefined
                      }
                    </div>
                  :
                    <TextField
                      id="unit-input"
                      label={this.props.language.topicName}
                      margin="normal"
                      variant="outlined"
                      className="form-dialog-input"
                      fullWidth
                      required
                      disabled={this.state.addedUnit}
                      helperText={this.props.language.pressEnterToAdd}
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
