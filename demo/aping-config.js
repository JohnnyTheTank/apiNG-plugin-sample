"use strict";
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            //...
            'sample': [
                {'access_token':'<YOUR_API_TOKEN>'},
            ],
            //...
        }
    });
}]);