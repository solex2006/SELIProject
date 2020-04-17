import React from 'react';
import { Link } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SchoolIcon from '@material-ui/icons/School';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from 'react-reveal/Fade';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import CommentIcon from '@material-ui/icons/Comment';

import Loading from '../tools/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Comment from '../../components/student/comments/Comment';

import {Comments} from '../../../lib/CommentsCollection';
import { StudentLog } from '../../../lib/StudentLogCollection';

var ColorThief = require('color-thief');

export default class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      subscribed: false,
    }
  }

  componentDidMount() {
    this.getImageColors();
    this.getKeyWords();
    this.checkSubscriptions();
  }

  getKeyWords = () => {
    let keyWords = this.props.course.keyWords;
    let label = '';
    keyWords.map((keyWord, index) => {
      label = label + keyWord;
      index + 1 === keyWords.length ? undefined : label = label + ", "
    })
    this.setState({
      label: label,
    });
  }

  getImageColors() {
    var colorThief = new ColorThief();
    var courseImage = new Image(500, 500);
    courseImage.src = this.props.course.image.link;
    let self = this;
    courseImage.addEventListener('load', function() {
      let mainColor = colorThief.getColor(courseImage);
      let mainContrastColor = self.getContrastColor(self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]));
      mainColor = self.fullColorHex(mainColor[0], mainColor[1], mainColor[2]);
      mainColor = `#${mainColor}`;
      mainContrastColor = `#${mainContrastColor}`;
      self.setState({
        mainColor: mainColor,
        mainContrastColor: mainContrastColor,
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

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  showComments = () => {
    this.setState({
      open: true,
      loading: true,
    }, () => {
      Tracker.autorun(() => {
        let comments = Comments.find({course: this.props.course._id, show: true}).fetch();
        if (comments.length) {
          this.setState({
            commentResults: true,
            comments: comments,
            loading: false,
          });
        }
        else {
          this.setState({
            commentResults: false,
            loading: false,
          });
        }
      });
    })
  }

  redirect = url => {
    this.props.history.push({
      pathname: url,
      state: {
        language: this.props.language,
      }
    });
  }

  render() {
    return (
      <div>
        <Fade force top delay={this.props.index * 350}>
          <Card className="course-card">
            <CardActionArea>
             <CardHeader
                avatar={
                  <Avatar
                    style={{backgroundColor: this.state.mainColor, color: this.state.mainContrastColor}}
                    aria-label="recipe"
                    className="course-card-avatar"
                  >
                    <h2>{this.props.course.title.charAt(0).toUpperCase()}</h2>
                  </Avatar>
                }
                className="course-card-header"
                title={
                  <h2 className="MuiTypography-root MuiCardHeader-title MuiTypography-body2 MuiTypography-displayBlock">{this.props.course.title}</h2>
                }
                subheader={
                  <h3 className="MuiTypography-root MuiCardHeader-subheader MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">{this.props.course.subtitle}</h3>
                }
              /> 

              {/* <div className="MuiCardHeader-content">
                <div className="course-card-header-1">
                  <Avatar
                    style={{backgroundColor: this.state.mainColor, color: this.state.mainContrastColor}}
                    aria-label="recipe"
                    className="course-card-avatar"
                  >
                    <h2>{this.props.course.title.charAt(0).toUpperCase()}</h2>
                  </Avatar>
                  <div className="card-header-1">
                    <h2 className="MuiTypography-root MuiCardHeader-title MuiTypography-body2 MuiTypography-displayBlock">{this.props.course.title}</h2>
                    <h3 className="MuiTypography-root MuiCardHeader-subheader MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">{this.props.course.subtitle}</h3>
                  </div>
                </div>
              </div> */}
              <CardMedia
                className="course-card-media"
                image={this.props.course.image.link}
                title={this.state.label}
              />
              <CardContent className="course-card-content">
                <Typography className="course-card-description" variant="body2" color="textSecondary" component="p">
                  {this.props.course.description}
                </Typography>
                <Typography className="course-card-extra-information" variant="overline" color="textSecondary" component="p">
                  {`${this.props.language.author}: ${this.props.course.createdBy}`}
                </Typography>
              </CardContent>
              <CardActions className="course-card-actions" disableSpacing>
                <Link className="button-link MuiButtonBase-root MuiButton-root MuiButton-outlined course-card-button"
                  to={{
                    pathname: "/coursePreview",
                    hash: this.props.course._id,
                    state: { fromDashboard: true },
                  }}
                  onClick={() => 
                    {
                      StudentLog.insert({ "UserId": Meteor.userId(), "CourseId" : this.props.course._id, 
                      "Datetime": new Date(), "Action": "Course Preview" });
                    }}
                >
                  {this.props.language.coursePreview}
                  {/*<Button
                    className="course-card-button"
                    aria-label="see preview"
                    variant="outlined"
                    onClick={() => 
                    {
                      StudentLog.insert({ "UserId": Meteor.userId(), "CourseId" : this.props.course._id, 
                      "Datetime": new Date(), "Action": "Course Preview" });
                    }}
                  >
                    {this.props.language.coursePreview}
                  </Button> */}
                </Link>
                {
                  !this.state.subscribed ?
                    <Tooltip title={this.props.language.subscribeJoin}>
                      <IconButton
                        disabled={this.props.disabled}
                        onClick={() => this.props.subscribe(this.props.course._id)}
                        className="course-card-icon-button"
                        aria-label="join course"
                      >
                        <SchoolIcon className="course-card-icon"/>
                      </IconButton>
                    </Tooltip>
                  :
                  <Tooltip title={this.props.language.unsubscribeToolti}>
                    <IconButton
                      className="course-card-icon-button"
                      disabled={this.props.disabled}
                      onClick={() => this.props.unsubscribe(this.props.course._id)}
                      aria-label="left course"
                    >
                      <UnsubscribeIcon className="course-card-icon"/>
                    </IconButton>
                  </Tooltip>
                }
                <Tooltip title={this.props.language.courseCommentsTooltip}>
                  <IconButton
                    className="course-card-icon-button"
                    onClick={() => this.showComments()}
                    aria-label="left course"
                  >
                    <CommentIcon className="course-card-icon"/>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </CardActionArea>
          </Card>
        </Fade>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="comments-dialog"
        >
          <DialogTitle className="comment-dialog-title">
            {this.props.language.comments}
          </DialogTitle>
          <DialogContent className="comments-dialog-content">
            {
              this.state.loading ?
                <Loading message={this.props.language.loadingComments}/>
              :
              <div>
                {
                  this.state.commentResults ?
                    <div className="comments-result-container">
                      {
                        this.state.comments.map((comment, index) => {
                          return(
                            <Comment
                              comment={comment}
                              commentOf={this.props.language.commentOf}
                            />
                          )
                        })
                      }
                    </div>
                  :
                  <div className="comments-result-container">
                    <div className="center-row">
                      <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                        {this.props.language.noCommentsText}
                      </DialogContentText>
                    </div>
                    <div className="center-row">
                      <CommentIcon className="comments-result-icon"></CommentIcon>
                    </div>
                  </div>
                }
              </div>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
