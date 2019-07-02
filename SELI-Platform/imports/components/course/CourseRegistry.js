import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  checkSylabus() {
    window.open(this.props.courses.course.sylabus.url, '_blank');
  }

  render() {
    return(
      <div>
        <div className="course-presentation">
          <p className="course-presentation-title">{this.props.courses.course.title}</p>
          <p className="course-presentation-subtitle">{this.props.courses.course.subtitle}</p>
          <Divider className="course-presentation-separator"/>
          <p className="course-presentation-description">{this.props.courses.course.description}</p>
          <div className="course-presentation-image" style={{ backgroundImage: "url(" + this.props.courses.course.image.url + ")" }}></div>
        </div>
        <div className="course-infomation-container">
          <p className="course-information-title">What is this course about?</p>
          <Divider/>
          <div className="course-infomation-row">
            <div id="margin-column" className="course-infomation-column">
              <div id="flex-start-row" className="course-infomation-row">
                <div id={"category" + this.props.courses.course.category.value} className="category-icon"></div>
                <div className="category-text">{this.props.courses.course.category.label}</div>
              </div>
              <div id="flex-start-row" className="course-infomation-row">
                <div className="duration-icon"></div>
                <div className="duration-text">{"Duration: " + this.props.courses.course.time + " minutes"}</div>
              </div>
              <div className="course-information-button-container">
                <Button onClick={() => this.checkSylabus()} className="course-infomation-button" variant="contained">
                  Check sylabus
                </Button>
              </div>
            </div>
            <div className="course-infomation-column">
              <p className="course-information-subtitle">People who can take the course</p>
              <div className="course-infomation-row">
                <div id="full-width-column" className="course-infomation-column">
                  {
                    this.props.courses.course.requirements.people.map((people) =>
                      {
                        return(
                          <div className="course-items-container">
                            <div className="course-item-decoration"></div>
                            <div className="course-item-text">{people}</div>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="content-title">Course content</p>
        <div className="course-information-content-container">
          {
            this.props.courses.course.units.map((units) =>
              {
                return(
                  <ExpansionPanel className="course-information-expansion-panel">
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon className="course-information-expansion-icon"/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="course-information-expansion-sumary"
                    >
                      <Typography>{units.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="course-information-expansion-details">
                      <Typography>
                        {
                          units.lessons.map((lessons) =>
                            {
                              return(
                                <p>{lessons.name}</p>
                              )
                            })
                        }
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
          }
        </div>
      </div>
    );
  }
}
