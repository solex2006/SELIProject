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

import Help from '../tools/Help';

import { People } from '../../../lib/PeopleCollection';
import { Requirements } from '../../../lib/RequirementsCollection';


export default class CourseRequirements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseRequirements: {
        audienceAllowed: [],
        technicalRequirements: [],
      },
      audienceAllowed: [],
      technicalRequirements: [],
      lists: [],
      loading: true,
      request: {
        name: '',
        description: '',
        type: '',
      },
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
    let listIndex = lists.findIndex(list => list.name === select);
    lists[listIndex].options[index].selected = !lists[listIndex].options[index].selected;
    this.setState({
      lists: lists,
    });
  }

  buildItems() {
    let audienceAllowed = this.state.audienceAllowed;
    let technicalRequirements = this.state.technicalRequirements;
    let lists = this.state.lists;
    if (audienceAllowed.length && technicalRequirements.length) {
      audienceAllowed.map(audience => {audience.selected = false});
      technicalRequirements.map(requirement => {requirement.selected = false});
      lists.push(
        {
          id: 1,
          name: "Audiences",
          label: "Select the audience that will be allowed to take your course",
          options: audienceAllowed,
          help: {helper: "audienceHelper", text: "Audiences are:"},
          icon: <PeopleIcon/>,
        },
        {
          id: 2,
          name: "Technical requirements",
          label: "Select the technical requirements that will be nedded to take your course",
          options: technicalRequirements,
          help: {helper: "technicalRequirementsHelper", text: "Technical Requirements are:"},
          icon: <DevicesIcon/>,
        }
      );
      this.setState({
        audienceAllowed: audienceAllowed,
        technicalRequirements: technicalRequirements,
        lists: lists,
        loading: false,
      });
    }
    else {
      this.setState({
        loading: true,
      })
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
      request.description = event.target.value;
    }
    this.setState({
      request: request,
    }, () => console.log(this.state.request));
  };

  componentDidMount() {
    Tracker.autorun(() => {
      let audiences = People.find().fetch();
      let requirements = Requirements.find({type: "Technical"}).fetch();
      this.setState({
        audienceAllowed: audiences,
        technicalRequirements: requirements,
      }, () => this.buildItems());
    });
  }

  componentWillUnmount(){

  }

  render() {
    return(
      <div className="requirements-container">
        {
          this.state.loading ?
            <div className="loading-library-container">
              <div className="loading-library-row">
                <div className="loading-library-container">
                  <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                </div>
                <p className="loading-library-text">{`Loading requirement lists`}</p>
              </div>
            </div>
          :
          <List subheader={<li />}>
            {this.state.lists.map(list => (
              <li key={list.id}>
                <ul>
                  <ListSubheader className="list-subheader">
                    <p className="form-select-text">{list.label}</p>
                    <div className="center-row">
                      <Help
                        helper={list.help.helper}
                        text={list.help.text}
                      />
                    </div>
                  </ListSubheader>
                  <List className="form-input-list">
                    {list.options.map((option, index) => (
                      <ListItem key={option._id} role={undefined} dense button onClick={() => this.selectOption(index, list.name)}>
                        <ListItemIcon>
                          {list.icon}
                        </ListItemIcon>
                        <ListItemText className="form-list-text-item" id={option._id} primary={`${option.name}`} secondary={`${option.description}`}/>
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            checked={option.selected}
                            tabIndex={-1}
                            disableRipple
                            onClick={() => this.selectOption(index, list.name)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </ul>
              </li>
            ))}
          </List>
        }
        <div className="requirement-request-container">
          <p className="requirement-request-text">
            If you think we are missing a requirement
          </p>
          <Button onClick={() => this.handleClickOpen()} color="primary" className="request-button">Let us know!</Button>
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
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">{`Requirement request`}</DialogTitle>
          <DialogContent>
            <div>
              <FormControl className="content-form-control" component="fieldset">
                <RadioGroup className="content-radio-group-center" aria-label="position" name="type" value={this.state.alignment} onChange={this.handleChange} row>
                  <FormLabel className="form-radio-label" component="legend">Requirement type*</FormLabel>
                  <FormControlLabel
                    value="technical"
                    control={<Radio color="primary" />}
                    label="Technical"
                    labelPlacement="end"
                    className="radio-input"
                  />
                  <FormControlLabel
                    value="audience"
                    control={<Radio color="primary" />}
                    label="Audience"
                    labelPlacement="end"
                    className="radio-input"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="name-input"
                label="Name"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={this.state.request.name}
                onChange={this.handleChange('title')}
              />
              <TextField
                id="description-input"
                label="Description"
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
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
