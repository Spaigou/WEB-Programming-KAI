var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost/amazeriffic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});;


var ToDoSchema = new mongoose.Schema({
    description: String,
    tags: [String]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);

var UserSchema = new mongoose.Schema({
    username: String,
    id: String
})
var User = mongoose.model("User", UserSchema);
module.exports = User;

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
            ToDo.find({}, function (err, result) {
                if (err != null) {
                    res.send("ERROR");
                }
                res.json(result);
            })
        }
    })
});
