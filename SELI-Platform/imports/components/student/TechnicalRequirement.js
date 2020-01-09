import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function TechnicalRequirement(props) {
  return (
    <div className="course-technical-requirement-container">
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit" className="course-technical-requirement-title">{props.description}</Typography>
            <p className="course-technical-requirement-description">{props.requirement.description}</p>
          </React.Fragment>
        }
      >
        <Button className="course-technical-requirement-button">{props.requirement.name}</Button>
      </HtmlTooltip>
    </div>
  );
}
