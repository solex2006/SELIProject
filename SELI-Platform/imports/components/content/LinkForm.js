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
      linkType: 'normal',
      alignment: 'center',
    }
  }

  handleChange = event => {
    if (event.target.name === 'linkType') {
      this.setState({
        linkType: event.target.value,
      });
    }
    else if (event.target.name === 'alignment') {
      this.setState({
        alignment: event.target.value,
      });
    }
    else {
      this.setState({
        description: event.target.checked,
      });
    }
  }

  clearInputs(){
    document.getElementById('description-input').value = "";
    document.getElementById('link-input').value = "";
    this.setState({
      linkType: 'normal',
      alignment: 'center',
    });
  }

  getLinkAttributes(){
    let type = this.state.linkType;
    let linkContent = {};
    if (type === 'normal') {
      let content = document.getElementById('description-input').value;
      let link = document.getElementById('link-input').value;
      let alignment = this.state.alignment;
      linkContent = {
        type: type,
        content: content,
        link: link,
        alignment: alignment,
      };
      this.clearInputs();
    }
    else {
      let content = this.state.innerHTML;
      linkContent = {
        type: type,
        content: content,
      };
    }
    return linkContent;
  }

  textHandleChange = name => event => {
    this.setState({
      text: event.target.value,
    });
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
        <div className="content-input-container">
          <FormControl className="content-form-control" component="fieldset">
            <FormLabel className="content-form-label-center" component="legend">Type</FormLabel>
            <RadioGroup className="content-radio-group-center" aria-label="position" name="linkType" value={this.state.linkType} onChange={this.handleChange} row>
              <FormControlLabel
                value="normal"
                control={<Radio color="primary" />}
                label="Normal"
                labelPlacement="end"
                className="radio-input"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Within text"
                labelPlacement="end"
                className="radio-input"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {
          this.state.linkType !== '' ?
            <div>
              {
                this.state.linkType === 'normal' ?
                  <div className="content-input-container">
                    <TextField
                      id="link-input"
                      label="Link"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      className="content-input"
                    />
                  </div>
                :
                undefined
              }

              {
                this.state.linkType === 'text' ?
                  <div className="editor-block">
                    <Editor
                      areaHeight="20vh"
                      buttonLabels={false}
                      addLinks={true}
                      getInnerHtml={this.getInnerHtml.bind(this)}
                    />
                  </div>
                :
                undefined
              }
              {
                this.state.linkType === 'normal' ?
                  <FormControl className="content-form-control" component="fieldset">
                    <FormLabel className="content-form-label-center" component="legend">Alignment</FormLabel>
                    <RadioGroup className="content-radio-group-center" aria-label="position" name="alignment" value={this.state.alignment} onChange={this.handleChange} row>
                      <FormControlLabel
                        value="left"
                        control={<Radio color="primary" />}
                        label="Left"
                        labelPlacement="end"
                        className="radio-input"
                      />
                      <FormControlLabel
                        value="center"
                        control={<Radio color="primary" />}
                        label="Center"
                        labelPlacement="end"
                        className="radio-input"
                      />
                      <FormControlLabel
                        value="right"
                        control={<Radio color="primary" />}
                        label="Right"
                        labelPlacement="end"
                        className="radio-input"
                      />
                      <FormControlLabel
                        value="justify"
                        control={<Radio color="primary" />}
                        label="Justified"
                        labelPlacement="end"
                        className="radio-input"
                      />
                    </RadioGroup>
                  </FormControl>
                :
                undefined
              }
              {
                this.state.linkType === 'normal' ?
                  <div>
                    <FormControl className="content-form-control" component="fieldset">
                      <FormGroup className="center-form-group" aria-label="position" name="description" value={this.state.description} onChange={this.handleChange} row>
                        <FormControlLabel
                          value="description"
                          control={<Checkbox color="primary" checked={this.state.description}/>}
                          label="Add text description"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                    {
                      this.state.description ?
                        <TextField
                          id="description-input"
                          label="Description"
                          margin="normal"
                          variant="outlined"
                          required
                          multiline
                          rows="3"
                          fullWidth
                        />
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
