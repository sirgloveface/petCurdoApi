var PubNub = require('pubnub');


function publish() {

    var pubnub = new PubNub({
        publishKey: 'pub-c-24150dba-a538-4de7-af26-643500dd957d',
        subscribeKey: 'sub-c-af6ff0d2-6a8d-11e7-9bf2-0619f8945a4f',
        uuid: "pc-"
    });

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel: "conect-arduino",
            message: { "id": 43, 
                       "text": "otror", 
                       "hello": "hola Tony" 
            },
            sendByPost: false // true to send via post
        };
       pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        },function(status, response) {
            console.log(status, response);
        });
    }

    pubnub.addListener({
        status: function (statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function (message) {
            console.log("New Message!!", message);
        },
        presence: function (presenceEvent) {
            // handle presence
        }
    });
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['conect-arduino']
    });
};

publish();


/*
 * 
 * {
    "content": "prueba web",
    "id": 42,
    "sender_uuid": "web-client",
    "uuid": "web-client",
    "date": "2017-08-02T19:35:00.484Z"
}
 * 
 * 
 */