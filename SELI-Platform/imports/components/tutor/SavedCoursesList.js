import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../data_display/Table';

import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CourseForm from '../content/CourseForm'
//const backup = require('mongodb-backup');



export default class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      myCourses: [],
      loading: true,
      showBoton:false
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log("file upload",this.fileInput.current.files[0])
    var file = this.fileInput.current.files[0]; //assuming 1 file only
    if (!file) return;

  
    const formData = new FormData()
    formData.append('json', file)

    console.log("form data",formData)
  
    fetch(Meteor.settings.public.URL_SITE+'upload', { method: 'POST', body: formData})
    .then(response => response.json())
    .then(data => { console.log("data regreso:",data)})
    .catch(error => {
      console.error(error)
    })


    



  }
  componentDidMount() {
    this.getMyCourses(this.props.user.username);
  }

  getMyCourses = (user) => {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let myCourses = Courses.find({createdBy: user, published: false}).fetch();
        this.setState({
          myCourses: myCourses,
        }, () => {
          let results = true;
          if (this.state.myCourses.length) {
            this.createTableData(this.state.myCourses);
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

  edit = (_id) => {
    let myCourses = this.state.myCourses;
    let course = myCourses.find( course => course._id === _id );
    this.props.editCourse(course);
  }

  showDeleteConfirmation = (_id) => {
    let coursesToDelete = [];
    coursesToDelete.push(_id);
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: this.props.language.deletingCourses,
      dialogConfirmationContentText: this.props.language.areYouSureDeleteCourses,
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }
  downloadCourse= (id) => {
    let myCourses = this.state.myCourses;
    let course=myCourses.filter(objeto=>objeto._id===id)
    console.log("CURSO A DESCARGAR********", id, course[0])
     Meteor.call('getCourses', course[0], function(error, result){
      if(!error){
        console.log( "resultado", result )
        //SessionLog.insert({ "UserId": response._id, "Datetime": new Date(), "IPAddress": result });
      }
    }); 

    window.open(Meteor.settings.public.URL_SITE+'file', "_blank")
  }

  UploadNewCourse= () => {
    /* Meteor.call('UploadCourses', function(error, result){
      if(!error){
        console.log( "resultado", result )
        //SessionLog.insert({ "UserId": response._id, "Datetime": new Date(), "IPAddress": result });
      }
    }); */
  };

  deleteSelected = (courses) => {
    let coursesToDelete = [];
    courses.map(course => {coursesToDelete.push(course)});
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: this.props.language.deletingCourses,
      dialogConfirmationContentText: this.props.language.areYouSureDeleteCourses,
      confirmAction: () => this.delete(),
      coursesToDelete: coursesToDelete,
    });
  }

  delete = () => {
    this.state.coursesToDelete.map((course, index) => {
      let students = Courses.findOne({_id: course}).classroom;
      let courseId = course;
      students.map(student => {
        var user = Meteor.users.findOne({_id: student});
        let courseIndex = user.profile.courses.findIndex(subscribedCourse => subscribedCourse.courseId === courseId);
        user.profile.courses.splice(courseIndex, 1);
        Meteor.call("UpdateCourses", student, user.profile.courses, (error, response) =>  {})
      })
      Courses.remove({_id: course});
    });
    this.handleClose();
    this.setSelected();
    this.props.handleControlMessage(true, this.props.language.courseDeletedS, false, '', '');
  }

  createTableData = (myCourses) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: this.props.language.title },
      { id: 'template', numeric: true, disablePadding: false, label: this.props.language.template },
      { id: 'organization', numeric: true, disablePadding: false, label: this.props.language.courseOrganization },
      { id: 'actions', numeric: true, disablePadding: false, label: this.props.language.actions },
    ];
    let menuOptions = [
      {label: this.props.language.resumeEditing , icon: <EditIcon/>, action: this.edit.bind(this)},
      {label: this.props.language.deleteCourse , icon: <DeleteIcon/>, action: this.showDeleteConfirmation.bind(this)},
      {label: "Download course*" , icon: <DeleteIcon/>, action: this.downloadCourse.bind(this)}
    ];
    myCourses.map(course => {
      tableData.push({
        title: course.title,
        template: course.coursePlan ?
            course.coursePlan.courseTemplate === "without" ? this.props.language.Withouttemplate :
            course.coursePlan.courseTemplate === "spiral" ? this.props.language.SpiralModel :
            course.coursePlan.courseTemplate === "consistent" ? this.props.language.Consistent :
            this.props.language.ToyBox
        : "",
        organization: course.coursePlan ? course.coursePlan.courseStructure === "unit" ? this.props.language.byUnitsAndLessons : this.props.language.byTopics : "", 
        _id: course._id})
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, coursesToDelete:[] });
  };

  

  

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my courses..."/>
            </div>
          :
          <React.Fragment>
            {
              this.state.results ?
                <div className="management-result-container">
                  <p className="management-title">{this.props.language.mySavedCourses}<SchoolIcon className="management-title-icon"/></p>
                  <div className="management-table-container">
                   
                   
                   {/* 
                    <form onSubmit={this.handleSubmit} style={{display:''}} >
                        <label>
                          Upload new course*
                          <input type="file" ref={this.fileInput} />
                        </label>
                        <button type="submit">Submit</button>
                        <hr />
                    </form> */}

                   
                    <form onSubmit={this.handleSubmit} style={{display:''}} >
                           <label>
                          Upload new course*
                          </label>    
                          <input 
                            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                            class="input-file" id="my-file"
                            type="file" 
                            ref={this.fileInput}
                            onChange={()=>this.setState({showBoton:!this.state.showBoton}) }/>
                          <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                   

                       
                         <button type="submit"  style={{ display: this.state.showBoton===true? 'flex': 'none' }}>Submit</button>
                       
                      </form>
                   


                    <Table
                      labels={{
                        title: this.props.language.youHaveCourses, 
                        pagination: this.props.language.coursePerPage,
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
                      delete={true}
                      deleteSelected={this.deleteSelected.bind(this)}
                      setSelectedFunction={selected => this.setSelected = selected}
                    />
                     
                  </div>
                 {/*  <Button color="secondary" onClick={this.UploadNewCourse}> */}
                   
                 {/*  </Button>  */}

                  
                </div>
              :
              <div className="empty-dashboard">
                
                <div className="empty-dashboard-row">
                  <p className="empty-dashboard-text">{this.props.language.noCourseSavedText}</p>
                  <InfoIcon className="empty-dashboard-icon"/>
                </div>
                
                <Button onClick={() => this.props.showComponent('create')} variant="contained" color="secondary" className="empty-dashboard-button">{this.props.language.createCourse}</Button>
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
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            <Button variant="outlined" onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              {this.props.language.confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    }
  }
