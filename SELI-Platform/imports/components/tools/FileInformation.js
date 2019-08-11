import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CollectionsIcon from '@material-ui/icons/Collections';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function FileInformation(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Card className="file-information-card">
          <CardHeader
            className="file-information-card-header"
            avatar={
              <div>
                {
                  props.type === 'image' ?
                    <Avatar className="image-avatar" aria-label="information">
                      <CollectionsIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.type === 'video' ?
                    <Avatar className="video-avatar" aria-label="information">
                      <VideoLibraryIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.type === 'audio' ?
                    <Avatar className="audio-avatar" aria-label="information">
                      <LibraryMusicIcon/>
                    </Avatar>
                  :
                  undefined
                }
              </div>
            }
            title={props.type.toUpperCase() + " INFORMATION"}
            subheader={"File name: " + props.file.name}
          />
          <CardContent className="file-information-card-content">
            <Typography variant="body1" color="textSecondary" component="p">
              {"Date added: " + props.file.meta.dateAdded.toDateString()}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {"Used in a course: "} {props.file.meta.isUsedInCourse ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {"Size: " + bytesToSize(props.file.size)}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {"Extension: " + props.file.extension}
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
