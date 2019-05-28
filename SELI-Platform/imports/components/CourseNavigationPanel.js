import React, { Component } from 'react';
import NavigationSteps from '../map/NavigationSteps';
import UnitsNavigation from '../map/UnitsNavigation';

export default class CourseNavigationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="course-navigation-container">
          <div className="navigation-panel-title">STEPS</div>
          {
            this.props.steps.map((steps) =>
              {
                return <NavigationSteps
                  steps={steps}
                  key={steps.key}
                  navigateTo={this.props.navigateTo.bind(this)}/>
              })
          }
          {
            this.props.units.length > 0 ?
              <UnitsNavigation
                units={this.props.units}
                selectedUnitIndex={this.props.selectedUnitIndex}
                chooseUnit={this.props.chooseUnit.bind(this)}
              />
            :
            undefined
          }
        </div>
      </div>
  )
}
}
