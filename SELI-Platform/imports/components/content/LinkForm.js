import React from 'react';
import Editor from '../inputs/editor/Editor';
import TextField from '@material-ui/core/TextField';

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
    if (this.validateContent(linkContent) ) {
      return linkContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.url === '' || content.description === '') {
      this.props.handleControlMessage(true, "The url and the description are required fileds");
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
        <div className="padding-center-row">
          <p className="form-message">Text describing where the link is going: </p>
        </div>
        <div className="editor-block">
          <Editor
            areaHeight='20vh'
            innerHTML={this.state.attributes.description}
            buttonLabels={false}
            addLinks={false}
            getInnerHtml={this.getInnerHtml.bind(this)}
          />
        </div>
      </div>
    );
  }
}
