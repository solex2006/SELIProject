import React from 'react';
import LanguageSelector from './LanguageSelector';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import { MdSearch } from "react-icons/md";

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  componentDidMount(){

  }

  setLanguage(){

  }

  handleClickOpen = (action) => {
    let dialogTitle = "";
    let color = "";
    if(action === "in"){
      dialogTitle = "Sign in to SELI";
      color = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary');
    }
    if(action === "up"){
      dialogTitle = "Sign up to SELI";
      color = getComputedStyle(document.documentElement)
      .getPropertyValue('--secondary');
    }
    this.setState({
      dialogTitle: dialogTitle,
      color: color,
      action: action,
    }, () => {
      this.setState({ open: true });
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return(
      <div>
        <div className="app-bar-container">
          <p className="bar-title">SELI Project</p>
          <div className="bar-button-container">
            <Button className="no-text-button">
              <MdSearch
                color={ "#FFFFFF" }
                size={ "1.75em" }
              />
            </Button>
            <Button onClick={() => this.handleClickOpen("in")} color="primary" className="bar-button">
              sign in
            </Button>
            <Button onClick={() => this.handleClickOpen("up")} color="secondary" className="bar-button">
              sign up
            </Button>
            <LanguageSelector
              setLanguage={this.setLanguage.bind(this)}
            />
          </div>
        </div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="sign-container"
        >
          <DialogTitle id="alert-dialog-slide-title" className="sign-title" style={{color: this.state.color}}>{this.state.dialogTitle}</DialogTitle>
          <Divider/>
          <DialogContent className="sign-content">
            <div className="sign-form">
              {
                this.state.action === "in" ?
                  <SignInForm/>
                :
                undefined
              }
              {
                this.state.action === "up" ?
                  <SignUpForm/>
                :
                undefined
              }
            </div>
          </DialogContent>
          <Divider light={true}/>
          {
            this.state.action === "in" ?
              <DialogActions className="sign-actions">
                <DialogContentText>
                  Don't have an account?
                </DialogContentText>
                <Button onClick={() => this.handleClickOpen("up")} color="secondary">
                  Sign up SELI
                </Button>
              </DialogActions>
            :
            undefined
          }
          {
            this.state.action === "up" ?
              <DialogActions className="sign-actions">
                <DialogContentText>
                  Already have an account?
                </DialogContentText>
                <Button onClick={() => this.handleClickOpen("in")} color="primary">
                  Sign in SELI
                </Button>
              </DialogActions>
            :
            undefined
          }
        </Dialog>
      </div>
    );
  }
}
