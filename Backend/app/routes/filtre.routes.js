const controller = require("../controllers/filtre.controller");

module.exports =function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Content-Type, Accept"
    );
    next();
  });
//Find all continent
app.get("/api/filter/continent", controller.findAll); 

// Find all country
app.get("/api/filtercontinent/", (req,res) => {
    const continent = req.query.continent;
    controller.filterContinent(continent , res);
    });

// Find all cities
app.get("/api/filterpays/", (req,res) => {
    const pays = req.query.pays;
    controller.filterEtat(pays , res);
    });

// Find all universities
app.get("/api/filterville/", (req,res) => {
    const ville = req.query.ville;
    controller.filterVille(ville , res);
    });

// Find all articles
app.get("/api/filteruniversite/", (req,res) => {
    const universite = req.query.universite;
    controller.filterUniversite(universite , res);
    });
};