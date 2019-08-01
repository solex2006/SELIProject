import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function Unit(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} placement="bottom" title={props.unit.name}>
        <div id={"Unit " + props.unit.ordinal} onClick={handleClick} className="course-creator-unit-container">
          {"Unit " + props.unit.ordinal}
        </div>
      </Tooltip>
      <Popover
        id={"Unit " + props.unit.ordinal}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper >
          <MenuList>
            <MenuItem className="menu-item-buttons-container">
              <Button style={{marginRight: "0.5vw"}} color="primary">
                New lesson
              </Button>
              <Button color="primary" size={"1.2em"}>
                <MdEdit/>
              </Button>
              <Button color="primary">
                <MdDelete/>
              </Button>
            </MenuItem>
            <Divider/>
            {
              props.unit.lessons.map(lesson => {
                return(
                  <MenuItem className="course-creator-unit-lesson-item-container">
                    <p className="course-creator-unit-lesson-item-text">{"Lesson " + lesson.ordinal + " - " + lesson.name}</p>
                    <Button color="secondary">
                      <MdDelete/>
                    </Button>
                  </MenuItem>
                )
              })
            }
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}
