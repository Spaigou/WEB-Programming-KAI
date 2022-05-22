var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    usersController = require("./controllers/users_controller.js"),
    toDosController = require("./controllers/todos_controller.js"),
    app = express();

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/amazeriffic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});;

http.createServer(app).listen(3000);

app.get("/user/:username/todos.json", toDosController.index);
app.post("/user/:username/todos", toDosController.create);
app.delete("/user/:username/todos/:id", toDosController.destroy);
app.put("/user/:username/todos/:id", toDosController.update);

app.get("/todos.json", toDosController.index);
app.post("/todos", toDosController.create);
app.delete("/todos/:id", toDosController.destroy);
app.put("/todos/:id", toDosController.update);

