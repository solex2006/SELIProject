import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SchoolIcon from '@material-ui/icons/School';
import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

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
      showSearchBar: false,
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

  toggleSearchBar = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar,
    });
  }

  render() {
    return(
      <div>
        <div className="app-bar-container">
          <p className="bar-title">SELI Project</p>
          <div className="bar-button-container">
            {
              this.props.user !== undefined ?
                <div>
                  {
                    this.props.user.profile.type === 'student' ?
                      <Button onClick={() => this.toggleSearchBar()} className="no-text-button">
                        <SearchIcon className="app-bar-search-icon"/>
                      </Button>
                    :
                    undefined
                  }
                </div>
              :
              undefined
            }
            {
              this.props.user === undefined ?
                <div>
                  <Button onClick={() => this.handleClickOpen("in")} color="primary" className="bar-button">
                    sign in
                  </Button>
                  <Button onClick={() => this.handleClickOpen("up")} color="secondary" className="bar-button">
                    sign up
                  </Button>
                </div>
              :
              <UserMenu
                user={this.props.user}
                showComponent={this.props.showComponent.bind(this)}
                logOut={this.props.logOut.bind(this)}
              />
            }
            <LanguageSelector
              setLanguage={this.setLanguage.bind(this)}
            />
          </div>
        </div>
        <Slide direction="down" in={this.state.showSearchBar} mountOnEnter unmountOnExit>
          <div className="app-bar-search-container">
            <Paper elevation={15} className="app-bar-search-paper">
              <IconButton className="app-bar-search-icon-button" aria-label="menu">
                <SchoolIcon className="app-bar-search-icon"/>
              </IconButton>
              <Divider className="app-bar-search-divider" orientation="vertical" />
              <InputBase
                fullWidth
                className="app-bar-search-input-base"
                placeholder="What do you want to learn about?"
                inputProps={{ 'aria-label': 'what do you want to learn about' }}
                autoFocus={true}
              />
            </Paper>
            <Button className="app-bar-search-button">Search courses</Button>
            <IconButton onClick={() => this.toggleSearchBar()} className="app-bar-search-icon-button" aria-label="menu">
              <CloseIcon className="app-bar-search-icon"/>
            </IconButton>
          </div>
        </Slide>
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
                  <SignUpForm
                    handleClickOpen={this.handleClickOpen.bind(this)}
                  />
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
