import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Avatar } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import config from "../../../config";
import { checkToken } from "../../actions/AuthActions";
import { receiveMessageCVS } from "../../actions/ChatAppActions";
import { openInbox, receiveMessageInbox } from "../../actions/InboxAction";
import { getConversation, reloadMessage } from "../../actions/SendMessagesActions";
//socket
import WS from "../../WS";

const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const avartar_gopanda = "https://app.gopanda.asia/public/backup.png";
const arrcolor = [
  "#00D0BD",
  "red",
  "green",
  "blue",
  "cyan",
  "#2db7f5",
  "purple"
];
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConversation: [],
      user_id: null,
      count_unread: 0,
      last_message: [],
      filterM: { paging: 0 },
      messageList: [],
      idConversation: null,
      idCustomer: null,
      isOpen: false
    };
  }

  componentDidMount() {
    if (this.props.auth.id !== undefined) {
      this.props.getConversation(this.props.auth.id).then(res => {
        this.setState({
          listConversation: res.data.list,
          count_unread: res.data.count_unread,
          last_message: res.data.list.last_message
        });
      });

      this.setState({
        authId: this.props.auth.id
      });

      this.ws = new WS(
        "wss://nvcdbdw6ji.execute-api.eu-west-1.amazonaws.com/dev",
        this.props.auth.id,
        "gopanda",
        event => {
          let parseMessage = JSON.parse(event.message);

          console.log("received message", parseMessage)

          //check conversation id to compare
          this.props.getConversation(this.state.authId);
          this.props.reloadMessage(parseMessage);
          this.props.receiveMessageCVS({
            ...parseMessage,
            avatar_thumb: parseMessage.sender_avatar ? ACCOUNT_IMAGE_URL + parseMessage.sender_avatar : avartar_gopanda
          });
          this.props.receiveMessageInbox({
            ...parseMessage,
            avatar_thumb: parseMessage.sender_avatar ? ACCOUNT_IMAGE_URL + parseMessage.sender_avatar : avartar_gopanda
          });
        },
        true
      );

      this.ws.onopen = () => {
        this.ws.sendData({
          action: "subscribe",
          userID: this.props.auth.id.toString(),
          app: "gopanda"
        });
      };

      // this.pingWS = setInterval(() => {
      //   console.log('thu');
        
      //   this.ws.sendData({
      //     action: "ping",
      //     userID: "0000",
      //     app: "gopanda"
      //   }, 4 * 60 * 1000)
      // })

    } else {
      this.props.checkToken().then(res => {
        this.props.getConversation(res.id).then(res => {
          this.setState({
            listConversation: res.data.list,
            count_unread: res.data.count_unread,
            last_message: res.data.list.last_message
          });
        });

        this.setState({
          authId: res.id
        });

        this.ws = new WS(
          "wss://nvcdbdw6ji.execute-api.eu-west-1.amazonaws.com/dev",
          res.id,
          "gopanda",
          event => {
            let parseMessage = JSON.parse(event.message);

            console.log("received message", parseMessage)

            this.props.reloadMessage(parseMessage);
            this.props.getConversation(this.state.authId);
            this.props.receiveMessageCVS({
              ...parseMessage,
              avatar_thumb: parseMessage.sender_avatar ? ACCOUNT_IMAGE_URL + parseMessage.sender_avatar : avartar_gopanda
            });
            this.props.receiveMessageInbox({
              ...parseMessage,
              avatar_thumb: parseMessage.sender_avatar ? ACCOUNT_IMAGE_URL + parseMessage.sender_avatar : avartar_gopanda
            });
          },
          true
        );

        this.ws.onopen = () => {
          this.ws.sendData({
            action: "subscribe",
            userID: this.state.authId.toString(),
            app: "gopanda"
          });
        };

        this.pingWS = setInterval(() => {
          
          this.ws.sendData({
            action: "ping",
            userID: "0000",
            app: "gopanda"
          })
        }, 9 * 60 * 1000)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messageReceived != this.props.messageReceived && this.props.messageReceived) {
      this.props.getConversation(this.state.authId);
    }
  }

  componentWillUnmount() {
    this.ws.closeSocket();
    clearInterval(this.pingWS)
  }

  Time(e) {
    var d = new Date();
    let con = new Date(e.updated_at.toString().replace(" ", "T"));
    let res = new Date(
      con.setMinutes(con.getMinutes() - d.getTimezoneOffset())
    );
    return moment(res).format("DD MMM, YYYY ") ===
      moment().format("DD MMM, YYYY ")
      ? moment(res).format("HH:mm")
      : moment(res).format("DD MMM, YYYY ");
  }
  avatar(data) {

    if (data && data.firstname) {
      return data.firstname.substr(0, 1) + data.lastname.substr(0, 1);
    }
    return "User";
  }

  setName = (item) => {
    let name = "";
    if (item.attend_customer) {
      let firstname = item.attend_customer.firstname || "";
      let lastname = item.attend_customer.lastname || "";
      name = firstname + " " + lastname
    }
    if (item.firstname) {
      name = item.firstname
    }
    if (item.lastname) {
      name = name + " " + item.lastname
    }
    return name;
  }

  setAvt = (item) => {
    let avt = "/backup.png";
    if (item.attend_customer) {
      avt = item.attend_customer.avatar ? item.attend_customer.avatar : "/backup.png";
    }
    if (item.avatar) {
      avt = item.avatar
    }
    return `${ACCOUNT_IMAGE_URL}${avt}`;
  }

  setContent(data) {
    if (data.length > 45)
      return data.substr(0, 45) + '...'
    return data
  }

  render() {
    const { listConversation, count_unread } = this.props;

    return (
      <UncontrolledDropdown
        nav
        className="list-inline-item notification-dropdown"
      >
        <DropdownToggle nav className="p-0">
          <Tooltip title="Message" placement="bottom">
            <IconButton>
              <i className="zmdi zmdi-comments"></i>
              {count_unread > 0 ? (
                <Badge
                  color="danger"
                  className="badge-xs badge-top-right rct-notify"
                >
                  {count_unread}
                </Badge>
              ) : null}
            </IconButton>
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu right >

          <div className="dropdown-content">
            <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
              <span className="text-white font-weight-bold">
                <IntlMessages id="widgets.recentMessage" />
              </span>
              {count_unread > 0 ? (
                <Badge color="warning">{count_unread} Unread</Badge>
              ) : null}
            </div>
            <Scrollbars
              className="rct-scroll"
              autoHeight
              autoHeightMin={100}
              autoHeightMax={280}
            >


              {listConversation.length ? (
                listConversation.map((item, key) => (

                  <DropdownItem
                    key={key}
                    style={item.unread ?
                      { background: "#ccc", cursor: 'pointer', marginBottom: "5px", paddingLeft: '10px', paddingRight: '10px', textTransform: 'none' }
                      : { background: "white", cursor: 'pointer', marginBottom: "5px", paddingLeft: '10px', paddingRight: '10px', textTransform: 'none' }
                    }
                    onClick={() => this.props.openInbox(item)}
                  >
                    <div className="media">
                      <div className="mr-10">
                        <Avatar
                          style={{
                            backgroundColor:
                              arrcolor[
                              key > arrcolor.length
                                ? key % arrcolor.length
                                : key
                              ]
                          }}
                          size={50}
                          src={this.setAvt(item)}
                        >
                        </Avatar>
                      </div>
                      <div className="media-body pt-5">
                        <div className="d-flex justify-content-between">
                          <h5 className="mb-5 ml-5 text-primary">
                            {this.setName(item)}
                          </h5>
                          {item.last_message
                            ? item.last_message.map((e, key) => (
                              <React.Fragment key={key}>
                                <span className="text-muted fs-12">
                                  {this.Time(e)}
                                </span>
                              </React.Fragment>
                            ))
                            : null}
                        </div>
                        <div className="text-muted fs-12 ml-5">
                          {item.last_message
                            ? item.last_message.map((e, key) => (
                              <React.Fragment key={key}>
                                {this.setContent(e.content)}
                              </React.Fragment>
                            ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </DropdownItem>



                ))
              ) : (
                  <div
                    className="no-conversation"
                    style={{
                      marginTop: "40px",
                      fontSize: "16px",
                      color: "#999",
                      textAlign: "center"
                    }}
                  >
                    No conversation
                  </div>
                )}

            </Scrollbars>
          </div>
          {listConversation.length > 3 ? (

            <div className="dropdown-foot p-2 bg-white rounded-bottom">
              <DropdownItem style={{ background: 'white' ,paddingLeft:'2px'}}>
                <Link to="/app/conversation">

                  <div
                  style={{cursor: 'pointer', color: '#fff',    backgroundColor: '#0074d9',     borderRadius: '3px'}}
                    variant="contained"
                   
                    className="mr-10 btn-xs bg-primary"
                  >
                    <IntlMessages id="button.viewAll" />
                  </div>

                </Link>
              </DropdownItem>
            </div>

          ) : null}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
const mapStateToProps = state => {
  return {
    listConversation: state.send_messages.listConversation,
    auth: state.authUser.data,
    count_unread: state.send_messages.count_unread,
    messageReceived: state.send_messages.messageReceived,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConversation: id => dispatch(getConversation(id)),
    checkToken: () => dispatch(checkToken()),
    reloadMessage: data => dispatch(reloadMessage(data)),
    receiveMessageCVS: data => dispatch(receiveMessageCVS(data)),
    openInbox: data => dispatch(openInbox(data)),
    receiveMessageInbox: (data) => dispatch(receiveMessageInbox(data))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Message)
);
