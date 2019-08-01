import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { MdStyle } from "react-icons/md";
import { MdViewQuilt } from "react-icons/md";

const useStyles = makeStyles({
  root: {

  },
});

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('content');

  function handleChange(event, newValue) {
    setValue(newValue);
    props.setMenu(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className="bottom-navigation-container">
      <BottomNavigationAction className="bottom-menu-option" label="Content" value="content" icon={<MdViewQuilt size="1.85em"/>} />
      <BottomNavigationAction className="bottom-menu-option" label="Style" value="style" icon={<MdStyle size="1.85em"/>} />
    </BottomNavigation>
  );
}
