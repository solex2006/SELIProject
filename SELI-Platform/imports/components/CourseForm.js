import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  saveCourse(){
    this.props.showForm('TutorForm');
  }


  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Course information</div>
          <MuiThemeProvider theme={theme}>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Course title"
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Course sub title"
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
                  htmlFor="course-category"
                >
                  Course category *
                </InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleChange}
                  required
                  input={
                    <OutlinedInput
                      name="course-category"
                      id="course-category"
                    />
                  }
                >
                  <MenuItem value={0}>Informatics</MenuItem>
                  <MenuItem value={1}>Pedagogy</MenuItem>
                  <MenuItem value={2}>Educaional videogames</MenuItem>
                  <MenuItem value={3}>Personal development</MenuItem>
                  <MenuItem value={4}>English as a second</MenuItem>
                  <MenuItem value={5}>Special education</MenuItem>
                  <MenuItem value={6}>Computational thinking</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="input-container">
              <div className="image-preview"></div>
              <Button className="main-button" id="upload-button" variant="contained" color="primary">
                Upload course image
              </Button>
            </div>
            <div className="input-container">
              <div className="file-preview"></div>
              <Button className="main-button" id="upload-button" variant="contained" color="primary">
                Upload syllabus (.pdf)
              </Button>
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Estimated time"
                margin="normal"
                variant="outlined"
                type="number"
                fullWidth
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                }}
                inputProps={{ min: "0", max: "150", step: "1" }}
              />
            </div>
            <div className="input-container">
              <TextField
                id="outlined-uncontrolled"
                label="Course description"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                multiline
                rows="2"
              />
            </div>
            <div className="multiple-inputs-container">
              <TextField
                className="multiple-input"
                id="outlined-uncontrolled"
                label="Objective"
                margin="normal"
                variant="outlined"
                required
              />
              <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
                Add
              </Button>
              <div className="input-list">
                <div className="input-list-title">Objectives</div>
                <div className="input-list-container"></div>
              </div>
            </div>
            <div className="multiple-inputs-container">
              <TextField
                className="multiple-input"
                id="outlined-uncontrolled"
                label="Modality & metodology"
                margin="normal"
                variant="outlined"
                required
              />
              <Button className="mutiple-button" id="upload-button" variant="contained" color="primary">
                Add
              </Button>
              <div className="input-list">
                <div className="input-list-title">Modalities & metodologies</div>
                <div className="input-list-container"></div>
              </div>
            </div>
            <div className="form-button-container">
              <Button onClick={() => this.saveCourse()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Save course
              </Button>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
