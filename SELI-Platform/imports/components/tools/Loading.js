import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="loading-container">
          <div className="loading-row">
            <div className="loading-container">
              <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
            </div>
            <p className="loading-text">{this.props.message}</p>
          </div>
        </div>
      </div>
    )
  }
}
