import React from 'react';
import A11yEditor, { getText } from '../inputs/editor/A11yEditor';
import FileTypeSelector from '../tools/FileTypeSelector';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import BackupIcon from '@material-ui/icons/Backup';
import SubjectIcon from '@material-ui/icons/Subject';
import ForumIcon from '@material-ui/icons/Forum';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Help from '../tools/Help';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileTypes: [
        {
          label: 'PDF',
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
        type: this.props.arrayOfDesignItems.type === "4" ? 'forum' : 'section',
        instruction: '',
        expanded: true,
      }
    }
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.type = value;
    attributes.badgeClass = '' // add an attribute to forum
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
    const childText = getText();
    activityContent.instruction = childText;
    if (this.validateContent(activityContent) ) {
      return activityContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.instruction === "" || content.instruction === null || content.instruction.blocks.text === "") {
      this.props.handleControlMessage(true, this.props.language.writeTheInstructions);
      return false;
    } else if (content.type === 'upload' && content.fileTypes === undefined) {
      this.props.handleControlMessage(true, this.props.language.selectFileType);
      return false;
    }
    return true;
  }

  getFileTypes(){
    let fileTypes = this.state.fileTypes;
    let selected = [
      {
        label: 'PDF',
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
        if (this.state.attributes.type === "upload") {
          let index = fileTypes.findIndex( type => type.label === this.state.attributes.fileTypes.label );
          this.pickFileType(index);
        }
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
        <div className="editor-block">
          <p className="editor-label">{`${this.props.language.activityInstructions}:`}</p>
          <A11yEditor
            textSection={this.state.attributes.instruction}
            language={this.props.language}
          />
          {/* <Editor
            areaHeight='20vh'
            innerHTML={this.state.attributes.instruction}
            buttonLabels={false}
            addLinks={true}
            getInnerHtml={this.getInnerHtml.bind(this)}
            language={this.props.language}
          /> */}
        </div> 
        <div className="editor-label1">{`${this.props.language.deliverType}:`}</div>
        <div className="square-box">
          <Paper square>
            <Tabs
              color="primary"
              value={this.state.attributes.type}
              indicatorColor="primary"
              textColor="primary"
              className="form-tabs-container"
              centered={true}
            >
              { this.props.arrayOfDesignItems.type === "4" || this.props.courseTemplate === "without" ?
                  <Tab value={'forum'} onClick={() => this.selectType('forum')} className="form-tab" label={this.props.language.forum} icon={<ForumIcon />} /> : undefined}
              { this.props.arrayOfDesignItems.type !== "4" || this.props.courseTemplate === "without" ?
                  <Tab value={'section'} onClick={() => this.selectType('section')} className="form-tab" label={this.props.language.section} icon={<SubjectIcon />} /> : undefined}
              { this.props.arrayOfDesignItems.type !== "4" || this.props.courseTemplate === "without" ?
                  <Tab value={'upload'} onClick={() => this.selectType('upload')} className="form-tab" label={this.props.language.upload} icon={<BackupIcon />} /> : undefined}
              { this.props.arrayOfDesignItems.type !== "4" || this.props.courseTemplate === "without" ?
                  <Tab value={'storyboard'} onClick={() => this.selectType('storyboard')} className="form-tab" label={this.props.language.storyboard} icon={<LocalActivityIcon />} /> : undefined}
            </Tabs>
          </Paper>
        </div>
        {
          this.state.attributes.type === 'storyboard' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="default"
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
              <FileTypeSelector
                fileTypes={this.state.fileTypes}
                pickFileType={this.pickFileType.bind(this)}
                fileType={this.props.language.selectAllowedFileType}
              />
              <div className="center-row">
                <Help
                  helper="default"
                  text={this.props.language.whatIsUpload}
                  language={this.props.language}
                />
              </div>
            </div>
          :
          undefined
        }
        {
          this.state.attributes.type === 'section' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="default"
                  text={this.props.language.whatIsTextSection}
                  language={this.props.language}
                />
              </div>
            </div>
          :
          undefined
        }
        {
          this.state.attributes.type === 'forum' ?
            <div className="form-activity-input-contained">
              <div className="center-row">
                <Help
                  helper="default"
                  text={this.props.language.whatIsForum}
                  language={this.props.language}
                />
              </div>
            </div>
          :
          undefined
        }           
      </div>
    );
  }
}
