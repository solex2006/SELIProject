import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
          className="loading-snackbar"
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
          open={this.props.showLoadingMessage}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
              'aria-describedby': 'message-id',
          }}
          message={
            <div className="loading-snackbar-container" id="loading-id">
              <p className="loading-snackbar-text">{this.props.loadingMessage}</p>
              <CircularProgress className="loading-snackbar-progress" size={30} thickness={4.0}/>
            </div>
          }
        />
      </div>
      );
    }
  }
