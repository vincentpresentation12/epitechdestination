const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(express.urlencoded())

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use('/public/images', express.static('./public/images'));

const db = require("./app/models");
const Role = db.role;

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/search.routes')(app);
require('./app/routes/filtre.routes')(app);
require('./app/routes/universite.routes')(app);
require('./app/routes/lastarticle.routes')(app)

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Epitech Destination API !" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});