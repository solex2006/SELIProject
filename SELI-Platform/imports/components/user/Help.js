import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';

import {Feedback} from '../../../lib/FeedbackCollection';

export default class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        title: '',
        description: '',
        subject: 'report'
      }
    }
  }

  componentDidMount() {

  }

  validateSendMessage = () => {
    if (this.state.message.title === '' || this.state.message.description === '') {
      this.props.handleControlMessage(true, this.props.language.fieldsMarkedWith);
      return false;
    }
    return true;
  }

  sendMessage = () => {
    if (this.validateSendMessage()) {
      Feedback.insert({
        type: this.state.message.subject,
        date: new Date(),
        from: Meteor.user().username,
        userId: Meteor.userId(),
        title: this.state.message.title,
        description: this.state.message.description,
      }, () => {
        this.props.handleControlMessage(true, this.props.language.thanksForInformation);
        this.setState({
          message: {
            title: '',
            description: '',
            subject: 'report'
          }
        })
      })
    }
  }

  handleChange = name => event => {
    let message = this.state.message;
    if (name === 'title') {
      message.title = event.target.value;
    }
    else if (name === 'description') {
      message.description = event.target.value;
    }
    this.setState({
      message: message,
    });
  };

  render() {
    return(
      <div className="account-management-container">
        <div className="account-management-file-column">
          <div className="account-management-information">
            <p className="account-management-primary-text">{this.props.language.userHelp}</p>
          </div>
          <Avatar
            className="account-management-avatar"
            src={'help.svg'}
            style={{backgroundColor: "#FFFFFF"}}
          />
        </div>
        <div className="form-input-column-align-center">
          <TextField
            id="subject-select-currency"
            select
            label={this.props.language.subject}
            value={this.state.message.subject}
            onChange={this.handleChange('subject')}
            fullWidth
            helperText="Select the subject of your message"
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="report">
              {this.props.language.reportABug}
            </MenuItem>
            <MenuItem disabled value="ask">
              {this.props.language.askSomething}
            </MenuItem>
          </TextField>
          <p className="account-management-secondary-text">{this.props.language.fillTheFollowingFields}</p>
          <TextField
            id="title-input"
            label={this.props.language.title}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={"off"}
            required
            value={this.state.message.title}
            onChange={this.handleChange('title')}
            error={this.state.showError && this.state.message.title === ''}
          />
          <TextField
            id="description-input"
            label={this.props.language.description}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={this.state.message.description}
            onChange={this.handleChange('description')}
            error={this.state.showError && this.state.message.description === ''}
          />
          <div className="account-management-actions-container">
            <Button onClick={() => this.sendMessage()} className="large-button" variant="outlined" size="large" color="primary">{this.props.language.sendMessage}</Button>
          </div>
        </div>
      </div>
      );
    }
  }
