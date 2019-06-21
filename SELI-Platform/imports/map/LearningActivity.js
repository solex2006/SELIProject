import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class LearningActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  delete(){
    this.props.deleteLearningActivity(this.props.learningActivities);
  }

  render() {
    return(
      <div>
        <div className="content-information-container">
          <div className="content-type-icon" style={{backgroundImage: "url(learning-activity-g3.svg)"}}></div>
          <div className="content-name">{this.props.learningActivities.name}</div>
          <div className="content-crud-button-container">
            <Button className="content-crud-button" color="primary">
              Edit
            </Button>
            <Button onClick={() => this.delete()} className="content-crud-button" color="primary">
              Delete
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
