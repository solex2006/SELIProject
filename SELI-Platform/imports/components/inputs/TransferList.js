import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function TransferList(props) {

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(props.items);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = items => (
    <MuiThemeProvider theme={theme}>
      <Paper className="left-list-container">
        <List className="transfer-list" dense component="div" role="list">
          {items.map(value => {
          const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem className="check-list-item" key={value} role="listitem" button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    </MuiThemeProvider>
      );

      return (
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  size="small"
                  color="primary"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  add all
                </Button>
                <Button
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  color="primary"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  remove all
                </Button>
              </Grid>
            </Grid>
            <Grid className="right-list-container" item>{customList(right)}</Grid>
          </Grid>
        </MuiThemeProvider>
  );
}
