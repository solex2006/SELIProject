import React from 'react';
import Table from '../data_display/Table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme.js';

import { Requirements } from '../../../lib/RequirementsCollection'

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class RequirementsManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirementType: '',
      category: '',
      headRows: [
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Addition date' },
        { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
      ],
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  addFromTable(){
    this.handleClickOpen();
  }

  handleChangeCategory = name => event => {
    this.setState({
      category: event.target.value,
    });
  };

  validateEmptyInputs(inputs){
    let isValid = true;
    console.log(inputs);
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i] === "" || inputs[i] === undefined){
        this.props.showControlMessage('The fields marked with * are required');
        isValid = false;
      }
    }
    this.showEmptyInputs(inputs);
    return isValid;
  }

  showEmptyInputs(inputs){
    let nameError = false;
    let descriptionError = false;
    let categoryError = false;
    let typeError = false;
    if(inputs[0] === ""){
      nameError = true;
    }
    if(inputs[1] === ""){
      descriptionError = true;
    }
    if(inputs[2] === undefined){
      categoryError = true;
    }
    if(inputs[3] === ""){
      typeError = true;
    }
    this.setState({
      nameError: nameError,
      descriptionError: descriptionError,
      categoryError: categoryError,
    });
  }

  clearInputs(){
    document.getElementById('requirement-name-input').value = "";
    document.getElementById('requirement-description-input').value = "";
    this.setState({
      category: '',
      requirementType: '',
    });
  }

  saveRequirement(name, description, category, type){
    if(
      Requirements.insert({
        name: name,
        description: description,
        additionDate: new Date(),
        category: category,
        type: type,
      })
    ){
      this.props.showControlMessage("Category created succesfully");
      this.clearInputs();
      this.handleClose();
    }
    else {
      this.props.showControlMessage("There was an error creating the requirement, try again later");
    }
  }

  getData(){
    let name = document.getElementById('requirement-name-input').value;
    let description = document.getElementById('requirement-description-input').value;
    let categories = this.props.categories;
    let category = categories.find(c => c._id === this.state.category);
    let type = this.state.requirementType;
    if(type === ""){
      this.props.showControlMessage("Please select the requirement type");
      return;
    }
    else {
      if(type === "Technical"){
        category = {};
        category.name = type;
      }
      let inputs = [name, description, category];
      if(this.validateEmptyInputs(inputs)){
        this.saveRequirement(name, description, category, type);
      }
    }
  }

  addRequirement(){
    this.getData();
  }

  deleteRequirements(requirements){
    this.setState({
      delete: requirements,
    }, () => {
      this.handleClickOpenDelete();
    });
  }

  getRequirementType = event => {
    this.setState({
      requirementType: event.target.value,
    });
  }

  setSelected(){}

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Registered categories</div>
          <div className="courses-table-container">
            <Table
              requirements={this.props.requirements}
              type="requirement"
              add={this.addFromTable.bind(this)}
              deleteFunction={this.deleteRequirements.bind(this)}
              headRows={this.state.headRows}
              tableToolbarHeader="Requirements general information"
              addLabel="add requirement"
              setSelectedFunction={selected => this.setSelected = selected}
            />
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth={false}
          style={{display: "flex", justifyContent: "center", maxWidth: "none"}}
        >
          <DialogTitle id="language-select-title">Requirement editor</DialogTitle>
          <DialogContent className="form-dialog">
            <MuiThemeProvider theme={theme}>
              <div className="dialog-form-container">
                <div className="dialog-input-container">
                  <TextField
                    id="requirement-name-input"
                    label="Requirement name"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    error={this.state.nameError}
                  />
                </div>
                <div className="dialog-input-container">
                  <TextField
                    id="requirement-description-input"
                    label="Requirement description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows="3"
                    error={this.state.descriptionError}
                  />
                </div>
                <div className="dialog-input-container">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="radio-label">Select the type of requirement</FormLabel>
                  </FormControl>
                  <RadioGroup aria-label="position" name="position" value={this.state.requirementType} onChange={this.getRequirementType} row>
                    <FormControlLabel
                      value="Knowledge"
                      control={<Radio color="primary" />}
                      label="Knowledge"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Technical"
                      control={<Radio color="primary" />}
                      label="Technical"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
                {
                  this.state.requirementType === 'Knowledge' ?
                    <div className="dialog-input-container">
                      <TextField
                        id="category-input"
                        select
                        label="Category"
                        fullWidth
                        required
                        value={this.state.category}
                        error={this.state.categoryError}
                        onChange={this.handleChangeCategory('category')}
                        SelectProps={{
                          MenuProps: {

                          },
                        }}
                        margin="normal"
                        variant="outlined"
                      >
                        {this.props.categories.map(option => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  :
                  undefined
                }
              </div>
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions>
            <div className="form-button-container">
              <Button onClick={() => this.addRequirement()} color="secondary">
                create requirement
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openDelete}
          onClose={this.handleCloseDelete}
          keepMounted
          TransitionComponent={Transition}
        >
          <DialogTitle className="modal-title" id="alert-dialog-title">{"Are you sure you want to delete this categories?"}</DialogTitle>
          <DialogActions>
            <Button  onClick={this.handleCloseDelete} color="primary">
              No
            </Button>
            <Button onClick={(event) => { this.props.deleteRequirements(this.state.delete); this.handleCloseDelete(); this.setSelected();}} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
