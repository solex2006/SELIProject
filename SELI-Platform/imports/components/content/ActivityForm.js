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
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import BackupIcon from '@material-ui/icons/Backup';
import SubjectIcon from '@material-ui/icons/Subject';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Editor from '../inputs/editor/Editor';
import Help from '../tools/Help';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      attributes: {
        type: 'storyboard',
        instruction: '',
        expanded: true,
      }
    }
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.type = value;
    this.setState({
      attributes: attributes,
    });
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.instruction = innerHTML;
    this.setState({
      attributes: attributes,
    });
  }

  getActivityAttributes(){
    let activityContent = this.state.attributes;
    activityContent.expanded = true;
    if (activityContent.type === 'upload') {
      activityContent.fileTypes = this.getFileTypes();
    }
    if (this.validateContent(activityContent) ) {
      return activityContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.instruction === '') {
      this.props.handleControlMessage(true, "Add the instruction that the student must follow");
      return false;
    }
    return true;
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
      <div className="dialog-form-container">
        <Paper square>
          <Tabs
            color="primary"
            value={this.state.attributes.type}
            indicatorColor="primary"
            textColor="primary"
            className="form-tabs-container"
            variant="fullWidth"
            centered={true}
          >
            <Tab value={'storyboard'} onClick={() => this.selectType('storyboard')} className="form-tab" label="Storyboard" icon={<LocalActivityIcon />} />
            <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label="Upload" icon={<BackupIcon />} />
            <Tab value={'section'} onClick={() => this.selectType('section')} className="form-tab" label="Text section" icon={<SubjectIcon />} />
          </Tabs>
        </Paper>
        {
          this.state.attributes.type === 'storyboard' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="storyboard"
                  text="What is a storyboard activity?"
                />
              </div>
            </div>
          :
          undefined
        }
        {
          this.state.attributes.type === 'upload' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="storyboard"
                  text="What is an upload activity?"
                />
              </div>
              <FileTypeSelector
                fileTypes={this.state.fileTypes}
                pickFileType={this.pickFileType.bind(this)}
              />
            </div>
          :
          undefined
        }
        {
          this.state.attributes.type === 'section' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="storyboard"
                  text="What is a text section activity?"
                />
              </div>
            </div>
          :
          undefined
        }
        <div className="center-row">
          <p className="form-message">Write the instruction that the student must follow</p>
        </div>
        <div className="editor-block">
          <Editor
            areaHeight='20vh'
            innerHTML={this.state.attributes.instruction}
            buttonLabels={false}
            addLinks={true}
            getInnerHtml={this.getInnerHtml.bind(this)}
          />
        </div>
      </div>
    );
  }
}
