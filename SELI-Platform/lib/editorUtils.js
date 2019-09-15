export const initEditor = () => {
  var editor = editorIframe.document;
  editor.designMode = "on";
  let range = editor.createRange();
  range.setStart(editor.body, 0);
  range.setEnd(editor.body, 0);
  editor.body.focus();
  editor.execCommand('selectAll');
  editor.execCommand('delete', false, null);
  document.getElementById("editor-iframe").contentDocument.body.style.fontFamily = "Lato";
  document.getElementById("editor-iframe").contentDocument.body.style.overflowX = "hidden";
  document.getElementById("editor-iframe").contentDocument.body.style.overflowY = "scroll";
  document.getElementById("editor-iframe").contentDocument.body.style.wordBreak = "break-all";
}

export const insertHTML = (html) => {
  var editor = editorIframe.document;
  editor.execCommand("InsertHTML", false, html);
  editor.body.focus();
}

export const changeStyle = (command) => {
  var editor = editorIframe.document;
  editor.execCommand(command, false, null);
  editor.body.focus();
}

export const changeAligment = (command) => {
  var editor = editorIframe.document;
  editor.execCommand(command, false, null);
  editor.body.focus();
}

export const link = (url, word) => {
  var editor = editorIframe.document;
  editor.execCommand("InsertHTML", false, '<a style="font-family: Lato" target="_blank" href=' + url + '>' + word + '</a>');
  editor.body.focus();
}

export const getInnerHtml = () => {
  return document.getElementById("editor-iframe").contentWindow.document.body.innerHTML;
}

export const removeFormat = () => {
  var editor = editorIframe.document;
  editor.execCommand("RemoveFormat", false, null);
  editor.body.focus();
}
