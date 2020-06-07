import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const defaultHeadCellStyles = theme => ({
  root: {},
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
  },
  tooltip: {
    cursor: 'pointer',
  },
  mypopper: {
    '&[data-x-out-of-boundaries]': {
      display: 'none',
    },
  },
  data: {
    display: 'inline-block',
  },
  sortAction: {
    display: 'flex',
    verticalAlign: 'top',
    cursor: 'pointer',
  },
  sortLabelRoot: {
    height: '10px',
  },
  sortActive: {
    color: theme.palette.text.primary,
  },
  toolButton: {
    display: 'flex',
    outline: 'none',
    cursor: 'pointer',
  },

});

class TableHeadCell extends React.Component {

  render() {
    const { children, classes, sortDirection, sort, column, orderBy } = this.props;
    // console.log(this.props);
    return (
      <TableCell scope={'col'}>
        {sort ? (
          <Tooltip title="sort">
            <TableSortLabel
              active={orderBy === column.name}
              direction={sortDirection}
              onClick={() => this.props.sortAction(column.name, sortDirection, orderBy === column.name)}
            >
              {column.label}
            </TableSortLabel>
          </Tooltip>
        ) : (
            <div className={classes.sortAction}>
              {children}
            </div>
          )}

      </TableCell>
    );
  }
}

export default withStyles(defaultHeadCellStyles, { name: 'MUIDataTableHeadCell' })(TableHeadCell);
