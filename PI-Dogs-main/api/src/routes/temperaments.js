const { Router } = require('express');
const getTemperaments = require("../controllers/temperamentControllers");

const temperamentRouter = Router();

temperamentRouter.get("/", getTemperaments)

module.exports = temperamentRouter