const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Test the roles
  app.get("/api/test/all", controller.allAccess);
  
  // Test if user
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  //Test if admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Retrieve all users
  app.get("/api/users", controller.findAll);

  // Retrieve a single user with id
  app.get("/api/users/:id", controller.findOne);

  // Update a user with id
  app.put("/api/users/:id", controller.update);

  // Delete a user with id
  app.delete("/api/users/:id", controller.delete);
};