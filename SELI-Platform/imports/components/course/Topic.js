import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 220,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Unit(props) {
  const classes = useStyles();

  return(
    <div className="course-creator-unit-container">
      <ListItem className="course-creator-unit-list-item" button>
        <ListItemText className="course-creator-unit-list-text" primary={props.topic.name} secondary={'Topic N ' + (parseInt(props.index) + parseInt(1))}/>
        <IconButton onClick={() => props.setUnitToEdit(props.index, props.topic.name)} className="course-creator-lesson-list-button" edge="end" aria-label="delete">
          <EditIcon className="course-creator-lesson-list-icon" fontSize="small"/>
        </IconButton>
        <IconButton onClick={() => props.deleteUnit(props.index)} className="course-creator-lesson-list-button" edge="end" aria-label="delete">
          <DeleteIcon className="course-creator-lesson-list-icon" fontSize="small"/>
        </IconButton>
      </ListItem>
    </div>
  );
}
