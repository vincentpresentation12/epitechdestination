const controller = require("../controllers/universite.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
    "Content-Type, Accept"
    );
    next();
  });

// Find all universities 
app.get("/api/universite", controller.findAllUniversite);
}