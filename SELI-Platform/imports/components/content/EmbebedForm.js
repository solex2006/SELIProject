import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Editor from '../inputs/editor/Editor';

export default class EmbebedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'column',
      description: true,
    }
  }

  handleChange = (event) => {
    this.setState({
      description: !this.state.description,
    }, () => {
      if (this.state.description) {
        this.setState({
          alignment: 'column',
        });
      }
    });
  }

  alignmentHandleChange = (value) => {
    this.setState({
      alignment: value,
    });
  }

  clearInputs(){
    document.getElementById('url-input').value = "";
    this.setState({
      alignment: 'column',
    });
  }

  vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  getEmbebedAttributes(){
    let type = this.state.linkType;
    let emebebedContent = {};
    let content = this.state.innerHTML;
    let url = document.getElementById('url-input').value;
    let alignment = this.state.alignment;
    let size = {width: "100%", height: this.vhToPixels(100)};
    let description = this.state.description;
    emebebedContent = {
      content: content,
      url: url,
      alignment: alignment,
      size: size,
      description: description,
    };
    this.clearInputs();
    return emebebedContent;
  }

  componentDidMount(){
    this.props.getEmbebedAttributesFunction(() => this.getEmbebedAttributes());
  }

  render() {
    return(
      <div className="dialog-form-container">
        <TextField
          id="url-input"
          label="Url"
          margin="normal"
          variant="outlined"
          fullWidth
          required
          className="form-dialog-input"
          autoFocus={true}
        />
        <div className="margin-center-row">
          <FormGroup>
            <FormControlLabel
              control={<Switch size="small" onChange={() => this.handleChange('description')} checked={this.state.description}/>}
              label={<p className="form-label">Add a text description</p>}
            />
          </FormGroup>
          <p className="form-label">Text position:</p>
          <Grid item>
            <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
              <ToggleButton disabled={!this.state.description} key={1} value="column" onClick={() => this.alignmentHandleChange("column")}>
                <Tooltip title="Up">
                  <HorizontalSplitIcon className="toggle-button-icon"/>
                </Tooltip>
              </ToggleButton>
              <ToggleButton disabled={!this.state.description} key={2} value="column-reverse" onClick={() => this.alignmentHandleChange("column-reverse")}>
                <Tooltip title="Down">
                  <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </div>
        <div style={this.state.description ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
          <Editor
            areaHeight="20vh"
            buttonLabels={false}
            addLinks={true}
            getInnerHtml={this.getInnerHtml.bind(this)}
          />
        </div>
      </div>
    );
  }
}
