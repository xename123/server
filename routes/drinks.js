const drinksRouter = require("express").Router();
const {
  sendDrinkCreated,
  sendDrinks,
  sendDrink,
} = require("../controllers/drinks");
const { updateDrinks, findAllDrinks } = require("../middlewares/drinks");

drinksRouter.post("/drinks", findAllDrinks, updateDrinks, sendDrinkCreated);
drinksRouter.get("/drinks", findAllDrinks, sendDrinks);
drinksRouter.get("/drinks/:id", findAllDrinks, sendDrink);
module.exports = drinksRouter;
