const route = require("express").Router();
const { createRol, deleteRol } = require("../controllers/rol.controllers");

route.post("/create", createRol);
route.delete("/:id", deleteRol);

module.exports = route;
