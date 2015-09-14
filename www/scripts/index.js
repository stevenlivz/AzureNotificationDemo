// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        if (device.platform == "windows") {

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var connectionString = "Endpoint=sb://gccnotify.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=jyNcl/Z8Qho8w668fMtdAuQrbhg+YHTAuKPTryZ4fMk=";
            var notificationHubPath = "test";

            var hub = new WindowsAzure.Messaging.NotificationHub(notificationHubPath, connectionString);

            hub.registerApplicationAsync().then(function (result) {
                console.log("Registration successful: " + result.registrationId);
            });

            hub.onPushNotificationReceived = function (msg) {
                console.log('onPushNotificationReceived:' + JSON.stringify(msg));
            };
        } else {

            try {
                var hub = NotificationHub.init(notificationHubPath,
                  connectionString,
                  {
                      "android": {
                          "senderID": "1082522035766"
                      },
                      "ios": {}
                  });

                hub.on('registration', function (data) {
                    console.log("registration event");
                    console.log(JSON.stringify(data));
                    console.log(data.registrationId);
                });

                hub.on('notification', function (data) {
                    console.log("notification event");
                    console.log(JSON.stringify(data));
                });

                hub.on('error', function (data) {
                    console.log("notification error");
                    console.log(JSON.stringify(data));
                });

            } catch (e) {
                console.log(e);
            }
        }

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();


