import React from 'react';
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
import CheckboxIcon from '@material-ui/icons/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import FileInformation from './FileInformation';

export default class LibraryVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    }
  }

  componentDidMount(){

  }

  useImage(){
    this.props.pickFile(this.props.file);
  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.file._id, function (err) {
      if (err) {
        this.props.showControlMessage('There was an error deleting the file, try again later');
        return;
      }
    });
    this.props.showControlMessage('File deleted successfully');
    this.props.resetInputButton();
  }

  addToFavorites(){
    console.log('fav');
  }

  play(){
    document.getElementById(this.props.file._id).play();
    this.setState({
      playing: true,
    });
  }

  pause(){
    document.getElementById(this.props.file._id).pause();
    this.setState({
      playing: false,
    });
  }

  render() {
    return(
      <Card className="image-card">
        <CardMedia
          component="video"
          src={this.props.file.link}
          title={this.props.file.name}
          className="card-media-image"
          onClick={() => this.useImage()}
          id={this.props.file._id}
        />
        <CardActions className="card-actions-bottom-container" disableSpacing>
          {
            this.state.playing ?
              <IconButton onClick={() => this.pause()} aria-label="add to favorites">
                <PauseIcon />
              </IconButton>
            :
            <IconButton onClick={() => this.play()} aria-label="add to favorites">
              <PlayArrowIcon />
            </IconButton>
          }
          <IconButton onClick={() => this.addToFavorites()} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={() => this.delete()} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <FileInformation type={this.props.type} file={this.props.file}/>
        </CardActions>
      </Card>
      );
    }
  }
