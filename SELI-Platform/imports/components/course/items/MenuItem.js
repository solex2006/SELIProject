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
  const [openList, setOpenList] = React.useState(true);

  function handleDecorative() {
    props.handleDecorative(props.item.id);
  }

  function handleClickList() {
    setOpenList(!openList);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function removeItem() {
    handleClose();
    props.removeItem(props.item);
  }

  function editItem() {
    handleClose();
    props.editItem(props.item);
  }

  editAccessibility = () => {
    handleClose();
    props.editAccessibilityForm(props.item);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="item-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="menu-item-icon-button"
        size="small"
        color={open ? "primary" : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" className="list-subheader">
              {props.language[props.item.type].toUpperCase()}
            </ListSubheader>
          }
          className="menu-item-list"
        >
          <Divider light={false}/>
          <ListItem button onClick={removeItem}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={props.language.delete} />
          </ListItem>
          <ListItem button onClick={editItem}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={props.language.edit} />
          </ListItem>
          {
            props.item.type === "audio" || props.item.type === "image" || props.item.type === "video" ?
              <React.Fragment>
                <ListItem button onClick={handleClickList}>
                  <ListItemIcon>
                    <AccessibilityNewIcon />
                  </ListItemIcon>
                  <ListItemText primary={props.language.accessibility} />
                  {openList ? <ExpandLess style={{animation: "fadeIn 0.25s"}}/> : <ExpandMore style={{animation: "fadeIn 0.25s"}}/>}
                </ListItem>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem disabled={true} button className={classes.nested}>
                      <ListItemIcon>
                        <BuildIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.autoRepair} />
                    </ListItem>
                    <ListItem onClick={() => handleDecorative()} button className={classes.nested}>
                      <ListItemIcon>
                        <CameraIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.decorative} />
                    </ListItem>
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onClick={() => handleDecorative()}
                        checked={props.item.attributes.accessibility.pureDecorative}
                      />
                    </ListItemSecondaryAction>
                    <Divider light={true}/>
                    <ListItem button onClick={() => this.editAccessibility()} className={classes.nested}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.settings} />
                    </ListItem>
                  </List>
                </Collapse>
              </React.Fragment>
            :
            undefined
          }
        </List>
      </Popover>
    </div>
  );
}
