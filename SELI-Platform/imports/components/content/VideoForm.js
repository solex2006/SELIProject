import React from 'react';
import FileUpload from '../files/FileUpload';
import VideoPreview from '../files//previews/VideoPreview';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Library from '../tools/Library';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HttpIcon from '@material-ui/icons/Http';
import Divider from '@material-ui/core/Divider';
import ReactPlayer from 'react-player'
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'row',
      description: true,
      alignment: 'row',
      showLibrary: false,
      addToGallery: false,
      options: [
        {label: 'Upload', value: 'upload', icon: <CloudUploadIcon/>},
        {label: 'Url', value: 'url', icon: <HttpIcon/>},
      ],
      selectedIndex: 0,
    }
  }

  handleChange = (event) => {
    this.setState({
      description: !this.state.description,
    });
  }

  handleClickListItem(event) {
    this.setState({
      anchorEl: event.target
    });
  }

  handleMenuItemClick(event, index) {
    this.setState({
      anchorEl: null,
      selectedIndex: index,
    });
    if (index === 1) {
      this.setState({
        showPreview: false,
        file: undefined,
      });
    }
  }

  alignmentHandleChange = (value) => {
    this.setState({
      alignment: value,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  clearInputs(){
    this.setState({
      alignment: 'row',
      description: true,
      alignment: 'row',
      showLibrary: false,
      addToGallery: false,
      selectedIndex: 0,
    });
  }

  getVideoAttributes(){
    let video = this.state.file;
    let source = this.state.options[this.state.selectedIndex].value;
    let alignment = this.state.alignment;
    let description = '';
    if (this.state.description) {
      description = this.state.innerHTML;
    }
    let videoContent = {
      video: video,
      description: description,
      alignment: alignment,
      source: source,
    };
    this.clearInputs();
    return videoContent;
  }

  getFileInformation(file){
    this.setState({
      file: file,
      showPreview: true,
      showGallery: false,
    });
  }

  unPickFile(){
    this.setState({
      showPreview: false,
      file: undefined,
    })
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  showLibrary(){
    this.setState({
      showGallery: true,
    })
  }

  hideLibrary(){
    this.setState({
      showGallery: false,
    })
  }

  urlHandleChange = name => event => {
    this.setState({
      showHelperText: false,
      url: event.target.value,
      validUrl: false,
    })
  }

  validateUrl(){
    let url = document.getElementById('url-input').value;
    let isValid = ReactPlayer.canPlay(url);
    let helperColor = '';
    let showHelperText = true;
    let urlMessage = '';
    if (isValid) {
      urlMessage = "The player can reproduce this type of source";
      helperColor = "#4caf50";
    }
    else {
      urlMessage = "The player can't reproduce this type of source";
      helperColor = "#f44336";
    }
    this.setState({
      showHelperText: showHelperText,
      urlMessage: urlMessage,
      helperColor: helperColor,
      validUrl: isValid,
      url: url,
    });
  }

  componentDidMount(){
    this.props.getVideoAttributesFunction(() => this.getVideoAttributes());
  }

  render() {
    return(
      <div>
        {
          !this.state.showGallery ?
            <div className="video-form">
              <List className="form-selector-list" component="nav" aria-label="Device settings">
                <ListItem
                  className="form-selector-list-item"
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="Text type"
                  onClick={() => this.handleClickListItem(event)}
                >
                  <ListItemText className="form-selector-list-text" primary="Select the source of the video: " secondary={this.state.options[this.state.selectedIndex].label} />
                  <ListItemIcon>
                    <KeyboardArrowDownIcon className="form-selector-list-icon"/>
                  </ListItemIcon>
                </ListItem>
              </List>
              <Popover
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                onClose={() => this.handleClose()}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                className="form-selector-container"
              >
                <List dense className="form-selector-options-list">
                  {this.state.options.map((option, index) => {
                    return (
                      <ListItem className="form-selector-options-list-item" onClick={() => this.handleMenuItemClick(event, index)} key={option.label} button>
                        <ListItemIcon>
                          {option.icon}
                        </ListItemIcon>
                        <ListItemText id={option.label} primary={`${option.label}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onClick={() => this.handleMenuItemClick(event, index)}
                            checked={this.state.selectedIndex === index}
                            inputProps={{ 'aria-labelledby': option.label }}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Popover>
              {
                !this.state.showPreview ?
                  <div className="form-file-container">
                    {
                      this.state.selectedIndex === 0 ?
                        <FileUpload
                          type="video"
                          accept={'video/*'}
                          getFileInformation={this.getFileInformation.bind(this)}
                        />
                      :
                      <div className="url-input-container">
                        <TextField
                          id="url-input"
                          label="Url"
                          margin="normal"
                          variant="outlined"
                          required
                          onChange={this.urlHandleChange()}
                          className="url-input"
                          helperText={ this.state.showHelperText ? <div className="url-helper-text" style={{color: this.state.helperColor}}>{this.state.urlMessage}</div> : undefined }
                        />
                        <Button onClick={() => this.validateUrl()} className="url-check-button" color="primary">Test source</Button>
                      </div>
                    }
                  </div>
                :
                <VideoPreview
                  file={this.state.file}
                  unPickFile={this.unPickFile.bind(this)}
                />
              }
              <div className="center-row">
                <p className="normal-text">Or</p>
              </div>
              <div className="center-row">
                <p className="normal-text">Pick one from your</p>
                <Button onClick={() => this.showLibrary()} color="primary" className="text-button">Library</Button>
              </div>
              <FormGroup className="content-radio-group-center" row>
                <FormControlLabel
                  className="form-label"
                  control={
                    <Checkbox color="primary" checked={this.state.description} onChange={() => this.handleChange('description')} value={this.state.description} />
                  }
                  label="Add text description to the video"
                />
              </FormGroup>
              {
                this.state.description ?
                  <div>
                    <div className="margin-center-row">
                      <p className="form-label">Video position:</p>
                      <Grid item>
                        <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                          <ToggleButton key={1} value="row" onClick={() => this.alignmentHandleChange("row")}>
                            <Tooltip title="Left side">
                              <VerticalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={2} value="row-reverse" onClick={() => this.alignmentHandleChange("row-reverse")}>
                            <Tooltip style={{transform: "rotate(180deg)"}} title="Right side">
                              <VerticalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={3} value="column-reverse" onClick={() => this.alignmentHandleChange("column-reverse")}>
                            <Tooltip title="Up">
                              <HorizontalSplitIcon className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                          <ToggleButton key={4} value="column" onClick={() => this.alignmentHandleChange("column")}>
                            <Tooltip title="Down">
                              <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                            </Tooltip>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </div>
                    <p className="form-editor-label">Write the description of the video below:</p>
                    <div className="editor-block">
                      <Editor
                        areaHeight="20vh"
                        buttonLabels={false}
                        addLinks={true}
                        getInnerHtml={this.getInnerHtml.bind(this)}
                      />
                    </div>
                  </div>
                :
                undefined
              }
            </div>
          :
          <Library
            user={"MyUser"}
            type={"video"}
            getFileInformation={this.getFileInformation.bind(this)}
            hideLibrary={this.hideLibrary.bind(this)}
          />
        }
      </div>
    );
  }
}
