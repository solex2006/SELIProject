import React from 'react';
import { Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SchoolIcon from '@material-ui/icons/School';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from 'react-reveal/Fade';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import LinearProgress from '@material-ui/core/LinearProgress';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

export default class CourseSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false,
    }
  }

  componentDidMount() {
    this.checkSubscriptions();
  }

  componentWillReceiveProps() {
    this.checkSubscriptions();
  }

  checkSubscriptions = () => {
    let subscribed = false;
    for (var i = 0; i < this.props.course.classroom.length; i++) {
      if (this.props.course.classroom[i] === Meteor.userId()) {
        subscribed = true;
      }
    }
    this.setState({
      subscribed: subscribed,
    });
  }

  render() {
    return (
      <div tabIndex="-1">
        {
          !this.props.course.published ?
            <Card tabIndex="-1" className="maintenance-subscription-card">
              <CardActionArea tabIndex="-1" className="subscription-card-area">
                <CardMedia
                  tabIndex="0"
                  className="subscription-card-media"
                  image={this.props.course.image.link}
                  title={this.state.label}
                />
                <div tabIndex="-1" className="subscription-card-column">
                  <div tabIndex="-1" className="subscription-card-maintenance-container">
                    <p tabIndex="-1" className="subscription-card-maintenance-text">
                      {this.props.language.courseUnderMaintenance}
                    </p>
                  </div>
                </div>
                <div tabIndex="-1" className="maintenance-subscribed-hover">
                  <NotInterestedIcon tabIndex="-1" className="subscription-card-maintenance-icon"/>
                </div>
              </CardActionArea>
            </Card>
          :
          <Card tabIndex="1" className="subscription-card">
            <CardActionArea tabIndex="1" className="subscription-card-area">
              <CardMedia
                tabIndex="1"
                className="subscription-card-media"
                image={this.props.course.image.link}
                title={this.state.label}
              />
              <div  className="subscription-card-column">
                <div className="MuiCardHeader-root subscription-card-header subscription-card-header">
                  <div className="MuiCardHeader-content">
                    <h2 className="MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock">{this.props.course.title}</h2>
                    <h3 className="MuiTypography-root MuiCardHeader-subheader MuiTypography-body1 MuiTypography-colorTextSecondary MuiTypography-displayBlock">{this.props.course.subtitle}</h3>
                  </div>
                </div>
                <CardContent tabIndex="-1" className="subscription-card-content">
                  <div tabIndex="-1" className="subscription-card-progress-container">
                    <LinearProgress
                    tabIndex="-1"
                      className="subscription-linear-progress"
                      valueBuffer={100}
                      value={this.props.progress}
                      variant="determinate"
                    />
                    <p tabIndex="-1" className="subscription-linear-progress-text">
                      {`${this.props.progress}%`}
                    </p>
                  </div>
                </CardContent>
                <CardActions tabIndex="-1" className="subscription-card-actions" disableSpacing>
                  <Button
                    tabIndex="1" 
                    onClick={() => this.props.unsubscribe(this.props.course._id)}
                    className="subscription-card-button"
                    variant="outlined"
                    color="primary"
                    disabled={this.props.disabled}
                  >
                    {this.props.language.unsubscribe}
                  </Button>
                  {
                    this.props.progress <= 0 ?
                      <Button
                        tabIndex="1"
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        {this.props.language.startCourse}
                      </Button>
                    :
                    undefined
                  }
                  {
                    this.props.progress > 0 && this.props.progress < 100 ?
                      <Button
                        tabIndex="1"
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        {this.props.language.resumeCourse}
                      </Button>
                    :
                    undefined
                  }
                  {
                    this.props.progress >= 100 ?
                      <Button
                        tabIndex="1"
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        {this.props.language.reviewCourse}
                      </Button>
                    :
                    undefined
                  }
                </CardActions>
              </div>
            </CardActionArea>
          </Card>
        }
      </div>
    );
  }
}
