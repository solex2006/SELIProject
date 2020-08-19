import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class BadgeNotification extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      modalOpen: this.props.modalOpen,
      badgeInformation: this.props.badgeInformation,
    };
    // this.saveUserBadge();
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  download = () => {
    //let link =this.state.badgeInformation.image.link;
    let link =
      "http://localhost:3000/Users/beldier/seli/seliDocuments/badges/CourseFilesCollection/mHcANYqjs3n8osYCL/original/mHcANYqjs3n8osYCL.png";
    // for non-IE
    if (!window.ActiveXObject) {
      var save = document.createElement("a");
      save.href = link;
      save.target = "_blank";
      var filename = link.substring(
        this.state.badgeInformation.image.link.lastIndexOf("/") + 1
      );
      save.download = this.state.badgeInformation.image.name || filename;
      if (
        navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
        navigator.userAgent.search("Chrome") < 0
      ) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }
    this.handleClose;
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
            titleStyle={{ textAlign: "center" }}
          >
            {this.props.language.badgeAwardMessage}
          </DialogTitle>
          <DialogContent className="BadgeNotificationDialog">
            <img
              src={this.state.badgeInformation.image.link}
              alt="Awarded Badge"
            />
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.badgeInformation.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.agree}
            </Button>
            <Button onClick={this.download} color="primary">
              {this.props.language.download}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
