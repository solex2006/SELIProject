import React, {useState, useEffect, useCallback} from 'react';
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

import { Disabilities } from '../../../lib/DisabilitiesCollection';

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
  const [lists, setLists] = React.useState([]);
  const listsFirst = Disabilities.find().fetch();

  useEffect(() => {
    let finalLists = [];
    listsFirst.map((option) => {
      if (props.disabilitieOptions.find(element => element.name === option.name)){
        finalLists.push({label: option.name, selected: true})
      } else {
        finalLists.push({label: option.name, selected: false})
      }
    })
    if (finalLists.find(element => element.selected === false)){
      finalLists.unshift({label: props.language.allDisabilities, selected: false})
    } else {
      finalLists.unshift({label: props.language.allDisabilities, selected: true})
    }
    setLists(finalLists);
  }, [props.disabilitieOptions])

  const handleToggle = index => () => {
    let prevLists = lists;
    if (index === 0) {
      prevLists[index].selected ? prevLists.map(option => option.selected = false) : prevLists.map(option => option.selected = true)
    } else {
      prevLists[index].selected = !prevLists[index].selected;
      let allSelected = true;
      for (var i = 1; i < prevLists.length; i++) {
        if (!prevLists[i].selected) {
          allSelected = false;
        }
      }
      allSelected ? prevLists[0].selected = true : prevLists[0].selected = false;
    }
    let support = [];
    prevLists.map((option, index) => {
      if (option.selected && index > 0) {
        support.push(listsFirst[index-1])
      }
    })
    props.setOption(support);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function getDisabilities() {
    let disabilities = "";
    let disabilitiesCounter = 0;
    for (var i = 1; i < lists.length; i++) {
      if (lists[i].selected) {
        disabilities = disabilities + lists[i].label;
        disabilitiesCounter++;
        if (i !== lists.length) {
          disabilities = disabilities + "\n"
        }
      }
    }
    if (disabilitiesCounter === 0) {
      disabilities = props.language.noDisabilitieSelected
    }
    return disabilities;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {
        lists.length > 0 ?
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
                  secondary={lists[0].selected ? props.language.allDisabilitiesSelected : getDisabilities()}
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
                    {props.language.disabilities.toUpperCase()}
                  </ListSubheader>
                }
                className="menu-list-options-container"
              >
                <Divider light={false}/>
                <div style={{height: "2.5vh"}}></div>
                {lists.map((option, index) => {
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
        : undefined
      }
    </div>
  );
}
