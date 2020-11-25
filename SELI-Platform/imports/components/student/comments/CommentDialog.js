import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CommentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = name => event => {
    if (name === 'comment') {
      this.setState({
        comment: event.target.value,
      });
    }
  };

  validateComment = () => {
    if (this.state.comment === '') {
      this.props.handleControlMessage(true, this.props.language.youCanSendEmpty);
      return false;
    }
    this.props.sendComment(this.state.comment);
    this.props.handleClose();
    this.setState({
      comment: '',
    });
  }

  render() {
    return(
      <div className="content-box">
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
        >
          <DialogContent className="success-dialog-content">
            <DialogTitle className="comment-dialog-text-text">
              {this.props.title}
            </DialogTitle>
            <TextField
              label={this.props.language.yourComment}
              margin="normal"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={5}
              value={this.state.comment}
              onChange={this.handleChange('comment')}
              error={this.state.showError && this.state.comment === ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary" autoFocus>
              {this.props.language.cancel}
            </Button>
            <Button onClick={() => this.validateComment()} color="primary" autoFocus>
              {this.props.language.send}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
