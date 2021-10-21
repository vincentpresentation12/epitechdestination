const controller = require("../controllers/article.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Create article
app.post("/api/articles", controller.uploadImg, controller.createArticle);

//Retrieve all articles.
app.get("/api/articles", controller.findAllArticles);

// Retrieve article by id with his comments.
app.get("/api/articles/:id", controller.findOneArticle);

// Update Article
app.put("/api/articles/:id", controller.updateArticle);

// Delete article with his comments
app.delete("/api/articles/:id", controller.deleteOneArticle);

// --------------------------------------------------------------------------------------
 
// Create and save comment
app.post("/api/commentaires", controller.createCommentaire);
 
// Update a comment with id
app.put("/api/commentaires/:id", controller.updateCommentaire);
 
// Delete comment
app.delete("/api/commentaires/:id", controller.deleteCommentaire);

//Find all comments
app.get("/api/commentaires", controller.findAllCommentaires);

// Find a single comment with an id
app.get("/api/commentaires/:id", controller.findOneCommentaire);
}