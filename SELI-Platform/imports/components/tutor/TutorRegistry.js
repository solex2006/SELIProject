import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Tutors } from '../../../lib/TutorCollection';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';

/* Trasitions */
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

export default class TutorRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  delete(){
    Meteor.call('RemoveFile', this.props.tutors.imageId, function (err) {
      if (err)
      console.log(err);
    })
    if(Tutors.remove({_id: this.props.tutors._id})){
      this.props.showControlMessage("Tutor removed successfully");
    }
    else {
      this.props.showControlMessage("Could't remove this tutor, please try again");
    }
  }

  render() {
    return(
      <div>
        <div className="registry-container">
          <div className="registry-information-container">
            <div className="registry-icon-column">
              <p className="registry-first-letter">{this.props.tutors.name.charAt(0).toUpperCase()}</p>
            </div>
            <div className="registry-information-column">
              <div className="registry-text-information"><strong className="registry-attribute">Name</strong><p>{this.props.tutors.name}</p></div>
              <div className="registry-text-information"><strong className="registry-attribute">Email</strong><p>{this.props.tutors.email}</p></div>
              <div className="registry-text-information"><strong className="registry-attribute">Phone number</strong><p>{this.props.tutors.phoneNumber}</p></div>
              <div className="registry-paragraph-information"><strong className="registry-attribute">Biography</strong><p className="registry-multiline-text">{this.props.tutors.biography}</p></div>
              <a target="_blank" href={this.props.tutors.googleLink} className="registry-link-information">Google link</a>
              <a target="_blank" href={this.props.tutors.personalWebsite} className="registry-link-information">Web site</a>
            </div>
            <div className="registry-photo-column">
              <div className="registry-image" style={{ backgroundImage: "url(" + this.props.tutors.imageUrl + ")" }}></div>
            </div>
          </div>
          <Divider variant="middle" />
          {
            this.props.saveTutor ?
              <div className="crud-button-container">
                <Button className="registry-crud-button" color="primary">
                  Choose tutor
                </Button>
              </div>
            :
            <div className="crud-button-container">
              <Button onClick={this.handleClickOpen} className="registry-crud-button" color="primary">
                Delete
              </Button>
              <Button onClick={() => this.props.openEditForm(this.props.tutors)} className="registry-crud-button" color="primary">
                Edit
              </Button>
            </div>
          }
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          keepMounted
          TransitionComponent={Transition}
        >
          <DialogTitle className="modal-title" id="alert-dialog-title">{"Are you sure you want to delete this tutor?"}</DialogTitle>
          <DialogActions>
            <Button  onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={() => this.delete()} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
