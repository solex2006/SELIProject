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
import FileTypeSelector from '../tools/FileTypeSelector';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityType: 'storytelling',
      restrictFileType: false,
      fileTypes: [
        {
          label: 'Pdf',
          selected: false,
        },
        {
          label: 'Word',
          selected: false,
        },
        {
          label: 'Excel',
          selected: false,
        },
        {
          label: 'Power point',
          selected: false,
        },
        {
          label: 'Image',
          selected: false,
        },
        {
          label: 'Video',
          selected: false,
        },
        {
          label: 'Audio',
          selected: false,
        },
        {
          label: 'Compressed',
          selected: false,
        },
      ],
    }
  }

  handleChange = name => event => {
    if (name === 'activityType') {
      this.setState({
        activityType: event.target.value,
      });
    }
  }

  clearInputs(){
    document.getElementById('instruction-input').value = "";
    this.setState({
      activityType: 'storytelling',
    });
  }

  getActivityAttributes(){
    let type = this.state.activityType;
    let instruction = document.getElementById('instruction-input').value;
    let activityContent = {
      type: type,
      instruction: instruction,
      expanded: true,
    };
    if (type === 'upload') {
      activityContent.fileTypes = this.getFileTypes();
    }
    this.clearInputs();
    return activityContent;
  }

  getFileTypes(){
    let fileTypes = this.state.fileTypes;
    let selected = [
      {
        label: 'Pdf',
        selected: false,
      },
      {
        label: 'Word',
        selected: false,
      },
      {
        label: 'Excel',
        selected: false,
      },
      {
        label: 'Power point',
        selected: false,
      },
      {
        label: 'Image',
        selected: false,
      },
      {
        label: 'Video',
        selected: false,
      },
      {
        label: 'Audio',
        selected: false,
      },
      {
        label: 'Compressed',
        selected: false,
      },
    ];
    for (var i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i].selected) {
        selected[i].selected = true;
      }
    }
    return selected;
  }

  componentDidMount(){
    this.props.getActivityAttributesFunction(() => this.getActivityAttributes());
  }

  pickFileType(index) {
    let fileTypes = this.state.fileTypes;
    fileTypes[index].selected = !fileTypes[index].selected;
    this.setState({
      fileTypes: fileTypes,
    });
  }

  render() {
    return(
      <div className="activity-form-container">
        <TextField
          id="instruction-input"
          label="Instruction"
          margin="normal"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={3}
        />
        <div className="content-input-container">
          <FormControl className="content-form-control" component="fieldset">
            <FormLabel className="content-form-label-center" component="legend">Activity type</FormLabel>
            <RadioGroup className="content-radio-group-center" aria-label="activity-type" name="activityType" value={this.state.activityType} onChange={this.handleChange('activityType')} row>
              <FormControlLabel
                value="storytelling"
                control={<Radio color="primary" />}
                label="Storytelling"
                labelPlacement="end"
                className="radio-input"
              />
              <FormControlLabel
                value="upload"
                control={<Radio color="primary" />}
                label="Upload a file"
                labelPlacement="end"
                className="radio-input"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Text section"
                labelPlacement="end"
                className="radio-input"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {
          this.state.activityType === 'upload' ?
            <FileTypeSelector
              fileTypes={this.state.fileTypes}
              pickFileType={this.pickFileType.bind(this)}
            />
          :
          undefined
        }
      </div>
    );
  }
}
