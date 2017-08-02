'use strict';
app.controller('mainController', function ($scope, generalFactory, Pubnub) {
    $scope.list = {};
   /* generalFactory.getList().
            then(function (response) {
                console.log("response");
                console.log(response.data);
                $scope.list = response.data;
            }).catch(function (response) {
        console.log('error');
        console.log(response);
    })
            .finally(function () {
                console.log("finally");
            });
     */
    $scope.messages = [];
    $scope.channel = 'conect-arduino';
    $scope.messageContent = '';
    // Identificador del elemento
    $scope.uuid = "angular-client";
    Pubnub.init({
        publish_key: 'pub-c-24150dba-a538-4de7-af26-643500dd957d',
        subscribe_key: 'sub-c-af6ff0d2-6a8d-11e7-9bf2-0619f8945a4f',
        ssl: true,
        uuid: $scope.uuid
    });

    // Fetching a uniq random avatar from the robohash.org service.
    $scope.avatarUrl = function (uuid) {
        return '//robohash.org/' + uuid + '?set=set2&bgset=bg2&size=70x70';
    };

    // Enviando sobre PubNub Network
    $scope.sendMessage = function () {
        // No envia mensaje vacios
        if (!$scope.messageContent || $scope.messageContent === '') {
            return;
        }
        Pubnub.publish({
            channel: $scope.channel,
            message: {
                content: $scope.messageContent,
                sender_uuid: $scope.uuid,
                uuid: $scope.uuid,
                date: new Date()
            },
            callback: function (m) {
                console.log(m);
            }
        });
        // Reset input
        $scope.messageContent = '';

    };
    
    // Subscribe to messages channel
    Pubnub.subscribe({
        channel: $scope.channel,
        triggerEvents: ['callback'],
        withPresence : true
    });
    
    // Make it possible to scrollDown to the bottom of the messages container
    $scope.scrollDown = function (time) {
        var $elem = $('.collection');
        $('body').animate({
            scrollTop: $elem.height()
        }, time);
    };
    
    $scope.scrollDown(400);
    // Escuando los mensajes recibidos.
    $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
        $scope.$apply(function () {
            $scope.messages.push(m);
            Pubnub.here_now({
                channel: ["conect-arduino"],
                includeUUIDs: true,
                includeState: true,
                callback:function(e){
                console.log(e);
            }
           });
        });
        $scope.scrollDown(400);
    });
});


