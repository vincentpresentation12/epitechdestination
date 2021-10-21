const controller = require("../controllers/lastarticle.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Content-Type, Accept"
    );
    next();
  });

// See the last three articles
app.get("/api/lastarticles",controller.lastArticle);
}