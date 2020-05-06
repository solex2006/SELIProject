import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';
import Clock from 'react-live-clock';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import CourseNavigation from './CourseNavigation';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function CourseMenu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function closeDrawer() {
    setState({ ...state, right: false });
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  function showPresentation() {
    props.showPresentation();
    closeDrawer();
  }

  function showCourseStories() {
    props.showCourseStories();
    closeDrawer();
  }

  function handleView() {
    props.handleView({}, "");
    closeDrawer();
  }

  const sideList = side => (
    <div
      className="course-menu-options-container"
      role="presentation"
    >
      <div className="course-menu-header">
        <div className="course-menu-left-icon-container">
          <IconButton className="course-menu-button" onClick={toggleDrawer('right', false)}>
            <CloseIcon className="white-button" fontSize="default"/>
          </IconButton>
        </div>
        <p className="course-menu-title">{props.language.seliCourses}</p>
        <div className="course-menu-subtitle-container">{new Date().toLocaleDateString('en-US')} <Clock className="menu-clock" format={'HH:mm:ss'} ticking={true}/></div>
        <div className="course-menu-progress-container">
          <div className="course-menu-progress-bar">
            <LinearProgress className="course-menu-linear-progress" color="primary" variant="buffer" value={props.progress} valueBuffer={100} />
          </div>
          <Paper
            elevation={12}
            className="course-menu-image-container"
            style={{backgroundImage: `url(${props.course.image.link})`}}
            onClick={() => {props.handleView ? handleView() : showPresentation()}}
          />
        </div>
      </div>
      <div className="course-menu-subheader">
        <p className="course-menu-subheader-title">{`${props.language.course}: ${props.course.title}`}</p>
        <p className="course-menu-subheader-subtitle">{`${props.language.completed}: ${props.progress}%`}</p>
      </div>
      <div className="course-menu-navigation-container">
        <CourseNavigation
          program={props.course.program}
          organization={props.course.organization}
          navigate={true}
          selected={props.selected}
          navigateTo={props.navigateTo.bind(this)}
          closeDrawer={closeDrawer.bind(this)}
          courseNav={props.language.courseNavigation}
          topic={props.language.topic}
          unit={props.language.unit}
          lesson={props.language.lesson}
        />
      </div>
      <Button onClick={() => showCourseStories()} className="course-menu-stories-button">{props.language.courseStories}</Button>
    </div>
  );

  const fullList = side => (
    <div
      className="course-menu-options-container"
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

    </div>
  );

  return (
    <div>
      <div className="course-menu-button-container">
        <IconButton className="course-menu-button" onClick={toggleDrawer('right', true)}>
          <AppsIcon fontSize="large"/>
        </IconButton>
      </div>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}
