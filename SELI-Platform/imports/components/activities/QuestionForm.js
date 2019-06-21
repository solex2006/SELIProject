import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme.js';

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      awardPoints: '',
    }
  }

  handleChange = event => {
    this.setState({
      time: event.target.value,
    });
  };

  handleCheckChange = event => {
    this.setState({
      awardPoints: event.target.value,
    })
  }

  addQuestion(){
    let question = {};
    let text = document.getElementById('question-input').value;
    question.text = text;
    this.props.addQuestion(question);
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div className="form-subtitle">New Question</div>
          <div className="input-container">
            <TextField
              id="question-input"
              label="Question"
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="select-input-container">
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="time"
                className="select-input-label"
                id="question-time-select"
              >
                Time
              </InputLabel>
              <Select
                value={this.state.time}
                onChange={this.handleChange}
                required
                input={
                  <OutlinedInput
                    name="time"
                    id="time"
                  />
                }
              >
                <MenuItem value={5}>5 seconds</MenuItem>
                <MenuItem value={10}>10 seconds</MenuItem>
                <MenuItem value={20}>20 seconds</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>60 seconds</MenuItem>
                <MenuItem value={90}>90 seconds</MenuItem>
                <MenuItem value={120}>120 seconds</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-container">
            <FormControl component="fieldset">
              <FormLabel className="form-label">Award points</FormLabel>
              <RadioGroup className="form-group" aria-label="position" name="position" value={this.state.awardPoints} onChange={this.handleCheckChange} row>
                <FormControlLabel
                  value="yes"
                  control={<Radio  className="form-radio" color="primary"/>}
                  label="Yes"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio  className="form-radio" color="primary"/>}
                  label="No"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Answer 1"
              margin="normal"
              variant="outlined"
              required
              className="answer-input"
            />
            <FormControlLabel
              value="correct-1"
              control={<Checkbox className="form-checkbox" color="primary"/>}
              label="Correct"
              labelPlacement="end"
              className="answer-control"
            />
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Answer 2"
              margin="normal"
              variant="outlined"
              required
              className="answer-input"
            />
            <FormControlLabel
              value="correct-2"
              control={<Checkbox className="form-checkbox" color="primary"/>}
              label="Correct"
              labelPlacement="end"
              className="answer-control"
            />
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Answer 3"
              margin="normal"
              variant="outlined"
              required
              className="answer-input"
            />
            <FormControlLabel
              value="correct-3"
              control={<Checkbox className="form-checkbox" color="primary"/>}
              label="Correct"
              labelPlacement="end"
              className="answer-control"
            />
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Answer 4"
              margin="normal"
              variant="outlined"
              required
              className="answer-input"
            />
            <FormControlLabel
              value="correct-4"
              control={<Checkbox className="form-checkbox" color="primary"/>}
              label="Correct"
              labelPlacement="end"
              className="answer-control"
            />
          </div>
          <div className="input-container">
            <TextField
              id="outlined-uncontrolled"
              label="Credit resources"
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
              required
              inputProps={{ min: "0", max: "150", step: "1" }}
            />
          </div>
          <div className="form-button-container">
            <Button onClick={() => this.addQuestion()} className="form-button" id="upload-button" variant="contained" color="secondary">
              Save question
            </Button>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
