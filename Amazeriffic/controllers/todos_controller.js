var ToDo = require("../models/todo.js"),
    User = require("../models/user.js"),
    ToDosController = {};

ToDosController.index = function (req, res) {
    var username = req.params.username || null,
        respondWithToDos;
    respondWithToDos = function (query) {
        ToDo.find(query, function (err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
            }
        });
    };
    if (username !== null) {
        User.find({ "username": username }, function (err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json({ "result_length": 0 });
            } else {
                respondWithToDos({ "owner": result[0]._id });
            }
        });
    } else {
        respondWithToDos({});
    }
};

ToDosController.create = function (req, res) {
    var username = req.params.username || null,
        newToDo = new ToDo({
            "description": req.body.description,
            "tags": req.body.tags
        });
    User.find({ "username": username }, function (err, result) {
        if (err) {
            res.send(500);
        } else {
            if (result.length === 0) {
                newToDo.owner = null;
            } else {
                newToDo.owner = result[0]._id;
            }
            newToDo.save(function (err, result) {
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

module.exports = ToDosController;
