import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export default class ControlSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.handleControlMessage(false);
  }

  render() {
    return(
      <div>
        <Snackbar
          className="control-snackbar"
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
          open={this.props.showControlMessage}
          autoHideDuration={8000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
              'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.controlMessage}</span>}
          action={[
            this.props.showControlAction ?
              <Button key="undo" color="primary" size="small" onClick={() => {this.handleCloseSnackbar(); this.props.controlAction()}}>
                {this.props.controlActionMessage}
              </Button> : undefined,
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.handleCloseSnackbar()}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
      );
    }
  }
