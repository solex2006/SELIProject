import React from 'react';

import Quiz from '../Quiz';
import Loading from '../../tools/Loading';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Slide from '@material-ui/core/Slide';

import {Activities} from '../../../../lib/ActivitiesCollection';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class QuizItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'quiz-panel',
      resolved: false,
      time: this.props.item.attributes.timeLimit * 60 * 1000,
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  handleClose = () => {
    this.setState({
      open: false,
      showConfirmation: false,
      showQuiz: false,
      doingQuiz: false,
    });
  }

  handleCloseScore = () => {
    this.setState({
      openScore: false,
    });
  }

  checkResolved = () => {
    this.props.toResolve.map(activity => {
      (activity._id === this.props.item.id && activity.resolved) ? this.setState({resolved: true}) : undefined
    })
  }

  componentDidMount(){
    this.checkResolved();
  }

  componentWillReceiveProps() {
    this.checkResolved();
  }

  startQuiz = () => {
    this.setState({
      showConfirmation: true,
      open: true,
    });
  }

  confirmStartQuiz = () => {
    this.setState({
      showConfirmation: false,
      showQuiz: true,
      doingQuiz: true,
    });
  }

  showScore = () => {
    this.setState({
      openScore: true,
      loadingScore: true,
    }, () => {
      let activity = Activities.find(
        {
          'activity.user': Meteor.userId(),
          'activity.course': this.props.course,
          'activity.activityId': this.props.item.id,
        }
      ).fetch();
      if (activity.length) {
        activity = activity[0];
        this.setState({
          quizResult: activity,
          loadingScore: false,
          result: true,
        })
      }
      else {
        this.setState({
          result: false,
        })
      }
    });
  }

  render() {
    console.log("en el student")
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
                  <Typography className="quiz-panel-title">{this.props.language.quiz}</Typography>
                  <Typography className="quiz-panel-subtitle">{this.props.item.attributes.title}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="item-quiz-detail">
                <div className="item-quiz-detail-container">
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {this.props.language.timeLimit + ": " + this.props.item.attributes.timeLimit + " minutes"}
                  </Typography>
                  {/* <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {this.props.language.creditResources + ": " + this.props.item.attributes.creditResources}
                  </Typography> */}
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {this.props.language.numberQuestions + ": " + this.props.item.attributes.questions.length}
                  </Typography>
                  <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                    {this.props.item.attributes.awardPoints ? this.props.language.awardPoints : this.props.language.noAwardPoints}
                  </Typography>
                  <div className="quiz-item-tick-container">

                  </div>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions className="quiz-item-actions">
                {
                  !this.state.resolved ?
                    <div>
                      <Button size="medium">
                        {this.props.language.setReminder}
                      </Button>
                      <Button onClick={() => this.startQuiz()} size="medium" color="primary">
                        {this.props.language.startQuiz}
                      </Button>
                    </div>
                  :
                  <div className="align-items-center">
                    <Button onClick={() => this.showScore()} size="medium">
                      {this.props.language.seeResults}
                    </Button>
                    <CheckCircleIcon className="done-icon"/>
                  </div>
                }
              </ExpansionPanelActions>
            </ExpansionPanel>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={this.state.doingQuiz}
          disableEscapeKeyDown={this.state.doingQuiz}
          className="media-dialog"
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton disabled={this.state.doingQuiz} edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                {this.props.language.seliQuiz}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent className="quiz-dialog-content">
            {
              this.state.showConfirmation ?
                <div className="full-screen-dialog-mid-container">
                  <div className="center-row">
                    <AnnouncementIcon className="quiz-dialog-icon-big"/>
                    <DialogContentText className="quiz-dialog-content-text" id="alert-dialog-description">
                      {this.props.language.sureStartQuiz} 
                    </DialogContentText>
                  </div>
                  <div className="center-row">
                    <Button onClick={() => this.handleClose()} className="dialog-confirmation-button" color="secondary">{this.props.language.cancel}</Button>
                    <Button onClick={() => this.confirmStartQuiz()} className="dialog-confirmation-button" color="primary">{this.props.language.yesSure}</Button>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.showQuiz ?
                <Quiz
                  quiz={this.props.item}
                  completeActivity={this.props.completeActivity.bind(this)}
                  handleControlMessage={this.props.handleControlMessage.bind(this)}
                  handleClose={this.handleClose.bind(this)}
                  time={this.state.time}
                  language={this.props.language}
                />
              :
              undefined
            }
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openScore}
          onClose={this.handleCloseScore}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.quizResults}</DialogTitle>
          <DialogContent className="success-dialog-content">
            {
              this.state.loadingScore ?
                <Loading message={this.props.language.loadingScore}/>
              :
              <div>
                {
                  !this.state.result ?
                    <DialogContentText className="success-dialog-content-text">
                      {this.props.language.noResults}
                    </DialogContentText>
                  :
                  <div>
                    <DialogContentText id={this.state.quizResult.activity.approved ? "approved-text" : "non-approved-text"} className="quiz-result-dialog-content-text">
                      {this.state.quizResult.activity.approved ? this.props.language.quizApproved : this.props.language.quizNotApproved}
                    </DialogContentText>
                    <DialogContentText id={this.state.quizResult.activity.approved ? "approved-text" : "non-approved-text"} className="quiz-result-dialog-content-text">
                      {`${this.props.language.score}: ${this.state.quizResult.activity.score}`}
                    </DialogContentText>
                    <DialogContentText  className="quiz-result-dialog-content-text">
                      {`${this.props.language.correctAnswers}: ${this.state.quizResult.activity.hits}`}
                    </DialogContentText>
                    <DialogContentText  className="quiz-result-dialog-content-text">
                      {`${this.props.language.wrongAnswers}: ${(this.props.item.attributes.questions.length - this.state.quizResult.activity.hits)}`}
                    </DialogContentText>
                    <DialogContentText className="quiz-result-dialog-content-text">
                      {`${this.props.language.approvalPercentage}: ${this.props.item.attributes.approvalPercentage}%`}
                    </DialogContentText>
                  </div>
                }
              </div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseScore()} color="primary" autoFocus>
              {this.props.language.ok}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
