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
        tag = tag[0].toUpperCase() + tag.substring(1);
        return { "name": tag, "toDos": toDosWithTag };
    })
    return tagObjects;
}

var main = function () {
    "use strict";

    var tabs = [],
        $content = $("<div>").addClass("content");
    tabs.push({
        "name": "Новые",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $list = $("<ul>");
                for (var i = toDoObjects.length - 1; i >= 0; i--) {
                    var $toDoListItem = liaWithDeleteOnClick(toDoObjects[i]);
                    $list.append($toDoListItem);
                }
                $content.append($list);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    });
    tabs.push({
        "name": "Старые",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $list = $("<ul>");
                toDoObjects.forEach(function (todo) {
                    var $toDoListItem = liaWithEditOnClick(todo);
                    $list.append($toDoListItem);
                });
                $content.append($list);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
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
                    var i = 0;
                    tag.toDos.forEach(function (toDo) {
                        var $li = $("<li>").text(toDo);
                        i++;
                        $list.append($li);
                    });
                    $content.append($list);
                });
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    })
    tabs.push({
        "name": "Добавить",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $addBox = $("<div>").addClass("add-box"),
                    $input = $("<input>").addClass("input"),
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
                    tags.forEach(function (tag) {
                        tag = tag[0].toUpperCase() + tag.substring(1);
                    })
                    var newToDo = { "description": description, "tags": tags };
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
                $addBox.append($inputLabel).append($input).append($tagLabel).
                    append($tagInput).append($button);
                $content.append($addBox);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    })

    tabs.forEach(function (tab) {
        var $aElement = $("<a>").attr("href", "#"),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);
        $("main .tabs").append($aElement).append($content);
        $spanElement.on("click", function () {
            $(".tabs a span").removeClass("active");
            $spanElement.addClass("active");
            $("main .content").empty();
            tab.content(function (err, $content) {
                if (err !== null) {
                    alert("Возникла ошибка при обработке запроса: ", err);
                } else {
                    $("main .content").append($content);
                }
            });
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

var liaWithDeleteOnClick = function (todo) {
    var $todoListItem = $("<li>").text(todo.description),
        $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);

    $todoRemoveLink.text("Удалить");

    $todoRemoveLink.on("click", function () {
        if (confirm("Вы уверены?")) {
            $.ajax({
                "url": "todos/" + todo._id,
                "type": "DELETE"
            }).done(function (response) {
                alert("Deleted successfully!");
                $(".tabs a:first-child span").trigger("click");
            }).fail(function (err) {
                console.log("error on delete 'todo'!");
            });
        }
        return false;
    });

    $todoListItem.append($todoRemoveLink);
    return $todoListItem;
};

var liaWithEditOnClick = function (todo) {
    var $todoListItem = $("<li>").text(todo.description),
        $todoEditLink = $("<a>").attr("href", "todos/" + todo._id);

    $todoEditLink.text("Редактировать");

    $todoEditLink.on("click", function () {
        var newDescription = prompt(
            "Введите новое значение для задачи \"" + todo.description + "\""
        );
        if (newDescription !== null && newDescription.trim() !== "") {
            $.ajax({
                "url": "todos/" + todo._id,
                "type": "PUT",
                "data": { "description": newDescription }
            }).done(function (response) {
                alert("Updated successfully!");
                $(".tabs a:nth-child(2) span").trigger("click");
            }).fail(function (err) {
                console.log("error on update 'todo'!");
            });
        }
        return false;
    });

    $todoListItem.append($todoEditLink);
    return $todoListItem;
};


$(document).ready(main);
