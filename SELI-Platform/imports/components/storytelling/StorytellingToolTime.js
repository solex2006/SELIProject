import React, { Component } from 'react';
import AudioRecorder from './AudioRecorder';
import AudioPreview from './AudioPreview';
import ImagePreview from './ImagePreview';
import FileUpload from '../files/FileUpload';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import WarningIcon from '@material-ui/icons/Warning';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SchoolIcon from '@material-ui/icons/School';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import DoneIcon from '@material-ui/icons/Done';

import Chip from '@material-ui/core/Chip';
import Input from "@material-ui/core/TextField";
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

import StorytellingObject from './StorytellingObject';
import StorytellingPlayerTime from './StorytellingPlayerTime';
import { Activities } from '../../../lib/ActivitiesCollection';
import { Courses } from '../../../lib/CourseCollection';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SnackbarItem from '../navigation/Snackbar';
import ImagePreviewFrame from '../files/previews/ImagePreview';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Checkbox from '@material-ui/core/Checkbox';

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
  text: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  }
});

class StorytellingToolTime extends React.Component {
  constructor(props) {
    super(props);
    this.waveObjects = [];
    this.state = {
      courseInformation: [],
      categoryType: '',
      categoryCheck: false,
      audioControl: false,
      resultControl: false,
      imageControl: false,
      story: {
        name: "",
        published: false,
        activityId: undefined,
        courseId: undefined,
        user: Meteor.userId(),
        categories:[],
        creationDate: new Date(),
        nodes: [
          {
            _id: Math.random(),
            audio: '',
            images: [],
            scripts: [],
            ordinal: 0,
          },
        ],
        isPublic: true,
        workshop: undefined,
        project: this.props.language.seliProject,
        facilitators: {enabled: false, label: undefined},
        lastModified: undefined,
        endType: "default",
        endFrame: undefined,
      },
      playing: false,
      saved: undefined,
      selectedNode: 0,
      selectedImage: 0,
      selectedScript: 0,
      imageDisabled: true,
      scriptDisabled: true,
      courses: [],
      activities: [],
      languageType: 'english',
      audioType: 'record',
      imageType: 'upload',
      stateconsulta: false,
      isyes:false,
      isno:false,
      show: true,
      dataImages: [],
      dataImages1: [],
      dataImagesName:[],
      dataImagesId:[],
      dataAudio: [],
      dataAudio1: [],
      dataAudioName: [],
      dataAudioId: [],
      img:[],
      renameFile: false,
    }
 }
  
  filterRepitedFiles = (data) => {
    let filteredArr = data.reduce((acc, current) => {
      let x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    const filteredItems = filteredArr.filter(item => item !== "")
    return filteredItems //Return filtered values
  }

  handleLibraryContent=(value)=>{
    this.updateLibraryContent()
    let Imagesfilter=this.filterRepitedFiles(this.state.dataImages)
    let Audiofilter=this.filterRepitedFiles(this.state.dataAudio)
    this.setState({
      dataImages1:Imagesfilter,
      dataAudio1:Audiofilter,
    })
    
    if (value === "images") {
      this.openDialog("reuse");
    }
    else if (value === "audio") {
      this.openDialog("reuseAudio");
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
          categories: this.props.storyToEdit.activity.categories,
          user: this.props.storyToEdit.activity.user,
          creationDate: this.props.storyToEdit.activity.date,
          nodes: this.props.storyToEdit.activity.data,
          isPublic: this.props.storyToEdit.activity.public,
          workshop: this.props.storyToEdit.activity.workshop,
          project: this.props.storyToEdit.activity.project,
          facilitators: this.props.storyToEdit.activity.facilitators ? this.props.storyToEdit.activity.facilitators : undefined,
          lastModified: this.props.storyToEdit.activity.lastModified,
          endType: this.props.storyToEdit.activity.endType,
          endFrame: this.props.storyToEdit.activity.endFrame,
        },
        saved: this.props.storyToEdit._id,
      })
      if (this.props.storyToEdit.activity.data[0].images.length) {
        this.setState({
          imageDisabled: false,
        })
      }
      if (this.props.storyToEdit.activity.data[0].scripts.length) {
        this.setState({
          scriptDisabled: false,
        })
      }
    } else {
      this.setState({
        action: 'audio',
        open: true,
      })
    }
    this.updateLibraryContent()
  }

  updateLibraryContent= () =>{ 
    this.setState({
      dataImages: [],
      dataAudio: [],
    })
    let dataLibraryContent=Activities.find({}).fetch()
    var dataLibraryContentCopy = dataLibraryContent.filter(function(value, index, arr){
      if (value.activity.user == Meteor.userId()){
        return value
      }
    });
    dataLibraryContentCopy.map((data) => {
      if (data.activity.type === "storytelling" || data.activity.type === "storytelling-time"){
        data.activity.data.map((data2) => {
          this.state.dataAudio.push(data2.audio)
          if (data.activity.type === "storytelling") {
            this.state.dataImages.push(data2.image)
          } else {
            data2.images.map((image) => {
              this.state.dataImages.push(image.file)
            })
          }
        })
      }
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  
  handleClosepublish = () => {
    this.setState({ openpublish: false });
  }

  handleCloseRename = () => {
    this.setState({ renameFile: false });
  }

  handleChange = name => event => {
    if (name === 'script') {
      let value = event.target.value;
      this.setState(state => {
        const story = state.story;
        story.nodes[this.state.selectedNode].scripts[this.state.selectedScript].script[this.state.languageType] = value; 
        return {
          story,
        };
      });
    } else {
      let story = this.state.story;
      if (name === 'storyName') {
        story.name = event.target.value;
      } else if (name === 'name') {
        story.nodes[this.state.selectedNode].audio.name = event.target.value;
      } else if (name === "public") {
        story.isPublic = !story.isPublic;
      } else if (name === "workshop") {
        story.workshop = event.target.value;
      } else if (name === "facilitators" || name === "enableFacilitators") {
        if (story.facilitators) {
          if (name === "facilitators") {
            story.facilitators.label = event.target.value;
          } else {
            story.facilitators.enabled = !story.facilitators.enabled;
          }
        } else {
          story.facilitators = {enabled: false, label: undefined};
        }
      } else if (name === "seliProject") {
        story.project = event.target.value;
      }
      this.setState({
        story: story,
      })
    }
  }

  addSingleNode = (index) => {
    let story = this.state.story;
    let newNode = Math.random();
    const node = {
      _id: newNode,
      audio: '',
      images: [],
      scripts: [],
      categories: [],
      ordinal: index + 1,
    };
    story.nodes.splice(index + 1, 0, node);
    this.setState({
      story: story,
      selectedNode: story.nodes.length - 1,
    }, () => {
      this.openDialog('audio');
    });
  }

  addSingleImage = (timestamp) => {
    let imageNode = {
      _id: Math.random(),
      timestamp: timestamp,
      file: "",
    };
    let story = this.state.story;
    let imageIndex = story.nodes[this.state.selectedNode].images.findIndex(item => item.timestamp > timestamp);
    if (imageIndex === -1) {
      story.nodes[this.state.selectedNode].images.push(imageNode);
    } else {
      story.nodes[this.state.selectedNode].images.splice(imageIndex, 0, imageNode);
    }
    this.setState({
      story: story,
      imageDisabled: false,
    }, () => {
      this.setState({
        selectedImage: story.nodes[this.state.selectedNode].images.findIndex(item => item._id === imageNode._id),
      })
      this.openDialog('image');
    });
  }

  addSingleScript = (timestamp) => {
    let scriptNode = {
      _id: Math.random(),
      timestamp: timestamp,
      script: {
        english: '',
        spanish: '',
        portuguese: '',
        polish: '',
        turkish: '',
      },
    };
    let story = this.state.story;
    let scriptIndex = story.nodes[this.state.selectedNode].scripts.findIndex(item => item.timestamp > timestamp);
    if (scriptIndex === -1) {
      story.nodes[this.state.selectedNode].scripts.push(scriptNode);
    } else {
      story.nodes[this.state.selectedNode].scripts.splice(scriptIndex, 0, scriptNode);
    }
    this.setState({
      story: story,
      scriptDisabled: false,
    }, () => {
      this.setState({
        selectedScript: story.nodes[this.state.selectedNode].scripts.findIndex(item => item._id === scriptNode._id),
      })
    });
  }

  handleNode = (index, action) => {
    this.setState({
      selectedNode: index,
      selectedImage: 0,
      selectedScript: 0,
    }, () => {
      if (action) {
        if (action === 'delete'){
          this.openDialog('delete')
        }
        if (action === 'edit'){
          this.openDialog('audio')
        }
      }
    })
  }

  handleContent = (index, childIndex, type, action) => {
    this.handleNode(index);
    let story = this.state.story;
    if (type === "image") {
      this.setState({
        selectedImage: childIndex,
      })
      if (action) {
        if (action === 'delete'){
          story.nodes[index].images.splice(childIndex, 1);
          if (childIndex > 0) {
            this.setState({
              selectedImage: childIndex - 1,
              story,
            })
          }
        }
        if (action === 'edit'){
          this.openDialog('image')
        }
      }
    } else {
      this.setState({
        selectedScript: childIndex,
      })
      if (action && action === 'delete') {
        story.nodes[index].scripts.splice(childIndex, 1);
        if (childIndex > 0) {
          this.setState({
            selectedScript: childIndex - 1,
            story,
          })
        }
      }
    }
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

  unPickAudioFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].audio = '';
    this.setState({
      story: story,
    });
  }

  //This function returns the information of the items of the data base depending on the file type 
  getFileInformation(file){  
    let story = this.state.story;
    if (this.state.action === "image" || this.state.action === "reuse") {
      story.nodes[this.state.selectedNode].images[this.state.selectedImage].file = file;
    } else if (this.state.action === "save" || this.state.action === "storyEndFrame") {
      story.endFrame = file;
    } else {
      story.nodes[this.state.selectedNode].audio = file;
    }
    this.setState({
      story: story,
    });
  }

  unPickImageFile(){
    let story = this.state.story;
    story.nodes[this.state.selectedNode].images[this.state.selectedImage].file = '';
    this.setState({
      story: story,
    });
  }

  unPickEndFrame = () => {
    let story = this.state.story;
    story.endFrame = undefined;
    this.setState({
      story: story,
    });
  }

  validateStory = () => {
    let story = this.state.story;
    story.nodes[this.state.selectedNode].categories = this.state.categories;
    this.setState({
      story: story,
    });

    var validImage = this.state.story.nodes.map(item => item.images);
    if(validImage[0] == 0) {
      this.props.handleControlMessage(true, this.props.language.allScenesImage);
      this.state.imageControl = false;
    }
    else {
      this.state.imageControl = true;
    }
    for (var i = 0; i < story.nodes.length; i++) {
      if (story.nodes[i].audio === "") {
        this.props.handleControlMessage(true, this.props.language.allScenesAudio);
        this.setState({
          selectedNode: i,
        });
        this.state.audioControl = false;
      }else {
        this.state.audioControl = true;
      }
    }
    if(this.state.audioControl == true && this.state.imageControl == true) {
      this.state.resultControl = true;
    }else {
      this.state.resultControl = false;
    }
    return this.state.resultControl;
  }

  handleSaveStory = () => {
    if (this.validateStory()) {
      this.openDialog("save");
    }
  }

  saveStory = () => {
    if (this.state.saved) {
      if (this.state.story.name !== "") {
        //console.log(this.state.story.name, this.state.story.nodes, this.state.story.isPublic )
        Activities.update(
          { _id: this.state.saved},
          { $set: {
            'activity.name': this.state.story.name,
            'activity.data': this.state.story.nodes,
            'activity.public': this.state.story.isPublic,
            'activity.workshop': this.state.story.workshop,
            'activity.project': this.state.story.project,
            'activity.facilitators': this.state.story.facilitators,
            'activity.categories': this.state.story.categories,            
            'activity.lastModified': new Date(),
            'activity.endType': this.state.story.endType,
            'activity.endFrame': this.state.story.endFrame
          }}
          , () => {
            this.props.handleControlMessage(true, this.props.language.storySaved, true, "stories", this.props.language.seeList);
            this.handleClose();
          }
        )
        return true;
      }
      else {
        this.props.handleControlMessage(true, this.props.language.storyNameText);
      }
    }
    else {
      if (this.state.story.name !== "") {
        Activities.insert({
          activity: {
            name: this.state.story.name,
            data: this.state.story.nodes,
            type: "storytelling-time",
            public: this.state.story.isPublic,
            date: this.state.story.creationDate,
            user: this.state.story.user,
            course: this.state.story.courseId,
            workshop: this.state.story.workshop,
            project: this.state.story.project,
            facilitators: this.state.story.facilitators,
            lastModified: new Date()
          }
        }, () => {
          this.props.handleControlMessage(true, this.props.language.storySaved, true, "stories", this.props.language.seeList);
          this.handleClose();
          this.setState({
            saved: Activities.findOne({"activity.name": this.state.story.name})._id,
          });
        })
        return true;
      }
      else {
        this.props.handleControlMessage(true, this.props.language.storyNameText);
      }
    }
  }

  handlePublishStory = () => {
    if (this.validateStory()) {
      this.openDialog("publish");
    }
  }

  showPreview = () => {
    if (this.validateStory()) {
      this.setState({
        showPreview: true,
      });
    }
  }

  showEndFrame = () => {
    this.openDialog("storyEndFrame");
  }

  handleReturn = () => {
    this.setState({
      showPreview: false,
    });
  }

  SelectCategories = () => {

    var categoriesData = [];
    categoriesData.push(this.state.story.categories.map((category) => category));
    var controlEqual = false;
    for(var i = 0; i < categoriesData[0].length; i++){
    if(categoriesData[0][i] == this.state.categoryType){
    controlEqual = true;
    this.props.handleControlMessage(true, 'Aynı kategoriyi 2 defa seçtiniz');
    return controlEqual;
  } 
  else{
    controlEqual = false;

  }
}

    if(this.state.story.categories.length == 3 || controlEqual == true) {
      this.props.handleControlMessage(true, '3 ten fazla kategori seçtiniz ');

    }else {
    this.state.story.categories.push(this.state.categoryType);
    this.setState({
    

      categories: this.state.story.categories,
      
      
    });
    this.props.handleControlMessage(true, this.state.categoryType +' '+ 'kategorisini seçtiniz');


    }



    //   if(this.state.categoryType == this.state.story.keyWords) {
    //     this.props.handleControlMessage(true, this.state.categoryType +''+ 'zaten Mevcut');
    //     }
    //   else {
    // this.state.story.keyWords += this.state.categoryType;

    //   }
    
  }

  handlePublishOnCourse = () => {
    let courses = [];
    this.props.user.profile.courses.map(course => {
      courses.push(course.courseId)
    });
    courses = Courses.find({_id: {$in: courses}}).fetch();
    this.setState({
      action: "publishOnCourse",
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
      if (course.coursePlan.courseStructure === "unit") {
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
                        instruction: item.attributes.instruction,
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
                      instruction: item.attributes.instruction,
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
      })
    })
  }

  handlePublishOnSocialNetwork = () => {
    const shareUrl = `${window.origin}/story#${this.state.saved}`
    this.setState({
      shareUrl: shareUrl,
      title: this.props.language.publishOnSocialNetwork,
      action: 'publishOnSocialNetwork',
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
        'activity.categories': this.state.story.categories,
      }}
      , () => {
        this.props.handleControlMessage(true, this.props.language.storyPublished);
        this.handleClosepublish();
      }
    )
  }

  handleyes = () => {
    if (this.validateStory() && this.saveStory()) {
      this.setState({
        isyes: true,
        show: false,
        openpublish: true,
        open: false,
        action: "boxpubshow"
      });
    } else {
      this.openDialog("save");
    }
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
        toResolve[i].activityId = this.state.saved;
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
            this.props.handleControlMessage(true, label);
            this.handleClose();
          }
      });
      this.handleClosepublish();
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
    //console.log('changeNodeOrdinal ' + index + '  ' +  newIndex);

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

  selectLanguageType = (newValue) => {
    this.setState({
      languageType: newValue
    })
  };

  selectImageType = (newValue) => {
    this.setState({
      imageType: newValue
    })
  };

  selectAudioType = (newValue) => {
    this.setState({
      audioType: newValue
    })
  };

  selectEndFrame = (newValue) => {
    let story = this.state.story;
    if (story.endType) {
      story.endType = newValue;
    } else {
      story.endType = "default"
    }
    this.setState({
      story,
    })
  };

  handleOnDragStart = (e) => {
    e.preventDefault()
  }


  addKeyWord(){
    var x = Activities.find({}).fetch(); 
    this.state.courseInformation = x.map(i => i.activity);
    let keyWord = document.getElementById('keyWord-input').value;
    if(keyWord !== '') {
      let courseInformation = this.state.courseInformation;
      keyWord = keyWord.trim().split(/\s+/);
      if (keyWord.length <= 3) {
        let finalKeyWord = '';
        keyWord[0] = keyWord[0].charAt(0).toUpperCase() + keyWord[0].slice(1);
        for (var i = 0; i < keyWord.length; i++) {
          finalKeyWord = finalKeyWord + keyWord[i];
          if (i < 2) {
            finalKeyWord = finalKeyWord + " ";
          }
        }
        let duplicate= courseInformation.categories.includes(finalKeyWord)
        if(duplicate){
          this.props.handleControlMessage(true, this.props.language.repeatedkeywords)
       
        }else{
          courseInformation.categories.push(finalKeyWord);
          this.setState({
            courseInformation: courseInformation,
          });
        }
      }
      else {
        this.props.handleControlMessage(true, this.props.language.keywordsMaximumMessage);
      }
    }
    else {
      this.props.handleControlMessage(true, this.props.language.keywordsEmptyMessage);
    }
    document.getElementById('keyWord-input').value = "";
  }

  deleteKeyWord(index) {
    let courseInformation = this.state.courseInformation;
    courseInformation.categories.splice(index, 1);
    this.setState({
      courseInformation: courseInformation,
    });
  }

  keyController(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.addKeyWord();
    }
    else {
      validateOnlyLetters(event);
    }
  }

  selectColor = (language) => {
    if (  this.state.story.nodes[this.state.selectedNode].scripts.length &&
          this.state.story.nodes[this.state.selectedNode].scripts[this.state.selectedScript].script[language] !== ""){
      return "secondary.main"
    } else {
      return ""
    }
  };

  urlHandleChange = name => event => {
    this.setState({
      showHelperText: false,
      url: event.target.value,
      validUrl: false,
    }, () => {
      this.validateUrl()
    })
  }

  renameHandleChange = name => event => {
    this.setState({
      renameFileTitle: event.target.value,
    });
  }

  rotateangle= (rotate)=>{
    this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage].rotate = rotate;
  }

  changeFileName = (fileName, _id) => {
    this.setState({
      renameFile: true,
      renameFileTitle: fileName,
      renameFileId: _id,
    });
  }

  finishChangeFileName = () => {
    let storyId = "";
    let story = this.state.story;
    if (this.state.action === "audio") {
      storyId = Activities.findOne({"activity.data.audio._id": this.state.renameFileId})._id
    }
    let newData = Activities.findOne({_id: storyId}).activity.data;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i][this.state.action]._id === this.state.renameFileId){
        newData[i][this.state.action].name = this.state.renameFileTitle;
        if (this.state.saved === storyId) {
          story.nodes[i][this.state.action].name = this.state.renameFileTitle;
          this.setState({
            story: story,
          });
        }
      }
    }
    Activities.update(
      { _id: storyId},
      { $set: {'activity.data': newData}}
    )
    this.handleLibraryContent(this.state.action);
    this.handleCloseRename();
  }

  manageScenes = (index, step) => {
    if (this.state.playing) {
      this.waveObjects[index].stop();
      this.waveObjects[index + step].play();
    }
    this.setState({
      selectedNode: index + step,
    })
  }

  sendAction = (action) => {
    if (action === "playPause") {
      if (!this.state.playing) {
        this.waveObjects[this.state.selectedNode].play();
      } else {
        this.waveObjects[this.state.selectedNode].pause();
      }
      this.setState({
        playing: !this.state.playing,
      })
    } else if (action === "stop") {
      for (let i = 0; i < this.state.story.nodes.length; i++) {
        this.waveObjects[i].stop();
      }
      this.setState({
        selectedNode: 0,
        playing: false,
      })
    } else if (action === "previous") {
      if (this.state.selectedNode > 0) {
        this.manageScenes(this.state.selectedNode, -1);
      } else {
        if (this.state.playing) {
          this.waveObjects[0].stop();
          this.waveObjects[0].play();
        }
      }
    }
    else if (action === "next") {
      if (this.state.selectedNode + 1 < this.state.story.nodes.length) {
        this.manageScenes(this.state.selectedNode, 1);
      } else {
        this.sendAction("stop");
      }
    }
    else if (action === "zoomIn") {
      for (let i = 0; i < this.state.story.nodes.length; i++) {
        this.waveObjects[i].zoomIn();
      }
    }
    else if (action === "zoomOut") {
      for (let i = 0; i < this.state.story.nodes.length; i++) {
        this.waveObjects[i].zoomOut();
      }
    }
  }

  render() {
    return(
      <div>
        {
          [this.props.language.dstHelper2, this.props.language.dstHelper3, this.props.language.dstHelper4].map((item, index) => {
            return(
              <SnackbarItem
                index={index}
                fromTop={130}
                flag={this.props.storyToEdit ? true : false}
                label={item}
                title={this.props.language.editing}
              />
            )
          })
        }
        {
          !this.state.showPreview ?
            <div className="storytelling-tool-container-time">
              <div className="storytelling-work-area-full-time">
                <div className="storytelling-title-area-time">
                  <h2 className="storytelling-work-area-title-time">{this.props.language.storyFlow}</h2>
                  
                  {
                    this.state.saved ?
                      <div>
                        <Button
                          color="primary"
                          className="storytelling-work-preview-button-time"
                          onClick={() => this.showPreview()}
                        >
                          {this.props.language.storyPreview}
                        </Button>
                        <Button
                          color="primary"
                          className="storytelling-work-preview-button-time"
                          onClick={() => this.showEndFrame()}
                        >
                          {this.props.language.editEndFrame}
                        </Button>
                      </div>
                    :
                    undefined
                  }
                </div>
                <div className="storytelling-work-area-time">
                  {
                    this.state.story.nodes.map((node, index) => {
                      return(
                        <StorytellingObject
                          ref={(ref) => this.waveObjects[index] = ref}
                          node={node}
                          index={index}
                          length={this.state.story.nodes.length}
                          languageType={this.state.languageType}
                          sendAction={this.sendAction.bind(this)}
                          addSingleNode={this.addSingleNode.bind(this)}
                          addSingleImage={this.addSingleImage.bind(this)}
                          addSingleScript={this.addSingleScript.bind(this)}
                          handleNode={this.handleNode.bind(this)}
                          handleContent={this.handleContent.bind(this)}
                          moveNodeUp={this.moveNodeUp.bind(this)}
                          moveNodeDown={this.moveNodeDown.bind(this)}
                          language={this.props.language}
                        />
                      )
                    })
                  }
                </div>
              </div>
              {
                this.state.story.nodes[this.state.selectedNode].audio === "" ? undefined :
                  <div className="storytelling-actions-button-time">
                    <Tooltip title={this.state.playing ? this.props.language.pause : this.props.language.play}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('playPause')}
                      >
                        {this.state.playing ? <PauseIcon /> : <PlayArrowIcon />}
                      </Fab>
                    </Tooltip>
                    <Tooltip title={this.props.language.stop}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('stop')}
                      >
                        <StopIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={this.props.language.back}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('previous')}
                      >
                        <SkipPreviousIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={this.props.language.next}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('next')}
                      >
                        <SkipNextIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={this.props.language.zoomIn}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('zoomIn')}
                      >
                        <ZoomInIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={this.props.language.zoomOut}>
                      <Fab
                        className="storytelling-action-button-time"
                        onClick={() => this.sendAction('zoomOut')}
                      >
                        <ZoomOutIcon />
                      </Fab>
                    </Tooltip>
                  </div>
              }
              <div className="storytelling-menu-container-time">
                <div className="storytelling-menu-body-full-time">
                  <TextField
                    id="node-name-input"
                    label={this.props.language.audioTitle}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    disabled={this.state.story.nodes[this.state.selectedNode].audio !== "" ? false : true}
                    multiline
                    autoComplete={"off"}
                    rows={3}
                    value={this.state.story.nodes[this.state.selectedNode].audio !== "" ? this.state.story.nodes[this.state.selectedNode].audio.name : ""}
                    onChange={this.handleChange('name')}
                    error={this.state.showError && this.state.story.nodes[this.state.selectedNode].name === ''}
                  />
                </div>
                <Divider light orientation="vertical"/>
                <div className="storytelling-menu-body-aux-time">
                  <div className="storytelling-menu-body-tabs-time">
                    <Tabs
                      color="primary"
                      orientation="vertical"
                      value={this.state.languageType}
                      indicatorColor="primary"
                      textColor="primary"
                      className="form-tabs-container-time"
                      variant="standard"
                      //centered={true}
                    >
                      <Tab value={'english'} onClick={() => this.selectLanguageType('english')} className="form-tab-aux" label={<Box color={this.selectColor('english')}>{this.props.language.english}</Box>} disabled={this.state.scriptDisabled}/>
                      <Tab value={'spanish'} onClick={() => this.selectLanguageType('spanish')} className="form-tab-aux" label={<Box color={this.selectColor('spanish')}>{this.props.language.spanish}</Box>} disabled={this.state.scriptDisabled}/>
                      <Tab value={'portuguese'} onClick={() => this.selectLanguageType('portuguese')} className="form-tab-aux" label={<Box color={this.selectColor('portuguese')}>{this.props.language.portuguese}</Box>} disabled={this.state.scriptDisabled}/>
                    </Tabs>
                  </div>
                  <div className="storytelling-menu-body-tabs-time">
                    <Tabs
                      color="primary"
                      orientation="vertical"
                      value={this.state.languageType}
                      indicatorColor="primary"
                      textColor="primary"
                      className="form-tabs-container-time"
                      variant="standard"
                      //centered={true}
                    >
                      <Tab value={'polish'} onClick={() => this.selectLanguageType('polish')} className="form-tab-aux" label={<Box color={this.selectColor('polish')}>{this.props.language.polish}</Box>} disabled={this.state.scriptDisabled}/>
                      <Tab value={'turkish'} onClick={() => this.selectLanguageType('turkish')} className="form-tab-aux" label={<Box color={this.selectColor('turkish')}>{this.props.language.turkish}</Box>} disabled={this.state.scriptDisabled}/>
                    </Tabs>
                  </div>
                  <div className="storytelling-menu-body-description-time">
                    <TextField
                      id="node-description-input"
                      label={`${this.props.language.descriptionIn} ${this.props.language[this.state.languageType]}`}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={2}
                      disabled={this.state.scriptDisabled}
                      value={
                        this.state.story.nodes[this.state.selectedNode].scripts.length &&
                          this.state.story.nodes[this.state.selectedNode].scripts[this.state.selectedScript].script[this.state.languageType] !== "" ?
                          this.state.story.nodes[this.state.selectedNode].scripts[this.state.selectedScript].script[this.state.languageType]
                        : ""}
                      onChange={this.handleChange("script")}
                      error={this.state.showError && this.state.story.nodes[this.state.selectedNode].scripts[this.state.selectedScript].script[this.state.languageType] === ''}
                      helperText={this.props.language.sceneDescriptionHelper}
                    />
                  </div>
                </div>
                <Divider light orientation="vertical"/>
                <div className="storytelling-menu-header-time">
                  <Button
                    className="storytelling-media-button-time"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => this.handlePublishStory()}
                  >
                    {this.props.language.publishStory}
                  </Button>
                  <Button
                    className="storytelling-media-button-time"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => this.handleSaveStory()}
                  >
                    {this.props.language.saveStory}
                  </Button>
                  <FormGroup className="center-row-public-time">
                    <FormControlLabel
                      control={<Switch size="small" onChange={this.handleChange('public')} checked={this.state.story.isPublic}/>}
                      label={<p className="form-label">{this.props.language.makeStoryPublic}</p>}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          :
            <React.Fragment>
              <StorytellingPlayerTime
                story={this.state.story}
                comments={false}
                link={false}
                language={this.props.language}
              />
              <Button color="primary" onClick={() => this.handleReturn()} className="storytelling-return-button-time">
                <ArrowBackIcon className="storytelling-return-icon-time"/>
                {this.props.language.return}
              </Button>
            </React.Fragment>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          maxWidth={false}
        >
          {
            this.state.action === "delete" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.deletNode}
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
                  <Button variant="outlined" onClick={() => this.deleteNode()} color="primary" autoFocus>
                    {this.props.language.confirm}
                  </Button>
                </DialogActions>
              </React.Fragment>
            :
              undefined
          }
          {
            this.state.action === "save" || this.state.action === "storyEndFrame" ?
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.state.action === "save" ? this.props.language.saveStory : this.props.language.editEndFrame}
                </DialogTitle>
                {this.state.action === "save" ? <Divider light/> : undefined}
                {this.state.action === "save" ? <p className="editor-label">{`${this.props.language.editEndFrame}:`}</p> : undefined}
                <Tabs
                  color="secondary"
                  value={this.state.story.endType ? this.state.story.endType : "default"}
                  indicatorColor="secondary"
                  textColor="secondary"
                  className="form-tabs-container-media-time"
                  variant="fullWidth"
                  centered={true}
                >
                  <Tab value={'default'} onClick={() => this.selectEndFrame('default')} className="form-tab" label={this.props.language.defaultFrame} />
                  <Tab value={'image'} onClick={() => this.selectEndFrame('image')} className="form-tab" label={this.props.language.customImage} />
                </Tabs>
                <DialogContent className="success-dialog-content-storytelling-time">
                {
                  this.state.story.endType && this.state.story.endType === 'image' ?
                    <React.Fragment>
                      {
                        this.state.story.endFrame ?
                          <ImagePreviewFrame
                            file={this.state.story.endFrame}
                            unPickFile={this.unPickEndFrame.bind(this)}
                            language={this.props.language}
                            tipo={"Course"}
                          /> 
                        :
                          <FileUpload
                            color='primary'
                            type='image'
                            user={Meteor.userId()}
                            accept={'image/*'}
                            label={this.props.language.uploadImageButtonLabel}
                            getFileInformation={this.getFileInformation.bind(this)}
                            handleControlMessage={this.props.handleControlMessage.bind(this)}
                            language={this.props.language}
                          />
                      }
                    </React.Fragment>
                  :
                    <React.Fragment>
                      <TextField
                        id="story-project-input"
                        label={this.props.language.seliProject}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        multiline
                        autoComplete={"off"}
                        required
                        value={this.state.story.project ? this.state.story.project : ""}
                        onChange={this.handleChange('seliProject')}
                      />
                      <TextField
                        id="story-workshop-input"
                        label={this.props.language.nameOfCorW}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        multiline
                        autoComplete={"off"}
                        required
                        value={this.state.story.workshop ? this.state.story.workshop : ""}
                        onChange={this.handleChange('workshop')}
                      />
                      <div className="storytelling-facilitators">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.story.facilitators ? this.state.story.facilitators.enabled : false}
                              onChange={this.handleChange('enableFacilitators')}
                              value="enableFacilitators"
                              color="primary"
                            />
                          }
                        />
                        <TextField
                          id="story-fascilitators-input"
                          label={this.props.language.facilitators}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          multiline
                          autoComplete={"off"}
                          required
                          disabled={this.state.story.facilitators ? !this.state.story.facilitators.enabled : true}
                          value={this.state.story.facilitators && this.state.story.facilitators.label ? this.state.story.facilitators.label : ""}
                          onChange={this.handleChange('facilitators')}
                        />
                      </div>
                    </React.Fragment>
                }
                </DialogContent>
                {this.state.action === "save" ? <Divider light/> : undefined}
                <DialogContent className="success-dialog-content-storytelling-time">
                {
                  this.state.action === "storyEndFrame" ? undefined :
                    <React.Fragment>
                      <p className="editor-label">{`${this.props.language.storyName}:`}</p>
                      <TextField
                        id="story-name-input"
                        label={this.props.language.title}
                        placeholder={this.props.language.myStory}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        multiline
                        autoComplete={"off"}
                        required
                        value={this.state.story.name}
                        onChange={this.handleChange('storyName')}
                        helperText={this.props.language.storyNameHelper}
                      />
                      <div className="categoryButtons">
                     
                      <Button
                          color="primary"
                          className="storytelling"
                          variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'culture')}
                        > 
                        Culture</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'education')}
                        >Education</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'engineering')}
                        >Engineering</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'inclusion')}
                >Inclusion</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'life')}
                        >Life</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'science')}
                        >Science</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'school')}
                        >School</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories( this.state.categoryType = 'sports')}
                        >Sports</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories(this.state.categoryType = 'technology')}
                        >Technology</Button><Button
                        color="primary"
                        className="storytelling"
                        variant="outlined"
                          onClick={() => this.SelectCategories(this.state.categoryType = 'university')}
                        >University</Button>
          </div>
          {/* {
            this.state.courseInformation.keyWords.length ?
              <div className="chips-container">
                {this.state.courseInformation.keyWords.map((keyWord, index) => {
                  
                  return(
                    <Chip
                      size="small"
                      avatar={<Avatar>{keyWord.charAt(0)}</Avatar>}
                      label={keyWord}
                      className="chip"
                      color="primary"
                      onDelete={() => this.deleteKeyWord(index)}
                    />
                  )
                })}
              </div>
            :
            undefined
          }
           */}
                      {/* <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                        {this.props.language.storyNameText}
                      </DialogContentText>
                      <WarningIcon className="warning-dialog-icon"/> */}
                    </React.Fragment>
                }
                </DialogContent>
                {this.state.action === "save" ? <Divider light/> : undefined}
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
              <React.Fragment>
                <DialogTitle className="success-dialog-title" id="alert-dialog-title">
                  {this.props.language.publishStory}
                </DialogTitle>
                <DialogContent className="success-dialog-content">
                  {console.log(this.state)}
                  {console.log(this.props)}
                  <DialogContentText className="copyright-dialog-content-text" id="alert-dialog-description">
                    <p>{this.props.language.questionpublishstory}</p><br/>
                    <p>        {this.props.language.questionpublishstory001}</p><br/> 
                    <div className="copyright-dialog-content-data">
                      <div>
                        <p>{this.props.language.questionpublishstory003}:</p>
                        <p>{this.props.language.questionpublishstory004}:</p>
                        <p>{this.props.language.questionpublishstory005}:</p>
                      </div>
                      <div style={{"margin-left": "1vw"}}>
                        <p style={{"font-weight": "bold"}}>{this.state.story.name}</p>
                        <p style={{"font-weight": "bold"}}>{this.props.user.username}</p>
                        <p style={{"font-weight": "bold"}}>{this.props.user.profile.fullname}</p>
                      </div>
                    </div>
                  </DialogContentText>
                  <InfoIcon className="warning-dialog-icon"/>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined"  color="primary" className="bar-button" onClick={() => this.handleyes()}>
                    {this.props.language.yes}
                  </Button>	
                  <Button variant="contained"  color="primary" className="bar-button" onClick={() => this.handleClose()}>
                    {this.props.language.no}
                  </Button>
                </DialogActions>                 
              </React.Fragment>
            :
              undefined
          }   
          { 
            this.state.action === "reuse" || this.state.action === "reuseAudio" || this.state.action === "image" || this.state.action === "audio" ?
              <React.Fragment>
                <DialogTitle className="dialog-title">
                  <AppBar className="dialog-app-bar" color="primary" position="static">
                    <Toolbar className="dialog-tool-bar-information" variant="dense" disableGutters={true}>
                      <AppsIcon/>
                      <h4 className="dialog-label-title">
                        {this.state.action === "reuse" ? this.props.language.reuseImg : undefined}
                        {this.state.action === "reuseAudio" ? this.props.language.reuseAudio : undefined}
                        {this.state.action === "image" ? this.props.language.image : undefined} 
                        {this.state.action === "audio" ? this.props.language.audio : undefined}   
                      </h4>
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
                {
                  this.state.action === "reuse"?
                    <div className="library-files-container">
                      {this.state.dataImages1.map(tile => (
                        <div className="storytelling-image-library-time">
                          <div style={{backgroundImage: `url(${tile.link})`}} className="file-image-preview" onDoubleClick={() => {this.getFileInformation(tile), this.handleClose()}}></div>
                        </div> 
                      ))}
                    </div>
                  :
                    undefined
                }
                {
                  this.state.action === "reuseAudio"?
                    <div className="library-files-container">
                      {this.state.dataAudio1.map(tile => (    
                        <Card onDoubleClick={() => {this.getFileInformation(tile), this.handleClose()}} className="audio-card-storytelling">
                          <div className="card-media-audio-storytelling">
                            <AudioPlayer volume src={tile.link}/>
                          </div>
                          <CardActions className="card-actions-bottom-container" disableSpacing>
                            {`${this.props.language.audioTitle}: ${tile.name}`}
                            <Tooltip title={this.props.language.edit}>
                              <IconButton className="card-button" onClick={() => this.changeFileName(tile.name, tile._id)} aria-label="delete">
                                <EditIcon className="card-icon"/>
                              </IconButton>
                            </Tooltip>
                          </CardActions> 
                        </Card>
                      ))}
                    </div>
                  :
                    undefined
                }
                {
                  this.state.action === 'audio' ?
                    <div className="storytelling-menu-body-time">
                      <Tabs
                        color="secondary"
                        value={this.state.audioType}
                        indicatorColor="secondary"
                        textColor="secondary"
                        className="form-tabs-container-media-time"
                        variant="fullWidth"
                        centered={true}
                      >
                        <Tab value={'record'} onClick={() => this.selectAudioType('record')} className="form-tab" label={this.props.language.record} />
                        <Tab value={'upload'} onClick={() => this.selectAudioType('upload')} className="form-tab" label={this.props.language.upload} />
                        <Tab value={'reuse'} onClick={() => this.selectAudioType('reuse')} className="form-tab" label={this.props.language.reuse} />
                      </Tabs>
                      <div className="center-row-audio-time">
                        {
                          this.state.audioType === 'record' ?
                            this.state.story.nodes[this.state.selectedNode].audio !== '' ?
                              <div className="center-row-time">
                                <Button
                                  className="bar-button"
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => this.unPickAudioFile()}
                                >
                                  {this.props.language.recordAgain}
                                </Button>
                              </div>
                            :
                              <AudioRecorder
                                getFileInformation={this.getFileInformation.bind(this)}
                              />
                          : 
                            undefined 
                        }
                        {
                          this.state.audioType === 'upload' ?
                            this.state.story.nodes[this.state.selectedNode].audio !== '' ?
                              <div className="center-row-time">
                                <Button
                                  className="bar-button"
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => this.unPickAudioFile()}
                                >
                                  {this.props.language.changeAudio}
                                </Button>
                              </div>
                            :
                              <FileUpload
                                type='audio'
                                user={Meteor.userId()}
                                accept={'audio/*'}
                                label={this.props.language.uploadAudioButtonLabel}
                                getFileInformation={this.getFileInformation.bind(this)}
                                handleControlMessage={this.props.handleControlMessage.bind(this)}
                                language={this.props.language}
                              /> 
                          : 
                            undefined                     
                        }
                        {
                          this.state.audioType === 'reuse' ?
                            <div className="center-row-time">
                              <Button variant="contained" onClick={() => this.handleLibraryContent("audio")} color="secondary" className="bar-button">             
                                {this.props.language.reuseAudio}
                              </Button>
                            </div>
                          : 
                            undefined                     
                        }
                        <br/>
                        {
                          this.state.story.nodes[this.state.selectedNode].audio !== '' ?
                            <AudioPreview
                              file={this.state.story.nodes[this.state.selectedNode].audio}
                            />
                          :
                            undefined
                        }
                        {
                          this.state.saved ? undefined :
                            <DialogContent className="success-dialog-content">
                              <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                                {this.props.language.dstHelper1}
                              </DialogContentText>
                            </DialogContent>
                        }
                      </div>
                    </div>
                  :
                    undefined
                }
                {
                  this.state.action === 'image' ?
                    <div className="storytelling-menu-body-time">
                      <Tabs
                        color="primary"
                        value={this.state.imageType}
                        indicatorColor="primary"
                        textColor="primary"
                        className="form-tabs-container-media-time"
                        variant="fullWidth"
                        centered={true}
                      >
                        <Tab value={'upload'} onClick={() => this.selectImageType('upload')} className="form-tab" label={this.props.language.upload} />
                        <Tab value={'reuse'} onClick={() => this.selectImageType('reuse')} className="form-tab" label={this.props.language.reuse} />
                      </Tabs>
                      <div className="center-row-image-time"> 
                        {
                          this.state.imageType === 'upload' ?
                            this.state.story.nodes[this.state.selectedNode].images.length &&
                            this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage].file !== '' ?
                              <div className="center-row-time">
                                <Button
                                  className="bar-button"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => this.unPickImageFile()}
                                >
                                  {this.props.language.changeImage}
                                </Button>
                              </div>
                            :
                              <FileUpload
                                color='primary'
                                type='image'
                                user={Meteor.userId()}
                                accept={'image/*'}
                                label={this.props.language.uploadImageButtonLabel}
                                getFileInformation={this.getFileInformation.bind(this)}
                                handleControlMessage={this.props.handleControlMessage.bind(this)}
                                language={this.props.language}
                              />
                          : 
                            undefined                     
                        }
                        {
                          this.state.imageType === 'reuse' ?
                            <div className="center-row-time">
                              <Button variant="contained" onClick={() => this.handleLibraryContent("images")} color="primary" className="bar-button">
                                {this.props.language.reuseImg}
                              </Button>	
                            </div>
                          : 
                            undefined                     
                        }
                        {
                          this.state.story.nodes[this.state.selectedNode].images.length &&
                          this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage]["file"] !== '' ?
                            <div><br/><br/>
                              <ImagePreview
                                key={this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage].rotate}
                                file={this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage]["file"]}
                                rotateangle={this.rotateangle}
                                rotateAngle={this.state.story.nodes[this.state.selectedNode].images[this.state.selectedImage].rotate}
                              />
                            </div>
                          :
                            undefined
                        }
                      </div>
                    </div>
                  :
                    undefined
                }
                {
                  this.state.action === "image" || this.state.action === "audio" ?
                    undefined
                  :
                  <DialogActions>
                    <div className="dialog-actions-container-reuse">
                      { this.state.action === "reuse" ? this.props.language.audiomessage : this.props.language.videoLibraryMessage}
                    </div>
                  </DialogActions>
                }
              </React.Fragment> 
            :
              undefined
          }     
        </Dialog>
        <Dialog
          open={this.state.renameFile} ///true for show
          onClose={this.handleCloseRename}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="dialog-title">
            <AppBar className="dialog-app-bar" color="primary" position="static">
              <Toolbar className="dialog-tool-bar-information" variant="dense" disableGutters={true}>
                <h4 className="dialog-label-title">{this.props.language.renameFileTitle}</h4>
                <IconButton
                  id="close-icon"
                  edge="end"
                  className="dialog-toolbar-icon"
                  onClick={this.handleCloseRename}
                >
                  <CloseIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <div className="story-rename-container">
            <TextField
              id="rename-file-input"
              label={this.props.language.fileTitle}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              value={this.state.renameFileTitle}
              onChange={this.renameHandleChange()}
            />
          </div>
          <div className="dialog-actions-container">
            <Tooltip title={this.props.language.ok}>
              <Fab onClick={() => this.finishChangeFileName()} aria-label="file name changed" className="dialog-fab" color="primary">
                <DoneIcon />
              </Fab>
            </Tooltip>
          </div>
        </Dialog>
        {/* After publish */}
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
                  {
                    Meteor.user().profile.type === "student" ?
                      <Button
                        className="storytelling-publish-button-time"
                        color="primary"
                        onClick={() => this.handlePublishOnCourse()}
                      >
                        <p className="storytelling-publish-button-text-time">{this.props.language.publishOnACourse}</p>
                        <SchoolIcon className="storytelling-publish-icon-time"/>
                      </Button>
                    :
                    undefined
                  }
                  {
                    Meteor.user().profile.type === "student" ?
                      <Button
                        className="storytelling-publish-button-time"
                        color="primary"
                        onClick={() => this.handlePublishAsActivity()}
                      >
                        <p className="storytelling-publish-button-text-time">{this.props.language.sendAsActivity}</p>
                        <EditIcon className="storytelling-publish-icon-time"/>
                      </Button>
                    :
                      undefined
                  }
                  <Button
                    className="storytelling-publish-button-time"
                    color="primary"
                    onClick={() => this.handlePublishOnSocialNetwork()}
                  >
                    <p className="storytelling-publish-button-text-time">{this.props.language.publishOnSocialNetwork}</p>
                    <LanguageIcon className="storytelling-publish-icon-time"/>
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
                <div className="storytelling-share-btn-group-time">
                  <div className="storytelling-share-btn-time">
                    <FacebookShareButton
                      url={this.state.shareUrl}
                      quote={this.state.title}>
                      <FacebookIcon
                        size={64}
                        round />
                    </FacebookShareButton>
                  </div>
                  <div className="storytelling-share-btn-time">
                    <TwitterShareButton
                      url={this.state.shareUrl}
                      title={this.state.title}>
                      <TwitterIcon
                        size={64}
                        round />
                    </TwitterShareButton>  
                  </div>
                  <div className="storytelling-share-btn-time">
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
                        className="storytelling-course-publish-button-time"
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
                <DialogContentText className="dialog-center-subtitle" id="alert-dialog-title">
                  {`${this.props.language.publishStoryActivityText}:`}
                </DialogContentText>
                {
                  this.state.activities.map(activity => {
                    return(
                      <Button
                        color="primary"
                        className="storytelling-course-activity-publish-button-time"
                        onClick={() => this.completeActivity(activity.activityId, this.props.language.storySent, activity.courseId)}
                      >
                        {`${activity.course} - ${activity.source} | ${this.props.language.instructions} 
                        ${activity.instruction.length <= 50 ? activity.instruction : `${activity.instruction.slice(0,50)}...`}`}
                      </Button>
                    )
                  })
                }
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
export default withStyles(useStyles)(StorytellingToolTime)
