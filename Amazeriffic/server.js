var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    usersController = require("./controllers/users_controller.js"),
    toDosController = require("./controllers/todos_controller.js"),
    app = express();

app.use('/', express.static(__dirname + "/client"));
app.use('/:username', express.static(__dirname + "/client"));

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

app.get("/:username/todos.json", toDosController.index);
app.post("/:username/todos", toDosController.create);
app.delete("/:username/todos/:id", toDosController.destroy);
app.put("/:username/todos/:id", toDosController.update);

app.get("/users.json", usersController.index);
app.get("/user/:username", usersController.search);
app.get("/userID/:id", usersController.searchById);
//app.post("", usersController.create);
