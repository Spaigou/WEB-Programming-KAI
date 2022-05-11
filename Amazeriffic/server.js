var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [

    ];
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
app.post("/todos", function (req, res) {
    // сейчас объект сохраняется в req.body
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    // отправляем простой объект
    res.json({ "message": "Вы размещаетесь на сервере!" });
});
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
    res.json(toDos);
});
