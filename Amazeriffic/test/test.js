var toDoObjects = [
    {
        "description": "Сделать покупки",
        "tags": ["шопинг", "рутина"]
    },
    {
        "description": "Сделать несколько новых задач",
        "tags": ["писательство", "работа"]
    },
    /* etc */
];

var organizeByTags = function (toDoObjects) {
    var tags = [];
    toDoObjects.forEach(function (toDo) {
        toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) == -1) {
                tags.push(tag);
            }
        })
    })
    console.log(tags);
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
    console.log(tagObjects);
};

var main = function () {
    "use strict";
    organizeByTags(toDoObjects);
};

$(document).ready(main);