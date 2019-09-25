import React from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Help from '../tools/Help';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SubjectIcon from '@material-ui/icons/Subject';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Editor from '../inputs/editor/Editor';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CodeIcon from '@material-ui/icons/Code';
import MenuItem from '@material-ui/core/MenuItem';
import CodeEditor from '../tools/CodeEditor';
import codeLanguages from '../../../lib/codeLanguages';
import codeThemes from '../../../lib/codeThemes';

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        {label: "Big (Title)", value: "1.5em"},
        {label: "Medium (Subtitle)", value: '1.15em'},
        {label: "Small (Normal)", value: '0.9em'}
      ],
      languages: codeLanguages,
      language: codeLanguages[16],
      attributes: {
        type: 'title',
        size: '1.5em',
        alignment: 'center',
        language: '',
        content: '',
      }
    }
  }

  getTextAttributes(){
    let textContent = this.state.attributes;
    if (this.validateContent(textContent) ) {
      return textContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.content === '') {
      this.props.handleControlMessage(true, "Add the text content");
      return false;
    }
    if (content.type === 'title' && content.size === '') {
      this.props.handleControlMessage(true, "Select the size of the text");
      return false;
    }
    if (content.type === 'title' && content.alignment === '') {
      this.props.handleControlMessage(true, "Alignment is a requiered field");
      return false;
    }
    if (content.type === 'code' && content.language === '') {
      this.props.handleControlMessage(true, "Pick the language");
      return false;
    }
    return true;
  }

  componentDidMount(){
    this.props.getTextAttributesFunction(() => this.getTextAttributes());
  }

  getInnerHtml(innerHTML){
    let attributes = this.state.attributes;
    attributes.content = innerHTML;
    this.setState({
      attributes: attributes,
    });
  }

  selectType(value){
    let attributes = this.state.attributes;
    attributes.type = value;
    this.setState({
      attributes: attributes,
    });
  }

  setCodeSetting = name => event => {
    let attributes = this.state.attributes;
    attributes.language = event.target.value;
    this.setState({
      attributes: attributes,
    }, () => {
      this.props.reRender()
    });
  }

  getCode(code){
    let attributes = this.state.attributes;
    attributes.content = code;
    this.setState({
      attributes: attributes,
    });
  }

  handleChange = name => event => {
    let attributes = this.state.attributes;
    if (name === "content") {
      attributes.content = event.target.value;
    }
    else if (name === "alignment") {
      attributes.alignment = event.target.value;
    }
    else if (name === "size") {
      attributes.size = event.target.value;
    }
    else if (name === "language") {
      attributes.language = event.target.value;
    }
    this.setState({
      attributes: attributes,
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
            <Tab value={'title'} onClick={() => this.selectType('title')} className="form-tab" label="Title/Subtitle" icon={<TextFieldsIcon />} />
            <Tab value={'section'} onClick={() => this.selectType('section')} className="form-tab" label="Text section" icon={<SubjectIcon />} />
            <Tab value={'code'} onClick={() => this.selectType('code')} className="form-tab" label="Code" icon={<CodeIcon />} />
          </Tabs>
        </Paper>
        <div className="inputs-block">
          {
            this.state.attributes.type === "title" ?
              <div>
                <div className="margin-center-row">
                  <Help helper="textHelper" text="Structure and style to maximise readability and scanning:" />
                  <p className="form-label">Alignment:</p>
                  <Grid item>
                    <ToggleButtonGroup onChange={this.handleChange("alignment")} size="small" value={this.state.attributes.alignment} exclusive>
                      <ToggleButton className="toggle-button" key={1} value="left">
                        <Tooltip title="Left alignment">
                          <FormatAlignLeftIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" key={2} value="center" onClick={() => this.handleChange("alignment")}>
                        <Tooltip title="Center alignment">
                          <FormatAlignCenterIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" key={3} value="right" onClick={() => this.handleChange("alignment")}>
                        <Tooltip title="Right alignment">
                          <FormatAlignRightIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <TextField
                    select
                    className="size-text-input"
                    variant="outlined"
                    label="Size"
                    value={this.state.attributes.size}
                    onChange={this.handleChange('size')}
                  >
                    {this.state.sizes.map(option => (
                      <MenuItem dense={true} key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <TextField
                  id="text-input"
                  label="Text"
                  margin="normal"
                  variant="outlined"
                  required
                  className="form-dialog-input"
                  onChange={this.handleChange('content')}
                  autoFocus={true}
                />
              </div>
            :
              undefined
          }
          {
            this.state.attributes.type === 'section' ?
              <div className="editor-block">
                <Editor
                  areaHeight="20vh"
                  buttonLabels={false}
                  addLinks={false}
                  getInnerHtml={this.getInnerHtml.bind(this)}
                />
              </div>
            :
            undefined
          }
          {
            this.state.attributes.type === 'code' ?
              <div>
                <div className="margin-center-row">
                  <TextField
                    select
                    style={{width: "90%"}}
                    variant="outlined"
                    label="Language"
                    value={this.state.attributes.language}
                    onChange={this.handleChange('language')}
                  >
                    {this.state.languages.map(option => (
                      <MenuItem dense={true} key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <CodeEditor
                  getCode={this.getCode.bind(this)}
                  language={this.state.language}
                />
              </div>
            :
            undefined
          }
        </div>
      </div>
      );
    }
  }
