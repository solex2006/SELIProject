import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../components/tools/Loading';
import { Stories } from '../../../lib/StoryCollection';
import Table from '../data_display/Table';

import StudentProfile from './StudentProfile';
import CourseMenu from '../student/CourseMenu';
import CourseContent from '../student/CourseContent';

import SchoolIcon from '@material-ui/icons/School';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import TabIcon from '@material-ui/icons/Tab';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';
import DenseTable from './DenseTable';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BookIcon from '@material-ui/icons/Book';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { StudentEventLog } from '../../../lib/StudentEventCollection';

export default class PublishedStoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStories: [],
      storyProfiles: [],
      studentInformation: '',
      studentScores: [],
      story: [],
      indexquiz:'',
      valuesofScores:[]
    }
  }

  componentDidMount() {
    this.getMyStories(this.props.user);
    
  }

  getMyStories = (user) => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let myStories = Stories.find({createdBy: user, published: true}).fetch();
        this.setState({
          myStories: myStories,
        }, () => {
          let results = true;
          if (this.state.myStories.length) {
            this.createTableData(this.state.myStories);
          }
          else {
            results = false;
          }
          this.setState({
            loading: false,
            results: results,
          })
        });
      });
    });
  }

  preview = (_id) => {
    this.handleClickOpen();
    this.setState({
      story_id: _id,
      dialogConfirmationTitle: this.props.language.storyPreview,
      dialogConfirmationContentText: this.props.language.willBeRedirected
    })
  }

  unpublish = (_id) => {
    Stories.update(
      { _id: this.state.storyToUnpublish },
      { $set:
        {
          published: false,
        }
      }
    );
    this.handleClose();
    this.props.handleControlMessage(true, this.props.language.storyUnpublished, true, 'savedList', this.props.language.seeList);
  }

  createTableData = (myStories) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: this.props.language.title },
      { id: 'template', numeric: true, disablePadding: false, label: this.props.language.template },
      { id: 'organization', numeric: true, disablePadding: false, label: this.props.language.storyOrganization },
      { id: 'duration', numeric: true, disablePadding: false, label: this.props.language.duration },
      { id: 'creationDate', numeric: true, disablePadding: false, label: this.props.language.creationDate },
      { id: 'actions', numeric: true, disablePadding: false, label: this.props.language.actions },
    ];
    let menuOptions = [
      {label: this.props.language.storyPreview , icon: <TabIcon/>, action: this.preview.bind(this)},
      {label: this.props.language.classroomManagement , icon: <GroupIcon/>, action: this.openClassroomManagement.bind(this)},
      {label: this.props.language.unpublishStory , icon: <UnarchiveIcon/>, action: this.showUnpublishConfirmation.bind(this)},
    ];
    myStories.map(story => {
      tableData.push({
        title: story.title,
        template: story.storyPlan ?
            story.storyPlan.storyTemplate === "without" ? this.props.language.Withouttemplate :
            story.storyPlan.storyTemplate === "spiral" ? this.props.language.SpiralModel :
            story.storyPlan.storyTemplate === "consistent" ? this.props.language.Consistent :
            this.props.language.ToyBox
        : "",
        organization: story.storyPlan ? story.storyPlan.storyStructure === "unit" ? this.props.language.byUnitsAndLessons : this.props.language.byTopics : "", 
        duration: story.duration,
        creationDate: story.creationDate.toLocaleDateString('en-US'),
        _id: story._id})
    })
    this.setState({
      headRows: headRows,
      menuOptions: menuOptions,
      tableData: tableData,
    }, () => {
      this.setState({
        loading: false,
      })
    });
  }

  showUnpublishConfirmation = (_id) => {
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: this.props.language.unpublishStory,
      dialogConfirmationContentText: this.props.language.areYouSureUnpublishStory,
      storyToUnpublish: _id,
      confirmAction: () => this.unpublish(),
    });
  }

  openClassroomManagement = (_id) => {
    let stories = this.state.myStories;
    let story = stories.find(story => story._id === _id);
    let classroom = story.classroom;
    let results = true;
    if (classroom.length) {
      this.setState({
        loadingProfiles: true,
      });
      let storyProfiles = [];
      classroom.map(student => {
        Tracker.autorun(() => {
          Meteor.call("GetUserById", student, (error, response) =>  {
              if (response) {
                let storyProfile = response.profile.stories.find(story => story.storyId === _id);
                storyProfiles.push({
                  studentId: student,
                  storyProfile: storyProfile,
                  studentInformation: {
                    fullname: response.profile.fullname,
                    username: response.username,
                    email: response.emails[0].address,
                    dateJoined: response.createdAt,
                  }
                });
              }
              if (storyProfiles.length === classroom.length) {
                this.setState({
                  loadingProfiles: false,
                  storyProfiles: storyProfiles,
                });
              }
          });
        });
      });
    }
    else {
      results = false;
    }
    let summaryStory = {};
    summaryStory.title = story.title;
    summaryStory.description = story.description;
    summaryStory.createdBy = story.createdBy;
    summaryStory.duration = story.duration;
    this.setState({
      openClassroom: true,
      studentInformation: '',
      studentScores: [],
      story,
      summaryStory,
      classroomResults: results,
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseClassroom = () => {
    this.setState({ openClassroom: false });
  };

  handleView= (profile, event, studentScores, index)=>{
    this.average()
    if (event === "story") {
      this.props.navigateTo([0, 0, 0, 0]);
      this.setState({
        student: profile,
      })
    }
    if (event === "quiz") {
      this.setState({
        studentScores,
      })
    }
    if (event === "quizDetails") {
      this.setState({
        indexquiz: index,
      })
    }
    this.setState({
      studentInformation: event,
    })
  }

  quizes= ()=>{
    return(
      <React.Fragment>
        <div className="library-files-containerquiz">
          {this.state.studentScores.map((quiz, index) => (
          <div>
            <div className="studentTable">
              <h3>{quiz.activity.trueAnswers[0].quizTitle}</h3>
            </div>
            <DenseTable 
              quiz={quiz}
              language={this.props.language}
            />
            <Button
                className="student-profile-button"
                color="primary"
                variant="outlined"
                onClick={() => this.handleView("", "quizDetails", "", index)}
            >
                {this.props.language.quizdetails}
            </Button>
          </div>   
        ))} 
        </div>
      </React.Fragment> 
    )
  
  }


  insertAt=(array, index, elementsArray)=> {
    return array.splice(index, 0, elementsArray);
  }

  average=()=>{
    let scores=this.state.studentScores 
    let dupes = {};
    scores.forEach((item,index) => {
      dupes[item.activity.activityId] = dupes[item.activity.activityId] || [];
      dupes[item.activity.activityId].push(index);
    });  
    let valuesofScores=[]
    
    for(let name in dupes){
      //average
      let average=0;
      let max=0;
      let min=0;
      let times=0
      let maximum=[]

      if(dupes[name].length>1){  
        dupes[name].map((repeat,index)=>{
          average=scores[repeat].activity.score+average
          maximum.push(scores[repeat].activity.score)
        })
        max=Math.max.apply(Math, maximum)
        min= Math.min.apply(Math, maximum)
        times=dupes[name].length
        average=(average/times)
        let total=[max, min, average, times]
        dupes[name].map((repeat,index)=>{
          this.insertAt(valuesofScores, repeat, total );
        })
      }else {
        dupes[name].map((repeat,index)=>{
          average=scores[repeat].activity.score
          max=scores[repeat].activity.score
          min=scores[repeat].activity.score
          times=1
          average=max
          let total=[max, min, average, times]
          this.insertAt(valuesofScores, repeat, total );
        })
      }   
    } //console.log(name+'->indexes->'+dupes[name]+'->count->'+dupes[name].length)
    console.log("total", valuesofScores)
    this.setState({
      valuesofScores:valuesofScores,
    })
  }

  quizDetails=()=>{
    console.log(this.state.story, "story...", this.state.studentScores, "indexquiz", this.state.indexquiz)
    return(
      <Paper elevation={8} className="quiz-dashboard-questions-containerTutor">
        <p className="question-dashboard-label-text">{this.props.language.QuizViewTool}</p>
        <div className="question-dashboard-container">
          <FormControl component="fieldset" className="question-dashboard-form-controlx">
           {/*  <FormLabel component="legend" className="question-dashboard-form-label">{this.state.studentScores[this.state.indexquiz].activity.trueAnswers[0].quizTitle}</FormLabel>  */}
            <RadioGroup
              aria-label="answer"
              name="answer"
              className="question-dashboard-radio-group"
            >
            <div>
              <div  className="answers">{this.props.language.Questions}<BookIcon/></div>
              <div className="student-answers">
              {
                this.state.studentScores[this.state.indexquiz].activity.trueAnswers.map((question, indexQuestion) =>{
                  return(
                    <div>
                      <div className="answers">{this.props.language.Question}: {question.questionTitle}</div>
                      {
                          question.answersText.map((answersText, indexanswersText) =>{
                            return(
                              <div className="student-answers-block-q">
                                <ul>{answersText}</ul>
                              </div>
                            )
                          }) 
                      } 
                    </div>       
                  )   
                })
              }
            </div>
            </div>
            <div>
              <div className="answers">{this.props.language.StudentAnswers}<CreateRoundedIcon/></div>
              <div className="student-answers">
                  {
                    this.state.studentScores[this.state.indexquiz].activity.answers.map((answers, indexanswers) =>{
                            return(
                              <div >
                                <div className="answers" >{this.props.language.Answers}</div>
                                {answers.map((answer) =>{
                                  if(answer===true){answer=<div>{this.props.language.Correct}<DoneRoundedIcon/></div>} else{answer=<div>{this.props.language.Incorrect}<ClearRoundedIcon/></div>}
                                  return(
                                    <div className="student-answers-block">
                                      <ul>{answer}</ul>
                                    </div>
                                  )
                                })}
                              </div>
                            )
                          
                          }
                    )
                  }
              </div>
            </div>
            <div>
              <div className="answers">{this.props.language.correctAnswers}<SpellcheckRoundedIcon/></div>
              <div className="student-answers">  
                {
                  this.state.studentScores[this.state.indexquiz].activity.trueAnswers.map((question, indexQuestion) =>{
                    return(
                      <div>
                        <div className="answers">{this.props.language.Answers}</div>
                        {
                            question.answersText.map((answersText, indexanswersText) =>{
                              return(
                                <div className="student-answers-block">
                                  {
                                    question.correctAnswers[indexanswersText]===true ?
                                    <div>{this.props.language.Correct}<DoneRoundedIcon/></div>
                                    :
                                    <div>{this.props.language.Incorrect}<ClearRoundedIcon/></div>
                                  }
                                </div>
                              )
                            }) 
                        } 
                      </div>      
                    )   
                  })
                }
              </div>
            </div>
            <div >
              <div className="answers-scores">Scores<SpellcheckRoundedIcon/></div>
              <div className="student-scores-results">  
              <div className="note"><h5>   {this.props.language.AverageGrade} </h5> <p>{this.state.valuesofScores[this.state.indexquiz][2]}</p></div>
                <div className="note"><h5>{this.props.language.Maximumgrade}</h5> <p>{this.state.valuesofScores[this.state.indexquiz][0]}</p><SentimentVerySatisfiedIcon/> </div>
                <div className="note"><h5>{this.props.language.Minimumgrade}</h5> <p>{this.state.valuesofScores[this.state.indexquiz][1]}</p><MoodBadIcon/> </div>
                <div className="note"><h5>{this.props.language.NumberofAttemps}</h5><p>{this.state.valuesofScores[this.state.indexquiz][3]}</p><FormatListNumberedIcon/> </div> 
                  <div className="note"><h5>{this.props.language.NumberofAttemps}</h5><p>{this.state.valuesofScores[this.state.indexquiz][3]}</p><FormatListNumberedIcon/> </div> 
                <div className="note"><h5>{this.props.language.NumberofAttemps}</h5><p>{this.state.valuesofScores[this.state.indexquiz][3]}</p><FormatListNumberedIcon/> </div> 
              </div>
            </div>
            </RadioGroup>
          </FormControl>
        </div>
      </Paper>
    )
  }

  menu = () => {
    return(
      <Paper elevation={0} className="story-content-breadcrumbs-paper-quiz">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          { this.state.studentInformation !== "" ?
              <Typography onClick={() => this.handleView({}, "")} className="story-content-breadcrumb-text">
                {this.state.story.title}
              </Typography> : undefined }
          { this.state.studentInformation === "story" ?
              <Typography id="story-content-breadcrumb-actual" className="story-content-breadcrumb-text">
                {this.state.student.studentInformation.fullname}
              </Typography> : undefined }
          { this.state.studentInformation === "story" &&
              <Typography onClick={() => this.props.navigateTo([this.props.selected[0], 0, 0, 0])} id="story-content-breadcrumb-unitTopic" className="story-content-breadcrumb-text">
                {`${this.state.story.storyPlan.storyStructure === "unit" ? 
                this.props.language.unit : this.props.language.topic
                } ${this.props.selected[0] + 1}: ${this.state.story.program[this.props.selected[0]].name}`}
              </Typography>}
          { this.state.studentInformation === "story" && this.state.story.storyPlan.storyStructure === "unit" && this.props.selected[3] > 0 &&
              <Typography onClick={() => this.props.navigateTo([this.props.selected[0], this.props.selected[1], 0, 1])} id="story-content-breadcrumb-lesson" className="story-content-breadcrumb-text">
                {`${this.props.language.lesson} ${this.props.selected[1] + 1}: ${this.state.story.program[this.props.selected[0]].lessons[this.props.selected[1]].name}`}
              </Typography>}
          { this.state.studentInformation === "story" && this.state.story.storyPlan.storyStructure !== "without" && this.props.selected[3] > 1 &&
              <Typography id="story-content-breadcrumb-task" className="story-content-breadcrumb-text">
                { this.state.story.storyPlan.storyStructure === "unit" ? 
                  `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.state.story.program[this.props.selected[0]].lessons[this.props.selected[1]].activities[this.props.selected[2]].name}` :
                  `${this.props.language.task} ${this.props.selected[2] + 1}: ${this.state.story.program[this.props.selected[0]].activities[this.props.selected[2]].name}`}
              </Typography>}
          { this.state.studentInformation === "quiz" || this.state.studentInformation === "quizDetails" ?
              <Typography onClick={() => this.handleView({}, "quiz", this.state.studentScores)} className="story-content-breadcrumb-text">
                {this.props.language.quiz}
              </Typography> : undefined }
          { this.state.studentInformation === "quizDetails" ?
              <Typography id="story-content-breadcrumb-title" className="story-content-breadcrumb-text">
                quiz details *
              </Typography> : undefined }
        </Breadcrumbs>
      </Paper>
    )
  }

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-story-container">
              <Loading message="Loading my storys..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title-published">{this.props.language.myPublishedStories}<SchoolIcon className="management-title-icon"/></p>
                  <p className="management-title-suggestion">{`(${this.props.language.toEditPublished})`}</p>
                  <p className="management-title-suggestion-indent"></p>
                  <div className="management-table-container">
                    <Table
                      labels={{
                        title: this.props.language.youHaveStories, 
                        pagination: this.props.language.storyPerPage,
                        filterList: this.props.language.filterList,
                        refresh: this.props.language.refresh,
                        delete: this.props.language.delete,
                        selected: this.props.language.selected,
                        nextPage: this.props.language.nextPage,
                        previousPage: this.props.language.previousPage,
                        options: this.props.language.options,
                        of: this.props.language.of,
                      }}
                      headRows={this.state.headRows}
                      menuOptions={this.state.menuOptions}
                      tableData={this.state.tableData}
                      delete={false}
                    />
                  </div>
                </div>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">{this.props.language.noStoryPublished}</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                <Button onClick={() => this.props.showComponent('create')} variant="contained" color="secondary" className="empty-dashboard-button">{this.props.language.createStory}</Button>
              </div>
            }
          </React.Fragment>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.dialogConfirmationTitle}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogConfirmationContentText}
            </DialogContentText>
            {
              this.state.dialogConfirmationTitle === this.props.language.unpublishStory ?
                <WarningIcon className="warning-dialog-icon"/>
              :
                <InfoIcon className="warning-dialog-icon"/>   
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            {
              this.state.dialogConfirmationTitle === this.props.language.unpublishStory ?
                <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
               {this.props.language.confirm}
                </Button>
              :
                <Link className="button-link"
                  target="_blank"
                  to={{
                    pathname: "/storyPreview",
                    hash: this.state.story_id,
                    state: { fromDashboard: true },
                  }}
                >
                  <Button color="primary" autoFocus>
                    {this.props.language.yes}
                  </Button>
                </Link>
            }
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openClassroom}
          onClose={this.handleCloseClassroom}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <AppBar position="static" className="story-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseClassroom} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="story-dialog-title" variant="h6">
                {this.props.language.classroomManagement}
              </Typography>
              <p className="app-tooltip">{this.props.language.pressEsc}</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="classroom-dialog-content">
            {
              this.state.classroomResults ?
                <React.Fragment>
                  {
                    this.state.loadingProfiles ?
                      <div className="loading-story-container">
                        <Loading message={this.props.language.loadingStudents}/>
                      </div>
                    :
                      <React.Fragment>
                        {this.menu()}
                        <div className="classroom-management-students-container">
                          {
                            this.state.studentInformation===''?
                              <div>
                                <DialogContentText className="classroom-dialog-title" id="alert-dialog-description">
                                {this.props.language.studentsClassroom}
                                </DialogContentText>
                                <div className="library-files-container-student">
                                  {this.state.storyProfiles.map((profile, index) => {
                                    if (profile.storyProfile)
                                    return(
                                      <StudentProfile
                                        profile={profile}
                                        story={this.state.summarystory}
                                        handleControlMessage={this.props.handleControlMessage.bind(this)}
                                        unsubscribe={this.props.unsubscribe.bind(this)}
                                        handleView={this.handleView}
                                        reload={this.openClassroomManagement.bind(this)}
                                        language={this.props.language}
                                      />
                                    )
                                  })}
                                </div>
                              </div>
                            :
                              undefined
                          }
                          {
                            this.state.studentInformation==='quiz'?
                              this.state.studentScores.length === 0 ?
                                <div className="empty-dashboard-quiz">
                                  <p className="empty-dashboard-text">{this.props.language.storyNotHaveQuizes}</p>
                                  <InfoIcon className="empty-dashboard-icon"/>
                                </div>
                              :
                                this.quizes()
                            :
                              undefined
                          }
                          {
                            this.state.studentInformation==='quizDetails'?
                              this.quizDetails()
                            :
                              undefined
                          }
                          {
                            this.state.studentInformation==='story'?
                              <div>
                                <StoryMenu
                                  story={this.state.story}
                                  progress={this.state.student.storyProfile.progress}
                                  navigateTo={this.props.navigateTo.bind(this)}
                                  selected={this.props.selected}
                                  expandedNodes={this.props.expandedNodes}
                                  handleView={this.handleView.bind(this)}
                                  language={this.props.language}
                                />
                                <StoryContent
                                  fromTutor={this.state.student.studentId}
                                  story={this.state.story}
                                  showComponent={this.props.showComponent.bind(this)}
                                  handleControlMessage={this.props.handleControlMessage.bind(this)}
                                  handlePrevious={this.props.handlePrevious.bind(this)}
                                  handleNext={this.props.handleNext.bind(this)}
                                  navigateTo={this.props.navigateTo.bind(this)}
                                  selected={this.props.selected}
                                  toComplete={this.state.student.storyProfile.toComplete}
                                  toResolve={this.state.student.storyProfile.toResolve}
                                  language={this.props.language}
                                  logStudentInteraction={this.logStudentInteraction.bind(this)}
                                />
                              </div>
                            :
                              undefined
                          }
                        </div>
                      </React.Fragment>
                  }
                </React.Fragment>
              :
              <div className="empty-dashboard">
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">{this.props.language.donotHaveStudents}</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
