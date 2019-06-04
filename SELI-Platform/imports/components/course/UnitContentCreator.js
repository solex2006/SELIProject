import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

export default class UnitContentCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="unit-creator-container">
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {'Unit'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                {'N-' + this.props.selectedUnit.key}
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Typography id="unit-name-typography" color="textSecondary" variant="body2">
            {'Name: ' + this.props.selectedUnit.name}
          </Typography>
          <div>
            <Typography className="actions-typography" gutterBottom variant="body1">
              Unit actions
            </Typography>
            <div className="crud-buttons-container">
              <Button onClick={() => this.createUnit()} className="crud-button" color="primary">
                Delete
              </Button>
              <Button onClick={() => this.createUnit()} className="crud-button" color="primary">
                Edit
              </Button>
              <Button onClick={() => this.createUnit()} className="crud-button" color="primary">
                Move
              </Button>
            </div>
            <Typography className="actions-typography" gutterBottom variant="body1">
              Content actions
            </Typography>
            <div className="unit-content-buttons-container">
              <Button onClick={() => this.props.showForm('ContentEditor', true)} className="add-button" color="primary">
                Add content
              </Button>
              <Button onClick={() => this.props.showForm('QuizEditor', true)} className="add-button" color="primary">
                Add quiz
              </Button>
              <Button onClick={() => this.props.showForm('LearningActivityEditor', true)} className="add-button" color="primary">
                Add Learning activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
