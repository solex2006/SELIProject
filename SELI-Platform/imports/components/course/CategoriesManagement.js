import React from 'react';
import Table from '../data_display/Table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

import { Categories } from '../../../lib/CategoriesCollection'

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class CategoriesManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headRows: [
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Addition date' },
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
    if(input[0] === ""){
      nameError = true;
    }
    if(input[1] === ""){
      descriptionError = true;
    }
    this.setState({
      nameError: nameError,
      descriptionError: descriptionError,
    });
  }

  clearInputs(){
    document.getElementById('category-name-input').value = "";
    document.getElementById('category-description-input').value = "";
  }

  saveCategory(name, description){
    if(
      Categories.insert({
        name: name,
        description: description,
        additionDate: new Date(),
      })
    ){
      this.props.showControlMessage("Category created succesfully");
      this.clearInputs();
      this.handleClose();
    }
    else {
      this.props.showControlMessage("There was an error creating the category, try again later");
    }
  }

  getData(){
    let name = document.getElementById('category-name-input').value;
    let description = document.getElementById('category-description-input').value;
    let inputs = [name, description];
    if(this.validateEmptyInputs(inputs)){
      this.saveCategory(name, description);
    }
  }

  addCategory(){
    this.getData();
  }

  deleteCategories(categories){
    this.setState({
      delete: categories,
    }, () => {
      this.handleClickOpenDelete();
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
              categories={this.props.categories}
              type="category"
              add={this.addFromTable.bind(this)}
              deleteFunction={this.deleteCategories.bind(this)}
              headRows={this.state.headRows}
              tableToolbarHeader="Categories general information"
              addLabel="add category"
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
          <DialogTitle id="language-select-title">Modality editor</DialogTitle>
          <DialogContent className="form-dialog">
            <div className="dialog-form-container">
              <div className="dialog-input-container">
                <TextField
                  id="category-name-input"
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
                  id="category-description-input"
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
            </div>
          </DialogContent>
          <DialogActions>
            <div className="form-button-container">
              <Button onClick={() => this.addCategory()} color="secondary">
                create category
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
            <Button onClick={(event) => { this.props.deleteCategories(this.state.delete); this.handleCloseDelete(); this.setSelected();}} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
