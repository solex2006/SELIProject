import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
          category: '',
          traductions: [
            {
              title: 'NEW COURSE',
              courseName: 'Course name',
              coursePhrase: 'Course phrase',
              category: 'Category *',
              technology: 'Technology',
              social: 'Social',
              none: 'None',
              description: 'Description',
              image: 'Course image',
              objectives: 'Objectives',
              prerequisites: 'Prerequisites',
              technicalRequirements: 'Technical requirements',
              microphone: 'Microphone',
              speakers: 'Speakers',
              add: 'Add',
              addCourse: 'Create course',
            },
            {
              title: 'NUEVO CURSO',
              courseName: 'Nombre del curso',
              coursePhrase: 'Frase del curso',
              category: 'Categoria *',
              technology: 'Tecnología',
              social: 'Social',
              none: 'Ninguna',
              description: 'Descripción',
              image: 'Imagen del curso',
              objectives: 'Objetivos',
              prerequisites: 'Prerequisitos',
              technicalRequirements: 'Requisitos tecnicos',
              microphone: 'Microfono',
              speakers: 'Parlantes',
              add: 'Añadir',
              addCourse: 'Registrar curso',
            },
          ],
        }
    }

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount(){

    }

    render() {
        return(
            <div>
              <div className="form-container">
                <div className="form-title">{this.state.traductions[this.props.language].title}</div>
                <form className="form-container">
                  <MuiThemeProvider theme={theme}>
                    <div className="input-container">
                      <TextField
                        id="standard-name"
                        label={this.state.traductions[this.props.language].courseName}
                        required
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div className="input-container">
                      <TextField
                        id="standard-name"
                        label={this.state.traductions[this.props.language].coursePhrase}
                        required
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div className="input-container-select">
                      <FormControl>
                        <InputLabel htmlFor="age-simple">{this.state.traductions[this.props.language].category}</InputLabel>
                        <Select
                          fullWidth
                          required
                          value={this.state.category}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'category',
                            id: 'acategoryge-simple',
                          }}
                        >
                          <MenuItem value="">
                            <em>{this.state.traductions[this.props.language].none}</em>
                          </MenuItem>
                          <MenuItem value={0}>{this.state.traductions[this.props.language].technology}</MenuItem>
                          <MenuItem value={1}>{this.state.traductions[this.props.language].social}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="input-container-image">
                      <div className="image-preview"></div>
                      <div className="buton-container">
                        <Button className="main-button" id="image-button" variant="contained" color="primary">
                          {this.state.traductions[this.props.language].image}
                        </Button>
                      </div>
                    </div>
                    <div className="input-container">
                      <TextField
                        id="standard-name"
                        label={this.state.traductions[this.props.language].description}
                        required
                        margin="normal"
                        fullWidth
                        multiline
                        rows="4"
                      />
                    </div>
                    <div className="multiple-input-container">
                      <div className="multiple-input">
                        <TextField
                          id="standard-name"
                          label={this.state.traductions[this.props.language].objectives}
                          required
                          margin="normal"
                          fullWidth
                        />
                      </div>
                      <div className="button-container">
                        <Button className="main-button" id="image-button" variant="contained" color="primary">
                          {this.state.traductions[this.props.language].add}
                        </Button>
                      </div>
                      <div className="added-container"></div>
                    </div>
                    <div className="multiple-input-container">
                      <div className="multiple-input">
                        <TextField
                          id="standard-name"
                          label={this.state.traductions[this.props.language].prerequisites}
                          required
                          margin="normal"
                          fullWidth
                        />
                      </div>
                      <div className="button-container">
                        <Button className="main-button" id="image-button" variant="contained" color="primary">
                          {this.state.traductions[this.props.language].add}
                        </Button>
                      </div>
                      <div className="added-container"></div>
                    </div>
                    <div className="multiple-input-container">
                      <div className="multiple-input">
                        <FormControl>
                          <InputLabel htmlFor="tech-simple">{this.state.traductions[this.props.language].technicalRequirements}</InputLabel>
                          <Select
                            fullWidth
                            required
                            value={this.state.tech}
                            onChange={this.handleChange}
                            inputProps={{
                              name: 'tech',
                              id: 'tech-simple',
                            }}
                          >
                            <MenuItem value="">
                              <em>{this.state.traductions[this.props.language].none}</em>
                            </MenuItem>
                            <MenuItem value={0}>{this.state.traductions[this.props.language].microphone}</MenuItem>
                            <MenuItem value={1}>{this.state.traductions[this.props.language].speakers}</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="button-container">
                        <Button className="main-button" id="image-button" variant="contained" color="primary">
                          {this.state.traductions[this.props.language].add}
                        </Button>
                      </div>
                      <div className="added-container"></div>
                    </div>
                    <div className="complete-button-container">
                      <Button className="main-button" id="create-button" variant="contained" color="secondary">
                        {this.state.traductions[this.props.language].addCourse}
                      </Button>
                    </div>
                  </MuiThemeProvider>
                </form>
              </div>
            </div>
        );
    }
}
