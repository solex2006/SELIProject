import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AudienceStep from '../course/AudienceStep'
import RequirementStep from '../course/RequirementStep'
import CoursePlanStep from '../course/CoursePlanStep'
import ReportStep     from '../course/ReportStep'
import FormStepperID from '../navigation/FormStepperID';
import CourseInformation from '../course/CourseInformation';
import CourseProgram from '../course/CourseProgram';
import AnalysisStep from '../course/AnalysisStep'
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Courses } from '../../../lib/CourseCollection';
import { Activities } from '../../../lib/ActivitiesCollection';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import AccessibilityHelp from '../tools/AccessibilityHelp';
import FileUpload from '../files/FileUpload';
import ImagePreview from '../files/previews/ImagePreview';
import PdfPreview from '../files/previews/PdfPreview';
import Library from '../tools/Library';
import DesignStep from '../course/DesignStep'
import InfoIcon from '@material-ui/icons/Info'; //information
import GroupIcon from "@material-ui/icons/Group"; //audience
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'; //requirements
import AssistantIcon from "@material-ui/icons/Assistant"; //course plan
import SchoolIcon from '@material-ui/icons/School'; //analysis
import AssignmentIcon from "@material-ui/icons/Assignment"; //design
import MenuBookIcon from "@material-ui/icons/MenuBook"; //program
import PdfFormulario from '../../../imports/components/course/pdfForm'

export default class CreateCourse extends React.Component {

  formStepper=React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      flagtick:true,
      courseSteps: undefined,
      flagErrorSteps:false,
      numberofStep:'',
      databaseCourse: {},
      courseInformation: {
        title: '',
        subtitle: "",
        description: '',
        language: '',
        modality:'online',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: '005:00:00',
        support: [],
        requirements: [],
        coursePlan:{
          guidedCoursePlan: 'free', 
          courseTemplate: 'without', 
          courseStructure: 'topic'
        },
        program: [],
        design:[],
        accessibility:[],
        report:[],
        stepscompleted:[],
        stepsflag:'',
        classroom:[],
        analysis:[],
        signature:'',
        level:'',
        type:''
      },
      lists: [],
      buildedItems: false,
      expandedNodes: [],
      selected: [0, 0, 0, 0],
      saved: false,
      action: "",
      reportflag:0,
      updateSteps:'',
      reset: "",
      activeStep:'',
      cancelCounter: 0
    }
  }

  componentDidMount() {
    this.loadingHeaders();
    if (this.props.courseToEdit){
      this.courseBackup(this.props.courseToEdit._id);
      this.setState({
        image:   this.props.courseToEdit.image,
        sylabus: this.props.courseToEdit.sylabus,
        courseInformation: {
          title: this.props.courseToEdit.title,
          subtitle: this.props.courseToEdit.subtitle,
          description: this.props.courseToEdit.description,
          language: this.props.courseToEdit.language,
          modality: this.props.courseToEdit.modality,
          keyWords: this.props.courseToEdit.keyWords,
          image: this.props.courseToEdit.image,
          sylabus: this.props.courseToEdit.sylabus,
          duration: this.props.courseToEdit.duration,
          requirements: this.props.courseToEdit.requirements ? this.props.courseToEdit.requirements : [],
          support: this.props.courseToEdit.support ? this.props.courseToEdit.support : [],
          coursePlan: this.props.courseToEdit.coursePlan ? this.props.courseToEdit.coursePlan : 
          {
            guidedCoursePlan: 'free', 
            courseTemplate: 'without', 
            courseStructure: 'topic'
          },
          program: this.props.courseToEdit.program,
          design: this.props.courseToEdit.design ? this.props.courseToEdit.design : [],
          accessibility: this.props.courseToEdit.accessibility,
          report:this.props.courseToEdit.report,
          stepscompleted: this.props.courseToEdit.stepscompleted,
          stepsflag: this.props.courseToEdit.stepsflag,
          classroom: this.props.courseToEdit.classroom,
          analysis: this.props.courseToEdit.analysis ? this.props.courseToEdit.analysis : [],
        },
        saved: this.props.courseToEdit._id,
      }, () => {this.loadingData()})
    } else {this.loadingData()}
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.language.languageIndex !== this.props.language.languageIndex) || (prevState.flagtick != this.state.flagtick)
        || (prevState.selected !== this.state.selected)
        || (prevState.cancelCounter !== this.state.cancelCounter)) 
    {
      this.loadingHeaders();
      this.loadingData();
    }
    
    
  }

  loadingHeaders = () => {
    this.setState({
      courseSteps: [
        {label: this.props.language.information, icon: <InfoIcon className="step-icon"/>},
        {label: this.props.language.audiences, icon: <GroupIcon className="step-icon"/>},
        {label: this.props.language.requirements, icon: <PlaylistAddCheckIcon className="step-icon"/>},
        {label: this.props.language.plan, icon: <AssistantIcon className="step-icon"/>},
        {label: this.props.language.analysisstep, icon: <SchoolIcon className="step-icon"/>},
        {label: this.props.language.desingPhase, icon: <AssignmentIcon className="step-icon"/>},
        {label: this.props.language.program, icon: <MenuBookIcon className="step-icon"/>},
        {label: this.props.language.reportstep, icon: <MenuBookIcon className="step-icon"/>}
      ]
    });
  }

  updateCourseInformation = (newValue) => {
    this.setState({
      courseInformation: newValue,
      cancelCounter: this.state.cancelCounter + 1
    });
  }

  validate=(data=>{
    this.setState({
      updateSteps:data,
    })
  })

  loadingData = () => {
    this.setState({
      courseForms: [
        <CourseInformation
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          unPickFile={this.unPickFile.bind(this)}
          changeFile={this.changeFile.bind(this)}
          openFileSelector={this.openFileSelector.bind(this)}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
        <AudienceStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
        <RequirementStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
          buildedItems={this.state.buildedItems}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
        <CoursePlanStep
          handlePreview={this.handlePreview.bind(this)}
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
          buildedItems={this.state.buildedItems}
          unPickFile={this.unPickFile.bind(this)}
          changeFile={this.changeFile.bind(this)}
          openFileSelector={this.openFileSelector.bind(this)}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          updateCourseInformation={this.updateCourseInformation.bind(this)}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
          selected={this.state.selected}
          expandedNodes={this.state.expandedNodes}
          handleCahngetick={this.handleCahngetick}
        />,
        <AnalysisStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
        <DesignStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          template={this.state.courseInformation.coursePlan.courseTemplate}
          organization={this.state.courseInformation.coursePlan.courseStructure}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
        <CourseProgram
          courseInformation={this.state.courseInformation}
          expandedNodes={this.state.expandedNodes}
          selected={this.state.selected}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          handlePreview={this.handlePreview.bind(this)}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
          validate={this.validate}
        />,
        <ReportStep
          handleBack={this.handleBack.bind(this)}
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          cancelCounter={this.state.cancelCounter}
          language={this.props.language}
        />,
      ],
    });
  }

  courseBackup = (id) => {
    const newCourse = Courses.findOne({_id: id});
    this.setState({databaseCourse: newCourse});
  } 

  cancelChanges = () => {
    if (this.state.databaseCourse) 
    this.updateCourseInformation({...this.state.databaseCourse});
  }

  handleBack=(props)=>{
    console.log("en el handle back",props.topic)
    if(props.topic.type==='topic'){
      this.setState({
        activeStep:Math.random(),
        selected:[props.topic.indice,0,0,0]
      })
    }
    if(props.topic.type==='template'){
      if(props.topic.actividad!=undefined){
        this.setState({
          activeStep:Math.random(),
          selected:[props.topic.unidad,0,props.topic.actividad!=undefined?props.topic.actividad:0,2]
        })
      }else{
        this.setState({
          activeStep:Math.random(),
          selected:[props.topic.unidad,0,0,0]
        })
      }
      
    }
    if(props.topic.type==='unit'){
      if(props.topic.lesson!=undefined){
        this.setState({
          activeStep:Math.random(),
          selected:[props.topic.unidad,props.topic.lesson!=undefined?props.topic.lesson:0,0,1]
        })
      }
      if(props.topic.lesson===undefined){
        this.setState({
          activeStep:Math.random(),
          selected:[props.topic.unidad,0,0,0]
        })
      }
      
    }
   // this.loadingData()[props.topic.unidad,0props.topic,0,actividad,1]
  }

  handleCahngetick=()=>{
    this.setState({flagtick:!this.state.flagtick})
  }

  checksteps(type){
    this.state.nopublish=false;
    let checkFree=false;
    let checkGuided=false;
    let step0=this.state.courseInformation.stepscompleted.includes(0) 
    let step1=this.state.courseInformation.stepscompleted.includes(1)
    //let step2=this.state.courseInformation.stepscompleted.includes(2)
    let step3=this.state.courseInformation.stepscompleted.includes(3)
    let step4=this.state.courseInformation.stepscompleted.includes(4)
    let step5=this.state.courseInformation.stepscompleted.includes(5)
    let step6=this.state.courseInformation.stepscompleted.includes(6)
    let step7=this.state.courseInformation.stepscompleted.includes(7)
    if(this.state.courseInformation.coursePlan.guidedCoursePlan==='free'){
      if(step0===false){
        this.state.numberofStep=1
        this.setState(this.state)
      } else if (step1===false){
        this.state.numberofStep=2
        this.setState(this.state)
      }else if(step3===false){
        this.state.numberofStep=4
        this.setState(this.state)
      }else if(step5===false){
        this.state.numberofStep=6
        this.setState(this.state)
      }else if(step6===false){
        this.state.numberofStep=7
        this.setState(this.state)
      }else if(step7===false){
        this.state.numberofStep=8
        this.setState(this.state)
      }
      (
        step0===true&&  step1===true&&  step3===true&& step5===true&& step6===true
      )
      ? checkFree=true: checkFree===false; 
      if(checkFree===false || !this.validatePublishCourse()){
        this.state.flagErrorSteps=true
        this.state.open=true
      //  this.state.action=true
        this.setState(this.state)
      }else{
        this.state.flagErrorSteps=false
        this.state.action='publish'
        this.setState(this.state)
      }
    }else{
      if(step0===false){
        this.state.numberofStep=1
        this.setState(this.state)
      } else if (step1===false){
        this.state.numberofStep=2
        this.setState(this.state)
      }else if(step3===false){
        this.state.numberofStep=4
        this.setState(this.state)
      }else if(step4===false){
        this.state.numberofStep=5
        this.setState(this.state)
      }else if(step5===false){
        this.state.numberofStep=6
        this.setState(this.state)
      }else if(step6===false){
        this.state.numberofStep=7
        this.setState(this.state)
      }else if(step7===false){
        this.state.numberofStep=8
        this.setState(this.state)
      }
      (
        step0===true&&  step1===true&& step3===true&& step4===true&& step5===true&& step6===true
      )
      ? checkGuided=true: checkGuided===false; 
      if(checkGuided===false || !this.validatePublishCourse()){
        this.state.flagErrorSteps=true
        this.state.open=true
      //  this.state.action=true
        this.setState(this.state)
      }else{
        this.state.flagErrorSteps=false
        this.state.action='publish'
        this.setState(this.state)
      }
    }
  }

  publishCourse() {
    this.saveCourse();
    if (this.state.saved) {
      Courses.update(
        { _id: this.state.saved },
        { $set: {published: true}}
      );
      this.props.showComponent('published')
      this.props.handleControlMessage(true, this.props.language.coursePublishedS, true, 'preview', this.props.language.seePreview, this.state.saved);
    } else {
      this.props.handleControlMessage(true, this.props.language.saveCourse);
    }
  }

  saveCourse() {
    if (this.validateSaveCourse()) {
      let user = Meteor.user();
      let courseInformation = this.state.courseInformation;
      let course;
      let valueSubtitle = courseInformation.subtitle;
      courseInformation.stepsflag="saved";

      if (valueSubtitle === undefined) {
        valueSubtitle = "-----"
      }
      if (!this.state.saved) {
        courseInformation.creationDate = new Date();
        courseInformation.createdBy = user.username;
        courseInformation.published = false;
        courseInformation.classroom = [];
        course = Courses.insert(courseInformation);
        this.setState({
          saved: course,
        }, () => {this.courseBackup(course)});
        this.props.savedCourseState();
        this.createForum(courseInformation, course);
      }
      else {
        Courses.update(
          { _id: this.state.saved },
          { $set:
            {
              title: courseInformation.title,
              subtitle: valueSubtitle,
              description: courseInformation.description,
              modality: courseInformation.modality,
              language: courseInformation.language,
              keyWords: courseInformation.keyWords,
              image: courseInformation.image,
              sylabus: courseInformation.sylabus,
              duration: courseInformation.duration,
              requirements: courseInformation.requirements,
              support: courseInformation.support,
              coursePlan: courseInformation.coursePlan,
              program: courseInformation.program,
              accessibility:courseInformation.accessibility,
              report:courseInformation.report,
              stepscompleted:courseInformation.stepscompleted,
              stepsflag:courseInformation.stepsflag,
              analysis:courseInformation.analysis,
              design:courseInformation.design,
              classroom: courseInformation.classroom,
              creationDate: new Date(),
            }
          },
          () => {this.courseBackup(this.state.saved)}
        );
        this.props.savedCourseState();
        this.createForum(courseInformation, this.state.saved);
      }
      this.props.handleControlMessage(true, this.props.language.courseSavedS, true, 'savedList', this.props.language.seeList);
    }
  }

  createForum = (course, courseId) => {
    course.program.map((unitTopic, unitTopicIndex) => {
      unitTopic.items.map((item, index) => {
        this.createForumItem(item, courseId, unitTopicIndex, index, -1, "unitTopic");
      })
      if (course.coursePlan.courseStructure === "unit") {
        unitTopic.lessons.map((lesson, lessonIndex)=> {
          lesson.items.map((item, index) => {
            this.createForumItem(item, courseId, unitTopicIndex, index, lessonIndex, "lesson");
          })
        })
      } else {
        if (course.coursePlan.courseTemplate !== "without") {
          unitTopic.activities.map((activity, taskIndex)=> {
            activity.items.map((item, index) => {
              this.createForumItem(item, courseId, unitTopicIndex, index, taskIndex, "task");
            })
          })
        }
      }
    })
  }

  createForumItem = (item, courseId, parentIndex, index, childIndex, level) => {
    if (item.type === "activity" && item.attributes.type === "forum" && item.attributes.activityId === undefined){
      let courseInformation = this.state.courseInformation;
      let activity = {
        data: [],
        type: 'forum',
        public: false,
      }
      let activityId;
      if (item.id && courseId) {
        activity.date = new Date();
        activity.user = Meteor.userId();
        activity.course = courseId;
        activityId = Activities.insert({
          activity
        });
      }
      let program = Courses.findOne({_id: courseId}).program;
      if (level === "unitTopic") {
        program[parentIndex].items[index].attributes.activityId = activityId;
      } else if (level === "lesson") {
        program[parentIndex].lessons[childIndex].items[index].attributes.activityId = activityId;
      } else if (level === "task") {
        program[parentIndex].activities[childIndex].items[index].attributes.activityId = activityId;
      }
      Courses.update(
        {_id: courseId},
        {$set:{program: program}}
      )
      courseInformation.program = program;
      this.updateCourseInformation(courseInformation);
    }
  }

  validatePublishCourse = () => {
    let courseInformation = this.state.courseInformation;
    let completeStepAux = "";
    let caseStep = true;
    if (
      courseInformation.title === '' ||
      courseInformation.description === '' ||
      courseInformation.duration === ''
    ) {
      completeStepAux = `${this.props.language.fieldsMarkedWith}.`;
      caseStep = false;
    }
    else if (courseInformation.image === undefined) {
      completeStepAux = `${this.props.language.chooseCourseImage}.`;
      caseStep = false;
    }
    else if (courseInformation.keyWords.length < 3 || courseInformation.keyWords.length > 10) {
      completeStepAux = `${this.props.language.addOneOrMore}`;
      caseStep = false;
    }
    else if (courseInformation.duration.indexOf('_') !== -1) {
      completeStepAux = `${this.props.language.durationInvalidEntry}`;
      caseStep = false;
    } else if (courseInformation.duration && courseInformation.duration.split(':')[0] < 5) {
      completeStepAux = `${this.props.language.minimumCourseDuration}.`;
      caseStep = false;
    } 
    this.setState({completeStepAux,})
    return caseStep;
  }

  validateSaveCourse = () => {
    let courseInformation = this.state.courseInformation;
    if (courseInformation.title === '') {
      this.props.handleControlMessage(true, `${this.props.language.titleRequirement} (${this.props.language.step}: ${this.props.language.information}).`, false, '', '');
      return false;
    }
    /* if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, `${this.props.language.organizationRequirement} (${this.props.language.step}: ${this.props.language.program}).`, false, '', '');
      return false;
    } */
    return true;
  }

  handleOpen = (action) => {
    this.setState({
      open: true,
      action,
    })
  }

  handlePreview = () => {
    this.handleOpen("preview");
  }

  handlePublish = () => {
    this.checksteps();
    this.handleOpen("publish");
  }

  handleClose = (type) => {
     // this.state.action='publish';
     if(type==='alert'){
      this.state.nopublish=true;
      this.state.open=false;
      this.setState(this.state)
     }
     //this.state.nopublish=false
      this.state.flagErrorSteps=false;
      this.setState(this.state)
    
    if (this.state.courseInformation.image !== undefined) {
      this.setState({
        image: this.state.courseInformation.image,
      });
    }
    if (this.state.courseInformation.sylabus !== undefined) {
      this.setState({
        sylabus: this.state.courseInformation.sylabus,
      });
    }
    this.setState({ open: false });
  };

  confirmPreview = () => {
    this.saveCourse();
    this.handleClose();
  }

  openFileSelector(fileType, accept){
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: false,
    }, () => {this.handleOpen("upload")});
  }

  openFileSelectorEdit(fileType, accept){
    this.setState({
      showLibrary: false,
      fileType: fileType,
      accept: accept,
      showPreview: true,
    }, () => {this.handleOpen("upload")});
  }

  getFileInformation(file){
    this.setState({
      showPreview: true,
      showLibrary: false,
    })
    this.state.fileType === "image" ?
      this.setState({
        image: file,
      })
    :
      this.setState({
        sylabus: file,
      })
  }

  unPickFile(){
    this.state.fileType === "image" ?
    this.setState({
      showPreview: false,
      image: undefined,
    })
    :
    this.setState({
      showPreview: false,
      sylabus: undefined,
    })
  }

  showLibrary(){
    this.setState({
      showLibrary: true,
    })
  }

  hideLibrary(){
    this.setState({
      showLibrary: false,
    })
  }

  selectFile(fileType) {
    let courseInformation = this.state.courseInformation;
    if (fileType === "image") {
      courseInformation.image = this.state.image;
    } else {
      courseInformation.sylabus = this.state.sylabus
    }
    this.setState({
      showPreview: false,
      courseInformation: courseInformation,
    }, () => {this.handleClose(); this.loadingData()})
  }

  changeFile(type,file) {
    this.state.open=true
    if (type === "image") {
      this.openFileSelectorEdit("image", "image/*");
    }
    else {
      this.setState({
        reset:Math.random()
      })
      this.state.fileType='pdf'
      this.state.open=true
      this.state.sylabus=file
      this.setState(this.state)
      this.openFileSelectorEdit("pdf", ".pdf");
    }
  }

  render() {
    return(
      <div>
        {
          this.state.courseForms !== undefined ?
            <FormStepperID
              ref={this.formStepper}
              updateSteps={this.state.updateSteps}
              language={this.props.language}
              saved={this.state.saved}
              title={this.props.courseToEdit ? this.props.language.editing : this.props.language.createCourse}
              color="primary"
              steps={this.state.courseSteps}
              forms={this.state.courseForms}
              coursePlan={this.state.courseInformation.coursePlan}
              finalLabel={this.props.language.publishCourse}
              saveLabel={this.props.language.saveCourse}
              cancelChanges={this.cancelChanges.bind(this)}
              finalAction={this.handlePublish.bind(this)}
              saveAction={this.saveCourse.bind(this)}
              reportflag={this.state.reportflag}
              activeStep={this.state.activeStep}
            />
          :
          undefined
        }
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="dialog"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          keepMounted
          maxWidth={false}
        >
          {
            this.state.action === "preview" || this.state.action === "publish"   ?
              <React.Fragment>
                {
                  this.state.flagErrorSteps===true?
                    <React.Fragment>
                      <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                        {this.props.language.missingInformation}
                      </DialogTitle>
                      <DialogContent className="success-dialog-content">
                        <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                          {this.props.language.completeStep1+`${
                            this.state.numberofStep===1?this.props.language.information:
                            this.state.numberofStep===2?this.props.language.audiences:
                            this.state.numberofStep===4?this.props.language.plan:
                            this.state.numberofStep===5?this.props.language.analysisstep:
                            this.state.numberofStep===6?this.props.language.desingPhase:
                            this.state.numberofStep===7?this.props.language.program:
                            this.state.numberofStep===8?this.props.language.reportstep:''} ` +this.props.language.completeStep2}
                        </DialogContentText>
                        {
                          this.state.completeStepAux && this.state.completeStepAux !== "" &&
                          <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                            {this.state.completeStepAux}
                          </DialogContentText>
                        }
                        <InfoIcon  className="alert-dialog-icon"/>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => this.handleClose('alert')} color="primary" autoFocus>
                          {this.props.language.close}
                        </Button>
                      </DialogActions>
                    </React.Fragment>
                  :
                    this.state.nopublish===true?
                      undefined
                    :
                      <React.Fragment>
                        <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                          {this.state.action === "preview" ? this.props.language.coursePreview : this.props.language.publishCourse}
                        </DialogTitle>
                        <DialogContent className="success-dialog-content">
                          <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                            {this.state.action === "preview" ? this.props.language.ifYouWantCP : this.props.language.ifYouWantPC}
                          </DialogContentText>
                          <InfoIcon className="warning-dialog-icon"/>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                          {this.props.language.cancel}
                          </Button>
                          {
                            this.state.action === "preview" ?
                              <Link className="button-link"
                                target="_blank"
                                onClick={() => this.confirmPreview()} 
                                to={{
                                  pathname: "/coursePreview",
                                  hash: this.state.saved,
                                  state: { fromDashboard: true },
                                }}
                              >
                                <Button color="primary" autoFocus>
                                  {this.props.language.saoPreview}
                                </Button>
                              </Link>
                            :
                              <Button onClick={() => this.publishCourse()} color="primary" autoFocus>
                                {this.props.language.ok}
                              </Button>
                          }
                        </DialogActions>
                      </React.Fragment>
                } 
              </React.Fragment>
            :
              <React.Fragment> 
                {
                  (this.state.fileType==='pdf' || this.state.fileType===undefined )?
                  <div className="form-preview-container">
                    <PdfFormulario
                      expandedNodes={this.props.expandedNodes}
                      courseInformation={this.state.courseInformation}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      language={this.props.language}
                      selected={this.state.selected}
                      expandedNodes={this.state.expandedNodes}
                      onClose={this.handleClose.bind(this)}
                      initial='program'
                      reset={this.state.reset}
                    />
                  </div>
                  :
                  <React.Fragment>
                    <DialogTitle className="dialog-title">
                      <AppBar className="dialog-app-bar" color="primary" position="static">
                        <Toolbar className="dialog-tool-bar-information" variant="dense" disableGutters={true}>
                          <AppsIcon/>
                          <h4 className="dialog-label-title">{this.state.fileType === "image" ? this.props.language.chooseOrUploadImage : this.props.language.chooseOrUploadSyllabus}</h4>
                          <IconButton
                            id="close-icon"
                            edge="end"
                            className="dialog-toolbar-icon"
                            onClick={this.handleClose}
                          >
                            <CloseIcon/>
                          </IconButton>
                        </Toolbar>
                      </AppBar>
                    </DialogTitle>
                <div className="file-form-dialog">
                  {
                    this.state.showLibrary ?
                      <Library
                        user={Meteor.userId()}
                        type={this.state.fileType}
                        getFileInformation={this.getFileInformation.bind(this)}
                        hideLibrary={this.hideLibrary.bind(this)}
                        language={this.props.language}
                      />
                    :
                      <div>
                        <div className="library-button-container">
                          <Fab onClick={() => this.showLibrary()}>
                            <FolderSpecialIcon/>
                          </Fab>
                          <p className="media-fab-text">{this.props.language.library}</p>
                        </div>
                        {
                          this.state.showPreview ?
                            <div className="form-preview-container">
                              {
                                this.state.fileType === "image" ?
                                <ImagePreview
                                  file={this.state.image}
                                  unPickFile={this.unPickFile.bind(this)}
                                  language={this.props.language}
                                  tipo={"Course"}
                                /> 
                                :
                                <PdfPreview
                                  file={this.state.sylabus}
                                  unPickFile={this.unPickFile.bind(this)}
                                  language={this.props.language}
                                />
                              }
                              
                            </div>
                          :
                          <div className="form-file-container">
                            <FileUpload
                              type={this.state.fileType}
                              user={Meteor.userId()}
                              accept={this.state.accept}
                              handleControlMessage={this.props.handleControlMessage.bind(this)}
                              getFileInformation={this.getFileInformation.bind(this)}
                              label={this.state.fileType === 'image' ? this.props.language.uploadImageButtonLabel : this.props.language.uploadPdfButtonLabel }
                              language={this.props.language}
                            />
                          </div>
                        }
                      </div>
                  }
                  
                </div>
                <div className="form-editor-label">
                  <AccessibilityHelp 
                      id={'short-description-help-container'} 
                      name={'shortDescriptionHelpContainer'} 
                      error={!this.state.showPreview} 
                      tip={this.state.fileType === 'image' ? (!this.state.showPreview ? this.props.language.uploadImage: this.props.language.uploadImageCorrect):(!this.state.showPreview ? this.props.language.uploadPdf: this.props.language.uploadPdfCorrect)}
                      //step={props.step}
                      //stepLabel={props.stepLabel}
                      language={this.props.language}
                  />
                </div>
                <div className="dialog-actions-container">
                  <Tooltip title={this.props.language.done}>
                    <Fab 
                      onClick={() => this.selectFile(this.state.fileType)} 
                      disabled={this.state.fileType === "image" ? this.state.image === undefined : this.state.sylabus === undefined} 
                      className="dialog-fab" 
                      color="primary"
                    >
                      <AssignmentTurnedInIcon/>
                    </Fab>
                  </Tooltip>
                </div>
              </React.Fragment>
                }
          </React.Fragment>
         
          }
        </Dialog>
      </div>
    )
  }
}
