import React from 'react';
import UnitContentCreator from './UnitContentCreator';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class UnitsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUnitIndex: undefined,
      selectedUnit: undefined,
      lessons: [],
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  saveRequirements() {
    this.props.showForm('UnitsEditor', true);
  }

  createUnit() {
    let unitName = document.getElementById('unit-name-input').value;
    let unit = {
      name: unitName,
      key: this.props.units.length + 1,
      lessons: [],
    }
    this.props.createUnit(unit);
  }

  createNewLesson(lesson){
    let selectedUnit = this.props.selectedUnit;
    selectedUnit.lessons.push(lesson);
  }

  updateLesson(lesson){
    this.props.updateLesson(lesson);
  }

  saveProgram(){
    this.props.openConfirmationDialog();
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Program</div>
          {
            this.props.units.length > 0 ?
              <div>
                <div className="form-subtitle">Created units</div>
                <UnitContentCreator
                  selectedUnit={this.props.selectedUnit}
                  index={this.props.selectedUnitIndex}
                  showForm={this.props.showForm.bind(this)}
                  showControlMessage={this.props.showControlMessage.bind(this)}
                  createNewLesson={this.createNewLesson.bind(this)}
                  lessons={this.props.selectedUnit.lessons}
                  selectLesson={this.props.selectLesson.bind(this)}
                  updateLesson={this.updateLesson.bind(this)}
                />
              </div>
            :
              undefined
          }
          <div className="input-container">
            <TextField
              id="unit-name-input"
              label="Unit name"
              margin="normal"
              variant="outlined"
              type="text"
              required
              fullWidth
            />
          </div>
          <div className="form-button-container">
            <Button onClick={() => this.createUnit()} className="create-button" id="create-unit-button" variant="contained" color="primary">
              Create unit
            </Button>
          </div>
          {
            this.props.units.length > 0 ?
              <div className="form-button-container">
                <Button onClick={() => this.saveProgram()} className="form-button" id="upload-button" variant="contained" color="secondary">
                  Save program
                </Button>
              </div>
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
