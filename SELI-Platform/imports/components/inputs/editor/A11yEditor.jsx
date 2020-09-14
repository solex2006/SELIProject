import React, { useState, useEffect }  from 'react';

import { 
  DraftailEditor,
  BLOCK_TYPE, 
  INLINE_STYLE,
  ENTITY_TYPE
} from "draftail";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

var editorState;

export const getText = () => {
  return editorState;
}

export default function A11yEditor(props) {
  useEffect(() => {
    editorState = props.textSection;
  }, [])

  const onSave = (newEditorState) => {
    editorState = newEditorState;
  }

  return(
    <div className="a11y-editor-container">
      <DraftailEditor
        rawContentState={props.textSection && props.textSection.blocks ? props.textSection : undefined}
        onSave={onSave}
        stripPastedStyles={false}
        inlineStyles={[
          { type: INLINE_STYLE.BOLD },
          { type: INLINE_STYLE.ITALIC },
          { type: INLINE_STYLE.UNDERLINE }
        ]}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_TWO },
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.BLOCKQUOTE },
          { type: BLOCK_TYPE.CODE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        /* entityTypes={[
          { type: ENTITY_TYPE.IMAGE},
          { type: ENTITY_TYPE.LINK},
        ]} */
      />
    </div>
  )
}
