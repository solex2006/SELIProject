import React, { Component } from 'react';

import ImageItem from './items/ImageItem'
import AudioItem from './items/AudioItem'
import TextItem from './items/TextItem'
import CompressedItem from './items/CompressedItem'
import EmbebedItem from './items/EmbebedItem'
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

  showControlMessage(){

  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="course-content-container">
        {
          this.props.course.organization.subunit ?
            <div>
              <div className="course-content-breadcrumbs-container">
                <Paper elevation={0} className="course-content-breadcrumbs-paper">
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Typography onClick={() => this.props.showComponent("home")} className="course-content-breadcrumb-text">
                      Home
                    </Typography>
                    <Typography onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text">
                      Courses
                    </Typography>
                    <Typography id="course-content-breadcrumb-title" className="course-content-breadcrumb-text">
                      {this.props.course.title}
                    </Typography>
                    <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                      {`${this.props.course.organization.unit} - ${this.props.selected[1] + 1}: ${this.props.course.program[this.props.selected[1]].name}`}
                    </Typography>
                    <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                      {`${this.props.course.organization.subunit} - ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[1]].lessons[this.props.selected[0]].name}`}
                    </Typography>
                  </Breadcrumbs>
                </Paper>
              </div>
              {
                this.props.course.program[this.props.selected[1]].lessons[this.props.selected[0]].items.map((item, index) => {
                  return(
                    <div>
                      {
                        item.type === "text" ?
                          <TextItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "image" ?
                          <ImageItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "video" ?
                          <VideoItem
                            item={item}
                            openMediaPlayer={this.props.openMediaPlayer.bind(this)}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "audio" ?
                          <AudioItem
                            item={item}
                            openMediaPlayer={this.props.openMediaPlayer.bind(this)}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "link" ?
                          <LinkItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "unity" ?
                          <UnityItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "embebed" ?
                          <EmbebedItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "pdf" ?
                          <PdfItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "compressed" ?
                          <CompressedItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "h5p" ?
                          <H5PItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "quiz" ?
                          <QuizItem
                            item={item}
                            toResolve={this.props.toResolve}
                            course={this.props.course._id}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                            completeActivity={this.props.completeActivity.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        item.type === "activity" ?
                          <ActivityItem
                            item={item}
                            toResolve={this.props.toResolve}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                            completeActivity={this.props.completeActivity.bind(this)}
                          />
                        :
                        undefined
                      }
                    </div>
                  )
                })
              }
              <div className="course-content-footer-actions">
                <p className="course-content-footer-text"></p>
                <Button variant="contained" className="course-content-footer-button">
                  {`Complete ${this.props.course.organization.subunit}`}
                </Button>
              </div>
            </div>
          :
          <div>
            <div className="course-content-breadcrumbs-container">
              <Paper elevation={0} className="course-content-breadcrumbs-paper">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Typography onClick={() => this.props.showComponent("home")} className="course-content-breadcrumb-text">
                    Home
                  </Typography>
                  <Typography onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text">
                    Courses
                  </Typography>
                  <Typography id="course-content-breadcrumb-title" className="course-content-breadcrumb-text">
                    {this.props.course.title}
                  </Typography>
                  <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                    {`${this.props.course.organization.unit} - ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[0]].name}`}
                  </Typography>
                </Breadcrumbs>
              </Paper>
            </div>
            {
              this.props.course.program[this.props.selected[0]].items.map((item, index) => {
                return(
                  <div>
                    {
                      item.type === "text" ?
                        <TextItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "image" ?
                        <ImageItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "video" ?
                        <VideoItem
                          item={item}
                          openMediaPlayer={this.props.openMediaPlayer.bind(this)}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "audio" ?
                        <AudioItem
                          item={item}
                          openMediaPlayer={this.props.openMediaPlayer.bind(this)}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "link" ?
                        <LinkItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "unity" ?
                        <UnityItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "embebed" ?
                        <EmbebedItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "pdf" ?
                        <PdfItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "compressed" ?
                        <CompressedItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "h5p" ?
                        <H5PItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "quiz" ?
                        <QuizItem
                          item={item}
                          toResolve={this.props.toResolve}
                          course={this.props.course._id}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                          completeActivity={this.props.completeActivity.bind(this)}
                        />
                      :
                      undefined
                    }
                    {
                      item.type === "activity" ?
                        <ActivityItem
                          item={item}
                          toResolve={this.props.toResolve}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                          completeActivity={this.props.completeActivity.bind(this)}
                        />
                      :
                      undefined
                    }
                  </div>
                )
              })
            }
            <div className="course-content-footer-actions">
              {
                this.props.toComplete[this.props.selected[0]] ?
                  <Button
                    className="course-content-footer-button-small"
                    color="primary"
                    variant="outlined"
                    onClick={() => this.props.leaveComment()}
                  >
                    Leave a comment
                  </Button>
                :
                undefined
              }
              <div className="course-content-footer-row">
                <Tooltip title={`Previous ${this.props.course.organization.unit}`}>
                  <Fab
                    disabled={this.props.selected[0] === 0}
                    size="small"
                    className="course-content-footer-fab"
                    onClick={() => this.props.handlePreviousUnit()}
                  >
                    <NavigateBeforeIcon/>
                  </Fab>
                </Tooltip>
                <Tooltip title={`Next ${this.props.course.organization.unit}`}>
                  <Fab
                    disabled={this.props.selected[0] === this.props.course.program.length - 1}
                    size="small"
                    className="course-content-footer-fab"
                    onClick={() => this.props.handleNextUnit()}
                  >
                    <NavigateNextIcon/>
                  </Fab>
                </Tooltip>
              </div>
              <Button
                disabled={this.props.toComplete[this.props.selected[0]]}
                onClick={() => this.props.completeUnit(this.props.selected[0])}
                variant="contained"
                className="course-content-footer-button"
              >
                {
                  this.props.toComplete[this.props.selected[0]] ?
                  `${this.props.course.organization.unit} completed` :
                  `Complete ${this.props.course.organization.unit}`
                }
              </Button>
              {
                this.props.toComplete[this.props.selected[0]] ?
                  <CheckCircleIcon className="success-dialog-icon-small"/>
                :
                undefined
              }
            </div>
          </div>
        }
      </div>
    )
  }
}
