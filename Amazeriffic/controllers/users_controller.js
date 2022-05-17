var User = require("../models/user.js"),
    mongoose = require("mongoose");

var UsersСontroller = {};

//проверка, не существует ли уже пользователь
User.find({}, function (err, result) {
    if (err !== null) {
        console.log("Что-то идет не так");
        console.log(err);
    } else if (result.length === 1) {
        console.log("Создание тестового пользователя...");
        var exampleUser = new User({ "username": "chingiz" });
        exampleUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Тестовый пользователь " + exampleUser.username + " сохранен");
            }
        });
    }
});

UsersСontroller.index = function (req, res) {
    console.log("вызвано действие: индекс");
    res.send(200);
};

// Отобразить пользователя
UsersСontroller.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

// Создать нового пользователя
UsersСontroller.create = function (req, res) {
    console.log("вызвано действие: создать");
    res.send(200);
};

// Обновить существующего пользователя
UsersСontroller.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

// Удалить существующего пользователя
UsersСontroller.destroy = function (req, res) {
    console.log("destroy action called");
    res.send(200);
};

module.exports = UsersСontroller;