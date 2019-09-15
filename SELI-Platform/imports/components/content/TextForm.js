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
      textType: 'title',
      alignment: 'center',
      sizes: [
        {label: "Big (Title)", value: "1.5em"},
        {label: "Medium (Subtitle)", value: '1.15em'},
        {label: "Small (Normal)", value: '0.9em'}
      ],
      size: '',
      themes: codeThemes,
      theme: codeThemes[0],
      languages: codeLanguages,
      language: codeLanguages[16],
      code: '//Write your code here...',
    }
  }

  handleChange = (value) => {
    this.setState({
      alignment: value,
    });
  }

  clearInputs(){
    this.state.textType === "title" ? document.getElementById('text-input').value = "" : undefined;
    this.setState({
      textType: 'title',
      alignment: 'center',
      size: '',
      theme: 'light',
      language: codeLanguages[16],
    });
  }

  getTextAttributes(){
    let type = this.state.textType;
    let content;
    if (type === "section") {
      content = this.state.innerHTML;
    }
    if (type === "code") {
      content = this.state.code;
    }
    if (type === "title") {
      content = document.getElementById('text-input').value
    }
    let alignment = this.state.alignment;
    let size = this.state.size;
    let textContent = {
      type: type,
      content: content,
      alignment: alignment,
      size: size,
    };
    if (type === "code") {
      textContent.theme = this.getTheme();
      textContent.language = this.getLanguage();
    }
    this.clearInputs();
    return textContent;
  }

  getLanguage () {
    for (var i = 0; i < codeLanguages.length; i++) {
      if (codeLanguages[i] === this.state.language) {
        return codeLanguages[i];
      }
    }
  }

  getTheme() {
    for (var i = 0; i < codeThemes.length; i++) {
      if (codeThemes[i] === this.state.theme) {
        return codeThemes[i];
      }
    }
  }

  componentDidMount(){
    this.props.getTextAttributesFunction(() => this.getTextAttributes());
  }

  getInnerHtml(innerHTML){
    this.setState({
      innerHTML: innerHTML,
    });
  }

  selectType(value){
    this.setState({
      textType: value,
    });
  }

  setSize = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }

  setCodeSetting = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      this.props.reRender()
    });
  }

  getCode(code){
    this.setState({
      code: code,
    });
  }

  render() {
    return(
      <div className="dialog-form-container">
        <Paper square>
          <Tabs
            color="primary"
            value={this.state.textType}
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
            this.state.textType === "title" ?
              <div>
                <div className="margin-center-row">
                  <Help helper="textHelper" text="Structure and style to maximise readability and scanning:" />
                  <p className="form-label">Alignment:</p>
                  <Grid item>
                    <ToggleButtonGroup size="small" value={this.state.alignment} exclusive>
                      <ToggleButton key={1} value="left" onClick={() => this.handleChange("left")}>
                        <Tooltip title="Left alignment">
                          <FormatAlignLeftIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton key={2} value="center" onClick={() => this.handleChange("center")}>
                        <Tooltip title="Center alignment">
                          <FormatAlignCenterIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton key={3} value="right" onClick={() => this.handleChange("right")}>
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
                    value={this.state.size}
                    onChange={this.setSize('size')}
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
                  autoFocus={true}
                />
              </div>
            :
              undefined
          }
          {
            this.state.textType === 'section' ?
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
            this.state.textType === 'code' ?
              <div>
                <div className="margin-center-row">
                  <TextField
                    select
                    className="size-text-input"
                    variant="outlined"
                    label="Theme"
                    value={this.state.theme}
                    onChange={this.setCodeSetting('theme')}
                  >
                    {this.state.themes.map(option => (
                      <MenuItem dense={true} key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    className="size-text-input"
                    variant="outlined"
                    label="Language"
                    value={this.state.language}
                    onChange={this.setCodeSetting('language')}
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
                  theme={this.state.theme}
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
