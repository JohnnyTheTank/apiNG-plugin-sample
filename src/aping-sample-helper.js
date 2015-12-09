"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-sample
 @licence MIT
 */

jjtApingSample.service('apingSampleHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "sample";
    };

    this.getThisPlattformLink = function () {
        return "https://sample.com/";
    };

    this.getObjectByJsonData = function (_data, _model) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            //replace '_data.items'
            if (_data.items) {

                //replace '_data.items'
                angular.forEach(_data.items, function (value, key) {
                    var tempResult = _this.getItemByJsonData(value, _model);
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "video":
                    returnObject = this.getVideoItemByJsonData(_item);
                    break;
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        //fill _item in socialObject
        $.extend(true, socialObject, {
            "blog_name": false,
            "blog_id": false,
            "blog_link": false,
            "type": false,
            "timestamp": false,
            "post_url": false,
            "intern_id": false,
            "text": false,
            "caption": false,
            "img_url": false,
            "source": false,
            "likes": false,
            "shares": false,
            "comments": false,
            "position": false
        });

        socialObject.date_time = new Date(socialObject.timestamp);

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        //fill _item in videoObject
        $.extend(true, videoObject, {
            "blog_name": false,
            "blog_id": false,
            "blog_link": false,
            "timestamp": false,
            "post_url": false,
            "intern_id": false,
            "text": false,
            "caption": false,
            "img_url": false,
            "source": false,
            "markup": false,
            "likes": false,
            "shares": false,
            "comments": false,
            "position": false
        });

        videoObject.date_time = new Date(videoObject.timestamp);

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageObject = apingModels.getNew("image", this.getThisPlattformString());

        //fill _item in imageObject

        return imageObject;
    };
}]);