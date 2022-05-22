var User = require("../models/user.js"),
    UsersController = {};

UsersController.index = function (req, res) {
    User.find(function (err, users) {
        if (err !== null) {
            res.json(500, err);
        } else {
            console.log(users);
            res.status(200).json(users);
        }
    });
};

UsersController.search = function (req, res) {
    var username = req.params.username;
    User.findOne({ "username": username }, function (err, user) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(user);
        }
    });
};

//Отобразить пользователя
UsersController.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

//Создать нового пользователя
UsersController.create = function (req, res) {
    console.log("вызвано действие: создать");
    res.send(200);
};

//Обновить существующего пользователя
UsersController.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

//Удалить существующего пользователя
UsersController.destroy = function (req, res) {
    console.log("вызвано действие: удалить");
    res.send(200);
};

module.exports = UsersController;