/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { notification } from 'antd';
import { checkToken } from '../actions/AuthActions';
import { getCookie } from '../helpers/session';
import { sendToken } from '../actions/Notification';


const config = {
  apiKey: "AIzaSyBVvxFn4NXxhT9sbKeEhpGha3GwWi4dauk",
  authDomain: "godpanda-8f3fc.firebaseapp.com",
  databaseURL: "https://godpanda-8f3fc.firebaseio.com",
  projectId: "godpanda-8f3fc",
  storageBucket: "godpanda-8f3fc.appspot.com",
  messagingSenderId: "691655863173",
  appId: "1:691655863173:web:33e9ee1bf73953bdedf2ec",
  measurementId: "G-483LVYMMR6"
};


firebase.initializeApp(config);

// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BEPXt_Ortnfc1zSpqtIEy5o8Xd-LluPtHa4bDiheIqNNM8x3iDG0TYJmno-0si3rPonKHNB3tC13Oafhz2bOoU4');


export const requestPM = () => {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then(async (permission) => {
      window.localStorage.setItem('permission', permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.', permission);
        var token = "";
        await messaging.getToken().then((t) => {
         
          token = t;
        }).catch(async (err) => {
          console.log('Unable to retrieve refreshed token ', err);
          token = await messaging.getToken();
        });
        resolve(token);
      } else {
        console.log('Unable to get permission to notify.', permission);
        reject(0)
      }
    });
  })
}


messaging.onTokenRefresh(() => {
  console.log("refreshed")
  messaging.getToken().then(async (refreshedToken) => {
    console.log('Token refreshed.', refreshedToken);
    const tok = getCookie('token');
    let user_id = "";
    if (tok) {
      await checkToken(tok).then(res => {
        user_id = res.id;
      });
    }
    sendToken({ device_id: refreshedToken, user_id: user_id })
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
  });
});


messaging.onMessage((payload) => {
  notification.open({
    message: payload.notification.title,
    description:
      payload.notification.body,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
});



export const deleteToken = () => {
  if (window.localStorage.getItem('permission') === 'granted') {
    return new Promise((resolve, reject) => {
      messaging.getToken().then((currentToken) => {
        messaging.deleteToken(currentToken).then(() => {
          console.log('Token deleted.');
          resolve(1);
        }).catch((err) => {
          reject(0)
          console.log('Unable to delete token. ', err);
        });
      }).catch((err) => {
        reject(0);
        console.log('Error retrieving Instance ID token. ', err);
      });
    })
  }
}



export {
  messaging
};
