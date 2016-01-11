"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-sample
 @licence MIT
 */

var jjtApingSample = angular.module("jtt_aping_sample", ['jtt_sample'])
    .directive('apingSample', ['apingSampleHelper', 'apingUtilityHelper', 'sampleFactory', function (apingSampleHelper, apingUtilityHelper, sampleFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingSample, apingSampleHelper.getThisPlatformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call

                    var requestObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingSampleHelper.getThisPlatformString(), "access_token"),
                    };

                    if(typeof request.items !== "undefined") {
                        requestObject.count = request.items;
                    } else {
                        requestObject.count = appSettings.items;
                    }

                    if (requestObject.count === 0 || requestObject.count === '0') {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(requestObject.count < 0 || isNaN(requestObject.count)) {
                        requestObject.count = undefined;
                    }

                    // the api has a limit of 100 items per request
                    if(requestObject.count > 100) {
                        requestObject.count = 100;
                    }

                    //get _data for each request
                    sampleFactory.getPostsFromUserById(requestObject)
                        .then(function (_data) {
                            if (_data) {
                                apingController.concatToResults(apingSampleHelper.getObjectByJsonData(_data, helperObject));
                            }
                        });
                });
            }
        }
    }]);