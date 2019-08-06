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

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textType: '',
      alignment: 'left'
    }
  }

  handleChange = event => {
    if (event.target.name === 'textType') {
      this.setState({
        textType: event.target.value,
      });
    }
    else if (event.target.name === 'alignment') {
      this.setState({
        alignment: event.target.value,
      });
    }
  }

  getTextAttributes(){
    let type = this.state.textType;
    let content = document.getElementById('text-input').value;
    let alignment = this.state.alignment;
    let textContent = {
      type: type,
      content: content,
      alignment: alignment,
    };
    return textContent;
  }

  componentDidMount(){
    this.props.getTextAttributesFuction(() => this.getTextAttributes([]));
  }

  render() {
    return(
      <div className="simple-content-form-container">
        <div className="content-input-container">
          <FormControl className="content-form-control" component="fieldset">
            <FormLabel className="content-question-label" component="legend">Type</FormLabel>
            <RadioGroup className="content-radio-group" aria-label="position" name="textType" value={this.state.textType} onChange={this.handleChange} row>
              <FormControlLabel
                value="title"
                control={<Radio color="primary" />}
                label="Title"
                labelPlacement="start"
              />
              <FormControlLabel
                value="subtitle"
                control={<Radio color="primary" />}
                label="Subtitle"
                labelPlacement="start"
              />
              <FormControlLabel
                value="section"
                control={<Radio color="primary" />}
                label="Text section"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {
          this.state.textType !== '' ?
            <div>
              {
                this.state.textType === 'title' ?
                  <div className="content-input-container">
                    <TextField
                      id="text-input"
                      label="Title"
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
                this.state.textType === 'subtitle' ?
                  <div className="content-input-container">
                    <TextField
                      id="text-input"
                      label="Subtitle"
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
                this.state.textType === 'section' ?
                  <div className="content-input-container">
                    <TextField
                      id="text-input"
                      label="Text"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows="3"
                      className="content-input"
                    />
                  </div>
                :
                undefined
              }
              <FormControl className="content-form-control" component="fieldset">
                <FormLabel className="content-question-label" component="legend">Alignment</FormLabel>
                <RadioGroup className="content-radio-group" aria-label="position" name="alignment" value={this.state.alignment} onChange={this.handleChange} row>
                  <FormControlLabel
                    value="left"
                    control={<Radio color="primary" />}
                    label="Left"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="center"
                    control={<Radio color="primary" />}
                    label="Center"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="right"
                    control={<Radio color="primary" />}
                    label="Right"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
