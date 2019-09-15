import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import Clock from 'react-live-clock';
import SchoolIcon from '@material-ui/icons/School';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import Badge from '@material-ui/core/Badge';
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
        <p className="course-menu-title">SELI Courses</p>
        <div className="course-menu-subtitle-container">{new Date().toDateString()} <Clock className="menu-clock" format={'HH:mm:ss'} ticking={true}/></div>
        <div className="course-menu-progress-container">
          <div className="course-menu-progress-bar">
            <LinearProgress className="course-menu-linear-progress" color="primary" variant="buffer" value={10} valueBuffer={95} />
          </div>
          <Paper
            elevation={12}
            className="course-menu-image-container"
            style={{backgroundImage: `url(${props.course.image.link})`}}
            onClick={() => {showPresentation()}}
          />
        </div>
      </div>
      <div className="course-menu-subheader">
        <p className="course-menu-subheader-title">{`Course: ${props.course.title}`}</p>
        <p className="course-menu-subheader-subtitle">Completed: 10%</p>
      </div>
      <div className="course-menu-navigation-container">
        <CourseNavigation
          program={props.course.program}
          organization={props.course.organization}
          navigate={true}
          selected={props.selected}
          navigateTo={props.navigateTo.bind(this)}
          closeDrawer={closeDrawer.bind(this)}
        />
      </div>
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
