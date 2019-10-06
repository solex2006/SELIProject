import React from "react";
import ReactDOM from "react-dom";

import { ControlledEditor } from "@monaco-editor/react";

export default function CodeEditor(props) {
  const [code, setCode] = React.useState(props.content)
  const handleEditorChange = (ev, value) => {
    setCode(value);
    props.getCode(value);
  };

  return (
    <div style={{paddingTop: "12px"}}>
      <ControlledEditor
        height="45vh"
        onChange={handleEditorChange}
        language={props.language}
        value={code}
        theme={'light'}
      />
    </div>
  );
}
