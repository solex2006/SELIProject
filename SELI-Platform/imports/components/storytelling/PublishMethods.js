import React, { Component } from 'react';
import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Courses } from '../../../lib/CourseCollection';
import { Link } from "react-router-dom";

import { 
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  TwitterShareButton, TwitterIcon
} from "react-share";

export default class PublishMethods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "boxpubshow",
    }
  }

  completeActivity = (id, label, courseId) => {
    let courses = this.state.courses;
    let courseIndex = courses.findIndex(course => course._id === courseId);
    let toComplete = this.props.user.profile.courses[courseIndex].toComplete;
    let toResolve = this.props.user.profile.courses[courseIndex].toResolve;
    for (var i = 0; i < toResolve.length; i++) {
      if (toResolve[i]._id === id) {
        toResolve[i].resolved = true;
        toResolve[i].activityId = this.props.saved;
        break;
      }
    }
    let progress = this.calculateProgress(toComplete, toResolve, courses[courseIndex].organization.subunit);
    this.setState({
      toResolve: toResolve,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteActivity", Meteor.userId(),
        this.state.toResolve,
        courseId,
        progress,
        (error, response) =>  {
          if (!error) {
            this.props.handleControlMessage(true, label);
            this.props.handleClose();
          }
      });
      this.handleClosepublish();
    });
  }

  calculateProgress = (toComplete, toResolve, hasSubunit) => {
    let total;
    if (hasSubunit) {
      let totalSubunits = 0;
      for (var i = 0; i < toComplete.length; i++) {
        for (var j = 0; j < toComplete[i].subunits.length; j++) {
          totalSubunits++;
        }
      }
      total = totalSubunits + toResolve.length;
    }
    else {
      total = toComplete.length + toResolve.length;
    }
    let unitPercentage  = parseFloat(100/total);
    let progress = 0;
    if (hasSubunit) {
      toComplete.map(completed => {
        completed.subunits.map(subunit => subunit ? progress += unitPercentage : undefined)
      });
    }
    else {
      toComplete.map(completed => completed ? progress += unitPercentage : undefined);
    }
    toResolve.map(activity => activity.resolved ? progress += unitPercentage : undefined);
    progress = progress.toFixed(2);
    if (progress === 99.99) {
      progress = 100;
    }
    parseInt(progress) === 100 ? this.createCertificate() : undefined
    return progress;
  }

  handlePublishOnCourse = () => {
    let courses = [];
    this.props.user.profile.courses.map(course => {
      courses.push(course.courseId)
    });
    courses = Courses.find({_id: {$in: courses}}).fetch();
    this.setState({
      action: "publishOnCourse",
      courses: courses,
    })
  }

  handlePublishAsActivity = () => {
    let courses = [];
    let activities = [];
    this.props.user.profile.courses.map(course => {
      courses.push(course.courseId)
    });
    courses = Courses.find({_id: {$in: courses}}).fetch();
    courses.map(course => {
      if (course.coursePlan.courseStructure === "unit") {
        course.program.map(unit => {
          unit.lessons.map(subunit => {
            subunit.items.map(item => {
              if (item.type === "activity" && item.attributes.type === "storyboard") {
                for (var i = 0; i < this.props.user.profile.courses.length; i++) {
                  for (var j = 0; j < this.props.user.profile.courses[i].toResolve.length; j++) {
                    if (this.props.user.profile.courses[i].toResolve[j]._id === item.id && !this.props.user.profile.courses[i].toResolve[j].resolved) {
                      activities.push({
                        course: course.title,
                        source: `${unit.name} - ${subunit.name}`,
                        courseId: course._id,
                        activityId: item.id,
                        instruction: item.attributes.instruction,
                      });
                    }
                  }
                }
              }
            })
          })
        })
      }
      else {
        course.program.map(unit => {
          unit.items.map(item => {
            if (item.type === "activity" && item.attributes.type === "storyboard") {
              for (var i = 0; i < this.props.user.profile.courses.length; i++) {
                for (var j = 0; j < this.props.user.profile.courses[i].toResolve.length; j++) {
                  if (this.props.user.profile.courses[i].toResolve[j]._id === item.id && !this.props.user.profile.courses[i].toResolve[j].resolved) {
                    activities.push({
                      course: course.title,
                      source: unit.name,
                      courseId: course._id,
                      activityId: item.id,
                      instruction: item.attributes.instruction,
                    });
                  }
                }
              }
            }
          })
        })
      }
      this.setState({
        activities: activities,
        courses: courses,
        action: "publishAsActivity",
      })
    })
  }

  handlePublishOnSocialNetwork = () => {
    const shareUrl = `${window.origin}/story#${this.props.saved}`
    this.setState({
      shareUrl: shareUrl,
      title: this.props.language.publishOnSocialNetwork,
      action: 'publishOnSocialNetwork',
    })
  }

  handleyes = () => {
    this.setState({action: "boxpubshow"})
    this.props.handleyes();
  }

  render() {
    return(
      <React.Fragment>
        <Dialog
          open={this.props.openpublish} ///true for show
          onClose={this.props.handleClosepublish}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          {
            this.state.action === "boxpubshow" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishStory}
                </DialogTitle>
                <div className="center-row">
                  {
                    Meteor.user().profile.type === "student" ?
                      <Button
                        className="storytelling-publish-button-time"
                        color="primary"
                        onClick={() => this.handlePublishOnCourse()}
                      >
                        <p className="storytelling-publish-button-text-time">{this.props.language.publishOnACourse}</p>
                        <SchoolIcon className="storytelling-publish-icon-time"/>
                      </Button>
                    :
                    undefined
                  }
                  {
                    Meteor.user().profile.type === "student" ?
                      <Button
                        className="storytelling-publish-button-time"
                        color="primary"
                        onClick={() => this.handlePublishAsActivity()}
                      >
                        <p className="storytelling-publish-button-text-time">{this.props.language.sendAsActivity}</p>
                        <EditIcon className="storytelling-publish-icon-time"/>
                      </Button>
                    :
                      undefined
                  }
                  <Button
                    className="storytelling-publish-button-time"
                    color="primary"
                    onClick={() => this.handlePublishOnSocialNetwork()}
                  >
                    <p className="storytelling-publish-button-text-time">{this.props.language.publishOnSocialNetwork}</p>
                    <LanguageIcon className="storytelling-publish-icon-time"/>
                  </Button>
                </div>
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {this.props.language.publishStoryText}
                </DialogContentText>
              </React.Fragment> 
            :
              undefined
          }
          {
            this.state.action === "publishOnSocialNetwork" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishOnSocialNetwork}
                </DialogTitle>
                <div className="storytelling-share-btn-group-time">
                  <div className="storytelling-share-btn-time">
                    <FacebookShareButton
                      url={this.state.shareUrl}
                      quote={this.state.title}>
                      <FacebookIcon
                        size={64}
                        round />
                    </FacebookShareButton>
                  </div>
                  <div className="storytelling-share-btn-time">
                    <TwitterShareButton
                      url={this.state.shareUrl}
                      title={this.state.title}>
                      <TwitterIcon
                        size={64}
                        round />
                    </TwitterShareButton>  
                  </div>
                  <div className="storytelling-share-btn-time">
                    <LinkedinShareButton
                      url={this.state.shareUrl}
                      windowWidth={750}
                      windowHeight={600}>
                      <LinkedinIcon
                        size={64}
                        round />
                    </LinkedinShareButton>  
                  </div>
                </div>
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {
                    <Link
                      to={`/story#${this.props.saved}`}
                    >{this.state.shareUrl}</Link>
                  }
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => this.handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }
          {
            this.state.action === "publishOnCourse" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishOnCourse}
                </DialogTitle>
                {
                  this.state.courses.map(course => {
                    return(
                      <Button
                        color="primary"
                        className="storytelling-course-publish-button-time"
                        onClick={() => this.props.publishOnCourse(course._id)}
                      >
                        {`- ${course.title}`}
                      </Button>
                    )
                  })
                }
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {this.props.language.publishStoryCourseText}
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => this.handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }
          {
            this.state.action === "publishAsActivity" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.sendAsActivity}
                </DialogTitle>
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {`${this.props.language.publishStoryActivityText}:`}
                </DialogContentText>
                {
                  this.state.activities.map(activity => {
                    return(
                      <Button
                        color="primary"
                        className="storytelling-course-activity-publish-button-time"
                        onClick={() => this.completeActivity(activity.activityId, this.props.language.storySent, activity.courseId)}
                      >
                        {`${activity.course} - ${activity.source} | ${this.props.language.instructions} 
                        ${activity.instruction.length <= 50 ? activity.instruction : `${activity.instruction.slice(0,50)}...`}`}
                      </Button>
                    )
                  })
                }
                <DialogActions>
                  <Button onClick={() => this.handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }         
        </Dialog>
      </React.Fragment>
    )
  }
}