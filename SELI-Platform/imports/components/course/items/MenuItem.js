import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
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
import SettingsIcon from '@material-ui/icons/Settings';
import CameraIcon from '@material-ui/icons/Camera';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default function MenuItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openList, setOpenList] = React.useState(false);

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
             props.item.type === "pdf" || props.item.type === "audio" || props.item.type === "image" || props.item.type === "video" ||props.item.type === "quiz" ?
              <div className="menu-content-accessibility">
                <Divider light={true}/>
                <ListItem button onClick={handleClickList}>
                  <ListItemIcon>
                    <AccessibilityNewIcon />
                  </ListItemIcon>
                  <ListItemText primary={props.language.accessibility} />
                  {openList ? <ExpandLess style={{animation: "fadeIn 0.25s"}}/> : <ExpandMore style={{animation: "fadeIn 0.25s"}}/>}
                </ListItem>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* <ListItem disabled={true} button className="menu-content-accessibility-item">
                      <ListItemIcon>
                        <BuildIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.autoRepair} />
                    </ListItem> */}
                    {/* <ListItem onClick={() => handleDecorative()} button className="menu-content-accessibility-item">
                      <ListItemIcon>
                        <CameraIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.decorative} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onClick={() => handleDecorative()}
                          checked={props.item.attributes.accessibility.pureDecorative}
                        />
                      </ListItemSecondaryAction>
                    </ListItem> */}
                    <ListItem button onClick={() => this.editAccessibility()} className="menu-content-accessibility-item">
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={props.language.settings} />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            :
            undefined
          }
        </List>
      </Popover>
    </div>
  );
}
