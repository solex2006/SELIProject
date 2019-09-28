import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FileUpload from '../../files/FileUpload';

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'activity-panel',
      dialogText: '',
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  componentDidMount(){

  }

  doActivity = () => {
    this.handleClickOpen();
    let dialogText;
    let confirmAction;
    if (this.props.item.attributes.type === 'upload') {
      dialogText = `To complete this activity, upload the required file`,
      confirmAction = () => this.sendFile();
    }
    this.setState({
      dialogText: dialogText,
      confirmAction: confirmAction,
    });
  }

  sendFile = () => {
    console.log('yes');
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getFileInformation = () => {
    this.setState({
      file: file,
      showPreview: true,
    });
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      file: undefined,
    });
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="activity-content-item">
              <div>
                <div className="activity-item-container">
                  <div className="activity-container">
                    <ExpansionPanel
                      defaultExpanded
                      expanded={this.props.item.attributes.expanded}
                      onChange={this.handleChange('activity-panel')}
                      className="item-quiz-panel"
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id={this.props.item.id}
                        className="item-quiz-expansion-summary"
                      >
                        <div className="item-quiz-expansion-summary-text-container">
                          <Typography className="activity-panel-title">Activity</Typography>
                          <Typography className="quiz-panel-subtitle">
                            { this.props.item.attributes.type === 'storyboard' ? "Storytelling activity" : undefined }
                            { this.props.item.attributes.type === 'upload' ? "Upload file activity" : undefined }
                            { this.props.item.attributes.type === 'text' ? "Text section activity" : undefined }
                          </Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="item-quiz-detail">
                        <div className="item-quiz-detail-container">
                          <p className="activity-instruction-title">Instructions:</p>
                          <div className="activity-item-container-instruction">
                            {this.props.item.attributes.instruction}
                          </div>
                          {
                            this.props.item.attributes.type === 'upload' ?
                              <div className="activity-detail-container">
                                <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                                  Accepted file type:
                                </Typography>
                                {
                                  this.props.item.attributes.fileTypes.map (fileType => {
                                    return(
                                      <div>
                                        {
                                          fileType.selected ?
                                            <Typography className="file-type-text-detail" variant="overline" display="block" gutterBottom>
                                              {fileType.label}
                                            </Typography>
                                          :
                                          undefined
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            :
                            undefined
                          }
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions className="quiz-item-actions">
                        <Button size="medium">
                          Set reminder
                        </Button>
                        <Button onClick={() => this.doActivity()} size="medium" color="primary">
                          Do activity
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  </div>
                </div>
              </div>
            </div>
          :
          undefined
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">Do activity</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogText}
            </DialogContentText>
            {
              this.props.item.attributes.type === 'upload' ?
                <div>
                  {
                    !this.state.showPreview ?
                      <FileUpload
                        type={this.props.item.attributes.fileTypes[0].label.toLowerCase()}
                        accept={this.props.item.attributes.fileTypes[0].accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label="Click the button to upload your file"
                      />
                    :
                    <div>
                      File info
                    </div>
                  }
                </div>
              :
              undefined
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              Deliver activity
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }
