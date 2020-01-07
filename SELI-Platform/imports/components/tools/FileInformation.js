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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from '@material-ui/core/Tooltip';

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
      <Tooltip title={props.language.fileInformation}>
        <IconButton className="card-button" onClick={handleClick} aria-label="settings">
          <MoreVertIcon className="card-icon"/>
        </IconButton>
      </Tooltip>
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
                  props.file.isImage ?
                    <Avatar className="image-avatar" aria-label="information">
                      <CollectionsIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.file.isVideo ?
                    <Avatar className="video-avatar" aria-label="information">
                      <VideoLibraryIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.file.isAudio ?
                    <Avatar className="audio-avatar" aria-label="information">
                      <LibraryMusicIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.file.isPDF ?
                    <Avatar className="pdf-avatar" aria-label="information">
                      <PictureAsPdfIcon/>
                    </Avatar>
                  :
                  undefined
                }
                {
                  props.file.isCompressed ?
                    <Avatar className="compressed-avatar" aria-label="information">
                      <ArchiveIcon/>
                    </Avatar>
                  :
                  undefined
                }
              </div>
            }
            title={props.language.information.toUpperCase()}
            subheader={`${props.language.fileName}: ${props.file.name}`}
          />
          <CardContent className="file-information-card-content">
            <Typography variant="body1" color="textSecondary" component="p">
              {`${props.language.dateAdded}: ${props.file.meta.dateAdded.toLocaleDateString('en-US')}`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`${props.language.usedInCourse}: `} {props.file.meta.isUsedInCourse ? props.language.yes : props.language.no}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`${props.language.size}: ${bytesToSize(props.file.size)}`}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {`${props.language.extension}: ${props.file.extension}`}
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
