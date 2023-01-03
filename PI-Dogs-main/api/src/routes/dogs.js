const { Router } = require('express');
const {getDogs, createDog, getDogDetail} = require("../controllers/dogControllers");

const dogRouter = Router();

dogRouter.get("/", getDogs)

dogRouter.get("/:id", getDogDetail)

dogRouter.post("/", createDog)


module.exports = dogRouter