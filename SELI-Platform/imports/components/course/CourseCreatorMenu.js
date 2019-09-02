import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function CourseCreatorMenu(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={props.menuTab}
      onChange={(event, newValue) => {
        props.setMenuTab(newValue);
      }}
      showLabels
      className="course-creator-menu-container"
    >
      <BottomNavigationAction className="course-creator-tab" label="Content" icon={<AppsIcon />} />
      <BottomNavigationAction className="course-creator-tab" label="Organization" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
