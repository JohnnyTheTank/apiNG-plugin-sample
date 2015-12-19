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

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingSample, apingSampleHelper.getThisPlattformString(), appSettings);

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
                        access_token: apingUtilityHelper.getApiCredentials(apingSampleHelper.getThisPlattformString(), "access_token"),
                        count: request.items || appSettings.items,
                    };

                    //get _data for each request
                    sampleFactory.getPostsFromUserById(requestObject)
                        .success(function (_data) {
                            if (_data) {
                                apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, helperObject));
                            }
                        });
                });
            }
        }
    }]);