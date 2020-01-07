import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SettingsIcon from '@material-ui/icons/Settings';
import CameraIcon from '@material-ui/icons/Camera';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MenuItem(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [select, setSelect] = React.useState();

  const handleToggle = index => () => {
    props.setOption(index)
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function getAudiences() {
    let audiences = "";
    let audiencesCounter = 0;
    for (var i = 1; i < props.options.length; i++) {
      if (props.options[i].selected) {
        audiencesCounter > 0 ? audiences = audiences + props.options[i].label.toLowerCase() : audiences = audiences + props.options[i].label;
        audiencesCounter++;
        if (i !== props.options.length) {
          audiences = audiences + ", "
        }
      }
    }
    if (audiencesCounter === 1) {
      audiences = audiences + props.language.audience;
    }
    else if (audiencesCounter > 1){
      audiences = audiences + props.language.audiences;
    }
    else {
      audiences = props.language.noAudienceSelected
    }
    return audiences;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <List className="list-menu-container" component="nav" aria-label={props.language.adienceMenu}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClick}
          className="list-button-menu"
        >
          <ListItemIcon className="list-menu-icon">
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText
            className="list-button-menu-text"
            primary={props.language.accessibilityCheck}
            secondary={props.options[0].selected ? props.language.allAudiencesSelected : getAudiences()}
          />
        </ListItem>
      </List>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" className="list-subheader">
              {props.language.audience.toUpperCase()}
            </ListSubheader>
          }
          className="menu-list-options-container"
        >
          <Divider light={false}/>
          <div style={{height: "2.5vh"}}></div>
          {props.options.map((option, index) => {
            return(
              <ListItem className="list-menu-item" onClick={handleToggle(index)} button>
                <ListItemText primary={option.label} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={option.selected}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Popover>
    </div>
  );
}
