var slideshow = function (tag) {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
        "tags=" + tag + "&format=json&jsoncallback=?";
    var displayMessage = function (photoNumber) {
        $.getJSON(url, function (flickrResponse) {
            var $img = $("<img>").attr("src", flickrResponse.items[photoNumber].media.m).hide().addClass("image");
            $(".content .photos").empty();
            $(".content .photos").append($img);
            $img.fadeIn();
            setTimeout(function () {
                photoNumber++;
                if (photoNumber == 10) {
                    $(".content .photos").empty();
                    $(".content .input-field .input").attr("disabled", false);
                    return false;
                }
                displayMessage(photoNumber);
            }, 2000);
        });
    };
    displayMessage(0);
}

var main = function () {
    "use strict";
    var $input = $("<input>").addClass("input"),
        $inputLabel = $("<p>").text("Введите тег:"),
        $button = $("<button>").text("Поиск"),
        $inputField = $("<div>").addClass("input-field"),
        $photos = $("<div>").addClass("photos");
    $(".content").append($inputField).append($photos);
    $(".content .input-field").append($inputLabel).append($input).append($button);
    $button.on("click", function () {
        var tag;
        tag = $input.val();
        if (tag != '') {
            $input.val("");
            $(".content .photos").empty();
            $input.attr("disabled", true);
            slideshow(tag);
        } else {
            alert("Поле не должно быть пустым.");
        }
    })
}
$(document).ready(main);