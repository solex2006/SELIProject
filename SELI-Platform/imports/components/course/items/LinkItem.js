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

  render() {
    return(
      <div className="content-box">
        <div onClick={() => this.openExternalLink()} className="link-content-item">
          {
            this.props.item.attributes.description && (
              this.props.item.attributes.description.blocks ?
                <div className="link-item-container-html">
                  <Editor 
                    editorState={this.Texteditor(this.props.item.attributes.description)} readOnly={true} 
                  /> 
                </div>
              :
                <div className="link-item-container-html"
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}>
                </div>
            )
          }
        </div>
      </div>
      );
    }
  }
