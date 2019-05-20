import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';
import { scaleRotate as Menu } from 'react-burger-menu'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          language: 0,
          traductions: [
            {
              languageLabel: 'LANGUAGE (US)',
              title: 'Platform',
              login: 'Log in',
              signup: 'Sign up',
              dialog: 'Choose the language',
              select: 'Language',
              confirmation: 'Ok',
              menuOption1: 'Courses',
              subMenuOption1: 'New Course',
            },
            {
              languageLabel: 'IDIOMA (ES)',
              title: 'Plataforma',
              login: 'Iniciar sesión',
              signup: 'Registarme',
              dialog: 'Escoge el idioma',
              select: 'Idioma',
              confirmation: 'Listo',
              menuOption1: 'Cursos',
              subMenuOption1: 'Nuevo curso',
            },
          ],
          expanded: 'coursesExpansionPanel',
          openMenu: false,
          courseForm: false,
        }
    }

    handleLanguageChange = name => event => {
      this.setState({
        [name]: Number(event.target.value)
      },() => {

      });
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };

    showForm(){
      this.setState({
        openMenu: false,
        courseForm: true,
      });
    }

    showHome(){
      this.setState({
        openMenu: false,
        courseForm: false,
      });
    }

    componentWillMount(){

    }

    render() {
        return(
            <div>
              <div id="outer-container">
                <Menu
                  pageWrapId={ "page-wrap" }
                  outerContainerId={ "outer-container" }
                  width={ '300px' }
                  isOpen={this.state.openMenu}>
                  <div onClick={() => this.showHome()} className="menu-title">{"SELI " + this.state.traductions[this.state.language].title}</div>
                  <div className="options-container">
                    <ExpansionPanel
                      expanded={this.state.expanded === 'coursesExpansionPanel'}
                      onChange={this.handleChange('coursesExpansionPanel')}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.state.traductions[this.state.language].menuOption1}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          <div className="sub-menu-container">
                            <div onClick={() => this.showForm()} className="sub-menu-option">{this.state.traductions[this.state.language].subMenuOption1}</div>
                          </div>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Menu>
                <main id="page-wrap">
                  <div className="main-container">
                    {
                      this.state.courseForm ?
                        <CourseForm
                          language={this.state.language}/>
                      :
                      <div>
                        <div className="main-image-container"></div>
                        <div className="main-text-container">
                          <div className="main-text-column">
                            <div id="main-text-white" className="main-text-row">SELI</div>
                            <div className="main-text-row">{this.state.traductions[this.state.language].title}</div>
                          </div>
                          <div className="main-text-icon"></div>
                        </div>
                        <div className="main-button-container">
                          <MuiThemeProvider theme={theme}>
                            <Button className="main-button" id="log-in-button" variant="contained" color="primary">
                              {this.state.traductions[this.state.language].login}
                            </Button>
                            <Button className="main-button" id="sign-up-button" variant="contained" color="primary">
                              {this.state.traductions[this.state.language].signup}
                            </Button>
                          </MuiThemeProvider>
                        </div>
                      </div>
                    }
                    <div className="language-container">
                      <MuiThemeProvider theme={theme}>
                        <Button  onClick={this.handleClickOpen}>{this.state.traductions[this.state.language].languageLabel}</Button>
                      </MuiThemeProvider>
                    </div>
                    <MuiThemeProvider theme={theme}>
                      <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                      >
                        <DialogTitle>{this.state.traductions[this.state.language].dialog}</DialogTitle>
                        <DialogContent>
                          <form>
                            <FormControl>
                              <InputLabel htmlFor="language-native-simple">{this.state.traductions[this.state.language].select}</InputLabel>
                              <Select
                                native
                                value={this.state.language}
                                onChange={this.handleLanguageChange('language')}
                                input={<Input id="language-native-simple" />}
                              >
                                <option value={0}>US</option>
                                <option value={1}>ES</option>
                              </Select>
                            </FormControl>
                          </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            {this.state.traductions[this.state.language].confirmation}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </MuiThemeProvider>
                  </div>
                </main>
              </div>
            </div>
        );
    }
}
