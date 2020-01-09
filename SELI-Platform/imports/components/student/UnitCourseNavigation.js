import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RemoveIcon from '@material-ui/icons/Remove';

export default function UnitCourseNavigation(props) {

  function selectUnit(index) {
    props.navigateTo("unit", [index]);
    props.closeDrawer();
  }

  return(
    <div>
      <ListItem selected={props.index === props.selected[0] && props.navigate} onClick={props.navigate ? () => selectUnit(props.index) : undefined} className="course-navigation-list-item" button>
        <ListItemIcon className="course-navigation-list-item-icon">
          <ArrowRightIcon className="course-navigation-list-icon"/>
        </ListItemIcon>
        <ListItemText
          className="course-navigation-list-item-text"
          primary={`${props.topicLabel} ${props.index + 1}: ${props.unit.name}`}
        />
      </ListItem>
    </div>
  )
}
