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
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function UserMenu(props) {
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

  function handleAccountManagement() {
    props.showComponent('account');
    closeDrawer();
  }

  const sideList = side => (
    <div
      className="user-menu-side-container"
      role="presentation"
    >
      <div className="user-menu-options-container">
        <div className="user-menu-profile-container">
          {
            props.user.profile.profileImage !== undefined ?
              <Avatar
                className="user-menu-profile-avatar"
                alt={props.user.username}
                src={props.user.profile.profileImage.link}
              />
            :
            <Avatar
              className="user-menu-profile-avatar"
              alt={props.user.username}
              src='user.svg'
            />
          }
          <p className="user-menu-profile-type">{props.language[props.user.profile.type]}</p>
          <p className="user-menu-profile-username">{props.user.username}</p>
        </div>
        <Divider className="user-menu-profile-divider" light={true}/>
        <p onClick={() => handleAccountManagement()} className="user-menu-option">
          {props.language.accountManagement}
        </p>
        <Button onClick={() => {props.logOut(); toggleDrawer(side, false)}} color="primary" fullWidth variant="outlined" className="user-menu-option-button">
          {props.language.logOut}
        </Button>
      </div>
    </div>
  );

  const fullList = side => (
    <div
      className="user-menu-side-container"
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

    </div>
  );

  return (
    <div>
      <div onClick={toggleDrawer('right', true)} className="user-menu-container">
        {
          props.user.profile.profileImage !== undefined ?
            <Avatar
              className="user-menu-button-avatar"
              alt={props.user.username}
              src={props.user.profile.profileImage.link}
            />
          :
          <Avatar
            className="user-menu-button-avatar"
            alt={props.user.username}
            src='user.svg'
          />
        }
        <p className="user-menu-username">{props.user.username}</p>
        {/* <Badge className="user-menu-badge" overlap="circle" badgeContent={5} color="primary">
          <MailIcon className="user-menu-badge-icon" />
        </Badge> */}
      </div>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}
