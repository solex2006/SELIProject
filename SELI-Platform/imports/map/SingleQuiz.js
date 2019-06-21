import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


export default class SingleQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  delete(){
    this.props.deleteQuiz(this.props.quizes);
  }

  render() {
    return(
      <div>
        <div className="content-information-container">
          <div className="content-type-icon" style={{backgroundImage: "url(quiz-g3.svg)"}}></div>
          <div className="content-name">{this.props.quizes.title}</div>
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
