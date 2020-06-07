import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import { Button, Divider, Modal, Icon, Tooltip, Input, Col, Row } from "antd";
import { publish, unpublish } from "../../actions/CommonActions";
import TableFilter from "../TableFilter/TableFilter";
import PropTypes from "prop-types";
import { copyGuideCalendar } from "../../actions/GuideCalendarAction";
const { Search } = Input;
const confirm = Modal.confirm;

class TableActionBar extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    textSearch: PropTypes.bool,
    onFilter: PropTypes.func,
    searchOpition: PropTypes.object,
    showFilter: PropTypes.bool,
    justify: PropTypes.oneOf(["start", "end", "center"]),
    showActionBar: PropTypes.bool
  };

  static defaultProps = {
    data: [],
    onFilter: () => {},
    textSearch: true,
    searchOpition: {},
    isShowPublishButtons: true,
    isShowDeleteButton: true,
    isShowAddButton: true,
    isShowCopyButton: false,
    showFilter: true,
    justify: "end",
    showActionBar: true
  };

  state = {
    activeFilter: false,
    rows: 0,
    isDisabledCopyButton: true
  };

  onOpenFilter() {
    this.setState({
      activeFilter: !this.state.activeFilter
    });
  }

  onPublish() {
    this.props
      .publish({
        rows: this.props.rows,
        table: this.props.table
      })
      .then(() => {
        this.props.onRefresh();
      });
  }

  onUnpublish() {
    this.props
      .unpublish({
        rows: this.props.rows,
        table: this.props.table
      })
      .then(() => {
        this.props.onRefresh();
      });
  }

  onCopy() {
    this.props
      .copyRecord({id: this.props.rows[0]})
      .then(() => {
        this.props.onRefresh();
      });
  }

  openAlert() {
    confirm({
      title: "Do you want to delete these records?",
      okText: "Yes",
      okType: "danger",
      onOk: () => this.delete(),
      onCancel() {}
    });
  }

  delete() {
    this.props.onDelete();
  }

  render() {
    const {
      showFilter,
      isShowPublishButtons,
      onFilter,
      searchOpition,
      textSearch,
      data,
      justify,
      isShowDeleteButton,
      showActionBar,
      isShowAddButton,
      isShowCopyButton
    } = this.props;

    const style = {
      filterBody: {
        margin: "10px 0"
      }
    };
    return (
      <div style={style.filterBody}>
        <Row type="flex" align="middle">
          {showActionBar ? (
            <Col sm={{ span: 18 }} xs={{ span: 24 }}>
              {isShowAddButton ? (
                <React.Fragment>
                  <Button
                    type="primary"
                    onClick={() => this.props.onAdd()}
                    icon="plus"
                  >
                    <IntlMessages id="global.add_new" />
                  </Button>
                </React.Fragment>
              ) : null}
              {isShowPublishButtons ? (
                <React.Fragment>
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    onClick={() => this.onPublish()}
                    disabled={this.props.isDisabled}
                  >
                    <IntlMessages id="global.publish" />
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    onClick={() => this.onUnpublish()}
                    disabled={this.props.isDisabled}
                  >
                    <IntlMessages id="global.unpublish" />
                  </Button>
                </React.Fragment>
              ) : null}
              {isShowCopyButton ? (
                <React.Fragment>
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    onClick={() => this.onCopy()}
                    icon="copy"
                    disabled={this.props.rows.length !== 1 ? true : false}
                  >
                    <IntlMessages id="global.copy" />
                  </Button>
                </React.Fragment>
              ) : null}
              {isShowDeleteButton ? (
                <React.Fragment>
                  <Divider type="vertical" />
                  <Button
                    type="danger"
                    onClick={() => this.openAlert()}
                    disabled={this.props.isDisabled}
                  >
                    <IntlMessages id="global.delete" />
                  </Button>
                </React.Fragment>
              ) : null}
              {this.props.children}
            </Col>
          ) : (
            <Col sm={{ span: 18 }} xs={{ span: 24 }}></Col>
          )}
          <Col sm={{ span: 6 }} xs={{ span: 24 }} style={{ display: "flex" }}>
            {textSearch ? (
              <Search
                name="search"
                className="txtSearch"
                placeholder="Search..."
                onChange={e =>
                  this.props.onFilter(e.target.value, e.target.name, "search")
                }
                style={{ width: "100%", position: 'relative', zIndex: 0 }}
                {...searchOpition}
              />
            ) : null}
            {showFilter && data.length ? (
              <Tooltip title="Filter">
                <Icon
                  type="filter"
                  style={{
                    float: "right",
                    marginLeft: "10px",
                    fontSize: "15px",
                    cursor: "pointer",
                    lineHeight: "32px",
                    color: this.state.activeFilter ? "blue" : "#595959"
                  }}
                  onClick={() => this.onOpenFilter()}
                />
              </Tooltip>
            ) : null}
          </Col>
        </Row>

        <TableFilter
          onFilter={onFilter}
          open={this.state.activeFilter}
          data={data}
          justify={justify}
        ></TableFilter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data)),
    copyRecord: id => dispatch(copyGuideCalendar(id))
  };
}

export default connect(null, mapDispatchToProps)(TableActionBar);
