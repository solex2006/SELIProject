import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import Popover from '@material-ui/core/Popover';
import { Courses } from '../../../lib/CourseCollection';
import { Activities } from '../../../lib/ActivitiesCollection';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

//Dialogs
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';

var key = Meteor.settings.public.BLOCKCHAIN_USERKEY;
var encryptor = require('simple-encryptor')(key);

export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentScores:'', 
      course: '',
      showQuizDetails:'',
      index: '',
      expanded: false,
      certificateCreated: false,
      certificateError: false,
      certificateDialogOpen: false,
      certificateErrorDialogOpen: false,
    }
  }

  getAvatarColor = (code) => {
    if (code >= 65 && code <= 67) {
      return "#f44336"
    }
    if (code >= 68 && code <= 70) {
      return "#e91e63"
    }
    if (code >= 71 && code <= 73) {
      return "#673ab7"
    }
    if (code >= 74 && code <= 76) {
      return "#3f51b5"
    }
    if (code >= 78 && code <= 80) {
      return "#2196f3"
    }
    if (code >= 81 && code <= 83) {
      return "#009688"
    }
    if (code >= 84 && code <= 86) {
      return "#009688"
    }
    if (code >= 87 && code <= 89) {
      return "#4caf50"
    }
    if (code >= 90 && code <= 92) {
      return "#ffc107"
    }
    else {
      return "#ff9800";
    }
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      showQuizes:'NoshowQuizes',
      showStudents:'showStudents'
      
    })
  }

  handleClick = (type) => {
    this.setState({
      anchorEl: true,
      action: type,
    })
  }

  componentDidMount() {
    let course = Courses.find({_id: this.props.profile.courseProfile.courseId}).fetch();
    console.log("CourseInformation", course) 
    let studentScores = Activities.find({
      "activity.user": this.props.profile.studentId, 
      "activity.course": this.props.profile.courseProfile.courseId,
      "activity.type": "quiz"
    }).fetch();
    //studentScores.map((quiz,index)=>{
    this.setState({
      studentScores: studentScores,
      course: course
    })
    //})
    console.log("studentScores", studentScores) 
    //console.log("wwwwwww", this.props.profile.studentId, this.props.profile.courseProfile.courseId)
      this.setState({
        color: this.getAvatarColor(this.props.profile.studentInformation.username.toUpperCase().charCodeAt(0)),
      })
  }

  handleUnsubscription = () => {
    let course = Courses.find({_id: this.props.profile.courseProfile.courseId}).fetch();
    course = course[0];
    let studentIndex = course.classroom.findIndex(students => students === this.props.profile.studentId);
    course.classroom.splice(studentIndex, 1);
    Courses.update(
      { _id: course._id },
      { $set: {
        classroom: course.classroom,
      }}
      , () => {
        var user = Meteor.users.findOne({_id: this.props.profile.studentId});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === this.props.profile.courseProfile.courseId);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.call("UpdateCourses", this.props.profile.studentId, user.profile.courses, (error, response) =>  {
            if (response) {
              this.props.handleControlMessage(true, this.props.language.studendRemoved);
              this.handleClose();
              this.props.reload(this.props.profile.courseProfile.courseId);
            }
        });
      }
    )
  }

  handleChangePanel = () => {
    {
      this.setState({
        expanded: !this.state.expanded,
      })
    }
  }

  ////NEW
  createCertificate(){
    let idStudent = this.props.profile.studentId;
    let student = this.props.profile.studentInformation.fullname;
    let tutor = this.props.course.createdBy;
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let course = this.props.course.title;
    let description = this.props.course.description;
    let duration = this.props.course.duration;

    let registerDataSinCode={ //useful for regsiter users in blockchain network
      email: this.props.profile.studentInformation.email,
      displayName: this.props.profile.studentInformation.fullname,
      password: this.props.profile.studentId 
    }

    var registerData = {data: encryptor.encrypt(registerDataSinCode)};
    // Should print gibberish:
    //console.log('obj encrypted:', registerData);

  

    let certificateInfo = {
      idStudent: idStudent,
      name: student,
      tutor: tutor,
      date: date,
      course: course,
      description: description,
      duration: duration,
    };
    this.sendCertificate(certificateInfo,registerData);
  }

  sendCertificate(certificateInfo, registerData){
    let TokenUser=Meteor.users.find({_id : this.props.profile.studentId  }).fetch()[0].profile.token;
   
    if(TokenUser===undefined){//register the token
      fetch(`${Meteor.settings.public.BLOCKCHAIN_DOMAIN}/login/user`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
      }).then(res => res.json()).then(res => {
        console.log("Respuesta del registro o token: ",res);
        Meteor.users.update(
          {_id : res.idStudent },
          { $push : 
          { "profile.token" : res.token }}
        );
        fetch(`${Meteor.settings.public.BLOCKCHAIN_DOMAIN}/datos`, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.token}`
          },
          body: JSON.stringify(certificateInfo)
            }).then(res => res.json())
            .then(res => {
              console.log("response",res);
              if(res === "se genero el certificado con exito en 201.159.223.92"){
                this.setState({
                  certificateCreated: true,
                  certificateError: false,
                  certificateDialogOpen: true,
                });
              }else{
                this.setState({
                  certificateCreated: false,
                  certificateError: true,
                  certificateErrorDialogOpen: true,
                });
              }
            });

      })
    }else{
      console.log("ya no regsitra de nuevo la usuiario")
      fetch(`${Meteor.settings.public.BLOCKCHAIN_DOMAIN}/datos`, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TokenUser}`
          },
          body: JSON.stringify(certificateInfo)
            }).then(res => res.json())
            .then(res => {
              console.log("response",res);
              if(res === "se genero el certificado con exito en 201.159.223.92"){
                this.setState({
                  certificateCreated: true,
                  certificateError: false,
                  certificateDialogOpen: true,
                });
              }else{
                this.setState({
                  certificateCreated: false,
                  certificateError: true,
                  certificateErrorDialogOpen: true,
                });
              }
          });
    }
  }

  handleCloseCertificate = () => {
    this.setState({
      certificateDialogOpen: false,
      certificateErrorDialogOpen: false,
    });
  };

  render() {
    console.log(this.props)
    return(
      <div className="student">
        <div className="student-profile-container">
          <Paper
            className="student-profile-information-container"
            elevation={4}
          >
            <div>
              <p className="student-profile-information-text-primary">
                {this.props.profile.studentInformation.username}
              </p>
              <p className="student-profile-information-text-secondary">
                {`${this.props.language.joinedSeli}: ${this.props.profile.studentInformation.dateJoined.toLocaleDateString('en-US')}`}
              </p>
              <p className="student-profile-information-text-secondary">
                {`${this.props.language.studentName}: ${this.props.profile.studentInformation.fullname}`}
              </p>
              <p className="student-profile-information-text-secondary">
                {`${this.props.language.email}: ${this.props.profile.studentInformation.email}`}
              </p>
              <p className="student-profile-information-text-secondary">
                {`${this.props.language.progress}: ${this.props.profile.courseProfile.progress}%`}
              </p>
            </div>
            <div className="student-profile-actions-container">
              <Button
                className="student-profile-button"
                color="primary"
                variant="outlined"
                onClick={() => this.props.handleView(this.props.profile, "course")}
              >
                {this.props.language.seeCourse}
              </Button>
              <Button
                className="student-profile-button"
                color="primary"
                variant="outlined"
                onClick={() => this.props.handleView({}, "quiz", this.state.studentScores)}
              >
                {this.props.language.SeeScore}
              </Button>
            </div>
            <div onClick={() => this.handleChangePanel()} className="student-profile-actions-container">
              {
                this.state.expanded ?
                  <KeyboardArrowLeftIcon />
                :
                  <KeyboardArrowRightIcon />
              }
            </div>
            {
              this.state.expanded ?
                <div className="student-profile-actions-container">
                  {/* <Button
                    className="student-profile-button"
                    color="primary"
                    variant="outlined"
                  >
                    {this.props.language.sendMessage}
                  </Button> */}
                  {console.log("datos----------",Meteor.userId(),this.props.profile.studentId)}
                  <Button
                    className="student-profile-button"
                    color="primary"
                    variant="outlined"
                    onClick={() => this.handleClick("certificate")}
                    disabled={this.props.profile.courseProfile.progress < 99.99 || Meteor.userId()===this.props.profile.studentId  }
                  >
                    {this.props.language.generateCertificate}
                  </Button>
                  <Button
                    className="student-profile-button"
                    color="primary"
                    variant="outlined"
                    onClick={() => this.handleClick("subscription")}
                  >
                    {this.props.language.cancelSubscription}
                  </Button>
                  <Popover
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <div className="confirmation-popover-container">
                      <p>{
                        this.state.action === "subscription" ? 
                          this.props.language.cancelSubscriptionStudent
                        :
                          this.props.language.areSureCertificate
                      }</p>
                      <div>
                        <Button
                          className="student-confirmation-button"
                          onClick={this.state.action === "subscription" ? () => this.handleUnsubscription() : () => this.createCertificate()}
                          variant="contained" color="primary"
                        >
                          {this.props.language.yes}
                        </Button>
                        <Button
                          className="student-confirmation-button"
                          onClick={() => this.handleClose()}
                          variant="contained"
                          color="secondary"
                        >
                          {this.props.language.no}
                        </Button>
                      </div>
                    </div>
                  </Popover>
                </div>
              :
                undefined
            }
          </Paper>
        </div>
        <div className="student-profile-container">
          <Avatar
            style={{backgroundColor: this.state.color}}
            className="student-profile-avatar"
          >
            {this.props.profile.studentInformation.username.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        {
          this.state.certificateCreated ?
              <Dialog
                open={this.state.certificateDialogOpen}
                onClose={this.handleCloseCertificate}
                aria-labelledby="alert-dialog-confirmation"
                aria-describedby="alert-dialog-confirmation"
              >
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.certificateGenerated}</DialogTitle>
                <DialogContent className="success-dialog-content">
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {this.props.language.pleaseGoCertificates}
                  </DialogContentText>
                  <DoneIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleCloseCertificate()} color="primary" autoFocus>
                  {this.props.language.close}
                  </Button>
                </DialogActions>
              </Dialog>
          :
          this.state.certificateError ?
              <Dialog
                open={this.state.certificateErrorDialogOpen}
                onClose={this.handleCloseCertificate}
                aria-labelledby="alert-dialog-confirmation"
                aria-describedby="alert-dialog-confirmation"
              >
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.certificateNotGenerated}</DialogTitle>
                <DialogContent className="success-dialog-content">
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {this.props.language.pleaseContactAdmin}
                  </DialogContentText>
                  <InfoIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleCloseCertificate()} color="primary" autoFocus>
                    {this.props.language.close}
                  </Button>
                </DialogActions>
              </Dialog>
          :
          undefined
        }
      </div>
    )
  }
}
