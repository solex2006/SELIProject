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
import A11yEditor from '../inputs/editor/A11yEditor';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import CodeIcon from '@material-ui/icons/Code';
import MenuItem from '@material-ui/core/MenuItem';
import CodeEditor from '../tools/CodeEditor';
import codeLanguages from '../../../lib/codeLanguages';

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        {label: this.props.language.bigTitle, value: "1.5em"},
        {label: this.props.language.mediumSubtitle, value: '1.15em'},
        {label: this.props.language.smallNormal, value: '0.9em'}
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
    const childText = this.refs.A11yEditor.getText();
    textContent.content = childText;
    if (this.validateContent(textContent) ) {
      return textContent;
    }
    else {
      return undefined;
    }
  }

  validateContent = (content) => {
    if (content.content === '' || content.content === null || content.content.blocks.text === "") {
      this.props.handleControlMessage(true, this.props.language.addTextContent);
      return false;
    }
    if (content.type === 'title' && content.size === '') {
      this.props.handleControlMessage(true, this.props.language.selectSizeText);
      return false;
    }
    if (content.type === 'title' && content.alignment === '') {
      this.props.handleControlMessage(true, this.props.language.alignmentRequired);
      return false;
    }
    if (content.type === 'code' && content.language === '') {
      this.props.handleControlMessage(true, this.props.language.pickLanguage);
      return false;
    }
    return true;
  }

  componentDidMount(){
    this.props.getTextAttributesFunction(() => this.getTextAttributes());
    if (this.props.contentToEdit !== undefined) {
      this.setState({
        attributes: this.props.contentToEdit.attributes
      })
    }
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
    attributes.content = "";
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
            <Tab value={'title'} onClick={() => this.selectType('title')} className="form-tab" label={this.props.language.titleSubtitle} icon={<TextFieldsIcon />} />
            <Tab value={'section'} onClick={() => this.selectType('section')} className="form-tab" label={this.props.language.section} icon={<SubjectIcon />} />
            <Tab value={'code'} onClick={() => this.selectType('code')} className="form-tab" label={this.props.language.code} icon={<CodeIcon />} />
          </Tabs>
        </Paper>
        <div className="inputs-block">
          {
            this.state.attributes.type === "title" ?
              <div>
                <div className="margin-center-row">
                  <Help helper="textHelper" text={this.props.language.structureAndStyle} language={this.props.language}/>
                  <p className="form-label">{`${this.props.language.alignment}:`}</p>
                  <Grid item>
                    <ToggleButtonGroup onChange={this.handleChange("alignment")} size="small" value={this.state.attributes.alignment} exclusive>
                      <ToggleButton className="toggle-button" key={1} value="left">
                        <Tooltip title={this.props.language.leftAlign}>
                          <FormatAlignLeftIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" key={2} value="center" onClick={() => this.handleChange("alignment")}>
                        <Tooltip title={this.props.language.centertAlign}>
                          <FormatAlignCenterIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                      <ToggleButton className="toggle-button" key={3} value="right" onClick={() => this.handleChange("alignment")}>
                        <Tooltip title={this.props.language.rightAlign}>
                          <FormatAlignRightIcon className="toggle-button-icon"/>
                        </Tooltip>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <TextField
                    select
                    className="size-text-input"
                    variant="outlined"
                    label={this.props.language.size}
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
                  label={this.props.language.text}
                  margin="normal"
                  variant="outlined"
                  required
                  className="form-dialog-input"
                  onChange={this.handleChange('content')}
                  autoFocus={true}
                  value={this.state.attributes.content}
                />
              </div>
            :
              undefined
          }
          {
            this.state.attributes.type === 'section' ?
              <div className="editor-block">
                <A11yEditor
                  ref="A11yEditor"
                  textSection={this.state.attributes.content}
                  language={this.props.language}
                />
                {/* <Editor
                  areaHeight="20vh"
                  buttonLabels={false}
                  addLinks={false}
                  innerHTML={this.state.attributes.content}
                  getInnerHtml={this.getInnerHtml.bind(this)}
                  language={this.props.language}
                /> */}
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
                    label={this.props.language.language}
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
                  content={this.state.attributes.content}
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
