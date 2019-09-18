import React from 'react';
import MenuItem from './MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export default class QuizItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'quiz-panel',
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="quiz-content-item">
          <div className="quiz-container">
            <ExpansionPanel
              defaultExpanded
              expanded={this.props.item.attributes.expanded}
              onChange={this.handleChange('activity-panel')}
              className="item-quiz-panel"
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id={this.props.item.id}
                className="item-quiz-expansion-summary"
              >
                <div className="item-quiz-expansion-summary-text-container">
                  <Typography className="quiz-panel-title">Quiz</Typography>
                  <Typography className="quiz-panel-subtitle">{this.props.item.attributes.quizTitle}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="item-quiz-detail">
                <div className="item-quiz-detail-container">
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {"Time limit: " + this.props.item.attributes.timeLimit + " minutes"}
                  </Typography>
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {"Credit resourses: " + this.props.item.attributes.creditResources}
                  </Typography>
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {this.props.item.attributes.awardPoints ? "Award points" : "No award points"}
                  </Typography>
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {"Number of questions: " + this.props.item.attributes.questions.length}
                  </Typography>
                  <div className="quiz-item-tick-container">

                  </div>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions className="quiz-item-actions">
                <Button size="medium">
                  Set reminder
                </Button>
                <Button size="medium" color="primary">
                  Start
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </div>
        </div>
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
