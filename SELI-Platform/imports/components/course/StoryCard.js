import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SchoolIcon from '@material-ui/icons/School';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from 'react-reveal/Fade';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import CommentIcon from '@material-ui/icons/Comment';

import Loading from '../tools/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Comment from '../../components/student/comments/Comment';

import {Comments} from '../../../lib/CommentsCollection';
import { StudentLog } from '../../../lib/StudentLogCollection';
import { Activities } from '../../../lib/ActivitiesCollection';
import { withStyles } from '@material-ui/core/styles';
import { data } from 'jquery';
var ColorThief = require('color-thief');

const useStyles =theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16)
		}
	},
	card: {
		maxWidth: 345,
		//  maxHeight: 450,
		display: "tabel-cell",
		paddingRight: "1em"
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	searchbar: {
		//padding: '2px 4px',
		display: "flex",
		alignItems: "center",
		maxWidth: "95vw",
		minWidth: "95vw",
		background: "black",
		"& *": {
			color: "white"
		}
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
});

class StoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      subscribed: false,
      UsersStoryUserName: 'abc',
      StoryImageURL: '',
      description: '',
      descriptionScenes: '',
      descriptionStories: '',
      Categories: [],
      categoryBool: false,
      categoryType:'',
      myFilterSeliCourses:[],
      publishedCourses:[],
      language:'',
      texttoSearch:'',
      accessibilitie:{},
      generalDetailedFlag:false,
      courses: [],
      mysuscribdedCourses:[],
      myFiltersuscribdedCourses:[],
      
      
      flagCourses:false,
      myFilterThreeSeli:[],
      myflagCourses:false,
      generalDetailedFlag:false,
      myFilterSeliCourses:[],
      denemearray:[],  
      myFilterThree:[],
    }
    if(this.props.course.categories !== undefined) {
    var categoryNames = this.props.course.categories.map((category) => category);
    for (var i = 0; i < categoryNames.length; i++) {
    if(categoryNames[i]) {
    var categoryInfo = categoryNames[i];
    if(categoryInfo !== null){
      this.state.Categories.push(categoryInfo) ;
      }
    }
  }
}

    var labelname = this.props.course.activity.name;
    this.state.label= labelname.toString();
    var UserIDInfo = this.props.course.activity.user;
    let UsersStoryId= Meteor.users.findOne({_id: UserIDInfo});
    if(UsersStoryId != undefined) {
      this.state.UsersStoryUserName= UsersStoryId.username;

    }

  }

  setLanguage = (option) => {
    let language = this.props.language;
    if (option === 'Portuguese (PT)') {
      Session.set({language: portuguese});
      language = portuguese;
    }
    else if (option === 'English (US)') {
      Session.set({language: english});
      language = english;
    } 
    else if (option === 'Spanish (ES)') {
      Session.set({language: spanish});
      language = spanish;
    }
    else if (option === 'Polish (PL)') {
      Session.set({language: polish});
      language = polish;
    }
    else if (option === 'Turkish (TR)') {
      Session.set({language: turkish});
      language = turkish;
    }
    this.setState({
      language: language,
    });
  }

  componentDidMount() {
    this.getImageColors();
    
    // this.getKeyWords();
    // this.checkSubscriptions();
    this.getLanguageforDescription()
    
  }
  componentDidUpdate(prevProps){
    if (prevProps.language.languageIndex !== this.props.language.languageIndex){
      this.getLanguageforDescription();
      this.getImageColors();
    }
    if (prevProps.searchText !== this.props.searchText ){
      if(this.props.searchText){
        this.getImageColors();
      }
    }
    
   

  }

  

  getLanguageforDescription() {
    if(this.props.course.activity.data.map(item => item.description)[0]){
      if(this.props.language.languageIndex == "0"){
      this.state.descriptionStories = this.props.course.activity.data.map(item => item.description.english); 
      }
      if(this.props.language.languageIndex == "1"){
      this.state.descriptionStories = this.props.course.activity.data.map(item => item.description.spanish); 
      }
      if(this.props.language.languageIndex == "2"){
      this.state.descriptionStories = this.props.course.activity.data.map(item => item.description.portuguese); 
      }
      if(this.props.language.languageIndex == "3"){
      this.state.descriptionStories = this.props.course.activity.data.map(item => item.description.polish); 
      }
      if(this.props.language.languageIndex == "4"){
      this.state.descriptionStories = this.props.course.activity.data.map(item => item.description.turkish); 
      }
    }
    else{
      if(this.props.language.languageIndex == "0"){
      var descriptionData = this.props.course.activity.data.map(item => item.scripts)[0];
      var descriptionEnglish = descriptionData.map(a => a.script.english);
      this.state.descriptionStories = descriptionEnglish;
      }
      if(this.props.language.languageIndex == "1"){
      var descriptionData = this.props.course.activity.data.map(item => item.scripts)[0];
      var descriptionSpanish = descriptionData.map(a => a.script.spanish);
      this.state.descriptionStories = descriptionSpanish;
    }
      if(this.props.language.languageIndex == "2"){
      var descriptionData = this.props.course.activity.data.map(item => item.scripts)[0];
      var descriptionPortuguese = descriptionData.map(a => a.script.portuguese);
      this.state.descriptionStories = descriptionPortuguese;
    }
      if(this.props.language.languageIndex == "3"){
      var descriptionData = this.props.course.activity.data.map(item => item.scripts)[0];
      var descriptionPolish = descriptionData.map(a => a.script.polish);
      this.state.descriptionStories = descriptionPolish;
    }
      if(this.props.language.languageIndex == "4"){
      var descriptionData = this.props.course.activity.data.map(item => item.scripts)[0];
      var descriptionTurkish = descriptionData.map(a => a.script.turkish);
      this.state.descriptionStories = descriptionTurkish;
    }
    }
    if (this.state.descriptionStories == null ){
      this.state.description = this.state.descriptionScenes;
    }else{
      this.state.description = this.state.descriptionStories;
    }
  }
  // getKeyWords = () => {
  //   let keyWords = this.props.course.keyWords;
  //   let label = '';
  //   keyWords.map((keyWord, index) => {
  //     label = label + keyWord;
  //     index + 1 === keyWords.length ? undefined : label = label + ", "
  //   })
  //   this.setState({
  //     label: label,
  //   });
  // }

  getImageColors() {
    var colorThief = new ColorThief();
    var courseImage = new Image(500, 500);
    var DataType = this.props.course.activity.data.map(data => data.type);

    if(DataType[0]) {
      this.props.course.activity.data.map((data, index) => {
        var obje = data.image;
        this.state.StoryImageURL = obje.link;
      });
      var courseImageURLroute = this.state.StoryImageURL;

    }else {
      this.props.course.activity.data.map((data, index) => {
        var obje = data.images.map(item => item.file.link);
        this.state.StoryImageURL = obje;
    
    });
    courseImageURLroute = this.state.StoryImageURL;

  }
    courseImage.src = courseImageURLroute;


    let self = this;
    courseImage.addEventListener('load', function() {
      let mainColor = colorThief.getColor(courseImage);
      let mainContrastColor = self.getContrastColor(self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]));
      mainColor = self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]);
      mainColor = `#${mainColor}`;
      mainContrastColor = `#${mainContrastColor}`;
      self.setState({
        mainColor: mainColor,
        mainContrastColor: mainContrastColor,
      })
    });
  }

  rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  fullColorHex(r, g, b) {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red+green+blue;
  };

  getContrastColor(hexColor) {
    var r = parseInt(hexColor.substr(0, 2), 16);
    var g = parseInt(hexColor.substr(2, 2), 16);
    var b = parseInt(hexColor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#212121' : '#FFFFFF';
  }

  componentWillReceiveProps() {
    // this.checkSubscriptions();
  }

  SelectCategoriesScenes=()=>{
    this.state.publishedCourses = Activities.find({'activity.type': { $in: [ "storytelling", "storytelling-time" ] },}).fetch();

    for(var i=0; i < this.state.publishedCourses.length; i++)
    {
    if(this.state.publishedCourses[i].categories){
     this.state.categoryBool = true;
    }else{
     i = this.state.publishedCourses.length + 2;
     this.state.categoryBool = false;
    }
    }
     if(this.state.categoryBool !== false)
     {
     if(this.state.categoryType =='culture'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('culture'));
       
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
    
 
     }
     if (this.state.categoryType =='education'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('education'));
         
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='engineering'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('engineering'));
           
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
    
     }
     if (this.state.categoryType =='inclusion'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('inclusion'));
             
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='life'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('life'));
            
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='science'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('science'));
              
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='school'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('school'));
                 
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='sports'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('sports'));
                     
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='technology'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('technology'));
                      
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
     if (this.state.categoryType =='university'){
     let SeliCategories = this.state.publishedCourses.filter(course => course.categories.includes('university'));
                        
     this.state.myFilterSeliCourses=(SeliCategories);
     this.state.myFilterSeliCourses.sort(function (a, b) {
       if (a.title > b.title) {
         return 1;
       }
       if (a.title < b.title) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     }
   }
     this.setState(this.state)
   
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
      // let myFiltersuscribdedCoursesSub=this.state.mysuscribdedCourses.filter(course => course.script.english.search(this.props.texttoSearch.toLowerCase()) !=-1);
      this.state.myFiltersuscribdedCourses=myFiltersuscribdedCourses.concat()
      //ordena por alfabeto
      this.state.myFiltersuscribdedCourses.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      this.setState(this.state)
      //console.log("Cursos suscritos con titulo y filtrado",titleMyCourses, myFiltersuscribdedCourses )
    }else{//if the search is undefined or empty
      this.state.myFiltersuscribdedCourses=this.state.mysuscribdedCourses
      this.state.myFiltersuscribdedCourses.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      this.setState(this.state)
    }
  }

  searchSELICourses=()=>{
    console.log("searchSELICourses", this.state, this.props )
    if(this.props.texttoSearch != undefined){
      console.log(this.state.publishedCourses);
      let myFilterSeliCourses=this.state.publishedCourses.filter(course => course.activity.name.search(this.props.texttoSearch.toLowerCase()) !=-1);
    this.state.myFilterSeliCourses=myFilterSeliCourses
    this.setState(this.state)
   // console.log("Seli Courses y Filtrados: ",this.state.publishedCourses, myFilterSeliCourses )
    }else{//if the search is undefined or empty
      this.state.myFilterSeliCourses=this.state.publishedCourses
      this.state.myFilterSeliCourses.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      this.setState(this.state)
    } 
  }

  checkSubscriptions = () => {
    let subscribed = this.props.userCourses.findIndex(course => course.courseId === this.props.course._id);
    if (subscribed > -1){
      this.setState({
        subscribed: true,
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  showComments = () => {
    this.setState({
      open: true,
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let comments = Comments.find({story: this.props.course._id, show: true}).fetch();
        if (comments.length) {
          this.setState({
            commentResults: true,
            comments: comments,
            loading: false,
          });
        }
        else {
          this.setState({
            commentResults: false,
            loading: false,
          });
        }
      });
    })
  }

  redirect = url => {
    this.props.history.push({
      pathname: url,
      state: {
        language: this.props.language,
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      
          <Card className="course-card">
            <CardActionArea >
              <CardHeader
                avatar={
                  <Avatar
                    style={{backgroundColor: this.state.mainColor, color: this.state.mainContrastColor}}
                    aria-label="recipe"
                    className="course-card-avatar"
                  >
                     <h2>{this.props.course.title.charAt(0).toUpperCase()}</h2>
                  </Avatar>
                }
                className="course-card-header"
                title={
                  <h2 className="MuiTypography-root MuiCardHeader-title MuiTypography-body2 MuiTypography-displayBlock">{this.props.course.activity.name}</h2>
                }
                subheader={
                  <h3 className="MuiTypography-root MuiCardHeader-subheader MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">{this.props.course.activity.name}</h3>
                }
              /> 
              <CardMedia
                className={classes.media}
                image={this.state.StoryImageURL}
                title={this.props.course.activity.name}                
              />
              <CardContent >
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.state.description}
                </Typography>
                <Typography className="course-card-extra-information" variant="overline" color="textSecondary" component="p">
                  {`${this.props.language.author}: ${this.state.UsersStoryUserName}`}
                </Typography>
                <Typography className="course-card-extra-information" variant="overline" color="textSecondary" component="p">
                  {`${this.props.language.Categories} :`}
                  <Button
                        color="primary"
                        className="categoryButtons"
                        variant="outlined"
                        onClick={() => this.SelectCategoriesScenes( this.state.categoryType = this.props.course.categories[0].toString())}
                        >{this.props.course.categories[0]}</Button>
                        <Button
                        color="primary"
                        className="categoryButtons"
                        variant="outlined"
                        onClick={() => this.SelectCategoriesScenes( this.state.categoryType = this.props.course.categories[1].toString())}
                        >{this.props.course.categories[1]}</Button>
                        <Button
                        color="primary"
                        className="categoryButtons"
                        variant="outlined"
                        onClick={() => this.SelectCategoriesScenes( this.state.categoryType = this.props.course.categories[2].toString())}
                        >{this.props.course.categories[2]}</Button> 
                  
                </Typography>
              </CardContent>
              <CardActions  disableSpacing>
                <Link className="button-link MuiButtonBase-root MuiButton-root MuiButton-outlined course-card-button"
                  target="_blank"
                  to={{
                    pathname: "/story",
                    hash: this.props.course._id,
                    state: { fromDashboard: true },
                  }}
                  onClick={() => 
                    {
                      StudentLog.insert({ "UserId": Meteor.userId(), "CourseId" : this.props.course._id, 
                      "Datetime": new Date(), "Action": "Story Preview" });
                    }}
                >
                  {this.props.language.storyPreview}
                </Link>
                {/* {
                  !this.state.subscribed ?
                    <Tooltip title={this.props.language.subscribeJoin}>
                      <IconButton
                        disabled={this.props.disabled}
                        onClick={() => this.props.subscribe(this.props.course._id)}
                        className="course-card-icon-button"
                        aria-label="join course"
                      >
                        <SchoolIcon className="course-card-icon"/>
                      </IconButton>
                    </Tooltip>
                  :
                  <Tooltip title={this.props.language.unsubscribeToolti}>
                    <IconButton
                      className="course-card-icon-button"
                      disabled={this.props.disabled}
                      onClick={() => this.props.unsubscribe(this.props.course._id)}
                      aria-label="left course"
                    >
                      <UnsubscribeIcon className="course-card-icon"/>
                    </IconButton>
                  </Tooltip>
                } */}
                <Tooltip title={this.props.language.courseCommentsTooltip}>
                  <IconButton
                    className="course-card-icon-button"
                    onClick={() => this.showComments()}
                    aria-label="left course"
                  >
                    <CommentIcon className="course-card-icon"/>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </CardActionArea>
          </Card>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="comments-dialog"
          disableBackdropClick={true}
        >
          <DialogTitle className="comment-dialog-title">
            {this.props.language.comments}
          </DialogTitle>
          <DialogContent className="comments-dialog-content">
            {
              this.state.loading ?
                <Loading message={this.props.language.loadingComments}/>
              :
              <div>
                {
                  this.state.commentResults ?
                    <div className="comments-result-container">
                      {
                        this.state.comments.map((comment, index) => {
                          return(
                            <Comment
                              comment={comment}
                              commentOf={this.props.language.commentOf}
                            />
                          )
                        })
                      }
                    </div>
                  :
                  <div className="comments-result-container">
                    <div className="center-row">
                      <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                        {this.props.language.noCommentsText}
                      </DialogContentText>
                    </div>
                    <div className="center-row">
                      <CommentIcon className="comments-result-icon"></CommentIcon>
                    </div>
                  </div>
                }
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default  withStyles(useStyles)(StoryCard)