import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Question from '../map/Question.js';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedQuiz: 'quizExpansionPanel',
    }
  }

  handleQuizChange = panel => (event, expanded) => {
    this.setState({
      expandedQuiz: expanded ? panel : false,
    });
  };

  addQuestion(){
    this.props.selectQuiz(this.props.quizes);
  }

  render() {
    return(
      <div>
        <ExpansionPanel
          className="lesson-expansion-panel"
          expanded={this.state.expandedQuiz === 'quizExpansionPanel'}
          onChange={this.handleQuizChange('quizExpansionPanel')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className="expand-more-lesson"/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body2" display="block" gutterBottom>{"Quiz " + this.props.quizes.ordinal + ": " + this.props.quizes.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="lesson-expansion-detail">
            <div className="lesson-detail-container">
              {
                this.props.quizes.questions.length ?
                  <div className="lesson-content-container">
                    <div className="expansion-panel-label">Content</div>
                    {
                      this.props.quizes.questions.map((questions) =>
                        {
                          return <Question
                            questions={questions}
                            key={questions.key}/>
                        })
                    }
                  </div>
                :
                undefined
              }
              <div className="lesson-detail-container">
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.addQuestion()} className="question-creator-button" color="secondary">
                    Add question
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
