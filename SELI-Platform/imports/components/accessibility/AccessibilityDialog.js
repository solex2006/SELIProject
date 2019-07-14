import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Trasitions */
import Slide from '@material-ui/core/Slide';

import VideoAccessibilityForm from './VideoAccessibilityForm.js'

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

export default class AccessibilityDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClose = () => {
    this.setState({ open: false }, () => { this.props.hideAccesibilityForm() });
  };


  componentDidMount(){
    this.setState({
      open: this.props.open,
      contentType: this.props.contentType,
    });
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            keepMounted
            maxWidth={false}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle id="language-select-title">Content accessibility</DialogTitle>
            <DialogContent className="accessibility-form-container">
              {
                this.state.contentType === "video" ?
                  <VideoAccessibilityForm
                    showControlMessage={this.props.showControlMessage.bind(this)}
                    parentId={this.props.parentId}
                  />
                :
                  undefined
              }
            </DialogContent>
            <DialogActions className="accessibility-dialog-buttons">
              <Button onClick={this.handleClose} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
