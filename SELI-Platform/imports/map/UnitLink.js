import React, { Component } from 'react';


export default class UnitLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  chooseUnit(unit){
    this.props.chooseUnit(unit);
  }

  render() {
    return(
      <div>
        <div onClick={() => this.chooseUnit(this.props.units)} className="unit-container">
          {
            this.props.units.selected ?
              <div className="step-current"></div>
            :
            <div className="step-blank"></div>
          }
          <p className="step-key">{this.props.units.key}</p>
          <p className="step-title">{this.props.units.name}</p>
          <div className="step-undone"></div>
        </div>
      </div>
    )
  }
}
