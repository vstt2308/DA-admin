import React from 'react';
import MatButton from '@material-ui/core/Button';

class TableFilter extends React.Component {

  constructor(props) {
    super(props);
    this.tableFilter = React.createRef();
    this.state = {
      isOpen: this.props.isOpen
    }
  }

  componentDidMount() {
    if (this.props.isOpen) {
      let tableFilter = this.tableFilter.current;
      tableFilter.style.display = "block";
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return {
        isOpen: nextProps.isOpen
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen != prevState.isOpen) {
      var tableFilter = this.tableFilter.current;
      if (this.state.isOpen) {
        tableFilter.style.display = "block";
      }
      if (!this.state.isOpen) {
        tableFilter.style.display = "none";
      }
    }
  }

  toggle(event) {
    let tableFilter = this.tableFilter.current;
    if (event.target == tableFilter) {
      if (this.props.toggle) {
        this.props.toggle();
      }
    }
  }

  render() {

    return (
      <React.Fragment>
        <div style={{ padding: " 0 25px", display: 'none' }} ref={this.tableFilter}>
          <div>
            <span>FILTERS</span>
            <MatButton className="text-primary mr-10 mb-10" style={{ marginTop: "8px", marginLeft: "20px", fontSize: "inherit" }} onClick={() => this.props.resetFilter()} >RESET</MatButton>
          </div>
          {this.props.tableFilter}
        </div>
      </React.Fragment>
    );
  }
}

export default TableFilter;
