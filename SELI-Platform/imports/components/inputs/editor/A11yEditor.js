import React, { Component } from 'react';

import { 
  DraftailEditor,
  BLOCK_TYPE, 
  INLINE_STYLE 
} from "draftail";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textSection: this.props.textSection
    }
  }

  onSave = (editorState) => {
    this.setState({
      textSection: editorState,
    });
  }

  getText = () => {
    return this.state.textSection;
  }

  render() {
    return(
      <div className="a11y-editor-container">
        <DraftailEditor
          rawContentState={this.props.textSection && this.props.textSection.blocks ? this.props.textSection : undefined}
          onSave={this.onSave}
          blockTypes={[
            { type: BLOCK_TYPE.HEADER_THREE },
            { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
          ]}
          inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
        />
      </div>
      )
    }
  }
