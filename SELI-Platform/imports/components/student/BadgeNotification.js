import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class BadgeNotification extends React.Component  {
  constructor(props){
      super(props);
      console.log(props);
      this.state = {
          modalOpen: this.props.modalOpen,
          badgeInformation: this.props.badgeInformation,
      }
  }

  handleClose = () => {
    this.setState({modalOpen:false});
  };

  render() {
      return (
        <div>
          <Dialog
            open={this.state.modalOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle 
              id="alert-dialog-slide-title"
              titleStyle={{textAlign: "center"}}
            >{"Congratulations! \n You won the badge"}</DialogTitle>
            <DialogContent className="BadgeNotificationDialog">

              <img 
                src= {this.state.badgeInformation.image.link}
                alt="Awarded Badge"
                />
              <DialogContentText id="alert-dialog-slide-description">
                {this.state.badgeInformation.name}
              </DialogContentText>  
      
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Agree
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Download
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
}
