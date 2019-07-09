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

import { Modalities } from '../../../lib/ModalitiesCollection'

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class ModalitiesManagement extends React.Component {
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
    document.getElementById('modality-name-input').value = "";
    document.getElementById('modality-description-input').value = "";
  }

  saveModality(name, description){
    if(
      Modalities.insert({
        name: name,
        description: description,
        additionDate: new Date(),
      })
    ){
      this.props.showControlMessage("Modality created succesfully");
      this.clearInputs();
      this.handleClose();
    }
    else {
      this.props.showControlMessage("There was an error creating the modality, try again later");
    }
  }

  getData(){
    let name = document.getElementById('modality-name-input').value;
    let description = document.getElementById('modality-description-input').value;
    let inputs = [name, description];
    if(this.validateEmptyInputs(inputs)){
      this.saveModality(name, description);
    }
  }

  addModality(){
    this.getData();
  }

  deleteModalities(modalities){
    this.setState({
      delete: modalities,
    }, () => {
      this.handleClickOpenDelete();
    });
  }


  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Registered modalities</div>
          <div className="courses-table-container">
            <Table
              modalities={this.props.modalities}
              type="modality"
              add={this.addFromTable.bind(this)}
              deleteFunction={this.deleteModalities.bind(this)}
              headRows={this.state.headRows}
              tableToolbarHeader="Modalities general information"
              addLabel="add modality"
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
                  id="modality-name-input"
                  label="Modality name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={this.state.nameError}
                />
              </div>
              <div className="dialog-input-container">
                <TextField
                  id="modality-description-input"
                  label="Modality description"
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
              <Button onClick={() => this.addModality()} color="secondary">
                create modality
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
          <DialogTitle className="modal-title" id="alert-dialog-title">{"Are you sure you want to delete this modalities?"}</DialogTitle>
          <DialogActions>
            <Button  onClick={this.handleCloseDelete} color="primary">
              No
            </Button>
            <Button onClick={(event) => { this.props.deleteModalities(this.state.delete); this.handleCloseDelete();}} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
