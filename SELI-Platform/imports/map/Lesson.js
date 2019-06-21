import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Content from './Content.js';
import SingleQuiz from './SingleQuiz.js';
import LearningActivity from './LearningActivity.js';

export default class Lesson extends React.Component {
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

  addContent(){
    this.props.showForm('ContentEditor', true);
    this.props.selectLesson(this.props.lessons);
  }

  deleteContent(content){
    let lesson = this.props.lessons;
    for (var i = 0; i < lesson.content.length; i++) {
      if(lesson.content[i].key === content.key){
        lesson.content.splice(i, 1);
      }
    }
    this.props.updateLesson();
  }

  addQuiz(){
    this.props.showForm('QuizEditor', true);
    this.props.selectLesson(this.props.lessons);
  }

  deleteQuiz(quiz){
    let lesson = this.props.lessons;
    for (var i = 0; i < lesson.quizes.length; i++) {
      if(lesson.quizes[i].key === quiz.key){
        lesson.quizes.splice(i, 1);
      }
    }
    this.props.updateLesson();
  }

  addLearningActivity(){
    this.props.showForm("LearningActivityEditor", true);
    this.props.selectLesson(this.props.lessons);
  }

  deleteLearningActivity(learningActivity){
    let lesson = this.props.lessons;
    for (var i = 0; i < lesson.learningActivities.length; i++) {
      if(lesson.learningActivities[i].key === learningActivity.key){
        lesson.learningActivities.splice(i, 1);
      }
    }
    this.props.updateLesson();
  }

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
              {
                this.props.lessons.content.length ?
                  <div className="lesson-content-container">
                    <div className="expansion-panel-label">Content</div>
                    {
                      this.props.lessons.content.map((content) =>
                        {
                          return <Content
                            content={content}
                            key={content.key}
                            deleteContent={this.deleteContent.bind(this)}/>
                        })
                    }
                  </div>
                :
                undefined
              }
              <div className="lesson-detail-container">
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.addContent()} className="unit-creator-button" color="primary">
                    Add content
                  </Button>
                </div>
              </div>
              <div className="lesson-detail-container">
                {
                  this.props.lessons.quizes.length ?
                    <div className="lesson-content-container">
                      <div className="expansion-panel-label">Quizes</div>
                      {
                        this.props.lessons.quizes.map((quizes) =>
                          {
                            return <SingleQuiz
                              quizes={quizes}
                              key={quizes.key}
                              deleteQuiz={this.deleteQuiz.bind(this)}/>
                          })
                      }
                    </div>
                  :
                  undefined
                }
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.addQuiz()} className="unit-creator-button" color="primary">
                    Add quiz
                  </Button>
                </div>
              </div>
              <div className="lesson-detail-container">
                {
                  this.props.lessons.learningActivities.length ?
                    <div className="lesson-content-container">
                      <div className="expansion-panel-label">Learning activities</div>
                      {
                        this.props.lessons.learningActivities.map((learningActivities) =>
                          {
                            return <LearningActivity
                              learningActivities={learningActivities}
                              key={learningActivities.key}
                              deleteLearningActivity={this.deleteLearningActivity.bind(this)}/>
                          })
                      }
                    </div>
                  :
                  undefined
                }
                <div className="unit-creator-button-container">
                  <Button onClick={() => this.addLearningActivity()} className="unit-creator-button" color="primary">
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
