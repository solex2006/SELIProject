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
      unitIndex: 0,
      step: 0,
    }
  }

  setOrganization(organization){
    let courseInformation = this.props.courseInformation;
    if (this.state.organizationSelected) {
      if (this.props.courseInformation.organization.unit !== organization.unit) {
        courseInformation.program = [];
        this.props.setCorrectOrganization(true);
        this.setState({
          organizationSelected: false,
        });
      }
      this.setState({
        addSubunit: false,
      })
    }
    courseInformation.organization = organization;
    this.setState({
      courseInformation: courseInformation,
    });
  }

  addUnit(){
    let name = document.getElementById('unit-input').value;
    if (name !== '') {
      let courseInformation = this.props.courseInformation;
      if (courseInformation.organization.unit === "Unit") {
        courseInformation.program.push({name: name, lessons: []});
      }
      else if (courseInformation.organization.unit === "Topic") {
        courseInformation.program.push({name: name, items: []});
      }
      else if (courseInformation.organization.unit === "Season") {
        courseInformation.program.push({name: name, items: []});
      }
      this.setState({
        added: true,
      }, () => {
        this.checkOrganization();
        if (courseInformation.organization.unit === "Unit") {
          this.setState({
            unitIndex: this.props.courseInformation.program.length - 1,
            addSubunit: true,
          }, () => {
            document.getElementById('subunit-input').focus();
          })
        }
      });
      document.getElementById('unit-input').value = '';
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
      if (courseInformation.organization.unit === "Unit") {
        courseInformation.program[this.state.unitIndex].lessons.push({name: name, _id: `${Math.random()}${name}`, items: []});
      }
      this.setState({
        added: true,
      }, () => {
        this.checkOrganization();
      });
      document.getElementById('subunit-input').value = '';
    }
  }

  checkOrganization() {
    if (this.props.courseInformation.organization.unit === "Unit") {
      if (this.props.courseInformation.program.length) {
        if (this.props.courseInformation.program[0].lessons.length) {
          this.props.setCorrectOrganization(false);
        }
        else  {
          this.props.setCorrectOrganization(true);
        }
      }
      else {
        this.props.setCorrectOrganization(true);
      }
    }
    else {
      if (this.props.courseInformation.program.length) {
        this.props.setCorrectOrganization(false);
      }
      else {
        this.props.setCorrectOrganization(true);
      }
    }
  }

  setUnitIndex(index){
    this.setState({
      unitIndex: index,
      addSubunit: true,
    }, () => {
      document.getElementById('subunit-input').focus()
    });
  }

  deleteUnit(index) {
    if (this.state.editUnit) {
      this.cancelUnitEdit();
      this.cancelSubunitEdit();
    }
    let courseInformation = this.props.courseInformation;
    courseInformation.program.splice(index, 1);
    if (!courseInformation.program.length) {
      this.setState({
        addSubunit: false,
      });
    }
    if (index === this.state.unitIndex) {
      this.setState({
        unitIndex: this.state.unitIndex - 1,
      })
    }
    this.setState({
      deleted: true,
    }, () => {
      this.checkOrganization();
    });
  }

  editUnit() {
    let name = document.getElementById('unit-input').value;
    if (name !== '') {
      let courseInformation = this.props.courseInformation;
      courseInformation.program[this.state.editUnitIndex].name = name;
    }
    this.setState({
      editUnit: false,
    }, () => {
      document.getElementById('unit-input').value = '';
    })
  }

  setUnitToEdit(index, name) {
    this.setState({
      editUnit: true,
      editUnitIndex: index,
    });
    let courseInformation = this.props.courseInformation;
    document.getElementById('unit-input').value = name;
    document.getElementById('unit-input').focus();
  }

  cancelUnitEdit() {
    this.setState({
      editUnit: false,
      editUnitIndex: undefined,
    })
    document.getElementById('unit-input').value = '';
  }

  deleteSubunit(parentIndex, index) {
    if (this.state.editSubunit) {
      this.cancelSubunitEdit();
    }
    let courseInformation = this.props.courseInformation;
    if (this.props.courseInformation.organization.unit === "Unit") {
      courseInformation.program[parentIndex].lessons.splice(index, 1);
      this.setState({
        deleted: true,
      }, () => {
        this.checkOrganization();
      });
    }
  }

  setSubunitToEdit(parentIndex, index, name) {
    this.setState({
      editSubunit: true,
      editUnitIndex: parentIndex,
      editSubunitIndex: index,
    });
    let courseInformation = this.props.courseInformation;
    document.getElementById('subunit-input').value = name;
    document.getElementById('subunit-input').focus();
  }

  editSubunit() {
    let name = document.getElementById('subunit-input').value;
    if (name !== '') {
      if (this.props.courseInformation.organization.unit === "Unit") {
        let courseInformation = this.props.courseInformation;
        courseInformation.program[this.state.editUnitIndex].lessons[this.state.editSubunitIndex].name = name;
      }
    }
    this.setState({
      editSubunit: false,
    }, () => {
      document.getElementById('subunit-input').value = '';
    })
  }

  cancelSubunitEdit() {
    this.setState({
      editSubunit: false,
      editUnitIndex: undefined,
      editSubunitIndex: undefined,
    })
    document.getElementById('subunit-input').value = '';
  }

  componentDidMount () {
    if (this.props.courseInformation.program.length) {
      this.setState({
        organizationSelected: true,
      });
    }
  }

  render() {
    return(
      <div className="organization-form">
        {
          this.state.step === 0 ?
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
                <Button onClick={() => this.setOrganization(this.state.units)} fullWidth className={this.props.courseInformation.organization.unit === "Unit" ? "row-list-selected-button" : "row-list-button"}>
                  <Avatar id="orange-avatar" className="avatar">U</Avatar>
                  By Units & Lessons
                </Button>
                <Button onClick={() => this.setOrganization(this.state.topics)} fullWidth className={this.props.courseInformation.organization.unit === "Topic" ? "row-list-selected-button" : "row-list-button"}>
                  <Avatar id="blue-avatar" className="avatar">T</Avatar>
                  By Topics
                </Button>
                <Button onClick={() => this.setOrganization(this.state.dates)} fullWidth className={this.props.courseInformation.organization.unit === "Season" ? "row-list-selected-button" : "row-list-button"}>
                  <Avatar id="teal-avatar" className="avatar">D</Avatar>
                  By Dates
                </Button>
              </div>
              {
                this.props.courseInformation.organization !== '' ?
                  <div>
                    <p className="form-message">
                      {`Example of course organized by ${this.props.courseInformation.organization.unit}s`}
                      <Help helper="organization"/>
                    </p>
                    <Button fullWidth onClick={() => this.setState({step: 1, organizationSelected: true})} color="primary">Next <NavigateNextIcon style={{marginLeft: "0.5vw"}}/></Button>
                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
        <div>
          {
            this.state.step === 1 ?
              <div className="course-organization-container">
                <Button fullWidth onClick={() => this.setState({step: 0})} color="primary"> <NavigateBeforeIcon style={{marginRight: "0.5vw"}}/> Back</Button>
                <TextField
                  id="unit-input"
                  label={`${this.props.courseInformation.organization.unit} name`}
                  margin="normal"
                  variant="outlined"
                  className="form-adorned-input"
                  fullWidth
                  required
                  helperText={this.state.editUnit ? <p style={{color: "var(--primary)"}}>{`Press enter to edit the ${this.props.courseInformation.organization.unit.toLowerCase()}`}</p>: `Press enter to add new ${this.props.courseInformation.organization.unit.toLowerCase()}`}
                  onKeyPress={() => this.unitKeyController(event)}
                  InputProps={this.state.editUnit ? {
                    endAdornment: (
                      <InputAdornment className="adorned-no-padding" position="end">
                        <Button onClick={() => this.cancelUnitEdit()} className="text-field-button" color="primary">Cancel edit</Button>
                      </InputAdornment>
                    ),
                  } : undefined}
                />
                {
                  this.state.addSubunit && this.props.courseInformation.organization.subunit ?
                    <div>
                      <p className="form-message-small">{`Add ${this.props.courseInformation.organization.subunit.toLowerCase()} to the ${this.props.courseInformation.organization.unit.toLowerCase()}: ${this.props.courseInformation.program[this.state.unitIndex].name}`}</p>
                      <TextField
                        id="subunit-input"
                        label={`${this.props.courseInformation.organization.subunit} name`}
                        margin="normal"
                        variant="outlined"
                        className="form-adorned-input"
                        fullWidth
                        required
                        helperText={this.state.editSubunit ? <p style={{color: "var(--primary)"}}>{`Press enter to edit the ${this.props.courseInformation.organization.subunit.toLowerCase()}`}</p> : `Press enter to add new ${this.props.courseInformation.organization.subunit.toLowerCase()}`}
                        onKeyPress={() => this.subunitKeyController(event)}
                        InputProps={this.state.editSubunit ? {
                          endAdornment: (
                            <InputAdornment className="adorned-no-padding" position="end">
                              <Button onClick={() => this.cancelSubunitEdit()} className="text-field-button" color="primary">Cancel edit</Button>
                            </InputAdornment>
                          ),
                        } : undefined}
                      />
                    </div>
                  :
                  undefined
                }
                {
                  this.props.courseInformation.program.map((unit, index) => {
                    return(
                      <div className="course-organization-units-container">
                        {
                          this.props.courseInformation.organization.unit === "Unit" ?
                            <Unit
                              unit={unit}
                              index={index}
                              setUnitIndex={this.setUnitIndex.bind(this)}
                              unitIndex={this.state.unitIndex}
                              deleteUnit={this.deleteUnit.bind(this)}
                              deleteSubunit={this.deleteSubunit.bind(this)}
                              setUnitToEdit={this.setUnitToEdit.bind(this)}
                              setSubunitToEdit={this.setSubunitToEdit.bind(this)}
                            />
                          :
                          undefined
                        }
                        {
                          this.props.courseInformation.organization.unit === "Topic" ?
                            <Topic
                              topic={unit}
                              index={index}
                              setUnitIndex={this.setUnitIndex.bind(this)}
                              unitIndex={this.state.unitIndex}
                              deleteUnit={this.deleteUnit.bind(this)}
                              setUnitToEdit={this.setUnitToEdit.bind(this)}
                            />
                          :
                          undefined
                        }
                        {
                          this.props.courseInformation.organization.unit === "Season" ?
                            "Season"
                          :
                          undefined
                        }
                      </div>
                    )
                  })
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
