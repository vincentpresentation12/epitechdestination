const db = require("../models");
const Continent = db.continent;
const Etat = db.etat;
const continent_etats = db.continent_etats
const Op = db.Sequelize.Op;
const Ville = db.ville;
const Universite = db.universite;
const Article = db.article;

// Find all continent
exports.findAll = (req, res) => {
  
    Continent.findAll({ attributes: ["continent"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message :   
            err.message || "Une erreur s'est produite lors de la récupération des continents."
        });
    });
};

// Find all country
exports.filterContinent = (continent, res) =>
{
    Continent.findAll({
        where: { continent : continent },
        include: [{
            model: Etat,
            as: 'etats',
            attributes :['id','pays'],
            through: {
                model: continent_etats,
                as: 'continent_etats',
                attributes: ['continentId', 'etatId']
            }
        }]
    })
    .then(function(continent){
        return res.jsonp(continent);
    })
    .catch(err => {
        res.status(500).send({
            message :
            err.message || "Pays non trouvés."
        });
    });
}

// Find all cities
exports.filterEtat = (pays, res) =>
{
    Ville.findAll({
        include: [{
            model: Etat,
            as: 'etat',
            attributes :['id','pays'],
            where: { pays : pays },
        }]
    })
    .then(function(ville) {
        return res.jsonp(ville);
    })
    .catch(err => {
        res.status(500).send({
            message :
            err.message || "Villes non trouvées."
        });
    });
}

// Find all universities
exports.filterVille = (ville, res) =>
{
    Universite.findAll({
        include: [{
            model: Ville,
            as: 'ville',
            attributes :['id','nom'],
            where: { nom : ville },
        }]
    })
    .then(function(universite) {
        return res.jsonp(universite);
    })
    .catch(err => {
        res.status(500).send({
            message :
            err.message || "Universités non trouvées"
        });
    });
}

// Find all articles
exports.filterUniversite = (univeriste, res) =>
{
    Article.findAll({
        include: [{
            model: Universite,
            as: 'universite',
            attributes :['id','nom'],
            where: { nom : univeriste },
        }]
    })
    .then(function(article){
        return res.jsonp(article);
    })
    .catch(err => {
        res.status(500).send({
            message :
            err.message || "Articles non trouvés"
        });
    });
}