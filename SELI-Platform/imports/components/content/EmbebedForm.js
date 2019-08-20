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

export default class EmbebedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'center',
    }
  }

  handleChange = event => {
    if (event.target.name === 'alignment') {
      this.setState({
        alignment: event.target.value,
      });
    }
  }

  clearInputs(){
    document.getElementById('description-input').value = "";
    document.getElementById('url-input').value = "";
    this.setState({
      alignment: 'center',
    });
  }

  vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
  }

  getEmbebedAttributes(){
    let type = this.state.linkType;
    let emebebedContent = {};
    let content = document.getElementById('description-input').value;
    let url = document.getElementById('url-input').value;
    let alignment = this.state.alignment;
    let size = {width: "100%", height: this.vhToPixels(100)}
    emebebedContent = {
      content: content,
      url: url,
      alignment: alignment,
      size: size,
    };
    this.clearInputs();
    return emebebedContent;
  }

  componentDidMount(){
    this.props.getEmbebedAttributesFunction(() => this.getEmbebedAttributes());
  }

  render() {
    return(
      <div className="link-content-form-container">
        <TextField
          id="url-input"
          label="Url"
          margin="normal"
          variant="outlined"
          fullWidth
          required
          className="content-input"
        />
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
      </div>
    );
  }
}
