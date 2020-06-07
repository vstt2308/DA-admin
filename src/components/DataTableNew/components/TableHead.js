import { withStyles } from '@material-ui/core/styles';
import MuiTableHead from '@material-ui/core/TableHead';
import classNames from 'classnames';
import React from 'react';
import { findDOMNode } from 'react-dom';
import TableHeadCell from './TableHeadCell';
import TableHeadRow from './TableHeadRow';
import TableSelectCell from './TableSelectCell';


class TableHead extends React.Component {


  handleRowSelect = () => {
    this.props.selectRowUpdate('head', null);
  };

  render() {
    const { columns, selectedRows, count, orderBy, sortAction } = this.props;
    const numSelected = (selectedRows && selectedRows.length) || 0;
    const isDeterminate = numSelected > 0 && numSelected < count;
    const isChecked = numSelected === count ? true : false;

    return (
      <MuiTableHead>
        <TableHeadRow>
          <TableSelectCell
            onChange={this.handleRowSelect.bind(null)}
            checked={isChecked}
            isHeaderCell={true}
            indeterminate={isDeterminate}
          />
          {columns.map(
            (column, index) => {
              return (
                <TableHeadCell
                  key={index}
                  type={'cell'}
                  sort={column.sort}
                  orderBy={orderBy}
                  sortDirection={column.sortDirection}
                  sortAction={sortAction}
                  column={column}>
                  {column.label}
                </TableHeadCell>)
            }
          )}
        </TableHeadRow>
      </MuiTableHead>
    );
  }
}

export default TableHead;
