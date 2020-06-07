import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const defaultBodyCellStyles = theme => ({
  root: {},
  cellHide: {
    display: 'none',
  },
  cellStacked: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      fontSize: '16px',
      height: '24px',
      width: 'calc(50% - 80px)',
      whiteSpace: 'nowrap',
    },
  },
  responsiveStacked: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      fontSize: '16px',
      width: 'calc(50% - 80px)',
      whiteSpace: 'nowrap',
      height: '24px',
    },
  },
});

class TableBodyCell extends React.Component {

  render() {
    const {
      children,
      colSpan
    } = this.props;

    return (
      <TableCell colSpan={colSpan ? colSpan : null}>
        {children}
      </TableCell>
    );
  }
}

export default withStyles(defaultBodyCellStyles, { name: 'MUIDataTableBodyCell' })(TableBodyCell);
