import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Popover from './Popover';
import TableFilter from './TableFilter';
import TableViewCol from './TableViewCol';
import TableSearch from './TableSearch';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterIcon from '@material-ui/icons/FilterList';
import ReactToPrint from 'react-to-print';
import { withStyles } from '@material-ui/core/styles';
import textLabels from '../textLabels';
export const defaultToolbarStyles = theme => ({
  root: {},
  left: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '1 1 auto',
    textAlign: 'right',
  },
  titleRoot: {},
  titleText: {},
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  filterPaper: {
    maxWidth: '50%',
  },
  searchIcon: {
    display: 'inline-flex',
    marginTop: '10px',
    marginRight: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    titleRoot: {},
    titleText: {
      fontSize: '16px',
    },
    spacer: {
      display: 'none',
    },
    left: {
      // flex: "1 1 40%",
      padding: '8px 0px',
    },
    actions: {
      // flex: "1 1 60%",
      textAlign: 'right',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'block',
    },
    left: {
      padding: '8px 0px 0px 0px',
    },
    titleText: {
      textAlign: 'center',
    },
    actions: {
      textAlign: 'center',
    },
  },
  '@media screen and (max-width: 480px)': {},
});

class TableToolbar extends React.Component {
  state = {
    showSearch: false,
    showFilter: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({ searchText: this.props.searchText });
    }
  }

  showSearch() {
    this.setState({
      ...this.state,
      showSearch: true
    })
  }
  hideSearch = () => {
    this.setState({
      ...this.state,
      showSearch: false
    })
  }

  openFilter() {
    this.setState({
      ...this.state,
      showFilter: !this.state.showFilter
    })
  }

  render() {
    const {
      data,
      classes,
      columns,
      title,
    } = this.props;
    const { search } = textLabels.toolbar;
    const { showSearch, searchText } = this.state;

    return (
      <React.Fragment>
        <Toolbar className={classes.root} role={'toolbar'} aria-label={'Table Toolbar'}>
          <div className={classes.left}>
            {showSearch === true ? (
              <TableSearch
                searchText={searchText}
                onSearch={this.handleSearch}
                onHide={this.hideSearch}
              />
            )
              : typeof title !== 'string' ? (
                title
              ) : (
                  <div className={classes.titleRoot} aria-hidden={'true'}>
                    <Typography variant="h6" className={classes.titleText}>
                      {title}
                    </Typography>
                  </div>
                )}
          </div>
          <div className={classes.actions}>
            <Tooltip title={search} disableFocusListener>
              <IconButton
                aria-label={search}
                onClick={() => this.showSearch()}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={textLabels.filter.title} disableFocusListener>
              <IconButton
                data-testid={textLabels.filter.title + '-iconButton'}
                aria-label={textLabels.filter.title}
                onClick={() => this.openFilter()}
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        <TableFilter isOpen={this.state.showFilter}></TableFilter>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: 'MUIDataTableToolbar' })(TableToolbar);
