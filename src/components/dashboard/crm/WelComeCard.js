import React from "react";
import {Icon} from "antd";
import  {connect} from 'react-redux';
import '../../../../public/style.css';
const WelComeCard = (props) => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">{props.authUser.data.firstname}</h1>
      <p className="gx-fs-sm gx-text-uppercase">{props.authUser.data.company}</p>
      <ul className="gx-list-group">
        <li>
          <Icon type="message"/>
          <span>5 Unread messages</span>
        </li>
        <li>
          <Icon type="mail"/>
          <span>2 Pending invitations</span>
        </li>
        <li>
          <Icon type="profile"/>
          <span>7 Due payment</span>
        </li>
        <li>
          <Icon type="cart"/>
          <span>3 Reviews</span>
        </li>
      </ul>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    authUser : state.authUser 
  }
}
export default connect(mapStateToProps, null)(WelComeCard);
