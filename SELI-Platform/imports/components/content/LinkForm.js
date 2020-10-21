import React from 'react';
import A11yEditor, { getText } from '../inputs/editor/A11yEditor';
import TextField from '@material-ui/core/TextField';
import Help from '../tools/Help';

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {
        url: '',
        description: '',
      }
    }
  }

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "url") {
      attributes.url = event.target.value;
    }
    this.setState({
      attributes: attributes,
    });
  }

  getLinkAttributes(){
    let linkContent = this.state.attributes;
    const childText = getText();
    linkContent.description = childText;
    if (this.validateContent(linkContent) ) {
      return linkContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.url === '' || content.description === null || content.description.blocks.text === "") {
      this.props.handleControlMessage(true, this.props.language.urlAndDescriptionR);
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

  componentDidMount(){
    this.props.getLinkAttributesFunction(() => this.getLinkAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      })
    }
  }

  render() {
    return(
      <div className="link-content-form-container">
        <TextField
          id="title-input"
          label="Url"
          placeholder="https://"
          margin="normal"
          variant="outlined"
          value={this.state.attributes.url}
          onChange={this.handleChange('url')}
          required
          className="form-padding-dialog-input"
        />
        <div className="center-button-container">
          <Help
              helper="hp5Helper"
              text={this.props.language.helpH5p}
              language={this.props.language}
            />
        </div>
        <div className="editor-block">
          <p className="editor-label">{this.props.language.textDescribingLink}</p>
          <A11yEditor
            textSection={this.state.attributes.description}
            language={this.props.language}
          />
          {/* <Editor
            areaHeight='20vh'
            innerHTML={this.state.attributes.description}
            buttonLabels={false}
            addLinks={false}
            getInnerHtml={this.getInnerHtml.bind(this)}
            language={this.props.language}
          /> */}
        </div>
      </div>
    );
  }
}
