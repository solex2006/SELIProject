import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    color: 'var(--white)',
    backgroundColor: 'var(--app-bar-color)'
  },
  menu: {
    width: 'auto',
    color: 'var(--black)',
    backgroundColor: '#B7BDC2',
    padding: '0 1vw' ,
   transition: '0.5s' ,
  }
}));

export default function SimpleMenu(props) {
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

  const handleMenuItemClick = (index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.setLanguage(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button id="language-selector-button" onClick={handleClickListItem}  aria-controls="simple-menu" aria-haspopup="true">
        {labels[props.language.languageIndex]}
        
      </Button>
      <Menu
        className="Menu-mainp"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
         <MenuItem
            className={classes.menu}
            disableGutters={false}
            key='English (US)'
            selected={0 === selectedIndex}
            onClick={event => handleMenuItemClick( 0, 'English (US)')}   
          >
            {languages[0]}
          </MenuItem>
          <MenuItem
            className={classes.menu}
            disableGutters={false}
            key='Spanish (ES)'
            selected={1 === selectedIndex}
            onClick={event => handleMenuItemClick( 1, 'Spanish (ES)')}    
          >
            {languages[1]}
          </MenuItem>
          <MenuItem
            className={classes.menu}
            disableGutters={false}
            key='Portuguese (PT)'
            selected={2 === selectedIndex}
            onClick={event => handleMenuItemClick( 2, 'Portuguese (PT)')}    
          >
            {languages[2]}
          </MenuItem>
          {/* <MenuItem
            className={classes.menu}
            key='Polish (PL)'
            selected={3 === selectedIndex}
            onClick={event => handleMenuItemClick( 3, 'Polish (PL)')}    
          >
            {languages[3]}
          </MenuItem> */}
          <MenuItem
            className={classes.menu}
            key='Turkish (TR)'
            selected={4 === selectedIndex}
            onClick={event => handleMenuItemClick( 4, 'Turkish (TR)')}    
          >
            {languages[4]}
          </MenuItem>
      </Menu>
    </div>
  );
}


{/* <Menu
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
    onClick={event => handleMenuItemClick( index, option)}
    disabled={option !== 'English (US)' && option !== 'Spanish (ES)' && option !== 'Portuguese (PT)' && option !== 'Turkish (TR)'}
  >
    {languages[index]}
  </MenuItem>
))}
</Menu> */}