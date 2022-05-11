var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// Это модель Mongoose для задач
var ToDoSchema = new mongoose.Schema({
    description: String,
    tags: [String]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
// начинаем слушать запросы
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        if (err != null) {
            console.log("ERROR" + err);
        }
        else {
            res.json(toDos);
        }
    });
});

app.post("/todos", function (req, res) {
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });
    newToDo.save(function (err, result) {
        if (err != null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // клиент ожидает, что будут возвращены все задачи,
            // поэтому для сохранения совместимости сделаем дополнительый запрос
            ToDo.find({}, function (err, result) {
                if (err != null) {
                    // элемент не был сохранен
                    res.send("ERROR");
                }
                res.json(result);
            })
        }
    })
});
