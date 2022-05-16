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

    var tabs = [],
        $content = $("<div>").addClass("content");
    tabs.push({
        "name": "Новые",
        "content": function () {
            var $list = $("<ul>");
            for (var i = toDos.length - 1; i >= 0; i--) {
                $list.append($("<li>").text(toDos[i]));
            }
            $content.append($list);
            return $content;
        }
    });
    tabs.push({
        "name": "Старые",
        "content": function () {
            var $list = $("<ul>");
            toDos.forEach(function (todo) {
                $list.append($("<li>").text(todo));
            });
            $content.append($list)
            return $content;
        }
    })
    tabs.push({
        "name": "Теги",
        "content": function () {
            var organizedByTag = organizeByTag(toDoObjects);
            organizedByTag.forEach(function (tag) {
                var $tagName = $("<h3>").text(tag.name);
                $content.append($tagName);
                var $list = $("<ul>");
                tag.toDos.forEach(function (description) {
                    var $li = $("<li>").text(description);
                    $list.append($li);
                });
                $content.append($list);
            });
            return $content;
        }
    })
    tabs.push({
        "name": "Добавить",
        "content": function () {
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
                    tags = $tagInput.val().split(",");
                if (description != '' && $tagInput.val() != '') {
                    var newToDo = { "description": description, "tags": tags };
                    $.post("todos", newToDo, function (response) {
                        console.log("Мы отправили данные и получили ответ сервера!");
                        console.log(response);
                    });
                    toDoObjects.push(newToDo);
                    toDos.push(description);
                    alert("Добавлено успешно!");
                    $($input).val("");
                    $($tagInput).val("");
                } else {
                    alert("Поля не должны быть пустыми!");
                }
            });
            $content.append($inputLabel).append($input).append($tagLabel).
                append($tagInput).append($button);
            return $content;
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
            $content = tab.content();
            $("main .content").append($content);
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
