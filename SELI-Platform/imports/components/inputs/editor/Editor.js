import React, { Component } from 'react';
import { initEditor, changeStyle, changeAligment, link, removeFormat, getInnerHtml } from '../../../../lib/editorUtils';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import LinkButton from './LinkButton';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../../style/theme.js';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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

  setActiveAligment(){

  }

  componentDidMount(){
    initEditor();
    this.initClickEvent();
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
  }

  getInnerHtml(){
    this.props.getInnerHtml(getInnerHtml());
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
            <div className="editor-tools">
              <Button color="primary" variant="outlined" className="editor-button" onClick={() => {changeAligment('justifyLeft'); this.setActiveAligment()}} id="underlineButton">
                <FaAlignLeft className="editor-icon"/>
                {this.props.buttonLabels ? "Left" : undefined}
              </Button>
              <Button color="primary" variant="outlined" className="editor-button" onClick={() => {changeAligment('justifyCenter'); this.setActiveAligment()}} id="underlineButton">
                <FaAlignCenter className="editor-icon"/>
                {this.props.buttonLabels ? "Center" : undefined}
              </Button>
              <Button color="primary" variant="outlined" className="editor-button" onClick={() => {changeAligment('justifyRight'); this.setActiveAligment()}} id="underlineButton">
                <FaAlignRight className="editor-icon"/>
                {this.props.buttonLabels ? "Right" : undefined}
              </Button>
              <Button color="primary" variant="outlined" className="editor-button" onClick={() => {changeAligment('justifyFull'); this.setActiveAligment()}} id="underlineButton">
                <FaAlignJustify className="editor-icon"/>
                {this.props.buttonLabels ? "Justify" : undefined}
              </Button>
              <Button color="primary" variant={this.state.boldSelected} className="editor-button" onClick={() => {changeStyle('bold'); this.setActiveStyle('bold', this.state.boldSelected)}} id="boldButton">
                <FaBold className="editor-icon"/>
                {this.props.buttonLabels ? "Bold" : undefined}
              </Button>
              <Button color="primary" variant={this.state.italicSelected} className="editor-button" onClick={() => {changeStyle('italic'); this.setActiveStyle('italic', this.state.italicSelected)}} id="boldButton">
                <FaItalic className="editor-icon"/>
                {this.props.buttonLabels ? "Italic" : undefined}
              </Button>
              <Button color="primary" variant={this.state.underlinedSelected} className="editor-button" onClick={() => {changeStyle('underline'); this.setActiveStyle('underlined', this.state.underlinedSelected)}} id="underlineButton">
                <FaUnderline className="editor-icon"/>
                {this.props.buttonLabels ? "Underlined" : undefined}
              </Button>
              {
                this.props.addLinks ?
                  <LinkButton buttonLabels={this.props.buttonLabels}/>
                :
                undefined
              }
            </div>
            <div className="editor-area" style={{height: this.props.areaHeight}}>
              <iframe id="editor-iframe" className="editor-iframe" name="editorIframe"></iframe>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
