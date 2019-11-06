import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    color: 'var(--white)',
    backgroundColor: 'var(--app-bar-color)'
  },
}));

export default function LanguageSelector(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(Session.get('language').languageIndex);

  const labels = [
    `${props.language.language} (US)`,
    `${props.language.language} (ES)`,
    `${props.language.language} (PT)`,
    `${props.language.language} (PL)`,
    `${props.language.language} (TR)`,
  ];

  const options = [
    'English (US)',
    'Spanish (ES)',
    'Portuguese (PT)',
    'Polish (PL)',
    'Turkish (TR)'
  ];

  const languages = [
    `${props.language.english } (US)`,
    `${props.language.spanish } (ES)`,
    `${props.language.portuguese} (PT)`,
    `${props.language.polish} (PL)`,
    `${props.language.turkish } (TR)`,
  ];

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.setLanguage(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button id="language-selector-button" onClick={handleClickListItem}>
        {labels[props.language.languageIndex]}
        <ArrowDropDownIcon className="language-selector-icon"/>
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="language-selector-menu"
      >
        <p className="language-selector-title">{props.language.selectYourLanguage}</p>
        <Divider/>
        {options.map((option, index) => (
          <MenuItem
            className="language-selector-menu-item"
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index, option)}
            disabled={option !== 'English (US)' && option !== 'Portuguese (PT)'}
          >
            {languages[index]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
