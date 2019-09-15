import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

export default function Hint(props) {
  return (
    <div>
      <Tooltip  placement={props.placement} title={props.hint}>
        {props.node}
      </Tooltip>
    </div>
  );
}
