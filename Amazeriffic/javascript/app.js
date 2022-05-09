var main = function () {
    "use strict";
    var toDo = [
        "Закончить писать эту книгу",
        "Вывести Грейси на прогулку в парк", 
        "Ответить на электронные письма", 
        "Подготовиться к лекции в понедельник", 
        "Обновить несколько новых задач", 
        "Купить продукты"
        ];
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function() {
            var $element = $(element), $content;
            $(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDo.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDo[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDo.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $content = $("main .content");
                $content.append(
                    '<input type="text" class="input">' +
                    '<button class="button">+</button>'
                );
                var newGoal, input = "main .content .input";
                $("main .content .button").on("click", function () {
                    newGoal = $(input).val();
                    if (newGoal != '') {
                        toDo.push(newGoal);
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
$("document").ready(main());