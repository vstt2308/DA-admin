importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyAFpElmboCje1syXWDxWtlgSTCq6kozl9s",
  messagingSenderId: "691655863173",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo-icon.jpg'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
});