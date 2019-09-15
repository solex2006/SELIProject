import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="message-card-container">
        <div className="message-card-column"></div>
        <div className="message-card-information">
          <p className="message-card-titie">{this.props.title}</p>
          {this.props.icon}
          <div className="message-card-action-container">
            <Button onClick={() => {location.reload()}} className="message-card-button" color="primary">Create another</Button>
          </div>
        </div>
      </div>
    )
  }
}
