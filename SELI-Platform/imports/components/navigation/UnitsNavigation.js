import React, { Component } from 'react';


export default class UnitsNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="units-navigation-container">
          <div className="navigation-panel-title">Units</div>
          <div className="units-list">
            {
              this.props.units.map((units) =>
                {
                  return <UnitLink
                    units={units}
                    key={units.key}
                    chooseUnit={this.props.chooseUnit.bind(this)}/>
                })
            }
          </div>
        </div>
      </div>
    )
  }
}
