import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedLesson: 'lessonExpansionPanel',
    }
  }

  handleLessonChange = panel => (event, expanded) => {
    this.setState({
      expandedLesson: expanded ? panel : false,
    });
  };

  render() {
    return(
      <div>
        <ExpansionPanel
          className="lesson-expansion-panel"
          expanded={this.state.expandedLesson === 'lessonExpansionPanel'}
          onChange={this.handleLessonChange('lessonExpansionPanel')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className="expand-more-lesson"/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body2" display="block" gutterBottom>{"Lesson " + this.props.lessons.ordinal + ": " + this.props.lessons.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="lesson-expansion-detail">
            <div className="lesson-detail-container">
              <div className="lesson-detail-container">
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.props.showForm('ContentEditor', true)} className="unit-creator-button" color="primary">
                    Add content
                  </Button>
                </div>
              </div>
              <div className="lesson-detail-container">
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.props.showForm('QuizEditor', true)} className="unit-creator-button" color="primary">
                    Add quiz
                  </Button>
                </div>
              </div>
              <div className="lesson-detail-container">
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.props.showForm('LearningActivityEditor', true)} className="unit-creator-button" color="primary">
                    Add learning activity
                  </Button>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}
