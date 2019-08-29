import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Editor from '../inputs/editor/Editor';

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  clearInputs(){

  }

  getLinkAttributes(){
    let content = this.state.innerHTML;
    let linkContent = {
      content: content,
    };
    return linkContent;
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  componentDidMount(){
    this.props.getLinkAttributesFunction(() => this.getLinkAttributes());
  }

  render() {
    return(
      <div className="link-content-form-container">
        <div className="editor-block">
          <Editor
            areaHeight="20vh"
            buttonLabels={false}
            addLinks={true}
            getInnerHtml={this.getInnerHtml.bind(this)}
          />
        </div>
      </div>
    );
  }
}
