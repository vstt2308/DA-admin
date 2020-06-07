import React, { Component } from 'react';
import { Col, Row } from "antd";
import { connect } from 'react-redux';
import TaskList from "../../components/dashboard/crm/TaskList";
import SiteVisit from "../../components/dashboard/crm/SiteVisit";
import RecentActivity from "../../components/dashboard/crm/RecentActivity";
import TicketList from "../../components/dashboard/crm/TicketList";
import TaskByStatus from "../../components/dashboard/crm/TaskByStatus";
import WelComeCard from "../../components/dashboard/crm/WelComeCard";
import Overview from "../../components/dashboard/crm/Overview";
import SiteAudience from "../../components/dashboard/crm/SiteAudience";
import Auxiliary from "../../util/Auxiliary";
import TotalRevenueCard from "../../components/dashboard/crm/TotalRevenueCard";
import NewCustomers from "../../components/dashboard/crm/NewCustomers";
import GrowthCard from "../../components/dashboard/crm/GrowthCard";
import Widget from "../../components/Widget/index";
import CurrencyCalculator from "../../components/dashboard/Crypto/CurrencyCalculator";
import IconWithTextCard from "../../components/dashboard/crm/IconWithTextCard";
import { recentActivity, taskList, trafficData } from "./data";
import { getconsumer } from '../../actions/CommonActions';
import { withRouter, Link } from 'react-router-dom';
import '../../../public/style.css';

class CRM extends Component {
  state = {
    filter: {
      paging: {
        perpage: 10,
        page: 1
      }
    }
  }
  componentDidMount() {
    this.props.getconsumer()
  }
  render() {
    const { consumer } = this.props
    // console.log(listInquiry);


    return (
      <React.Fragment>
        <Auxiliary>
          <Row>
            <Col span={24}>
              <div className="gx-card">
                <div className="gx-card-body">
                  <Row>
                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                      <WelComeCard />
                    </Col>

                    <Col xl={6} lg={12} md={12} sm={12} xs={24} className="gx-audi-col">
                      <SiteAudience />
                    </Col>

                    <Col xl={12} lg={24} md={24} sm={24} xs={24} className="gx-visit-col">
                      <SiteVisit />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xl={8} lg={24} md={8} sm={24} xs={24}>
              <TotalRevenueCard />
            </Col>
            <Col xl={8} lg={12} md={8} sm={24} xs={24}>
              <NewCustomers />
            </Col>
            <Col xl={8} lg={12} md={8} sm={24} xs={24}>
              <GrowthCard trafficData={trafficData} />
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
              <Widget>
                <RecentActivity recentList={recentActivity} shape="circle" />
              </Widget>
              <CurrencyCalculator />
            </Col>

            <Col xl={16} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Link to="/app/products/tours" style={{ width: "100%" }}>
                    <IconWithTextCard cardColor="cyan" icon="rocket" title={consumer.tour} subTitle={consumer.tour > 1 ? "Tours" : "Tour"} />
                  </Link>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Link to="/app/orders/tours" style={{ width: "100%" }}>
                    <IconWithTextCard cardColor="orange" icon="shopping-cart" title={consumer.order} subTitle={consumer.order > 1 ? "Oders" : "Order"} />
                  </Link>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12} >
                  <Link to="/app/account/passenger" style={{ width: "100%" }}>
                    <IconWithTextCard cardColor="teal" icon="team" title={consumer.passenger} subTitle={consumer.passenger > 1 ? "Passenger" : "Passenger"} />
                  </Link>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Link to="/app/products/reviews" style={{ width: "100%" }}>
                    <IconWithTextCard cardColor="red" icon="solution" title={consumer.review} subTitle={consumer.review > 1 ? "Reviews" : "Review"} />
                  </Link>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <TaskList taskList={taskList} />
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                  <TicketList />
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <TaskByStatus />
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Overview />
                </Col>
              </Row>
            </Col>
          </Row>


        </Auxiliary>
       
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    consumer: state.common.consumer,
    // listInquiry: state.inquiry.listInquiry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getconsumer: () => dispatch(getconsumer()),
    // getAllInquiry: filter => dispatch(getAllInquiry(filter))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRM));
