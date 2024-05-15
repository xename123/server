const sendDrinkCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.usersArray));
};
const sendDrinks = (req, res) => {
  const name = req.query.name;
  const drinks = req.drinks;
  if (!name) {
    res.json(drinks);
  } else {
    const result = drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(name.toLowerCase())
    );
    res.json(result);
  }
};
const sendDrink = (req, res) => {
  const id = req.params.id;
  const drink = req.drinks.find((drink) => {
    return drink.idDrink === +id;
  });
  res.json(drink);
};
module.exports = {
  sendDrinkCreated,
  sendDrinks,
  sendDrink,
};
