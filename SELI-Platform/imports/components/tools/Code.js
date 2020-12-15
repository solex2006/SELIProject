import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

export default function Code(props) {

  let lines = props.code.split(/\r\n|\r|\n/).length;
  let height;
  let theme = props.theme;
  if(lines < 20) {
    height = lines * 2.5;
    height = `${height}vh`;
  }
  else {
    height = "50vh"
  }

  const handleEditorChange = (ev, value) => {
      return props.code;
  };

  return (
    <div style={{paddingTop: "12px"}}>
      <Editor
        height={height}
        language={props.language}
        value={props.code}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
}
