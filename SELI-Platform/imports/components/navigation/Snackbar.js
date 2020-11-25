import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default class SnackbarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    if (!this.props.flag) {
      this.showCreatorToolMessage();
    }
  }

  handleSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  showCreatorToolMessage(type) {
    this.handleSnackbar();
  }

  render() {
    return(
      <div>
        <Snackbar
          className="navigation-snackbar"
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          key={"navigation-tool-snackbar"}
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar}
          style={{top: `${this.props.fromTop + this.props.index*70}px`}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          TransitionComponent={TransitionRight}
          message={
            <div className="snackbar-row">
              <InfoIcon className="snackbar-icon"/>
              <div className="navigation-message-container">
                <p className="snackbar-message-title">{this.props.title}</p>
                <p>{this.props.label}</p>
              </div>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
      );
    }
  }