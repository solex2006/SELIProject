import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
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
