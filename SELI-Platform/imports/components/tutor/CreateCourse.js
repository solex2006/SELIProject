import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AudienceStep from '../course/AudienceStep'
import RequirementStep from '../course/RequirementStep'
import CoursePlanStep from '../course/CoursePlanStep'
import ReportStep     from '../course/ReportStep'
import FormStepperID from '../navigation/FormStepperID'; '../'
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


export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSteps: undefined,
      courseInformation: {
        title: '',
        subtitle: "",
        description: '',
        language: '',
        keyWords: [],
        image: undefined,
        sylabus: undefined,
        duration: '005:00:00',
        support: [],
        requirements: [],
        coursePlan:{
          guidedCoursePlan: 'guided', 
          courseTemplate: 'spiral', 
          courseStructure: 'topic'
        },
        accessibility:[],
        stepscompleted:[],
        stepsflag:'',
        analysis:[],
        design:[],
        organization: '',
        signature:'',
        level:'',
        type:'',
        program: [],
        report:[]
    
      },
      lists: [],
      buildedItems: false,
      expandedNodes: [],
      selected: [0, 0, 0, 0],
      saved: false,
      action: "",
      reportflag:0,
      updateSteps:''
    }
  }

  componentDidMount() {
    this.loadingHeaders();
    if (this.props.courseToEdit){
      this.setState({
        image:   this.props.courseToEdit.image,
        sylabus: this.props.courseToEdit.sylabus,
        courseInformation: {
          title: this.props.courseToEdit.title,
          subtitle: this.props.courseToEdit.subtitle,
          description: this.props.courseToEdit.description,
          language: this.props.courseToEdit.language,
          keyWords: this.props.courseToEdit.keyWords,
          image: this.props.courseToEdit.image,
          sylabus: this.props.courseToEdit.sylabus,
          duration: this.props.courseToEdit.duration,
          requirements: this.props.courseToEdit.requirements ? this.props.courseToEdit.requirements : [],
          support: this.props.courseToEdit.support ? this.props.courseToEdit.support : [],
          coursePlan: this.props.courseToEdit.coursePlan ? this.props.courseToEdit.coursePlan : 
          {
            guidedCoursePlan: 'guided', 
            courseTemplate: 'spiral', 
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
    if (prevProps.language.languageIndex !== this.props.language.languageIndex) {
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
      courseInformation: newValue
    })
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
          language={this.props.language}
        />,
        <AudienceStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <RequirementStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
          buildedItems={this.state.buildedItems}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          language={this.props.language}
        />,
        <CoursePlanStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          lists={this.state.lists}
          buildedItems={this.state.buildedItems}
          unPickFile={this.unPickFile.bind(this)}
          changeFile={this.changeFile.bind(this)}
          openFileSelector={this.openFileSelector.bind(this)}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          updateCourseInformation={this.updateCourseInformation.bind(this)}
          language={this.props.language}
        />,
        <AnalysisStep
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          language={this.props.language}
        />,
        <DesignStep
          language={this.props.language}
          validate={this.validate}
          courseInformation={this.state.courseInformation}
          template={this.state.courseInformation.coursePlan.courseTemplate}
          organization={this.state.courseInformation.coursePlan.courseStructure}
        />,
        <CourseProgram
          courseInformation={this.state.courseInformation}
          expandedNodes={this.state.expandedNodes}
          selected={this.state.selected}
          handleControlMessage={this.props.handleControlMessage.bind(this)}
          handlePreview={this.handlePreview.bind(this)}
          language={this.props.language}
        />,
        <ReportStep
          language={this.props.language}
          validate={this.validate}
          courseInformation={this.state.courseInformation}
        />,
      ],
    });
  }

  publishCourse() {
    if (this.validatePublishCourse()) {
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
        });
        this.props.savedCourseState();
        this.props.createForum(courseInformation, course);
      }
      else {
        Courses.update(
          { _id: this.state.saved },
          { $set:
            {
              title: courseInformation.title,
              subtitle: valueSubtitle,
              description: courseInformation.description,
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
          }
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
    console.log("se va a publicar el curso",courseInformation,this.state)
    
    /* this.state.reportflag=7
    this.setState(this.state) */

    if (
      courseInformation.title === '' ||
      courseInformation.description === '' ||
      courseInformation.duration === ''
    ) {
      this.props.handleControlMessage(true, `${this.props.language.fieldsMarkedWith} (${this.props.language.step}: ${this.props.language.information}).`, false, '', '');
      return false;
    }
    else if (courseInformation.image === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseImage} (${this.props.language.step}: ${this.props.language.information}).`, false, '', '');
      return false;
    }
    /* else if (courseInformation.sylabus === undefined) {
      this.props.handleControlMessage(true, `${this.props.language.chooseCourseSyllabus} (${this.props.language.step}: ${this.props.language.information}).`, false, '', '');
      return false;
    } */
    else if (courseInformation.keyWords.length < 3 || courseInformation.keyWords.length > 5) {
      this.props.handleControlMessage(true, `${this.props.language.addOneOrMore} (${this.props.language.step}: ${this.props.language.information}).`, false, '', '');
      return false;
    }
    /* else if (courseInformation.organization === '') {
      this.props.handleControlMessage(true, `${this.props.language.organizationRequirement} (${this.props.language.step}: ${this.props.language.program}).`, false, '', '');
      return false;
    }  */
    if (courseInformation.duration.indexOf('_') !== -1) {
      this.props.handleControlMessage(true, `${this.props.language.durationInvalidEntry}`, false, '', '');
      return false;
    } else {
      let duration = courseInformation.duration.split(':');
      if (duration[0] < 5) {
        this.props.handleControlMessage(true, `${this.props.language.minimumCourseDuration}.`, false, '', '');
        return false;
      } 
    }
    let emptyContent = false;
    if (emptyContent) {
      return false;
    }

    //validate the report step
   
    /* let visual=0
    let hearing=0
    let cognitive=0
    let elderly=0
 */
    /* if(courseInformation.report[0].selected){
      visual=courseInformation.report[0].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / courseInformation.report[0].topics.length
      console.log("visual", visual)
    }
    if(courseInformation.report[1].selected){
      hearing=courseInformation.report[1].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / courseInformation.report[1].topics.length
      console.log("hearing", hearing)
    }
    if(courseInformation.report[2].selected){
      cognitive=courseInformation.report[2].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / courseInformation.report[2].topics.length
      console.log("cognitive", cognitive)
    }
    if(courseInformation.report[3].selected){
      elderly=courseInformation.report[3].topics.map(topic=>topic.a11yValid).reduce((acc, cur) => acc + cur) / courseInformation.report[3].topics.length
      console.log("diversity", elderly)
    }
   
    if (courseInformation.support[1][3].isChecked===true && visual !=100) {
      this.props.handleControlMessage(true, `${this.props.language.inclusionGolvalidation} ${this.props.language.visual}.`, false, '', '');
      return false;
    }
    if (courseInformation.support[1][2].isChecked===true && hearing !=100) {
      this.props.handleControlMessage(true, `${this.props.language.inclusionGolvalidation} ${this.props.language.hearing}.`, false, '', '');
      return false;
    }
    if (courseInformation.support[1][0].isChecked===true && cognitive !=100) {
      this.props.handleControlMessage(true, `${this.props.language.inclusionGolvalidation} ${this.props.language.cognitive}.`, false, '', '');
      return false;
    }
    if (courseInformation.support[1][1].isChecked===true && elderly !=100) {
      this.props.handleControlMessage(true, `${this.props.language.inclusionGolvalidation} ${this.props.language.Elderly}.`, false, '', '');
      return false;
    }  
    
 */
    //.reduce((acc, cur) => acc + cur) / category.topics.length
    return true;
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
    if (action === "upload" || this.validatePublishCourse()) {
      this.setState({
        open: true,
        action,
      })
    }
  }

  handlePreview = () => {
    this.handleOpen("preview");
  }

  handlePublish = () => {
    this.handleOpen("publish");
  }

  handleClose = () => {
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

  changeFile(type) {
    if (type === "image") {
      this.openFileSelectorEdit("image", "image/*");
    }
    else {
      this.openFileSelectorEdit("pdf", ".pdf");
    }
  }

  render() {
    return(
      <div>
        {
          this.state.courseForms !== undefined ?
            <FormStepperID
              updateSteps={this.state.updateSteps}
              language={this.props.language}
              title={this.props.courseToEdit ? this.props.language.editing : this.props.language.createCourse}
              color="primary"
              steps={this.state.courseSteps}
              forms={this.state.courseForms}
              coursePlan={this.state.courseInformation.coursePlan}
              finalLabel={this.props.language.publishCourse}
              saveLabel={this.props.language.saveCourse}
              finalAction={this.handlePublish.bind(this)}
              saveAction={this.saveCourse.bind(this)}
              reportflag={this.state.reportflag}
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
            this.state.action === "preview" || this.state.action === "publish" ?
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
        </Dialog>
      </div>
    )
  }
}
