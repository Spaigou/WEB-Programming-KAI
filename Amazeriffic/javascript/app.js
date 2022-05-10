var organizeByTag = function (toDoObjects) {
    var tags = [];
    toDoObjects.forEach(function (toDo) {
        toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) == -1) {
                tags.push(tag);
            }
        })
    })
    var tagObjects = tags.map(function (tag) {
        var toDosWithTag = [];
        toDoObjects.forEach(function (toDo) {
            if (toDo.tags.indexOf(tag) != -1) {
                toDosWithTag.push(toDo.description);
            }
        })
        return { "name": tag, "toDos": toDosWithTag };
    })
    tagObjects.forEach(function (tagObject) {
        var tag = tagObject.name;
        tagObject.name = tag[0].toUpperCase() + tag.substring(1);
    })
    return tagObjects;
}

var main = function (toDoObjects) {
    "use strict";
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function() {
            var $element = $(element), $content;
            $(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                var organizedByTag = organizeByTag(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name);
                    $("main .content").append($tagName);
                    $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    })
                    $("main .content").append($content);
                })
            } else if ($element.parent().is(":nth-child(4)")) {
                $content = $("main .content");
                $content.append(
                    '<input type="text" class="input">' +
                    '<button class="button">+</button>'
                );
                var newGoal, input = "main .content .input";
                $("main .content .button").on("click", function () {
                    newGoal = $(input).val();
                    if (newGoal != '') {
                        toDos.push(newGoal);
                        alert("Новая цель успешно добавлена!");
                        $(input).val("");
                    } else {
                        alert("Вы ничего не ввели...");
                    }
                });
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
