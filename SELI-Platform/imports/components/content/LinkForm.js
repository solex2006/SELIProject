import React from 'react';
import LinkA11Y from '../accessibility/LinkAccessibilityForm';

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  clearInputs(){

  }

  getLinkAttributes(){
    let content = this.state.innerHTML;
    let linkContent = {
      content: content,
    };
    return linkContent;
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  componentDidMount(){
    this.props.getLinkAttributesFunction(() => this.getLinkAttributes());
  }

  render() {
    return(
      <div className="link-content-form-container">
        <div className="editor-block">
          <LinkA11Y
          />
        </div>
      </div>
    );
  }
}
