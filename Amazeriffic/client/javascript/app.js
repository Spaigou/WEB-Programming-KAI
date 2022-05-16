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

    var tabs = [],
        $content = $("<div>").addClass("content");
    tabs.push({
        "name": "Новые",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $list = $("<ul>");
                for (var i = toDoObjects.length - 1; i >= 0; i--) {
                    $list.append($("<li>").text(toDoObjects[i].description));
                }
                $content.append($list);
                callback($content);
            })
        }
    });
    tabs.push({
        "name": "Старые",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $list = $("<ul>");
                toDoObjects.forEach(function (todo) {
                    $list.append($("<li>").text(todo.description));
                });
                $content.append($list);
                callback($content);
            })
        }
    })
    tabs.push({
        "name": "Теги",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var organizedByTag = organizeByTag(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name);
                    $content.append($tagName);
                    var $list = $("<ul>");
                    tag.toDos.forEach(function (toDo) {
                        var $li = $("<li>").text(toDo);
                        $list.append($li);
                    });
                    $content.append($list);
                });
                callback($content);
            })
        }
    })
    tabs.push({
        "name": "Добавить",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $input = $("<input>").addClass("input"),
                    $inputLabel = $("<p>").text("Описание"),
                    $tagInput = $("<input>").addClass("input"),
                    $tagLabel = $("<p>").text("Теги"),
                    $button = $("<button>").text("+").addClass("button");
                $tagInput.keydown(function (e) {
                    if (e.keyCode == 13) {
                        $button.click();
                    }
                })
                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = { "description": description, "tags": tags };
                    if (description != '' && $tagInput.val() != '') {
                        $.post("todos", newToDo, function (result) {
                            alert("Добавлено успешно!");
                            $($input).val("");
                            $($tagInput).val("");
                            $(".tabs a:first-child span").trigger("click");
                        })
                    } else {
                        alert("Поля не должны быть пустыми!");
                    }
                });
                $content.append($inputLabel).append($input).append($tagLabel).
                    append($tagInput).append($button);
                callback($content);
            })
        }
    })

    tabs.forEach(function (tab) {
        var $aElement = $("<a>").attr("href", "#"),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);
        $("main .tabs").append($aElement).append($content);
        $spanElement.on("click", function () {
            var $content;
            $(".tabs a span").removeClass("active");
            $spanElement.addClass("active");
            $("main .content").empty();
            tab.content(function () {
                $("main .content").append($content);
            });
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
