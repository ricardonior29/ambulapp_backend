const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 4000;

const ambulancias = require("./routes/api/ambulancias");
const centrosmedicos = require("./routes/api/centrosmedicos");
const users = require("./routes/api/users");

const solicitudes = require("./routes/api/solicitudes");
const pacientes = require("./routes/api/pacientes");
const eps = require("./routes/api/eps");
const empresas = require("./routes/api/empresas");

const test = require("./routes/api/test");


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.use(cors());


// DB Config
const db_mongo = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db_mongo, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/ambulancias", ambulancias);
app.use("/api/centrosmedicos", centrosmedicos);
app.use("/api/users", users);

app.use("/api/solicitudes", solicitudes);
app.use("/api/pacientes", pacientes);
app.use("/api/eps", eps);
app.use("/api/empresas", empresas);
app.use("/api/centrosmedicos", centrosmedicos);

app.use("/api/test", test);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});