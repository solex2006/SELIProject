import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from 'react-reveal/Fade';

var ColorThief = require('color-thief');

export default class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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

  render() {
    return (
      <Fade force top delay={this.props.index * 100}>
        <Card className="course-card">
          <CardHeader
            avatar={
              <Avatar
                style={{backgroundColor: this.state.mainColor, color: this.state.mainContrastColor}}
                aria-label="recipe"
                className="course-card-avatar"
              >
                {this.props.course.title.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" className="course-card-icon-button">
                <MoreVertIcon className="course-card-icon" />
              </IconButton>
            }
            className="course-card-header"
            title={this.props.course.title}
            subheader={this.props.course.subtitle}
          />
          <CardMedia
            className="course-card-media"
            image={this.props.course.image.link}
            title="Paella dish"
          />
          <CardContent className="course-card-content">
            <Typography className="course-card-description" variant="body2" color="textSecondary" component="p">
              {this.props.course.description}
            </Typography>
          </CardContent>
          <CardActions className="course-card-actions" disableSpacing>
            <IconButton className="course-card-icon-button" aria-label="add to favorites">
              <FavoriteIcon className="course-card-icon"/>
            </IconButton>
            <IconButton className="course-card-icon-button" aria-label="share">
              <ShareIcon className="course-card-icon"/>
            </IconButton>
          </CardActions>
        </Card>
      </Fade>
    );
  }
}
