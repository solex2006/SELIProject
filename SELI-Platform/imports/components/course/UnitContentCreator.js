import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import Lesson from '../../map/Lesson.js';

export default class UnitContentCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewLessonInput: false,
    }
  }

  newLesson(){
    this.setState({
      showNewLessonInput: true,
    });
  }

  createNewLesson(){
    let name = document.getElementById('lesson-name-input').value;
    if(name === ""){
      this.setState({
        nameError: true,
      });
      this.props.showControlMessage("Fields marked with * are required");
    }
    else {
      let lessons = this.props.lessons;
      let lesson = {
        key: lessons.length + this.props.selectedUnit.key,
        name: name,
        ordinal: lessons.length + 1,
      }
      this.setState({
        nameError: false,
      });
      this.props.createNewLesson(lesson);
    }
  }

  cancelNewLesson(){
    this.setState({
      showNewLessonInput: false,
    });
  }

  render() {
    return(
      <div>
        <div className="unit-creator-container">
          <div className="unit-information-container">
            <div className="left-subtitle">{"Unit " + this.props.selectedUnit.key + " - " + this.props.selectedUnit.name}</div>
          </div>
          <Divider variant="middle" />
          {
            this.props.lessons.length ?
              <div className="lessons-containter">
                {
                  this.props.lessons.map((lessons) =>
                    {
                      return <Lesson
                        lessons={lessons}
                        key={lessons.key}
                        showForm={this.props.showForm.bind(this)}/>
                    })
                }
              </div>
            :
            undefined
          }
          {
            this.state.showNewLessonInput ?
              <div className="add-new-input-container">
                <TextField
                  id="lesson-name-input"
                  label="Lesson name"
                  margin="normal"
                  variant="outlined"
                  className="add-new-input"
                  required
                  error={this.state.nameError}
                />
                <div className="confirm-buttons-container">
                  <Button onClick={() => this.createNewLesson()} className="confirm-button" color="primary">
                    Ok
                  </Button>
                  <Button onClick={() => this.cancelNewLesson()} className="confirm-button" color="primary">
                    Cancel
                  </Button>
                </div>
              </div>
            :
            <div id="lesson-creator" className="unit-creator-button-container">
              <Button onClick={() => this.newLesson()} className="unit-creator-button" color="secondary">
                New lesson
              </Button>
            </div>
          }
        </div>
      </div>
    )
  }
}
