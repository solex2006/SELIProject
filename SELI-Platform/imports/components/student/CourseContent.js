import React, { Component } from 'react';
import ContentItem from '../course/ContentItem';
import TemplateParent from '../course/templates/TemplateParent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default class CourseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationContent: [],
      currentId: ""
    }
  }

  componentDidMount() {
    document.getElementById("courseContainer").scroll(0,0);
    var focused = document.activeElement;
    focused.blur();

    this.setNavigation();

  }

  setNavigation = () => {
    let navigationContent = [];
    this.props.course.program.map((unitTopic, index) => {
      navigationContent.push(`unitTopic-${index}`);
      if (this.props.course.coursePlan.courseStructure === "unit") {
        unitTopic.lessons.map((lesson) => {
          navigationContent.push(lesson._id);
          if (this.props.course.coursePlan.guidedCoursePlan === "guided")
          lesson.activities.map((activity) => {
            navigationContent.push(activity._id);
          })
        })
      } else {
        if (this.props.course.coursePlan.guidedCoursePlan === "guided")
        unitTopic.activities.map((activity) => {
          navigationContent.push(activity._id);
        })
      }
    })
    this.setState({
      navigationContent,
      currentId: navigationContent[0]
    })
  }

  searchSelected = (action) => {
    let futureId = "";
    let index = this.state.navigationContent.indexOf(this.state.currentId);
    if (action === "next") {
      if (index < this.state.navigationContent.length - 1) {
        futureId = this.state.navigationContent[index + 1];
        this.finishDefineSelected(futureId);
      }
    } else {
      if (index > 0) {
        futureId = this.state.navigationContent[index - 1];
        this.finishDefineSelected(futureId);
      }
    }
  }

  finishDefineSelected = (futureId) => {
    this.setState({
      currentId: futureId
    }, () => {
      let selected = this.defineSelected();
      this.props.navigateTo(selected);
    })
  }

  defineSelected = () => {
    let selected = this.props.selected;
    this.props.course.program.map((unitTopic, index) => {
      if (this.state.currentId === `unitTopic-${index}`)
      return selected = [index, 0, 0, 0];
      if (this.props.course.coursePlan.courseStructure === "unit") {
        unitTopic.lessons.map((lesson, lessonIndex) => {
          if (this.state.currentId === lesson._id)
          return selected = [index, lessonIndex, 0, 1];
          if (this.props.course.coursePlan.guidedCoursePlan === "guided")
          lesson.activities.map((activity, activityIndex) => {
            if (this.state.currentId === activity._id)
            return selected = [index, lessonIndex, activityIndex, 2];
          })
        })
      } else {
        if (this.props.course.coursePlan.guidedCoursePlan === "guided")
        unitTopic.activities.map((activity, activityIndex) => {
          if (this.state.currentId === activity._id)
            return selected = [index, 0, activityIndex, 2];
        })
      }
    })
    return selected;
  }

  loadingData = () => {
    let arrayOfItems, arrayOfDesignItems, tools, toComplete, topicLessonLabel;
    if (this.props.course.program.length) {
      if (this.props.selected[3] === 0) {
        arrayOfItems = this.props.course.program[this.props.selected[0]].items;
        arrayOfDesignItems = this.props.course.design[this.props.selected[0]];
        tools = this.props.course.design[this.props.selected[0]].tools;
        if (this.props.course.coursePlan.courseStructure === "topic") {
          if (!this.props.fromPreview) toComplete = this.props.toComplete[this.props.selected[0]];
          topicLessonLabel = this.props.language.topic;
        }
      } else if (this.props.selected[3] === 1) {
        arrayOfItems = this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].items;
        arrayOfDesignItems = this.props.course.design[this.props.selected[0]].lessons[this.props.selected[1]];
        tools = this.props.course.design[this.props.selected[0]].lessons[this.props.selected[1]].tools;
        if (!this.props.fromPreview) toComplete = this.props.toComplete[this.props.selected[0]].subunits[this.props.selected[1]];
        topicLessonLabel = this.props.language.lesson;
      } else if (this.props.selected[3] === 2){
        if (this.props.course.coursePlan.courseStructure === "unit") {
          arrayOfItems = this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].items;
          arrayOfDesignItems = this.props.course.design[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]];
          tools = this.props.course.design[this.props.selected[0]].lessons[this.props.selected[1]].tools;
        }
        else {
          arrayOfItems = this.props.course.program[this.props.selected[0]].activities[this.props.selected[2]].items;
          arrayOfDesignItems = this.props.course.design[this.props.selected[0]].activities[this.props.selected[2]];
          tools = this.props.course.design[this.props.selected[0]].tools;
        }
      }
      return {
        arrayOfItems, arrayOfDesignItems, tools, toComplete, topicLessonLabel
      }
    }
  }

  loadingPage = () => {
    const {arrayOfItems, arrayOfDesignItems, tools,
      toComplete, topicLessonLabel} = this.loadingData();
    return(
      <React.Fragment>
        {
          this.props.course.coursePlan.courseTemplate === "without" ?
            arrayOfItems.map((p, i) => {
              return (
                <ContentItem
                  item={p}
                  toResolve={this.props.toResolve}
                  courseId={this.props.course._id}
                  fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                  handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
                  completeActivity={this.props.completeActivity ? this.props.completeActivity.bind(this) : undefined}
                  language={this.props.language}
                ></ContentItem>
              )
            })
          :
            <TemplateParent
              sortMode={false}
              arrayOfItems={arrayOfItems}
              arrayOfDesignItems={arrayOfDesignItems}
              tools={tools}
              selected={this.props.selected}
              toResolve={this.props.toResolve}
              courseId={this.props.course._id}
              fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
              handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
              completeActivity={this.props.completeActivity ? this.props.completeActivity.bind(this) : undefined}
              language={this.props.language}
            ></TemplateParent>
        }
        {
          !this.props.fromPreview &&
          <div className="course-content-footer-actions">
            <div className="course-content-footer-row">
              <Tooltip title={this.props.language.back}>
                <Fab
                  //disabled={this.props.selected[0] === 0}
                  size="small"
                  className="course-content-footer-fab"
                  onClick={() => this.searchSelected("back")}
                >
                  <NavigateBeforeIcon/>
                </Fab>
              </Tooltip>
              <Tooltip title={this.props.language.next}>
                <Fab
                  //disabled={this.props.selected[0] === this.props.course.program.length - 1}
                  size="small"
                  className="course-content-footer-fab"
                  onClick={() => this.searchSelected("next")}
                >
                  <NavigateNextIcon/>
                </Fab>
              </Tooltip>
            </div>
            { toComplete !== undefined &&
              <React.Fragment>
                {this.props.fromTutor ? undefined : <Button
                  disabled={toComplete}
                  onClick={() => this.props.completeTopicLesson()}
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
        }
      </React.Fragment>
    )
  }

  render() {
    return(
      <div id="courseContainer" className="course-content-container">
        {/* <div aria-label="In this section is the course content, use tab to navigate" autofocus id="botons" tabIndex="0"></div> */}
        { this.props.course.program.length &&
          <React.Fragment>
            {
              !this.props.fromTutor &&
              <Paper elevation={0} className="course-content-breadcrumbs-paper">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Button autoFocus onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text" style={{textTransform: 'none'}}>
                    {this.props.language.courses}
                  </Button>
                  <Button onClick={() => this.props.navigateTo([-1, -1, -1, -1])} id="course-content-breadcrumb-title" className="course-content-breadcrumb-text" style={{textTransform: 'none'}}>
                    {this.props.course.title}
                  </Button>
                  <Button onClick={() => this.props.navigateTo([this.props.selected[0], 0, 0, 0])} id="course-content-breadcrumb-unitTopic" className="course-content-breadcrumb-text" style={{textTransform: 'none'}}>
                    {`${this.props.course.coursePlan.courseStructure === "unit" ? 
                    this.props.language.unit : this.props.language.topic
                    } ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[0]].name}`}
                  </Button>
                  {this.props.course.coursePlan.courseStructure === "unit" && this.props.selected[3] > 0 &&
                    <Button onClick={() => this.props.navigateTo([this.props.selected[0], this.props.selected[1], 0, 1])} id="course-content-breadcrumb-lesson" className="course-content-breadcrumb-text" style={{textTransform: 'none'}}>
                      {`${this.props.language.lesson} ${this.props.selected[1] + 1}: ${this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}
                    </Button>}
                  {this.props.course.coursePlan.courseStructure !== "without" && this.props.selected[3] > 1 &&
                  <Button id="course-content-breadcrumb-task" className="course-content-breadcrumb-text" disabled={true} style={{textTransform: 'none'}}>
                    { this.props.course.coursePlan.courseStructure === "unit" ? 
                      `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.props.course.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].name}` :
                      `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.props.course.program[this.props.selected[0]].activities[this.props.selected[2]].name}`}
                  </Button>}
                </Breadcrumbs>
              </Paper>
            }
            { this.loadingPage() }
          </React.Fragment>
        }
      </div>
    )
  }
}
