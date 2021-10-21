const db = require("../models/index.js", "../models");
const Continent = db.continents;
const Article = db.article;
const Op = db.Sequelize.Op;

// Search bar
exports.search = (words, res) => {

    var str = new Array();
    words.forEach((word) => {
        str1 = str.push({titre: { [Op.substring] : word }},{ description: { [Op.substring] : word }})
    });
    Article.findAll(
    {
        where: {[Op.or]:str},
    })
    .then(article => {
        res.send(article);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Une erreur s'est produite lors de la recherche."
        });
    });
};