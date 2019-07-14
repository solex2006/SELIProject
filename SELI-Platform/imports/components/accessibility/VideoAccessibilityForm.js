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
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import FileUpload from '../files/FileUpload';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';


export default class VideoAccessibilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessibilityPercentage: 0,
      pureDecoration: false,
      audioDescription: '',
      textTranscription: '',
      audioDescriptionAlternative: '',
      textTranscriptionOption: '',
      progressColor: ['#ff9800', '#ffc107', '#ffeb3b', '#d4e157', '#9ccc65', '#66bb6a'],
      audioDescriptionAlternatives: [
        {
          _id: 0,
          name: "By text",
        },
        {
          _id: 1,
          name: "By pdf upload",
        },
        {
          _id: 2,
          name: "No audio description",
        },
      ],
      textTranscriptionOptions: [
        {
          _id: 0,
          name: "By text",
        },
        {
          _id: 1,
          name: "By pdf upload",
        },
      ],
    }
  }

  pureDecorationHandleChange = event => {
    this.setState({
      pureDecoration: event.target.checked,
    });
  }

  add(){
    let accessibilityPercentage = this.state.accessibilityPercentage;
    accessibilityPercentage += 10;
    let progressIndex = 0;
    if(accessibilityPercentage > 1 && accessibilityPercentage < 16){
      progressIndex = 0;
    }
    if(accessibilityPercentage >= 16 && accessibilityPercentage < 32){
      progressIndex = 1;
    }
    if(accessibilityPercentage >= 32 && accessibilityPercentage < 48){
      progressIndex = 2;
    }
    if(accessibilityPercentage >= 48 && accessibilityPercentage < 64){
      progressIndex = 3;
    }
    if(accessibilityPercentage >= 64 && accessibilityPercentage < 80){
      progressIndex = 4;
    }
    if(accessibilityPercentage >= 80 && accessibilityPercentage <= 100){
      progressIndex = 5;
    }
    this.setState({
      accessibilityPercentage: accessibilityPercentage
    });
    document.getElementsByClassName('accessibility-progress')[0].children[0].style.color = this.state.progressColor[progressIndex];
  }

  componentDidMount(){
    document.getElementsByClassName('accessibility-progress')[0].children[0].style.color = this.state.progressColor[0];
  }

  audioDescriptionHandleChange = event =>{
    this.setState({
      audioDescription: event.target.value,
    });
  }

  textTranscriptionHandleChange = event =>{
    this.setState({
      textTranscription: event.target.value,
    });
  }

  necessaryAudioDescriptionHandleChange = event =>{
    this.setState({
      necessaryAudioDescription: event.target.value,
    });
  }

  getAudioDescriptionInformation(fileInformation){
    this.setState({
      audioDescriptionInformation: fileInformation,
    });
  }

  removeAudioDescriptionInformation(){
    this.setState({
      audioDescriptionInformation: [],
    });
  }

  resetAudioDescription(){
    this.setState({
      parentId: this.props.parentId + "-file",
    });
  }

  getPdfAudioDescriptionInformation(fileInformation){
    this.setState({
      pdfAudioDescriptionInformation: fileInformation,
    });
  }

  removePdfAudioDescriptionInformation(){
    this.setState({
      pdfAudioDescriptionInformation: [],
    });
  }

  resetPdfAudioDescription(){
    this.setState({
      parentId: this.props.parentId + "-file",
    });
  }

  getTextTranscriptionInformation(fileInformation){
    this.setState({
      textTranscriptionInformation: fileInformation,
    });
  }

  removeTextTranscriptionInformation(){
    this.setState({
      textTranscriptionInformation: [],
    });
  }

  resetTextTranscription(){
    this.setState({
      parentId: this.props.parentId + "-file",
    });
  }

  handleChangeAudioDescriptionAlternative = name => event => {
    this.setState({
      audioDescriptionAlternative: event.target.value,
    });
  };

  handleChangeTextTranscriptionOption = name => event => {
    this.setState({
      textTranscriptionOption: event.target.value,
    });
  };

  render() {
    return(
      <div>
        <div className="accessibility-header-container">
          <div className="accessibility-header-row">
            <p onClick={() => this.add()} className="accessibility-subtitle">Video content</p>
            <div className="accessibility-percentage-container">
              <p className="accessibility-percentage-label">Accesibility percentage</p>
              <CircularProgress
                color={this.state.progressColor[0]}
                variant="static"
                value={this.state.accessibilityPercentage}
                thickness={7.5}
                size={80}
                className="accessibility-progress"
              />
              <p className="accessibility-percentage-value">{this.state.accessibilityPercentage + "%"}</p>
            </div>
          </div>
          <Divider className="subtitle-divider"/>
        </div>
        <div className="accessibility-body-container">
          <div id="pure-decoration-input" className="accessibility-input-container">
            <FormControl component="fieldset">
              <FormGroup aria-label="position" name="position" value={this.state.pureDecoration} onChange={this.pureDecorationHandleChange} row>
                <FormControlLabel
                  checked={this.state.pureDecoration}
                  control={<Checkbox color="primary" />}
                  label="Pure decoration content"
                  labelPlacement="start"
                  value="pureDecoration"
                />
              </FormGroup>
            </FormControl>
          </div>
          {
            !this.state.pureDecoration ?
              <div>
                <FormHelperText>If the content is pure decorative you won't have to fill the next 2 inputs.</FormHelperText>
                <div className="accessibility-input-container">
                  <TextField
                    id="short-description-input"
                    label="Short description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </div>
                <div className="accessibility-input-container">
                  <TextField
                    id="long-description-input"
                    label="Long description"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows="3"
                  />
                </div>
              </div>
            :
            undefined
          }
          <div className="accessibility-input-container">
            <FormControl className="accessibility-question-form-control" component="fieldset">
              <FormLabel className="accessibility-question-label" component="legend">The uploaded video has an audio description embebed?</FormLabel>
              <RadioGroup aria-label="position" name="position" value={this.state.audioDescription} onChange={this.audioDescriptionHandleChange} row>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="secondary" />}
                  label="No"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {
            this.state.audioDescription === 'no' ?
              <div>
                <div className="accessibility-input-container">
                  <FormControl className="accessibility-question-form-control" component="fieldset">
                    <FormLabel className="accessibility-question-label" component="legend">The audio description is necessary?</FormLabel>
                    <RadioGroup aria-label="position" name="position" value={this.state.necessaryAudioDescription} onChange={this.necessaryAudioDescriptionHandleChange} row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="secondary" />}
                        label="No"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            :
              undefined
          }
          {
            this.state.necessaryAudioDescription === 'yes' && this.state.audioDescription === 'no' ?
              <div>
                <div className="dialog-input-file-container">
                  <FileUpload
                    parentId={this.props.parentId + "-accessibility-audio-file"}
                    accept="audio/*"
                    label="Upload audio description"
                    uploadedTitle="Audio description"
                    icon="audio-g.svg"
                    collection={CourseFilesCollection}
                    removeFunction="RemoveCourseFile"
                    type="accessibility-audio"
                    preview={false}
                    dowload={false}
                    open={false}
                    delete={true}
                    showIcon={true}
                    accessibilitySettings={false}
                    showControlMessage={this.props.showControlMessage.bind(this)}
                    resetFile={this.resetAudioDescription.bind(this)}
                    getFileInformation={this.getAudioDescriptionInformation.bind(this)}
                    removeFileInformation={this.removeAudioDescriptionInformation.bind(this)}
                    showAccesibilityForm={undefined}
                  />
                </div>
                <FormHelperText>If you can't upload the audio description try to give us an alternative.</FormHelperText>
                <div className="accessibility-input-container">
                  <TextField
                    id="audio-description-alternative-input"
                    select
                    label="Audio description alternative"
                    fullWidth
                    required
                    value={this.state.audioDescriptionAlternative}
                    onChange={this.handleChangeAudioDescriptionAlternative('audioDescriptionAlternative')}
                    SelectProps={{
                      MenuProps: {

                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    {this.state.audioDescriptionAlternatives.map(option => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {
                  this.state.audioDescriptionAlternative === 0 ?
                    <div>
                      <div className="accessibility-input-container">
                        <TextField
                          id="audio-description-input"
                          label="Audio description"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows="3"
                        />
                      </div>
                    </div>
                  :
                  undefined
                }
                {
                  this.state.audioDescriptionAlternative === 1 ?
                    <div>
                      <div className="dialog-input-file-container">
                        <FileUpload
                          parentId={this.props.parentId + "accessibility-pdf-file"}
                          accept=".pdf"
                          label="Upload pdf audio description"
                          uploadedTitle="Audio description (pdf)"
                          icon="pdf-g.svg"
                          collection={CourseFilesCollection}
                          removeFunction="RemoveCourseFile"
                          type="accessibility-pdf"
                          preview={false}
                          dowload={false}
                          open={true}
                          delete={true}
                          showIcon={true}
                          accessibilitySettings={false}
                          showControlMessage={this.props.showControlMessage.bind(this)}
                          resetFile={this.resetPdfAudioDescription.bind(this)}
                          getFileInformation={this.getPdfAudioDescriptionInformation.bind(this)}
                          removeFileInformation={this.removePdfAudioDescriptionInformation.bind(this)}
                          showAccesibilityForm={undefined}
                        />
                      </div>
                    </div>
                  :
                  undefined
                }
              </div>
            :
            undefined
          }
          <div className="accessibility-input-container">
            <FormControl className="accessibility-question-form-control" component="fieldset">
              <FormLabel className="accessibility-question-label" component="legend">The uploaded video has captions embebed?</FormLabel>
              <RadioGroup aria-label="position" name="position" value={this.state.captionsEmbebed} onChange={this.captionsEmbebedHandleChange} row>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="secondary" />}
                  label="No"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="accessibility-input-container">
            <FormControl className="accessibility-question-form-control" component="fieldset">
              <FormLabel className="accessibility-question-label" component="legend">The uploaded video has an a text transcription?</FormLabel>
              <RadioGroup aria-label="position" name="position" value={this.state.textTranscription} onChange={this.textTranscriptionHandleChange} row>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="secondary" />}
                  label="No"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {
            this.state.textTranscription === 'no' ?
              <div>
                <FormHelperText>Please select the way to add the text transciption.</FormHelperText>
                <div className="accessibility-input-container">
                  <TextField
                    id="text-transciption-input"
                    select
                    label="Text transciption option"
                    fullWidth
                    required
                    value={this.state.textTranscriptionOption}
                    onChange={this.handleChangeTextTranscriptionOption('textTranscriptionOptions')}
                    SelectProps={{
                      MenuProps: {

                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    {this.state.textTranscriptionOptions.map(option => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {
                  this.state.textTranscriptionOption === 0 ?
                    <div>
                      <div className="accessibility-input-container">
                        <TextField
                          id="text-transciption-input"
                          label="Text transciption"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows="3"
                        />
                      </div>
                    </div>
                  :
                    undefined
                }
                {
                  this.state.textTranscriptionOption === 1 ?
                    <div>
                      <div className="dialog-input-file-container">
                        <FileUpload
                          parentId={this.props.parentId + "transciption-accessibility-pdf-file"}
                          accept=".pdf"
                          label="Upload pdf text trasncription"
                          uploadedTitle="Text transciption (pdf)"
                          icon="pdf-g.svg"
                          collection={CourseFilesCollection}
                          removeFunction="RemoveCourseFile"
                          type="accessibility-pdf-trasncription"
                          preview={false}
                          dowload={false}
                          open={true}
                          delete={true}
                          showIcon={true}
                          accessibilitySettings={false}
                          showControlMessage={this.props.showControlMessage.bind(this)}
                          resetFile={this.resetTextTranscription.bind(this)}
                          getFileInformation={this.getTextTranscriptionInformation.bind(this)}
                          removeFileInformation={this.removeTextTranscriptionInformation.bind(this)}
                          showAccesibilityForm={undefined}
                        />
                      </div>
                    </div>
                  :
                    undefined
                }
              </div>
            :
              undefined
          }

          <div className="accessibility-input-container">
            <FormControl className="accessibility-question-form-control" component="fieldset">
              <FormLabel className="accessibility-question-label" component="legend">Warn about epilepsy risks?</FormLabel>
              <RadioGroup aria-label="position" name="position" value={this.state.warnEpilepsy} onChange={this.warnEpilepsyHandleChange} row>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="secondary" />}
                  label="No"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}
