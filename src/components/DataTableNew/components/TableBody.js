import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MuiTableBody from '@material-ui/core/TableBody';
import TableBodyCell from './TableBodyCell';
import TableBodyRow from './TableBodyRow';
import TableSelectCell from './TableSelectCell';
import { withStyles } from '@material-ui/core/styles';

const defaultBodyStyles = {
  root: {},
  emptyTitle: {
    textAlign: 'center',
  },
};

class TableBody extends React.Component {


  handleRowSelect(data) {
    this.props.selectRowUpdate('row', data);
  };

  handleRowClick = (row, data, event) => {

  };

  buildData(data, columns) {

    var dataTable = [];
    let keysData = Object.keys(data);
    if (keysData.length > 0 && columns.length > 0) {
      for (let c = 0; c < columns.length; c++) {
        for (let d = 0; d < keysData.length; d++) {
          if (columns[c].name.toString() === keysData[d].toString()) {
            dataTable.push(data[keysData[d]]);
          }
        }
      }
    }
    return dataTable;
  }

  render() {
    const { columns, data, classes } = this.props;
    const tableRows = data.length ? data : null;
    const visibleColCnt = columns.length; 

    return (
      <MuiTableBody>
        {tableRows && tableRows.length > 0 ? (
          tableRows.map((row) => {
            return (
              <React.Fragment key={row._id}>
                <TableBodyRow
                  rowSelected={row.isSelected}
                >
                  <TableSelectCell
                    onChange={() => this.handleRowSelect(row)}
                    checked={row.isSelected}
                  />
                  {this.buildData(row.data, columns).map((item, index) => {
                    return <TableBodyCell
                      key={index}>
                      {item}
                    </TableBodyCell>
                  })}
                </TableBodyRow>
              </React.Fragment>
            );
          })
        ) : (
            <TableBodyRow >
              <TableBodyCell
                colSpan={visibleColCnt + 1}
              >
                <Typography variant="subtitle1" className={classes.emptyTitle}>
                  No Data
                  </Typography>
              </TableBodyCell>
            </TableBodyRow>

          )}
      </MuiTableBody>
    );
  }
}

export default withStyles(defaultBodyStyles, { name: 'MUIDataTableBody' })(TableBody);
