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
            } else if (result[0].role == "Админ") {
                respondWithToDos({});
            } else {
                respondWithToDos({ "owner": result[0]._id });
            }
        });
    }
};

ToDosController.search = function (req, res) {
    var id = req.params.id;
    ToDo.find({ "owner": id }, function (err, result) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    })
}

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

ToDosController.destroy = function (req, res) {
    var id = req.params.id;
    ToDo.deleteOne({ "_id": id }, function (err, todo) {
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
}

ToDosController.update = function (req, res) {
    var id = { "_id": req.params.id },
        newDescription = { $set: { description: req.body.description } };
    ToDo.updateOne(id, newDescription, function (err, todo) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (todo.modifiedCount === 1 || todo.acknowledged) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });
}


module.exports = ToDosController;
