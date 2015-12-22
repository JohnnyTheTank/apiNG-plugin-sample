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

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            //replace '_data.items'
            if (_data.items) {

                //replace '_data.items'
                angular.forEach(_data.items, function (value, key) {
                    var tempResult;
                    if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {
                        tempResult = _this.getItemByJsonData(value, _helperObject.model);
                    }
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
            "blog_name": undefined,
            "blog_id": undefined,
            "blog_link": undefined,
            "type": undefined,
            "timestamp": undefined,
            "post_url": undefined,
            "intern_id": undefined,
            "text": undefined,
            "caption": undefined,
            "img_url": undefined,
            "source": undefined,
            "likes": undefined,
            "shares": undefined,
            "comments": undefined,
            "position": undefined
        });

        socialObject.date_time = new Date(socialObject.timestamp);

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        //fill _item in videoObject
        $.extend(true, videoObject, {
            "blog_name": undefined,
            "blog_id": undefined,
            "blog_link": undefined,
            "timestamp": undefined,
            "post_url": undefined,
            "intern_id": undefined,
            "text": undefined,
            "caption": undefined,
            "img_url": undefined,
            "source": undefined,
            "markup": undefined,
            "likes": undefined,
            "shares": undefined,
            "comments": undefined,
            "position": undefined
        });

        videoObject.date_time = new Date(videoObject.timestamp);

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageObject = apingModels.getNew("image", this.getThisPlattformString());

        //fill _item in imageObject
        $.extend(true, imageObject, {
            blog_name : undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
            blog_id : undefined, //ID of channel / page / account, ...
            blog_link : undefined, //link to channel / uploader / page / account, ...
            timestamp : undefined,
            date_time: undefined,
            post_url : undefined, //URL to the  image ...
            intern_id : undefined, // INTERN ID of image (facebook id, instagram id, ...)
            text : undefined,
            caption : undefined,
            img_url : undefined,
            source : undefined, //
            likes: undefined,
            shares: undefined,
            comments: undefined,
            position: undefined,
        });

        imageObject.date_time = new Date(imageObject.timestamp);

        return imageObject;
    };
}]);