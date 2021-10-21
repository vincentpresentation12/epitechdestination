const db = require("../models");
const Article = db.article;

// Find last 3 articles.
exports.lastArticle = (req, res) => {
    Article.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 3
    })
    .then(function(article){
        return res.jsonp(article);
    })
    .catch(err => {
        res.status(500).send({
            message :
            err.message || "Une erreur s'est produite lors de la récupération des 3 derniers articles."
        });
    });
}