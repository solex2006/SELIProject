import React, { Component } from 'react';
import ImageItem from './items/ImageItem'
import AudioItem from './items/AudioItem'
import TextItem from './items/TextItem'
import CompressedItem from './items/CompressedItem'
import EmbeddedItem from './items/EmbeddedItem'
import H5PItem from './items/H5PItem'
import ActivityItem from './items/ActivityItem'
import LinkItem from './items/LinkItem'
import PdfItem from './items/PdfItem'
import QuizItem from './items/QuizItem'
import VideoItem from './items/VideoItem'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default class CourseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
  }

  loadingData = () => {
    let arrayOfItems;
    let toComplete;
    let topicLessonLabel;
    let taskLength;
    let previousTaskLength;
    let unitTopicLength;
    let lessonLength;
    let previousLessonLength
    if (this.props.course.program.length) {
      if (this.props.selected[3] === 0) {
        arrayOfItems = this.props.course.program[this.props.selected[0]].items;
        if (this.props.course.coursePlan.courseStructure === "topic") {
          toComplete = this.props.toComplete[this.props.selected[0]];
          topicLessonLabel = this.props.language.topic;
        }
      } else if (this.props.selected[3] === 1) {
        arrayOfItems = this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].items;
        toComplete = this.props.toComplete[this.props.selected[0]].subunits[this.props.selected[1]];
        topicLessonLabel = this.props.language.lesson;
      } else if (this.props.selected[3] === 2){
        if (this.props.course.coursePlan.courseStructure === "unit") {
          arrayOfItems = this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].items;
        }
        else {
          arrayOfItems = this.props.course.program[this.props.selected[0]].activities[this.props.selected[2]].items;
        }
      }
      unitTopicLength = this.props.course.program.length;
      lessonLength = this.props.course.program[this.props.selected[0]].lessons.length;
      taskLength = this.props.course.program[this.props.selected[0]].activities.length;
      if (this.props.selected[0] > 0) {
        previousLessonLength = this.props.course.program[this.props.selected[0] - 1].lessons.length;
        previousTaskLength = this.props.course.program[this.props.selected[0] - 1].activities.length;
      }
      return {
        arrayOfItems, toComplete, topicLessonLabel, taskLength,
        unitTopicLength, lessonLength, previousLessonLength, previousTaskLength
      }
    }
  }

  loadingPage = () => {
    var {arrayOfItems, toComplete, topicLessonLabel, taskLength,
      unitTopicLength, lessonLength, previousLessonLength, previousTaskLength} = this.loadingData();
    return(
      <React.Fragment>
        {
          arrayOfItems.map((item, index) => {
            return(
              <div>
                {
                  item.type === "text" ?
                    <TextItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "image" ?
                    <ImageItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "video" ?
                    <VideoItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      openMediaPlayer={this.props.fromTutor ? undefined : this.props.openMediaPlayer.bind(this)}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "audio" ?
                    <AudioItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      openMediaPlayer={this.props.fromTutor ? undefined : this.props.openMediaPlayer.bind(this)}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "link" ?
                    <LinkItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "unity" ?
                    <UnityItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "embedded" ?
                    <EmbeddedItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      loadingEmbedded={this.props.language.loadingEmbedded}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "pdf" ?
                    <PdfItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "compressed" ?
                    <CompressedItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "h5p" ?
                    <H5PItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      instructions={this.props.language.instructions}
                      loadingH5p={this.props.language.loadingH5p}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "quiz" ?
                  <div>
                    <QuizItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      toResolve={this.props.toResolve}
                      course={this.props.course._id}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      completeActivity={this.props.fromTutor ? undefined : this.props.completeActivity.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  </div>
                    
                  :
                  undefined
                }
                {
                  item.type === "activity" ?
                    <ActivityItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      toResolve={this.props.toResolve}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      completeActivity={this.props.fromTutor ? undefined : this.props.completeActivity.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
              </div>
            )
          })
        }
        <div className="course-content-footer-actions">
          <div className="course-content-footer-row">
            <Tooltip title={this.props.language.back}>
              <Fab
                //disabled={this.props.selected[0] === 0}
                size="small"
                className="course-content-footer-fab"
                onClick={() => this.props.handlePrevious(this.props.course.coursePlan.courseStructure, previousTaskLength, unitTopicLength, previousLessonLength)}
              >
                <NavigateBeforeIcon/>
              </Fab>
            </Tooltip>
            <Tooltip title={this.props.language.next}>
              <Fab
                //disabled={this.props.selected[0] === this.props.course.program.length - 1}
                size="small"
                className="course-content-footer-fab"
                onClick={() => this.props.handleNext(this.props.course.coursePlan.courseStructure, taskLength, unitTopicLength, lessonLength)}
              >
                <NavigateNextIcon/>
              </Fab>
            </Tooltip>
          </div>
          { toComplete !== undefined &&
            <React.Fragment>
              {this.props.fromTutor ? undefined : <Button
                disabled={toComplete}
                onClick={() => this.props.completeUnit(this.props.selected)}
                variant="contained"
                className="course-content-footer-button"
              >
                {
                  toComplete ?
                  `${topicLessonLabel} ${this.props.language.completed}` :
                  `${this.props.language.complete} ${topicLessonLabel}`
                }
              </Button>}
              {
                toComplete ?
                  <CheckCircleIcon className="success-dialog-icon-small"/>
                :
                undefined
              }
              {
                toComplete && !this.props.fromTutor ?
                  <Button
                    className="course-content-footer-button-small"
                    color="primary"
                    variant="outlined"
                    onClick={() => this.props.leaveComment()}
                  >
                    {this.props.language.leaveComment}
                  </Button>
                :
                undefined
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    )
  }

  render() {
    return(
      <div className="course-content-container">
        { this.props.course.program.length &&
          <React.Fragment>
            <div className="course-content-breadcrumbs-container">
              {
                this.props.fromTutor ? undefined :
                  <Paper elevation={0} className="course-content-breadcrumbs-paper">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                      <Typography onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text">
                        {this.props.language.courses}
                      </Typography>
                      <Typography onClick={() => this.props.navigateTo([-1, -1, -1, -1])} id="course-content-breadcrumb-title" className="course-content-breadcrumb-text">
                        {this.props.course.title}
                      </Typography>
                      <Typography onClick={() => this.props.navigateTo([this.props.selected[0], 0, 0, 0])} id="course-content-breadcrumb-unitTopic" className="course-content-breadcrumb-text">
                        {`${this.props.course.coursePlan.courseStructure === "unit" ? 
                        this.props.language.unit : this.props.language.topic
                        } ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[0]].name}`}
                      </Typography>
                      {this.props.course.coursePlan.courseStructure === "unit" && this.props.selected[3] > 0 &&
                        <Typography onClick={() => this.props.navigateTo([this.props.selected[0], this.props.selected[1], 0, 1])} id="course-content-breadcrumb-lesson" className="course-content-breadcrumb-text">
                          {`${this.props.language.lesson} ${this.props.selected[1] + 1}: ${this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}
                        </Typography>}
                      {this.props.course.coursePlan.courseStructure !== "without" && this.props.selected[3] > 1 &&
                      <Typography id="course-content-breadcrumb-task" className="course-content-breadcrumb-text">
                        { this.props.course.coursePlan.courseStructure === "unit" ? 
                          `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].name}` :
                          `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.props.course.program[this.props.selected[0]].activities[this.props.selected[2]].name}`}
                      </Typography>}
                    </Breadcrumbs>
                  </Paper>
              }
            </div>
            { this.loadingPage() }
          </React.Fragment>
        }
      </div>
    )
  }
}
