import React, { Component } from 'react';
import { initEditor, changeStyle, changeAligment, link, insertHTML, removeFormat, getInnerHtml } from '../../../../lib/editorUtils';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import LinkButton from './LinkButton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../../style/theme.js';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'left',
      formats: [],
    }
  }

  setActiveStyle(button, selected){
    if (button === 'bold') {
      this.setState({ boldSelected: selected === "contained" ? "text" : "contained" });
    }
    else if (button === 'italic') {
      this.setState({ italicSelected: selected === "contained" ? "text" : "contained" });
    }
    else if (button === 'underlined') {
      this.setState({ underlinedSelected: selected === "contained" ? "text" : "contained" });
    }
  }

  setActiveAligment(alignment){
    this.setState({
      alignment: alignment,
    })
  }

  componentDidMount(){
    initEditor();
    this.initClickEvent();
    this.props.innerHTML !== '' ? insertHTML(this.props.innerHTML) : this.clearEditor();
  }

  clearEditor() {

  }

  initClickEvent(){
    var editor = editorIframe.document;
    var win = document.getElementById("editor-iframe").contentWindow;
    let self = this;
    editor.addEventListener("click", function(event) {
      self.checkLastNodeStyle(win.getSelection());
      self.checkLastNodeAligment(win.getSelection());
      //console.log(win.getSelection());
    }, false);
    editor.addEventListener("input", function(event) {
      self.checkLastNodeStyle(win.getSelection());
      self.checkLastNodeAligment(win.getSelection());
      self.getInnerHtml();
    }, false);
    editor.addEventListener("paste", function(event) {
      self.pasteWithNoStyle(event);
    }, false);
    editor.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        removeFormat();
      }
    });
  }

  getInnerHtml(){
    this.props.getInnerHtml(getInnerHtml());
  }

  pasteWithNoStyle(event){
    var sanitizeHtml = require('sanitize-html');
    let pasteHtml = event.clipboardData.getData('text/html');
    pasteHtml = sanitizeHtml(pasteHtml);
    event.preventDefault();
    insertHTML(pasteHtml);
  }

  isRangeSelection(){
    var editor = editorIframe.document;
    var win = document.getElementById("editor-iframe").contentWindow;
    if (win.getSelection().type === 'Caret') {
      return false;
    }
    if (win.getSelection().type === 'Range') {
      return true;
    }
  }

  getTag(tag){
    if (tag === 'b') {
      return 'b'
    } else if (tag === 'i') {
      return 'i'
    } else if (tag === 'u') {
      return 'u'
    } else if (tag === 'strong') {
      return 'strong'
    }

  }

  checkLastNodeAligment(selection){
    var editor = editorIframe.document;
    let parent = selection.focusNode.parentElement;
    let parents = [];
    if (parent.localName === 'body' || parent.localName === 'html') {
      //console.log('left');
    }
    else if (parent.localName === 'div') {
      //console.log('alig');
      //console.log(parent.attributes[0].value);
    }
    else {
      parent = parent.parentElement;
      if (parent.localName === 'body' || parent.localName === 'html') {
        //console.log('left');
      }
      else if (parent.localName === 'div') {
        //console.log('alig');
        //console.log(parent.attributes[0].value);
      }
      else {
        parent = parent.parentElement;
        if (parent.localName === 'body' || parent.localName === 'html') {
          //console.log('left');
        }
        else if (parent.localName === 'div') {
          //console.log('alig');
          //console.log(parent.attributes[0].value);
        }
        else {
          parent = parent.parentElement;
          if (parent.localName === 'body' || parent.localName === 'html') {
            //console.log('left');
          }
          else if (parent.localName === 'div') {
            //console.log('alig');
            //console.log(parent.attributes[0].value);
          }
        }
      }
    }
  }

  checkLastNodeStyle(selection){
    var editor = editorIframe.document;
    let parent = selection.focusNode.parentElement;
    let parents = [];
    if (parent.localName !== 'body' && parent.localName !== 'html') {
      parents.push(this.getTag(parent.localName));
      parent = parent.parentElement;
      if (parent.localName !== 'body') {
        parents.push(this.getTag(parent.localName));
        parent = parent.parentElement;
        if (parent.localName !== 'body') {
          parents.push(this.getTag(parent.localName));
        }
      }
    }
    if(parents.includes('b') || parents.includes('strong')) {
      this.setActiveStyle('bold', 'text');
    }
    else {
      this.setActiveStyle('bold', 'contained');
    }
    if(parents.includes('i')) {
      this.setActiveStyle('italic', 'text');
    }
    else {
      this.setActiveStyle('italic', 'contained');
    }
    if(parents.includes('u')) {
      this.setActiveStyle('underlined', 'text');
    }
    else {
      this.setActiveStyle('underlined', 'contained');
    }
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div className="editor-container">
            <p className="editor-label">TEXT EDITOR</p>
            <div className="editor-tools">
              <Grid item>
                <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                  <ToggleButton key={1} value="left" onClick={() => {changeAligment('justifyLeft'); this.setActiveAligment("left")}}>
                    <Tooltip title="Left alignment">
                      <FormatAlignLeftIcon className="toggle-button-icon"/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton key={2} value="center" onClick={() => {changeAligment('justifyCenter'); this.setActiveAligment("center")}}>
                    <Tooltip title="Center alignment">
                      <FormatAlignCenterIcon className="toggle-button-icon"/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton key={3} value="right" onClick={() => {changeAligment('justifyRight'); this.setActiveAligment("right")}}>
                    <Tooltip title="Right alignment">
                      <FormatAlignRightIcon className="toggle-button-icon"/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton className="last-child-button" key={4} value="justify" onClick={() => {changeAligment('justifyFull'); this.setActiveAligment("justify")}}>
                    <Tooltip title="Justify">
                      <FormatAlignJustifyIcon className="toggle-button-icon"/>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid style={{marginLeft: "1vw"}}>
                <ToggleButtonGroup size="small">
                  <ToggleButton color="primary" selected={this.state.boldSelected} onClick={() => {changeStyle('bold'); this.setActiveStyle('bold', this.state.boldSelected)}} value="bold">
                    <FormatBoldIcon />
                  </ToggleButton>
                  <ToggleButton selected={this.state.italicSelected} onClick={() => {changeStyle('italic'); this.setActiveStyle('italic', this.state.italicSelected)}} value="italic">
                    <FormatItalicIcon />
                  </ToggleButton>
                  <ToggleButton selected={this.state.underlinedSelected} onClick={() => {changeStyle('underline'); this.setActiveStyle('underlined', this.state.underlinedSelected)}} value="underlined">
                    <FormatUnderlinedIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              {
                this.props.addLinks ?
                  <Grid style={{marginLeft: "1vw"}}>
                    <ToggleButtonGroup size="small">
                      <LinkButton buttonLabels={this.props.buttonLabels}/>
                    </ToggleButtonGroup>
                  </Grid>
                :
                undefined
              }
            </div>
            <div className="editor-area" style={{height: this.props.areaHeight}}>
              <iframe
                id="editor-iframe"
                className="editor-iframe"
                name="editorIframe"
              >
              </iframe>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
      )
    }
  }
