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
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Courses } from '../../../lib/CourseCollection';
import filter from '@mcabreradev/filter';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

Session.set("verifyPass",false);

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: false,
      openRequest: false,
      showSearchBar: false,
      searchText:'',
      showPreview: ''
    }
  }

  componentDidMount(){
    if(Accounts._verifyEmailToken){
      Session.set("verifyToken",Accounts._verifyEmailToken)
      Session.set("verifyPass",true);
      this.validatingEmail(Session.get("verifyToken"));
    }
    return Session.get("verifyPass");
  }

  handleClickOpen = (action) => {
    let dialogTitle = "";
    let color = "";
    if(action === "in"){
      dialogTitle = this.props.language.signInToSeli;
      color = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary');
    }
    if(action === "up"){
      dialogTitle = this.props.language.signUpToSeli;
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
  
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    this.handleClickOpen("in");
  };

  toggleSearchBar = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar,
    });
  }

  redirect = url => {
    this.props.history.push({
      pathname: url,
      state: {
        language: this.props.language,
      }
    });
  }

  validatingEmail = (token) => {
    Accounts.verifyEmail(
      token,
      (error) => {
        if (error) {
          this.handleError(error);
        }
        else {
          this.handleClickOpenDialog();
        }
      }
    );
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleClickOpenRequest = () => {
    this.setState({ openRequest: true });
  };

  handleSearchText=(event)=>{
    this.setState({
      searchText: event.target.value
    })
  }

  handleSearchButton=(event)=>{
    //let courses= Courses.find({}).fetch()
    let courses = Courses.find({published: true}).fetch();
    //console.log(courses)
    //console.log(filter(courses, { 'title': this.state.searchText}));
    let search=filter(courses, { 'title': this.state.searchText})
    this.setState({
      showPreview: 'showPreview'
    })
    this.props.searchValue(search,this.state.searchText )
  }

  appbar=()=>{
    return(
      <div>
        <div className="app-bar-container" >
          <div className="app-bar-container-text">
            {this.props.language.seliProject}
            
            <div className="SeliStoriesDiv"
            onClick={() => this.redirect('/StoriesDashboard', false)}
            >
            {this.props.language.seliStories}              

            </div>
          </div>

          <div className="bar-button-container" >
            {
              this.props.user !== undefined ?
                <div >
                  <Button tabIndex="1" onClick={() => this.toggleSearchBar()} className="no-text-button">
                    <SearchIcon tabIndex="1"  className="app-bar-search-icon"/>
                  </Button>
                </div>
              :
              undefined
            }
            {
              this.props.fromAnotherSource ? undefined :
                this.props.user === undefined ?
                  <div tabIndex="1">
                    <Button tabIndex="0" variant="contained" onClick={() => this.handleClickOpen("in")} color="primary" className="bar-button">
                      {this.props.language.signIn}
                    </Button>
                    <Button tabIndex="0" variant="contained" onClick={() => this.handleClickOpen("up")} color="secondary" className="bar-button">
                      {this.props.language.signUp}
                    </Button>
                  </div>
                :
                <UserMenu
                  language={this.props.language}
                  user={this.props.user}
                  showComponent={this.props.showComponent.bind(this)}
                  logOut={this.props.logOut.bind(this)}
                />
            }
            <LanguageSelector
              language={this.props.language}
              setLanguage={this.props.setLanguage.bind(this)}
            />
          </div>
        </div>
        <Slide   direction="down" in={this.state.showSearchBar} mountOnEnter unmountOnExit>
          <div   className="app-bar-search-container">
            <Paper tabIndex="-1" elevation={15} className="app-bar-search-paper">
              <Divider tabIndex="-1" className="app-bar-search-divider" orientation="vertical" />
              <InputBase
                fullWidth
                className="app-bar-search-input-base"
                placeholder={this.props.language.learnAbout}
                inputProps={{'aria-label': this.props.language.learnAbout}}
                autoFocus={true}
                onChange={this.handleSearchText}
              />
            </Paper>
            <Button className="app-bar-search-button" onClick={this.handleSearchButton}>{this.props.language.searchCourses}</Button>
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
          disableBackdropClick={true}
        >
        <DialogTitle id="alert-dialog-slide-title" className="sign-title" style={{color: this.state.color}}>{this.state.dialogTitle}</DialogTitle>
          <Divider/>
          <DialogContent className="sign-content">
            <div className="sign-form">
              {
                this.state.action === "in" ?
                  <SignInForm
                    language={this.props.language}
                    history={this.props.history}
                  />
                :
                undefined
              }
              {
                this.state.action === "up" ?
                  <SignUpForm
                    handleClose={this.handleClose.bind(this)}
                    history={this.props.history}
                    language={this.props.language}
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
                  {this.props.language.dontHaveAccount}
                </DialogContentText>
                <Button onClick={() => this.handleClickOpen("up")} color="secondary" variant="outlined">
                  {this.props.language.signUp}
                </Button>
              </DialogActions>
            :
            undefined
          }
          {
            this.state.action === "up" ?
              <DialogActions className="sign-actions">
                <DialogContentText>
                  {this.props.language.alreadyHaveAccount}
                </DialogContentText>
                <Button onClick={() => this.handleClickOpen("in")} color="primary" variant="outlined">
                  {this.props.language.signIn}
                </Button>
              </DialogActions>
            :
            undefined
          }
          <Divider light={true}/>
          {
            this.state.action === "in" ?
              <DialogActions className="sign-actions">
                <Button onClick={() => this.redirect('/RetrievePasswd')} variant="outlined">
                  {`${this.props.language.forgotPasswdAccount}`}
                </Button>
              </DialogActions>
            :
            undefined
          }
        </Dialog>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-success"
          aria-describedby="alert-dialog-success"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.props.language.emailValidated}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.props.language.accountSuccessfully}
            </DialogContentText>
            <CheckCircleIcon className="success-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseDialog()} color="secondary" variant="outlined" autoFocus>
              {this.props.language.ok}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    return(
      <div >
        {
          this.appbar()
        }
      </div>
    );
  }
}
