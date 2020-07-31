import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import CourseCard from '../../components/course/CourseCard';
import InfoIcon from '@material-ui/icons/Info';

import {
	Avatar,
	Grid,
	Paper,
	Button,
	Typography,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions
} from "@material-ui/core";
import CourseSearch from './courseSearch'

export default class CoursesDashboard extends React.Component {
  constructor(props) {
    console.log("CoursesDashboard", props)
    super(props);
    this.state = {
      courses: [],
      publishedCourses:[],
      mysuscribdedCourses:[],
      myFiltersuscribdedCourses:[],
      myFilterSeliCourses:[],
      myFilterThree:[],
      flagCourses:false,
      myFilterThreeSeli:[],
      myflagCourses:false,
    }
    
  }

  componentWillMount() {//antes de render
    console.log("conpnet did munt")
    Tracker.autorun(() => {
      let courses = Courses.find({published: true}).fetch();
      this.state.publishedCourses=courses
      this.setState(this.state)
        if(this.props.searchText){
          this.setState({
            courses: this.props.searchText,
          });
          this.props.cleanSearchText();
        } else {
          this.setState({
            courses: courses,
          });
        }
    });

    //Search on the suscribded Course List
    this.state.publishedCourses.map((course, indexCourse)=>{
      course.title=course.title.toLowerCase()
    })
    this.searchMyCourses()
    this.searchSELICourses()
  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate",prevState, this.state, prevProps)
    if (prevProps.searchText !== this.props.searchText ){
      if(this.props.searchText){
        this.setState({
          courses: this.props.searchText,
        });
        this.props.cleanSearchText();
      }
    }
    if (prevProps.texttoSearch !== this.props.texttoSearch ){
      this.searchMyCourses()
      this.searchSELICourses()
    }

    if(prevState.flagCourses!=this.state.flagCourses){
      console.log("cabio estado")
      this.searchMyCourses()
      this.searchSELICourses()
    }
  }

  searchMyCourses=()=>{
    //put in lowercase te titles of the courses to improve the search
    let titleMyCourses=[]
     this.props.user.profile.courses.map((course, courseIndex)=>{
        let indexRegistered=this.state.publishedCourses.findIndex(coursespub=>coursespub._id===course.courseId)
        if (indexRegistered!=-1){
          titleMyCourses.push(this.state.publishedCourses[indexRegistered])
        }
    }) 
    this.state.mysuscribdedCourses=titleMyCourses
    let myFiltersuscribdedCourses=this.state.mysuscribdedCourses.filter(course => course.title.search(this.props.texttoSearch.toLowerCase()) !=-1);
    this.state.myFiltersuscribdedCourses=myFiltersuscribdedCourses
    this.setState(this.state)
    console.log("Cursos suscritos con titulo y filtrado",titleMyCourses, myFiltersuscribdedCourses )
  }

  searchSELICourses=()=>{
    console.log("searchSELICourses", this.state, this.props )

    let myFilterSeliCourses=this.state.publishedCourses.filter(course => course.title.search(this.props.texttoSearch.toLowerCase()) !=-1);
    this.state.myFilterSeliCourses=myFilterSeliCourses
    this.setState(this.state)
    console.log("Seli Courses y Filtrados: ",this.state.publishedCourses, myFilterSeliCourses )
  }

  
  
  paperSearchMyCourses=(title, arrayCourses)=>{
    console.log("papersearchMycourses")

    if(arrayCourses.length >3  && this.state.myflagCourses===true){
      this.state.myFilterThree=arrayCourses
    } 
    else if(arrayCourses.length >3 && this.state.myflagCourses===false){
      this.state.myFilterThree=[arrayCourses[0],arrayCourses[1],arrayCourses[2]]
    }else{
      this.state.myFilterThree=arrayCourses
    }
      return(
        <Paper component="article" elevation={0}>
          <header className='headersearch'>
            <h2>{title}</h2>
          </header>
          <div className='subheader'>Showing {this.state.myFilterThree.length} of {arrayCourses.length} subscribed courses that correspond to your search.</div>
          <div  className="courses-dashboard">
            <div className="courses-dashboard-result">
            {
              this.state.myFilterThree.map((course, index) => {
                return(
                  <CourseCard
                    course={course}
                    index={index}
                    language={this.props.language}
                    disabled={this.props.disabled}
                    userCourses={this.props.user.profile.courses}
                    subscribe={this.props.subscribe.bind(this)}
                    unsubscribe={this.props.unsubscribe.bind(this)}
                    key={index}
                  />
                ) 
              })
            }
            </div>
            <div className='buttonsearch'>
            {
              arrayCourses.length >3?
                <Button variant="outlined" color="primary" onClick={()=>this.setState({myflagCourses:!this.state.myflagCourses})}>
                  {this.state.myflagCourses===false? 'See more courses': 'Less content'}
                </Button>
                :
                undefined
            }
          </div>  
        </div> 
        </Paper>
      )
  }


  paperSearchSeli=(title, arrayCourses)=>{
    if(arrayCourses.length >3  && this.state.flagCourses===true){
      this.state.myFilterThreeSeli=arrayCourses
    } 
    else if(arrayCourses.length >3 && this.state.flagCourses===false){
      this.state.myFilterThreeSeli=[arrayCourses[0],arrayCourses[1],arrayCourses[2]]
    }else{
      this.state.myFilterThreeSeli=arrayCourses
    }
      return(
        <Paper component="article" elevation={0}>
          <header className='headersearch'>
            <h2>{title}</h2>
          </header>
          <div className='subheader'>Showing {this.state.myFilterThreeSeli.length} of {arrayCourses.length} subscribed courses that correspond to your search. </div>
          <div  className="courses-dashboard">
            <div className="courses-dashboard-result">
              {
                this.state.myFilterThreeSeli.map((course, index) => {
                  return(
                    <CourseCard
                      course={course}
                      index={index}
                      language={this.props.language}
                      disabled={this.props.disabled}
                      userCourses={this.props.user.profile.courses}
                      subscribe={this.props.subscribe.bind(this)}
                      unsubscribe={this.props.unsubscribe.bind(this)}
                      key={index}
                    />
                  ) 
                })
              }
            </div>
            <div className='buttonsearch'>
              {
              arrayCourses.length >3?
                <Button  variant="outlined" color="primary" onClick={()=>this.setState({flagCourses:!this.state.flagCourses})}>           
                  {this.state.flagCourses===false? 'See more courses': 'Less content'}
                </Button>
                :
                undefined
              }  
            </div>       
          </div>  
        </Paper>
      )
  }
  paperSupportNews=(title)=>{
    return(
      <Paper component="article" elevation={0}>
        <header className='subheader'>
          <h2>{title}</h2>
        </header>
        <CardContent className='headersearch'>
          <Typography
            variant="body2" color="textSecondary" component="div">
            There are no search results.
          </Typography>
        </CardContent>
      </Paper>
    )
  }

  render() {
    return(
      <div className="courses-dashboard-container">

        {console.log("recarga", this.state)}
        <CourseSearch/>
        {this.paperSearchMyCourses('My Courses', this.state.myFiltersuscribdedCourses)}
        {this.paperSearchSeli('SELI Courses', this.state.myFilterSeliCourses)}
        {this.paperSupportNews('Support')}
        {this.paperSupportNews('News')}
      </div>
    )
  }
}
