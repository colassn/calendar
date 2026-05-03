// 引入 Firebase 核心與 Messaging 模組 (注意必須使用 compat 版本，並與你 HTML 的版本一致)
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// 初始化 Firebase (請確認這裡的設定與你 HTML 檔案中的 config 完全一致)
firebase.initializeApp({
    apiKey: "AIzaSyBW95yx0j_bvxWjuZSB6On3bADoBu3wxnA",
    authDomain: "calendar-61298.firebaseapp.com",
    projectId: "calendar-61298",
    storageBucket: "calendar-61298.firebasestorage.app",
    messagingSenderId: "507955747395",
    appId: "1:507955747395:web:7422bf9b7e8672eff052f6"
});

// 獲取 Messaging 實例
const messaging = firebase.messaging();

// 監聽背景訊息
// 當網頁不在前景運作時，收到 FCM 推播就會觸發這裡
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 成功收到背景通知: ', payload);
    
    // 定義要顯示在手機通知欄的內容
    const notificationTitle = payload.notification?.title || "CHIM.APP 提示";
    const notificationOptions = {
        body: payload.notification?.body || "您有一則新通知",
        // 如果你有網站的 Icon，可以把路徑替換掉，例如 '/logo.png'
        icon: 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png', 
        badge: 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png',
        // 震動模式：震動 200ms -> 暫停 100ms -> 震動 200ms (Android 支援)
        vibrate: [200, 100, 200]
    };

    // 呼叫瀏覽器/手機系統原生 API，顯示通知框
    self.registration.showNotification(notificationTitle, notificationOptions);
});
