import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Help from '../tools/Help';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textType: 'title',
      alignment: 'center',
      options: [
        {label: 'Title', value: 'title'},
        {label: 'Subtitle', value: 'subtitle'},
        {label: 'Text section', value: 'section'},
      ],
      selectedIndex: 0,
    }
  }

  handleChange = (value) => {
    this.setState({
      alignment: value,
    });
  }

  clearInputs(){
    let type = this.state.options[this.state.selectedIndex].value;
    type !== "section" ? document.getElementById('content-input').value = "" : undefined;
    this.setState({
      selectedIndex: 0,
      alignment: 'center'
    });
  }

  getTextAttributes(){
    let type = this.state.options[this.state.selectedIndex].value;
    let content;
    type === "section" ? content = this.state.innerHTML : content = document.getElementById('content-input').value;
    let alignment = this.state.alignment;
    let textContent = {
      type: type,
      content: content,
      alignment: alignment,
    };
    this.clearInputs();
    return textContent;
  }

  componentDidMount(){
    this.props.getTextAttributesFunction(() => this.getTextAttributes());
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

  render() {
    return(
      <div className="text-form-container">
        <List className="form-selector-list" component="nav" aria-label="Device settings">
          <ListItem
            className="form-selector-list-item"
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Text type"
            onClick={() => this.handleClickListItem(event)}
          >
            <ListItemText className="form-selector-list-text" primary="Select the text type: " secondary={this.state.options[this.state.selectedIndex].label} />
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
          this.state.selectedIndex === 0 || this.state.selectedIndex === 1 ?
            <div>
              <div className="margin-center-row">
                <Help helper="textHelper" text="Structure and style to maximise readability and scanning:" />
                <p className="form-label">Alignment:</p>
                <Grid item>
                  <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                    <ToggleButton key={1} value="left" onClick={() => this.handleChange("left")}>
                      <Tooltip title="Left alignment">
                        <FormatAlignLeftIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton key={2} value="center" onClick={() => this.handleChange("center")}>
                      <Tooltip title="Center alignment">
                        <FormatAlignCenterIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton key={3} value="right" onClick={() => this.handleChange("right")}>
                      <Tooltip title="Right alignment">
                        <FormatAlignRightIcon className="toggle-button-icon"/>
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
              <TextField
                id="content-input"
                label={this.state.selectedIndex ? "Subtitle" : "Title"}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                className="full-width-input"
              />
            </div>
          :
          <div className="editor-block">
            <Editor
              areaHeight="20vh"
              buttonLabels={false}
              addLinks={false}
              getInnerHtml={this.getInnerHtml.bind(this)}
            />
          </div>
        }
      </div>
          );
        }
      }
