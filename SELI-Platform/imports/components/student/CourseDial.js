import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SchoolIcon from '@material-ui/icons/School';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChatIcon from '@material-ui/icons/Chat';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function SpeedDialTooltipOpen(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };

  const toggleOpen = () => {
    setOpen(!open);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const actions = [
    { icon: <ArrowBackIcon />, name: props.language.returnToCourse, action: () => {props.showComponent('course'); handleClose()}},
    { icon: <CloseIcon />, name: props.language.closeCourse, action: () => props.closeCourse()},
    { icon: <ViewListIcon />, name: props.language.myCourses, action: () => {props.showComponent('subscribed'); handleClose()}},
    { icon: <ChatIcon />, name: props.language.openCourseChat, action: () =>  toggleOpen()},
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      className='course-dial'
      icon={!open ? <SchoolIcon className="course-dial-icon" /> : <CloseIcon className="course-dial-icon" />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      onClick={toggleOpen}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen={false}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
