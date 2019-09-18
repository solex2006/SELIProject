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
      attributes: {
        url: '',
        description: '',
        hasDescription: true,
        alignment: 'column',
      }
    }
  }

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "url") {
      attributes.url = event.target.value;
    }
    else if (name === "alignment") {
      attributes.alignment = event.target.value;
    }
    else if (name === "hasDescription") {
      attributes.hasDescription = !attributes.hasDescription;
    }
    this.setState({
      attributes: attributes,
    }, () => console.log(this.state.attributes));
  }

  getEmbebedAttributes(){
    let emebedContent = this.state.attributes;
    let size = {width: "100%", height: this.vhToPixels(100)};
    emebedContent.size = size;
    if (this.validateContent(emebedContent)) {
      return emebedContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.url === '' || content.description === '') {
      console.log("required");
      return false;
    }
    if (content.hasDescription && content.description === '') {
      console.log("enter a description or turn off");
      return false;
    }
    return true;
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.description = innerHTML;
    this.setState({
      attributes: attributes,
    });
  }

  vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
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
          placeholder="https://"
          fullWidth
          required
          className="form-dialog-input"
          value={this.state.attributes.url}
          onChange={this.handleChange('url')}
          autoFocus={true}
        />
        <div className="margin-center-row">
          <FormGroup>
            <FormControlLabel
              control={<Switch size="small" onChange={this.handleChange('hasDescription')} checked={this.state.attributes.hasDescription}/>}
              label={<p className="form-label">Add a text description</p>}
            />
          </FormGroup>
          <p className="form-label">Text position:</p>
          <Grid item>
            <ToggleButtonGroup onChange={this.handleChange('alignment')} size="small" value={this.state.attributes.alignment} exclusive>
              <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={1} value="column">
                <Tooltip title="Up">
                  <HorizontalSplitIcon className="toggle-button-icon"/>
                </Tooltip>
              </ToggleButton>
              <ToggleButton className="toggle-button" disabled={!this.state.attributes.hasDescription} key={2} value="column-reverse">
                <Tooltip title="Down">
                  <HorizontalSplitIcon style={{transform: "rotate(180deg)"}} className="toggle-button-icon"/>
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </div>
        <div style={this.state.attributes.hasDescription ? undefined :{pointerEvents: "none", userSelect: "none"}} className="editor-block">
          <Editor
            areaHeight="20vh"
            buttonLabels={false}
            innerHTML={this.state.attributes.description}
            addLinks={false}
            getInnerHtml={this.getInnerHtml.bind(this)}
          />
        </div>
      </div>
    );
  }
}
