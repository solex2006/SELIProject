import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../style/theme';

function createCourseData(title, courseDuration, numberOfUnits, category, tutor, id) {
  return { title, courseDuration, numberOfUnits, category, tutor, id };
}

function createModalityData(name, description, additionDate, id) {
  return { name, description, additionDate, id };
}

function createMethodologyData(name, description, additionDate, id) {
  return { name, description, additionDate, id };
}

function createCategoryData(name, description, additionDate, id) {
  return { name, description, additionDate, id };
}

function createRequirementData(name, description, additionDate, category, id) {
  return { name, description, additionDate, category, id };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (

    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all courses' }}
          />
        </TableCell>
        {props.headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'right'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.string.isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    const useToolbarStyles = makeStyles(theme => ({
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
      theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
      spacer: {
        flex: '1 1 100%',
      },
      actions: {
        color: theme.palette.text.secondary,
      },
      title: {
        flex: '0 0 auto',
      },
    }));

    const EnhancedTableToolbar = props => {
      const classes = useToolbarStyles();
      const { numSelected } = props;

      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle">
                {props.tableToolbarHeader}
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => props.deleteFunction(props.selected)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <div className="table-tools-container">
                <Button onClick={() => props.add()} className="add-table-button" color="primary">
                  {props.addLabel}
                </Button>
                <Tooltip title="Filter list">
                  <IconButton aria-label="Filter list">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </Toolbar>
        );
      };

      EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
      };

      const useStyles = makeStyles(theme => ({
        root: {
          width: '100%',
          marginTop: theme.spacing(3),
        },
        paper: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 500,
        },
        tableWrapper: {
          overflowX: 'auto',
        },
      }));

      export default function EnhancedTable(props) {
        const classes = useStyles();
        const [order, setOrder] = React.useState('asc');
        const [orderBy, setOrderBy] = React.useState('courseDuration');
        const [selected, setSelected] = React.useState([]);
        const [page, setPage] = React.useState(0);
        const [dense, setDense] = React.useState(false);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        const headRows = props.headRows;

        let rows = [];

        buildData();

        function buildData(){
          let data = [];
          if(props.type === 'course'){
            for (var i = 0; i < props.courses.length; i++) {
              data.push(createCourseData(props.courses[i].course.title, props.courses[i].course.time, props.courses[i].course.units.length, props.courses[i].course.category.label, props.courses[i].course.tutor.name, props.courses[i]._id));
            }
          }
          if(props.type === 'modality'){
            for (var i = 0; i < props.modalities.length; i++) {
              data.push(createModalityData(props.modalities[i].name, props.modalities[i].description, props.modalities[i].additionDate.toDateString(), props.modalities[i]._id));
            }
          }
          if(props.type === 'methodology'){
            for (var i = 0; i < props.methodologies.length; i++) {
              data.push(createMethodologyData(props.methodologies[i].name, props.methodologies[i].description, props.methodologies[i].additionDate.toDateString(), props.methodologies[i]._id));
            }
          }
          if(props.type === 'category'){
            for (var i = 0; i < props.categories.length; i++) {
              data.push(createCategoryData(props.categories[i].name, props.categories[i].description, props.categories[i].additionDate.toDateString(), props.categories[i]._id));
            }
          }
          if(props.type === 'requirement'){
            for (var i = 0; i < props.requirements.length; i++) {
              data.push(createRequirementData(props.requirements[i].name, props.requirements[i].description, props.requirements[i].additionDate.toDateString(), props.requirements[i].category.name, props.requirements[i]._id));
            }
          }
          rows = data;
        }

        function handleRequestSort(event, property) {
          const isDesc = orderBy === property && order === 'desc';
          setOrder(isDesc ? 'asc' : 'desc');
          setOrderBy(property);
        }

        function handleSelectAllClick(event) {
          if (event.target.checked) {
            const newSelecteds = rows.map(n => n.id);
            setSelected(newSelecteds);
            return;
          }
          setSelected([]);
        }

        function handleClick(event, id) {
          const selectedIndex = selected.indexOf(id);
          let newSelected = [];

          if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
          } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
          } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
          } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1),
            );
          }

          setSelected(newSelected);
        }

        function handleChangePage(event, newPage) {
          setPage(newPage);
        }

        function handleChangeRowsPerPage(event) {
          setRowsPerPage(+event.target.value);
        }

        function handleChangeDense(event) {
          setDense(event.target.checked);
        }

        const isSelected = id => selected.indexOf(id) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  selected={selected}
                  deleteFunction={props.deleteFunction.bind(this)}
                  tableToolbarHeader={props.tableToolbarHeader}
                  addLabel={props.addLabel}
                  add={props.add.bind(this)}
                />
                <div className={classes.tableWrapper}>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                      headRows={headRows}
                    />
                    {
                      props.type === 'course' ?
                        <TableBody>
                          {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={event => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.title}
                                  </TableCell>
                                  <TableCell align="right">{row.courseDuration}</TableCell>
                                  <TableCell align="right">{row.numberOfUnits}</TableCell>
                                  <TableCell align="right">{row.category}</TableCell>
                                  <TableCell align="right">{row.tutor}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      :
                      undefined
                    }
                    {
                      props.type === 'modality' ?
                        <TableBody>
                          {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={event => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.description}</TableCell>
                                  <TableCell align="right">{row.additionDate}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      :
                      undefined
                    }
                    {
                      props.type === 'category' ?
                        <TableBody>
                          {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={event => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.description}</TableCell>
                                  <TableCell align="right">{row.additionDate}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      :
                      undefined
                    }
                    {
                      props.type === 'methodology' ?
                        <TableBody>
                          {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={event => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.description}</TableCell>
                                  <TableCell align="right">{row.additionDate}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      :
                      undefined
                    }
                    {
                      props.type === 'requirement' ?
                        <TableBody>
                          {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={event => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.description}</TableCell>
                                  <TableCell align="right">{row.additionDate}</TableCell>
                                  <TableCell align="right">{row.category}</TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      :
                      undefined
                    }
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="No padding"
              />
            </div>
          </MuiThemeProvider>
              );
            }
