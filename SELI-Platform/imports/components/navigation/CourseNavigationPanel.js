import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import StepsNavigation from '../navigation/StepsNavigation';
import UnitsNavigation from '../navigation/UnitsNavigation';

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
          <div className="main-navigation-panel-title">NAVIGATION</div>
          <Divider variant="middle" />
          <div className="navigation-panel-title">STEPS</div>
          {
            this.props.steps.map((steps) =>
              {
                return <StepsNavigation
                  steps={steps}
                  key={steps.key}
                  navigateTo={this.props.navigateTo.bind(this)}/>
              })
          }
          <div className="navigation-separator"></div>
          {
            this.props.units.length > 0 ?
              <div>
                <Divider variant="middle" />
                <UnitsNavigation
                  units={this.props.units}
                  selectedUnitIndex={this.props.selectedUnitIndex}
                  chooseUnit={this.props.chooseUnit.bind(this)}
                />
              </div>
            :
            undefined
          }
        </div>
      </div>
  )
}
}
