import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Iframe from 'react-iframe'
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});
function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class LearningActivityEditor extends React.Component {
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

  showActivityPreview() {
    let url = document.getElementById('url-input').value;
    this.setState({
      url: url,
    });
    this.handleClickOpen();
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Learning activity</div>
          <MuiThemeProvider theme={theme}>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Learning activity name"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Learning activity objective"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="form-subtitle">Content</div>
            <div className="input-container">
              <TextField
                id="url-input"
                label="H5P URL"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="form-button-container">
              <Button onClick={() => this.showActivityPreview()} className="create-button" variant="contained" color="primary">
                Show preview
              </Button>
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
              <DialogTitle id="language-select-title">H5P Activity preview</DialogTitle>
              <DialogContent>
                <div className="HP5-content-preview-container">
                  <Iframe url={this.state.url}
                    width="100%"
                    height="100%"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    loading="Loading..."
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <div className="form-button-container">
              <Button onClick={() => this.props.showForm("UnitsEditor")} className="form-button" id="upload-button" variant="contained" color="secondary">
                Save learning activity
              </Button>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}
