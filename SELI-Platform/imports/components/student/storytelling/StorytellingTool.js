import React, { Component } from 'react';
import AudioRecorder from './AudioRecorder';
import AudioPreview from './AudioPreview';
import ImagePreview from './ImagePreview';
import FileUpload from '../../files/FileUpload';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import StorytellingStart from './StorytellingStart';
import StorytellingScene from './StorytellingScene';
import StorytellingEnd from './StorytellingEnd';
import StorytellingPlayer from './StorytellingPlayer';

import { Activities } from '../../../../lib/ActivitiesCollection';
import { Feedback }   from '../../../../lib/FeedbackCollection';
import { Courses } from '../../../../lib/CourseCollection';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


import { 
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  TwitterShareButton, TwitterIcon
} from "react-share";

import { Link } from "react-router-dom";


const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 920,
    height: 650,
  },
});

 class StorytellingTool extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      story: {
        name: "",
        published: false,
        activityId: undefined,
        courseId: undefined,
        user: Meteor.userId(),
        creationDate: new Date(),
        nodes: [
          {
            type: 'start',
            name: `${this.props.language.start}`,
            description: '',
            image: '',
            audio: '', //change for allow save without end the story
            ordinal: 0,
            _id: 1,
          },
        ],
        isPublic: true,
      },
      saved: undefined,
      selectedNode: 0,
      courses: [],
      activities: [],
      audioType: 'record',
      stateconsulta: false,
      isyes:false,
      isno:false,
      show: true,
      dataImages: [],
      dataImages1: [],
      dataImagesName:[],
      dataImagesId:[],
      dataAudio : [],
      dataAudio1 :[],
      dataAudioName: [],
      dataAudioId:[],
      visible:false,
      img:[]  
    }
  }


  setVisible =(estado)=>{  //Para vizualizar las imagenes en react vizualizer
    this.setState({
      visible: false,
      
    })
  }

  handleClickImages=(files)=>{
    console.log("Link de las imagenes, nombre e id")
    console.log(files)  //aqui se debe llamr al metodo getimagefielinformationReuse
    
  }
  
  filterRepetidos=(data)=>{
    let filteredArr = data.reduce((acc, current) => {
      let x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
   
    const filteredItems = filteredArr.filter(item => item != "")
  
    console.log("Filtradoooooooooo", filteredItems)
  
    return filteredItems //retorna sin valores repetidos de audio o video
  }

  handleImagesAudio=(value)=>{
    this.UpdateImagesAudio()
    console.log("Antes", this.state.dataImages)
    let Imagesfilter=this.filterRepetidos(this.state.dataImages)
    let Audiofilter=this.filterRepetidos(this.state.dataAudio)

    
    
    console.log("DespuesfiltradoImages", Imagesfilter)
    console.log("DespuesfiltradoAudio", Audiofilter)
    this.setState({
      dataImages1:Imagesfilter,
      dataAudio1:Audiofilter
    })
    
     
    if (value === "images") {
      this.setState({
        action: "reuse",
        open: true,
      })
     // console.log("Despuessatet", this.state.dataImages)
    }
    else{
      console.log("audio")
      this.setState({
        action: "reuseAudio",
        open: true,
      })
    }
    
  }


  componentDidMount() {
    if (this.props.storyToEdit !== undefined) {
      this.setState({
        story: {
          name: this.props.storyToEdit.activity.name,
          published: this.props.storyToEdit.activity.published,
          activityId: this.props.storyToEdit.activity.activityId,
          courseId: this.props.storyToEdit.activity.courseId,
          user: this.props.storyToEdit.activity.user,
          creationDate: this.props.storyToEdit.activity.date,
          nodes: this.props.storyToEdit.activity.data,
          isPublic: this.props.storyToEdit.activity.public,
        },
        saved: this.props.storyToEdit._id,
      })
    }
     
    this.UpdateImagesAudio()
  }

  UpdateImagesAudio= () =>{ 
    this.setState({
      dataImages:[],
      dataAudio:[]
    })
    console.log("Las Imagenes y Audios ya usados")
    let dataImageSound=Activities.find({}).fetch()
    console.log("DATA-IMAGE-SOUND")
    console.log(dataImageSound)
    dataImageSound.map((data)=>{
      let ImageSound = data.activity.data
      ImageSound.map((data2)=>{
       let dataImg=data2.image       //let dataImgName=data2.image.link
       let dataAud=data2.audio 
      
       
      this.state.dataImages.push(dataImg)
       this.state.dataAudio.push(dataAud)
      /* this.setState(prevState => ({
        dataImages: [...prevState.dataImages, dataImg],
        dataAudio: [...prevState.dataAudio, dataAud]
        
      })) */
      
      })
        
    })
    
     console.log("esatdo de las imags" , this.state.dataImages)
    //METODO PARA ELIMINAR REPETIDOS
    
            }
  

  handleClose = () => {
    this.setState({ open: false });
  }
  handleClosepublish = () => {
    this.setState({ openpublish: false });
  }

  handleChange = name => event => {
    let story = this.state.story;
    let isPublic = this.state.isPublic;
    if (name === 'storyName') {
      story.name = event.target.value;
    }
    if (name === 'name') {
      story.nodes[this.state.selectedNode].name = event.target.value;
    }
    if (name === 'description') {
      story.nodes[this.state.selectedNode].description = event.target.value;
    }
    if (name === "public") {
      story.isPublic = !story.isPublic;
    }
    this.setState({
      story: story,
    })
  }


  addSingleNode = (index) => {
    let story = this.state.story;
    let newNode = Math.random();
    const image = story.nodes[index].image
    const node = {
      type: 'scene',
      name: `${this.props.language.newScene} ${story.nodes.length}`,
      description: '',
      image: image,
      audio: '',
      ordinal: index + 1,
      _id: newNode,
    };
    story.nodes.splice(index + 1, 0, node);
 
    this.setState({
      story: story,
      selectedNode: story.nodes.length - 1,
    });
  }

  addEndNode = (index) => {
    let story = this.state.story;
    let newNode = Math.random();
    story.nodes.push({
      type: 'end',
      name: `${this.props.language.end}`,
      description: '',
      image: '',
      audio: '',
      ordinal: story.nodes.length,
      _id: newNode,
    });
    this.setState({
      story: story,
      selectedNode: story.nodes.length - 1,
    });
  }

  selectNode = (index) => {
    this.setState({
      selectedNode: index,
    });
  }

  openDialog = (action) => {
    this.setState({
      action: action,
      open: true,
    })
  }

  deleteNode = () => {
    let story = this.state.story;
    let selectedNode = this.state.selectedNode;
    if (story.nodes.length === 3) {
      if (story.nodes[2].type === "end" && story.nodes[1].type === "scene") {
        this.props.handleControlMessage(true, this.props.language.storyMustHave)
        this.handleClose();
        return false;
      }
    }
    story.nodes.splice(selectedNode, 1);
    if (selectedNode >= story.nodes.length) {
      selectedNode--;
    }
    this.setState({
      selectedNode: selectedNode,
      story: story,
    }, () => {
      this.handleClose();
    });
  }

  getAudioFileInformation(file){
    let story = this.state.story;
    console.log("SELECTED NODE")
    console.log(this.state.selectedNode)
    story.nodes[this.state.selectedNode].audio = file;
    this.setState({
      story: story,
    });
    console.log("Audio informacion..............")
    console.log(file)
    console.log(this.state.story)
  }

  unPickAudioFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].audio = '';
    this.setState({
      story: story,
    });
  }
//esta funcion toma los parametros de vuelta de la funcion upload file tiene el link, nombre e id del nodo.
  getImageFileInformation(file){  
    console.log("file", file)
    let story = this.state.story;
    console.log("selected node",this.state.selectedNode )
    story.nodes[this.state.selectedNode].image = file;
    this.setState({
      story: story,
    });

    console.log("estado", this.state.story)
  }

//el mismo metodo pero para reutilizar las imagenes ya subidas al servidor
getImageFileInformationReuse(file){  
  console.log("datos a reutilizar", file)
  let story = this.state.story;
  console.log("selected node despues de ReUsar",this.state.selectedNode )
  this.handleClose()
  story.nodes[this.state.selectedNode].image = file;
  this.setState({
    story: story,
  });

  console.log("estadodespuesdereutilizar", this.state.story)
}
getImageFileInformationReuseAudio(fileAudio){
  console.log("datos a reutilizar", fileAudio)
  let story = this.state.story;
  console.log("selected node despues de ReUsar",this.state.selectedNode )
  this.handleClose()
  story.nodes[this.state.selectedNode].audio = fileAudio;
  this.setState({
    story: story,
  });

  console.log("estadodespuesdereutilizar", this.state.story)

}
 


unPickImageFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].image = '';
    this.setState({
      story: story,
    });
  }

  validateStory = () => {
    let story = this.state.story;
    if (story.nodes.length < 3) {
      this.props.handleControlMessage(true, this.props.language.storyMustHave);
      return false;
    }
    for (var i = 0; i < story.nodes.length; i++) {
      if (story.nodes[i].name === "") {
        this.props.handleControlMessage(true, this.props.language.allScenesMust);
        this.setState({
          selectedNode: i,
          showError: true,
        });
        return false;
      }
      if (story.nodes[i].audio === undefined) {
        this.props.handleControlMessage(true, this.props.allScenesAudio);
        this.setState({
          selectedNode: i,
        });
        return false;
      }
      if (story.nodes[i].image === undefined) {
        this.props.handleControlMessage(true, this.props.allScenesImage);
        this.setState({
          selectedNode: i,
        });
        return false;
      }
    }
    let hasEnd = false;
    for (var i = 0; i < story.nodes.length; i++) {
      if (story.nodes[i].type === 'end') {
        hasEnd = true;
      }
    }
    if (!hasEnd) {
      this.props.handleControlMessage(true, "Your story must have an end");
      return false;
    }
    return true;
  }

  handleSaveStory = () => {
    if (this.validateStory()) {
      this.setState({
        action: "save",
        open: true,
      })
    }
  }

  saveStory = () => {
    // console.log("esto se va a guradar......al final")
    // console.log(this.state)
   
    
    
    // var selector=true
    // this.state.story.nodes.map((elemento)=>{
    //   console.log("cada elemento")
    //   var audio0={_id:"8goGZhHF9qcmC9YfK",name:"audio-recorded-Fri Dec 06 2019.wav",link:"https://seli.uazuay.edu.ec/audio1.wav"}
    //   var audio1={_id:"8goGZhHF9qcmC9YfK",name:"audio-recorded-Fri Dec 06 2019.wav",link:"https://seli.uazuay.edu.ec/audio2.wav"}
    //   console.log("selector")
    //   console.log(selector)
    //   elemento.audio==='' ? 
    //       selector===true ?
    //       elemento.audio=audio0
    //       :
    //       elemento.audio=audio1

    //   :
    //   console.log("lleno")
    //   selector= !selector
    // })
    // console.log("state modificado")
    // console.log(this.state)

    if (this.state.saved) {
      if (this.state.story.name !== "") {
        console.log("DATOS A GUARDAR....")
        console.log(this.state.story.name, this.state.story.nodes, this.state.story.isPublic )
        Activities.update(
          { _id: this.state.saved},
          { $set: {
            'activity.name': this.state.story.name,
            'activity.data': this.state.story.nodes,
            'activity.public': this.state.story.isPublic,
          }}
          , () => {
            this.props.handleControlMessage(true, this.props.language.storySaved, true, "stories", this.props.language.seeList);
            this.handleClose();
          }
        )
      }
      else {
        this.handleControlMessage(true, this.props.language.storyNameText);
      }
    }
    else {
      if (this.state.story.name !== "") {
        Activities.insert({
          activity: {
            name: this.state.story.name,
            data: this.state.story.nodes,
            type: "storytelling",
            public: this.state.story.isPublic,
            activityId: this.state.story.activityId,
            date: this.state.story.creationDate,
            user: this.state.story.user,
            course: this.state.story.courseId,
          }
        }, () => {
          this.props.handleControlMessage(true, this.props.language.storySaved, true, "stories", this.props.language.seeList);
          this.handleClose();
        })
      }
      else {
        this.handleControlMessage(true, this.props.language.storyNameText);
      }
    }
  }

  handlePublishStory = () => {
    if (this.validateStory()) {
      this.setState({
        action: "publish",
        open: true,
      })
    }
  }

  



  showPreview = () => {
    if (this.validateStory()) {
      this.setState({
        showPreview: true,
      });
    }
  }

  handleReturn = () => {
    this.setState({
      showPreview: false,
    });
  }

  handlePublishOnCourse = () => {
    let courses = [];
    this.props.user.profile.courses.map(course => {
      courses.push(course.courseId)
    });
    courses = Courses.find({_id: {$in: courses}}).fetch();
    this.setState({
      action: "publishOnCourse",
      open: true,
      courses: courses,
    })
  }

  handlePublishAsActivity = () => {
    let courses = [];
    let activities = [];
    this.props.user.profile.courses.map(course => {
      courses.push(course.courseId)
    });
    courses = Courses.find({_id: {$in: courses}}).fetch();
    courses.map(course => {
      if (course.organization.subunit) {
        course.program.map(unit => {
          unit.lessons.map(subunit => {
            subunit.items.map(item => {
              if (item.type === "activity" && item.attributes.type === "storyboard") {
                for (var i = 0; i < this.props.user.profile.courses.length; i++) {
                  for (var j = 0; j < this.props.user.profile.courses[i].toResolve.length; j++) {
                    if (this.props.user.profile.courses[i].toResolve[j]._id === item.id && !this.props.user.profile.courses[i].toResolve[j].resolved) {
                        activities.push({
                          course: course.title,
                          source: `${unit.name} - ${subunit.name}`,
                          courseId: course._id,
                          activityId: item.id,
                        });
                    }
                  }
                }
              }
            })
          })
        })
      }
      else {
        course.program.map(unit => {
          unit.items.map(item => {
            if (item.type === "activity" && item.attributes.type === "storyboard") {
              for (var i = 0; i < this.props.user.profile.courses.length; i++) {
                for (var j = 0; j < this.props.user.profile.courses[i].toResolve.length; j++) {
                  if (this.props.user.profile.courses[i].toResolve[j]._id === item.id && !this.props.user.profile.courses[i].toResolve[j].resolved) {
                      activities.push({
                        course: course.title,
                        source: unit.name,
                        courseId: course._id,
                        activityId: item.id,
                      });
                  }
                }
              }
            }
          })
        })
      }
      this.setState({
        activities: activities,
        courses: courses,
        action: "publishAsActivity",
        open: true,
      })
    })
  }

  handlePublishOnSocialNetwork = () => {
    const shareUrl = `${window.origin}/story#${this.state.saved}`
    this.setState({
      shareUrl: shareUrl,
      title: this.props.language.publishOnSocialNetwork,
      action: 'publishOnSocialNetwork',
      openpublish: true,
    })
  }

  publishOnCourse = (course) => {
    Activities.update(
      { _id: this.state.saved},
      { $set: {
        'activity.name': this.state.story.name,
        'activity.data': this.state.story.nodes,
        'activity.public': this.state.story.isPublic,
        'activity.courseId': course,
      }}
      , () => {
        this.props.handleControlMessage(true, this.props.language.storyPublished);
        this.handleClose();
      }
    )
    this.setState({
      action: 'publishOnCourse',
      openpublish: true,
    })
  }

  publishAsActivity = (course, activity) => {
    Activities.update(
      { _id: this.state.saved},
      { $set: {
        'activity.name': this.state.story.name,
        'activity.data': this.state.story.nodes,
        'activity.public': this.state.story.isPublic,
        'activity.courseId': course,
        'activity.activityId': activity,
      }}
      , () => {
        this.completeActivity(activity, this.props.language.storySent, course);
      }
    )
  }

  handleyes = () => {
    this.setState({
      isyes: true,
      show: false,
      openpublish: true,
      open: false,
      action: "boxpubshow"
    })
    ;
  }
  
  handleno = () => {
    this.setState({
      isno: true,
      show: false,
      action:"nopublish"
  })}

  completeActivity = (id, label, courseId) => {
    let courses = this.state.courses;
    let courseIndex = courses.findIndex(course => course._id === courseId);
    let toComplete = this.props.user.profile.courses[courseIndex].toComplete;
    let toResolve = this.props.user.profile.courses[courseIndex].toResolve;
    for (var i = 0; i < toResolve.length; i++) {
      if (toResolve[i]._id === id) {
        toResolve[i].resolved = true;
        break;
      }
    }
    let progress = this.calculateProgress(toComplete, toResolve, courses[courseIndex].organization.subunit);
    this.setState({
      toResolve: toResolve,
      progress: progress,
    }, () => {
      Meteor.call(
        "CompleteActivity", Meteor.userId(),
        this.state.toResolve,
        courseId,
        progress,
        (error, response) =>  {
          if (!error) {
            this.props.handleControlMessage(true, `${label}`);
            this.handleClose();
          }
      });
    });
  }

  calculateProgress = (toComplete, toResolve, hasSubunit) => {
    let total;
    if (hasSubunit) {
      let totalSubunits = 0;
      for (var i = 0; i < toComplete.length; i++) {
        for (var j = 0; j < toComplete[i].subunits.length; j++) {
          totalSubunits++;
        }
      }
      total = totalSubunits + toResolve.length;
    }
    else {
      total = toComplete.length + toResolve.length;
    }
    let unitPercentage  = parseFloat(100/total);
    let progress = 0;
    if (hasSubunit) {
      toComplete.map(completed => {
        completed.subunits.map(subunit => subunit ? progress += unitPercentage : undefined)
      });
    }
    else {
      toComplete.map(completed => completed ? progress += unitPercentage : undefined);
    }
    toResolve.map(activity => activity.resolved ? progress += unitPercentage : undefined);
    progress = progress.toFixed(2);
    if (progress === 99.99) {
      progress = 100;
    }
    parseInt(progress) === 100 ? this.createCertificate() : undefined
    return progress;
  }

  arrayMoveMutate = (array, from, to) => {
    const startIndex = to < 0 ? array.length + to : to;
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  };

  changeNodeOrdinal(index, newIndex) {
    console.log('changeNodeOrdinal ' + index + '  ' +  newIndex);

    let story = this.state.story;
    const fromNode = story.nodes[index];
    const toNode = story.nodes[newIndex];
    // change ordinals
    fromNode.ordinal = newIndex;
    toNode.ordinal = index;

    let selectedNode = this.state.selectedNode;
    if (selectedNode === index) {
      selectedNode = newIndex;
    } else if (selectedNode === newIndex) {
      selectedNode = index;
    }
    
    this.arrayMoveMutate(story.nodes, index, newIndex);

    this.setState({
      story: story,
      selectedNode: selectedNode
    });    
  }

  moveNodeUp(index) {
    this.changeNodeOrdinal(index, index - 1);
  }
 
  moveNodeDown(index) {
    this.changeNodeOrdinal(index, index + 1);
  }

  


  selectAudioType = (newValue) => {
    this.setState({
      audioType: newValue
    })
  };

  handleOnDragStart = (e) => {
    e.preventDefault()
  }


  render() {
    const { classes } = this.props;
    return(
      <div>
        {
          !this.state.showPreview ?
            <div className="storytelling-tool-container">
              <div className="storytelling-work-area">
                <h2 className="storytelling-work-area-title">{this.props.language.storyFlow}</h2>
                {
                  this.state.story.nodes.length >= 2 ?
                    <Button
                      color="primary"
                      className="storytelling-work-preview-button"
                      onClick={() => this.showPreview()}
                    >
                      {this.props.language.storyPreview}
                    </Button>
                  :
                  undefined
                }
                {
                  this.state.story.nodes.map((node, index) => {
                    return(
                      <React.Fragment>
                        {
                          node.type === 'start' ?
                            <StorytellingStart
                              node={node}
                              nodes={this.state.story.nodes}
                              index={index}
                              selectedNode={this.state.selectedNode}
                              addSingleNode={this.addSingleNode.bind(this)}
                              selectNode={this.selectNode.bind(this)}
                            />
                          :
                          undefined
                        }
                        {
                          node.type === 'scene' ?
                            <StorytellingScene
                              node={node}
                              nodes={this.state.story.nodes}
                              index={index}
                              selectedNode={this.state.selectedNode}
                              addSingleNode={this.addSingleNode.bind(this)}
                              addEndNode={this.addEndNode.bind(this)}
                              selectNode={this.selectNode.bind(this)}
                              moveNodeUp={this.moveNodeUp.bind(this)}
                              moveNodeDown={this.moveNodeDown.bind(this)}
                            />
                          :
                          undefined
                        }
                        {
                          node.type === 'end' ?
                            <StorytellingEnd
                              node={node}
                              nodes={this.state.story.nodes}
                              index={index}
                              selectedNode={this.state.selectedNode}
                              selectNode={this.selectNode.bind(this)}
                            />
                          :
                          undefined
                        }
                      </React.Fragment>
                    )
                  })
                }
              </div>
              <div className="storytelling-menu-container">
                <div className="storytelling-menu-header">
                  <h3 className="storytelling-menu-title">
                    <React.Fragment>
                      {
                        this.state.story.nodes[this.state.selectedNode].type === 'start' ?
                          this.props.language.beginningOfTheStory
                        :
                        undefined
                      }

                      
                      {
                        this.state.story.nodes[this.state.selectedNode].type === 'scene' ?
                          <React.Fragment>
                            {`${this.props.language.scene} ${this.state.story.nodes[this.state.selectedNode].ordinal}`}
                          </React.Fragment>
                        :
                        undefined
                      }
                      {
                        this.state.story.nodes[this.state.selectedNode].type === 'end' ?
                          <React.Fragment>
                            {this.props.language.endOfStory}
                          </React.Fragment>
                        :
                        undefined
                      }

                    </React.Fragment>
                  </h3>
                  <div className="center-row">
                    <Button
                      className="storytelling-media-button"
                      variant="outlined"
                      color="primary"
                      onClick={() => this.handleSaveStory()}
                    >
                      {this.props.language.saveStory}
                    </Button>


                    <Button
                      className="storytelling-media-button"
                      variant="outlined"
                      color="primary"
                      onClick={() => this.handlePublishStory()}
                    >
                      {this.props.language.publishStory}
                    </Button>
                    
                  </div>
                  <FormGroup style={{marginTop: "1.5vh"}}>
                    <FormControlLabel
                      control={<Switch size="small" onChange={this.handleChange('public')} checked={this.state.story.isPublic}/>}
                      label={<p className="form-label">{this.props.language.makeStoryPublic}</p>}
                    />
                  </FormGroup>
                </div>
                {console.log("..................................................")}
              {console.log(this.state.selectedNode)}
              { this.state.story.nodes[this.state.selectedNode].name !=='End'  ? 
  
                <div className="storytelling-menu-body">
                  <TextField
                    id="node-name-input"
                    label={this.props.language.name}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    autoComplete={"off"}
                    required
                    value={this.state.story.nodes[this.state.selectedNode].name}
                    onChange={this.handleChange('name')}
                    error={this.state.showError && this.state.story.nodes[this.state.selectedNode].name === ''}
                    helperText={this.props.language.sceneNameHelper}
                  />
                  <TextField
                    id="node-description-input"
                    label={this.props.language.description}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={this.state.story.nodes[this.state.selectedNode].description}
                    onChange={this.handleChange('description')}
                    error={this.state.showError && this.state.story.nodes[this.state.selectedNode].description === ''}
                    helperText={this.props.language.sceneDescriptionHelper}
                  />
                  <Divider light/>
                  {
                    this.state.story.nodes[this.state.selectedNode].audio !== '' ?
                      
                      <AudioPreview
                        file={this.state.story.nodes[this.state.selectedNode].audio}
                        unPickAudioFile={this.unPickAudioFile.bind(this)}
                      />
                    :
                      <Tabs
                        color="primary"
                        value={this.state.audioType}
                        indicatorColor="primary"
                        textColor="primary"
                        className="form-tabs-container"
                        variant="fullWidth"
                        centered={true}
                      >
                      <Tab value={'record'} onClick={() => this.selectAudioType('record')} className="form-tab" label="Record" />
                      <Tab value={'upload'} onClick={() => this.selectAudioType('upload')} className="form-tab" label="Upload" />
                      </Tabs>
                  }
                  {
                     this.state.audioType === 'record' ?
                      <AudioRecorder
                        getFileInformation={this.getAudioFileInformation.bind(this)}
                      />
                      : 
                        undefined 
                  }
                    {
                     this.state.audioType === 'upload' ?
                      <FileUpload
                        type='audio'
                        user={Meteor.userId()}
                        accept={'audio/*'}
                        label={this.props.language.uploadAudioButtonLabel}
                        getFileInformation={this.getAudioFileInformation.bind(this)}
                      /> 
                      : 
                        undefined                     
                  }
               <Divider light/>
             { 
                <div className="center-row">
                  <Button variant="contained" onClick={() => this.handleImagesAudio("images")} color="primary" className="bar-button">
                  {this.props.language.reuseImg}
                </Button>	 
                <Button variant="contained" onClick={() => this.handleImagesAudio("audio")} color="primary" className="bar-button">             
                {this.props.language.reuseAudio}
                </Button>	
                </div>
                
  
              }


















                  {
                    this.state.story.nodes[this.state.selectedNode].image !== '' ?
                      <ImagePreview
                        file={this.state.story.nodes[this.state.selectedNode].image}
                        unPickImageFile={this.unPickImageFile.bind(this)}
                      />
                    :
                    <FileUpload
                      type='image'
                      user={Meteor.userId()}
                      accept={'image/*'}
                      label={this.props.language.uploadImageButtonLabel}
                      getFileInformation={this.getImageFileInformation.bind(this)}
                    />
                  }
                </div>
                :
                this.state.story.nodes[this.state.selectedNode].image !== '' ?
                      <ImagePreview
                        file={this.state.story.nodes[this.state.selectedNode].image}
                        unPickImageFile={this.unPickImageFile.bind(this)}
                      />
                    :
                    <FileUpload
                      type='image'
                      user={Meteor.userId()}
                      accept={'image/*'}
                      label={this.props.language.uploadImageButtonLabel}
                      getFileInformation={this.getImageFileInformation.bind(this)}
                    />

                }

                { 
                  this.state.story.nodes[this.state.selectedNode].type !== 'start' ?
                    <Tooltip title="Delete this scene">
                      <Fab
                        color="secondary"
                        className="storytelling-delete-button"
                        onClick={() => this.openDialog('delete')}
                      >
                        <DeleteIcon/>
                      </Fab>
                    </Tooltip>
                  :
                  undefined
                }
              </div>
            </div>
          :
          <React.Fragment>
            <StorytellingPlayer
              story={this.state.story}
              comments={false}
              link={false}
            />
            <Button color="primary" onClick={() => this.handleReturn()} className="storytelling-return-button">
              <ArrowBackIcon className="storytelling-return-icon"/>
              {this.props.language.return}
            </Button>
          </React.Fragment>
        }











        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          {
            this.state.action === "delete" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.deleteNode}
                </DialogTitle>
                <DialogContent className="success-dialog-content">
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {this.props.language.sureDeleteNode}
                  </DialogContentText>
                  <WarningIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                    {this.props.language.cancel}
                  </Button>
                  <Button onClick={() => this.deleteNode()} color="primary" autoFocus>
                    {this.props.language.confirm}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
              undefined
          }
          {
            this.state.action === "save" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.saveStory}
                </DialogTitle>
                <DialogContent className="success-dialog-content">
                  <TextField
                    id="story-name-input"
                    label={this.props.language.storyName}
                    placeholder={this.props.language.myStory}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    autoComplete={"off"}
                    required
                    value={this.state.story.name}
                    onChange={this.handleChange('storyName')}
                    helperText={this.props.language.weKnowInspiration}
                  />
                  <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                    {this.props.language.addTheNameStory}
                  </DialogContentText>
                  <WarningIcon className="warning-dialog-icon"/>
                </DialogContent>

                <DialogActions>
                  <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                    {this.props.language.cancel}
                  </Button>
                  <Button onClick={() => this.saveStory()} color="primary" autoFocus>
                    {this.props.language.save}
                  </Button>
                </DialogActions>

              </React.Fragment>
            :
              undefined
          }
          {
            this.state.action === "publish" ?
               // this.state.show=== true ?
                      <React.Fragment>
                        <div className="sign-actions">
                        <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                            {this.props.language.questionpublishstory}
                          </DialogTitle>
                          <div className="center-row">
                          <Button variant="contained"  color="secondary" className="bar-button"
                          onClick={() => this.handleyes()}>
                          {this.props.language.yes}
                          </Button>	
                          <Button variant="contained"  color="primary" className="bar-button"
                          onClick={() => this.handleClose()}>
                          {this.props.language.no}
                          </Button>	                 
                          </div>
                          </div>
                      </React.Fragment>
                      :
                      undefined
          }   
          
          { 
            this.state.action === "reuse" ?
            
                      <React.Fragment>
                        <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                               {this.props.language.audiomessage}
                             </DialogTitle>
                          <div className={classes.root}>
                            <GridList  cols={3} className={classes.gridList}>
                              {
                                
                                this.state.dataImages1.map(tile => (
                                <GridListTile key={Math.random()} >
                                  <img src={tile.link} style={{padding: "5px", width: "150px", height:"150",  marginBlock: "10px", alignContent: 'center', align: "center"}} alt={tile.link} onDoubleClick={() => this.getImageFileInformationReuse(tile)}/>
                                </GridListTile>
                              ))}
                            </GridList>
                          </div>
                      </React.Fragment> 
             
                      :
                      undefined
          }
          {
            this.state.action === "reuseAudio" ?
               // this.state.show=== true ?
                      <React.Fragment>
                            <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                               {this.props.language.audiomessage}
                             </DialogTitle>
                            {this.state.dataAudio1.map(tile => (
                               
                             <Button onDoubleClick={() => this.getImageFileInformationReuseAudio(tile)}>
                               <AudioPlayer
                              volume
                              src={tile.link}
                              />
                             </Button> 
                          
                            ))}

                      </React.Fragment>
                      :
                      undefined
          }          
        </Dialog>
        {/* despues del publish */}

        <Dialog
          open={this.state.openpublish} ///true for show
          onClose={this.handleClosepublish}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          {
            this.state.action === "boxpubshow" ?
                  <React.Fragment>
                  <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishStory}
                </DialogTitle>
                <div className="center-row">
                  <Button
                    className="storytelling-publish-button"
                    color="primary"
                    onClick={() => this.handlePublishOnCourse()}
                  >
                    <p className="storytelling-publish-button-text">{this.props.language.publishOnACourse}</p>
                    <SchoolIcon className="storytelling-publish-icon"/>
                  </Button>
                  <Button
                    className="storytelling-publish-button"
                    color="primary"
                    onClick={() => this.handlePublishAsActivity()}
                  >
                    <p className="storytelling-publish-button-text">{this.props.language.sendAsActivity}</p>
                    <EditIcon className="storytelling-publish-icon"/>
                  </Button>
                  <Button
                    className="storytelling-publish-button"
                    color="primary"
                    onClick={() => this.handlePublishOnSocialNetwork()}
                  >
                    <p className="storytelling-publish-button-text">{this.props.language.publishOnSocialNetwork}</p>
                    <LanguageIcon className="storytelling-publish-icon"/>
                  </Button>
                </div>
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {this.props.language.publishStoryText}
                </DialogContentText>
              </React.Fragment> 
              :
              undefined
      
          }
           {
            this.state.action === "publishOnSocialNetwork" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishOnSocialNetwork}
                </DialogTitle>
                <div class="storytelling-share-btn-group">
                  <div class="storytelling-share-btn">
                    {console.log(this.state.shareUrl)}
                    <FacebookShareButton
                      url={this.state.shareUrl}
                      quote={this.state.title}>
                      <FacebookIcon
                        size={64}
                        round />
                    </FacebookShareButton>
                  </div>

                  <div className="storytelling-share-btn">
                    <TwitterShareButton
                      url={this.state.shareUrl}
                      title={this.state.title}>
                      <TwitterIcon
                        size={64}
                        round />
                    </TwitterShareButton>  
                  </div>
                  <div className="storytelling-share-btn">
                    <LinkedinShareButton
                      url={this.state.shareUrl}
                      windowWidth={750}
                      windowHeight={600}>
                      <LinkedinIcon
                        size={64}
                        round />
                    </LinkedinShareButton>  
                  </div>
                </div>
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {
                    <Link
                      to={`/story#${this.state.saved}`}
                    >{this.state.shareUrl}</Link>
                  }
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => this.handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }
          {
            this.state.action === "publishOnCourse" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishOnCourse}
                </DialogTitle>
                {
                  this.state.courses.map(course => {
                    return(
                      <Button
                        color="primary"
                        className="storytelling-course-publish-button"
                        onClick={() => this.publishOnCourse(course._id)}
                      >
                        {`- ${course.title}`}
                      </Button>
                    )
                  })
                }
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {this.props.language.publishStoryCourseText}
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => this. handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }
           {
            this.state.action === "publishAsActivity" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.sendAsActivity}
                </DialogTitle>
                {
                  this.state.activities.map(activity => {
                    return(
                      <Button
                        color="primary"
                        className="storytelling-course-activity-publish-button"
                        onClick={() => this.publishAsActivity(activity.courseId, activity.activityId)}
                      >
                        {`- ${activity.course} at: ${activity.source} | Storytelling activity`}
                      </Button>
                    )
                  })
                }
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {this.props.language.publishStoryActivityText}
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => this.handleyes()} color="primary" autoFocus>
                    {this.props.language.back}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
            undefined
          }
          
        </Dialog>

      
      </div>
    )
  }
}
export default withStyles(useStyles)(StorytellingTool)