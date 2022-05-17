var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    ToDo = require("./models/todo.js"),
    // usersController = require("./controllers/users_controller.js"),
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

// app.get("/users.json", usersController.index);
// app.post("/users", usersController.create);
// app.get("/users/:username", usersController.show);
// app.put("/users/:username", usersController.update);
// app.delete("/users/:username", usersController.destroy);

app.get("/todos.json", toDosController.index);
app.post("/todos", toDosController.create);
// app.put("/user/:username/todos/:id", toDosController.update);
// app.delete("/user/:username/todos/:id", toDosController.destroy); 
