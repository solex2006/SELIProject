import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import BounceLoader from 'react-spinners/BounceLoader';
import PeopleIcon from '@material-ui/icons/People';
import DevicesIcon from '@material-ui/icons/Devices';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import Help from '../tools/Help';

import { Disabilities } from '../../../lib/DisabilitiesCollection';
import { Requirements } from '../../../lib/RequirementsCollection';
import { Feedback } from '../../../lib/FeedbackCollection';

export default class CourseChoseModel extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      courseRequirements: {
        disabilitieAllowed: [],
        technicalRequirements: [],
      },
      disabilitieAllowed: [],
      technicalRequirements: [],
      lists: this.props.lists,
      courseInformation: this.props.courseInformation,
      loading: true,
      request: {
        name: '',
        description: '',
        type: '',
        technicalRequirement:'',
      },
      buildedItems: this.props.buildedItems,
      val: '',
      gui: '',
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectOption(index, select) {
    let lists = this.state.lists;
    let courseInformation = this.state.courseInformation;
    let listIndex = lists.findIndex(list => list.name === select);
    lists[listIndex].options[index].selected = !lists[listIndex].options[index].selected;
    let requirements = [];
    let support = [];
    for (var i = 0; i < lists.length; i++) {
      for (var j = 0; j < lists[i].options.length; j++) {
        if (lists[i].options[j].selected) {
          if (lists[i].name === "Disabilities") {
            support.push({_id: lists[i].options[j]._id, name: lists[i].options[j].name, description: lists[i].options[j].description});
          }
          else {
            requirements.push({_id: lists[i].options[j]._id, name: lists[i].options[j].name, description: lists[i].options[j].description});
          }
        }
      }
    }
    courseInformation.requirements = requirements;
    courseInformation.support = support;
    this.setState({
      lists: lists,
    });
  }

  buildItems() {
    let disabilitieAllowed = this.state.disabilitieAllowed;
    let technicalRequirements = this.state.technicalRequirements;
    let lists = this.state.lists;
    lists = [];
    if (disabilitieAllowed.length && technicalRequirements.length) {
      disabilitieAllowed.map(disabilitie => {disabilitie.selected = false});
      technicalRequirements.map(requirement => {requirement.selected = false});
      if (this.props.courseInformation.support.length) {
        let support = this.props.courseInformation.support;
        for (var i = 0; i < disabilitieAllowed.length; i++) {
          for (var j = 0; j < support.length; j++) {
            if (support[j]._id === disabilitieAllowed[i]._id) {
              disabilitieAllowed[i].selected = true;
              break;
            }
          }
        }
      }
      if (this.props.courseInformation.requirements.length) {
        let requirements = this.props.courseInformation.requirements;
        for (var i = 0; i < technicalRequirements.length; i++) {
          for (var j = 0; j < requirements.length; j++) {
            if (requirements[j]._id === technicalRequirements[i]._id) {
              technicalRequirements[i].selected = true;
              break;
            }
          }
        }
      }
      lists.push(
        {
          id: 1,
          name: "Disabilities",
          label: this.props.language.courseWillDisabilities,
          options: disabilitieAllowed,
          help: {helper: "default", text: this.props.language.disabilitieAre},
          icon: <PeopleIcon/>,
        },
/*         {
          id: 2,
          name: "Technical requirements",
          label: this.props.language.courseWillRequirements,
          options: technicalRequirements,
          help: {helper: "technicalRequirementsHelper", text: this.props.language.trAre},
          icon: <DevicesIcon/>,
        } */
      );
      this.setState({
        disabilitieAllowed: disabilitieAllowed,
        technicalRequirements: technicalRequirements,
        lists: lists,
        loading: false,
        buildedItems: true,
      });
    }
  }

  handleChange = name => event => {
    let request = this.state.request;
    if (name === 'name') {
      request.name = event.target.value;
    }
    else if (name === 'description') {
      request.description = event.target.value;
    }
    else if (name === 'type') {
      request.type = event.target.value;
    }
    else if (name === 'technicalRequirement') {
      request.technicalRequirement = event.target.value;
    }
    this.setState({
      request: request,
    });
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let disabilities = Disabilities.find().fetch();
        let requirements = Requirements.find({type: "technical"}).fetch();
        this.setState({
          disabilitieAllowed: disabilities,
          technicalRequirements: requirements,
        }, () => {
          this.setState({
            loading: false,
          })
          this.buildItems();
        });
      });
    })
  }

  validateRequest = () => {
    let request = this.state.request;
    if (request.type === '' || request.name === '' || request.description === '') {
      this.props.handleControlMessage(true, this.props.language.fieldsMarkedWith);
      return false;
    }
    return true;
  }

  sendRequest = () => {
    if (this.validateRequest()) {
      Feedback.insert({
        type: this.state.request.type,
        name: this.state.request.name,
        description: this.state.request.description,
        date: new Date(),
        from: Meteor.user().username,
        userId: Meteor.userId(),
        answered: false,
      }, () => {
        this.handleClose();
        this.props.handleControlMessage(true, this.props.language.requestAnswerSoon);
        this.setState({
          request: {
            name: '',
            description: '',
            type: '',
          },
        })
      })
    }
  }
  
  handleGuided = (event) => {
    this.setState({ gui: event.target.value });  
  };
  handleRadioChange = (event) => {
    //setValue(event.target.value);
    this.setState({ val: event.target.value });
    
    
  };
  unPickFile(){
    //this.state.fileType === "image" ?
    //this.setState({
    //  showPreview: false,
    //  image: undefined,
    //})
    //:
    //this.setState({
    //  showPreview: false,
    //  sylabus: undefined,
    //})
  }

  render() {
    return(
      <div className="requirements-container">
        <div style={{ width: '50%', marginLeft:'25%'}}>
          <FormControl component="fieldset">
              <FormLabel component="legend">How would you like to create your course?</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={this.state.val} onChange={this.handleRadioChange}>
                  <FormControlLabel value="free" control={<Radio />} label="Free" />
                  {
                  this.state.val == "free"?
                   this.state.courseInformation.sylabus !== undefined ?
                      <FormPreview
                        file={this.state.courseInformation.sylabus}
                        type="pdf"
                        unPickFile={this.unPickFile.bind(this)}
                        changeFile={this.changeFile.bind(this)}
                        courseSyllabus={this.props.language.courseSyllabus}
                      />
                    :
                      <Button onClick={() => this.openFileSelector("pdf", ".pdf")} className="form-file-button" fullWidth color="secondary"><PictureAsPdfSharpIcon className="form-image-icon"/>
                        {this.props.language.selectCourseSyllabus} <br/>
                        {this.props.language.required}
                      </Button>
                      :null
                  }
                  <FormControlLabel value="guided" control={<Radio />} label="With Guided Course Plan" />
                  {
                  this.state.val=="guided"?
                    <RadioGroup aria-label="quiz" name="quiz" value={this.state.gui} onChange={this.handleGuided}>
                      <FormControlLabel value="spiral" control={<Radio />} label="Spiral" />
                      <FormControlLabel value="consistent" control={<Radio />} label="Consistent" />
                      <FormControlLabel value="toybox" control={<Radio />} label="Toy Box" />
                      <FormControlLabel value="without" control={<Radio />} label="Without template" />
                    </RadioGroup>
                    :null
                  }
              </RadioGroup>
          </FormControl>           
            
            
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="form-dialog"
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{this.props.language.requirementRequest}</DialogTitle>
          <DialogContent>
            <div>
              <FormControl className="content-form-control" component="fieldset">
                <RadioGroup className="content-radio-group-center" aria-label="position" name="type" value={this.state.request.type} onChange={this.handleChange('type')} row>
                  <FormLabel className="form-radio-label" component="legend">{`${this.props.language.requirementType}*`}</FormLabel>
                  <FormControlLabel
                    value="technical"
                    control={<Radio color="primary" />}
                    label={this.props.language.technical}
                    labelPlacement="end"
                    className="radio-input"
                  />
                  <FormControlLabel
                    value="disabilitie"
                    control={<Radio color="primary" />}
                    label={this.props.language.disabilitie}
                    labelPlacement="end"
                    className="radio-input"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="name-input"
                label={this.props.language.name}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={this.state.request.name}
                onChange={this.handleChange('name')}
              />
              <TextField
                id="description-input"
                label={this.props.language.description}
                margin="normal"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                value={this.state.request.description}
                onChange={this.handleChange('description')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button onClick={this.sendRequest} color="primary">
              {this.props.language.send}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
