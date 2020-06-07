import { withStyles } from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import React from 'react';
import TableBody from './components/TableBody';
import TableFilterList from './components/TableFilterList';
import TableHead from './components/TableHead';
import TableToolbar from './components/TableToolbar';
import TableToolbarSelect from './components/TableToolbarSelect';

const defaultTableStyles = theme => ({
  root: {},
  paper: {},
  tableRoot: {
    outline: 'none',
  },
  responsiveScroll: {
    overflowX: 'auto',
    overflow: 'auto',
    height: '100%',
    maxHeight: '499px',
  },
  responsiveScrollMaxHeight: {
    overflowX: 'auto',
    overflow: 'auto',
    height: '100%',
    maxHeight: '499px',
  },
  responsiveScrollFullHeight: {
    overflowX: 'auto',
    overflow: 'auto',
    height: '100%',
    maxHeight: 'none',
  },
  responsiveStacked: {
    overflowX: 'auto',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden',
      overflow: 'hidden',
    },
  },
  caption: {
    position: 'absolute',
    left: '-3000px',
  },
  liveAnnounce: {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
  },
  '@global': {
    '@media print': {
      '.datatables-noprint': {
        display: 'none',
      },
    },
  },
});



class MUIDataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      propsData: [],
      propsColumns: [],
      data: [],
      columns: [],
      selectedRows: [],
      orderBy: "",
    };

  }

  /*
   *  Build the source table data
   */

  //  column = {
  //    name: "name",
  //    lable: "lable",
  //    opition: {
  //      opition
  //    }
  //  }
  buildColumns = newColumns => {
    let columnData = [];

    newColumns.forEach((column) => {
      let columnOptions = {
        display: 'true',
        empty: false,
        sort: true,
        viewColumns: true,
        sortDirection: 'desc',
      };

      if (typeof column === 'object') {
        columnOptions = {
          name: column.name,
          label: column.label ? column.label : column.name,
          sortDirection: "desc",
          ...columnOptions,
          ...(column.options ? column.options : {}),
        };
      } else {
        columnOptions = { ...columnOptions, name: column, label: column };
      }

      columnData.push(columnOptions);

    });

    return columnData;
  };


  //set data for table to render rows
  setTableData(data, isSelected, type) {
    let dataTable = [];
    if (data.length) {
      if (type === "all") {
        dataTable = data.map(row => {
          return { ...row, isSelected: isSelected }
        })
      }
      else {
        dataTable = data.map(row => {
          let index = this.findItemInData(row, this.state.selectedRows) + 1;
          return { ...row, isSelected: index ? true : isSelected }
        })
      }
    }
    return dataTable;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.columns !== state.propsColumns || props.data !== state.propsData)
      return {
        ...state,
        propsColumns: props.columns,
        propsData: props.data
      }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      columns: this.buildColumns(this.props.columns),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        ...this.state,
        data: this.setTableData(this.props.data, false),
      })
    }
  }


  searchTextUpdate = text => {
  };


  selectRowDelete = () => {
    const { selectedRows, data, filterList } = this.state;

    console.log(selectedRows)
  };

  selectRowEdit = () => {
    const { selectedRows, data, filterList } = this.state;

    console.log(selectedRows)
  };

  findItemInData(iteam, data) {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (iteam._id.toString() === data[i]._id.toString()) {
        return i;
      }
    }
    return index;
  }

  findItemInColumns(item, columns) {
    let index = -1;
    for (let i = 0; i < columns.length; i++) {
      if (item.toString() === columns[i].name.toString()) {
        return i;
      }
    }
    return index;
  }

  selectRowUpdate = (type, row) => {
    if (type === 'head') {
      if (this.state.selectedRows.length > 0) {
        this.setState({
          ...this.state,
          selectedRows: [],
          data: this.setTableData(this.state.propsData, false, 'all')
        })
      }
      else if (this.state.selectedRows.length === 0) {
        this.setState({
          ...this.state,
          selectedRows: [...this.state.propsData],
          data: this.setTableData(this.state.propsData, true, 'all')
        })
      }
    }
    else if (type === 'row') {
      let indexData = this.findItemInData(row, this.state.data);
      let indexSelectedRows = this.findItemInData(row, this.state.selectedRows);
      let newData = [...this.state.data];
      let newSelectedRows = [...this.state.selectedRows];
      if (indexData !== -1) {
        newData[indexData] = { ...row, isSelected: !row.isSelected };
      }
      if (indexSelectedRows !== -1) {
        newSelectedRows = newSelectedRows.filter(item => item._id.toString() !== row._id.toString());
      } else newSelectedRows.push(row);
      this.setState({
        ...this.state,
        data: newData,
        selectedRows: newSelectedRows
      })
    }
  };

  sortTable = (col, order, active) => {
    let index = this.findItemInColumns(col, this.state.columns);
    if (index !== -1) {
      let newColumns = [...this.state.columns];
      newColumns[index] = { ...newColumns[index], sortDirection: this.changeSortDerection(order, active) }
      this.setState({
        ...this.state,
        orderBy: col,
        columns: newColumns
      });
      this.props.sort(col, this.changeSortDerection(order, active))
    }
  }

  changeSortDerection(sortDirection, active) {
    if (sortDirection === 'asc') {
      if (active) return 'desc';
      else return 'asc';
    }
    else {
      if (active) return 'asc';
      else return 'desc';
    }
  }




  render() {
    const { title } = this.props;
    const {
      data,
      columns,
      selectedRows,
      orderBy
    } = this.state;

    return (
      <React.Fragment>
        {selectedRows.length ? (
          <TableToolbarSelect
            options={this.options}
            selectedRows={selectedRows}
            onRowsDelete={this.selectRowDelete}
            onRowsEdit={this.onRowsEdit}
            selectRowUpdate={this.selectRowUpdate}
          />
        ) : (
            <TableToolbar
              columns={columns}
              data={data}
              title={title}
            />
          )}
        <div className="scroll-table">
          <MuiTable stickyHeader>
            <TableHead
              columns={columns}
              data={data}
              selectedRows={selectedRows}
              selectRowUpdate={this.selectRowUpdate}
              toggleSort={this.toggleSortColumn}
              count={this.state.data.length}
              orderBy={orderBy}
              sortAction={this.sortTable}
            />
            <TableBody
              data={data}
              columns={columns}
              selectedRows={selectedRows}
              selectRowUpdate={this.selectRowUpdate}
            />
          </MuiTable>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultTableStyles, { name: 'MUIDataTable' })(MUIDataTable);
