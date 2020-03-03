import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';
import BookIcon from '@material-ui/icons/Book';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Roll from 'react-reveal/Roll';

import CourseCarousel from './CourseCarousel';
import TechnicalRequirement from './TechnicalRequirement';
import CourseNavigation from './CourseNavigation';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

var ColorThief = require('color-thief');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class CoursePresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course,
      mainColor: '',
      palette: ['', '', '', ''],
    }
  }

  componentDidMount() {
    this.getImageColors();
  }

  getImageColors() {
    var colorThief = new ColorThief();
    var courseImage = new Image(500, 500);
    courseImage.src = this.props.course.image.link;
    let self = this;
    courseImage.addEventListener('load', function() {
      let mainColor = colorThief.getColor(courseImage);
      mainColor = self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]);
      mainColor = `#${mainColor}`;
      let paletteRgb = colorThief.getPalette(courseImage, 3);
      let palette = [];
      for (var i = 0; i < paletteRgb.length; i++) {
        palette.push({
          bgColor: `#${self.fullColorHex(paletteRgb[i][0], paletteRgb[i][1], paletteRgb[i][2])}`,
          textColor: self.getContrastColor(self.fullColorHex(paletteRgb[i][0], paletteRgb[i][1], paletteRgb[i][2])),
        });
      }
      self.setState({
        mainColor: mainColor,
        palette: palette,
      })
    });
  }

  rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  fullColorHex(r, g, b) {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red+green+blue;
  };

  getContrastColor(hexColor) {
    var r = parseInt(hexColor.substr(0, 2), 16);
    var g = parseInt(hexColor.substr(2, 2), 16);
    var b = parseInt(hexColor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#212121' : '#FFFFFF';
  }

  handleClickOpenSylabus = () => {
    this.setState({ openSylabus: true });
  };

  handleCloseSyalbus = () => {
    this.setState({ openSylabus: false });
  };

  handleClickOpenOrganization = () => {
    this.setState({ openOrganization: true });
  };

  handleCloseOrganization = () => {
    this.setState({ openOrganization: false });
  };

  learnMore() {
    var win = window.open("http://seliproject.org/project-overview", '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="course-presentation-container">
        <div className="course-presentation-hero-container">
          <div className="course-presentation-hero-column">
            <Fade duration={2000} cascade>
              <h1 className="course-presentation-hero-title">{this.props.course.title}</h1>
            </Fade>
            <Fade delay={1000}>
              {
                this.props.course.subtitle === "-----"?
                  undefined
                :
                  <h4 className="course-presentation-hero-subtitle">{this.props.course.subtitle}</h4>
              }
              <p className="course-presentation-hero-normal">{`${this.props.language.createdBy}: ${this.props.course.createdBy}`}</p>
            </Fade>
          </div>
          <div className="course-presentation-hero-column">
            <Paper
              id="course-presentation-hero-media-image"
              className="course-presentation-hero-media-paper-1"
              elevation={0}
              style={{
                backgroundImage: `url(${this.props.course.image.link})`, 
                backgroundColor: "transparent",
                color: "transparent"}}
            ></Paper>
            <div className="course-presentation-hero-media-paper-2">
              <Paper 
                id="course-presentation-hero-media-color" 
                className="course-zoom" 
                elevation={10}
                style={{backgroundImage: `url(${this.props.course.image.link})`}}
              ></Paper>
            </div>
          </div>
        </div>
        <Fade left>
          <div id="course-presentation-description" className="course-presentation-description">
            {this.props.course.description}
          </div>
        </Fade>
        <div className="course-other-information-container">
          <div className={"boxItem"}>
          <Fade left>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[0].bgColor,
                color: this.state.palette[0].textColor,
              }}
            >
              <div className="course-card-title">
                {this.props.language.estimatedCourseDuration}
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <TimerIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[0].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-large-text">{`${this.props.course.duration} ${this.props.language.hours}`}</p>
                <p className="course-card-large-text">{`${this.props.course.durationweeks} ${this.props.language.week}`}</p>
              </div>
            </Paper>
          </Fade>
          <Fade up>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[0].bgColor,
                color: this.state.palette[0].textColor,
              }}
              onClick={() => this.handleClickOpenSylabus()}
            >
              <div className="course-card-title">
                {this.props.language.courseSyllabus}
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <BookIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[0].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-medium-text">{this.props.language.clickToRead}</p>
              </div>
            </Paper>
          </Fade>
          <Fade right>
            <Paper
              elevation={12}
              className="course-card-information"
              style={{
                backgroundColor: this.state.palette[0].bgColor,
                color: this.state.palette[0].textColor,
              }}
              onClick={() => this.handleClickOpenOrganization()}
            >
              <div className="course-card-title">
                {this.props.language.courseOrganization}
              </div>
              <div className="course-card-presentation-content">
                <IconButton className="course-card-presentation-icon-button">
                  <AssignmentIcon
                    className="course-card-presentation-icon"
                    style={{
                      color: this.state.palette[0].textColor,
                    }}
                  />
                </IconButton>
                <p className="course-card-small-text">{`${this.props.course.organization.subunit ? this.props.language.clickToSeeAllUnitsAndSubunits : this.props.language.clickToSeeAllTopics}`}</p>
              </div>
            </Paper>
          </Fade>
          {
            this.props.course.signature === "" ?
                undefined
              :
                <Fade up>
                  <Paper
                    elevation={12}
                    className="course-card-information"
                    style={{
                      backgroundColor: this.state.palette[0].bgColor,
                      color: this.state.palette[0].textColor,
                    }}
                  >
                    <div className={"course-card-title1"}>{this.props.language.audiences}</div>
                    <div className={"groupAudicences"}>
                        <div className="titleItem" >
                          {this.props.language.audienceAreas}:
                          {
                            this.props.course.signature==="" ?
                            undefined
                            :
                            this.props.course.signature.map((value, index)=>{
                              return(
                                <div className={"itemAudience"}>{value}</div>
                              )
                            })
                          }
                        </div>
                        <div className="titleItem" >
                          {this.props.language.audiencelevel}:
                          {
                            this.props.course.level==="" ?
                            undefined
                            :
                            this.props.course.level.map((value, index)=>{
                              return(
                                <div className={"itemAudience"}>{value}</div>
                              )
                            })
                          }
                          
                        </div>
                        
                        <div className="titleItem" >
                          {this.props.language.audiencetype}:
                          {
                            this.props.course.type==="" ?
                            undefined
                            :
                            this.props.course.type.map((value, index)=>{
                              return(
                                <div className={"itemAudience"}>{value}</div>
                              )
                            })
                          }
                        </div>
                    </div>
                    <IconButton className="course-card-presentation-icon-button">
                          <AccessibilityIcon
                            className="course-card-presentation-icon"
                            style={{
                              color: this.state.palette[0].textColor,
                            }}
                          />
                    </IconButton>
                  </Paper>
                </Fade>  
            }
          </div>
        </div>
        {
          this.props.course.support.length !== 0 ?
            <div className="course-requirement-information">
              <Roll right>
                <p className="course-requirement-information-title">{`${this.props.language.supportDissabilitiesTitle}:`}</p>
              </Roll>
              <Fade left>
                <CourseCarousel
                  requirements={this.props.course.support}
                  next={this.props.language.next}
                  back={this.props.language.back}
                />
              </Fade>
              <Fade delay={500} right>
                <div className="course-requirements-disabilities-container">
                  <p className="course-requirements-disabilities-title">{this.props.language.seliOverview}</p>
                  <p className="course-requirements-disabilities-description">{this.props.language.seliOverviewText}</p>
                  <Button onClick={() => this.learnMore()} className="course-requirements-accessibility-button" color="secondary">{this.props.language.learnMore}</Button>
                  <div className="course-requirements-accessibility-image"></div>
                </div>
              </Fade>
            </div>
          :
            <div className="course-requirement-information">
              <Roll right>
                <p className="course-requirement-information-title">{this.props.language.notSupportDisabilities}</p>
              </Roll>
            </div>
        }
        {/* <div className="course-requirement-information">
          <Roll left>
            <p className="course-requirement-information-title">{`${this.props.language.toCompleteTheCourseTitle}:`}</p>
          </Roll>
          <div className="course-technical-requirements-container">
            {this.props.course.requirements.map((requirement, index) => {
              return(
                <Fade delay={(index + 1) * 250} down>
                  <TechnicalRequirement requirement={requirement} description={this.props.language.description}/>
                </Fade>
              )
            })}
          </div>
        </div> */}
        <div className="course-presentation-footer">
          <p className="course-presentation-copyright-text">{`${this.props.language.madeBySeliTeam} 2020`}</p>
        </div>
        <Dialog fullScreen open={this.state.openSylabus} onClose={this.handleCloseSyalbus} TransitionComponent={Transition}>
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseSyalbus} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                {this.props.language.courseSyllabus}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="course-dialog-content">
            <object className="pdf-reader" data={this.props.course.sylabus.link} type="application/pdf" width="100%" height="100%"></object>
          </div>
        </Dialog>
        <Dialog open={this.state.openOrganization} onClose={this.handleCloseOrganization} TransitionComponent={Transition}>
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCloseOrganization} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
              {this.props.language.courseOrganization}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="course-presentation-organization-container">
            <CourseNavigation
              program={this.props.course.program}
              organization={this.props.course.organization}
              navigate={true}
              selected={this.props.selected}
              navigateTo={this.props.navigateTo.bind(this)}
              courseNav={this.props.language.courseNavigation}
              topic={this.props.language.topic}
              unit={this.props.language.unit}
              lesson={this.props.language.lesson}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}
