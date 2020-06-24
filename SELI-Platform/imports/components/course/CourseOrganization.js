import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Help from '../tools/Help';

export default class CourseOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: {label: this.props.language.organizationByUAL, unit: "Unit", subunit: "Lesson"},
      topics: {label: this.props.language.organizationByT, unit: "Topic", subunit: false},
      selectedOrganization: '',
      unitIndex: 0,
      step: 0,
      nameLabels: { nameUnit: "", nameSubunit: ""},
      totalLength: 0
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
    let name = this.state.nameLabels.nameUnit;
    let courseInformation = this.props.courseInformation;
    if (this.state.selectedOrganization.unit === "Unit") {
      courseInformation.program.push({name: name, lessons: []});
    }
    else if (this.state.selectedOrganization.unit === "Topic") {
      courseInformation.program.push({name: name, items: []});
    }
    else if (this.state.selectedOrganization.unit === "Season") {
      courseInformation.program.push({name: name, items: []});
    }
    courseInformation.organization = this.state.selectedOrganization;
  }

  addSubunit(){
    let name = this.state.nameLabels.nameSubunit;
    let courseInformation = this.props.courseInformation;
    if (this.state.selectedOrganization.unit === "Unit") {
      courseInformation.program[this.state.unitIndex].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
    }
    courseInformation.organization = this.state.selectedOrganization;
  }

  checkOrganization() {
    if (this.state.selectedOrganization.unit === "Unit") {
      if (this.state.nameLabels.nameUnit.length) {
        if (this.state.nameLabels.nameSubunit.length) {
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
      if (this.state.nameLabels.nameUnit.length) {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalLength !== this.state.totalLength) {
      this.checkOrganization()
    };
  };

  handleChange = valueType => event => {
    let nameLabels = this.state.nameLabels
    if (valueType === 'unit') {
      nameLabels.nameUnit = event.target.value
    }
    else if (valueType === 'subunit') {
      nameLabels.nameSubunit = event.target.value
    }
    let totalLength = nameLabels.nameUnit.length + nameLabels.nameSubunit.length;
    this.setState({
      nameLabels: nameLabels,
      totalLength: totalLength
    });
  };

  render() {
    return(
      <div className="organization-form">
        <div className="course-organization-options-container">
          {
            /* this.state.organizationSelected ?
              <div className="warning-container">
                <WarningIcon className="warning-icon"/>
                <p className="warning-text">{this.props.language.courseOrganizationChangeWarning}</p>
              </div>
            :
              undefined */
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
                  {/* <Help helper="organization" language={this.props.language}/> */}
                  <Help helper="default" text={this.props.language.help} language={this.props.language}/>
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
                        //disabled={this.state.addedUnit || this.state.addSubunit}
                        //helperText={this.props.language.pressEnterToAdd}
                        //onKeyPress={() => this.unitKeyController(event)}
                        value={this.state.nameUnit}
                        onChange={this.handleChange('unit')}
                      />
                      <p className="navigation-label">
                        {this.props.language.atLeastAdd}
                      </p>
                      <TextField
                        id="subunit-input"
                        label={this.props.language.lessonName}
                        margin="normal"
                        variant="outlined"
                        className="form-dialog-input"
                        fullWidth
                        required
                        //disabled={this.state.addedSubunit}
                        //helperText={this.props.language.pressEnterToAdd}
                        //onKeyPress={() => this.subunitKeyController(event)}
                        value={this.state.nameSubunit}
                        onChange={this.handleChange('subunit')}
                      />
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
                      //helperText={this.props.language.pressEnterToAdd}
                      //onKeyPress={() => this.unitKeyController(event)}
                      value={this.state.nameUnit}
                      onChange={this.handleChange('unit')}
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
