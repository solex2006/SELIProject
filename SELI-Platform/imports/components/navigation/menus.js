import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
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

  const handleMenuItemClick = (index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.setLanguage(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id="language-selector-button" onClick={handleClickListItem}  aria-controls="simple-menu" aria-haspopup="true">
        {labels[props.language.languageIndex]}
        
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem
            className="language-selector-menu-item"
            key='English (US)'
            selected={0 === selectedIndex}
            onClick={event => handleMenuItemClick( 0, 'English (US)')}
            
          >
            {languages[0]}
          </MenuItem>

          <MenuItem
            className="language-selector-menu-item"
            key='Spanish (ES)'
            selected={1 === selectedIndex}
            onClick={event => handleMenuItemClick( 1, 'Spanish (ES)')}
            
          >
            {languages[1]}
          </MenuItem>
      </Menu>
    </div>
  );
}