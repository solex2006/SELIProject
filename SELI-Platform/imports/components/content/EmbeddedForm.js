import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Help from '../tools/Help';

export default class EmbeddedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {
        url: '',
        description: '',
        hasDescription: false,
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
    });
  }

  getEmbeddedAttributes(){
    let emebedContent = this.state.attributes;
    let url = emebedContent.url;
    let size = {width: "100%", height: this.vhToPixels(100)};
    emebedContent.size = size;
    url = url.replace(/^http:\/\//i, 'https://');
    emebedContent.url = url;
    if (this.validateContent(emebedContent)) {
      return emebedContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.url === '') {
      this.props.handleControlMessage(true, this.props.language.urlAndDescriptionR);
      return false;
    }
    if (content.hasDescription && content.description === '') {
      this.props.handleControlMessage(true, this.props.language.enterDescriptionEmbedded);
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
    this.props.getEmbeddedAttributesFunction(() => this.getEmbeddedAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: {...this.props.contentToEdit.attributes},
      })
    }
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
        <div className="center-button-container">
          <Help
            helper="default"
            text={this.props.language.helpH5p}
            language={this.props.language}
          />
        </div>
        {/*  <div className="margin-center-row">
          <p className="form-label">{this.props.language.textPosition}</p>
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
          <p className="editor-label">{`${this.props.language.activityInstructions}:`}</p>
          <Editor
            areaHeight="20vh"
            buttonLabels={false}
            innerHTML={this.state.attributes.description}
            addLinks={false}
            getInnerHtml={this.getInnerHtml.bind(this)}
            language={this.props.language}
          />
        </div> */}
      </div>
    );
  }
}
