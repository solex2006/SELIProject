import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
/* pure js */
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});
function Transition(props) {
  return <Slide direction="left" {...props} />;
}

export default class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      language: 0,
    }
  }

  handleLanguageChange = name => event => {
    this.setState({
      [name]: Number(event.target.value)
    },() => {
      this.props.setLanguage(this.state.language);
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return(
      <div>
        <div className="language-container">
          <MuiThemeProvider theme={theme}>
            <Button id="language-selector-button" onClick={this.handleClickOpen}>Language US</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              keepMounted
            >
              <DialogTitle id="language-select-title">Choose your language</DialogTitle>
              <DialogContent>
                <form>
                  <FormControl>
                    <InputLabel htmlFor="language-native-simple">Language</InputLabel>
                    <Select
                      value={this.state.language}
                      onChange={this.handleLanguageChange('language')}
                      inputProps={{
                        name: 'language',
                        id: 'language-select',
                      }}
                    >
                      <MenuItem value={0}>US</MenuItem>
                      <MenuItem value={1}>ES</MenuItem>
                      <MenuItem value={2}>FR</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </MuiThemeProvider>
        </div>
      </div>
        )
      }
    }
