import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="item-list-container">
          <p className="item-list-text">{this.props.modalities.label}</p>
          <p className="item-list-remove-button">
            <Button onClick={() => this.props.removeModality(this.props.modalities.key)} className="main-button" id="upload-button" color="primary">
              Remove
            </Button>
          </p>
        </div>
      </div>
    )
  }
}
