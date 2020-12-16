import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

export default function CodeEditor(props) {
  const [code, setCode] = React.useState(props.content)
  const handleEditorChange = (ev, value) => {
    setCode(value);
    props.getCode(value);
  };

  return (
    <div style={{paddingTop: "12px"}}>
      <Editor
        height="45vh"
        onChange={handleEditorChange}
        value={code}
        theme={'light'}
      />
    </div>
  );
}
