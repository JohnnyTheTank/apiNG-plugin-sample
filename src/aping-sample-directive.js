"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-sample
 @licence MIT
 */

var jjtApingSample = angular.module("jtt_aping_sample", [])
    .directive('apingSample', ['apingSampleHelper', 'apingUtilityHelper', function (apingSampleHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingSample, apingSampleHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    var sampleSearchObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingSampleHelper.getThisPlattformString(), "access_token"),
                        count: request.items || appSettings.items,
                    };
                    //get _data for each request
                        // on success:
                            // apingController.concatToResults(apingSampleHelper.getObjectByJsonData(_data, appSettings.model));
                });
            }
        }
    }]);