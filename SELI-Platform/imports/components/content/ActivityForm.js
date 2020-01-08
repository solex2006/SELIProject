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
      this.props.handleControlMessage(true, this.props.language.writeTheInstructions);
      return false;
    }
    return true;
  }

  getFileTypes(){
    let fileTypes = this.state.fileTypes;
    let selected = [
      {
        label: 'Pdf',
        accept: '.pdf',
        selected: false,
      },
      {
        label: 'Word',
        accept: ['.doc', '.docx'],
        selected: false,
      },
      {
        label: 'Excel',
        accept: ['.xls', '.xlsx'],
        selected: false,
      },
      {
        label: 'Power point',
        accept: ['.ppt', '.pptx'],
        selected: false,
      },
      {
        label: 'Image',
        accept: ['image/*'],
        selected: false,
      },
      {
        label: 'Video',
        accept: ['video/*'],
        selected: false,
      },
      {
        label: 'Audio',
        accept: ['audio/*'],
        selected: false,
      },
      {
        label: 'Compressed',
        accept: ['.zip', '.rar', '.tz', '.7z'],
        selected: false,
      },
    ];
    let index;
    for (var i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i].selected) {
        index = i;
        break;
      }
    }
    return selected[index];
  }

  componentDidMount(){
    this.props.getActivityAttributesFunction(() => this.getActivityAttributes());
  }

  componentWillMount(){
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes,
      }, () => {
        let fileTypes = this.state.fileTypes;
        let index = fileTypes.findIndex( type => type.label === this.state.attributes.fileTypes.label );
        this.pickFileType(index);
      })
    }
  }

  pickFileType(index) {
    let fileTypes = this.state.fileTypes;
    fileTypes.map(fileType => {fileType.selected = false})
    fileTypes[index].selected = true;
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
            <Tab value={'storyboard'} onClick={() => this.selectType('storyboard')} className="form-tab" label={this.props.language.storyboard} icon={<LocalActivityIcon />} />
            <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label={this.props.language.upload} icon={<BackupIcon />} />
            <Tab value={'section'} onClick={() => this.selectType('section')} className="form-tab" label={this.props.language.textSection} icon={<SubjectIcon />} />
          </Tabs>
        </Paper>
        {
          this.state.attributes.type === 'storyboard' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="storyboard"
                  text={this.props.language.whatIsStoryboard}
                  language={this.props.language}
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
                  text={this.props.language.whatIsUpload}
                  language={this.props.language}
                />
              </div>
              <FileTypeSelector
                fileTypes={this.state.fileTypes}
                pickFileType={this.pickFileType.bind(this)}
                fileType={this.props.language.selectAllowedFileType}
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
                  text={this.props.language.whatIsTextSection}
                  language={this.props.language}
                />
              </div>
            </div>
          :
          undefined
        }
        <div className="center-row">
          <p className="form-message">{this.props.language.writeTheInstructions}</p>
        </div>
        <div className="editor-block">
          <Editor
            areaHeight='20vh'
            innerHTML={this.state.attributes.instruction}
            buttonLabels={false}
            addLinks={true}
            getInnerHtml={this.getInnerHtml.bind(this)}
            language={this.props.language}
          />
        </div>
      </div>
    );
  }
}
