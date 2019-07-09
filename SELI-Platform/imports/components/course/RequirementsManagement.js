import React from 'react';
import Table from '../data_display/Table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

import { Requirements } from '../../../lib/RequirementsCollection'

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class RequirementsManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i] === ""){
        this.props.showControlMessage('The fields marked with * are required');
        isValid = false;
      }
    }
    this.showEmptyInputs(inputs);
    return isValid;
  }

  showEmptyInputs(input){
    let nameError = false;
    let descriptionError = false;
    let categoryError = false;
    if(input[0] === ""){
      nameError = true;
    }
    if(input[1] === ""){
      descriptionError = true;
    }
    if(!input[2]){
      categoryError = true;
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
    });
  }

  saveCategory(name, description, category){
    if(
      Requirements.insert({
        name: name,
        description: description,
        additionDate: new Date(),
        category: category,
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
    let inputs = [name, description, category];
    if(this.validateEmptyInputs(inputs)){
      this.saveCategory(name, description, category);
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
            <div className="dialog-form-container">
              <div className="dialog-input-container">
                <TextField
                  id="requirement-name-input"
                  label="Category name"
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
                  label="Category description"
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
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Category"
                  fullWidth
                  required
                  value={this.state.category}
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
            </div>
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
            <Button onClick={(event) => { this.props.deleteRequirements(this.state.delete); this.handleCloseDelete();}} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
