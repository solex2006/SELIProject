import React, { Component } from 'react';


export default class StepsNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  navigateTo(formId){
    this.props.navigateTo(formId);
  }

  render() {
    return(
      <div>
        <div onClick={ this.props.steps.enabled ? () => this.navigateTo(this.props.steps.key) : undefined } className="step-container">
          {
            this.props.steps.active ?
              <div className="step-current"></div>
            :
            <div className="step-blank"></div>
          }
          <p className="step-key">{this.props.steps.key}</p>
          {
            this.props.steps.enabled ?
              <p className="step-title">{this.props.steps.title}</p>
            :
            <p className="step-title-disabled">{this.props.steps.title}</p>
          }
          {
            this.props.steps.done ?
              <div className="step-done"></div>
            :
            <div className="step-undone"></div>
          }
        </div>
      </div>
    )
  }
}
