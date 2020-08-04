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
import { IoLogoClosedCaptioning } from 'react-icons/io';

export default class CoursesDashboard extends React.Component {
  constructor(props) {
    console.log("CoursesDashboard", props)
    super(props);
    this.state = {
      texttoSearch:'',
      accessibilitie:{},
      generalDetailedFlag:false,
      courses: [],
      publishedCourses:[],
      mysuscribdedCourses:[],
      myFiltersuscribdedCourses:[],
      myFilterSeliCourses:[],
      myFilterThree:[],
      flagCourses:false,
      myFilterThreeSeli:[],
      myflagCourses:false,
      fullyCognitive:[], 
      fullyHearing:[],
      fullyVisually:[],
      partialCognitive:[], 
      partialHearing:[],
      partialVisually:[],
      inaccessibleCognitive:[],
      inaccessibleVisual:[],
      inaccessibleHearing:[],
      coursesbyEnglish:[],
      coursesbySpanish:[],
      coursesbyPortuguese:[],
      coursesbyPolish:[],
      coursesbyTurkish:[],
      languageTag:[],
      durationTag:false,
      coursesbyDuration:[],
      audiencesTag:false,
      coursesbyAudiences:[],
      coursesbyTutors:[],
      tutorsTag:false,
      onlineCourses:[],
      onlineTag:false,
    }
    
  }

  componentWillMount() {//antes de render
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
    console.log("conpnet will mount", this.state.publishedCourses)
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

    if((prevState.flagCourses!=this.state.flagCourses) ||(prevState.generalDetailedFlag!=this.state.generalDetailedFlag)){
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

    if(this.props.texttoSearch!=undefined){
      console.log("this.props.texttoSearch", this.props.texttoSearch)
      let myFiltersuscribdedCourses=this.state.mysuscribdedCourses.filter(course => course.title.search(this.props.texttoSearch.toLowerCase()) !=-1);
      this.state.myFiltersuscribdedCourses=myFiltersuscribdedCourses
      this.setState(this.state)
      console.log("Cursos suscritos con titulo y filtrado",titleMyCourses, myFiltersuscribdedCourses )
    }
  }

  searchSELICourses=()=>{
    console.log("searchSELICourses", this.state, this.props )
    if(this.props.texttoSearch!=undefined){
      let myFilterSeliCourses=this.state.publishedCourses.filter(course => course.title.search(this.props.texttoSearch.toLowerCase()) !=-1);
    this.state.myFilterSeliCourses=myFilterSeliCourses
    this.setState(this.state)
    console.log("Seli Courses y Filtrados: ",this.state.publishedCourses, myFilterSeliCourses )
    }
    
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

  getParamsofSearch=(params)=>{
    this.setState({
      accessibilitie:params
    })
    let fullyCognitive=[]
    let partialCognitive=[]
    let inaccessibleCognitive=[]
    let fullyHearing=[]
    let partialHearing=[]
    let inaccessibleHearing=[]
    let fullyVisual=[]
    let partialVisual=[]
    let inaccessibleVisual=[]
     this.state.publishedCourses.map((course,indexCourse)=>{
      //cognitve
      if(course.report!=undefined){
        if(course.report[2]===100){
          fullyCognitive.push(course)
        }else if((course.report[2]<100 && course.report[2]>50)){
          partialCognitive.push(course)
        }else if(course.report[2]<50){
          inaccessibleCognitive.push(course)
        }
      }
      //hearing
      if(course.report!=undefined){
        if(course.report[1]===100){
          fullyHearing.push(course)
        }else if((course.report[1]<100 && course.report[1]>50)){
          partialHearing.push(course)
        }else if(course.report[1]<50){
          inaccessibleHearing.push(course)
        }
      }
      //visual
      if(course.report!=undefined){
        if(course.report[0]===100){
          fullyVisual.push(course)
        }else if((course.report[0]<100 && course.report[0]>50)){
          partialVisual.push(course)
        }else if(course.report[0]<50){
          inaccessibleVisual.push(course)
        }
      }

      this.setState({
        inaccessibleCognitive:inaccessibleCognitive,
        inaccessibleHearing:inaccessibleHearing,
        inaccessibleVisual:inaccessibleVisual,
        generalDetailedFlag:true,
        fullyCognitive:fullyCognitive,
        partialCognitive:partialCognitive,
        fullyHearing:fullyHearing,
        partialHearing:partialHearing,
        fullyVisual:fullyVisual,
        partialVisual:partialVisual
      })

      //console.log("Muestra los full cognitive, parciale e ianccesibles: ",fullyCognitive, partialCognitive, inaccessibleCognitive)
      //console.log("Muestra los full hearing, parciale e ianccesibles: ",fullyHearing, partialHearing, inaccessibleHearing)
      //console.log("Muestra los full visual, parciale e ianccesibles: ",fullyVisual, partialVisual, inaccessibleVisual)
      
    }) 




  }

  getParamsLanguage=(language)=>{
    //console.log("getParamsLangauge, myflagCourses---->",language, this.state.publishedCourses)
    let coursesbyEnglish=[]
    let coursesbySpanish=[]
    let coursesbyPortuguese=[]
    let coursesbyPolish=[]
    let coursesbyTurkish=[]
    this.state.publishedCourses.map((course,indexCourse)=>{
      if(course.language!=undefined){
        if(course.language===0){//english
          coursesbyEnglish.push(course)
        }else if(course.language===1){
          coursesbySpanish.push(course)
        }
        else if(course.language===2){
          coursesbyPortuguese.push(course)
        }
        else if(course.language===3){
          coursesbyPolish.push(course)
        }
        else if(course.language===4){
          coursesbyTurkish.push(course)
        }
      }
    })
    this.setState({
      languageTag:language,
      coursesbyEnglish:coursesbyEnglish,
      coursesbySpanish:coursesbySpanish,
      coursesbyPortuguese:coursesbyPortuguese,
      coursesbyPolish:coursesbyPolish,
      coursesbyTurkish:coursesbyTurkish,
    })

  }

  getParamsDuration=(duration, flag)=>{
    //console.log("getParamsDuration, myflagCourses---->",duration, this.state.publishedCourses)
    
    let coursesbyDuration=[]
    this.state.publishedCourses.map((course,indexCourse)=>{
      
      if(course.duration!=undefined){
        let durationNumber=''
        if(Number.isInteger(course.duration)===false){
          durationNumber=parseInt(course.duration.split(':')[0])
          console.log("ddddddd",course.duration, durationNumber)
          if(durationNumber>duration[0] && durationNumber<duration[1]){
            coursesbyDuration.push(course)
          }
        }
      }
    })
    this.setState({
      durationTag:flag,
      coursesbyDuration:coursesbyDuration
    })
  }

  getParamsAudiences=(audiences)=>{
    //console.log("getParamsAudiences, myflagCourses---->",audiences, this.state.publishedCourses)
    
    let coursesbyAudiences=[]
    this.state.publishedCourses.map((course,indexCourse)=>{
      if(course.support.length===2){
        //console.log("course.support[0]",course.support)
        //console.log("longitud",course.support[0].length)
        if(Array.isArray(course.support[0])){   
          course.support[0].map((audience, indexAudience)=>{
            if(audience.value==="StudentsGrad" && audience.isChecked===true && audiences.Graduatestudents===true){
              coursesbyAudiences.push(course)
            }
            if(audience.value==="StudentsInfor" && audience.isChecked===true && audiences.Informalstudents===true){
              coursesbyAudiences.push(course)
            }
            if(audience.value==="Teachers" && audience.isChecked===true && audiences.TeachersandProfessors===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="Kids" && audience.isChecked===true && audiences.Preschoolkids===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="post graduate student" && audience.isChecked===true && audiences.Postgraduatestudent===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="pregrade student" && audience.isChecked===true && audiences.Pregradestudent===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="High School Students" && audience.isChecked===true && audiences.HighSchoolStudents===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="Middle School Students" && audience.isChecked===true && audiences.MiddleSchoolStudents===true){
             coursesbyAudiences.push(course)
           }
           if(audience.value==="Elementary School Students" && audience.isChecked===true && audiences.ElementarySchoolStudents===true){
             coursesbyAudiences.push(course)
           }
           if(audience.isChecked===true){
             this.setState({
               audiencesTag:true,
             })
           }
          })
         }
        }
      })
       
    this.setState({
      coursesbyAudiences:coursesbyAudiences
    })


  }
  getParamsTutors=(tutors)=>{
    let coursesbyTutors=[]
    Object.entries(tutors).forEach(([key, value]) => {
      if(value===true){
        this.setState({tutorsTag:true})
        this.state.publishedCourses.filter(course=>{
          course.createdBy.toLowerCase().search(key.toLowerCase()) !=-1?
          coursesbyTutors.push(course)
          :
          undefined
        })
      }     
    });
    //console.log("Resultados de busqueda getParamsTutors",coursesbyTutors)  
    this.setState({
      coursesbyTutors:coursesbyTutors
    })
  }

  getOnline=()=>{ 
    let onlineCourses=[]
    this.state.publishedCourses.map((course,indexCourse)=>{
      if(course.analysis!=undefined){
        if(course.analysis.length!=0){
          if(course.analysis[1]==='online'){
            this.setState({onlineTag:true})
            onlineCourses.push(course)
          }
        }
     }
    })

    this.setState({
      onlineCourses:onlineCourses
    })
    console.log("getOnlineresults", onlineCourses)
  }

  getOnlineFlag=(flag)=>{
    console.log("Bandera Online", flag )
    if(flag===true){
      this.state.generalDetailedFlag=true
      this.getOnline()
    }
    if(flag===false){
      this.setState({
        generalDetailedFlag:false,
        onlineTag:false
      })
    }
  }

  getAccessibleFlag=(flag)=>{
    console.log("Bandera Accesibilidad", flag )
    if(flag===true){
      this.state.generalDetailedFlag=true
      //this.setState(this.state.generalDetailedFlag)
      this.getParamsofSearch()
      this.state.accessibilitie.a11yCog='full'
      this.state.accessibilitie.a11yHear='full'
      this.state.accessibilitie.a11yVis='full'
      this.setState({accessibilitie:this.state.accessibilitie})
    }
    if(flag===false){
      this.setState({generalDetailedFlag:false})
    }
  }

  getGeneralSearch=(text)=>{
    console.log("General Search:", text)
    this.setState({texttoSearch:text})
    this.searchMyCoursesDetailed()
    this.searchSELICoursesDetailed()
  }


  searchMyCoursesDetailed=()=>{
    //put in lowercase te titles of the courses to improve the search
    let titleMyCourses=[]
     this.props.user.profile.courses.map((course, courseIndex)=>{
        let indexRegistered=this.state.publishedCourses.findIndex(coursespub=>coursespub._id===course.courseId)
        if (indexRegistered!=-1){
          titleMyCourses.push(this.state.publishedCourses[indexRegistered])
        }
    }) 
    this.state.mysuscribdedCourses=titleMyCourses
    let myFiltersuscribdedCourses=this.state.mysuscribdedCourses.filter(course => course.title.search(this.state.texttoSearch.toLowerCase()) !=-1);
    this.state.myFiltersuscribdedCourses=myFiltersuscribdedCourses
    this.setState(this.state)
    console.log("Cursos suscritos con titulo y filtrado detailed",titleMyCourses, myFiltersuscribdedCourses )
  }

  searchSELICoursesDetailed=()=>{
    console.log("searchSELICoursesDetailed", this.state, this.props )

    let myFilterSeliCourses=this.state.publishedCourses.filter(course => course.title.search(this.state.texttoSearch.toLowerCase()) !=-1);
    this.state.myFilterSeliCourses=myFilterSeliCourses
    this.setState(this.state)
    console.log("Seli Courses y Filtrados Detailed: ",this.state.publishedCourses, myFilterSeliCourses )
  }

  render() {
    return(
      <div className="courses-dashboard-container">
        {console.log("recarga", this.state)}
        <CourseSearch
          publishedCourses={this.state.publishedCourses}
          getParamsofSearch={this.getParamsofSearch}
          getParamsLanguage={this.getParamsLanguage}
          getParamsDuration={this.getParamsDuration}
          getParamsAudiences={this.getParamsAudiences}
          publishedCourses={this.state.publishedCourses}
          getParamsTutors={this.getParamsTutors}
          getOnlineFlag={this.getOnlineFlag}
          getAccessibleFlag={this.getAccessibleFlag}
          getGeneralSearch={this.getGeneralSearch}
        />
        {
          this.state.generalDetailedFlag===false?
          <div>
            {this.paperSearchMyCourses('My Courses', this.state.myFiltersuscribdedCourses)}
            {this.paperSearchSeli('SELI Courses', this.state.myFilterSeliCourses)}
            {this.paperSupportNews('Support')}
            {this.paperSupportNews('News')}
          </div>
          :
          <div>
             <React.Fragment>  
              {//for  OnlineCourses
                this.state.onlineTag===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('100% online courses', this.state.onlineCourses)}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment>
            <React.Fragment>
              {// foraccessibilitie Tag
                this.state.accessibilitie.a11yCog==='full'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Fully Cognitive', this.state.fullyCognitive)}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yCog==='partial'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Partially Cognitive', this.state.fullyCognitive.concat(this.state.partialCognitive))}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yCog==='no-filter'?
                <React.Fragment>
                  {this.paperSearchMyCourses('All Cognitive courses (even inaccessible courses)', this.state.fullyCognitive.concat(this.state.partialCognitive,this.state.inaccessibleCognitive))}
                </React.Fragment>
                :
                undefined
              }

              {
                this.state.accessibilitie.a11yHear==='full'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Fully Hearing', this.state.fullyHearing)}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yHear==='partial'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Partially Hearing', this.state.fullyHearing.concat(this.state.partialHearing))}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yHear==='no-filter'?
                <React.Fragment>
                  {this.paperSearchMyCourses('All Hearing courses (even inaccessible courses)', this.state.fullyHearing.concat(this.state.partialHearing,this.state.inaccessibleCognitive))}
                </React.Fragment>
                :
                undefined
              }

              {
                this.state.accessibilitie.a11yVis==='full'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Fully Visual', this.state.fullyVisual)}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yVis==='partial'?
                <React.Fragment>
                  {this.paperSearchMyCourses('Partially Visual', this.state.fullyVisual.concat(this.state.partialVisual))}
                </React.Fragment>
                :
                undefined
              }
              {
                this.state.accessibilitie.a11yVis==='no-filter'?
                <React.Fragment>
                  {this.paperSearchMyCourses('All Visual courses (even inaccessible courses)', this.state.fullyVisual.concat(this.state.partialVisual,this.state.inaccessibleCognitive))}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment>
            
            <React.Fragment>  
              {//for language tab
                this.state.languageTag.english===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses in English', this.state.coursesbyEnglish)}
                </React.Fragment>
                :
                undefined
              }
              {//for language tab
                this.state.languageTag.spanish===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses in Spanish', this.state.coursesbySpanish)}
                </React.Fragment>
                :
                undefined
              }
              {//for language tab
                this.state.languageTag.portugues===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses in Portuguese', this.state.coursesbyPortuguese)}
                </React.Fragment>
                :
                undefined
              }
              {//for language tab
                this.state.languageTag.polish===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses in Polish', this.state.coursesbyPolish)}
                </React.Fragment>
                :
                undefined
              }
              {//for language tab
                this.state.languageTag.turkish===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses in Turkish', this.state.coursesbyTurkish)}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment>

            <React.Fragment>  
              {//for  duration
                this.state.durationTag===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Courses by time', this.state.coursesbyDuration)}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment>  

            <React.Fragment>  
              {//for  Audiences
                this.state.audiencesTag===true?
                <React.Fragment>
                  {this.paperSearchMyCourses("Course's Target Audience", this.state.coursesbyAudiences)}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment> 

            <React.Fragment>  
              {//for  Tutors
                this.state.tutorsTag===true?
                <React.Fragment>
                  {this.paperSearchMyCourses('Search by tutor', this.state.coursesbyTutors)}
                </React.Fragment>
                :
                undefined
              }
            </React.Fragment> 

           
          </div>
        } 
      </div>
    )
  }
}
