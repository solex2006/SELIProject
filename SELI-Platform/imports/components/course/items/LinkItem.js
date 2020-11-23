import React from 'react';
import { Editor, EditorState, convertFromRaw } from "draft-js";

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.url, '_blank');
    win.focus();
  }

  Texteditor = (section) => {
    const contentState = convertFromRaw(section);
    const editorState =  EditorState.createWithContent(contentState);
    return editorState;
  }

  handleKeyPress = (event) => {
    console.log(event.keyCode)
    if (event.which == 13 || event.keyCode == 13) {
      this.openExternalLink();
    }
  }

  render() {
    return(
      <div className="content-box">
        <div 
          className="link-content-item"
          tabIndex="0" 
          onClick={() => this.openExternalLink()}
          onKeyPress={() => this.handleKeyPress(event)}
          aria-describedby={`link-content-${this.props.item.id}`}
        >
          <div id={`link-content-${this.props.item.id}`} className="link-item-container-html">
            <div aria-label={`${this.props.language.link}.`}></div>
            {
              this.props.item.attributes.description && (
                this.props.item.attributes.description.blocks ?
                  <Editor 
                    editorState={this.Texteditor(this.props.item.attributes.description)} readOnly={true} 
                  /> 
                :
                  <div 
                    dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}>
                  </div>
              )
            }
          </div>
        </div>
      </div>
      );
    }
  }
