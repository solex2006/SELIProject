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
                {
                  this.props.fromTutor ? undefined :
                    <Paper elevation={0} className="course-content-breadcrumbs-paper">
                      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Typography onClick={() => this.props.showComponent("home")} className="course-content-breadcrumb-text">
                          {this.props.language.home}
                        </Typography>
                        <Typography onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text">
                          {this.props.language.courses}
                        </Typography>
                        <Typography id="course-content-breadcrumb-title" className="course-content-breadcrumb-text">
                          {this.props.course.title}
                        </Typography>
                        <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                          {`${this.props.language.unit} ${this.props.selected[1] + 1}: ${this.props.course.program[this.props.selected[1]].name}`}
                        </Typography>
                        <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                          {`${this.props.language.lesson} ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[1]].lessons[this.props.selected[0]].name}`}
                        </Typography>
                      </Breadcrumbs>
                    </Paper>
                }
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
                            key={Math.random()}
                            language={this.props.language}
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
                        item.type === "embebed" ?
                          <EmbebedItem
                            item={item}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                            loadingEmbebed={this.props.language.loadingEmbebed}
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
                {
                  !this.props.fromTutor &&  this.props.toComplete[this.props.selected[1]].subunits[this.props.selected[0]] ?
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
                <div className="course-content-footer-row">
                  <Tooltip title={this.props.language.previousLesson}>
                    <Fab
                      disabled={this.props.selected[0] === 0 && this.props.selected[1] === 0}
                      size="small"
                      className="course-content-footer-fab"
                      onClick={() => this.props.handlePreviousSubunit()}
                    >
                      <NavigateBeforeIcon/>
                    </Fab>
                  </Tooltip>
                  <Tooltip title={this.props.language.nextLesson}>
                    <Fab
                      disabled={this.props.selected[1] === this.props.course.program.length - 1 && this.props.course.program[this.props.selected[1]].lessons.length - 1 === this.props.selected[0]}
                      size="small"
                      className="course-content-footer-fab"
                      onClick={() => this.props.handleNextSubunit()}
                    >
                      <NavigateNextIcon/>
                    </Fab>
                  </Tooltip>
                </div>
                {this.props.fromTutor ? undefined : 
                <Button
                  disabled={this.props.toComplete[this.props.selected[1]].subunits[this.props.selected[0]]}
                  onClick={() => this.props.completeSubunit(this.props.selected[1], this.props.selected[0])}
                  variant="contained"
                  className="course-content-footer-button"
                >
                  {
                    this.props.toComplete[this.props.selected[1]].subunits[this.props.selected[0]] ?
                    `${this.props.language[this.props.course.organization.subunit.toLowerCase()]} ${this.props.language.completed}` :
                    `${this.props.language.complete} ${this.props.language[this.props.course.organization.subunit.toLowerCase()]}`
                  }
                </Button>}
                {
                  this.props.toComplete[this.props.selected[1]].subunits[this.props.selected[0]] ?
                    <CheckCircleIcon className="success-dialog-icon-small"/>
                  :
                  undefined
                }
              </div>
            </div>
          :
          <div>
            <div className="course-content-breadcrumbs-container">
              {
                this.props.fromTutor ? undefined :
                  <Paper elevation={0} className="course-content-breadcrumbs-paper">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                      <Typography onClick={() => this.props.showComponent("home")} className="course-content-breadcrumb-text">
                        {this.props.language.home}
                      </Typography>
                      <Typography onClick={() => this.props.showComponent("subscribed")} className="course-content-breadcrumb-text">
                        {this.props.language.courses}
                      </Typography>
                      <Typography id="course-content-breadcrumb-title" className="course-content-breadcrumb-text">
                        {this.props.course.title}
                      </Typography>
                      <Typography id="course-content-breadcrumb-actual" className="course-content-breadcrumb-text">
                        {`${this.props.language.topic} ${this.props.selected[0] + 1}: ${this.props.course.program[this.props.selected[0]].name}`}
                      </Typography>
                    </Breadcrumbs>
                  </Paper>
              }
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
                      item.type === "embebed" ?
                        <EmbebedItem
                          item={item}
                          handleControlMessage={this.props.handleControlMessage.bind(this)}
                          loadingEmbebed={this.props.language.loadingEmbebed}
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
              {
                this.props.toComplete[this.props.selected[0]] && !this.props.fromTutor ?
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
              <div className="course-content-footer-row">
                <Tooltip title={this.props.language.previousTopic}>
                  <Fab
                    disabled={this.props.selected[0] === 0}
                    size="small"
                    className="course-content-footer-fab"
                    onClick={() => this.props.handlePreviousUnit()}
                  >
                    <NavigateBeforeIcon/>
                  </Fab>
                </Tooltip>
                <Tooltip title={this.props.language.nextTopic}>
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
              {this.props.fromTutor ? undefined : <Button
                disabled={this.props.toComplete[this.props.selected[0]]}
                onClick={() => this.props.completeUnit(this.props.selected[0])}
                variant="contained"
                className="course-content-footer-button"
              >
                {
                  this.props.toComplete[this.props.selected[0]] ?
                  `${this.props.language[this.props.course.organization.unit.toLowerCase()]} ${this.props.language.completed}` :
                  `${this.props.language.complete} ${this.props.language[this.props.course.organization.unit.toLowerCase()]}`
                }
              </Button>}
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
