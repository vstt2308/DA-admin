export default class WS {
  constructor(URL, userID, app, listenerCallback, isReconnect = true) {
    // khởi tạo và connect tới socket server
    this.receiveData = "";
    this.URL = URL;
    this.userID = userID.toString();
    this.app = app;
    this.listenerCallback = listenerCallback;

    this.socket = new WebSocket(this.URL);

    this.socket.addEventListener("open", this.socketOpenListener);
    this.socket.addEventListener("message", this.socketMessageListener);
    this.socket.addEventListener("error", this.socketErrorListener);
    this.socket.addEventListener("close", this.socketCloseListener);
  }

  socketOpenListener = event => {
    console.log("Connected");
    var data = { action: "subscribe", userID: this.userID, app: this.app };
    // console.log(data);
    this.socket.send(JSON.stringify(data));
  };

  socketMessageListener = event => {
    //  console.log(event.data);
    this.receiveData = JSON.parse(event.data);
    // console.log(this.receiveData);
    this.listenerCallback(this.receiveData);
  };

  socketErrorListener = event => {
    console.log(event);
  };

  socketCloseListener = event => {
    console.error("Disconected")
  };


  closeSocket = () => {
    this.socket.close();
  }

  sendData(data) {
    this.socket.send(JSON.stringify(data));
  }
}
