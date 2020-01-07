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
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { GoPackage } from "react-icons/go";
import Tooltip from '@material-ui/core/Tooltip';

import FileInformation from './FileInformation';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';

export default class LibraryCompressed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  useFile(){
    this.props.getFileInformation(this.props.file);
  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.file._id, function (err) {
      if (err) {
        this.props.showControlMessage(this.props.language.errorDeleting);
        return;
      }
    });
    this.props.showControlMessage(this.props.language.fileDeletedS);
  }

  addToFavorites(){
    let meta = this.props.file.meta;
    meta.isFavorite = !meta.isFavorite;
    CourseFilesCollection.update(
      { _id: this.props.file._id },
      { $set:
        {
          meta: meta,
        }
      }
    );
  }

  render() {
    return(
      <Card className="file-card">
        <CardMedia
          title={this.props.file.name}
          className="card-media-pdf"
          onClick={() => this.useFile()}
        >
          <GoPackage id="library-compressed-icon" className="library-file-icon"/>
          <div onClick={() => this.useFile()} className="card-media-pdf-text">{this.props.file.name}</div>
        </CardMedia>
        <CardActions className="card-actions-bottom-container" disableSpacing>
          <Tooltip title={this.props.language.addToFavorites}>
            <IconButton color={this.props.file.meta.isFavorite ? `primary` : undefined} className="card-button" onClick={() => this.addToFavorites()} aria-label="add to favorites">
              <FavoriteIcon className="card-icon"/>
            </IconButton>
          </Tooltip>
          <Tooltip title={this.props.language.deleteFile}>
            <IconButton className="card-button" onClick={() => this.delete()} aria-label="delete">
              <DeleteIcon className="card-icon"/>
            </IconButton>
          </Tooltip>
          <FileInformation type={this.props.file.type} file={this.props.file} language={this.props.language}/>
        </CardActions>
      </Card>
      );
    }
  }
