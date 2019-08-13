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

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkType: 'normal',
      alignment: 'center',
      links: [],
      chars: [],
      renderChars: [],
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
    document.getElementById('text-input').value = "";
    this.setState({
      linkType: 'normal',
      alignment: 'center'
    });
  }

  getLinkAttributes(){
    let type = this.state.linkType;
    let content = document.getElementById('text-input').value;
    let alignment = this.state.alignment;
    let linkContent = {
      type: type,
      content: content,
      alignment: alignment,
    };
    this.clearInputs();
    return linkContent;
  }

  insertLink(){
    let area = document.getElementById('text-input');
    let start = area.selectionStart;
    let end = area.selectionEnd;
    if (start === end) {
      let links = this.state.links;
      let url = document.getElementById('link-input').value;
      let link = {
        position: start,
        url: 'www.youtube.com',
      }
      links.push(link);
      this.setState({
        links: links,
      }, () => {
        let chars = this.state.text.split('');
        this.setState({
          chars: chars,
        }, () => {
          this.buildText();
        });
      });
    }
    else {
      this.props.showControlMessage("Link can't be text selection, it must be a cursor position");
    }
  }

  textHandleChange = name => event => {
    this.setState({
      text: event.target.value,
    });
  }

  clean(){
    document.getElementById('text-input').value = "";
    this.setState({
      text: "",
      links: [],
      chars: [],
      renderChars: [],
    });
  }

  buildText(){
    let chars = this.state.chars;
    let links = this.state.links;
    var sortJsonArray = require('sort-json-array');
    sortJsonArray(links, 'position','asc');
    let addedLinks = 0;
    for (var i = 0; i < links.length; i++) {
      chars = this.insertInto(chars, links[i].position + addedLinks);
      addedLinks++;
    }
    this.setState({
      renderChars: chars,
    });
  }

  insertInto(array, position){
    array.splice(position, 0, "<LINK>");
    return array;
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
              {
                this.state.linkType === 'text' ?
                  <div className="insert-link-input-container">
                    <TextField
                      id="text-input"
                      label="Text"
                      margin="normal"
                      variant="outlined"
                      required
                      multiline
                      rows="2"
                      className="insert-link-content-input"
                      defaultValue={this.state.text}
                      onChange={this.textHandleChange()}
                    />
                    <div className="insert-link-action-container">
                      <Button onClick={() => this.clean()} className="insert-link-button" color="primary">Clean</Button>
                      <Button onClick={() => this.insertLink()} className="insert-link-button" color="primary">Insert link</Button>
                    </div>
                    <div className="insert-link-preview">
                      <p className="preview-subtitle">Preview</p>
                      <div style={{textAlign: this.state.alignment}} className="link-preview-container">
                        {
                          this.state.renderChars.map(char => {
                            if (char === "<LINK>") {
                              return (
                                <Link
                                  component="button"
                                  className="link-button"
                                  onClick={() => {
                                    alert("I'm a button.");
                                  }}
                                >
                                  Link
                                </Link>
                              )
                            }
                            else {
                              return (char)
                            }
                          })
                        }
                      </div>
                    </div>
                  </div>
                :
                undefined
              }
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
                  {
                    this.state.linkType === "text" ?
                      <FormControlLabel
                        value="justify"
                        control={<Radio color="primary" />}
                        label="Justified"
                        labelPlacement="end"
                        className="radio-input"
                      />
                    :
                    undefined
                  }
                </RadioGroup>
              </FormControl>
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
                          className="gallery-content-input"
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
