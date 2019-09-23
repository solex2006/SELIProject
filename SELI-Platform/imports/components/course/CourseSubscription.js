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
      <div>
        {
          !this.props.course.published ?
            <Card className="maintenance-subscription-card">
              <CardActionArea className="subscription-card-area">
                <CardMedia
                  className="subscription-card-media"
                  image={this.props.course.image.link}
                  title={this.state.label}
                />
                <div className="subscription-card-column">
                  <div className="subscription-card-maintenance-container">
                    <p className="subscription-card-maintenance-text">
                      Course under maintenance, when it becomes active again you can continue.
                    </p>
                  </div>
                </div>
                <div className="maintenance-subscribed-hover">
                  <NotInterestedIcon className="subscription-card-maintenance-icon"/>
                </div>
              </CardActionArea>
            </Card>
          :
          <Card className="subscription-card">
            <CardActionArea className="subscription-card-area">
              <CardMedia
                className="subscription-card-media"
                image={this.props.course.image.link}
                title={this.state.label}
              />
              <div className="subscription-card-column">
                <CardHeader
                  className="subscription-card-header"
                  title={this.props.course.title}
                  subheader={this.props.course.subtitle}
                />
                <CardContent className="subscription-card-content">
                  <div className="subscription-card-progress-container">
                    <LinearProgress
                      className="subscription-linear-progress"
                      valueBuffer={100}
                      value={this.props.progress}
                      variant="determinate"
                    />
                    <p className="subscription-linear-progress-text">
                      {`${this.props.progress}%`}
                    </p>
                  </div>
                </CardContent>
                <CardActions className="subscription-card-actions" disableSpacing>
                  <Button onClick={() => this.props.unsubscribe(this.props.course._id)}
                    className="subscription-card-button"
                    variant="outlined"
                    color="primary"
                    disabled={this.props.disabled}
                  >
                    Unsubscribe
                  </Button>
                  {
                    this.props.progress === 0 ?
                      <Button
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        Start course
                      </Button>
                    :
                    undefined
                  }
                  {
                    this.props.progress > 0 && this.props.progress < 100 ?
                      <Button
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        Resume course
                      </Button>
                    :
                    undefined
                  }
                  {
                    this.props.progress === 100 ?
                      <Button
                        onClick={() => this.props.handleClickCourse(this.props.course._id)}
                        className="subscription-card-button"
                        variant="outlined"
                        color="primary"
                        disabled={this.props.disabled}
                      >
                        Review course
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
