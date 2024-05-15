const fs = require("fs");
const { writeData, readData } = require("../utils/data/parse");

const findAllDrinks = async (req, res, next) => {
  try {
    req.drinks = await readData("./data/drinks.json");
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка 213123213 игры" });
  }
};

const updateDrinks = async (req, res, next) => {
  try {
    req.drinks.push({
      strDrink: req.body.name,
      strDrinkThumb: req.body.image,
      idDrink: req.drinks.length,
      strInstructions: req.body.instructions,
      strIngredient: req.body.ingredients,
    });
    await writeData("./data/drinks.json", req.drinks);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка 213123213 игры" });
  }
};

module.exports = { updateDrinks, findAllDrinks };
