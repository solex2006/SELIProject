import React, { useState, useEffect  } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RemoveIcon from '@material-ui/icons/Remove';


export default function SubunitCourseNavigation(props) {
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  const selectSubunit= (index, parentIndex)=> {
    props.navigateTo("subunit", [index, parentIndex]);
    if (props.closeDrawer){
      props.closeDrawer();
    }
  }

  const clickKey = (event,index)=> {
    console.log("evento", event.key)
    if(event.key==="Enter"){
      if (props.navigate===true) { 
        selectSubunit(index, props.index) 
      }
    } 
  };

  const handleToggle = (value,index) => () => {
    if (props.navigate===true) { 
      selectSubunit(index, props.index) 
    } 
  };


  return(
    <div>
      <ListItem selected={props.index === props.selected[1] && props.navigate} onClick={props.navigate ? handleClick : undefined} className="course-navigation-list-item" button>
        <ListItemIcon className="course-navigation-list-item-icon">
          <ArrowRightIcon className="course-navigation-list-icon"/>
        </ListItemIcon>
        <ListItemText
          className="course-navigation-list-item-text"
          primary={`${props.unitLabel} ${props.index + 1}: ${props.unit.name}`}
        />
        <div>
          {
            props.navigate ?
              open ? <ExpandLess /> : <ExpandMore />
            :
            undefined
          }
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.unit.lessons.map((lesson, index) => {
          return(
              <List onClick={handleToggle(lesson,index)} onKeyDown={(e) => {clickKey(e, index)}} tabIndex="0" dense className="course-navigation-sublist" key={Math.random()} role={undefined}>
                <ListItem   onselected={index === props.selected[0] && props.index === props.selected[1] && props.navigate} className="course-navigation-sublist-item" button>
                  <ListItemIcon className="course-navigation-sublist-item-icon">
                    <RemoveIcon className="course-navigation-sublist-icon"/>
                  </ListItemIcon>
                  <ListItemText
                    className="course-navigation-sublist-item-text"
                    primary={`${props.lessonLabel} ${index + 1}: ${lesson.name}`}
                  />
                </ListItem>
              </List>
           
          )
        })}
      </Collapse>
    </div>
  )
}
