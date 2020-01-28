import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function ItemFeedBack(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const a11yCOLOR = {
    none : '#ef5350',
		fail : '#ff9800',
		poor: '#ffc107',
		average: '#fbc02d',
		good: '#9ccc65',
		valid: '#66bb6a',
	};

  let color = '';
  let text = '';

  if (props.accessibility.percentage === 0){
    color = a11yCOLOR.none;
    text = props.language.feedback_a11y_accessibility_no;
  }

  else if (props.accessibility.percentage < 20){
    color = a11yCOLOR.fail;
    text = props.language.feedback_a11y_accessibility_no;
  }
  else if (props.accessibility.percentage < 40 ){
    color = a11yCOLOR.poor;
    text = props.language.feedback_a11y_accessibility_poor;
  }
  else if (props.accessibility.percentage < 60 ){
    color = a11yCOLOR.average;
    text = props.language.feedback_a11y_accessibility_average;
  }
  else if (props.accessibility.percentage < 80 ){
    color = a11yCOLOR.good;
    text = props.language.feedback_a11y_accessibility_good;
  }
  else{
    color = a11yCOLOR.valid;
    text = props.language.feedback_a11y_accessibility_excelent;
  }

  if (props.accessibility.pureDecorative) {
    color = a11yCOLOR.valid;
    text = props.language.feedback_a11y_accessibility_pure_decorative;
  }

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Fab
        size='small'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="item-accessibility-feedback-fab"
        style={{backgroundColor: color}}
      >
        <AccessibilityNewIcon className="accessibility-feedback-color-icon"/>
      </Fab>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="accessibility-feedback-label" style={{color: "#FFF", backgroundColor: color}}>
          <InfoIcon style={{margin: "0 0.5vw"}}/>
          {text}
        </div>
      </Popover>
    </div>
  );
}
