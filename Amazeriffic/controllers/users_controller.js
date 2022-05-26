var User = require("../models/user.js"),
    ToDo = require("../models/todo.js"),
    UsersController = {};

UsersController.index = function (req, res) {
    User.find(function (err, users) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(users);
        }
    });
};

UsersController.search = function (req, res) {
    var username = req.params.username;
    User.findOne({ "username": username }, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });
};

UsersController.searchById = function (req, res) {
    var id = req.params.id;
    User.findOne({ "_id": id }, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
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
    var username = req.body.username;
    User.find({ "username": username }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else if (result.length !== 0) {
            res.status(500).send("Пользователь уже существует!");
        } else {
            var newUser = new User({
                "username": username,
                "role": "Пользователь"
            });
            newUser.save(function (err, result) {
                if (err !== null) {
                    res.stats(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

//Обновить существующего пользователя
UsersController.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

//Удалить существующего пользователя
UsersController.destroy = function (req, res) {
    var id = req.params.id;
    User.deleteOne({ "_id": id }, function (err, todo) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (todo.deletedCount === 1) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });
};

module.exports = UsersController;